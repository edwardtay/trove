/**
 * StableRotatorAgent iNFT contract interface (Galileo testnet).
 *
 * Used by the agent's runtime after each decision cycle to:
 *   - updateMemory(tokenId, newMemoryHash)  — commit the latest 0G Storage
 *     memoryHash on-chain so the iNFT's memory pointer is current.
 *   - recordDecision(tokenId, kind)         — increment counters (kind:
 *     0=hold, 1=rebalance, 2=harvest).
 *
 * Caller must be either the token owner OR an address authorized via
 * `authorizeCaller`. The deployer is the owner by default after mint.
 */

import { ethers } from "ethers";

const ZG_RPC = process.env.ZG_RPC_URL || "https://evmrpc-testnet.0g.ai";

let _provider: ethers.JsonRpcProvider | null = null;
function getProvider(): ethers.JsonRpcProvider {
  if (!_provider) _provider = new ethers.JsonRpcProvider(ZG_RPC);
  return _provider;
}

// Minimal ABI — only the methods we call from the runtime.
const ABI = [
  "function updateMemory(uint256 tokenId, string memoryHash) external",
  "function recordDecision(uint256 tokenId, uint8 kind) external",
  "function authorizeCaller(uint256 tokenId, address caller, bool authorized) external",
  "function agents(uint256 tokenId) view returns (string name, uint256 minApyDeltaBps, uint256 minHoldingDays, uint256 safetyMarginBps, bool harvester, string configHash, string memoryHash, uint256 totalDecisions, uint256 totalRebalances, uint256 totalHarvests, uint256 clonedFrom, uint256 createdAt)",
  "function ownerOf(uint256 tokenId) view returns (address)",
];

export type AgentOnChain = {
  name: string;
  minApyDeltaBps: bigint;
  minHoldingDays: bigint;
  safetyMarginBps: bigint;
  harvester: boolean;
  configHash: string;
  memoryHash: string;
  totalDecisions: bigint;
  totalRebalances: bigint;
  totalHarvests: bigint;
  clonedFrom: bigint;
  createdAt: bigint;
};

export type DecisionKind = 0 | 1 | 2; // 0=hold, 1=rebalance, 2=harvest

// ethers v6 returns dynamically-shaped Contract objects whose method types
// aren't inferable from a string ABI. Locally typing the methods we use:
type INftContract = ethers.Contract & {
  updateMemory(tokenId: bigint, memoryHash: string): Promise<ethers.ContractTransactionResponse>;
  recordDecision(tokenId: bigint, kind: number): Promise<ethers.ContractTransactionResponse>;
  agents(tokenId: bigint): Promise<unknown[]>;
};

export class StableRotatorINft {
  private signer: ethers.Wallet | null;
  private contract: INftContract | null = null;

  constructor(public readonly contractAddress: string | null) {
    const raw = process.env.PRIVATE_KEY;
    if (!raw || !contractAddress) {
      this.signer = null;
      return;
    }
    const key = raw.startsWith("0x") ? raw : `0x${raw}`;
    this.signer = new ethers.Wallet(key, getProvider());
    this.contract = new ethers.Contract(
      contractAddress,
      ABI,
      this.signer,
    ) as INftContract;
  }

  get isConfigured(): boolean {
    return this.contract !== null;
  }

  async updateMemory(
    tokenId: bigint,
    memoryHash: string,
  ): Promise<string | null> {
    if (!this.contract) return null;
    const tx = await this.contract.updateMemory(tokenId, memoryHash);
    const receipt = await tx.wait();
    return receipt?.hash ?? null;
  }

  async recordDecision(
    tokenId: bigint,
    kind: DecisionKind,
  ): Promise<string | null> {
    if (!this.contract) return null;
    const tx = await this.contract.recordDecision(tokenId, kind);
    const receipt = await tx.wait();
    return receipt?.hash ?? null;
  }

  async getAgent(tokenId: bigint): Promise<AgentOnChain | null> {
    if (!this.contract) return null;
    const a = (await this.contract.agents(tokenId)) as [
      string,
      bigint,
      bigint,
      bigint,
      boolean,
      string,
      string,
      bigint,
      bigint,
      bigint,
      bigint,
      bigint,
    ];
    return {
      name: a[0],
      minApyDeltaBps: a[1],
      minHoldingDays: a[2],
      safetyMarginBps: a[3],
      harvester: a[4],
      configHash: a[5],
      memoryHash: a[6],
      totalDecisions: a[7],
      totalRebalances: a[8],
      totalHarvests: a[9],
      clonedFrom: a[10],
      createdAt: a[11],
    };
  }
}
