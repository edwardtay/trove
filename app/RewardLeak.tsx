"use client";

import { useMemo, useState } from "react";
import { protocolName } from "../src/protocols";

type PoolReward = {
  project: string;
  apyBase: number;
  apyReward: number;
  tvlUsdM: number;
};

type Props = {
  pools: PoolReward[];
};

const HARVEST_GAS_USD = 0.3;
const HARVEST_SLIPPAGE_BPS = 50;
const HARVEST_THRESHOLD_GAS_MULT = 8;

function fmtUsd(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function fmtUsdShort(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return `$${n}`;
}

function logSliderToValue(s: number) {
  const minLog = Math.log10(100);
  const maxLog = Math.log10(1_000_000);
  return Math.round(10 ** (minLog + (s / 100) * (maxLog - minLog)));
}

function valueToLogSlider(v: number) {
  const minLog = Math.log10(100);
  const maxLog = Math.log10(1_000_000);
  return ((Math.log10(v) - minLog) / (maxLog - minLog)) * 100;
}

// Simulate one year of the agent's harvest cycle on a given reward APY.
// Returns the net captured after fixed-gas + swap-slippage costs across the
// year, vs the gross "lazy claim once at year-end" baseline.
function simulateYear(
  principalUsd: number,
  apyRewardPct: number,
): { gross: number; netHarvested: number; harvests: number; gasSpent: number } {
  const gross = principalUsd * (apyRewardPct / 100);
  if (gross <= 0)
    return { gross: 0, netHarvested: 0, harvests: 0, gasSpent: 0 };

  // The harvest threshold is gas × multiplier. At a daily reward accrual of
  // (principal × apyReward / 365), the stash hits that threshold every ~N
  // days. Each harvest pays gas + slippage.
  const dailyReward = principalUsd * (apyRewardPct / 100 / 365);
  const threshold = HARVEST_GAS_USD * HARVEST_THRESHOLD_GAS_MULT;
  const daysPerHarvest = threshold / Math.max(dailyReward, 1e-9);

  let netHarvested = 0;
  let gasSpent = 0;
  let harvests = 0;

  if (daysPerHarvest > 365) {
    // Reward stash never reaches threshold. One end-of-year claim, paying once.
    const swap = gross * (HARVEST_SLIPPAGE_BPS / 10_000);
    const net = gross - HARVEST_GAS_USD - swap;
    if (net > 0) {
      netHarvested = net;
      gasSpent = HARVEST_GAS_USD + swap;
      harvests = 1;
    }
  } else {
    harvests = Math.floor(365 / daysPerHarvest);
    const stashPerHarvest = dailyReward * daysPerHarvest;
    const swapPer = stashPerHarvest * (HARVEST_SLIPPAGE_BPS / 10_000);
    const netPer = stashPerHarvest - HARVEST_GAS_USD - swapPer;
    netHarvested = harvests * Math.max(0, netPer);
    gasSpent = harvests * (HARVEST_GAS_USD + swapPer);
    // Account for the leftover stash at year end: assume one final claim.
    const remaining = dailyReward * (365 - harvests * daysPerHarvest);
    if (remaining > HARVEST_GAS_USD) {
      const swap = remaining * (HARVEST_SLIPPAGE_BPS / 10_000);
      netHarvested += remaining - HARVEST_GAS_USD - swap;
      gasSpent += HARVEST_GAS_USD + swap;
    }
  }

  return { gross, netHarvested, harvests, gasSpent };
}

export default function RewardLeak({ pools }: Props) {
  const [principal, setPrincipal] = useState(10_000);

  const rows = useMemo(() => {
    return pools
      .filter((p) => p.apyReward > 0)
      .map((p) => {
        const sim = simulateYear(principal, p.apyReward);
        const lazyLoss = sim.gross - sim.netHarvested;
        return { ...p, ...sim, lazyLoss };
      });
  }, [pools, principal]);

  const topPool = rows[0];

  if (!topPool) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-hairline pb-2.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Calculator · reward leak by stake size
        </h2>
        <span className="font-mono text-[11px] tabular-nums text-ink-faint">
          {fmtUsdShort(principal)}
        </span>
      </div>
      <p className="mb-3 max-w-xl text-[14px] leading-[1.65] text-ink-muted">
        Reward tokens lenders hand out on top of base APY. Most never get
        claimed. Slide to your stake.
      </p>

      <div className="card p-5">
        <label className="block">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Principal
            </span>
            <span className="font-mono text-[13px] tabular-nums text-ink">
              {fmtUsd(principal)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={valueToLogSlider(principal)}
            onChange={(e) =>
              setPrincipal(logSliderToValue(Number(e.target.value)))
            }
            className="w-full accent-emerald-600"
          />
        </label>

        <table className="mt-5 w-full">
          <thead>
            <tr className="border-b border-hairline text-left text-[10px] uppercase tracking-[0.12em] text-ink-faint">
              <th className="py-2 font-semibold">Pool</th>
              <th className="py-2 text-right font-semibold">Reward APY</th>
              <th className="py-2 text-right font-semibold">Annual leak</th>
              <th className="py-2 text-right font-semibold">Agent net</th>
              <th className="py-2 text-right font-semibold">
                Lost to gas/slip
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.project}
                className="border-b border-hairline last:border-0"
              >
                <td className="py-2 text-[13px] text-ink">{protocolName(r.project)}</td>
                <td className="py-2 text-right font-mono text-[13px] tabular-nums text-ink-muted">
                  {r.apyReward.toFixed(2)}%
                </td>
                <td className="py-2 text-right font-mono text-[13px] tabular-nums text-rose-700">
                  {fmtUsd(r.gross)}
                </td>
                <td className="py-2 text-right font-mono text-[13px] tabular-nums text-emerald-700">
                  {fmtUsd(r.netHarvested)}
                </td>
                <td className="py-2 text-right font-mono text-[13px] tabular-nums text-ink-faint">
                  {fmtUsd(r.lazyLoss)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {topPool.gross > 0 && (
          <p className="mt-5 border-t border-hairline pt-4 text-[14px] leading-[1.7] text-ink-muted">
            <span className="font-semibold text-ink">
              {fmtUsd(topPool.gross)}/year
            </span>{" "}
            in {protocolName(topPool.project)} reward tokens at today&apos;s{" "}
            <span className="font-mono tabular-nums">
              {topPool.apyReward.toFixed(2)}%
            </span>{" "}
            on {fmtUsd(principal)} — money most people never claim. The
            agent claims{" "}
            <span className="font-mono tabular-nums">
              {topPool.harvests}×/year
            </span>{" "}
            and keeps{" "}
            <span className="font-mono font-semibold tabular-nums text-emerald-700">
              {fmtUsd(topPool.netHarvested)}
            </span>{" "}
            of it after gas.
          </p>
        )}
      </div>
    </section>
  );
}
