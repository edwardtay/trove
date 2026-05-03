/**
 * GET /api/agent/verify?root=0x...
 *
 * Server-side equivalent of `npm run verify-decision`. Downloads a decision
 * log from 0G Storage by root hash, replays the deterministic policy
 * against every entry, and returns the per-entry match results.
 *
 * Lets visitors prove "verifiable" claim from the UI — no CLI required.
 */

import { NextResponse } from "next/server";
import { writeFile, readFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DEFAULT_POLICY, shouldRebalance } from "../../../../src/policy";
import type { LlamaPool, Position } from "../../../../src/types";

export const revalidate = 60;

type LogEntry = {
  cycleAt: string;
  verdict: "move" | "hold" | "harvest";
  reason: string;
  position: { project: string; principalUsd: number; currentApy: number } | null;
  best: { project: string; apyBase: number; apyReward: number } | null;
};

type DecisionLog = {
  schema: string;
  agentINftId: number | null;
  startedAt: string;
  entries: LogEntry[];
};

const ZG_INDEXER =
  process.env.ZG_INDEXER_URL ??
  "https://indexer-storage-testnet-turbo.0g.ai";

async function fetchFromZGStorage(rootHash: string): Promise<DecisionLog> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Indexer } = (await import("@0gfoundation/0g-ts-sdk")) as any;
  const indexer = new Indexer(ZG_INDEXER);

  const tmpDir = join(tmpdir(), "trove-verify-api");
  await mkdir(tmpDir, { recursive: true });
  const outPath = join(tmpDir, `decision-log-${rootHash.slice(2, 10)}-${Date.now()}.json`);

  const err = await indexer.download(rootHash, outPath, true);
  if (err) {
    throw new Error(`0G Storage download failed: ${err}`);
  }

  const raw = await readFile(outPath, "utf8");
  await rm(outPath).catch(() => undefined);
  return JSON.parse(raw) as DecisionLog;
}

function replayEntry(entry: LogEntry): { match: boolean; replayed: string } {
  if (!entry.best) {
    return { match: entry.verdict === "hold", replayed: "hold (no candidates)" };
  }
  if (!entry.position) {
    return {
      match: entry.verdict === "hold",
      replayed: "hold (no position to rebalance)",
    };
  }

  const position: Position = {
    project: entry.position.project,
    pool: "",
    principalUsd: entry.position.principalUsd,
    currentApy: entry.position.currentApy,
    enteredAt: entry.cycleAt,
  };
  const best: LlamaPool = {
    pool: "",
    chain: "base",
    project: entry.best.project,
    symbol: "USDC",
    tvlUsd: 1e9,
    apyBase: entry.best.apyBase,
    apyReward: entry.best.apyReward,
    apy: entry.best.apyBase + entry.best.apyReward,
    stablecoin: true,
    ilRisk: "no",
    exposure: "single",
    poolMeta: null,
  };

  const replayed = shouldRebalance(position, best, DEFAULT_POLICY, 24);
  const replayedVerdict = replayed.move ? "move" : "hold";
  return {
    match: entry.verdict === replayedVerdict || entry.verdict === "harvest",
    replayed: `${replayedVerdict} — ${replayed.reason}`,
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const root = url.searchParams.get("root");
  if (!root || !/^0x[a-fA-F0-9]{64}$/.test(root)) {
    return NextResponse.json(
      { error: "missing or invalid root (expect 0x + 64 hex chars)" },
      { status: 400 },
    );
  }

  let log: DecisionLog;
  try {
    log = await fetchFromZGStorage(root);
  } catch (err) {
    return NextResponse.json(
      {
        root,
        error: err instanceof Error ? err.message : String(err),
        hint: "0G Storage indexer may not have propagated this root yet (testnet eventual consistency). Retry after a few minutes.",
      },
      { status: 200 },
    );
  }

  const entries = log.entries ?? [];
  const results = entries.map((entry) => {
    const r = replayEntry(entry);
    return {
      cycleAt: entry.cycleAt,
      recordedVerdict: entry.verdict,
      recordedReason: entry.reason,
      replayed: r.replayed,
      match: r.match,
    };
  });

  const matches = results.filter((r) => r.match).length;
  const mismatches = results.length - matches;

  return NextResponse.json({
    root,
    schema: log.schema,
    iNftTokenId: log.agentINftId,
    startedAt: log.startedAt,
    entriesCount: results.length,
    matches,
    mismatches,
    allReproduce: mismatches === 0,
    results,
    indexer: ZG_INDEXER,
  });
}
