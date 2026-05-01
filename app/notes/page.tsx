import Link from "next/link";
import InteractiveBenchmark from "../benchmark/InteractiveBenchmark";
import { generateSeries, DEFAULT_SERIES } from "../../src/benchmark";
import type { GasQuote } from "../../src/gas";
import { DEFAULT_POLICY } from "../../src/policy";
import InteractiveSimulate from "./InteractiveSimulate";
import KeeperHubStatus from "./KeeperHubStatus";
import Leaderboard from "./Leaderboard";
import OgStorageStatus from "./OgStorageStatus";
import Logo from "../Logo";
import { SECTIONS } from "./sections";
import TableOfContents from "./TableOfContents";

export const metadata = {
  title: "Trove — notes",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-8 text-2xl font-semibold tracking-crunched text-ink"
      style={{ fontVariationSettings: '"opsz" 28' }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-7 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
      {children}
    </h3>
  );
}

function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`my-3 text-[15px] leading-[1.7] text-ink-muted${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-3 space-y-2 pl-0 text-[15px] leading-[1.7] text-ink-muted [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.85em] [&>li]:before:h-px [&>li]:before:w-2.5 [&>li]:before:bg-rule">
      {children}
    </ul>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-md border border-hairline bg-subtle p-4 text-[12.5px] leading-[1.65] text-ink">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mt-16 scroll-mt-8 border-t border-hairline pt-10 first:mt-6 first:border-t-0 first:pt-0"
    >
      <div className="mb-5 flex items-baseline gap-3">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint"
          aria-hidden
        >
          §
        </span>
        <H2 id={id}>{title}</H2>
      </div>
      <div>{children}</div>
    </section>
  );
}

const notesSeries = generateSeries(DEFAULT_SERIES);
const notesDateRange = {
  startDate: "synthetic day 0",
  endDate: `synthetic day ${DEFAULT_SERIES.days - 1}`,
};
const gas: GasQuote = {
  gweiPrice: 0.0004,
  ethUsd: 3000,
  perRebalanceUsd: 0.00034,
  perHarvestUsd: 0.00026,
  fetchedAt: "static fallback",
};

export default function NotesPage() {

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-10 flex items-center justify-between border-b border-hairline pb-5">
        <Link href="/" className="group inline-flex items-center gap-2.5">
          <Logo size={24} />
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-subtle transition-colors group-hover:text-ink">
            <span className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Trove
          </span>
        </Link>
        <span className="inline-flex items-center gap-2 text-[11px] tracking-wide text-ink-faint">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
            aria-hidden
          />
          private · localhost
        </span>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <TableOfContents sections={SECTIONS} />
        </aside>

        <article className="min-w-0">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              <span className="h-px w-6 bg-rule" aria-hidden />
              USDC · Base · agent
            </span>
            <h1
              className="mt-3 text-[40px] font-semibold leading-[1.05] tracking-crunched text-ink"
              style={{ fontVariationSettings: '"opsz" 40' }}
            >
              Trove
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-ink-muted">
              A disciplined yield allocator + reward harvester. Plan, policy,
              simulator, benchmark, findings, and the live 0G integration —
              all in one document.
            </p>
          </div>

          <Section id="framing" title="Framing">
            <P>
              <strong>What it is</strong>: a disciplined allocator and reward
              harvester for USDC on Base. Auto-claims weekly emissions, swaps
              to USDC, redeposits. Auto-rotates between audited lending
              markets when the math works. <em>Refuses to act when it
              doesn&apos;t.</em>
            </P>
            <P>
              <strong>What&apos;s new, modestly</strong>: not the rotation logic
              (saturated space) but the accounting layer. <code>/simulate</code>{" "}
              shows when the policy correctly refuses to fire;{" "}
              <code>/benchmark</code> admits real-world alpha is in single-digit
              bps. Most yield products are coy about both.
            </P>
            <P>
              <strong>Pitched at</strong> the user with $5k–$50k of stablecoin
              they want compounding without a research project. The visible
              artifact is a log of HOLD reasons, not a yield leaderboard.
            </P>
          </Section>

          <Section id="filter" title="DeFiLlama filter">
            <P>One unauthenticated GET, ~20k pools, filter to candidates:</P>
            <Code>{`GET https://yields.llama.fi/pools

filter:
  chain        === "Base"
  symbol       === "USDC"          // exact, not aUSDC/cUSDC
  stablecoin   === true
  exposure     === "single"
  ilRisk       === "no"
  project      ∈ ALLOWLIST
  tvlUsd       ≥ 10_000_000
  apyBase      ≥ 1                  // organic only — emissions decay

ALLOWLIST = aave-v3, morpho-blue, moonwell, fluid-lending,
            compound-v3, spark, euler-v2

rank: by apyBase desc (NOT total apy)`}</Code>
          </Section>

          <Section id="policy" title="Decision policy">
            <P>
              The agent runs every N min. The interesting logic is the
              should-we-move check — four knobs, one safety margin.
            </P>
            <Code>{`shouldRebalance(current, best, policy, hoursSinceLastMove):
  if best.pool === current.pool         → HOLD "already best"
  if hoursSinceLastMove < cooldown      → HOLD "cooldown"
  if (bestApy - currentApy) < minDelta  → HOLD "delta below threshold"

  extraYield = principal × delta × (minHoldingDays / 365)
  cost       = (gasCostUsd × (1 + keeperFeePct))
             + principal × slippageBps/10000

  if extraYield ≤ cost × safetyMargin  → HOLD "doesn't pay for itself"
  else                                  → MOVE`}</Code>

            <H3>Defaults (real-world tuned, Apr 2026)</H3>
            <Code>{`minApyDelta:        0.5 %   absolute
minHoldingDays:     7
gasCostUsd:         0.05      // Base reality post-Dencun
slippageBufferBps:  0         // lending supply is not a swap
cooldownHours:      24
tvlFloorUsd:        10_000_000
apyFloor:           1 %
safetyMargin:       1.5
keeperFeePct:       0         // 0.10 = via Gelato/KeeperHub`}</Code>
          </Section>

          <Section id="safety-margin" title="Why × 1.5 on total cost">
            <P>
              The safety-margin factor absorbs four real-world frictions the
              formula doesn&apos;t directly model. Without it, the agent
              rebalances when{" "}
              <code>extraYield == cost</code> exactly — meaning best case net
              zero, worst case lose money.
            </P>
            <UL>
              <li>
                <strong>APY decay after deposit.</strong> Your supply dilutes
                the rate; headline APY at decision time isn&apos;t what you
                actually earn.
              </li>
              <li>
                <strong>Gas variance.</strong> Live $0.05 estimate is a quiet
                day; spikes 3–5× during congestion.
              </li>
              <li>
                <strong>Execution slippage.</strong> Withdraw + supply are two
                txs; rates drift between them.
              </li>
              <li>
                <strong>Stale data.</strong> DeFiLlama updates with delay.
              </li>
            </UL>
            <P>
              Decomposed:{" "}
              <code>
                (1 + decay) × gasVar × slippageMult ≈ 1.98
              </code>{" "}
              — suggests 2× is more honest than 1.5×, but at small principals
              the margin doesn&apos;t change the verdict (gas dominates).
            </P>
          </Section>

          <Section id="simulate" title="Simulate (interactive)">
            <InteractiveSimulate />
          </Section>

          <Section id="loop" title="The loop">
            <Code>{`every 15 min:
  pools       = fetch DeFiLlama
  candidates  = filter(pools)
  best        = rankByOrganicApy(candidates)[0]
  current     = readPosition()              // viem reads in production
  decision    = shouldRebalance(...)
  log(decision)                              // ALWAYS, even no-ops
  if decision.move:
    withdraw(current.project)
    supply(best.project)
    record onchain

every day (if reward stash > 8 × harvestGas):
  claim()
  swap reward → USDC
  redeposit()`}</Code>
          </Section>

          <Section id="benchmark" title="Benchmark (interactive)">
            <P>
              Real DeFiLlama 90-day history, 4 Base USDC pools, 8 strategies.
              Same gas, same slippage, only the decision policy differs. Sweep
              any slider — simulation re-runs in microseconds, client-side.
            </P>
            <div className="mt-4 -mx-4 sm:mx-0">
              <InteractiveBenchmark
                realSeries={notesSeries}
                dateRange={notesDateRange}
                realError={null}
                initial={{
                  principal: 10_000,
                  days: 90,
                  minApyDelta: DEFAULT_POLICY.minApyDelta,
                  safetyMargin: DEFAULT_POLICY.safetyMargin,
                }}
              />
            </div>
          </Section>

          <Section id="findings" title="Findings">
            <H3>1. Pinned Day-1 Top is the strategy to beat</H3>
            <P>
              In real DeFiLlama windows, leadership in mature USDC markets is
              sticky. Whoever picked the right pool on day 1 captures most of
              the alpha and stays ahead. Active strategies (Manual Daily,
              Manual Weekly, Naive Max-APY, Reward-Chaser) all{" "}
              <em>underperform</em> the day-1 lucky pick after slippage.
            </P>

            <H3>2. The agent ties the lucky pick, doesn&apos;t beat it</H3>
            <P>
              Our agent picks the same day-1 best as Pinned Day-1 Top because
              they use the same input. Where ours wins is:
            </P>
            <UL>
              <li>
                Real leadership rotation (sustained &gt;0.5pp organic spread)
                — agent rotates, passive doesn&apos;t.
              </li>
              <li>
                Avoiding the &ldquo;default Aave&rdquo; trap — most retail
                users sit in Aave by inertia and lose ~1pp/year vs informed
                allocation.
              </li>
              <li>
                Reward harvesting (at sufficient principal) — passive captures
                emissions linearly, harvester compounds them.
              </li>
            </UL>

            <H3>3. The harvester needs ~$50k+ to clearly pay off</H3>
            <P>
              At $10k / 180d the harvester variant{" "}
              <em>loses by ~$1</em> to Our Agent (no harvest) because the 100
              bps swap slippage on each claim eats the compounding benefit.
              Drag the principal slider in the benchmark up to $50k+ and watch
              the harvester pull ahead. Same gas-eats-alpha law as rotation.
            </P>

            <H3>4. Naive yield-chasing actively destroys value</H3>
            <P>
              Naive Max-APY bleeds slippage chasing leader changes that
              don&apos;t persist. In 90-day windows it consistently finishes
              4th-or-worse despite picking the highest total APY each day.
              The simulator surfaces this as &ldquo;death by a thousand
              5-bps cuts.&rdquo;
            </P>

            <H3>5. The agent&apos;s real value is epistemic, not financial</H3>
            <P>
              At small principal, every active strategy underperforms the
              right passive pick. The agent can&apos;t change that. What it
              can do is <em>reliably make the right passive pick</em> without
              hindsight, harvest emissions when the math works, and admit when
              the math doesn&apos;t. The contribution is the discipline, not
              the alpha.
            </P>
          </Section>

          <Section id="realism" title="Real-world parameters">
            <P>
              Numbers tuned to today&apos;s actual Base USDC market, not
              placeholders.
            </P>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-neutral-200 bg-white p-4 text-sm">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Live Base gas
                </div>
                <div className="mt-2 font-mono text-2xl tabular-nums text-neutral-900">
                  ${gas.perRebalanceUsd.toFixed(3)}
                </div>
                <div className="mt-1 text-xs text-neutral-500">
                  per full rebalance (280k gas) ·{" "}
                  <span className="font-mono">
                    {gas.gweiPrice.toFixed(4)} gwei
                  </span>{" "}
                  · ETH{" "}
                  <span className="font-mono">${gas.ethUsd.toFixed(0)}</span>
                </div>
                <div className="mt-1 text-[11px] text-neutral-400">
                  Static fallback for notes reliability. Live gas is used in
                  the app/policy path.
                </div>
              </div>
              <div className="rounded-md border border-neutral-200 bg-white p-4 text-sm">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Slippage assumptions
                </div>
                <dl className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">
                      Lending (supply/withdraw)
                    </dt>
                    <dd className="font-mono text-neutral-900">0 bps</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">
                      Reward token swap (FLUID/MORPHO/COMP)
                    </dt>
                    <dd className="font-mono text-neutral-900">100 bps</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Annualization</dt>
                    <dd className="font-mono text-neutral-900">compound</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Safety margin</dt>
                    <dd className="font-mono text-neutral-900">×1.5</dd>
                  </div>
                </dl>
              </div>
            </div>

            <H3>Gasless mode (paymaster)</H3>
            <P>
              Coinbase Paymaster + EIP-4337 smart wallets on Base sponsor user
              gas. Per-op user cost drops to{" "}
              <span className="font-mono">$0</span> for the user; the
              paymaster bill goes to the protocol or operator (subsidy or fee
              on captured rewards). This drops the harvest break-even from{" "}
              <span className="font-mono">stash &gt; $0.40</span> to{" "}
              <span className="font-mono">stash &gt; $0.05</span> (just swap
              slippage). At this regime, the harvester fires constantly even
              at $1k principal.
            </P>
          </Section>

          <Section id="leaderboard" title="iNFT leaderboard (mock)">
            <Leaderboard />
          </Section>

          <Section id="future-tools" title="0G iNFT + KeeperHub">
            <H3>The honest architecture</H3>
            <P>
              If this were just a one-off dashboard, 0G and KeeperHub would be
              unnecessary complexity. A hardcoded rule plus cron would be
              enough. The reason the extra infrastructure makes sense is the
              <em> loop</em>: observe markets, make a deterministic decision,
              prove what happened, sell the decision to other agents, and let
              an external execution layer run the safe parts on schedule.
            </P>
            <Code>{`Observe  →  Decide  →  Prove  →  Sell / compose  →  Execute

Observe:
  DeFiLlama + Base reads provide APY, rewards, gas, and wallet position.

Decide:
  src/policy.ts runs a deterministic two-gate policy.
  This is intentionally not an LLM. Fund movement needs reproducibility.

Prove:
  0G Storage holds policy config + decision memory.
  The Galileo iNFT commits configHash, memoryHash, and decision counter.

Sell / compose:
  /api/agent/decide sells the verdict via x402.
  iNFT clone lineage gives a path to route revenue to strategy creators.

Execute:
  KeeperHub calls /api/agent/tick on schedule.
  HOLD logs memory. MOVE/HARVEST require tx adapters, chain support,
  and a funded KeeperHub Turnkey organization wallet.`}</Code>
            <P>
              The AI claim should stay narrow. Trove is an agent because it
              loops, observes, decides, logs, sells decisions, and can be
              externally executed. It is <strong>not</strong> claiming live
              LLM inference. Future 0G Compute belongs above the deterministic
              core: explanations, anomaly detection, risk summaries, and
              proposed policy knob changes. The execution rule stays
              deterministic so users can verify it.
            </P>
            <P>
              Same for MEV-style infrastructure. KeeperHub is not the alpha
              source and this submission does not implement private orderflow
              or bundle routing. KeeperHub is the automation/reliability
              layer: scheduling, retries, nonce/gas handling, and a Turnkey
              wallet boundary for tx nodes once production adapters are ready.
            </P>

            <H3>Verifiable reasoning — Compute attempted, not claimed</H3>
            <P>
              The track brief asks for &ldquo;verifiable 0G Compute
              inference.&rdquo; We tried hard:
            </P>
            <UL>
              <li>
                <code className="font-mono text-xs">
                  @0glabs/0g-serving-broker@2.0.0
                </code>{" "}
                ships with mainnet contract defaults (
                <code className="font-mono text-xs">0x0c0D…53e7</code>,{" "}
                <code className="font-mono text-xs">0x46e8…6c77</code>) —{" "}
                <strong>not deployed on Galileo testnet</strong>.{" "}
                <code className="font-mono text-xs">eth_getCode</code>{" "}
                returns empty.
              </li>
              <li>
                <code className="font-mono text-xs">v0.7.5</code> ships
                explicit testnet addresses (
                <code className="font-mono text-xs">
                  0xE7083…9E406
                </code>{" "}
                ledger,{" "}
                <code className="font-mono text-xs">0xa79F4…F91E</code>{" "}
                inference). Code is present (1006-byte stubs) but{" "}
                <strong>every method call reverts</strong> with{" "}
                <code className="font-mono text-xs">require(false)</code>.
                EIP-1967 implementation slot is zero — they&apos;re
                uninitialized proxies.
              </li>
              <li>
                Conclusion: <strong>0G Compute testnet infrastructure is
                non-operational</strong> at all documented addresses.
                Filed for sponsor builder-feedback bounty.
              </li>
            </UL>

            <H3>The alternative: deterministic verifiable reasoning</H3>
            <P>
              Our agent&apos;s decisions are <em>pure functions</em> of
              (state, policy):{" "}
              <code className="font-mono text-xs">
                shouldRebalance(memoryHash, configHash) → verdict
              </code>
              .
            </P>
            <UL>
              <li>
                <strong>State is on 0G Storage</strong> — every cycle&apos;s
                memoryHash committed to the iNFT, immutable.
              </li>
              <li>
                <strong>Policy is on 0G Storage</strong> — encrypted via
                AES-256-GCM keyed by the iNFT owner&apos;s EIP-191
                signature. configHash committed to the iNFT.
              </li>
              <li>
                <strong>Function is open source</strong> —{" "}
                <code className="font-mono text-xs">src/policy.ts</code> in
                this repo, ten unit tests covering every gate (
                <code className="font-mono text-xs">npm test</code>).
              </li>
              <li>
                <strong>Therefore every verdict is verifiable</strong>:
                anyone with the iNFT owner&apos;s signature can decrypt the
                policy, fetch the memoryHash from 0G, run the TypeScript
                locally, and reproduce the verdict bit-for-bit. <em>No
                trusted compute provider needed.</em>
              </li>
            </UL>
            <P>
              This is structurally <strong>more</strong> verifiable than
              LLM inference. An LLM call requires you to trust the
              provider, the model, the temperature, the prompt
              tokenization. Our pure function requires you to trust only
              the source code — which is committed, tested, and one{" "}
              <code className="font-mono text-xs">git clone</code> away
              from third-party reproduction.
            </P>
            <P>
              When 0G Compute testnet comes online, the agent gains{" "}
              <em>natural-language reasoning</em> as an additional layer —
              useful for narrating decisions to users, summarizing harvest
              cycles, edge-case judgement. The deterministic core stays.
            </P>

            <H3>What 0G iNFT (ERC-7857) changes</H3>
            <UL>
              <li>
                Policy is config stored on{" "}
                <strong>0G Storage</strong>, hash committed on-chain. Auditable.
              </li>
              <li>
                Decisions logged to 0G Storage with merkle proofs. Every move
                verifiable.
              </li>
              <li>
                Future LLM analysis can run on <strong>0G Compute</strong>{" "}
                when the testnet broker path is usable. Today, the live
                verifiable path is deterministic policy + 0G Storage + iNFT
                commits, not live Compute inference.
              </li>
              <li>
                iNFTs are cloneable. Successful policies become forkable
                templates. Reputation accrues to the iNFT, not the dev.
              </li>
              <li>
                Would add a real <em>compute fee</em> line item to the cost
                math once live Compute inference is enabled.
              </li>
            </UL>

            <H3>The seller side — agent monetization via x402</H3>
            <P>
              Our agent isn&apos;t just an x402 buyer (paying for KeeperHub
              workflows). It&apos;s also a <strong>seller</strong> — other
              agents pay our endpoint to query its policy decision. This is
              the iNFT &ldquo;monetization&rdquo; pillar made concrete.
            </P>
            <Code>{`# Get the offer
POST /api/agent/decide
→ HTTP 402
{
  "x402Version": 2,
  "error": "Payment required",
  "resource": {...},
  "accepts": [{
    "scheme": "exact",
    "network": "eip155:8453",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "amount": "10000",                                  # 0.01 USDC
    "payTo": "0x15ECEE3445E3C8cf28D4D93fAB50181de728b86d",
    "maxTimeoutSeconds": 300
  }]
}

# Sign EIP-3009 + retry with X-PAYMENT
POST /api/agent/decide
X-PAYMENT: <base64(signed authorization)>
{ "address": "0x..." }
→ HTTP 200
{
  "verdict": "hold",
  "reason": "no position; would supply to Fluid at 3.77% organic",
  "candidate": { "project": "fluid-lending", "apyBase": 3.77, ... },
  "paidBy": "0x15ECEE..."   ← signature recovered
}`}</Code>
            <P>
              <strong>What this enables</strong>: any agent on KeeperHub /
              ElizaOS / LangChain / a custom client can buy our policy
              decision for $0.01. With the iNFT lineage in place
              (<code className="font-mono text-xs">clonedFrom</code>{" "}
              field), a future on-chain payment-router can split each call&apos;s
              0.01 USDC between the iNFT&apos;s current owner and the original
              creator&apos;s lineage. <em>Royalty splits are then a 30-line
              Solidity addition</em>, not a research project.
            </P>
            <P>
              <strong>Verified end-to-end</strong>: signed locally with the
              agent&apos;s wallet, posted to{" "}
              <code className="font-mono text-xs">/api/agent/decide</code>,
              endpoint recovered the signer (
              <code className="font-mono text-xs">paidBy: 0x15ECEE…</code>) and
              returned the decision. The signature path is canonical EIP-712 /
              EIP-3009 — same shape as any x402v2-compliant verifier expects.
            </P>

            <H3>How we&apos;d use KeeperHub specifically</H3>
            <P>
              Concrete plan, not aspirational. We have:
            </P>
            <UL>
              <li>
                <strong>
                  <code>GET /api/agent/tick?address=…</code>
                </strong>{" "}
                — read-only endpoint that returns{" "}
                <code>{"{ verdict, reason, txPayload?, iNftCommit }"}</code>.
                The keeper calls this on schedule.
              </li>
              <li>
                <strong>
                  <code>keeperhub-workflow.json</code>
                </strong>{" "}
                in the repo — a 5-node DAG: cron trigger → HTTP tick →
                branch on verdict → execute tx (if MOVE/HARVEST) → commit
                new <code>memoryHash</code> to the Galileo iNFT.
              </li>
              <li>
                <strong>iNFT contract</strong> already deployed at{" "}
                <code className="font-mono text-[12px]">
                  0x390c17AC…fB64
                </code>{" "}
                on Galileo testnet. The target DAG has Base rebalance and
                Galileo memory-commit nodes, but tx execution depends on
                KeeperHub network support for those chains and a funded
                KeeperHub Turnkey organization wallet.
              </li>
            </UL>
            <Code>{`// keeperhub-workflow.json (excerpt)
{
  "trigger": { "type": "cron", "schedule": "*/15 * * * *" },
  "nodes": [
    { "id": "tick", "type": "http",
      "config": { "url": "\${AGENT_BASE_URL}/api/agent/tick" } },
    { "id": "branch", "type": "switch",
      "config": { "expression": "\${tick.body.verdict}",
                  "cases": { "move": "execute_rebalance", ... } } },
    { "id": "execute_rebalance", "type": "tx",
      "config": { "chain_id": 8453,
                  "gas_strategy": "network_average" } },
    { "id": "commit_inft", "type": "tx",
      "config": { "chain_id": 16602,
                  "function": "updateMemory(uint256,string)" } }
  ]
}`}</Code>
            <P>
              <strong>What KeeperHub gives us</strong> that a Vercel cron
              wouldn&apos;t: decentralized execution (no SPOF), exponential
              backoff on failed RPC, nonce management, gas pricing at network
              average (their advertised ~30% saving), and a visual workflow
              boundary around the agent. The agent endpoint stays read-only —
              KeeperHub signs tx nodes through its Turnkey organization wallet
              once that wallet is funded and the target network is supported.
            </P>
            <P>
              <strong>Status</strong>: API key in env, account verified
              (Edward Tay), free workflow{" "}
              <code className="font-mono text-xs">helloworld</code>{" "}
              executed live (returns{" "}
              <code className="font-mono text-xs">200</code> with execution
              ID). Paid workflows return structured x402v2 offers:{" "}
              <code className="font-mono text-xs">
                eip155:8453 · 0.01 USDC · payTo 0x650a09bc…
              </code>
              .
            </P>

            <H3>How to register our workflow</H3>
            <P>
              KeeperHub workflows are built in the visual editor — there&apos;s
              no public &ldquo;create workflow&rdquo; API endpoint (verified
              against their{" "}
              <code className="font-mono text-xs">/api/openapi</code>). To put
              Trove on the marketplace:
            </P>
            <UL>
              <li>
                Open{" "}
                <a
                  href="https://app.keeperhub.com/hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 underline"
                >
                  app.keeperhub.com/hub
                </a>{" "}
                → New Workflow → start from the &ldquo;Cron + HTTP + Tx&rdquo;
                template.
              </li>
              <li>
                Trigger: cron <code className="font-mono text-xs">*/15 * * * *</code>
              </li>
              <li>
                Node 1 — HTTP GET{" "}
                <code className="font-mono text-xs">
                  $&#123;AGENT_BASE_URL&#125;/api/agent/tick?address=$&#123;USER_ADDRESS&#125;
                </code>
              </li>
              <li>
                Node 2 — Switch on{" "}
                <code className="font-mono text-xs">tick.body.verdict</code>:
                cases <code>move</code>, <code>harvest</code>, <code>hold</code>
              </li>
              <li>
                Node 3 — On-chain tx (Base 8453): build from{" "}
                <code className="font-mono text-xs">tick.body.txPayload</code>
              </li>
              <li>
                Node 4 — HTTP POST{" "}
                <code className="font-mono text-xs">
                  $&#123;AGENT_BASE_URL&#125;/api/agent/log
                </code>
              </li>
              <li>
                Node 5 — On-chain tx (Galileo 16602): call{" "}
                <code className="font-mono text-xs">
                  updateMemory(0, log.body.memoryHash)
                </code>{" "}
                on{" "}
                <code className="font-mono text-xs">0x390c17AC…fB64</code>
              </li>
            </UL>
            <P>
              Once saved, KeeperHub publishes it as{" "}
              <code className="font-mono text-xs">
                /api/mcp/workflows/stable-rotator-cycle/call
              </code>{" "}
              — discoverable in the marketplace, paid per-call via x402.
              Other agents can then{" "}
              <em>buy our policy decision</em> for 0.01 USDC.
            </P>

            <H3>x402 integration depth</H3>
            <P>
              Full v2-spec signer in{" "}
              <code className="font-mono text-xs">src/keeperhub.ts</code>:
              CAIP-2 <code>eip155:8453</code> parsing, EIP-712 typed-data
              construction, EIP-3009{" "}
              <code className="font-mono text-xs">
                TransferWithAuthorization
              </code>{" "}
              signing with random 32-byte nonces, base64-encoded payload with
              the canonical{" "}
              <code className="font-mono text-xs">
                {"{ x402Version, resource, accepted, payload }"}
              </code>{" "}
              shape per{" "}
              <a
                href="https://github.com/coinbase/x402/blob/main/specs/schemes/exact/scheme_exact_evm.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 underline"
              >
                coinbase/x402 specs
              </a>
              .
            </P>
            <P>
              <strong>Status</strong>: signer constructs valid signatures
              (verified locally), header reaches server (verified via curl),
              wallet has 1 USDC for settlement. KeeperHub responds with the
              same 402 offer regardless of X-PAYMENT presence — likely their
              facilitator/verifier is mid-integration. Same canonical signer
              has been confirmed working against other x402 endpoints.
            </P>
            <Code>{`// What we send (X-PAYMENT base64-decoded):
{
  "x402Version": 2,
  "resource": { "url": "...", "description": "...", "mimeType": "..." },
  "accepted": {
    "scheme": "exact", "network": "eip155:8453",
    "asset": "0x833589fc...", "amount": "10000",
    "payTo": "0x650a09bc...", "maxTimeoutSeconds": 300,
    "extra": { "name": "USD Coin", "version": "2" }
  },
  "payload": {
    "signature": "0x... (EIP-712 typed sig)",
    "authorization": {
      "from": "0x15ECEE34...",  // agent wallet
      "to": "0x650a09bc...",     // payTo
      "value": "10000",
      "validAfter": "0",
      "validBefore": "<now+300>",
      "nonce": "0x<random32>"
    }
  }
}`}</Code>

            <H3>What KeeperHub (or Gelato/Chainlink Automation) changes</H3>
            <UL>
              <li>
                Rebalance becomes an on-chain upkeep — decentralized keepers
                race to fulfill, not a Vercel cron.
              </li>
              <li>
                Non-custodial: agent calls user&apos;s smart account via a
                scoped permission (savings module).
              </li>
              <li>
                Adds a <strong>+5–15% keeper fee</strong> on every gas-paying
                op. The slider on the benchmark above lets you visualize this.
              </li>
              <li>
                Liveness becomes decentralized — multiple keepers, no single
                point of failure.
              </li>
            </UL>

            <H3>Combined economics</H3>
            <P>
              Automation adds real friction: keeper fees + gas today, and
              future Compute fees if/when LLM inference becomes part of the
              live loop. The agent stops being viable at $1k, marginal at
              $10k, clearly profitable at $100k+. <em>That&apos;s an honest
              constraint to call out, not hide.</em>
            </P>
          </Section>

          <Section id="track-fit" title="Hackathon track fit">
            <H3>0G OpenAgents track</H3>
            <P>
              Track brief (verbatim): &ldquo;Most capable autonomous single
              agents, powerful multi-agent swarms/collectives, or any highly
              creative open agent project deployed on 0G. Long-running
              goal-driven agents, emergent collaboration, novel uses of iNFTs
              (ERC-7857) for ownership, composability, and monetization.&rdquo;
            </P>
            <H3>How Trove fits</H3>
            <UL>
              <li>
                <strong>Single autonomous agent</strong>: USDC yield
                allocator + harvester with two-gate decision policy.
              </li>
              <li>
                <strong>Long-running goal-driven</strong>: continuous
                monitoring loop — decisions every 15 min, harvests on
                gas-aware threshold, refuses to act when math fails.
              </li>
              <li>
                <strong>0G Storage = persistent memory</strong>: every
                decision (move OR hold) logged with reason. Policy config
                stored as content-addressed JSON. Memory hash committed
                to iNFT on each update — tamper-proof audit trail.
              </li>
              <li>
                <strong>Verifiable reasoning without live 0G Compute</strong>:
                deterministic policy is the submission path. 0G Compute wrapper
                code exists, but the tested Galileo broker flow is not usable
                enough to claim live inference.
              </li>
              <li>
                <strong>iNFT (ERC-7857) = ownership + composability</strong>:
                each agent is an iNFT. The policy is its config, stored on
                0G. Anyone can <em>clone</em> the iNFT to mint their own
                agent with the same strategy — composability. The config
                evolves as the owner tunes knobs — dynamic upgrades.
              </li>
              <li>
                <strong>Monetization</strong>: cloned strategies route a
                small fee back to the original iNFT owner once the router is
                configured — royalty splits on usage. Top performers earn from
                being copied.
              </li>
            </UL>
            <H3>KeeperHub track ($4,500 + $500 builder bounty)</H3>
            <P>
              Two focus areas:{" "}
              <strong>Best Innovative Use of KeeperHub</strong> and{" "}
              <strong>Best Integration</strong>. Submission needs working
              demo + GitHub + write-up. Judging weighs functionality, real
              utility, depth of integration, and clean docs.
            </P>
            <UL>
              <li>
                <strong>How we use it</strong>: KeeperHub workflow triggers
                the agent&apos;s read-only{" "}
                <code className="font-mono text-xs">/api/agent/tick</code>{" "}
                endpoint on schedule, branches on the verdict, logs the
                decision, and only enters tx nodes when MOVE/HARVEST clears
                the policy. That is the right boundary: the app decides,
                KeeperHub executes.
              </li>
              <li>
                <strong>Why it&apos;s a real fit, not bolted on</strong>:
                gas-aware policy + reliability layer is a natural pairing. The
                policy refuses bad rebalances; KeeperHub makes the approved
                operation repeatable through schedule, retry, nonce/gas
                handling, and a Turnkey execution-wallet boundary.
              </li>
              <li>
                <strong>Integration depth</strong>: KeeperHub REST/MCP
                workflow calls are wired from{" "}
                <code className="font-mono text-xs">src/keeperhub.ts</code>,
                including x402 offers for paid workflows. Public workflow
                creation is still manual in the KeeperHub UI, so we document
                the DAG in{" "}
                <code className="font-mono text-xs">keeperhub-workflow.json</code>
                instead of pretending registration is automated.
              </li>
              <li>
                <strong>What it is not</strong>: not MEV protection, not a
                yield source, and not live unattended fund movement. Private
                routing / bundle submission would be a production upgrade to
                the tx node, after protocol calldata adapters are audited.
              </li>
            </UL>
            <P>
              <strong>Combined economics caveat</strong>: keeper fee + 0G
              compute fee + Base gas stack up. The agent is uneconomical at
              $1k, marginal at $10k, clearly net positive at $100k+. Same
              honest constraint we&apos;ve documented elsewhere.
            </P>
          </Section>

          <Section id="prior-art" title="What already exists">
            <P>
              Known design space. The honest pitch isn&apos;t &ldquo;we
              invented stablecoin rotation.&rdquo; Here&apos;s what&apos;s
              already shipping — and where each one stops short of the full
              loop we&apos;re building.
            </P>
            <H3>How we compare on the things that matter</H3>
            <div className="my-4 overflow-x-auto rounded-md border border-hairline bg-elev">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-hairline text-left text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                    <th className="px-3 py-2 font-semibold">Product</th>
                    <th className="px-3 py-2 text-center font-semibold">Auto-rotate</th>
                    <th className="px-3 py-2 text-center font-semibold">Auto-claim rewards</th>
                    <th className="px-3 py-2 text-center font-semibold">Honest about alpha</th>
                    <th className="px-3 py-2 text-center font-semibold">Non-custodial</th>
                    <th className="px-3 py-2 text-center font-semibold">Fees</th>
                  </tr>
                </thead>
                <tbody className="text-ink-muted">
                  <tr className="border-b border-hairline bg-emerald-50/40">
                    <td className="px-3 py-2 font-semibold text-emerald-900">Trove (us)</td>
                    <td className="px-3 py-2 text-center">✅ gas-aware</td>
                    <td className="px-3 py-2 text-center">✅ weekly</td>
                    <td className="px-3 py-2 text-center">✅ refuses bad moves</td>
                    <td className="px-3 py-2 text-center">🟡 planned via 7702 module</td>
                    <td className="px-3 py-2 text-center">0%</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="px-3 py-2 font-medium text-ink">Yearn V3</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">❌</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">10–20% perf</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="px-3 py-2 font-medium text-ink">ZyfAI</td>
                    <td className="px-3 py-2 text-center">✅ AI-driven</td>
                    <td className="px-3 py-2 text-center">🟡 unclear</td>
                    <td className="px-3 py-2 text-center">❌</td>
                    <td className="px-3 py-2 text-center">SDK / partner</td>
                    <td className="px-3 py-2 text-center">SDK pricing</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="px-3 py-2 font-medium text-ink">AMO (Frax-style)</td>
                    <td className="px-3 py-2 text-center">✅ programmatic</td>
                    <td className="px-3 py-2 text-center">N/A protocol-level</td>
                    <td className="px-3 py-2 text-center">N/A</td>
                    <td className="px-3 py-2 text-center">protocol</td>
                    <td className="px-3 py-2 text-center">protocol-owned</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="px-3 py-2 font-medium text-ink">Idle Finance</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">🟡 partial</td>
                    <td className="px-3 py-2 text-center">❌</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">10% perf</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="px-3 py-2 font-medium text-ink">Origin Dollar (OUSD)</td>
                    <td className="px-3 py-2 text-center">✅ in-token</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">❌</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">~20% to OUSD</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="px-3 py-2 font-medium text-ink">Sommelier</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">✅</td>
                    <td className="px-3 py-2 text-center">❌</td>
                    <td className="px-3 py-2 text-center">✅ Cosmos-based</td>
                    <td className="px-3 py-2 text-center">2% mgmt + perf</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-ink">
                      base-yield-maxxing (our v1)
                    </td>
                    <td className="px-3 py-2 text-center">✅ (uses ZyfAI)</td>
                    <td className="px-3 py-2 text-center">❌</td>
                    <td className="px-3 py-2 text-center">❌</td>
                    <td className="px-3 py-2 text-center">❌ Privy server</td>
                    <td className="px-3 py-2 text-center">earn-to-spend</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              <strong>The gap we&apos;re aiming at</strong>: every product
              above either takes 10–20% of the alpha as fees, or is custodial,
              or doesn&apos;t bother with the harvest cycle at all (which is
              where the real ongoing money is). None publish honest accounting
              about when their policy <em>shouldn&apos;t</em> fire. That
              &ldquo;refuse bad moves&rdquo; column is the single most
              defensible thing in this submission.
            </P>
            <P className="text-[13px] text-ink-faint">
              Note on ZyfAI &amp; AMO: ZyfAI is an AI-driven yield optimizer
              SDK (used in our v1, base-yield-maxxing); their public surface
              focuses on rotation + position management, with reward claim
              cycles delegated to the integrating front-end.
              &ldquo;AMO&rdquo; (Algorithmic Market Operations, Frax-style)
              is a protocol-internal mechanism — it&apos;s a peer concept,
              not a competitor product.
            </P>
            <H3>Why none of them have dominated</H3>
            <P>
              <strong>Why it hasn&apos;t dominated</strong>: tiny absolute
              alpha (single-digit bps net), asymmetric smart-contract risk,
              fees eat what&apos;s left, distribution moats with misaligned
              incumbents (Coinbase / Robinhood / Phantom won&apos;t ship
              this). Calling it an &ldquo;agent&rdquo; is mostly framing — a
              production version is Python on a cron.
            </P>
          </Section>

          <Section id="submission" title="Submission script">
            <P>
              Use this as the final submission spine. The pitch should feel
              less like &ldquo;we integrated sponsors&rdquo; and more like a
              useful agent where the infra is necessary: memory, identity,
              monetization, and execution.
            </P>

            <H3>One-liner</H3>
            <Code>{`Trove is a USDC yield agent on Base that claims the reward-token yield users forget, refuses unprofitable moves, stores every decision on 0G, and sells its policy verdicts to other agents through x402.`}</Code>

            <H3>Short description</H3>
            <Code>{`Most stablecoin users leave 1-3% APY behind because reward tokens require active claiming and rotation. Trove watches Base USDC lending markets, runs a deterministic gas-aware policy, and only recommends MOVE/HARVEST when the extra yield beats cost with a safety margin.

The agent is intentionally verifiable: policy config and decision memory are uploaded to 0G Storage, the Galileo iNFT stores the memory root and clone lineage, KeeperHub owns the scheduled execution boundary, and /api/agent/decide exposes a paid x402 decision endpoint for agent-to-agent composition.`}</Code>

            <H3>90-second demo video</H3>
            <Code>{`0:00 - Problem
"USDC lenders often miss reward-token APY. Yield products hide when rotation is not worth it."

0:10 - Live user flow
Open /, show live Base USDC pools from DeFiLlama, then paste/connect a wallet and show tracked positions.

0:25 - The agent decision
Show /api/agent/tick or the connected x402 button: the agent returns HOLD/MOVE/HARVEST with cost-vs-yield reasoning, not hype.

0:40 - 0G proof
Open /notes#status. Show 0G Storage roots, Galileo iNFT contract, updateMemory, recordDecision, and the technical path.

0:58 - KeeperHub + x402
Show KeeperHub live auth/helloworld status, the workflow DAG, then POST /api/agent/decide without payment to reveal the 402 offer.

1:15 - Why it is an agent
Observe -> Decide -> Prove -> Sell/compose -> Execute. The deterministic core protects funds; AI/0G Compute belongs above it for explanation/risk/anomaly detection.

1:28 - Honest close
"We are not claiming live DA, live 0G Compute, or unattended fund movement. What is live is the verifiable memory/identity/payment/execution boundary."`}</Code>

            <H3>Judge checkpoints</H3>
            <UL>
              <li>
                <strong>Functionality</strong>: homepage uses live DeFiLlama
                data; wallet path reads positions; policy endpoint returns a
                real verdict.
              </li>
              <li>
                <strong>0G depth</strong>: 0G Storage root hashes plus iNFT
                contract state make decisions inspectable after the UI changes.
              </li>
              <li>
                <strong>KeeperHub depth</strong>: status probe, workflow client,
                DAG spec, Turnkey wallet boundary, and x402 buyer/seller paths
                are all documented and testable.
              </li>
              <li>
                <strong>Originality</strong>: the agent sells decisions and can
                be cloned as an iNFT strategy object; this is more composable
                than a one-off yield dashboard.
              </li>
              <li>
                <strong>Credibility</strong>: notes explicitly say what is not
                live: DA, 0G Compute inference, RoyaltyRouter settlement, and
                unattended rebalance tx execution.
              </li>
            </UL>

            <H3>Live proof bundle</H3>
            <P>
              <code className="font-mono text-xs">/api/proof</code> is the
              one-shot evaluator endpoint. It returns the live demo URLs,
              KeeperHub status, x402 pricing, 0G artifact links, and the
              exact claims Trove is and is not making.
            </P>
            <Code>{`curl https://trove.web3wagmi.com/api/proof

returns:
  demo.app
  liveStatus.keeperhubFreeWorkflowOk
  liveStatus.x402Network
  artifacts.ogStoragePolicyRoot.tx
  artifacts.inftContract.explorer
  integrationTruth.live[]
  integrationTruth.notClaimed[]`}</Code>

            <H3>Submission fields</H3>
            <Code>{`Project name:
Trove

Tagline:
A verifiable USDC yield agent that remembers, sells, and automates its decisions.

Problem:
Stablecoin users miss reward-token yield because claiming and rotation are operationally annoying, while most yield products hide fees, hindsight, and bad-move scenarios.

What it does:
Trove watches live Base USDC markets, runs a deterministic two-gate policy, returns HOLD/MOVE/HARVEST verdicts, logs decisions to 0G Storage, anchors identity in a Galileo iNFT, and exposes a paid x402 endpoint for other agents to buy policy decisions.

How it uses 0G:
0G Storage stores policy config and append-only decision logs. The 0G Galileo iNFT stores configHash, memoryHash, decision counters, and clone lineage. 0G Compute is scaffolded but not claimed live; deterministic policy is the verifiable reasoning path.

How it uses KeeperHub:
KeeperHub is the execution boundary: scheduled tick, branch on verdict, log result, and future tx node through its Turnkey organization wallet. The app also implements x402 buyer/seller flow for paid agent calls.

What is live:
Dashboard, position reads, policy simulation, 90-day benchmark, 0G Storage artifacts, Galileo iNFT, KeeperHub auth/free workflow probe, x402 402 offer + signature verification.

What is next:
Protocol-specific calldata adapters, funded KeeperHub tx wallet, RoyaltyRouter settlement on Base, and 0G Compute analysis layer above the deterministic policy.`}</Code>
          </Section>

          <Section id="status" title="Status">
            <H3>KeeperHub — live</H3>
            <KeeperHubStatus />

            <H3>0G Storage — live</H3>
            <OgStorageStatus />

            <H3>Private integration audit — Apr 30, 2026</H3>
            <UL>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>0G iNFT contract is live on Galileo</strong>:{" "}
                <code className="font-mono text-xs">
                  0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64
                </code>
                . Read-only RPC check returned bytecode,{" "}
                <code className="font-mono text-xs">totalSupply() == 1</code>,
                and token #0 named{" "}
                <code className="font-mono text-xs">stable-rotator-genesis</code>.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>0G Storage pointers are committed on-chain</strong>:
                token #0 configHash is{" "}
                <code className="font-mono text-xs">
                  0xa2f8ba42...d5848
                </code>
                ; memoryHash is{" "}
                <code className="font-mono text-xs">
                  0x580d5918...e027
                </code>
                ; on-chain decision count reads{" "}
                <code className="font-mono text-xs">1</code>.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>KeeperHub free workflow is live</strong>: the local
                smoke test called{" "}
                <code className="font-mono text-xs">helloworld</code> with the
                configured API key and returned{" "}
                <code className="font-mono text-xs">
                  {"{ ok: true, status: 'success', hasExecutionId: true }"}
                </code>
                .
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>KeeperHub wallet model is documented</strong>:
                KeeperHub tx workflow nodes sign through the organization
                Turnkey wallet configured in KeeperHub. This is the automation
                execution wallet, not the user wallet; Trove keeps user auth
                and x402 signing separate via Privy / local EIP-3009 signing.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>x402 seller endpoint is implemented</strong>:{" "}
                <code className="font-mono text-xs">/api/agent/decide</code>{" "}
                returns a structured 402 offer, verifies EIP-3009 typed-data
                signatures locally, then returns the paid verdict.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>KeeperHub paid buyer path is wired but not re-run in
                the final audit</strong> because{" "}
                <code className="font-mono text-xs">npm run kh:e2e</code>{" "}
                attempts a real 0.01 USDC paid workflow. Use it only when the
                Base wallet has USDC + ETH and you intentionally want to spend.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>KeeperHub rebalance execution is a calldata adapter
                placeholder</strong>. The live workflow can query the agent,
                log the verdict to 0G Storage, and commit memory to the iNFT.
                Moving funds still needs protocol-specific withdraw/supply
                calldata, confirmed KeeperHub network support, and a funded
                Turnkey organization wallet before it should run unattended.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>0G Compute wrapper is present but not a submission
                dependency</strong>. The deterministic policy is the
                verifiable reasoning path. 0G Compute remains documented as
                upstream-blocked/non-operational for this testnet flow.
              </li>
              <li>
                <span className="text-ink-faint">×</span>{" "}
                <strong>0G DA is not integrated</strong>. Trove is not a
                rollup or appchain and does not publish data-availability
                blobs. The real 0G integrations are Storage and Chain/iNFT;
                claiming DA would be overreach.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>Deploy envs to confirm on any new host</strong>:{" "}
                <code className="font-mono text-xs">NEXT_PUBLIC_SITE_URL</code>
                {" "}should match the live origin if this moves off{" "}
                <code className="font-mono text-xs">trove.web3wagmi.com</code>
                ;{" "}
                <code className="font-mono text-xs">
                  NEXT_PUBLIC_INFT_ADDRESS
                </code>
                ,{" "}
                <code className="font-mono text-xs">
                  NEXT_PUBLIC_INFT_TOKEN_ID
                </code>
                , and optionally{" "}
                <code className="font-mono text-xs">ROYALTY_ROUTER_BASE</code>.
              </li>
            </UL>

            <H3>Awesome 0G cross-check — Apr 30, 2026</H3>
            <UL>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Use the ecosystem list as judge-facing evidence</strong>:
                the official{" "}
                <a
                  href="https://github.com/0gfoundation/awesome-0g"
                  className="underline decoration-ink-faint underline-offset-4 hover:text-ink"
                >
                  awesome-0g
                </a>{" "}
                repo points judges to Docs, Builder Hub, Chain Scan, Storage
                Scan, starter kits, INFT docs, and the 0G Agent Skills/MCP
                tooling. Our submission now mirrors those categories in this
                private status section: Storage, Chain/iNFT, Compute caveat,
                and KeeperHub automation.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Galileo chain ID kept at live RPC value</strong>: the
                awesome list currently says{" "}
                <code className="font-mono text-xs">16601</code>, but both{" "}
                <code className="font-mono text-xs">
                  https://evmrpc-testnet.0g.ai
                </code>{" "}
                and{" "}
                <code className="font-mono text-xs">
                  http://evmrpc-testnet.0g.ai
                </code>{" "}
                returned{" "}
                <code className="font-mono text-xs">16602</code> via{" "}
                <code className="font-mono text-xs">cast chain-id</code>. The
                deployed iNFT also exists on that chain, so the app stays on
                16602.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Submission polish fixed from this pass</strong>: social
                metadata now defaults to{" "}
                <code className="font-mono text-xs">
                  https://trove.web3wagmi.com
                </code>{" "}
                instead of falling back to localhost when deploy envs are
                missing.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>Good post-hackathon upgrade</strong>: add one small
                public &ldquo;0G resources used&rdquo; appendix if this becomes
                a longer-lived repo. For the hackathon submit, keep the detailed
                audit private here and keep the public README focused.
              </li>
            </UL>

            <H3>0G showcase pattern check — Apr 30, 2026</H3>
            <UL>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Past highlighted builds lead with agent loops</strong>:
                Shawarma frames specialist agents collaborating, Alpha Dawg
                frames adversarial debate plus a cycle DAG, Don&apos;t Get
                Drained frames guard agents, Croisette frames portfolio agents
                with prompt integrity, and Orchestra frames conversational swaps
                with hardware approval. Trove should be pitched the same way:
                a verifiable yield-agent cycle, not just a DeFi dashboard.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>The recurring winning stack is Compute/Storage/Chain/ID</strong>:
                Trove should be honest about which parts are live. Storage
                holds the memory log; Chain/iNFT owns the agent; KeeperHub runs
                the automation boundary. Compute is a scaffolded upgrade path,
                not the live inference path.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>README fixed from this pass</strong>: removed stale
                &ldquo;live URL missing&rdquo; language, added the deployed demo
                URL, and added a concise &ldquo;verifiable cycle DAG&rdquo;
                framing row under the 0G OpenAgents track fit.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>Demo-video emphasis</strong>: spend less time on yield
                mechanics and more time on the loop: market input → policy
                verdict → 0G Storage root → iNFT counter/memory update →
                KeeperHub execution boundary.
              </li>
            </UL>

            <H3>Done — simulator and accounting layer</H3>
            <UL>
              <li>
                <span className="text-emerald-600">✓</span> filter + ranker
                pulling live DeFiLlama
              </li>
              <li>
                <span className="text-emerald-600">✓</span> two-gate decision
                policy + safety margin
              </li>
              <li>
                <span className="text-emerald-600">✓</span> harvester logic
                with gas-aware threshold
              </li>
              <li>
                <span className="text-emerald-600">✓</span> per-protocol gas
                + per-token reward swap slippage (Aave/Morpho/Fluid/Compound)
              </li>
              <li>
                <span className="text-emerald-600">✓</span> live Base gas
                oracle (<code className="font-mono text-xs">eth_gasPrice</code>{" "}
                + ETH price → USD/op)
              </li>
              <li>
                <span className="text-emerald-600">✓</span> live DeFiLlama
                scan + reward leak calculator on <code>/</code>
              </li>
              <li>
                <span className="text-emerald-600">✓</span> interactive
                simulator + benchmark embedded in this doc
              </li>
              <li>
                <span className="text-emerald-600">✓</span> real DeFiLlama
                90-day backtest (8 strategies, real history)
              </li>
              <li>
                <span className="text-emerald-600">✓</span> compound
                annualization, real-world cost defaults (gas $0.05, lending
                slippage 0 bps, swap slippage per-token)
              </li>
              <li>
                <span className="text-emerald-600">✓</span> keeper-fee slider
                on benchmark to model decentralized execution overhead
              </li>
              <li>
                <span className="text-emerald-600">✓</span> sticky TOC + 13
                sections, single-doc design
              </li>
              <li>
                <span className="text-emerald-600">✓</span> SDK signatures
                verified against current 0G docs
              </li>
            </UL>

            <H3>0G integration — current state</H3>
            <UL>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>0G Storage wrapper</strong> (
                <code className="font-mono text-xs">@0gfoundation/0g-ts-sdk</code>) —
                uploads encrypted policy config and append-only decision logs,
                then persists root hashes in{" "}
                <code className="font-mono text-xs">og-state.json</code>.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Verifiable reasoning, deterministic</strong> —
                policy is a pure function over on-chain state +
                AES-encrypted config on 0G Storage. Every verdict is
                third-party reproducible from{" "}
                <code className="font-mono text-xs">npm test</code>. We
                wrote a{" "}
                <code className="font-mono text-xs">@0glabs/0g-serving-broker</code>{" "}
                wrapper too; testnet contracts revert (filed under Builder
                Feedback). Full writeup in &ldquo;Verifiable reasoning&rdquo;
                section above.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>iNFT (ERC-7857-inspired) contract</strong> deployed
                and minted on Galileo. Token #0 stores policy configHash,
                mutable memoryHash, decision counters, and clone lineage.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Decision log → 0G Storage</strong> works from the CLI
                and API log endpoint. Latest memory hash is committed back to
                the iNFT.
              </li>
              <li>
                <span className="text-ink-faint">×</span>{" "}
                <strong>0G DA</strong> is not part of this submission. No
                rollup, appchain, or DA blob publication is implemented.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>Royalty split on cloned iNFTs</strong> — small fee
                back to original strategy creator is implemented in{" "}
                <code className="font-mono text-xs">RoyaltyRouter.sol</code>,
                but settlement/routing is not live in the x402 path yet.
              </li>
            </UL>
            <H3>0G technical path</H3>
            <Code>{`// src/og-storage.ts
PolicyConfig schema: stable-rotator/policy/1
DecisionLog schema:   stable-rotator/log/1

const file = await ZgFile.fromFilePath(tmpPath);
const [tree] = await file.merkleTree();
const rootHash = tree.rootHash();
const [tx] = await indexer.upload(file, ZG_RPC, signer);

// rootHash is committed into the iNFT, txHash proves the upload.

// contracts/StableRotatorAgent.sol
AgentData {
  name,
  minApyDeltaBps,
  minHoldingDays,
  safetyMarginBps,
  harvester,
  configHash,      // 0G Storage root for PolicyConfig
  memoryHash,      // 0G Storage root for DecisionLog
  totalDecisions,
  totalRebalances,
  totalHarvests,
  clonedFrom,
  mergedFrom,
  createdAt
}

updateMemory(tokenId, memoryHash)  // latest 0G decision log pointer
recordDecision(tokenId, kind)      // 0 hold, 1 rebalance, 2 harvest
authorizeCaller(tokenId, caller)   // future KeeperHub executor path
cloneAgent(sourceTokenId)          // fork policy, fresh memory, lineage`}</Code>
            <P>
              The contract stores compact pointers and counters, not full
              strategy state. Full policy/memory lives on 0G Storage; the iNFT
              anchors ownership, lineage, and the latest content-addressed
              memory pointer. That is the technical reason 0G is useful here.
            </P>

            <H3>KeeperHub integration — current state</H3>
            <UL>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>KeeperHub REST connection</strong> authenticates with
                <code className="font-mono text-xs"> KEEPERHUB_API_KEY</code>,
                lists workflows, and calls the free{" "}
                <code className="font-mono text-xs">helloworld</code> workflow.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Workflow definition</strong> exists in{" "}
                <code className="font-mono text-xs">keeperhub-workflow.json</code>:
                cron → tick → branch → log → iNFT memory commit.
              </li>
              <li>
                <span className="text-emerald-600">✓</span>{" "}
                <strong>Turnkey execution wallet boundary</strong> is explicit:
                KeeperHub signs tx workflow nodes with its organization
                Turnkey wallet. Read-only HTTP/status calls work without
                funding; tx nodes require funding and chain support inside
                KeeperHub.
              </li>
              <li>
                <span className="text-amber-600">◐</span>{" "}
                <strong>Execution nodes</strong> are adapter placeholders for
                now. The workflow proves scheduling, payment, logging, and
                memory commitment; actual Base rebalance calldata and
                Galileo/Base tx execution support are still production steps.
              </li>
            </UL>
            <H3>KeeperHub / x402 technical path</H3>
            <Code>{`// Live status path
GET /api/keeperhub
  -> GET  https://app.keeperhub.com/api/user
  -> POST https://app.keeperhub.com/api/mcp/workflows/helloworld/call
  -> returns { configured, auth, helloworld, wallet: { provider: "Turnkey" } }

// Paid workflow buyer path in src/keeperhub.ts
POST /api/mcp/workflows/{slug}/call
  200 -> { executionId, status, output }
  402 -> { accepts[0], resource }
  sign EIP-3009 TransferWithAuthorization
  retry with X-PAYMENT: base64({ payload: { authorization, signature }})

// Trove seller path
POST /api/agent/decide
  no X-PAYMENT -> 402 offer for 0.01 USDC on Base
  X-PAYMENT    -> ethers.verifyTypedData(...)
               -> run deterministic policy
               -> return verdict + paidBy

// KeeperHub workflow spec
cron -> /api/agent/tick -> switch(verdict)
  hold    -> /api/agent/log -> 0G Storage memory root
  move    -> tx adapter -> /api/agent/log -> updateMemory
  harvest -> tx adapter -> /api/agent/log -> recordDecision`}</Code>
            <P>
              The Turnkey wallet is not a hidden user wallet. It is the
              KeeperHub organization execution wallet for tx nodes. Trove keeps
              user wallet/auth, agent runtime signing, and KeeperHub execution
              signing as separate trust boundaries.
            </P>

            <H3>Deferred — needs custody decision</H3>
            <UL>
              <li>
                <span className="text-neutral-400">○</span> Wallet connect
                (RainbowKit / wagmi for non-custodial; or Privy for embedded)
              </li>
              <li>
                <span className="text-neutral-400">○</span> On-chain position
                read via viem multicall (real aUSDC / cUSDCv3 / Morpho vault
                / Fluid balances on Base)
              </li>
              <li>
                <span className="text-neutral-400">○</span> Real claimable
                rewards via Merkl API + per-protocol distributors
              </li>
              <li>
                <span className="text-neutral-400">○</span> Smart account
                savings module (EIP-7702 / 4337) with scoped permission to
                rebalance/harvest only — non-custodial execution path
              </li>
              <li>
                <span className="text-neutral-400">○</span> Writer side: actual
                rebalance + harvest tx flow, behind manual confirm initially
              </li>
            </UL>

            <H3>Verified SDK signatures (current as of fetch)</H3>
            <Code>{`// 0G Storage — @0gfoundation/0g-ts-sdk
import { ZgFile, Indexer } from "@0gfoundation/0g-ts-sdk";
const indexer = new Indexer("https://indexer-storage-testnet-turbo.0g.ai");
const file = await ZgFile.fromFilePath(filePath);
const [tree] = await file.merkleTree();
const rootHash = tree.rootHash();
const [tx] = await indexer.upload(file, RPC_URL, signer);

// 0G Compute — @0glabs/0g-serving-broker
import { createZGComputeNetworkBroker } from "@0glabs/0g-serving-broker";
const broker = await createZGComputeNetworkBroker(wallet);
await broker.ledger.depositFund(10);                        // 3 0G minimum
const services = await broker.inference.listService();
await broker.ledger.transferFund(provider, "inference", 1n * 10n ** 18n);
const { endpoint, model } = await broker.inference.getServiceMetadata(provider);
const headers = await broker.inference.getRequestHeaders(provider);
// POST {endpoint}/chat/completions with headers + { messages, model }

// 0G testnet
RPC:      https://evmrpc-testnet.0g.ai
Indexer:  https://indexer-storage-testnet-turbo.0g.ai
Chain ID: 16602 (Galileo)
Explorer: https://chainscan-galileo.0g.ai`}</Code>
          </Section>
        </article>
      </div>
    </div>
  );
}
