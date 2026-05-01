import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  ShieldCheck,
} from "lucide-react";

const proofCards = [
  {
    icon: BadgeCheck,
    eyebrow: "Live checks",
    title: "Uses today's rates, not stale tables",
    body:
      "Trove watches Base USDC pools, reads wallet positions, and returns HOLD / MOVE / HARVEST from current market data.",
    href: "#positions",
    cta: "Check a wallet",
  },
  {
    icon: Boxes,
    eyebrow: "Receipts",
    title: "Every decision leaves a trail",
    body:
      "Policy config and decision logs are stored on 0G; the agent identity keeps memory roots and counters on-chain.",
    href: "/notes#status",
    cta: "View receipts",
  },
  {
    icon: CircleDollarSign,
    eyebrow: "Automation",
    title: "Only acts when the math clears",
    body:
      "The policy compares extra yield against gas, slippage, and safety margin before recommending a move.",
    href: "/notes#policy",
    cta: "See policy",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Control",
    title: "No hidden custody or lockups",
    body:
      "The live app gives verdicts and proof. Fund movement stays behind explicit wallet or execution permissions.",
    href: "/notes#realism",
    cta: "Read limits",
  },
];

export default function TrustProof() {
  return (
    <section className="mb-10 overflow-hidden rounded-2xl border border-emerald-900/10 bg-[linear-gradient(135deg,#f4fbf6_0%,#fffaf0_58%,#f7f2e8_100%)]">
      <div className="border-b border-emerald-900/10 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow text-emerald-800">why trust it</span>
            <h2 className="mt-1 text-[24px] font-semibold tracking-crunched text-ink sm:text-[32px]">
              A yield agent that can say no
            </h2>
          </div>
          <Link
            href="/notes"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-800 hover:text-emerald-950"
          >
            How it works
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-emerald-900/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {proofCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group block min-h-[210px] px-5 py-5 transition-colors hover:bg-white/50 sm:px-6"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-900 text-paper">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-800/75">
                    {card.eyebrow}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-semibold leading-tight tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-[1.55] text-ink-muted">
                  {card.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-emerald-800">
                  {card.cta}
                  <ArrowRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
