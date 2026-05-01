import type { Decision, LlamaPool, Policy, Position } from "./types";

// Defaults tuned to real Base USDC market behaviour (Apr 2026):
// - gasCostUsd is a fallback; live value is fetched from src/gas.ts
// - slippage is 0 for lending supply/withdraw (no swap curve crossed)
//   but 100 bps for reward-token claim swaps (FLUID/MORPHO/COMP routes via
//   Aerodrome/Uniswap have real depth issues at small clip sizes)
export const DEFAULT_POLICY: Policy = {
  minApyDelta: 0.5,
  minHoldingDays: 7,
  gasCostUsd: 0.05,
  slippageBufferBps: 0,
  cooldownHours: 24,
  tvlFloorUsd: 10_000_000,
  apyFloor: 1,
  safetyMargin: 1.5,
  keeperFeePct: 0,
  allowlist: new Set([
    "aave-v3",
    "morpho-blue",
    "moonwell",
    "fluid-lending",
    "compound-v3",
    "spark",
    "euler-v2",
  ]),
};

export function shouldRebalance(
  current: Position,
  best: LlamaPool,
  policy: Policy,
  hoursSinceLastMove: number,
): Decision {
  if (best.pool === current.pool)
    return { move: false, reason: "already in best pool" };

  if (hoursSinceLastMove < policy.cooldownHours)
    return {
      move: false,
      reason: `cooldown active (${hoursSinceLastMove.toFixed(1)}h / ${policy.cooldownHours}h)`,
    };

  const bestApy = best.apyBase ?? 0;
  const apyDelta = bestApy - current.currentApy;
  if (apyDelta < policy.minApyDelta)
    return {
      move: false,
      reason: `delta ${apyDelta.toFixed(2)}% below threshold ${policy.minApyDelta}%`,
    };

  const extraYieldUsd =
    current.principalUsd * (apyDelta / 100) * (policy.minHoldingDays / 365);
  const slippageUsd = current.principalUsd * (policy.slippageBufferBps / 10_000);
  const totalCost = policy.gasCostUsd + slippageUsd;

  if (extraYieldUsd <= totalCost * policy.safetyMargin)
    return {
      move: false,
      reason: `extra yield $${extraYieldUsd.toFixed(2)} ≤ cost $${totalCost.toFixed(2)} × ${policy.safetyMargin}`,
    };

  return {
    move: true,
    reason: `+${apyDelta.toFixed(2)}% APY → net $${(extraYieldUsd - totalCost).toFixed(2)} over ${policy.minHoldingDays}d`,
    from: current,
    to: best,
  };
}
