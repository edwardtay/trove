"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type ProbeResult = { name: string; ok: boolean; ms: number; detail?: string };

type Health =
  | { state: "loading" }
  | { state: "ok"; probes: ProbeResult[] }
  | { state: "degraded"; probes: ProbeResult[] }
  | { state: "error"; message: string };

export default function HealthBadge() {
  const [health, setHealth] = useState<Health>({ state: "loading" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function probe() {
      try {
        const res = await fetch("/api/healthz", { cache: "no-store" });
        const data = (await res.json()) as {
          ok: boolean;
          probes: ProbeResult[];
        };
        if (cancelled) return;
        setHealth({
          state: data.ok ? "ok" : "degraded",
          probes: data.probes,
        });
      } catch (err) {
        if (cancelled) return;
        setHealth({
          state: "error",
          message: err instanceof Error ? err.message : "unknown",
        });
      }
    }
    probe();
    const id = setInterval(probe, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (health.state === "loading") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-faint">
        <Loader2 className="h-3 w-3 animate-spin" />
        checking…
      </span>
    );
  }
  if (health.state === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] text-rose-700">
        <AlertCircle className="h-3 w-3" />
        health probe unreachable
      </span>
    );
  }

  const greenCount = health.probes.filter((p) => p.ok).length;
  const totalCount = health.probes.length;
  const allGreen = health.state === "ok";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] transition-colors ${
          allGreen
            ? "text-ink-faint hover:bg-subtle hover:text-ink"
            : "bg-amber-50 text-amber-800 hover:bg-amber-100"
        }`}
      >
        {allGreen ? (
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        ) : (
          <AlertCircle className="h-3 w-3 text-amber-600" />
        )}
        <span className="font-mono tabular-nums">
          {greenCount}/{totalCount} systems
        </span>
        <span className="text-ink-faint">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="absolute bottom-full right-0 z-10 mb-2 w-64 rounded-md border border-rule bg-elev p-2 shadow-card-lift">
          <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            integration health
          </div>
          <ul className="space-y-1">
            {health.probes.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between rounded px-1 py-0.5 text-[12px]"
              >
                <span className="flex items-center gap-1.5">
                  {p.ok ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-rose-600" />
                  )}
                  <span className="font-mono text-ink">{p.name}</span>
                </span>
                <span
                  className={`font-mono tabular-nums text-[10px] ${
                    p.ok ? "text-ink-faint" : "text-rose-700"
                  }`}
                  title={p.detail}
                >
                  {p.ms}ms
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-hairline px-1 pt-1.5 text-[10px] text-ink-faint">
            updates every 60s · GET /api/healthz
          </div>
        </div>
      )}
    </div>
  );
}
