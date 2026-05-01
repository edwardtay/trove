"use client";

import { useMemo, useState } from "react";
import { DEFAULT_POLICY } from "../../src/policy";
import { protocolName } from "../../src/protocols";
import {
  makeScenarios,
  simulate,
  type SimulationResult,
} from "../../src/simulate";

function fmtUsd(n: number) {
  if (n >= 1) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(3)}`;
}

function fmtUsdShort(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return `$${n}`;
}

function fmtPct(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
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
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          {label}
        </span>
        <span className="font-mono text-xs tabular-nums text-neutral-900">
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
        className="w-full accent-neutral-900"
      />
    </label>
  );
}

function Verdict({ result }: { result: SimulationResult }) {
  const move = result.decision.move;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${
        move
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200"
      }`}
    >
      {move ? "MOVE" : "HOLD"}
    </span>
  );
}

function Card({ result }: { result: SimulationResult }) {
  const { scenario, math, decision, policy } = result;
  const accent =
    scenario.name === "bull"
      ? "border-emerald-200"
      : scenario.name === "bear"
      ? "border-rose-200"
      : "border-neutral-200";
  return (
    <article className={`rounded-md border ${accent} bg-white p-4`}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
            {scenario.label}
          </div>
          <h4 className="mt-1 text-sm font-semibold tracking-tight text-neutral-900">
            {protocolName(scenario.current.project)} → {protocolName(scenario.best.project)}
          </h4>
        </div>
        <Verdict result={result} />
      </header>
      <p className="mt-2 text-xs leading-relaxed text-neutral-600">
        {scenario.blurb}
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-y-1 text-xs">
        <dt className="text-neutral-500">Δ APY</dt>
        <dd className="text-right font-mono text-neutral-900">
          {fmtPct(math.apyDelta)}
        </dd>
        <dt className="text-neutral-500">Extra yield ({policy.minHoldingDays}d)</dt>
        <dd className="text-right font-mono text-neutral-900">
          {fmtUsd(math.extraYieldUsd)}
        </dd>
        <dt className="text-neutral-500">Cost × {policy.safetyMargin.toFixed(1)}</dt>
        <dd className="text-right font-mono text-neutral-900">
          {fmtUsd(math.totalCostUsd * policy.safetyMargin)}
        </dd>
        <dt className="text-neutral-500">Break-even Δ</dt>
        <dd className="text-right font-mono text-neutral-900">
          {Number.isFinite(math.breakEvenDelta)
            ? `${math.breakEvenDelta.toFixed(2)}%`
            : "—"}
        </dd>
      </dl>
      <p className="mt-3 border-t border-neutral-100 pt-2 text-[11px] leading-relaxed text-neutral-600">
        {decision.reason}
      </p>
    </article>
  );
}

export default function InteractiveSimulate() {
  const [principal, setPrincipal] = useState(100);
  const [holdingDays, setHoldingDays] = useState(7);
  const [margin, setMargin] = useState(DEFAULT_POLICY.safetyMargin);

  const policy = useMemo(
    () => ({
      ...DEFAULT_POLICY,
      minHoldingDays: holdingDays,
      safetyMargin: margin,
    }),
    [holdingDays, margin],
  );

  const results = useMemo(() => {
    const scenarios = makeScenarios(principal);
    return scenarios.map((s) => simulate(s, policy));
  }, [principal, policy]);

  const moves = results.filter((r) => r.decision.move).length;

  return (
    <div>
      <p className="text-sm leading-relaxed text-neutral-600">
        Three synthetic scenarios — Bull (5pp Δ), Base (1pp Δ), Bear (0.2pp Δ) —
        all run through the same{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-xs">
          shouldRebalance
        </code>
        . Sweep the sliders to see when each verdict flips.{" "}
        <span className="font-semibold text-neutral-900">{moves}/3</span>{" "}
        scenarios rotate at this combination.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 rounded-md border border-neutral-200 bg-white p-3 sm:grid-cols-3">
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
          label="Hold (days)"
          value={holdingDays}
          min={1}
          max={365}
          step={1}
          onChange={setHoldingDays}
          format={(n) => `${n}d`}
        />
        <Slider
          label="Safety ×"
          value={margin}
          min={1}
          max={3}
          step={0.05}
          onChange={setMargin}
          format={(n) => `×${n.toFixed(2)}`}
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {results.map((r) => (
          <Card key={r.scenario.name} result={r} />
        ))}
      </div>
    </div>
  );
}
