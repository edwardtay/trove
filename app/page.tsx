import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  fetchPools,
  filterCandidates,
  passesPolicyFilter,
  rankByOrganicApy,
  topPoolPerProject,
} from "../src/llama";
import { fetchSparklines } from "../src/llama-spark";
import { DEFAULT_POLICY } from "../src/policy";
import { protocolName } from "../src/protocols";
import type { LlamaPool } from "../src/types";
import Sparkline from "./Sparkline";
import ConnectWallet from "./ConnectWallet";
import CycleStatus from "./CycleStatus";
import DashboardHero from "./DashboardHero";
import INftIdentityCard from "./INftIdentityCard";
import VerifyDecision from "./VerifyDecision";
import DecisionFeed from "./DecisionFeed";
import HealthBadge from "./HealthBadge";
import HeroConnectButton from "./HeroConnectButton";
import HeroVisual from "./HeroVisual";
import TrustProof from "./TrustProof";
import Logo from "./Logo";
import ProtocolLogo from "./ProtocolLogo";
import RealPositions from "./RealPositions";
import RewardLeak from "./RewardLeak";
import UsdcLogo from "./UsdcLogo";
import WalletGate from "./WalletGate";
import AgentDiscover from "./AgentDiscover";

export const revalidate = 60;

export const metadata = {
  title: "Trove",
  robots: { index: false, follow: false },
};

type ScanState =
  | {
      ok: true;
      total: number;
      candidates: LlamaPool[];
      allTops: LlamaPool[];
      fetchedAt: string;
    }
  | { ok: false; error: string };

async function scan(): Promise<
  ScanState & { sparklines?: Record<string, number[]> }
> {
  try {
    const pools = await fetchPools();
    const candidates = rankByOrganicApy(filterCandidates(pools, DEFAULT_POLICY));
    // Top USDC pool per allowlisted project — shows our full coverage even
    // if the pool fails the filter (low TVL / low APY).
    const allTops = topPoolPerProject(pools, DEFAULT_POLICY);
    const sparklines = await fetchSparklines(
      allTops.map((p) => p.pool),
      14,
    );
    return {
      ok: true,
      total: pools.length,
      candidates,
      allTops,
      fetchedAt: new Date().toISOString(),
      sparklines,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

function fmtTvl(usd: number) {
  if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(2)}B`;
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`;
  return `$${usd.toLocaleString()}`;
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default async function Home() {
  const state = await scan();

  return (
    <main className="stagger mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6">
      {/* App shell top bar — borderless on the page; the cream-on-cream separation
          comes from the backdrop blur and slight bg shift. */}
      <div className="sticky top-0 z-10 -mx-4 mb-6 bg-paper/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:mb-8 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={24} withWordmark />
            <a
              href="https://app.ens.domains/trove.web3wagmi.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50/60 px-2 py-1 font-mono text-[11px] text-emerald-900 transition-colors hover:bg-emerald-100/60 sm:inline-flex"
              title="Trove's ENS identity — discoverable text records on-chain"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden
              />
              trove.web3wagmi.eth
            </a>
          </div>
          <div className="hidden items-center gap-1.5 text-[11px] text-ink-muted sm:flex">
            <span>live · Base mainnet</span>
            <span className="mx-1 text-ink-faint">·</span>
            <span className="font-mono tabular-nums">
              watching {DEFAULT_POLICY.allowlist.size} protocols
            </span>
            {state.ok && (
              <>
                <span className="mx-1 text-ink-faint">·</span>
                <span className="font-mono tabular-nums">
                  {state.candidates.length} clear today
                </span>
              </>
            )}
          </div>
          <ConnectWallet />
        </div>
      </div>

      {/* Connected-wallet dashboard hero. Renders only when Privy auth'd. */}
      <DashboardHero />

      {/* Brochure hero — disconnected only. Once a wallet connects, this
          gets replaced by <DashboardHero /> above. */}
      <WalletGate showWhen="disconnected">
      <header className="relative -mx-4 mb-6 overflow-hidden bg-ink px-4 py-7 text-paper sm:-mx-0 sm:mb-8 sm:rounded-3xl sm:p-8 md:p-12">
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
        <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/70 backdrop-blur">
              <Sparkles className="h-3 w-3" aria-hidden />
              Smarter savings · USDC on Base
            </span>
            <h1
              className="mt-4 break-words text-[28px] font-semibold leading-[1] tracking-crunched sm:mt-6 sm:text-[44px] md:text-[60px] lg:text-[72px]"
              style={{ fontVariationSettings: '"opsz" 72' }}
            >
              Earn the yield{" "}
              <span className="text-emerald-400">you&apos;re missing.</span>
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-[1.55] text-paper/75 sm:mt-6 sm:text-[18px] md:text-[19px]">
              <span className="font-semibold text-paper">1–3% a year</span>{" "}
              slips through unclaimed reward tokens. The agent&apos;s job is
              to claim them and rotate when the math works.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-paper/60">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                  aria-hidden
                />
                <span className="font-medium text-paper/85">No fees</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                  aria-hidden
                />
                <span className="font-medium text-paper/85">No custody</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                  aria-hidden
                />
                <span className="font-medium text-paper/85">No lockups</span>
              </span>
            </div>
            <HeroConnectButton />
          </div>
          <div className="relative hidden justify-self-end md:block">
            <HeroVisual size={260} />
          </div>
        </div>
      </header>
      </WalletGate>

      {/* "How to use this" — three concrete things a first-time visitor can
          actually do right now. Hidden once connected. */}
      <WalletGate showWhen="disconnected">
      <section className="mb-8 grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-3">
        <div className="rounded-md border border-hairline bg-elev px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            1 · See live yields
          </span>
          <p className="mt-1 leading-[1.5] text-ink-muted">
            Today&apos;s best USDC pools on Base, ranked by organic APY.
          </p>
        </div>
        <div className="rounded-md border border-hairline bg-elev px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            2 · Check any address
          </span>
          <p className="mt-1 leading-[1.5] text-ink-muted">
            Paste a wallet, see real positions + their personal reward leak.
          </p>
        </div>
        <div className="rounded-md border border-hairline bg-elev px-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            3 · See the proof
          </span>
          <p className="mt-1 leading-[1.5] text-ink-muted">
            Simulator + 90-day backtest + receipts at{" "}
            <span className="font-mono">/notes</span>.
          </p>
        </div>
      </section>
      </WalletGate>

      <TrustProof />

      {/* Single bold stat — disconnected only (connected wallet has its own
          personalized leak inside <RealPositions />, no need for the generic
          loss number on top of it). */}
      <WalletGate showWhen="disconnected">
      {state.ok &&
        state.candidates[0] &&
        (state.candidates[0].apyReward ?? 0) > 0 && (
          <section className="mb-12 overflow-hidden rounded-2xl border border-hairline bg-elev">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="px-6 py-7 sm:px-8 sm:py-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-700/80">
                  Without the agent
                </div>
                <div
                  className="mt-3 font-semibold tracking-crunched text-rose-900"
                  style={{
                    fontVariationSettings: '"opsz" 56',
                    fontSize: "clamp(40px, 7vw, 56px)",
                    lineHeight: 1,
                  }}
                >
                  −${((state.candidates[0].apyReward ?? 0) * 100).toFixed(0)}
                  <span className="ml-1 text-[16px] font-medium text-rose-700/70">
                    /yr
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.5] text-ink-muted">
                  Per $10k supplied, unclaimed{" "}
                  {protocolName(state.candidates[0].project)} reward tokens
                  silently expire.
                </p>
              </div>
              <div className="border-t border-hairline bg-paper px-6 py-7 sm:border-l sm:border-t-0 sm:px-8 sm:py-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700/80">
                  With the agent
                </div>
                <div
                  className="mt-3 font-semibold tracking-crunched text-emerald-900"
                  style={{
                    fontVariationSettings: '"opsz" 56',
                    fontSize: "clamp(40px, 7vw, 56px)",
                    lineHeight: 1,
                  }}
                >
                  {(
                    ((state.candidates[0].apyBase ?? 0) +
                      (state.candidates[0].apyReward ?? 0)) *
                    0.97
                  ).toFixed(2)}
                  <span className="ml-1 text-[16px] font-medium text-emerald-700/70">
                    % APY
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-[1.5] text-ink-muted">
                  Base {(state.candidates[0].apyBase ?? 0).toFixed(2)}% plus{" "}
                  {(state.candidates[0].apyReward ?? 0).toFixed(2)}% rewards,
                  auto-claimed and net of gas.
                </p>
              </div>
            </div>
          </section>
        )}
      </WalletGate>

      {/* Ambient liveness bar — shows last cycle + countdown to next. */}
      <CycleStatus />

      {/* Live agent identity — reads on-chain state from the iNFT contract
          on 0G Galileo. Anchors the "this is a real on-chain agent" claim
          for any visitor. */}
      <div className="mt-8">
        <INftIdentityCard />
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/api/proof"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            machine-readable proof bundle ↗
          </Link>
          <a
            href="https://github.com/edwardtay/trove"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-elev px-3 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:shadow-card"
          >
            source code ↗
          </a>
          <a
            href="https://app.ens.domains/trove.web3wagmi.eth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-elev px-3 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:shadow-card"
          >
            ENS records ↗
          </a>
          <Link
            href="/agent/trove.web3wagmi.eth"
            className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-elev px-3 py-1.5 text-[12px] font-semibold text-ink transition-colors hover:shadow-card"
          >
            ENS-resolved agent profile →
          </Link>
        </div>
      </div>

      <div id="positions" className="min-w-0">
        <RealPositions
          apyByProject={
            state.ok
              ? Object.fromEntries(
                  state.allTops.map((p) => [
                    p.project,
                    {
                      apyBase: p.apyBase ?? 0,
                      apyReward: p.apyReward ?? 0,
                    },
                  ]),
                )
              : {}
          }
        />
      </div>

      <div className="min-w-0">
        <AgentDiscover />
      </div>

      <section className="mt-14">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="eyebrow inline-flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3" aria-hidden />
              market
            </span>
            <h2 className="section-h">Today&apos;s USDC yields on Base</h2>
          </div>
          {state.ok && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tabular-nums text-ink-muted">
              <Activity className="h-3 w-3" aria-hidden />
              {fmtTime(state.fetchedAt)}
            </span>
          )}
        </div>

        {!state.ok ? (
          <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            <span className="font-semibold">DeFiLlama fetch failed:</span>{" "}
            {state.error}
          </div>
        ) : state.allTops.length === 0 ? (
          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-neutral-800">
            No USDC pools found across our allowlist on Base today.
          </div>
        ) : (
          <ol className="card divide-y divide-hairline overflow-hidden">
            {state.allTops.map((p) => {
              const apyBase = p.apyBase ?? 0;
              const apyReward = p.apyReward ?? 0;
              const passes = passesPolicyFilter(p, DEFAULT_POLICY);
              return (
                <li
                  key={p.pool}
                  className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-subtle"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`inline-flex h-2 w-2 shrink-0 rounded-full ${
                        passes ? "bg-emerald-500" : "bg-amber-400"
                      }`}
                      title={passes ? "agent will use this pool" : "too small for agent (TVL or APY below floor)"}
                      aria-hidden
                    />
                    <ProtocolLogo project={p.project} size={20} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[14px] font-medium text-ink">
                          {protocolName(p.project)}
                        </span>
                        {!passes && (
                          <span className="rounded-sm border border-amber-200 bg-amber-50 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-amber-800">
                            too small
                          </span>
                        )}
                      </div>
                      <div className="truncate text-[12px] text-ink-muted">
                        TVL {fmtTvl(p.tvlUsd)}
                        {p.poolMeta ? ` · ${p.poolMeta}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {state.sparklines?.[p.pool] &&
                      state.sparklines[p.pool]!.length > 1 && (
                        <Sparkline
                          values={state.sparklines[p.pool]!}
                          width={48}
                          height={18}
                        />
                      )}
                    <div className="text-right">
                      <div className="font-mono text-[14px] tabular-nums text-ink">
                        {apyBase.toFixed(2)}%
                      </div>
                      <div className="font-mono text-[11px] tabular-nums text-ink-muted">
                        {apyReward > 0
                          ? `+ ${apyReward.toFixed(2)}%`
                          : "organic"}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {state.ok && state.candidates[0] && (
          <p className="mt-3 text-[12px] text-ink-muted">
            <span className="font-medium text-emerald-700">Green</span> = agent
            picks from these.{" "}
            <span className="font-medium text-amber-700">Amber</span> = below
            our $10M TVL safety floor (still tracked, not used).
          </p>
        )}
      </section>

      {/* Live decision feed — shows the agent is actually running. */}
      <div className="mt-12">
        <DecisionFeed limit={5} />
      </div>

      {/* Aggregate reward-leak panel — disconnected only. */}
      <WalletGate showWhen="disconnected">
        {state.ok && (
          <RewardLeak
            pools={state.candidates.map((p) => ({
              project: p.project,
              apyBase: p.apyBase ?? 0,
              apyReward: p.apyReward ?? 0,
              tvlUsdM: p.tvlUsd / 1_000_000,
            }))}
          />
        )}
      </WalletGate>

      <nav className="mt-12 flex flex-wrap items-center gap-3">
        <Link
          href="/notes"
          className="group inline-flex items-center gap-2 rounded-lg border border-rule px-4 py-2.5 text-[13px] font-medium text-ink-subtle hover:bg-subtle hover:text-ink"
        >
          <span>How it works</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </nav>

      <footer className="mt-16 flex flex-col gap-3 border-t border-hairline pt-4 text-[11px] leading-relaxed text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="tabular-nums">
            We watch ·{" "}
            {[...DEFAULT_POLICY.allowlist]
              .map((s) => protocolName(s))
              .join(" · ")}
          </div>
          <div className="mt-1 font-mono tabular-nums">
            Minimum protocol size · {fmtTvl(DEFAULT_POLICY.tvlFloorUsd)} TVL
          </div>
        </div>
        <HealthBadge />
      </footer>

      <VerifyDecision />
    </main>
  );
}
