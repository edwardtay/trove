"use client";

import { useState, useTransition, useEffect, useMemo } from "react";
import { Eye, Wallet, AlertCircle, CheckCircle2, Search, Sparkles } from "lucide-react";
import {
  isValidAddress,
  type PositionResult,
} from "../src/onchain";
import { EnsName } from "./EnsName";
import { protocolName } from "../src/protocols";
import { usePrivyWalletAddress } from "./usePrivyWalletAddress";
import AgentRecommendation from "./AgentRecommendation";
import ProtocolLogo from "./ProtocolLogo";

export type PoolApyMap = Record<
  string,
  { apyBase: number; apyReward: number }
>;

// Real holders pulled from Blockscout AND verified live via viem balanceOf
// against Base mainnet — these addresses currently hold non-zero balances
// in our tracked pools, so the demo always returns numbers (not $0).
// Re-verify periodically; whales rotate.
const SAMPLE_ADDRS: { label: string; addr: string; hint: string }[] = [
  {
    label: "Aave V3 whale",
    addr: "0xf07766108Cdb54082F7B06CAd20d6ADAb1342d46",
    hint: "~$6.8M aUSDC",
  },
  {
    label: "Multi-protocol",
    addr: "0x79EBe380b16514e2710903E175b1AB52100d8CAB",
    hint: "~$6.5M Aave + $1M Compound",
  },
  {
    label: "Mid-size LP",
    addr: "0x3bD5Ea849243150910a64012e9f0489040A61623",
    hint: "~$3.6M aUSDC",
  },
];

function fmtUsd(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function shortAddr(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

type LeakRow = {
  project: string;
  balanceUsd: number;
  apyReward: number;
  apyBase: number;
  annualLeakUsd: number;
};

export default function RealPositions({
  prefilledAddress,
  apyByProject = {},
}: {
  prefilledAddress?: string;
  apyByProject?: PoolApyMap;
}) {
  const connectedAddress = usePrivyWalletAddress();
  const [input, setInput] = useState(
    connectedAddress ?? prefilledAddress ?? "",
  );
  const [active, setActive] = useState<string | null>(null);
  const [positions, setPositions] = useState<PositionResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (prefilledAddress && !active) {
      setInput(prefilledAddress);
      lookup(prefilledAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledAddress]);

  // When a Privy wallet connects, auto-fill + auto-lookup
  useEffect(() => {
    if (connectedAddress && connectedAddress !== active) {
      setInput(connectedAddress);
      lookup(connectedAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAddress]);

  async function lookup(raw: string) {
    setError(null);
    const trimmed = raw.trim();
    if (!isValidAddress(trimmed) && !trimmed.endsWith(".eth")) {
      setError("That doesn't look like a valid Ethereum address or ENS name.");
      setPositions(null);
      setActive(null);
      return;
    }
    setActive(trimmed);
    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/positions?address=${encodeURIComponent(trimmed)}`,
        );
        if (!res.ok) throw new Error(`api ${res.status}`);
        const json = (await res.json()) as { positions: PositionResult[] };
        setPositions(json.positions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "lookup failed");
        setPositions(null);
      }
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    lookup(input);
  }

  const total =
    positions?.reduce((sum, p) => sum + p.balanceUsd, 0) ?? 0;
  const hasAny = positions && total > 0;

  /**
   * Personalized leak — each position × current reward APY for that project.
   * `apyByProject` is keyed by DeFiLlama project slug ("aave-v3" / "fluid-lending").
   */
  const leakRows: LeakRow[] = useMemo(() => {
    if (!positions) return [];
    return positions
      .filter((p) => p.balanceUsd > 0)
      .map((p) => {
        const apy = apyByProject[p.project] ?? { apyBase: 0, apyReward: 0 };
        return {
          project: p.project,
          balanceUsd: p.balanceUsd,
          apyBase: apy.apyBase,
          apyReward: apy.apyReward,
          annualLeakUsd: p.balanceUsd * (apy.apyReward / 100),
        };
      })
      .filter((r) => r.apyReward > 0)
      .sort((a, b) => b.annualLeakUsd - a.annualLeakUsd);
  }, [positions, apyByProject]);

  const totalLeak = leakRows.reduce((sum, r) => sum + r.annualLeakUsd, 0);

  return (
    <section className="mt-14">
      <div className="mb-4 flex flex-col gap-0.5">
        <span className="eyebrow inline-flex items-center gap-1.5">
          <Eye className="h-3 w-3" aria-hidden />
          your wallet
        </span>
        <h2 className="section-h">What you have right now</h2>
      </div>
      {connectedAddress && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50/60 px-3 py-1 text-[11px] text-emerald-800">
          <CheckCircle2 className="h-3 w-3" aria-hidden />
          using your connected wallet
        </div>
      )}

      <form onSubmit={handleSubmit} className="card flex items-center gap-2 p-3">
        <Wallet className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0x… (or paste any Base address)"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent font-mono text-[13px] tabular-nums text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="rounded-md bg-ink px-3 py-1.5 text-[12px] font-medium text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isPending ? "checking…" : "check"}
        </button>
      </form>

      {!active && !error && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-ink-faint">
          <span>try:</span>
          {SAMPLE_ADDRS.map((s) => (
            <button
              key={s.addr}
              onClick={() => {
                setInput(s.addr);
                lookup(s.addr);
              }}
              title={`${s.hint} · ${s.addr}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-elev px-2.5 py-1 font-medium text-ink-subtle transition-colors hover:bg-subtle hover:text-ink"
            >
              {s.label}
              <span className="font-mono text-[10px] text-ink-faint">
                {s.hint}
              </span>
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-[12px] text-rose-800">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {positions && active && (
        <div className="mt-3 card overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-hairline bg-subtle px-4 py-2.5">
            <div className="flex items-center gap-2">
              <EnsName
                address={active}
                className="font-mono text-[11px] tabular-nums text-ink-faint"
              />
              <button
                onClick={() => {
                  setActive(null);
                  setPositions(null);
                  setInput("");
                  setError(null);
                }}
                className="rounded-sm border border-hairline bg-paper px-1.5 py-0.5 text-[10px] font-medium text-ink-subtle transition-colors hover:bg-elev hover:text-ink"
              >
                ← try another
              </button>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
              total · <span className="font-mono tabular-nums text-ink">{fmtUsd(total)}</span>
            </span>
          </div>
          {hasAny ? (
            <ul className="divide-y divide-hairline">
              {positions
                .filter((p) => p.balanceUsd > 0)
                .map((p) => {
                  const isTracked = p.source === "tracked";
                  return (
                    <li
                      key={p.receiptAddress}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div className="flex items-center gap-2.5">
                        {isTracked ? (
                          <CheckCircle2
                            className="h-3.5 w-3.5 shrink-0 text-emerald-600"
                            aria-hidden
                          />
                        ) : (
                          <Search
                            className="h-3.5 w-3.5 shrink-0 text-amber-600"
                            aria-hidden
                          />
                        )}
                        <ProtocolLogo project={p.project} size={20} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-ink">
                              {isTracked
                                ? p.label
                                : `${protocolName(p.project)} · ${p.label.split("(")[1]?.replace(")", "") ?? ""}`}
                            </span>
                            {!isTracked && (
                              <span className="rounded bg-amber-50 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-amber-700">
                                detected
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-[10px] tabular-nums text-ink-faint">
                            {shortAddr(p.receiptAddress)}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-[14px] tabular-nums text-ink">
                        {fmtUsd(p.balanceUsd)}
                      </div>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-[13px] text-ink-faint">
              No USDC positions in any audited lending market. Plain USDC
              in the wallet earns 0% — try{" "}
              <button
                onClick={() => {
                  setInput(SAMPLE_ADDRS[0]!.addr);
                  lookup(SAMPLE_ADDRS[0]!.addr);
                }}
                className="font-medium text-ink underline-offset-2 hover:underline"
              >
                an Aave whale
              </button>{" "}
              for a real example.
            </div>
          )}
        </div>
      )}
      {positions && hasAny && (
        <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
          <CheckCircle2 className="-mt-0.5 mr-1 inline h-3 w-3 text-emerald-600" />
          tracked = full APY data ·{" "}
          <Search className="-mt-0.5 mr-1 inline h-3 w-3 text-amber-600" />
          detected = found via Blockscout, agent doesn&apos;t monitor APY yet
        </p>
      )}

      {/* Personalized leak — what they're actually missing right now */}
      {positions && hasAny && totalLeak > 0 && (
        <div className="mt-5 -mx-4 border border-rose-200 bg-rose-50/60 px-4 py-5 sm:-mx-0 sm:rounded-2xl sm:p-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700">
            <Sparkles className="h-3 w-3" aria-hidden />
            Your personal leak
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[14px] font-medium text-rose-700/70">~</span>
            <span className="text-[40px] font-semibold leading-none tracking-crunched text-rose-900 sm:text-[48px] md:text-[56px]">
              ${totalLeak.toFixed(2)}
            </span>
            <span className="text-[14px] font-medium text-rose-700/80">
              /yr unclaimed
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-rose-900/70">
            Your{" "}
            {leakRows
              .map(
                (r) =>
                  `${fmtUsd(r.balanceUsd)} in ${protocolName(r.project)}`,
              )
              .join(" + ")}{" "}
            is earning rewards you haven&apos;t claimed.
          </p>
          {leakRows.length > 1 && (
            <ul className="mt-3 space-y-1.5 border-t border-rose-200 pt-3">
              {leakRows.map((r) => (
                <li
                  key={r.project}
                  className="flex items-center justify-between text-[12px]"
                >
                  <span className="text-rose-900/80">
                    {protocolName(r.project)} · {fmtUsd(r.balanceUsd)} ×{" "}
                    <span className="font-mono">
                      {r.apyReward.toFixed(2)}%
                    </span>
                  </span>
                  <span className="font-mono font-semibold tabular-nums text-rose-900">
                    {fmtUsd(r.annualLeakUsd)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 border-t border-rose-200 pt-2.5 text-[11px] leading-relaxed text-rose-900/60">
            The agent harvests these rewards weekly, swaps to USDC, and
            redeposits — capturing ~95% net of gas + swap.
          </p>
        </div>
      )}

      {/* If they have positions but no rewards on those positions */}
      {positions && hasAny && totalLeak === 0 && leakRows.length === 0 && (
        <div className="mt-5 -mx-4 border border-emerald-200 bg-emerald-50/60 px-4 py-4 sm:-mx-0 sm:rounded-2xl sm:p-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
            <CheckCircle2 className="h-3 w-3" aria-hidden />
            No reward leak detected
          </div>
          <p className="mt-2 text-[13px] leading-[1.5] text-emerald-900/80">
            Your positions are in pools with no current reward emissions.
            Nothing to claim — you&apos;re earning the full base APY.
          </p>
        </div>
      )}

      {/* Agent recommendation — gives the user a clear next step. Always
          renders once a wallet has been queried (positions resolved or not
          — the agent can still recommend an initial deposit). */}
      {active && positions !== null && <AgentRecommendation address={active} />}
    </section>
  );
}
