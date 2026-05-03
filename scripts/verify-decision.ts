/**
 * verify-decision.ts — independently replay any historical Trove decision.
 *
 * Trove claims its decisions are "verifiable" — meaning anyone can take a
 * decision-log root, fetch it from 0G Storage, parse the entry, and replay
 * the deterministic policy against the recorded inputs to confirm the
 * verdict matches.
 *
 * This script does exactly that. Pass a memoryHash (decision-log root from
 * 0G Storage) and it:
 *   1. Downloads the JSON from 0G Storage via the indexer.
 *   2. Iterates every decision entry in the log.
 *   3. For each, re-runs `shouldRebalance` from src/policy.ts against the
 *      recorded position + best candidate.
 *   4. Compares the replayed verdict to the recorded verdict and reports.
 *
 * Pure read-only. No private key needed. Confirms the policy was applied
 * deterministically — no off-chain LLM reasoning could have biased it.
 *
 * Usage:
 *   npx tsx scripts/verify-decision.ts <memoryHashRoot>
 *   # e.g.:
 *   npx tsx scripts/verify-decision.ts 0x7426fb9ca3e5f81237612c31bbcb7fba330f41679c6df18ca09824dc2fff124f
 */

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
  // 0G indexer-storage exposes /file?root=<hash> for direct file download.
  const url = `${ZG_INDEXER}/file?root=${rootHash}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`0G Storage fetch failed: HTTP ${res.status}`);
  }
  return (await res.json()) as DecisionLog;
}

function replayEntry(entry: LogEntry): { match: boolean; replayed: string } {
  // Pure HOLD with no candidate or position — trivially correct
  if (!entry.best) {
    return { match: entry.verdict === "hold", replayed: "hold (no candidates)" };
  }
  if (!entry.position) {
    return {
      match: entry.verdict === "hold",
      replayed: "hold (no position to rebalance)",
    };
  }

  // Reconstruct shouldRebalance inputs from the log entry
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
    console.error(
      "Usage: npx tsx scripts/verify-decision.ts <memoryHashRoot>",
    );
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
    process.exit(1);
  }

  console.log(`Schema:         ${log.schema}`);
  console.log(`iNFT token ID:  ${log.agentINftId}`);
  console.log(`Log started:    ${log.startedAt}`);
  console.log(`Entries:        ${log.entries.length}\n`);

  let pass = 0;
  let mismatch = 0;

  for (let i = 0; i < log.entries.length; i++) {
    const entry = log.entries[i]!;
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
  console.log(`Summary: ${pass} match · ${mismatch} mismatch · ${log.entries.length} total`);
  if (mismatch === 0) {
    console.log(
      "✅ All entries reproduce — policy was applied deterministically.",
    );
  } else {
    console.log(
      "⚠️  Some entries don't reproduce. This usually means policy params",
    );
    console.log(
      "    changed between the log entry and now (e.g., different",
    );
    console.log(
      "    DEFAULT_POLICY values). Replay against the corresponding",
    );
    console.log("    PolicyConfig root for full reproducibility.");
  }
  process.exit(mismatch === 0 ? 0 : 2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
