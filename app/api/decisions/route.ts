/**
 * Decision feed endpoint — returns the last N entries from the agent's
 * persistent decision log (committed to 0G Storage on every cycle).
 *
 *   GET /api/decisions?limit=10
 *
 * Source of truth is `og-state.json` at the project root, which the
 * /api/agent/log POST handler keeps up to date. If the file is missing
 * (fresh deploy with no agent activity), we fall back to a small set of
 * historical testnet entries so the UI never feels empty.
 */

import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const revalidate = 0;
export const runtime = "nodejs";

type Entry = {
  cycleAt: string;
  verdict: "hold" | "move" | "harvest";
  reason: string;
  position: { project: string; principalUsd: number; currentApy: number } | null;
  best: { project: string; apyBase: number; apyReward: number } | null;
};

// Fallback when og-state.json isn't present in the runtime image. These are
// real testnet entries from the seeded log — public data, safe to inline.
const FALLBACK_ENTRIES: Entry[] = [
  {
    cycleAt: "2026-04-29T07:21:26.500Z",
    verdict: "hold",
    reason: "keeperhub e2e test",
    position: null,
    best: null,
  },
  {
    cycleAt: "2026-04-29T05:59:14.063Z",
    verdict: "hold",
    reason: "no position; agent would supply to fluid-lending at 4.17% organic",
    position: null,
    best: { project: "fluid-lending", apyBase: 4.17, apyReward: 1.96 },
  },
  {
    cycleAt: "2026-04-29T05:36:30.319Z",
    verdict: "hold",
    reason: "no position; agent would supply to fluid-lending at 4.17%",
    position: null,
    best: { project: "fluid-lending", apyBase: 4.17, apyReward: 1.96 },
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") ?? "10")));

  let entries: Entry[] = FALLBACK_ENTRIES;
  let source: "og-state" | "fallback" = "fallback";
  let latestRoot: string | null = null;

  // Try cwd first (typical Next.js standalone), then a couple of fallback
  // paths. Whichever resolves first wins.
  const candidates = [
    join(process.cwd(), "og-state.json"),
    join(process.cwd(), "..", "og-state.json"),
    "/app/og-state.json",
  ];
  for (const p of candidates) {
    try {
      const raw = await readFile(p, "utf-8");
      const parsed = JSON.parse(raw) as {
        log?: { entries?: Entry[] };
        decisionLog?: { rootHash?: string };
      };
      if (parsed.log?.entries?.length) {
        entries = [...parsed.log.entries].reverse();
        source = "og-state";
        latestRoot = parsed.decisionLog?.rootHash ?? null;
        break;
      }
    } catch {
      // try next candidate
    }
  }

  // Compute a synthetic "next cycle in" estimate so the UI can render a
  // countdown without needing a real cron. Cycle every 15 min like KeeperHub.
  const lastCycleMs = entries[0] ? new Date(entries[0].cycleAt).getTime() : Date.now();
  const cycleIntervalMs = 15 * 60 * 1000;
  const nextCycleMs = lastCycleMs + cycleIntervalMs;
  const nextCycleIn = Math.max(0, nextCycleMs - Date.now());

  return NextResponse.json({
    source,
    entries: entries.slice(0, limit),
    totalEntries: entries.length,
    lastCycleAt: entries[0]?.cycleAt ?? null,
    nextCycleInMs: nextCycleIn,
    cycleIntervalMs,
    /** Latest 0G Storage root for the live decision log — VerifyDecision uses
     * this as the default replay target so the button always works against a
     * root that the indexer still has. */
    latestRoot,
  });
}
