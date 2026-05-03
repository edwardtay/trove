/**
 * 0G Storage wrapper for stable-rotator.
 *
 * Persists two artifact types to 0G Storage:
 *   - PolicyConfig: the agent's policy (knobs, allowlist, harvester flag).
 *     Uploaded once at iNFT mint time; rootHash committed as `configHash`.
 *   - DecisionLog: append-only log of every cycle's decision (move/hold +
 *     reason + math). Uploaded periodically; latest rootHash committed
 *     as `memoryHash` on the iNFT.
 *
 * This module is Node-only (uses fs). Import it from CLI scripts and server
 * components, NOT from client components.
 *
 * Env required for live uploads (otherwise calls return null):
 *   PRIVATE_KEY        — Galileo testnet wallet, needs faucet 0G
 *   ZG_RPC_URL         — defaults to https://evmrpc-testnet.0g.ai
 *   ZG_INDEXER_URL     — defaults to https://indexer-storage-testnet-turbo.0g.ai
 */

import { ethers } from "ethers";
import { writeFile, readFile, unlink, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ZG_RPC = process.env.ZG_RPC_URL || "https://evmrpc-testnet.0g.ai";
const ZG_INDEXER =
  process.env.ZG_INDEXER_URL ||
  "https://indexer-storage-testnet-turbo.0g.ai";

let _provider: ethers.JsonRpcProvider | null = null;
function getProvider(): ethers.JsonRpcProvider {
  if (!_provider) _provider = new ethers.JsonRpcProvider(ZG_RPC);
  return _provider;
}

export const ZG_TESTNET = {
  chainId: 16602,
  rpc: ZG_RPC,
  indexer: ZG_INDEXER,
  explorer: "https://chainscan-galileo.0g.ai",
} as const;

// --- Schemas ---

export type PolicyConfig = {
  schema: "stable-rotator/policy/1";
  createdAt: string;
  minApyDelta: number;
  minHoldingDays: number;
  gasCostUsd: number;
  slippageBufferBps: number;
  cooldownHours: number;
  tvlFloorUsd: number;
  apyFloor: number;
  safetyMargin: number;
  keeperFeePct: number;
  harvester: boolean;
  allowlist: string[];
};

export type DecisionEntry = {
  cycleAt: string;
  /** "move" or "hold" — what the agent did this cycle */
  verdict: "move" | "hold" | "harvest";
  /** Human-readable reason from shouldRebalance / harvester */
  reason: string;
  /** Snapshot of the data that drove the decision */
  position: { project: string; principalUsd: number; currentApy: number } | null;
  best: { project: string; apyBase: number; apyReward: number } | null;
  math?: {
    apyDelta?: number;
    extraYieldUsd?: number;
    totalCostUsd?: number;
    breakEvenDelta?: number;
  };
  /** For harvest entries */
  harvest?: {
    claimedUsd: number;
    netCapturedUsd: number;
    gasUsd: number;
    swapSlippageBps: number;
  };
};

export type DecisionLog = {
  schema: "stable-rotator/log/1";
  agentINftId: number | null;
  startedAt: string;
  entries: DecisionEntry[];
};

// --- 0G Storage adapter ---

export type UploadResult = {
  rootHash: string;
  txHash: string;
  uploadedAt: string;
};

export class StableRotatorStorage {
  private signer: ethers.Wallet | null;

  constructor() {
    const raw = process.env.PRIVATE_KEY;
    if (!raw) {
      this.signer = null;
      return;
    }
    const key = raw.startsWith("0x") ? raw : `0x${raw}`;
    this.signer = new ethers.Wallet(key, getProvider());
  }

  get isConfigured(): boolean {
    return this.signer !== null;
  }

  get signerAddress(): string | null {
    return this.signer?.address ?? null;
  }

  /** Upload arbitrary JSON, return root hash + tx hash. Returns null if no signer. */
  private async upload(label: string, data: unknown): Promise<UploadResult | null> {
    if (!this.signer) return null;

    const { ZgFile, Indexer } = await import("@0gfoundation/0g-ts-sdk");
    const indexer = new Indexer(ZG_INDEXER);

    const tmpDir = join(tmpdir(), "stable-rotator-og");
    await mkdir(tmpDir, { recursive: true });
    const tmpPath = join(tmpDir, `${label}-${Date.now()}.json`);
    await writeFile(tmpPath, JSON.stringify(data));

    try {
      const file = await ZgFile.fromFilePath(tmpPath);
      const [tree, treeErr] = await file.merkleTree();
      if (treeErr !== null)
        throw new Error(`merkle tree error: ${treeErr}`);
      const rootHash = tree?.rootHash();
      if (!rootHash) throw new Error("no root hash from merkle tree");

      const [tx, uploadErr] = await indexer.upload(file, ZG_RPC, this.signer);
      if (uploadErr !== null) throw new Error(`upload error: ${uploadErr}`);

      await file.close();
      // Upload result is either single-segment {txHash, rootHash} or
      // multi-segment {txHashes[], rootHashes[]}; we only handle small JSON
      // so single-segment is the normal case.
      const txHash =
        tx && "txHash" in tx
          ? tx.txHash
          : tx && "txHashes" in tx
            ? (tx.txHashes[0] ?? "")
            : "";
      return {
        rootHash,
        txHash,
        uploadedAt: new Date().toISOString(),
      };
    } finally {
      await unlink(tmpPath).catch(() => undefined);
    }
  }

  /** Download by root hash, parse as JSON. Returns null on failure. */
  private async download<T>(rootHash: string): Promise<T | null> {
    if (!this.signer) return null;

    const { Indexer } = await import("@0gfoundation/0g-ts-sdk");
    const indexer = new Indexer(ZG_INDEXER);

    const tmpDir = join(tmpdir(), "stable-rotator-og");
    await mkdir(tmpDir, { recursive: true });
    const tmpPath = join(tmpDir, `dl-${Date.now()}.json`);

    try {
      const err = await indexer.download(rootHash, tmpPath, true);
      if (err !== null) throw new Error(`download error: ${err}`);
      const raw = await readFile(tmpPath, "utf-8");
      return JSON.parse(raw) as T;
    } finally {
      await unlink(tmpPath).catch(() => undefined);
    }
  }

  // --- Public API ---

  async putPolicyConfig(config: PolicyConfig): Promise<UploadResult | null> {
    return this.upload("policy", config);
  }

  async getPolicyConfig(rootHash: string): Promise<PolicyConfig | null> {
    return this.download<PolicyConfig>(rootHash);
  }

  async putDecisionLog(log: DecisionLog): Promise<UploadResult | null> {
    return this.upload("log", log);
  }

  async getDecisionLog(rootHash: string): Promise<DecisionLog | null> {
    return this.download<DecisionLog>(rootHash);
  }
}
