import { DEFAULT_POLICY, shouldRebalance } from "./policy";
import type { Decision, LlamaPool, Policy, Position } from "./types";

export type Scenario = {
  name: "bull" | "base" | "bear";
  label: string;
  blurb: string;
  current: Position;
  best: LlamaPool;
  hoursSinceLastMove: number;
};

export type SimulationResult = {
  scenario: Scenario;
  policy: Policy;
  math: {
    apyDelta: number;
    extraYieldUsd: number;
    gasUsd: number;
    slippageUsd: number;
    totalCostUsd: number;
    breakEvenDelta: number;
  };
  decision: Decision;
};

function pool(project: string, apyBase: number, tvlUsd = 50_000_000): LlamaPool {
  return {
    pool: `${project}-usdc-base`,
    chain: "Base",
    project,
    symbol: "USDC",
    tvlUsd,
    apyBase,
    apyReward: 0,
    apy: apyBase,
    stablecoin: true,
    ilRisk: "no",
    exposure: "single",
    poolMeta: null,
  };
}

export function makeScenarios(principalUsd: number): Scenario[] {
  return [
    {
      name: "bull",
      label: "Bull",
      blurb:
        "Big spread: a new market spikes well above the incumbent. Worth rotating?",
      current: {
        project: "aave-v3",
        pool: "aave-v3-usdc-base",
        principalUsd,
        currentApy: 3.0,
        enteredAt: new Date(Date.now() - 10 * 24 * 3_600_000).toISOString(),
      },
      best: pool("morpho-blue", 8.0, 80_000_000),
      hoursSinceLastMove: 240, // 10 days, well past cooldown
    },
    {
      name: "base",
      label: "Base",
      blurb:
        "Typical day: another protocol is ~1% better. Pays for itself only at scale.",
      current: {
        project: "aave-v3",
        pool: "aave-v3-usdc-base",
        principalUsd,
        currentApy: 3.5,
        enteredAt: new Date(Date.now() - 10 * 24 * 3_600_000).toISOString(),
      },
      best: pool("fluid-lending", 4.5, 25_000_000),
      hoursSinceLastMove: 240,
    },
    {
      name: "bear",
      label: "Bear",
      blurb:
        "Yields collapsed and compressed; spread is rounding error. Stay put.",
      current: {
        project: "aave-v3",
        pool: "aave-v3-usdc-base",
        principalUsd,
        currentApy: 4.0,
        enteredAt: new Date(Date.now() - 10 * 24 * 3_600_000).toISOString(),
      },
      best: pool("compound-v3", 4.2, 30_000_000),
      hoursSinceLastMove: 240,
    },
  ];
}

export function simulate(
  scenario: Scenario,
  policy: Policy = DEFAULT_POLICY,
): SimulationResult {
  const apyDelta = (scenario.best.apyBase ?? 0) - scenario.current.currentApy;
  const extraYieldUsd =
    scenario.current.principalUsd *
    (apyDelta / 100) *
    (policy.minHoldingDays / 365);
  const slippageUsd =
    scenario.current.principalUsd * (policy.slippageBufferBps / 10_000);
  const totalCostUsd = policy.gasCostUsd + slippageUsd;

  // Solve for delta such that extraYield == totalCost × safetyMargin
  const breakEvenDelta =
    ((totalCostUsd * policy.safetyMargin) /
      scenario.current.principalUsd /
      (policy.minHoldingDays / 365)) *
    100;

  const decision = shouldRebalance(
    scenario.current,
    scenario.best,
    policy,
    scenario.hoursSinceLastMove,
  );

  return {
    scenario,
    policy,
    math: {
      apyDelta,
      extraYieldUsd,
      gasUsd: policy.gasCostUsd,
      slippageUsd,
      totalCostUsd,
      breakEvenDelta,
    },
    decision,
  };
}
