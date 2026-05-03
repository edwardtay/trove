"use client";

/**
 * In-UI version of `npm run verify-decision`.
 *
 * Lets any visitor paste a 0G Storage decision-log root and watch Trove
 * fetch the log, replay the policy, and report per-entry match results.
 * Removes the "you need a terminal to verify our claim" friction.
 */

import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Search,
  ShieldCheck,
} from "lucide-react";

type Result = {
  cycleAt: string;
  recordedVerdict: string;
  recordedReason: string;
  replayed: string;
  match: boolean;
};

type Response = {
  root?: string;
  schema?: string;
  iNftTokenId?: number | null;
  startedAt?: string;
  entriesCount?: number;
  matches?: number;
  mismatches?: number;
  allReproduce?: boolean;
  results?: Result[];
  indexer?: string;
  error?: string;
  hint?: string;
};

const KNOWN_ROOT =
  "0x7426fb9ca3e5f81237612c31bbcb7fba330f41679c6df18ca09824dc2fff124f";

export default function VerifyDecision() {
  const [root, setRoot] = useState(KNOWN_ROOT);
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);

  async function verify() {
    setLoading(true);
    setData(null);
    try {
      const r = await fetch(`/api/agent/verify?root=${encodeURIComponent(root)}`);
      const j = (await r.json()) as Response;
      setData(j);
    } catch (err) {
      setData({ error: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-14">
      <div className="mb-4 flex flex-col gap-0.5">
        <span className="eyebrow inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          verify any decision
        </span>
        <h2 className="section-h">Replay any historic decision</h2>
      </div>
      <p className="mb-4 max-w-2xl text-[13px] leading-relaxed text-ink-muted">
        Paste a decision-log root (from 0G Storage). Trove fetches the log,
        replays the deterministic policy locally, and reports whether each
        recorded verdict reproduces. This is what "verifiable" means in
        practice — you can falsify the agent's claims yourself.
      </p>

      <div className="card flex items-center gap-2 p-3">
        <Search className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
        <input
          type="text"
          value={root}
          onChange={(e) => setRoot(e.target.value)}
          placeholder="0x... (decision-log root from 0G Storage)"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent font-mono text-[12px] tabular-nums text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <button
          onClick={verify}
          disabled={loading || !root.startsWith("0x") || root.length !== 66}
          className="rounded-md bg-ink px-3 py-1.5 text-[12px] font-medium text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {loading ? (
            <span className="inline-flex items-center gap-1.5">
              <Loader2 className="h-3 w-3 animate-spin" />
              fetching…
            </span>
          ) : (
            "verify"
          )}
        </button>
      </div>

      {data && data.error && (
        <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-[13px] text-amber-900">
          <div className="flex items-center gap-1.5 font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            {data.error}
          </div>
          {data.hint && (
            <div className="mt-1 text-[12px] text-amber-800">{data.hint}</div>
          )}
        </div>
      )}

      {data && data.entriesCount !== undefined && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-hairline bg-elev">
          <div className="border-b border-hairline bg-subtle px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Verification result
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className={`text-[20px] font-semibold tracking-crunched ${
                      data.allReproduce ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {data.allReproduce ? "✅ All entries reproduce" : "⚠️ Some entries mismatch"}
                  </span>
                  <span className="font-mono text-[12px] text-ink-muted">
                    {data.matches}/{data.entriesCount} match
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  iNFT token
                </div>
                <div className="font-mono text-[14px] text-ink">
                  #{data.iNftTokenId ?? "—"}
                </div>
              </div>
            </div>
            <div className="mt-2 font-mono text-[10px] text-ink-faint">
              schema: {data.schema} · log started: {data.startedAt?.slice(0, 19) ?? "—"}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto p-4">
            {data.results && data.results.length > 0 ? (
              data.results.map((r, i) => (
                <div
                  key={i}
                  className="mb-3 rounded-lg border border-hairline bg-paper p-3 last:mb-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-ink-faint">
                      [{String(i + 1).padStart(2, "0")}] {r.cycleAt.slice(0, 19)}
                    </span>
                    {r.match ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" /> PASS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700">
                        <AlertCircle className="h-3 w-3" /> MISMATCH
                      </span>
                    )}
                  </div>
                  <div className="mt-2 grid gap-1.5 text-[12px] sm:grid-cols-2">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                        recorded
                      </div>
                      <div className="font-medium text-ink">{r.recordedVerdict}</div>
                      <div className="text-ink-muted">{r.recordedReason}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                        replayed locally
                      </div>
                      <div className="text-ink-muted">{r.replayed}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-[12px] text-ink-faint">
                Empty decision log — agent has not committed any cycles yet.
              </div>
            )}
          </div>
          <div className="border-t border-hairline bg-subtle px-5 py-3 text-[11px] text-ink-faint">
            CLI equivalent: <code className="font-mono">npm run verify-decision -- {data.root?.slice(0, 14)}…</code>
          </div>
        </div>
      )}
    </section>
  );
}
