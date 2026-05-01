/**
 * Unit tests for the multi-strategy benchmark engine.
 * Verifies the deterministic guarantees + strategy correctness.
 */

import { describe, it, expect } from "vitest";
import { runBenchmark, generateSeries, STRATEGIES } from "../src/benchmark";

describe("benchmark", () => {
  it("generateSeries is deterministic per seed", () => {
    const a = generateSeries({ days: 30, seed: 42 });
    const b = generateSeries({ days: 30, seed: 42 });
    expect(a).toEqual(b);
  });

  it("different seeds produce different series", () => {
    const a = generateSeries({ days: 30, seed: 42 });
    const b = generateSeries({ days: 30, seed: 1337 });
    expect(JSON.stringify(a)).not.toEqual(JSON.stringify(b));
  });

  it("series length equals days requested", () => {
    const s = generateSeries({ days: 90, seed: 1 });
    expect(s.length).toBe(90);
    expect(s[0]!.day).toBe(0);
    expect(s[89]!.day).toBe(89);
  });

  it("Pinned strategies never rebalance (totalMoves = 0)", () => {
    const { results } = runBenchmark({
      principalUsd: 10_000,
      days: 90,
      seed: 42,
    });
    const pinned = results.filter((r) => r.id.startsWith("pinned-"));
    expect(pinned.length).toBeGreaterThan(0);
    pinned.forEach((p) => expect(p.totalMoves).toBe(0));
  });

  it("Manual Daily executes more rebalances than Manual Weekly (more frequent leader changes captured)", () => {
    const { results } = runBenchmark({
      principalUsd: 10_000,
      days: 180,
      seed: 42,
    });
    const daily = results.find((r) => r.id === "manual-daily")!;
    const weekly = results.find((r) => r.id === "manual-weekly")!;
    expect(daily.totalMoves).toBeGreaterThanOrEqual(weekly.totalMoves);
  });

  it("Our Agent (with harvester) does at least one harvest at scale", () => {
    const { results } = runBenchmark({
      principalUsd: 100_000,
      days: 180,
      seed: 42,
    });
    const ours = results.find((r) => r.id === "our-agent")!;
    expect(ours.totalHarvests).toBeGreaterThan(0);
  });

  it("balanceHistory length matches series length for every strategy", () => {
    const { series, results } = runBenchmark({
      principalUsd: 10_000,
      days: 60,
      seed: 7,
    });
    results.forEach((r) =>
      expect(r.balanceHistory.length).toBe(series.length),
    );
  });

  it("final balance ≥ principal is plausible across strategies (organic yield > 0)", () => {
    const { results } = runBenchmark({
      principalUsd: 10_000,
      days: 90,
      seed: 42,
    });
    // At least one strategy should net-up over 90 days at typical USDC
    // yields; we don't require all because aggressive strategies can lose
    // to slippage at small principal.
    const winners = results.filter((r) => r.finalBalanceUsd > 10_000);
    expect(winners.length).toBeGreaterThan(0);
  });

  it("STRATEGIES array contains exactly the expected eight slugs", () => {
    const slugs = STRATEGIES.map((s) => s.id).sort();
    expect(slugs).toEqual(
      [
        "manual-daily",
        "manual-weekly",
        "naive-max-apy",
        "our-agent",
        "our-agent-watcher",
        "pinned-aave",
        "pinned-day1-top",
        "reward-chaser",
      ].sort(),
    );
  });
});
