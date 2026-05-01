"use client";

/**
 * Compact ambient-liveness bar. Pulls /api/decisions for last cycle + next
 * cycle ETA, ticks the countdown every second. Renders inline; the page
 * positions it above the hero so it's the first signal of "this thing is
 * actually running."
 */
import { useEffect, useState } from "react";
import { Radio } from "lucide-react";

type FeedResponse = {
  lastCycleAt: string | null;
  nextCycleInMs: number;
  cycleIntervalMs: number;
};

function fmtRemaining(ms: number): string {
  if (ms <= 0) return "any moment";
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m ${r.toString().padStart(2, "0")}s`;
}

function fmtRelative(iso: string, now: number): string {
  const s = Math.floor((now - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function CycleStatus() {
  const [data, setData] = useState<FeedResponse | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch("/api/decisions?limit=1", { cache: "no-store" });
        if (!r.ok) return;
        const j = (await r.json()) as FeedResponse;
        if (!cancelled) setData(j);
      } catch {
        /* ignore */
      }
    }
    load();
    const poll = setInterval(load, 30_000);
    const ticker = setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      cancelled = true;
      clearInterval(poll);
      clearInterval(ticker);
    };
  }, []);

  // Recompute remaining time on every tick by re-deriving from a fixed
  // reference (last load) + elapsed.
  const now = Date.now();
  // Force reread to satisfy lint about unused tick
  void tick;
  const remaining = data ? Math.max(0, data.nextCycleInMs - (now - (data.lastCycleAt ? new Date(data.lastCycleAt).getTime() : now) - data.cycleIntervalMs + data.nextCycleInMs)) : 0;
  // Simpler & correct: nextCycleAt = lastCycleAt + cycleInterval
  const nextCycleAt = data?.lastCycleAt
    ? new Date(data.lastCycleAt).getTime() + data.cycleIntervalMs
    : 0;
  const trueRemaining = Math.max(0, nextCycleAt - now);
  void remaining;

  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-hairline bg-elev px-3 py-2 text-[11px]">
      <div className="flex items-center gap-2 text-ink-muted">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <Radio className="h-3 w-3 text-ink-muted" aria-hidden />
        <span className="font-medium text-ink">Agent online</span>
        {data?.lastCycleAt && (
          <span className="text-ink-muted">
            · last check {fmtRelative(data.lastCycleAt, now)}
          </span>
        )}
      </div>
      {data && (
        <span className="font-mono tabular-nums text-ink-subtle">
          next check in {fmtRemaining(trueRemaining)}
        </span>
      )}
    </div>
  );
}
