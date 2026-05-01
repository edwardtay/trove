"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  runStrategiesOnSeries,
  type DaySnapshot,
  type StrategyResult,
} from "../../src/benchmark";

const COLORS: Record<string, string> = {
  "pinned-aave": "#94a3b8",
  "pinned-day1-top": "#2563eb",
  "manual-weekly": "#d97706",
  "manual-daily": "#e11d48",
  "naive-max-apy": "#7c3aed",
  "reward-chaser": "#ea580c",
  "our-agent-watcher": "#10b981",
  "our-agent": "#059669",
};

function StrategyIcon({ id, color }: { id: string; color: string }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "shrink-0",
  };
  switch (id) {
    case "pinned-aave":
      // pin / anchor
      return (
        <svg {...props}>
          <circle cx="8" cy="4" r="2" />
          <path d="M8 6v8M3 14h10" />
        </svg>
      );
    case "pinned-day1-top":
      // medal / star
      return (
        <svg {...props}>
          <path d="M8 1.5l1.85 3.75 4.15.6-3 2.93.7 4.12L8 10.95 4.3 12.9l.7-4.12-3-2.93 4.15-.6L8 1.5z" />
        </svg>
      );
    case "manual-weekly":
      // calendar (weekly)
      return (
        <svg {...props}>
          <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
          <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" />
        </svg>
      );
    case "manual-daily":
      // clock (daily)
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="6" />
          <path d="M8 4.5V8l2.2 1.6" />
        </svg>
      );
    case "naive-max-apy":
      // rocket / trending up
      return (
        <svg {...props}>
          <path d="M2 12l4-4 3 3 5-5" />
          <path d="M9 6h5v5" />
        </svg>
      );
    case "reward-chaser":
      // gift box
      return (
        <svg {...props}>
          <rect x="2.5" y="6.5" width="11" height="7" rx="0.5" />
          <path d="M2 6.5h12M8 6.5v7M5 6.5c-1.5 0-1.5-3 0-3 1 0 2 1 3 3-1 0-3 0-3 0zM11 6.5c1.5 0 1.5-3 0-3-1 0-2 1-3 3 1 0 3 0 3 0z" />
        </svg>
      );
    case "our-agent-watcher":
      // eye (watching only)
      return (
        <svg {...props}>
          <path d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8z" />
          <circle cx="8" cy="8" r="2" />
        </svg>
      );
    case "our-agent":
      // shield with check (active hero)
      return (
        <svg {...props}>
          <path d="M8 1.5L2.5 4v4c0 3.3 2.4 6.2 5.5 7 3.1-.8 5.5-3.7 5.5-7V4L8 1.5z" />
          <path d="M5.5 8l1.8 1.8L10.5 6.5" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="3.5" />
        </svg>
      );
  }
}

type Props = {
  realSeries: DaySnapshot[] | null;
  dateRange: { startDate: string; endDate: string } | null;
  realError: string | null;
  initial: {
    principal: number;
    days: number;
    minApyDelta: number;
    safetyMargin: number;
  };
};

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

function fmtPct(n: number, signed = true) {
  const sign = signed && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function fmtOps(r: StrategyResult): string {
  if (r.totalMoves === 0 && r.totalHarvests === 0) return "—";
  if (r.totalHarvests === 0) return `${r.totalMoves}`;
  if (r.totalMoves === 0) return `${r.totalHarvests}h`;
  return `${r.totalMoves} · ${r.totalHarvests}h`;
}

function Row({
  result: r,
}: {
  result: StrategyResult;
}) {
  const color = COLORS[r.id] ?? "#000";
  return (
    <tr
      className="border-b border-neutral-100 last:border-0"
      title={`${r.blurb}${r.totalCostUsd > 0 ? ` · cost $${r.totalCostUsd.toFixed(2)}` : ""}`}
    >
      <td className="px-3 py-1.5">
        <span className="flex items-center gap-2">
          <StrategyIcon id={r.id} color={color} />
          <span className="text-[13px] text-neutral-900">{r.name}</span>
        </span>
      </td>
      <td className="px-3 py-1.5 text-right font-mono text-[13px] tabular-nums">
        {fmtUsd(r.finalBalanceUsd)}
      </td>
      <td className="px-3 py-1.5 text-right font-mono text-[13px] tabular-nums text-neutral-500">
        {fmtPct(r.netApyPct)}
      </td>
      <td className="px-3 py-1.5 text-right font-mono text-[13px] tabular-nums text-neutral-500">
        {fmtOps(r)}
      </td>
    </tr>
  );
}

function HeroRow({
  result: r,
  rank,
  total,
}: {
  result: StrategyResult;
  rank: number;
  total: number;
}) {
  const color = COLORS[r.id] ?? "#059669";
  return (
    <tr
      className="border-b-2 border-emerald-300 bg-emerald-50"
      title={r.blurb}
    >
      <td
        className="border-l-[3px] py-2 pl-3 pr-3"
        style={{ borderLeftColor: color }}
      >
        <span className="flex items-center gap-2">
          <StrategyIcon id={r.id} color={color} />
          <span className="text-[13px] font-semibold text-emerald-900">
            {r.name}
          </span>
          <span className="rounded-sm bg-emerald-600 px-1 py-px text-[8px] font-bold uppercase tracking-wider text-white">
            you
          </span>
          <span className="text-[10px] text-emerald-700/80">
            #{rank}/{total}
          </span>
        </span>
      </td>
      <td className="py-2 pl-3 pr-3 text-right font-mono text-[13px] font-semibold tabular-nums text-emerald-900">
        {fmtUsd(r.finalBalanceUsd)}
      </td>
      <td className="py-2 pl-3 pr-3 text-right font-mono text-[13px] font-semibold tabular-nums text-emerald-900">
        {fmtPct(r.netApyPct)}
      </td>
      <td className="py-2 pl-3 pr-3 text-right font-mono text-[13px] tabular-nums text-emerald-700">
        {fmtOps(r)}
      </td>
    </tr>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </span>
        <span className="font-mono text-[12px] tabular-nums text-ink">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-600"
      />
    </label>
  );
}

function logSliderToValue(slider: number): number {
  // 0..100 → $100..$1,000,000 logarithmic
  const minLog = Math.log10(100);
  const maxLog = Math.log10(1_000_000);
  return Math.round(10 ** (minLog + (slider / 100) * (maxLog - minLog)));
}

function valueToLogSlider(value: number): number {
  const minLog = Math.log10(100);
  const maxLog = Math.log10(1_000_000);
  return ((Math.log10(value) - minLog) / (maxLog - minLog)) * 100;
}

function Chart({
  results,
  days,
  principalUsd,
}: {
  results: StrategyResult[];
  days: number;
  principalUsd: number;
}) {
  const W = 800;
  const H = 280;
  const PAD_L = 56;
  const PAD_R = 8;
  const PAD_T = 8;
  const PAD_B = 24;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const allBalances = results.flatMap((r) => r.balanceHistory);
  const minB = Math.min(...allBalances, principalUsd);
  const maxB = Math.max(...allBalances);
  const padY = (maxB - minB) * 0.05 || principalUsd * 0.001;
  const yMin = minB - padY;
  const yMax = maxB + padY;

  const xScale = (i: number) => PAD_L + (i / Math.max(1, days - 1)) * innerW;
  const yScale = (b: number) =>
    PAD_T + (1 - (b - yMin) / (yMax - yMin)) * innerH;

  const yTicks = 4;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
    yMin + ((yMax - yMin) * i) / yTicks,
  );
  const xTickInterval = days <= 30 ? 5 : days <= 90 ? 15 : days <= 180 ? 30 : 60;
  const xTickValues: number[] = [];
  for (let d = 0; d <= days - 1; d += xTickInterval) xTickValues.push(d);
  if (xTickValues[xTickValues.length - 1] !== days - 1)
    xTickValues.push(days - 1);

  const linePath = (history: number[]) =>
    history
      .map(
        (b, i) =>
          `${i === 0 ? "M" : "L"}${xScale(i).toFixed(2)},${yScale(b).toFixed(2)}`,
      )
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="strategy balance over time"
    >
      {yTickValues.map((v, i) => {
        const y = yScale(v);
        return (
          <g key={`y-${i}`}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y}
              y2={y}
              stroke="#f5f5f4"
              strokeWidth="1"
            />
            <text
              x={PAD_L - 6}
              y={y + 3}
              textAnchor="end"
              className="fill-stone-400 font-mono"
              style={{ fontSize: "9px" }}
            >
              {fmtUsd(v).replace(".00", "")}
            </text>
          </g>
        );
      })}
      <line
        x1={PAD_L}
        x2={W - PAD_R}
        y1={yScale(principalUsd)}
        y2={yScale(principalUsd)}
        stroke="#d6d3d1"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {xTickValues.map((d) => (
        <text
          key={`x-${d}`}
          x={xScale(d)}
          y={H - PAD_B + 14}
          textAnchor="middle"
          className="fill-stone-400 font-mono"
          style={{ fontSize: "9px" }}
        >
          d{d}
        </text>
      ))}
      {results.map((r) => {
        const isHero = r.id === "our-agent";
        return (
          <path
            key={r.id}
            d={linePath(r.balanceHistory)}
            fill="none"
            stroke={COLORS[r.id] ?? "#000"}
            strokeWidth={isHero ? 2.5 : 1.25}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={isHero ? 1 : 0.8}
          >
            <title>{`${r.name}: ${fmtUsd(r.finalBalanceUsd)} (${fmtPct(r.roiPct)})`}</title>
          </path>
        );
      })}
    </svg>
  );
}

export default function InteractiveBenchmark({
  realSeries,
  dateRange,
  realError,
  initial,
}: Props) {
  const [principal, setPrincipal] = useState(initial.principal);
  const [days, setDays] = useState(
    realSeries ? Math.min(initial.days, realSeries.length) : initial.days,
  );
  const [minApyDelta, setMinApyDelta] = useState(initial.minApyDelta);
  const [safetyMargin, setSafetyMargin] = useState(initial.safetyMargin);
  const [keeperFeePct, setKeeperFeePct] = useState(0);

  const series = useMemo(
    () => (realSeries ? realSeries.slice(realSeries.length - days) : []),
    [realSeries, days],
  );

  const results = useMemo(
    () =>
      runStrategiesOnSeries(series, principal, {
        minApyDelta,
        safetyMargin,
        keeperFeePct,
      }),
    [series, principal, minApyDelta, safetyMargin, keeperFeePct],
  );

  const ranked = [...results].sort(
    (a, b) => b.finalBalanceUsd - a.finalBalanceUsd,
  );
  const ourRank = ranked.findIndex((r) => r.id === "our-agent") + 1;
  const maxDays = realSeries?.length ?? 365;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex items-center justify-between">
        <Link
          href="/notes"
          className="text-xs text-neutral-500 hover:text-neutral-800"
        >
          ← /notes
        </Link>
        <span className="text-xs text-neutral-400">private · localhost</span>
      </header>

      <div className="mt-6 flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Benchmark
        </h1>
        {dateRange && (
          <span className="text-xs text-neutral-500">
            real DeFiLlama · {dateRange.startDate} → {dateRange.endDate}
          </span>
        )}
      </div>

      {realError && (
        <div className="mt-3 rounded border border-rose-200 bg-rose-50 p-2 text-xs text-rose-800">
          DeFiLlama fetch failed: {realError}
        </div>
      )}

      <section className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg border border-neutral-200 bg-white p-4 sm:grid-cols-3 lg:grid-cols-5">
        <Slider
          label="Principal"
          value={valueToLogSlider(principal)}
          min={0}
          max={100}
          step={1}
          onChange={(v) => setPrincipal(logSliderToValue(v))}
          format={() => fmtUsdShort(principal)}
        />
        <Slider
          label="Days"
          value={days}
          min={7}
          max={maxDays}
          step={1}
          onChange={setDays}
          format={(n) => `${n}d`}
        />
        <Slider
          label="Min Δ APY"
          value={minApyDelta}
          min={0.1}
          max={2}
          step={0.05}
          onChange={setMinApyDelta}
          format={(n) => `${n.toFixed(2)}%`}
        />
        <Slider
          label="Safety ×"
          value={safetyMargin}
          min={1}
          max={3}
          step={0.05}
          onChange={setSafetyMargin}
          format={(n) => `×${n.toFixed(2)}`}
        />
        <Slider
          label="Keeper fee"
          value={keeperFeePct}
          min={0}
          max={0.3}
          step={0.01}
          onChange={setKeeperFeePct}
          format={(n) => `+${(n * 100).toFixed(0)}%`}
        />
      </section>

      <section className="mt-4 rounded-lg border border-neutral-200 bg-white p-3">
        <Chart results={results} days={days} principalUsd={principal} />
      </section>

      <section className="mt-4 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-[10px] uppercase tracking-wider text-neutral-500">
              <th className="px-3 py-1.5 font-semibold">Strategy</th>
              <th className="px-3 py-1.5 text-right font-semibold">Final</th>
              <th className="px-3 py-1.5 text-right font-semibold">APY</th>
              <th className="px-3 py-1.5 text-right font-semibold">Ops</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((r) =>
              r.id === "our-agent" ? (
                <HeroRow
                  key={r.id}
                  result={r}
                  rank={ourRank}
                  total={results.length}
                />
              ) : (
                <Row key={r.id} result={r} />
              ),
            )}
          </tbody>
        </table>
      </section>

      <p className="mt-3 text-[11px] leading-relaxed text-neutral-400">
        Ops: bare = rebalance, <span className="font-mono">h</span> = harvest. Hover any row for the
        strategy&apos;s blurb.
      </p>
    </main>
  );
}
