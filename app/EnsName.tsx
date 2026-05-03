"use client";

import { useEffect, useState } from "react";

type Props = {
  address: string | null | undefined;
  /** How to render when no ENS name exists. Defaults to truncated address. */
  fallback?: "truncate" | "full" | "hide";
  /** Tailwind class string for the rendered span. */
  className?: string;
};

const cache = new Map<string, { name: string | null; cachedAt: number }>();
const TTL_MS = 5 * 60_000;

function truncateAddress(addr: string): string {
  if (addr.length <= 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

/**
 * Reverse-resolve an Ethereum address to its primary ENS name and display it.
 * Falls back to a truncated address if no name is set. Cached client-side
 * (5 min TTL) so re-renders don't refetch.
 *
 * Hits our own /api/ens/reverse?address=0x... rather than going to a
 * mainnet RPC directly from the browser — keeps RPC keys server-side and
 * lets us share one cache across users via Next.js fetch cache.
 */
export function EnsName({ address, fallback = "truncate", className }: Props) {
  const [name, setName] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!address) return;
    const key = address.toLowerCase();
    const hit = cache.get(key);
    if (hit && Date.now() - hit.cachedAt < TTL_MS) {
      setName(hit.name);
      return;
    }
    let cancelled = false;
    fetch(`/api/ens/reverse?address=${encodeURIComponent(address)}`)
      .then((r) => r.json())
      .then((d: { name?: string | null }) => {
        if (cancelled) return;
        const resolved = d.name ?? null;
        cache.set(key, { name: resolved, cachedAt: Date.now() });
        setName(resolved);
      })
      .catch(() => {
        if (cancelled) return;
        cache.set(key, { name: null, cachedAt: Date.now() });
        setName(null);
      });
    return () => {
      cancelled = true;
    };
  }, [address]);

  if (!address) return null;

  if (name === undefined) {
    // Loading — render the address optimistically so layout doesn't shift.
    return (
      <span className={className} title={address}>
        {fallback === "full" ? address : truncateAddress(address)}
      </span>
    );
  }

  if (name) {
    return (
      <span className={className} title={`${name} → ${address}`}>
        {name}
      </span>
    );
  }

  if (fallback === "hide") return null;
  return (
    <span className={className} title={address}>
      {fallback === "full" ? address : truncateAddress(address)}
    </span>
  );
}
