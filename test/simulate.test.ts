/**
 * Unit tests for the single-day scenario simulator (bull/base/bear).
 * Verifies the math behind /notes#simulate matches what we display.
 */

import { describe, it, expect } from "vitest";
import { DEFAULT_POLICY } from "../src/policy";
import { makeScenarios, simulate } from "../src/simulate";

describe("simulate", () => {
  it("makeScenarios returns three scenarios with monotonically smaller deltas", () => {
    const scenarios = makeScenarios(10_000);
    expect(scenarios.map((s) => s.name)).toEqual(["bull", "base", "bear"]);

    const deltas = scenarios.map(
      (s) => s.best.apyBase - s.current.currentApy,
    );
    expect(deltas[0]).toBeGreaterThan(deltas[1]!);
    expect(deltas[1]).toBeGreaterThan(deltas[2]!);
  });

  it("bear case ALWAYS holds (delta below minApyDelta gate)", () => {
    const scenarios = makeScenarios(10_000);
    const bear = scenarios.find((s) => s.name === "bear")!;
    const result = simulate(bear, DEFAULT_POLICY);
    expect(result.decision.move).toBe(false);
  });

  it("scales linearly with principal — extra yield is exactly principal × Δ × t", () => {
    const scenarios = makeScenarios(1_000);
    const bull = scenarios.find((s) => s.name === "bull")!;
    const r1 = simulate(bull, DEFAULT_POLICY);

    const scaled = makeScenarios(10_000);
    const bullScaled = scaled.find((s) => s.name === "bull")!;
    const r10 = simulate(bullScaled, DEFAULT_POLICY);

    // 10x principal → 10x extra yield (since slippage is 0 bps now)
    expect(r10.math.extraYieldUsd).toBeCloseTo(r1.math.extraYieldUsd * 10, 4);
  });

  it("break-even Δ depends on safetyMargin × cost / yield denominators", () => {
    const scenarios = makeScenarios(10_000);
    const bull = scenarios.find((s) => s.name === "bull")!;

    const tighter = simulate(bull, { ...DEFAULT_POLICY, safetyMargin: 3 });
    const looser = simulate(bull, { ...DEFAULT_POLICY, safetyMargin: 1 });

    expect(tighter.math.breakEvenDelta).toBeGreaterThan(
      looser.math.breakEvenDelta,
    );
  });

  it("returns a non-empty reason on every result", () => {
    for (const scenario of makeScenarios(5_000)) {
      const r = simulate(scenario, DEFAULT_POLICY);
      expect(r.decision.reason.length).toBeGreaterThan(5);
    }
  });

  it("bull case becomes MOVE only above a principal threshold", () => {
    // At very small principal, even bull should HOLD because gas dominates
    const tiny = makeScenarios(50);
    const tinyBull = tiny.find((s) => s.name === "bull")!;
    expect(simulate(tinyBull, DEFAULT_POLICY).decision.move).toBe(false);

    // At large principal, bull should MOVE (math passes)
    const big = makeScenarios(1_000_000);
    const bigBull = big.find((s) => s.name === "bull")!;
    expect(simulate(bigBull, DEFAULT_POLICY).decision.move).toBe(true);
  });
});
