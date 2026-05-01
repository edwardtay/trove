"use client";

/**
 * Live decision feed — TweetDeck-style timeline of recent agent verdicts.
 * Polls /api/decisions every 30s. Renders verdict badges, plain-language
 * reasoning, and a relative timestamp.
 */
import { useEffect, useState } from "react";
import { Activity, ArrowRight } from "lucide-react";
import { protocolName } from "../src/protocols";
import ProtocolLogo from "./ProtocolLogo";

type Verdict = "hold" | "move" | "harvest";

type Entry = {
  cycleAt: string;
  verdict: Verdict;
  reason: string;
  position: { project: string; principalUsd: number; currentApy: number } | null;
  best: { project: string; apyBase: number; apyReward: number } | null;
};

type FeedResponse = {
  entries: Entry[];
  totalEntries: number;
  lastCycleAt: string | null;
  nextCycleInMs: number;
  cycleIntervalMs: number;
  source: "og-state" | "fallback";
};

const VERDICT_DOT: Record<Verdict, string> = {
  move: "bg-emerald-500",
  hold: "bg-amber-500",
  harvest: "bg-indigo-500",
};

const VERDICT_LABEL: Record<Verdict, string> = {
  move: "MOVE",
  hold: "HOLD",
  harvest: "HARVEST",
};

function relative(iso: string, now: number): string {
  const ms = now - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function DecisionFeed({ limit = 6 }: { limit?: number }) {
  const [data, setData] = useState<FeedResponse | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch(`/api/decisions?limit=${limit}`, {
          cache: "no-store",
        });
        if (!r.ok) return;
        const j = (await r.json()) as FeedResponse;
        if (!cancelled) setData(j);
      } catch {
        /* ignore */
      }
    }
    load();
    const poll = setInterval(load, 30_000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      cancelled = true;
      clearInterval(poll);
      clearInterval(tick);
    };
  }, [limit]);

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="eyebrow inline-flex items-center gap-1.5">
            <Activity className="h-3 w-3" aria-hidden />
            agent activity
          </span>
          <h3 className="section-h">Recent decisions</h3>
        </div>
        {data?.lastCycleAt && (
          <span className="font-mono text-[11px] tabular-nums text-ink-muted">
            {data.totalEntries} total · last {relative(data.lastCycleAt, now)}
          </span>
        )}
      </div>
      <div className="card overflow-hidden">

      {!data ? (
        <ul className="divide-y divide-hairline">
          {[1, 2, 3].map((i) => (
            <li key={i} className="px-4 py-3">
              <div className="h-3 w-32 animate-pulse rounded bg-subtle" />
              <div className="mt-2 h-2 w-48 animate-pulse rounded bg-subtle" />
            </li>
          ))}
        </ul>
      ) : data.entries.length === 0 ? (
        <div className="px-4 py-6 text-center text-[12px] text-ink-faint">
          No decisions logged yet. The agent runs every 15 min.
        </div>
      ) : (
        <ul className="divide-y divide-hairline">
          {data.entries.map((e) => (
            <li key={e.cycleAt} className="px-4 py-3">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${VERDICT_DOT[e.verdict]}`}
                  aria-hidden
                />
                <span className="text-[11px] font-semibold tracking-wide text-ink">
                  {VERDICT_LABEL[e.verdict]}
                </span>
                {e.position && (
                  <>
                    <ProtocolLogo project={e.position.project} size={14} />
                    <span className="text-[11px] text-ink-muted">
                      {protocolName(e.position.project)}
                    </span>
                  </>
                )}
                {e.verdict === "move" && e.best && (
                  <>
                    <ArrowRight className="h-3 w-3 text-ink-muted" aria-hidden />
                    <ProtocolLogo project={e.best.project} size={14} />
                    <span className="text-[11px] font-medium text-emerald-700">
                      {protocolName(e.best.project)}
                    </span>
                  </>
                )}
                <span className="ml-auto font-mono text-[10px] tabular-nums text-ink-faint">
                  {relative(e.cycleAt, now)}
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-[1.45] text-ink-muted">
                {e.reason}
              </p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </section>
  );
}
