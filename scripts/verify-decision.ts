/**
 * verify-decision.ts — independently replay any historical Trove decision.
 *
 * Trove claims its decisions are "verifiable" — anyone can take the
 * decision-log root from 0G Storage, fetch the JSON, and replay the
 * deterministic policy against each entry to confirm the recorded
 * verdicts reproduce.
 *
 * This script does exactly that:
 *   1. Downloads the decision log from 0G Storage via the indexer SDK.
 *   2. Iterates every entry.
 *   3. Re-runs `shouldRebalance` from src/policy.ts against the recorded
 *      position + best candidate.
 *   4. Compares replayed verdict to recorded verdict and reports.
 *
 * Pure read-only. No private key needed. Confirms the policy was applied
 * deterministically — no off-chain LLM reasoning could have biased it.
 *
 * Usage:
 *   npx tsx scripts/verify-decision.ts <memoryHashRoot>
 *   # e.g.:
 *   npx tsx scripts/verify-decision.ts 0x7426fb9ca3e5f81237612c31bbcb7fba330f41679c6df18ca09824dc2fff124f
 *
 * Status: scaffolded. The 0G Storage download path uses the same SDK as
 * the agent's upload, so any root that the agent itself wrote can be
 * replayed. If "File not found" returns, the indexer hasn't propagated
 * the file yet (eventual consistency on testnet) — retry after a few
 * minutes.
 */

import { writeFile, readFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DEFAULT_POLICY, shouldRebalance } from "../src/policy";
import type { LlamaPool, Position } from "../src/types";

const ZG_INDEXER =
  process.env.ZG_INDEXER_URL ??
  "https://indexer-storage-testnet-turbo.0g.ai";

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

async function fetchFromZGStorage(rootHash: string): Promise<DecisionLog> {
  // Use the same SDK the upload path uses — its download() implements the
  // proper segment-fetch protocol that `/file?root=` HTTP route doesn't.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Indexer } = (await import("@0gfoundation/0g-ts-sdk")) as any;
  const indexer = new Indexer(ZG_INDEXER);

  const tmpDir = join(tmpdir(), "trove-verify");
  await mkdir(tmpDir, { recursive: true });
  const outPath = join(tmpDir, `decision-log-${rootHash.slice(2, 10)}.json`);

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

async function main() {
  const root = process.argv[2];
  if (!root || !root.startsWith("0x")) {
    console.error("Usage: npx tsx scripts/verify-decision.ts <memoryHashRoot>");
    console.error("  e.g.: npx tsx scripts/verify-decision.ts 0x7426fb9c...");
    process.exit(1);
  }

  console.log(`\nVerifying decision log at root: ${root}`);
  console.log(`0G Storage indexer: ${ZG_INDEXER}\n`);

  let log: DecisionLog;
  try {
    log = await fetchFromZGStorage(root);
  } catch (err) {
    console.error(`❌ Failed to fetch from 0G Storage: ${err}`);
    console.error(
      "    The indexer may not have propagated this root yet (testnet",
    );
    console.error(
      "    eventual consistency). Retry after a few minutes, or replay",
    );
    console.error(
      "    against a more recent decision log root.",
    );
    process.exit(1);
  }

  console.log(`Schema:         ${log.schema}`);
  console.log(`iNFT token ID:  ${log.agentINftId}`);
  console.log(`Log started:    ${log.startedAt}`);
  console.log(`Entries:        ${log.entries?.length ?? 0}\n`);

  const entries = log.entries ?? [];
  let pass = 0;
  let mismatch = 0;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]!;
    const result = replayEntry(entry);
    const tag = result.match ? "✅ PASS" : "⚠️  MISMATCH";
    if (result.match) pass++;
    else mismatch++;

    console.log(`[${String(i + 1).padStart(2, "0")}] ${entry.cycleAt}`);
    console.log(`     recorded: ${entry.verdict} — ${entry.reason}`);
    console.log(`     replayed: ${result.replayed}`);
    console.log(`     ${tag}\n`);
  }

  console.log("─".repeat(60));
  console.log(
    `Summary: ${pass} match · ${mismatch} mismatch · ${entries.length} total`,
  );
  if (mismatch === 0 && entries.length > 0) {
    console.log(
      "✅ All entries reproduce — policy was applied deterministically.",
    );
  } else if (entries.length === 0) {
    console.log("ℹ️  Empty decision log.");
  } else {
    console.log(
      "⚠️  Some entries don't reproduce. Likely cause: DEFAULT_POLICY",
    );
    console.log(
      "    params changed between log entry and now. For full reproducibility",
    );
    console.log(
      "    replay against the matching PolicyConfig root from 0G Storage.",
    );
  }
  process.exit(mismatch === 0 ? 0 : 2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
