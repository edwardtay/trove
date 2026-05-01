import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Zap,
  Flame,
  Coins,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { fetchPools, filterCandidates, rankByOrganicApy } from "../../src/llama";
import { simulate, makeScenarios } from "../../src/simulate";
import { VARIANTS } from "../../src/agent-variants";
import { protocolName } from "../../src/protocols";
import Logo from "../Logo";

export const metadata = {
  title: "Agent variants — Trove",
  robots: { index: false, follow: false },
};

export const revalidate = 60;

const ACCENT: Record<
  string,
  {
    bg: string;
    border: string;
    text: string;
    chip: string;
    icon: React.ReactNode;
  }
> = {
  emerald: {
    bg: "bg-emerald-50/60",
    border: "border-emerald-200",
    text: "text-emerald-900",
    chip: "bg-emerald-600 text-white",
    icon: <Shield className="h-4 w-4" />,
  },
  amber: {
    bg: "bg-amber-50/60",
    border: "border-amber-200",
    text: "text-amber-900",
    chip: "bg-amber-600 text-white",
    icon: <Zap className="h-4 w-4" />,
  },
  rose: {
    bg: "bg-rose-50/60",
    border: "border-rose-200",
    text: "text-rose-900",
    chip: "bg-rose-600 text-white",
    icon: <Flame className="h-4 w-4" />,
  },
  indigo: {
    bg: "bg-indigo-50/60",
    border: "border-indigo-200",
    text: "text-indigo-900",
    chip: "bg-indigo-600 text-white",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
};

function fmtPolicyKnob(label: string, value: string) {
  return (
    <div className="flex items-baseline justify-between border-b border-hairline py-1.5 last:border-0">
      <span className="text-[11px] uppercase tracking-[0.12em] text-ink-faint">
        {label}
      </span>
      <span className="font-mono text-[12px] tabular-nums text-ink">
        {value}
      </span>
    </div>
  );
}

export default async function AgentsPage() {
  const pools = await fetchPools();

  // Use the bull-case scenario at $10k for each variant's "would I move now?"
  // demo — same DeFiLlama-grade inputs, different policy verdicts.
  const scenarios = makeScenarios(10_000);
  const bullScenario = scenarios.find((s) => s.name === "bull")!;

  const verdicts = VARIANTS.map((v) => ({
    variant: v,
    sim: simulate(bullScenario, v.policy),
  }));

  // Cross-agent dissent — the Critic looks at Balanced's verdict and either
  // ratifies or flags. If they disagree, that's the swarm's "second opinion"
  // signal that gets logged to 0G Storage.
  const balanced = verdicts.find((v) => v.variant.id === "balanced");
  const critic = verdicts.find((v) => v.variant.id === "critic");
  const criticDissents =
    !!balanced &&
    !!critic &&
    balanced.sim.decision.move !== critic.sim.decision.move;

  // Live data context
  const candidates = rankByOrganicApy(
    filterCandidates(pools, VARIANTS[1]!.policy),
  );
  const best = candidates[0];

  return (
    <main className="mx-auto max-w-6xl px-6 pb-14 pt-6">
      <div className="sticky top-0 z-10 -mx-6 mb-8 border-b border-hairline bg-paper/90 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <Logo size={24} />
            <ArrowLeft className="h-3 w-3 text-ink-subtle transition-transform group-hover:-translate-x-0.5" />
            <span className="text-[13px] font-medium text-ink-subtle transition-colors group-hover:text-ink">
              Trove
            </span>
          </Link>
          <span className="hidden items-center gap-1.5 text-[11px] text-ink-faint sm:flex">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden
            />
            four agents · one runtime · shared 0G memory
          </span>
        </div>
      </div>

      <header className="mb-10">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
          <Coins className="h-3 w-3" aria-hidden />
          Agent swarm · pick your stance
        </span>
        <h1
          className="mt-3 text-[40px] font-semibold leading-[1.02] tracking-crunched text-ink sm:text-[48px] md:text-[60px]"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          Four agents.{" "}
          <span className="text-emerald-600">One swarm.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.55] text-ink-muted">
          Same code, same DeFiLlama feed, four risk stances + a Critic
          specialist that re-evaluates every Balanced verdict with stricter
          knobs. When the Critic dissents, the swarm logs the disagreement
          to 0G Storage as a flag for the user. Each one is a separate iNFT
          — clone the strategy you trust.
        </p>
      </header>

      {best && (
        <div className="mb-8 rounded-xl border border-hairline bg-elev p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden
            />
            Live · today&apos;s top
          </div>
          <p className="mt-1.5 text-[14px] text-ink-muted">
            <span className="font-semibold text-ink">
              {protocolName(best.project)}
            </span>{" "}
            ·{" "}
            <span className="font-mono tabular-nums text-ink">
              {(best.apyBase ?? 0).toFixed(2)}%
            </span>{" "}
            organic
            {(best.apyReward ?? 0) > 0 && (
              <>
                {" + "}
                <span className="font-mono tabular-nums text-emerald-700">
                  {(best.apyReward ?? 0).toFixed(2)}%
                </span>{" "}
                rewards
              </>
            )}
          </p>
        </div>
      )}

      <div
        className={`mb-6 flex items-start gap-3 rounded-xl border p-4 ${
          criticDissents
            ? "border-amber-300 bg-amber-50/70"
            : "border-emerald-200 bg-emerald-50/50"
        }`}
      >
        {criticDissents ? (
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
        ) : (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        )}
        <div>
          <div
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
              criticDissents ? "text-amber-800" : "text-emerald-700"
            }`}
          >
            {criticDissents
              ? "Swarm dissent — Critic flags Balanced"
              : "Swarm consensus — Critic ratifies Balanced"}
          </div>
          <p className="mt-1 text-[13px] leading-[1.55] text-ink-muted">
            {criticDissents
              ? `Balanced says ${balanced?.sim.decision.move ? "MOVE" : "HOLD"}; Critic says ${critic?.sim.decision.move ? "MOVE" : "HOLD"}. The swarm logs this disagreement to 0G Storage so the user sees a second-opinion red flag, not just a single verdict.`
              : "Both Balanced and Critic agree at this scenario. The swarm's verdict carries higher confidence — committed to 0G Storage as 'ratified'."}
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {verdicts.map(({ variant, sim }) => {
          const accent = ACCENT[variant.accent]!;
          const verdict = sim.decision.move ? "MOVE" : "HOLD";
          return (
            <article
              key={variant.id}
              className={`relative overflow-hidden rounded-2xl border ${accent.border} ${accent.bg} p-6`}
            >
              <header className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${accent.chip}`}
                  >
                    {accent.icon}
                  </span>
                  <h2
                    className={`text-[20px] font-semibold tracking-tightish ${accent.text}`}
                  >
                    {variant.name}
                  </h2>
                </div>
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-wider ${
                    verdict === "MOVE"
                      ? "bg-ink text-paper"
                      : "bg-paper/70 text-ink-subtle ring-1 ring-hairline"
                  }`}
                >
                  {verdict}
                </span>
              </header>

              <p className={`mt-3 text-[13px] leading-[1.55] ${accent.text}/75`}>
                {variant.blurb}
              </p>

              <div className="mt-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Policy knobs
                </div>
                <div className="mt-2">
                  {fmtPolicyKnob(
                    "Min Δ APY",
                    `${variant.policy.minApyDelta.toFixed(2)}%`,
                  )}
                  {fmtPolicyKnob(
                    "Hold (days)",
                    `${variant.policy.minHoldingDays}d`,
                  )}
                  {fmtPolicyKnob(
                    "Safety ×",
                    `×${variant.policy.safetyMargin.toFixed(2)}`,
                  )}
                  {fmtPolicyKnob(
                    "Cooldown",
                    `${variant.policy.cooldownHours}h`,
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-md border border-hairline bg-paper/50 p-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Verdict at $10k bull case
                </div>
                <div className={`mt-1 text-[28px] font-semibold leading-none tracking-crunched ${accent.text}`}>
                  {verdict}
                </div>
                <p className="mt-1.5 text-[11px] leading-[1.45] text-ink-muted">
                  {sim.decision.reason}
                </p>
              </div>

              <footer className="mt-4 flex items-center justify-between text-[11px]">
                {variant.iNftTokenId !== null ? (
                  <a
                    href={`https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-emerald-700 hover:underline"
                  >
                    iNFT #{variant.iNftTokenId} · live ↗
                  </a>
                ) : (
                  <span className="font-mono text-ink-faint">
                    iNFT preset · mintable
                  </span>
                )}
                <button className="rounded-md border border-hairline px-2 py-1 text-[11px] font-medium text-ink-subtle hover:bg-subtle">
                  {variant.iNftTokenId !== null ? "View" : "Mint clone"}
                </button>
              </footer>
            </article>
          );
        })}
      </section>

      <section className="mt-12 rounded-xl border border-hairline bg-elev p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Why three?
        </div>
        <p className="mt-2 max-w-3xl text-[15px] leading-[1.65] text-ink-muted">
          The 0G OpenAgents brief asks for{" "}
          <em>specialist agent swarms that collaborate via shared 0G
          Storage memory.</em> Our take: same agent code, three risk stances,
          each minted as its own iNFT. They share the data feed and decision
          math; their on-chain memory diverges by stance over time. Forks of
          the Conservative variant will have a different cycle history than
          forks of Aggressive — and the RoyaltyRouter contract is designed to
          route clone fees back to the right original creator once enabled.
        </p>
      </section>

      <nav className="mt-10 flex items-center gap-3">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper transition-all hover:bg-ink-muted"
        >
          See the proof
        </Link>
        <Link
          href="/"
          className="text-[13px] text-ink-subtle hover:text-ink"
        >
          ← home
        </Link>
      </nav>
    </main>
  );
}
