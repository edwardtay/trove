// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IRoyaltyRouter {
    function route(uint256 tokenId, uint256 amount) external;
}

/**
 * @title StableRotatorAgent
 * @notice ERC-7857-inspired iNFT for stable-rotator USDC yield agents on Base.
 *         Each token is one autonomous agent. Policy config + decision log live
 *         on 0G Storage; root hashes committed here on-chain. Tokens are
 *         cloneable: the strategy travels with the iNFT, fresh memory per clone.
 *
 *         Track fit (0G OpenAgents):
 *         - Persistent memory: configHash + memoryHash → 0G Storage
 *         - Composability: cloneAgent forks any existing strategy
 *         - Monetization: clones record `clonedFrom`, off-chain royalty router
 *           can split fees back to the original creator
 */
contract StableRotatorAgent is ERC721Enumerable, Ownable {
    struct AgentData {
        string name;
        // Stable-rotator policy, mirrored on-chain for transparency. Off-chain
        // truth lives at configHash on 0G Storage; these are display-friendly.
        uint256 minApyDeltaBps;       // e.g. 50 = 0.50%
        uint256 minHoldingDays;
        uint256 safetyMarginBps;      // e.g. 15000 = 1.5x (basis-point-relative)
        bool harvester;
        // Off-chain pointers
        string configHash;            // 0G Storage rootHash for full PolicyConfig JSON
        string memoryHash;            // 0G Storage rootHash for DecisionLog JSON
        // Telemetry
        uint256 totalDecisions;
        uint256 totalRebalances;
        uint256 totalHarvests;
        // Lineage
        uint256 clonedFrom;           // 0 if original (for clone) OR parentA (for merge)
        uint256 mergedFrom;           // 0 if not a merge; else parentB tokenId
        uint256 createdAt;
    }

    uint256 private _nextTokenId;
    mapping(uint256 => AgentData) public agents;
    /// Per-token authorized callers (e.g. KeeperHub upkeep contracts)
    mapping(uint256 => mapping(address => bool)) public authorizedCallers;

    /// Royalty router that splits incoming payments to the lineage chain.
    /// When set, cloning requires `cloneFee` USDC payment routed through it.
    IRoyaltyRouter public royaltyRouter;
    IERC20 public royaltyToken;
    uint256 public cloneFee; // in royaltyToken's smallest unit (USDC: 6 decimals → 10000 = 0.01 USDC)

    event AgentMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string name,
        string configHash,
        uint256 clonedFrom
    );
    event MemoryUpdated(uint256 indexed tokenId, string memoryHash);
    event ConfigUpdated(uint256 indexed tokenId, string configHash);
    event DecisionRecorded(
        uint256 indexed tokenId,
        uint256 totalDecisions,
        uint256 totalRebalances,
        uint256 totalHarvests
    );
    event CallerAuthorized(uint256 indexed tokenId, address caller, bool authorized);
    event RoyaltyConfigUpdated(address router, address token, uint256 cloneFee);
    event CloneFeePaid(uint256 indexed clonedTokenId, uint256 indexed sourceTokenId, address payer, uint256 amount);
    event AgentsMerged(uint256 indexed childTokenId, uint256 indexed parentA, uint256 indexed parentB, address minter);

    constructor() ERC721("StableRotator Agent", "SRA") Ownable(msg.sender) {}

    /// @notice Configure the royalty router for clone-fee enforcement.
    function setRoyaltyConfig(address router, address token, uint256 fee) external onlyOwner {
        royaltyRouter = IRoyaltyRouter(router);
        royaltyToken = IERC20(token);
        cloneFee = fee;
        emit RoyaltyConfigUpdated(router, token, fee);
    }

    /// @notice Mint a new stable-rotator agent
    function mintAgent(
        string calldata name,
        uint256 minApyDeltaBps,
        uint256 minHoldingDays,
        uint256 safetyMarginBps,
        bool harvester,
        string calldata configHash
    ) external returns (uint256) {
        require(minApyDeltaBps > 0, "delta must be positive");
        require(minHoldingDays > 0 && minHoldingDays <= 365, "invalid holding days");
        require(safetyMarginBps >= 10000, "safety must be >= 1.0x");

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        agents[tokenId] = AgentData({
            name: name,
            minApyDeltaBps: minApyDeltaBps,
            minHoldingDays: minHoldingDays,
            safetyMarginBps: safetyMarginBps,
            harvester: harvester,
            configHash: configHash,
            memoryHash: "",
            totalDecisions: 0,
            totalRebalances: 0,
            totalHarvests: 0,
            clonedFrom: 0,
            mergedFrom: 0,
            createdAt: block.timestamp
        });

        emit AgentMinted(tokenId, msg.sender, name, configHash, 0);
        return tokenId;
    }

    /// @notice Clone an existing agent's policy. Fresh memory per clone.
    /// @dev If a royalty router is configured + cloneFee > 0, the caller
    ///      must approve `royaltyToken` for cloneFee. The fee is routed
    ///      to the source token's lineage via `RoyaltyRouter.route`.
    ///      This makes successful agent strategies inheritable revenue
    ///      streams — clones pay the original creator forever.
    function cloneAgent(uint256 sourceTokenId) external returns (uint256) {
        require(_exists(sourceTokenId), "source missing");
        AgentData storage src = agents[sourceTokenId];

        // Charge clone fee, routed through the royalty splitter to the
        // source iNFT's lineage. msg.sender must have approved this
        // contract to transferFrom the fee in royaltyToken.
        if (address(royaltyRouter) != address(0) && cloneFee > 0) {
            require(
                royaltyToken.transferFrom(msg.sender, address(this), cloneFee),
                "clone fee transferFrom failed"
            );
            require(
                royaltyToken.approve(address(royaltyRouter), cloneFee),
                "fee approve failed"
            );
            royaltyRouter.route(sourceTokenId, cloneFee);
            emit CloneFeePaid(_nextTokenId, sourceTokenId, msg.sender, cloneFee);
        }

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        agents[tokenId] = AgentData({
            name: string.concat(src.name, "-fork"),
            minApyDeltaBps: src.minApyDeltaBps,
            minHoldingDays: src.minHoldingDays,
            safetyMarginBps: src.safetyMarginBps,
            harvester: src.harvester,
            configHash: src.configHash,
            memoryHash: "",
            totalDecisions: 0,
            totalRebalances: 0,
            totalHarvests: 0,
            clonedFrom: sourceTokenId,
            mergedFrom: 0,
            createdAt: block.timestamp
        });

        emit AgentMinted(tokenId, msg.sender, agents[tokenId].name, src.configHash, sourceTokenId);
        return tokenId;
    }

    /**
     * @notice Merge two parent agents into a new child. The child inherits
     *         the AVERAGE of the parents' policy knobs (delta, holding,
     *         margin) — emergent behavior beyond either single parent.
     *         Configuration hash points to parentA's config (the encrypted
     *         blob); the new owner can re-upload a merged plaintext later
     *         and update via setRoyaltyConfig.
     *
     *         Track-brief alignment: "agent breeding/merging via iNFTs."
     */
    function mergeAgents(uint256 parentA, uint256 parentB) external returns (uint256) {
        require(_exists(parentA) && _exists(parentB), "parent missing");
        require(parentA != parentB, "self-merge");

        // Charge merge fee — same shape as cloneAgent, but routes royalty to
        // parentA's lineage. (Could be split between both parents in v2.)
        if (address(royaltyRouter) != address(0) && cloneFee > 0) {
            require(
                royaltyToken.transferFrom(msg.sender, address(this), cloneFee),
                "merge fee transferFrom failed"
            );
            require(
                royaltyToken.approve(address(royaltyRouter), cloneFee),
                "fee approve failed"
            );
            royaltyRouter.route(parentA, cloneFee);
            emit CloneFeePaid(_nextTokenId, parentA, msg.sender, cloneFee);
        }

        AgentData storage a = agents[parentA];
        AgentData storage b = agents[parentB];

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        agents[tokenId] = AgentData({
            name: string.concat(a.name, "+", b.name),
            // Average of parents' knobs — emergent middle ground
            minApyDeltaBps: (a.minApyDeltaBps + b.minApyDeltaBps) / 2,
            minHoldingDays: (a.minHoldingDays + b.minHoldingDays) / 2,
            safetyMarginBps: (a.safetyMarginBps + b.safetyMarginBps) / 2,
            harvester: a.harvester || b.harvester, // OR — child gets the more capable parent's feature
            // Config initially points at parentA's encrypted blob; child's
            // owner uploads their own merged plaintext later via updateConfig.
            configHash: a.configHash,
            memoryHash: "",
            totalDecisions: 0,
            totalRebalances: 0,
            totalHarvests: 0,
            clonedFrom: parentA,
            mergedFrom: parentB,
            createdAt: block.timestamp
        });

        emit AgentMinted(tokenId, msg.sender, agents[tokenId].name, a.configHash, parentA);
        emit AgentsMerged(tokenId, parentA, parentB, msg.sender);
        return tokenId;
    }

    /// @notice Update the on-chain pointer to the latest decision log on 0G.
    /// Called by the agent's runtime after each cycle's log upload.
    function updateMemory(uint256 tokenId, string calldata newMemoryHash) external {
        require(_isAuthorized(tokenId, msg.sender), "not authorized");
        agents[tokenId].memoryHash = newMemoryHash;
        emit MemoryUpdated(tokenId, newMemoryHash);
    }

    /// @notice Update policy pointer (e.g. owner tunes a knob → re-uploads
    /// PolicyConfig to 0G → commits new rootHash here).
    function updateConfig(uint256 tokenId, string calldata newConfigHash) external {
        require(ownerOf(tokenId) == msg.sender, "owner only");
        agents[tokenId].configHash = newConfigHash;
        emit ConfigUpdated(tokenId, newConfigHash);
    }

    /// @notice Record a decision cycle outcome. `kind`: 0=hold, 1=rebalance, 2=harvest.
    function recordDecision(uint256 tokenId, uint8 kind) external {
        require(_isAuthorized(tokenId, msg.sender), "not authorized");
        AgentData storage a = agents[tokenId];
        a.totalDecisions += 1;
        if (kind == 1) a.totalRebalances += 1;
        else if (kind == 2) a.totalHarvests += 1;
        emit DecisionRecorded(tokenId, a.totalDecisions, a.totalRebalances, a.totalHarvests);
    }

    /// @notice Authorize an address (e.g. a KeeperHub upkeep contract or the
    /// agent's runtime EOA) to call updateMemory/recordDecision on this token.
    function authorizeCaller(uint256 tokenId, address caller, bool authorized) external {
        require(ownerOf(tokenId) == msg.sender, "owner only");
        authorizedCallers[tokenId][caller] = authorized;
        emit CallerAuthorized(tokenId, caller, authorized);
    }

    function _isAuthorized(uint256 tokenId, address caller) internal view returns (bool) {
        return ownerOf(tokenId) == caller || authorizedCallers[tokenId][caller];
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}
