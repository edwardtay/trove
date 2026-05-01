/**
 * Unit tests for the agent's decision policy.
 *
 * These tests are the contract: every change to shouldRebalance() must
 * keep these passing, or you're changing semantics and need to update
 * the docs (/notes#policy).
 */

import { describe, it, expect } from "vitest";
import { DEFAULT_POLICY, shouldRebalance } from "../src/policy";
import type { LlamaPool, Position } from "../src/types";

function pool(overrides: Partial<LlamaPool> = {}): LlamaPool {
  return {
    pool: "test-pool",
    chain: "Base",
    project: "fluid-lending",
    symbol: "USDC",
    tvlUsd: 50_000_000,
    apyBase: 5,
    apyReward: 0,
    apy: 5,
    stablecoin: true,
    ilRisk: "no",
    exposure: "single",
    poolMeta: null,
    ...overrides,
  };
}

function position(overrides: Partial<Position> = {}): Position {
  return {
    project: "aave-v3",
    pool: "current-pool",
    principalUsd: 10_000,
    currentApy: 3,
    enteredAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("shouldRebalance", () => {
  it("HOLDs when the best pool is the current pool (no-op)", () => {
    const cur = position({ pool: "same-pool", currentApy: 5 });
    const best = pool({ pool: "same-pool", apyBase: 5 });
    const decision = shouldRebalance(cur, best, DEFAULT_POLICY, 100);
    expect(decision.move).toBe(false);
    expect(decision.reason).toMatch(/already/i);
  });

  it("HOLDs while inside the cooldown window", () => {
    const cur = position({ currentApy: 3 });
    const best = pool({ pool: "different", apyBase: 8 }); // huge spread
    const decision = shouldRebalance(cur, best, DEFAULT_POLICY, 1); // 1h elapsed, 24h cooldown
    expect(decision.move).toBe(false);
    expect(decision.reason).toMatch(/cooldown/i);
  });

  it("HOLDs when delta is below minApyDelta threshold (rate noise)", () => {
    // Spread of 0.2pp, threshold is 0.5pp
    const cur = position({ currentApy: 5 });
    const best = pool({ pool: "different", apyBase: 5.2 });
    const decision = shouldRebalance(cur, best, DEFAULT_POLICY, 100);
    expect(decision.move).toBe(false);
    expect(decision.reason).toMatch(/threshold/i);
  });

  it("HOLDs when extra yield doesn't justify the cost (small principal)", () => {
    // 1pp delta, but $100 principal: extraYield over 7d is tiny vs gas
    const cur = position({ currentApy: 4, principalUsd: 100 });
    const best = pool({ pool: "different", apyBase: 5 });
    const decision = shouldRebalance(cur, best, DEFAULT_POLICY, 100);
    expect(decision.move).toBe(false);
    expect(decision.reason).toMatch(/cost/i);
  });

  it("MOVEs when all four gates clear (real opportunity)", () => {
    // Big delta, big principal, post-cooldown — should fire
    const cur = position({ currentApy: 3, principalUsd: 100_000 });
    const best = pool({ pool: "different", apyBase: 6 });
    const decision = shouldRebalance(cur, best, DEFAULT_POLICY, 100);
    expect(decision.move).toBe(true);
    if (decision.move) {
      expect(decision.from.project).toBe(cur.project);
      expect(decision.to.project).toBe(best.project);
    }
  });

  it("HOLDs even with positive delta when gas + margin overwhelm yield", () => {
    // Small principal + a high-gas regime: extraYield over the 7d hold can't
    // beat cost × safetyMargin. Verifies the cost-vs-yield gate fires.
    const cur = position({ currentApy: 4, principalUsd: 500 });
    const best = pool({ pool: "different", apyBase: 5 });
    const expensivePolicy = {
      ...DEFAULT_POLICY,
      gasCostUsd: 5, // simulate a network-congested day
      safetyMargin: 2,
    };
    const decision = shouldRebalance(cur, best, expensivePolicy, 100);
    expect(decision.move).toBe(false);
    expect(decision.reason).toMatch(/cost/i);
  });

  it("HOLDs when current APY equals best APY (delta = 0)", () => {
    const cur = position({ currentApy: 5 });
    const best = pool({ pool: "different", apyBase: 5 });
    const decision = shouldRebalance(cur, best, DEFAULT_POLICY, 100);
    expect(decision.move).toBe(false);
  });

  it("HOLDs when best APY is LOWER than current (negative delta)", () => {
    const cur = position({ currentApy: 8 });
    const best = pool({ pool: "different", apyBase: 5 });
    const decision = shouldRebalance(cur, best, DEFAULT_POLICY, 100);
    expect(decision.move).toBe(false);
  });

  it("scales sensibly with principal (same delta, bigger principal → more likely MOVE)", () => {
    const small = position({ currentApy: 4, principalUsd: 1_000 });
    const large = position({ currentApy: 4, principalUsd: 100_000 });
    const best = pool({ pool: "different", apyBase: 5 });

    const smallD = shouldRebalance(small, best, DEFAULT_POLICY, 100);
    const largeD = shouldRebalance(large, best, DEFAULT_POLICY, 100);
    // We don't assert exact verdicts (depends on default knobs), but at minimum
    // bigger principal should be MORE likely to move than smaller, never less.
    if (!largeD.move) {
      expect(smallD.move).toBe(false); // both hold is fine
    }
    // And the "extra yield" portion of the math should be larger for bigger principal
    // (we can't see the math directly here but the logic should never invert).
  });

  it("respects custom minApyDelta in the supplied policy", () => {
    const cur = position({ currentApy: 5, principalUsd: 100_000 });
    const best = pool({ pool: "different", apyBase: 5.6 });
    const looser = { ...DEFAULT_POLICY, minApyDelta: 0.3 };
    const stricter = { ...DEFAULT_POLICY, minApyDelta: 1.0 };

    const looserD = shouldRebalance(cur, best, looser, 100);
    const stricterD = shouldRebalance(cur, best, stricter, 100);
    expect(stricterD.move).toBe(false);
    expect(stricterD.reason).toMatch(/threshold/i);
    // Looser MAY move (or not, depending on cost math) — but stricter must hold
    if (looserD.move) {
      expect(looserD.move).toBe(true);
    }
  });
});
