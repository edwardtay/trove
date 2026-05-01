// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IStableRotatorAgent {
    function ownerOf(uint256 tokenId) external view returns (address);
    function agents(uint256 tokenId) external view returns (
        string memory name,
        uint256 minApyDeltaBps,
        uint256 minHoldingDays,
        uint256 safetyMarginBps,
        bool harvester,
        string memory configHash,
        string memory memoryHash,
        uint256 totalDecisions,
        uint256 totalRebalances,
        uint256 totalHarvests,
        uint256 clonedFrom,
        uint256 createdAt
    );
}

/**
 * @title RoyaltyRouter
 * @notice Splits incoming USDC payments (e.g. from the agent's x402 paywalled
 *         endpoint) between the iNFT's current owner and its lineage of clone
 *         creators. Each clone created via `StableRotatorAgent.cloneAgent`
 *         records `clonedFrom`; this router walks that chain.
 *
 *         Default split per call (override-able by current owner):
 *           80% → current owner
 *           15% → distributed across the lineage (recursive cloned-from chain)
 *            5% → protocol/treasury (this contract's `owner()`)
 *
 *         Operational pattern:
 *           1. The agent receives 0.01 USDC via x402 settlement
 *           2. Agent routes the USDC to this contract via `route(tokenId)`
 *           3. Contract reads the iNFT's lineage and forwards proportional
 *              shares to each owner along the chain
 *
 *         This makes ERC-7857-style monetization concrete: successful agent
 *         strategies become inheritable revenue streams. Forking is no
 *         longer just plagiarism — clones pay the original creator forever.
 */
contract RoyaltyRouter is Ownable, ReentrancyGuard {
    IERC20 public immutable usdc;
    IStableRotatorAgent public immutable agentContract;

    /// Lineage hop count cap to bound gas (a clone of a clone of a clone …)
    uint256 public constant MAX_LINEAGE_HOPS = 8;

    /// Default split, in basis points (sum must be 10000)
    uint256 public ownerBps = 8000;     // 80% to current iNFT owner
    uint256 public lineageBps = 1500;   // 15% split across lineage
    uint256 public treasuryBps = 500;   // 5% to this contract's owner

    event Routed(
        uint256 indexed tokenId,
        address indexed payer,
        uint256 totalAmount,
        uint256 ownerShare,
        uint256 lineageShare,
        uint256 treasuryShare
    );
    event LineagePaid(uint256 indexed tokenId, uint256 indexed ancestorTokenId, address ancestor, uint256 amount);
    event SplitsUpdated(uint256 ownerBps, uint256 lineageBps, uint256 treasuryBps);

    constructor(address usdc_, address agentContract_) Ownable(msg.sender) {
        usdc = IERC20(usdc_);
        agentContract = IStableRotatorAgent(agentContract_);
    }

    /**
     * @notice Owner of the contract can adjust splits (e.g. dial down lineage
     *         once a strategy has stabilized).
     */
    function setSplits(uint256 ownerBps_, uint256 lineageBps_, uint256 treasuryBps_) external onlyOwner {
        require(ownerBps_ + lineageBps_ + treasuryBps_ == 10000, "splits must sum to 10000");
        ownerBps = ownerBps_;
        lineageBps = lineageBps_;
        treasuryBps = treasuryBps_;
        emit SplitsUpdated(ownerBps_, lineageBps_, treasuryBps_);
    }

    /**
     * @notice Route an incoming USDC payment for `tokenId`.
     *         Caller must have approved this contract to transfer `amount`
     *         USDC from msg.sender (or sent USDC to this contract first
     *         and called `pull` — see below).
     */
    function route(uint256 tokenId, uint256 amount) external nonReentrant {
        require(amount > 0, "amount=0");
        require(usdc.transferFrom(msg.sender, address(this), amount), "USDC transferFrom failed");
        _distribute(tokenId, msg.sender, amount);
    }

    /**
     * @notice Convenience for x402 facilitators that have already pushed
     *         USDC to this contract. Distributes the balance held against
     *         a given tokenId.
     */
    function pull(uint256 tokenId) external nonReentrant {
        uint256 amount = usdc.balanceOf(address(this));
        require(amount > 0, "no balance");
        _distribute(tokenId, msg.sender, amount);
    }

    function _distribute(uint256 tokenId, address payer, uint256 amount) internal {
        uint256 toOwner = (amount * ownerBps) / 10000;
        uint256 toLineage = (amount * lineageBps) / 10000;
        uint256 toTreasury = amount - toOwner - toLineage;

        // Pay current owner
        address currentOwner = agentContract.ownerOf(tokenId);
        if (toOwner > 0) {
            require(usdc.transfer(currentOwner, toOwner), "owner transfer failed");
        }

        // Pay lineage — walk clonedFrom chain up to MAX_LINEAGE_HOPS.
        // Equal split among ancestors found.
        uint256 paidToLineage = 0;
        if (toLineage > 0) {
            uint256[] memory ancestors = _ancestors(tokenId);
            if (ancestors.length > 0) {
                uint256 perAncestor = toLineage / ancestors.length;
                for (uint256 i = 0; i < ancestors.length; i++) {
                    address anc = agentContract.ownerOf(ancestors[i]);
                    if (perAncestor > 0) {
                        require(usdc.transfer(anc, perAncestor), "lineage transfer failed");
                        paidToLineage += perAncestor;
                        emit LineagePaid(tokenId, ancestors[i], anc, perAncestor);
                    }
                }
            }
            // Any rounding remainder (lineage - paidToLineage) → treasury
            toTreasury += (toLineage - paidToLineage);
        }

        // Pay treasury (this contract's owner)
        if (toTreasury > 0) {
            require(usdc.transfer(owner(), toTreasury), "treasury transfer failed");
        }

        emit Routed(tokenId, payer, amount, toOwner, paidToLineage, toTreasury);
    }

    function _ancestors(uint256 tokenId) internal view returns (uint256[] memory) {
        uint256[] memory tmp = new uint256[](MAX_LINEAGE_HOPS);
        uint256 count = 0;
        uint256 cursor = tokenId;
        for (uint256 hop = 0; hop < MAX_LINEAGE_HOPS; hop++) {
            (, , , , , , , , , , uint256 clonedFrom, ) = agentContract.agents(cursor);
            if (clonedFrom == 0 && cursor == 0) {
                // Reached a true original (token #0 is also an original)
                break;
            }
            if (clonedFrom == cursor) break; // self-reference safety
            tmp[count] = clonedFrom;
            count++;
            cursor = clonedFrom;
            if (cursor == 0) break;
        }
        uint256[] memory out = new uint256[](count);
        for (uint256 i = 0; i < count; i++) out[i] = tmp[i];
        return out;
    }

    /// @notice Read the lineage chain for a token (debugging / dashboards).
    function getLineage(uint256 tokenId) external view returns (uint256[] memory) {
        return _ancestors(tokenId);
    }
}
