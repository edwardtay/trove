"use client";

import { useState, useTransition } from "react";
import { Search, Sparkles, Server, Link as LinkIcon, Database } from "lucide-react";
import BuyDecisionButton from "./BuyDecisionButton";
import type { AgentDiscoverProfile } from "../src/agent-ens";

export default function AgentDiscover() {
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<AgentDiscoverProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setError(null);
    setProfile(null);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/agent/discover?name=${encodeURIComponent(trimmed)}`);
        const json = await res.json();
        
        if (!res.ok) {
          throw new Error(json.error || "Failed to discover agent");
        }
        
        setProfile(json.profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    });
  }

  return (
    <section className="mt-14">
      <div className="mb-4 flex flex-col gap-0.5">
        <span className="eyebrow inline-flex items-center gap-1.5">
          <Search className="h-3 w-3" aria-hidden />
          discover agents
        </span>
        <h2 className="section-h">Find agents via ENS text records</h2>
      </div>
      
      <p className="mb-4 text-[13px] leading-relaxed text-ink-muted">
        Type an ENS name to read its public text records and discover agent metadata like its iNFT contract, 0G Storage memory hash, and x402 payment endpoint. Try <span className="font-mono text-emerald-600 font-semibold cursor-pointer" onClick={() => { setInput("trove-agent.eth"); setProfile(null); setError(null); }}>trove-agent.eth</span>
      </p>

      <form onSubmit={handleSubmit} className="card flex items-center gap-2 p-3">
        <Sparkles className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. trove-agent.eth"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent font-mono text-[13px] tabular-nums text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim() || !input.includes(".eth")}
          className="rounded-md bg-ink px-3 py-1.5 text-[12px] font-medium text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isPending ? "resolving…" : "resolve"}
        </button>
      </form>

      {error && (
        <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-[13px] text-amber-800">
          {error}
        </div>
      )}

      {profile && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-hairline bg-elev">
          <div className="border-b border-hairline bg-subtle px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-mono text-lg font-semibold text-ink">{profile.name}</h3>
                <p className="text-[12px] text-ink-muted">Agent Profile Discovered</p>
              </div>
            </div>
            {profile.description && (
              <p className="mt-3 text-[14px] leading-relaxed text-ink-subtle">
                {profile.description}
              </p>
            )}
          </div>
          
          <div className="p-6">
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              ENS Text Records (Agent Metadata)
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.x402Endpoint && (
                <div className="rounded-lg border border-hairline p-4">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase text-emerald-600">
                    <Server className="h-3.5 w-3.5" />
                    x402-endpoint
                  </div>
                  <div className="truncate font-mono text-[12px] text-ink" title={profile.x402Endpoint}>
                    {profile.x402Endpoint}
                  </div>
                </div>
              )}
              
              {profile.ogInft && (
                <div className="rounded-lg border border-hairline p-4">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase text-blue-600">
                    <LinkIcon className="h-3.5 w-3.5" />
                    0g-inft
                  </div>
                  <div className="truncate font-mono text-[12px] text-ink" title={profile.ogInft}>
                    {profile.ogInft}
                  </div>
                </div>
              )}

              {profile.ogMemory && (
                <div className="rounded-lg border border-hairline p-4">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium uppercase text-purple-600">
                    <Database className="h-3.5 w-3.5" />
                    0g-memory
                  </div>
                  <div className="truncate font-mono text-[12px] text-ink" title={profile.ogMemory}>
                    {profile.ogMemory}
                  </div>
                </div>
              )}
            </div>

            {profile.x402Endpoint && (
              <div className="mt-6 flex flex-col gap-2 border-t border-hairline pt-6">
                <span className="text-[12px] text-ink-muted">
                  This agent accepts x402 payments for decisions:
                </span>
                <div className="self-start">
                  <BuyDecisionButton endpoint={profile.x402Endpoint} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
