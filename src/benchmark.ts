import { DEFAULT_POLICY } from "./policy";
import type { Policy } from "./types";

export type ProtocolApy = {
  project: string;
  apyBase: number;
  apyReward: number;
};

export type DaySnapshot = {
  day: number;
  pools: ProtocolApy[];
};

export type StrategyResult = {
  id: string;
  name: string;
  blurb: string;
  finalBalanceUsd: number;
  unclaimedRewardsUsd: number;
  roiPct: number;
  netApyPct: number;
  totalMoves: number;
  totalHarvests: number;
  totalCostUsd: number;
  history: { day: number; project: string }[];
  balanceHistory: number[];
};

export type Strategy = {
  id: string;
  name: string;
  blurb: string;
  harvester: boolean;
  pickInitial(day0: DaySnapshot): string;
  decide(args: {
    snapshot: DaySnapshot;
    currentProject: string;
    daysSinceLastMove: number;
    balanceUsd: number;
    policy: Policy;
  }): string | null;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export type SeriesParams = {
  days: number;
  seed: number;
};

export const DEFAULT_SERIES: SeriesParams = { days: 90, seed: 42 };

export function generateSeries({ days, seed }: SeriesParams): DaySnapshot[] {
  const rand = mulberry32(seed);

  // Four protocols with different personalities.
  const protocols = [
    { project: "aave-v3", base: 3.0, vol: 0.15, rewardCurve: () => 0 },
    {
      project: "morpho-blue",
      base: 4.0,
      vol: 0.4,
      rewardCurve: (d: number) =>
        d >= 30 && d < 44 ? 2.0 * (1 - (d - 30) / 14) : 0,
    },
    {
      project: "fluid-lending",
      base: 4.5,
      vol: 0.5,
      // Strong rewards day 0–30 that decay to zero
      rewardCurve: (d: number) => clamp(2.0 * (1 - d / 30), 0, 2.0),
    },
    { project: "compound-v3", base: 2.8, vol: 0.2, rewardCurve: () => 0 },
  ];

  // Random-walk drift per protocol so APYs aren't independent step noise.
  const drift = protocols.map(() => 0);
  const series: DaySnapshot[] = [];

  for (let day = 0; day < days; day++) {
    const pools: ProtocolApy[] = protocols.map((p, i) => {
      drift[i] = clamp(
        (drift[i] ?? 0) + (rand() - 0.5) * p.vol * 0.4,
        -p.base * 0.4,
        p.base * 0.4,
      );
      const apyBase = clamp(p.base + (drift[i] ?? 0), 0.5, 12);
      const apyReward = p.rewardCurve(day);
      return { project: p.project, apyBase, apyReward };
    });
    series.push({ day, pools });
  }

  return series;
}

function bestByOrganic(pools: ProtocolApy[]): ProtocolApy {
  return [...pools].sort((a, b) => b.apyBase - a.apyBase)[0]!;
}

function bestByTotal(pools: ProtocolApy[]): ProtocolApy {
  return [...pools].sort(
    (a, b) => b.apyBase + b.apyReward - (a.apyBase + a.apyReward),
  )[0]!;
}

function findPool(snapshot: DaySnapshot, project: string): ProtocolApy {
  return snapshot.pools.find((p) => p.project === project)!;
}

function ourAgentDecide({
  snapshot,
  currentProject,
  daysSinceLastMove,
  balanceUsd,
  policy,
}: {
  snapshot: DaySnapshot;
  currentProject: string;
  daysSinceLastMove: number;
  balanceUsd: number;
  policy: Policy;
}): string | null {
  if (daysSinceLastMove < policy.cooldownHours / 24) return null;
  const current = findPool(snapshot, currentProject);
  const top = bestByOrganic(snapshot.pools);
  if (top.project === currentProject) return null;
  const delta = top.apyBase - current.apyBase;
  if (delta < policy.minApyDelta) return null;

  const extraYield = balanceUsd * (delta / 100) * (policy.minHoldingDays / 365);
  const slippage = balanceUsd * (policy.slippageBufferBps / 10_000);
  const cost = policy.gasCostUsd + slippage;
  if (extraYield <= cost * policy.safetyMargin) return null;
  return top.project;
}

export const STRATEGIES: Strategy[] = [
  {
    id: "pinned-aave",
    name: "Pinned Aave",
    blurb: "Buy Aave V3 on day 1. Never move. Safest passive baseline.",
    harvester: false,
    pickInitial: () => "aave-v3",
    decide: () => null,
  },
  {
    id: "pinned-day1-top",
    name: "Pinned Day-1 Top",
    blurb: "Whatever had the highest total APY on day 1. Hold forever.",
    harvester: false,
    pickInitial: (day0) => bestByTotal(day0.pools).project,
    decide: () => null,
  },
  {
    id: "manual-weekly",
    name: "Manual Weekly",
    blurb: "Human checks weekly, moves to top organic. Pays full gas+slippage.",
    harvester: false,
    pickInitial: (day0) => bestByOrganic(day0.pools).project,
    decide: ({ snapshot, currentProject, daysSinceLastMove }) => {
      if (daysSinceLastMove < 7) return null;
      const top = bestByOrganic(snapshot.pools).project;
      return top === currentProject ? null : top;
    },
  },
  {
    id: "manual-daily",
    name: "Manual Daily",
    blurb: "Over-engaged human checks daily. Death by gas+slippage.",
    harvester: false,
    pickInitial: (day0) => bestByOrganic(day0.pools).project,
    decide: ({ snapshot, currentProject }) => {
      const top = bestByOrganic(snapshot.pools).project;
      return top === currentProject ? null : top;
    },
  },
  {
    id: "naive-max-apy",
    name: "Naive Max-APY Agent",
    blurb: "Chases TOTAL APY (incl. rewards) daily, no gas math.",
    harvester: false,
    pickInitial: (day0) => bestByTotal(day0.pools).project,
    decide: ({ snapshot, currentProject }) => {
      const top = bestByTotal(snapshot.pools).project;
      return top === currentProject ? null : top;
    },
  },
  {
    id: "reward-chaser",
    name: "Reward-Chaser Agent",
    blurb: "Like Naive but with 0.1% delta floor. Still chases emissions.",
    harvester: false,
    pickInitial: (day0) => bestByTotal(day0.pools).project,
    decide: ({ snapshot, currentProject }) => {
      const current = findPool(snapshot, currentProject);
      const top = bestByTotal(snapshot.pools);
      const delta =
        (top.apyBase + top.apyReward) - (current.apyBase + current.apyReward);
      if (top.project === currentProject) return null;
      if (delta < 0.1) return null;
      return top.project;
    },
  },
  {
    id: "our-agent-watcher",
    name: "Our Agent (no harvest)",
    blurb: "Two-gate policy. Doesn't claim rewards — they sit unclaimed.",
    harvester: false,
    pickInitial: (day0) => bestByOrganic(day0.pools).project,
    decide: ourAgentDecide,
  },
  {
    id: "our-agent",
    name: "Our Agent",
    blurb:
      "Two-gate policy + auto-harvest: claims rewards weekly, swaps to USDC, redeposits.",
    harvester: true,
    pickInitial: (day0) => bestByOrganic(day0.pools).project,
    decide: ourAgentDecide,
  },
];

export type RunParams = {
  series: DaySnapshot[];
  principalUsd: number;
  gasUsd: number;
  slippageBps: number;
  policy: Policy;
};

// Per-protocol op cost multipliers, relative to a generic supply tx (~150k gas
// units). Cross-checked against recent receipts on basescan.
const PROTOCOL_GAS_MULT: Record<string, number> = {
  "aave-v3": 1.20, // ~180k — more bookkeeping in Pool.supply
  "morpho-blue": 1.45, // ~220k — vault wrapper adds layers
  "fluid-lending": 1.30, // ~195k
  "compound-v3": 1.00, // ~150k — Comet is streamlined
  "moonwell": 1.20,
  "spark": 1.20,
  "euler-v2": 1.40,
};

// Per-protocol reward-token swap slippage on Base (Aerodrome/Uniswap V3 routes).
// Captures both quoted slippage AND post-claim price decay in the same block:
// reward tokens often dump 1–3% when whales claim+sell, especially thin ones.
const REWARD_SWAP_BPS: Record<string, number> = {
  "aave-v3": 50, // AAVE has decent Aerodrome depth
  "morpho-blue": 80, // MORPHO emissions, mid-depth
  "fluid-lending": 150, // FLUID is thin, dumps hard post-emission
  "compound-v3": 30, // COMP has the best L1+L2 liquidity of the four
  "moonwell": 120,
  "spark": 100,
  "euler-v2": 130,
};

const BASE_GAS_USD = 0.05;
const REBALANCE_GAS_MULT = 2.0; // withdraw + supply
const HARVEST_GAS_MULT = 1.7; // claim + swap + supply
const HARVEST_THRESHOLD_GAS_MULT = 8;

function gasForRebalance(fromProject: string, toProject: string): number {
  const fromMult = PROTOCOL_GAS_MULT[fromProject] ?? 1.2;
  const toMult = PROTOCOL_GAS_MULT[toProject] ?? 1.2;
  return BASE_GAS_USD * REBALANCE_GAS_MULT * ((fromMult + toMult) / 2);
}

function gasForHarvest(project: string): number {
  const mult = PROTOCOL_GAS_MULT[project] ?? 1.2;
  return BASE_GAS_USD * HARVEST_GAS_MULT * mult;
}

function harvestSlippageBps(project: string): number {
  return REWARD_SWAP_BPS[project] ?? 100;
}

export function runStrategy(strategy: Strategy, params: RunParams): StrategyResult {
  const { series, principalUsd, gasUsd, slippageBps, policy } = params;
  const day0 = series[0]!;
  let currentProject = strategy.pickInitial(day0);
  let usdcBalance = principalUsd;
  let unclaimed = 0; // reward stash earned but not yet claimed/swapped
  let daysSinceLastMove = 0;
  let totalMoves = 0;
  let totalHarvests = 0;
  let totalCost = 0;
  const history: { day: number; project: string }[] = [
    { day: 0, project: currentProject },
  ];
  const balanceHistory: number[] = [];

  for (let i = 0; i < series.length; i++) {
    const snapshot = series[i]!;
    const pool = findPool(snapshot, currentProject);

    // Base APY compounds on the deposited USDC. Reward APY accumulates as a
    // separate stash that does NOT compound until it's claimed and swapped.
    const baseDaily = (pool.apyBase ?? 0) / 100 / 365;
    const rewardDaily = (pool.apyReward ?? 0) / 100 / 365;
    const baseEarned = usdcBalance * baseDaily;
    const rewardEarned = usdcBalance * rewardDaily;
    usdcBalance += baseEarned;
    unclaimed += rewardEarned;

    // Strategy rebalance decision
    const target = strategy.decide({
      snapshot,
      currentProject,
      daysSinceLastMove,
      balanceUsd: usdcBalance + unclaimed,
      policy,
    });

    if (target && target !== currentProject) {
      const slippage = usdcBalance * (slippageBps / 10_000);
      const baseRebalanceGas = gasForRebalance(currentProject, target);
      const gasWithFee = baseRebalanceGas * (1 + policy.keeperFeePct);
      usdcBalance -= gasWithFee + slippage;
      totalCost += gasWithFee + slippage;
      totalMoves += 1;
      currentProject = target;
      daysSinceLastMove = 0;
      history.push({ day: snapshot.day, project: target });
    } else {
      daysSinceLastMove += 1;
    }

    // Harvester: claim the stash when it's worth more than threshold × gas.
    // Per-protocol swap slippage reflects token depth on Aerodrome/Uniswap V3
    // and post-emission price decay in the same block.
    const harvestGasBase = gasForHarvest(currentProject);
    const slipBps = harvestSlippageBps(currentProject);
    if (
      strategy.harvester &&
      unclaimed > harvestGasBase * HARVEST_THRESHOLD_GAS_MULT
    ) {
      const swapCost = unclaimed * (slipBps / 10_000);
      const harvestGasWithFee = harvestGasBase * (1 + policy.keeperFeePct);
      const netClaimed = unclaimed - harvestGasWithFee - swapCost;
      if (netClaimed > 0) {
        usdcBalance += netClaimed;
        totalCost += harvestGasWithFee + swapCost;
        totalHarvests += 1;
      }
      unclaimed = 0;
    }

    // For the chart: NAV = compounded USDC + 95% of unclaimed (assume one
    // eventual end-claim with friction).
    balanceHistory.push(usdcBalance + unclaimed * 0.95);
  }

  // End-of-run: non-harvester strategies do one final claim, paying friction.
  let finalBalance = usdcBalance;
  let finalUnclaimed = unclaimed;
  const endHarvestGas = gasForHarvest(currentProject);
  if (unclaimed > endHarvestGas) {
    const swapCost = unclaimed * (harvestSlippageBps(currentProject) / 10_000);
    const netClaimed = unclaimed - endHarvestGas - swapCost;
    if (netClaimed > 0) {
      finalBalance += netClaimed;
      finalUnclaimed = 0;
      totalCost += endHarvestGas + swapCost;
    }
  }

  const roiPct = ((finalBalance - principalUsd) / principalUsd) * 100;
  // Compound annualization: (1+r)^(365/days) − 1 — what users actually see on
  // their balance, not the linearly-extrapolated overstatement.
  const days = Math.max(1, series.length);
  const totalReturn = finalBalance / principalUsd;
  const netApyPct = (Math.pow(totalReturn, 365 / days) - 1) * 100;

  return {
    id: strategy.id,
    name: strategy.name,
    blurb: strategy.blurb,
    finalBalanceUsd: finalBalance,
    unclaimedRewardsUsd: finalUnclaimed,
    roiPct,
    netApyPct,
    totalMoves,
    totalHarvests,
    totalCostUsd: totalCost,
    history,
    balanceHistory,
  };
}

export type BenchmarkParams = {
  principalUsd: number;
  days: number;
  seed: number;
};

export function runStrategiesOnSeries(
  series: DaySnapshot[],
  principalUsd: number,
  policyOverride?: Partial<Policy>,
): StrategyResult[] {
  const policy = { ...DEFAULT_POLICY, ...policyOverride };
  const params: RunParams = {
    series,
    principalUsd,
    gasUsd: policy.gasCostUsd,
    slippageBps: policy.slippageBufferBps,
    policy,
  };
  return STRATEGIES.map((s) => runStrategy(s, params));
}

export function runBenchmark({
  principalUsd,
  days,
  seed,
}: BenchmarkParams): {
  series: DaySnapshot[];
  results: StrategyResult[];
} {
  const series = generateSeries({ days, seed });
  const results = runStrategiesOnSeries(series, principalUsd);
  return { series, results };
}
