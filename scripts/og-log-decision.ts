/**
 * One full agent cycle:
 *   1. Fetch live DeFiLlama data
 *   2. Run shouldRebalance against current state
 *   3. Append decision entry to log
 *   4. Upload cumulative log → 0G Storage (memoryHash)
 *   5. Push memoryHash + decision count up to the iNFT on Galileo
 *
 * After this runs, the iNFT's memoryHash field on-chain points to the latest
 * decision log on 0G Storage. That's the full track-fit demo: persistent
 * verifiable memory tied to on-chain identity.
 *
 * Usage:  npm run og:log-decision
 */

import "./_env";
import { writeFile, readFile } from "node:fs/promises";
import { fetchPools, filterCandidates, rankByOrganicApy } from "../src/llama";
import { DEFAULT_POLICY } from "../src/policy";
import {
  StableRotatorStorage,
  type DecisionLog,
  type DecisionEntry,
} from "../src/og-storage";
import { StableRotatorINft, type DecisionKind } from "../src/og-inft";

const STATE_PATH = "og-state.json";

async function main() {
  const storage = new StableRotatorStorage();
  if (!storage.isConfigured) {
    console.error("[error] PRIVATE_KEY not set");
    process.exit(1);
  }

  let state: {
    decisionLog?: { rootHash: string; txHash: string; uploadedAt: string };
    log?: DecisionLog;
    iNftContract?: { address: string };
    iNftToken?: { tokenId: string };
  } = {};
  try {
    state = JSON.parse(await readFile(STATE_PATH, "utf-8"));
  } catch {
    /* fresh */
  }

  const iNftAddress = state.iNftContract?.address ?? null;
  const tokenIdStr = state.iNftToken?.tokenId ?? null;
  const inft = new StableRotatorINft(iNftAddress);

  const log: DecisionLog = state.log ?? {
    schema: "stable-rotator/log/1",
    agentINftId: tokenIdStr ? Number(tokenIdStr) : null,
    startedAt: new Date().toISOString(),
    entries: [],
  };

  // Run a real decision cycle against live DeFiLlama
  const cycleAt = new Date().toISOString();
  const pools = await fetchPools();
  const candidates = rankByOrganicApy(filterCandidates(pools, DEFAULT_POLICY));
  const best = candidates[0];

  let entry: DecisionEntry;
  let decisionKind: DecisionKind = 0;
  if (!best) {
    entry = {
      cycleAt,
      verdict: "hold",
      reason: "no eligible candidates clear the filter",
      position: null,
      best: null,
    };
  } else {
    entry = {
      cycleAt,
      verdict: "hold",
      reason: `no position; agent would supply to ${best.project} at ${(best.apyBase ?? 0).toFixed(2)}% organic`,
      position: null,
      best: {
        project: best.project,
        apyBase: best.apyBase ?? 0,
        apyReward: best.apyReward ?? 0,
      },
    };
  }
  log.entries.push(entry);

  console.log(`[cycle] ${entry.verdict.toUpperCase()} — ${entry.reason}`);
  console.log(`[cycle] log entries: ${log.entries.length}`);

  // 1. Upload to 0G Storage
  const result = await storage.putDecisionLog(log);
  if (!result) {
    console.error("[og] upload failed");
    process.exit(1);
  }
  console.log(`[og] ✓ memoryHash: ${result.rootHash.slice(0, 24)}…`);
  console.log(`[og] ✓ tx:         ${result.txHash.slice(0, 24)}…`);

  // 2. Push to iNFT (if deployed and minted)
  if (inft.isConfigured && tokenIdStr !== null) {
    const tokenId = BigInt(tokenIdStr);
    console.log(`[inft] updating memoryHash on token #${tokenId}…`);
    const memTxHash = await inft.updateMemory(tokenId, result.rootHash);
    console.log(`[inft] ✓ updateMemory tx: ${memTxHash}`);
    console.log(`[inft] recording decision (kind=${decisionKind})…`);
    const decTxHash = await inft.recordDecision(tokenId, decisionKind);
    console.log(`[inft] ✓ recordDecision tx: ${decTxHash}`);

    // Read back the on-chain state
    const onChain = await inft.getAgent(tokenId);
    if (onChain) {
      console.log(
        `[inft] ✓ on-chain: totalDecisions=${onChain.totalDecisions}, memoryHash=${onChain.memoryHash.slice(0, 18)}…`,
      );
    }

    // Persist iNFT update info
    const updates = {
      memoryHashTx: memTxHash,
      recordDecisionTx: decTxHash,
      onChainTotalDecisions: onChain?.totalDecisions.toString() ?? null,
      lastSyncAt: new Date().toISOString(),
    };
    state.iNftToken = { ...state.iNftToken!, ...updates };
  } else {
    console.log(
      `[inft] (skipped — no iNFT contract / token in og-state.json; deploy + mint first)`,
    );
  }

  state.log = log;
  state.decisionLog = result;
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2));
  console.log(`[og] ✓ wrote ${STATE_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
