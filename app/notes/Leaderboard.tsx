"use client";

type Agent = {
  iNftId: number;
  name: string;
  policy: string;
  return90d: number;
  tvlUsd: number;
  clones: number;
  decisions90d: number;
  status: "active" | "paused";
};

// Synthetic mock data — illustrates the pitch shape, not real on-chain agents.
// In production these would come from querying iNFT-7857 contracts on 0G Chain.
const MOCK_AGENTS: Agent[] = [
  {
    iNftId: 34601,
    name: "Trove",
    policy: "two-gate + harvest",
    return90d: 4.62,
    tvlUsd: 1_240_000,
    clones: 12,
    decisions90d: 184,
    status: "active",
  },
  {
    iNftId: 51920,
    name: "yield-maximizer",
    policy: "max-APY chase",
    return90d: 5.18,
    tvlUsd: 850_000,
    clones: 47,
    decisions90d: 612,
    status: "active",
  },
  {
    iNftId: 22041,
    name: "conservative-saver",
    policy: "Aave-only, never move",
    return90d: 3.12,
    tvlUsd: 4_200_000,
    clones: 89,
    decisions90d: 1,
    status: "active",
  },
  {
    iNftId: 71203,
    name: "morpho-loyalist",
    policy: "Pinned Morpho STEAKUSDC",
    return90d: 4.41,
    tvlUsd: 2_180_000,
    clones: 34,
    decisions90d: 1,
    status: "active",
  },
  {
    iNftId: 88812,
    name: "reward-hunter",
    policy: "harvest weekly + chase emissions",
    return90d: 5.47,
    tvlUsd: 320_000,
    clones: 8,
    decisions90d: 91,
    status: "active",
  },
  {
    iNftId: 12054,
    name: "weekly-rebalance-v2",
    policy: "manual weekly proxy",
    return90d: 4.08,
    tvlUsd: 95_000,
    clones: 3,
    decisions90d: 13,
    status: "paused",
  },
];

function fmtUsd(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n}`;
}

export default function Leaderboard() {
  const ranked = [...MOCK_AGENTS].sort((a, b) => b.return90d - a.return90d);
  return (
    <div>
      <p className="text-sm leading-relaxed text-neutral-600">
        How <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-xs">/benchmark</code>{" "}
        looks if every &ldquo;strategy&rdquo; is a real iNFT-7857 on 0G Chain.
        Each row is auditable — policy hash on 0G Storage, decision log
        merkle-rooted on-chain. <strong>Mock data</strong>; real integration
        would query iNFT contracts directly.
      </p>
      <div className="mt-4 overflow-x-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-[10px] uppercase tracking-wider text-neutral-500">
              <th className="px-3 py-1.5 font-semibold">iNFT</th>
              <th className="px-3 py-1.5 font-semibold">Policy</th>
              <th className="px-3 py-1.5 text-right font-semibold">90d return</th>
              <th className="px-3 py-1.5 text-right font-semibold">TVL</th>
              <th className="px-3 py-1.5 text-right font-semibold">Clones</th>
              <th className="px-3 py-1.5 text-right font-semibold">Decisions</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((a, i) => {
              const isOurs = a.iNftId === 34601;
              return (
                <tr
                  key={a.iNftId}
                  className={`border-b border-neutral-100 last:border-0 ${
                    isOurs ? "bg-emerald-50" : ""
                  }`}
                >
                  <td className="px-3 py-1.5">
                    <span className="flex items-center gap-2">
                      {i === 0 && (
                        <span className="text-amber-500" title="rank 1">
                          ★
                        </span>
                      )}
                      <span
                        className={`text-[13px] ${
                          isOurs
                            ? "font-semibold text-emerald-900"
                            : "text-neutral-900"
                        }`}
                      >
                        {a.name}
                      </span>
                      {isOurs && (
                        <span className="rounded-sm bg-emerald-600 px-1 py-px text-[8px] font-bold uppercase tracking-wider text-white">
                          you
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-neutral-400">
                        #{a.iNftId}
                      </span>
                    </span>
                  </td>
                  <td className="px-3 py-1.5 font-mono text-[11px] text-neutral-500">
                    {a.policy}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-[13px] tabular-nums">
                    <span
                      className={
                        a.return90d > 4
                          ? "text-emerald-700"
                          : a.return90d > 3
                          ? "text-neutral-900"
                          : "text-neutral-500"
                      }
                    >
                      {a.return90d > 0 ? "+" : ""}
                      {a.return90d.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-[13px] tabular-nums text-neutral-700">
                    {fmtUsd(a.tvlUsd)}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-[13px] tabular-nums text-neutral-500">
                    {a.clones}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-[13px] tabular-nums text-neutral-500">
                    {a.decisions90d.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
        Note: <span className="font-semibold">yield-maximizer</span> wins on
        raw return but logged 612 decisions in 90 days — almost 7×/day. That
        compute + gas overhead is real; in a fee-sensitive product, our agent
        (#34601) finishes #3 with{" "}
        <span className="font-mono">184 decisions</span> — the disciplined
        middle.
      </p>
    </div>
  );
}
