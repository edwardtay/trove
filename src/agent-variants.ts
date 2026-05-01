/**
 * Agent variants — three policy presets that share the same code path
 * (fetch DeFiLlama → shouldRebalance → harvest), differing only in their
 * Policy knobs. Each variant is mintable as a separate iNFT, giving us
 * the multi-agent / swarm narrative without forking the runtime.
 *
 * The 0G OpenAgents brief calls this out explicitly:
 *   "Specialist agent swarms (planner + researcher + critic + executor)
 *    that collaborate via shared 0G Storage memory."
 *
 * Our shape is simpler: three risk profiles of the same base agent. The
 * "specialist" angle comes from each one being a different stance on the
 * speed/safety tradeoff. A user picks the variant that matches their
 * preference; clones inherit the policy and start fresh memory.
 */

import { DEFAULT_POLICY } from "./policy";
import type { Policy } from "./types";

export type Variant = {
  id: string;
  name: string;
  blurb: string;
  accent: "emerald" | "amber" | "rose" | "indigo";
  policy: Policy;
  iNftTokenId: number | null; // null = preset, not yet minted
};

export const VARIANTS: Variant[] = [
  {
    id: "conservative",
    name: "Conservative",
    blurb:
      "Big margin, long hold. Won't fire on noise. For users who'd rather miss a small move than make a bad one.",
    accent: "emerald",
    policy: {
      ...DEFAULT_POLICY,
      minApyDelta: 1.0,
      minHoldingDays: 30,
      safetyMargin: 2.0,
      cooldownHours: 72,
    },
    iNftTokenId: null,
  },
  {
    id: "balanced",
    name: "Balanced",
    blurb:
      "Default policy. Refuses to chase but acts on real spreads. The disciplined middle, minted live as iNFT #0.",
    accent: "amber",
    policy: { ...DEFAULT_POLICY },
    iNftTokenId: 0,
  },
  {
    id: "aggressive",
    name: "Aggressive",
    blurb:
      "Tighter delta, shorter hold, lower margin. Captures short-lived spreads. Pays slippage more often — net positive only at scale.",
    accent: "rose",
    policy: {
      ...DEFAULT_POLICY,
      minApyDelta: 0.25,
      minHoldingDays: 3,
      safetyMargin: 1.2,
      cooldownHours: 6,
    },
    iNftTokenId: null,
  },
  {
    id: "critic",
    name: "Critic",
    blurb:
      "Specialist counterweight. Re-evaluates every Balanced decision with much stricter knobs. When Critic dissents, the swarm logs the disagreement to 0G Storage as a red-flag for the user.",
    accent: "indigo",
    policy: {
      ...DEFAULT_POLICY,
      minApyDelta: 1.5, // demands a much bigger spread
      minHoldingDays: 60, // amortize over a longer hold
      safetyMargin: 3.0, // requires 3× cushion above cost
      cooldownHours: 168, // weekly cadence
    },
    iNftTokenId: null,
  },
];
