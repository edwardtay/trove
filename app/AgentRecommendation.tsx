"use client";

/**
 * Agent recommendation card. Given an address, fetches /api/agent/tick and
 * surfaces the verdict + plain-language reason. Renders inline below the
 * positions table once a wallet is being inspected.
 *
 * Verdicts: MOVE / HOLD / HARVEST. Each gets its own color treatment.
 */
import { useEffect, useState } from "react";
import { ArrowRight, Bot, Loader2, AlertCircle } from "lucide-react";
import { protocolName } from "../src/protocols";
import ProtocolLogo from "./ProtocolLogo";

type Verdict = "move" | "hold" | "harvest";

type TickResponse = {
  verdict: Verdict;
  reason: string;
  current?: { project: string; balanceUsd: number; apyBase: number };
  best?: { project: string; apyBase: number; apyReward?: number };
  candidate?: { project: string; apyBase: number; apyReward?: number };
};

const VERDICT_STYLES: Record<
  Verdict,
  { bg: string; ring: string; text: string; label: string }
> = {
  move: {
    bg: "bg-emerald-50/80",
    ring: "ring-emerald-300",
    text: "text-emerald-900",
    label: "Move now",
  },
  hold: {
    bg: "bg-amber-50/70",
    ring: "ring-amber-300",
    text: "text-amber-900",
    label: "Hold",
  },
  harvest: {
    bg: "bg-indigo-50/80",
    ring: "ring-indigo-300",
    text: "text-indigo-900",
    label: "Harvest rewards",
  },
};

export default function AgentRecommendation({ address }: { address: string }) {
  const [data, setData] = useState<TickResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    setErr(null);
    setData(null);
    fetch(`/api/agent/tick?address=${encodeURIComponent(address)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`api ${r.status}`);
        return (await r.json()) as TickResponse;
      })
      .then((j) => setData(j))
      .catch((e) => setErr(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [address]);

  if (loading) {
    return (
      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-dashed border-hairline bg-subtle/30 px-4 py-4 text-[13px] text-ink-faint">
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
        Asking the agent for its take…
      </div>
    );
  }

  if (err) {
    return (
      <div className="mt-5 flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] text-rose-800">
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
        <span>Couldn&apos;t reach the agent ({err})</span>
      </div>
    );
  }

  if (!data) return null;

  const style = VERDICT_STYLES[data.verdict];
  const target = data.best ?? data.candidate;

  return (
    <section
      className={`mt-6 -mx-4 sm:-mx-0 sm:rounded-2xl ${style.bg} px-4 py-6 sm:p-6`}
    >
      <span className="eyebrow inline-flex items-center gap-1.5">
        <Bot className="h-3 w-3" aria-hidden />
        Agent says
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          className={`text-[36px] font-semibold leading-none tracking-crunched sm:text-[44px] ${style.text}`}
          style={{ fontVariationSettings: '"opsz" 48' }}
        >
          {style.label}
        </span>
      </div>
      <p className={`mt-2 max-w-xl text-[14px] leading-[1.55] ${style.text}/80`}>
        {data.reason}
      </p>

      {data.current && (
        <div className="mt-4 grid grid-cols-1 gap-3 border-t border-hairline/60 pt-3 sm:grid-cols-2">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              You&apos;re in
            </div>
            <div className="mt-1 flex items-center gap-2">
              <ProtocolLogo project={data.current.project} size={18} />
              <span className="text-[15px] font-medium text-ink">
                {protocolName(data.current.project)}
              </span>
            </div>
            <div className="font-mono text-[11px] text-ink-muted">
              ${data.current.balanceUsd.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              · {data.current.apyBase.toFixed(2)}% APY
            </div>
          </div>
          {target && data.verdict === "move" && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Switch to
              </div>
              <div className="mt-1 inline-flex items-center gap-2">
                <ProtocolLogo project={target.project} size={18} />
                <span className="text-[15px] font-medium text-emerald-900">
                  {protocolName(target.project)}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-700" aria-hidden />
              </div>
              <div className="font-mono text-[11px] text-emerald-700">
                {target.apyBase.toFixed(2)}% APY
                {target.apyReward && target.apyReward > 0
                  ? ` + ${target.apyReward.toFixed(2)}% rewards`
                  : ""}
              </div>
            </div>
          )}
        </div>
      )}

      {!data.current && target && (
        <div className="mt-4 border-t border-hairline/60 pt-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
            Best pool right now
          </div>
          <div className="mt-1 flex items-center gap-2">
            <ProtocolLogo project={target.project} size={18} />
            <span className="text-[15px] font-medium text-emerald-900">
              {protocolName(target.project)}
            </span>
          </div>
          <div className="font-mono text-[11px] text-emerald-700">
            {target.apyBase.toFixed(2)}% APY
            {target.apyReward && target.apyReward > 0
              ? ` + ${target.apyReward.toFixed(2)}% rewards`
              : ""}
          </div>
        </div>
      )}
    </section>
  );
}
