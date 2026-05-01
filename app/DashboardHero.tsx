"use client";

/**
 * Connected-wallet hero: replaces the marketing hero once a user has Privy
 * connected. Leads with their address + the primary action (get verdict).
 *
 * Pulls live position data from /api/positions to show their USDC total
 * across Base lending markets directly in the hero.
 */
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { usePrivyWalletAddress } from "./usePrivyWalletAddress";
import BuyDecisionButton from "./BuyDecisionButton";
import CountUp from "./CountUp";
import UsdcLogo from "./UsdcLogo";

type Position = { balanceUsd: number };

function shortAddr(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

function fmtUsd(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default function DashboardHero() {
  const address = usePrivyWalletAddress();
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetch(`/api/positions?address=${encodeURIComponent(address)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: { positions: Position[] }) => {
        const sum = j.positions.reduce((s, p) => s + p.balanceUsd, 0);
        setTotal(sum);
      })
      .catch(() => setTotal(0))
      .finally(() => setLoading(false));
  }, [address]);

  if (!address) return null;

  const empty = total === 0;

  return (
    <header className="relative -mx-4 mb-6 overflow-hidden bg-ink px-4 py-7 text-paper sm:-mx-0 sm:mb-8 sm:rounded-3xl sm:p-8 md:p-10">
      <div
        className="absolute -right-24 -top-24 hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(5,150,105,0.35) 0%, rgba(5,150,105,0) 60%)",
          width: 480,
          height: 480,
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3 py-1 text-[11px] font-mono tabular-nums text-paper/80 backdrop-blur">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
              aria-hidden
            />
            {shortAddr(address)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/5 px-2.5 py-1 text-[11px] font-medium text-paper/80 backdrop-blur">
            <UsdcLogo size={14} />
            USDC · Base
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-10">
          <div className="min-w-0">
            <h1
              className="break-words text-[28px] font-semibold leading-[1.05] tracking-crunched sm:text-[40px] md:text-[52px]"
              style={{ fontVariationSettings: '"opsz" 60' }}
            >
              {loading ? (
                <span className="text-paper/60">Reading your wallet…</span>
              ) : empty ? (
                <>
                  No USDC earning yet.{" "}
                  <span className="text-emerald-400">Let&apos;s fix that.</span>
                </>
              ) : (
                <>
                  You have{" "}
                  <span className="text-emerald-400">
                    <CountUp to={total ?? 0} prefix="$" decimals={0} duration={1100} />
                  </span>{" "}
                  earning.
                </>
              )}
            </h1>
            <p className="mt-3 max-w-md text-[14px] leading-[1.55] text-paper/70 sm:text-[15px]">
              {empty
                ? "Connect a wallet with USDC supplied to Aave, Compound, Morpho, Fluid, Moonwell, Spark, or Euler — the agent watches all seven."
                : "The agent checks reward emissions and rate spreads continuously. Ask for its current take."}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <BuyDecisionButton />
            <span className="text-[11px] text-paper/50">
              <Sparkles className="-mt-0.5 mr-1 inline h-3 w-3" aria-hidden />
              Costs $0.01 · returns MOVE / HOLD / HARVEST + reasoning
            </span>
            <a
              href="#positions"
              className="group mt-1 inline-flex items-center gap-1 text-[13px] text-paper/70 hover:text-paper"
            >
              See my positions
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
