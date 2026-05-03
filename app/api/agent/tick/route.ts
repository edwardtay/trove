/**
 * Agent tick endpoint — designed to be called by KeeperHub (or any keeper
 * service) on a schedule. Returns the agent's verdict for a given user
 * address, plus a txPayload the keeper can submit if action is needed.
 *
 *   GET /api/agent/tick?address=0x…&principalUsd=10000
 *
 * Response shape:
 *   {
 *     address, cycleAt,
 *     verdict: "hold" | "move" | "harvest",
 *     reason: string,
 *     // If action needed, the keeper executes this:
 *     txPayload?: { action, chainId, status, note },
 *     // For commit step (KeeperHub final node):
 *     iNftCommit?: { contract, tokenId, memoryHash, chainId }
 *   }
 *
 * The endpoint itself is read-only — it never signs or sends a tx. KeeperHub
 * handles execution with its gas/nonce/RPC reliability layer.
 */

import { NextResponse } from "next/server";
import { fetchPools, filterCandidates, rankByOrganicApy } from "../../../../src/llama";
import { DEFAULT_POLICY, shouldRebalance } from "../../../../src/policy";
import { readAllPositions, isValidAddress } from "../../../../src/onchain";
import { OGDataAvailability, type DecisionInputs } from "../../../../src/og-da";
import { StableRotatorCompute, type AnalyzeOutput } from "../../../../src/og-compute";

export const revalidate = 0;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");
  const principalUsd = Number(
    url.searchParams.get("principalUsd") ?? "10000",
  );

  if (!address || !isValidAddress(address)) {
    return NextResponse.json(
      { error: "missing or invalid address" },
      { status: 400 },
    );
  }

  const cycleAt = new Date().toISOString();

  // 1. Read live state
  const [pools, positions] = await Promise.all([
    fetchPools(),
    readAllPositions(address),
  ]);
  const candidates = rankByOrganicApy(filterCandidates(pools, DEFAULT_POLICY));
  const best = candidates[0];

  // 2. Determine current position from on-chain (largest tracked position)
  const trackedNonZero = positions
    .filter((p) => p.source === "tracked" && p.balanceUsd > 0)
    .sort((a, b) => b.balanceUsd - a.balanceUsd);
  const currentOnchain = trackedNonZero[0];

  if (!best) {
    return NextResponse.json({
      address,
      cycleAt,
      verdict: "hold",
      reason: "no eligible candidates clear the policy filter",
    });
  }

  // 3. No position: agent recommends initial deposit
  if (!currentOnchain) {
    return NextResponse.json({
      address,
      cycleAt,
      verdict: "hold",
      reason: `no position; would supply ${principalUsd} USDC to ${best.project} at ${(best.apyBase ?? 0).toFixed(2)}%`,
      candidate: {
        project: best.project,
        apyBase: best.apyBase,
        apyReward: best.apyReward,
        poolId: best.pool,
      },
    });
  }

  // 4. Have a position — run the policy
  const currentPool = candidates.find((c) => c.project === currentOnchain.project);
  const currentApy = currentPool?.apyBase ?? best.apyBase ?? 0;

  // 4a. Publish decision inputs to 0G DA so the cycle is independently
  // replayable. Run in parallel with the policy + Compute analysis below.
  const da = new OGDataAvailability();
  const daPromise = da.publish(
    `tick-inputs:${address}:${cycleAt}`,
    {
      schema: "stable-rotator/decision-inputs/1",
      cycleAt,
      address,
      policy: {
        minApyDelta: DEFAULT_POLICY.minApyDelta,
        minHoldingDays: DEFAULT_POLICY.minHoldingDays,
        safetyMargin: DEFAULT_POLICY.safetyMargin,
        gasCostUsd: DEFAULT_POLICY.gasCostUsd,
        apyFloor: DEFAULT_POLICY.apyFloor,
        tvlFloorUsd: DEFAULT_POLICY.tvlFloorUsd,
      },
      poolsConsidered: candidates.slice(0, 25).map((c) => ({
        project: c.project,
        pool: c.pool,
        apyBase: c.apyBase,
        apyReward: c.apyReward,
        tvlUsd: c.tvlUsd,
      })),
      positions: positions
        .filter((p) => p.balanceUsd > 0)
        .map((p) => ({ project: p.project, balanceUsd: p.balanceUsd, source: p.source })),
    } satisfies DecisionInputs,
  );

  const decision = shouldRebalance(
    {
      project: currentOnchain.project,
      pool: currentPool?.pool ?? "",
      principalUsd: currentOnchain.balanceUsd,
      currentApy,
      enteredAt: cycleAt,
    },
    best,
    DEFAULT_POLICY,
    24, // assume cooldown clear for endpoint demo
  );

  // 4b. Get a verifiable LLM second opinion via 0G Compute (best-effort).
  const compute = new StableRotatorCompute();
  const computePromise: Promise<AnalyzeOutput | null> = compute.isConfigured
    ? compute
        .analyzeRebalance({
          currentProject: currentOnchain.project,
          currentApy,
          bestProject: best.project,
          bestApy: best.apyBase ?? 0,
          bestApyReward: best.apyReward ?? 0,
          principalUsd: currentOnchain.balanceUsd,
          policy: {
            minApyDelta: DEFAULT_POLICY.minApyDelta,
            safetyMargin: DEFAULT_POLICY.safetyMargin,
            minHoldingDays: DEFAULT_POLICY.minHoldingDays,
          },
        })
        .catch((err) => {
          console.warn(`[og-compute] tick analyzeRebalance failed: ${err}`);
          return null;
        })
    : Promise.resolve(null);

  const [daBlob, computeAnalysis] = await Promise.all([daPromise, computePromise]);

  return NextResponse.json({
    address,
    cycleAt,
    verdict: decision.move ? "move" : "hold",
    reason: decision.reason,
    current: {
      project: currentOnchain.project,
      balanceUsd: currentOnchain.balanceUsd,
      apyBase: currentApy,
    },
    best: {
      project: best.project,
      apyBase: best.apyBase,
      apyReward: best.apyReward,
      poolId: best.pool,
    },
    // A live keeper would call a protocol-specific adapter here to produce
    // executable calldata. For this demo endpoint, the decision is live
    // and the tx payload is intentionally marked as a template.
    txPayload: decision.move
      ? {
          action: "rebalance",
          status: "template",
          note: "protocol-specific withdraw+supply calldata builder is the production adapter step",
          fromProject: currentOnchain.project,
          toProject: best.project,
          principalUsd: currentOnchain.balanceUsd,
          chainId: 8453,
        }
      : undefined,
    iNftCommit: {
      contract: process.env.NEXT_PUBLIC_INFT_ADDRESS ??
        process.env.NEXT_PUBLIC_AGENT_ID_ADDRESS ??
        "0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64",
      tokenId: Number(process.env.NEXT_PUBLIC_INFT_TOKEN_ID ?? 0),
      chainId: 16602,
      // memoryHash is populated after the keeper uploads the new decision log
      // to 0G Storage; this slot is what KeeperHub fills in its final node.
      memoryHashPlaceholder: "<from-0g-storage-upload>",
      // Decision kind for iNFT.recordDecision(tokenId, kind):
      // 0 = hold (don't increment any counter)
      // 1 = move (rebalance — increments totalRebalances)
      // 2 = harvest (claim rewards — increments totalHarvests)
      // Pre-computed here so workflow configs don't need ternary expressions.
      decisionKind:
        decision.move ? 1 : 0,
    },
    ogDA: daBlob,
    ogCompute: computeAnalysis
      ? {
          recommendation: computeAnalysis.recommendation,
          reasoning: computeAnalysis.reasoning,
          model: computeAnalysis.modelUsed,
          provider: computeAnalysis.providerAddress,
          inferenceMs: computeAnalysis.durationMs,
          agreesWithPolicy:
            computeAnalysis.recommendation ===
            (decision.move ? "move" : "hold"),
        }
      : null,
  });
}
