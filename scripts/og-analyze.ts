/**
 * Run a real 0G Compute inference call against the agent's current decision
 * inputs. Pulls live DeFiLlama data, asks the LLM to decide MOVE/HOLD/HARVEST,
 * prints the verifiable reasoning blob.
 *
 * Usage:  PRIVATE_KEY=0x... npm run og:analyze
 */

import "./_env";
import { writeFile, readFile } from "node:fs/promises";
import { fetchPools, filterCandidates, rankByOrganicApy } from "../src/llama";
import { DEFAULT_POLICY } from "../src/policy";
import { StableRotatorCompute } from "../src/og-compute";

const STATE_PATH = "og-state.json";

async function main() {
  const compute = new StableRotatorCompute();
  if (!compute.isConfigured) {
    console.error("[error] PRIVATE_KEY not set");
    process.exit(1);
  }

  const pools = await fetchPools();
  const candidates = rankByOrganicApy(filterCandidates(pools, DEFAULT_POLICY));
  const best = candidates[0];
  if (!best) {
    console.error("[og-analyze] no candidates");
    process.exit(1);
  }

  console.log(`[og-analyze] querying 0G Compute…`);
  const result = await compute.analyzeRebalance({
    currentProject: null, // demo: no current position
    currentApy: null,
    bestProject: best.project,
    bestApy: best.apyBase ?? 0,
    bestApyReward: best.apyReward ?? 0,
    principalUsd: 10_000,
    policy: {
      minApyDelta: DEFAULT_POLICY.minApyDelta,
      safetyMargin: DEFAULT_POLICY.safetyMargin,
      minHoldingDays: DEFAULT_POLICY.minHoldingDays,
    },
  });

  if (!result) {
    console.error("[og-analyze] inference returned null");
    process.exit(1);
  }

  console.log("");
  console.log(`  recommendation: ${result.recommendation.toUpperCase()}`);
  console.log(`  reasoning:      ${result.reasoning}`);
  console.log(`  model:          ${result.modelUsed}`);
  console.log(`  provider:       ${result.providerAddress.slice(0, 10)}…`);
  console.log(`  duration:       ${result.durationMs}ms`);

  let state: Record<string, unknown> = {};
  try {
    state = JSON.parse(await readFile(STATE_PATH, "utf-8"));
  } catch {
    /* fresh */
  }
  state.lastAnalysis = {
    ...result,
    bestProject: best.project,
    bestApy: best.apyBase ?? 0,
    bestApyReward: best.apyReward ?? 0,
    principalUsd: 10_000,
    timestamp: new Date().toISOString(),
  };
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2));
  console.log(`\n[og-analyze] ✓ wrote ${STATE_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
