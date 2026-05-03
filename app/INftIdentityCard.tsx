"use client";

/**
 * Live iNFT identity card. Reads on-chain state from the StableRotatorAgent
 * contract on 0G Galileo and surfaces it on the homepage.
 *
 * Anchors the "Trove is a real on-chain agent" claim — visitors see the
 * token ID, current memory hash, decision counters, all backed by an
 * explorer link they can click to verify.
 */

import { useEffect, useState } from "react";
import { Sparkles, ExternalLink, Loader2, Cpu } from "lucide-react";

type INftResponse = {
  contract: string;
  tokenId: number;
  chainId: number;
  chainName?: string;
  explorer: string;
  tokenExplorer?: string;
  agent?: {
    name: string;
    configHash: string;
    memoryHash: string;
    totalDecisions: string;
    totalRebalances: string;
    totalHarvests: string;
    clonedFrom: string;
    createdAt: number;
    createdAtIso: string;
    harvester: boolean;
  };
  error?: string;
};

function shortHash(h: string | undefined, head = 8, tail = 6): string {
  if (!h || h === "0x") return "—";
  if (h.length <= head + tail + 1) return h;
  return `${h.slice(0, head)}…${h.slice(-tail)}`;
}

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 0) return "just now";
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function INftIdentityCard() {
  const [data, setData] = useState<INftResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agent/inft")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-hairline bg-subtle p-5">
        <span className="inline-flex items-center gap-2 text-[12px] text-ink-faint">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Reading agent state from 0G Galileo…
        </span>
      </div>
    );
  }
  if (!data) return null;

  const explorerUrl = data.tokenExplorer ?? data.explorer;

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-paper to-paper">
      <div className="flex items-center justify-between border-b border-emerald-200/60 bg-emerald-50/40 px-5 py-3">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
          <Cpu className="h-3 w-3" aria-hidden />
          Agent identity · iNFT on 0G Galileo
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/api/inft/metadata/${data.tokenId}`}
            target="_blank"
            rel="noopener noreferrer"
            title="OpenSea-style ERC-721 metadata. Live counters and 0G Storage hashes — pulls from on-chain agents() getter on every request."
            className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 underline-offset-2 hover:underline"
          >
            metadata json
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Explorer shows token info but no metadata image — that's because StableRotatorAgent is ERC-7857-inspired and exposes rich state via the custom agents() getter, not standard tokenURI(). Click 'metadata json' for the full on-chain state."
            className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 underline-offset-2 hover:underline"
          >
            view on explorer
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Identity
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[20px] font-semibold tracking-crunched text-ink">
              {data.agent?.name || "Trove"}
            </span>
            <span className="font-mono text-[12px] text-ink-muted">
              · token #{data.tokenId}
            </span>
          </div>
          <div className="mt-1 font-mono text-[11px] text-ink-faint">
            {shortHash(data.contract)}
          </div>
        </div>

        {data.agent ? (
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Decisions on-chain
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[20px] font-semibold tracking-crunched text-ink tabular-nums">
                {data.agent.totalDecisions}
              </span>
              <span className="text-[12px] text-ink-muted">
                total · {data.agent.totalRebalances} moves ·{" "}
                {data.agent.totalHarvests} harvests
              </span>
            </div>
            <div className="mt-1 text-[11px] text-ink-faint">
              minted {relativeTime(data.agent.createdAtIso)}
            </div>
          </div>
        ) : (
          <div className="text-[12px] text-ink-faint">
            {data.error || "agent state unavailable"}
          </div>
        )}
      </div>

      {data.agent && (
        <div className="border-t border-emerald-200/40 bg-emerald-50/20 px-5 py-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Policy hash · 0G Storage
              </div>
              <div className="mt-1 font-mono text-[11px] text-ink-subtle">
                {shortHash(data.agent.configHash)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Memory hash · 0G Storage
              </div>
              <div className="mt-1 font-mono text-[11px] text-ink-subtle">
                {shortHash(data.agent.memoryHash)}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-900/70">
            <Sparkles className="h-3 w-3 text-emerald-600" aria-hidden />
            Every decision cycle commits the new memory hash to this iNFT and
            appends to the 0G Storage decision log.
          </div>
        </div>
      )}
    </div>
  );
}
