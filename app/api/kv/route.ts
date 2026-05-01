/**
 * KV status + write-test endpoint.
 *
 *   GET /api/kv         → ping the public 0G KV node + read current state
 *   POST /api/kv        → write a sample state (for demo / verification)
 */

import { NextResponse } from "next/server";
import { ping, readLiveState, writeLiveState, KV_INFO } from "../../../src/og-kv";

export const revalidate = 0;

export async function GET() {
  const [p, state] = await Promise.all([ping(), readLiveState()]);
  return NextResponse.json({
    config: KV_INFO,
    ping: p,
    state,
  });
}

export async function POST() {
  const ok = await writeLiveState({
    schema: "stable-rotator/state/1",
    currentPool: "7372edda-f07f-4598-83e5-4edec48c4039",
    currentProject: "fluid-lending",
    principalUsd: 10_000,
    lastCycleAt: new Date().toISOString(),
    lastHarvestAt: null,
    unclaimedRewardUsd: 0,
    cycleCount: 1,
  });
  const state = await readLiveState();
  return NextResponse.json({ ok, state });
}
