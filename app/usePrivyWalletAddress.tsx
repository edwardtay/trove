"use client";

/**
 * Returns the connected Privy wallet address if Privy is configured AND the
 * user is authenticated. Otherwise returns null.
 *
 * This is a defensive wrapper around `usePrivy` because we conditionally
 * mount `PrivyProvider` based on `NEXT_PUBLIC_PRIVY_APP_ID`. If Privy isn't
 * mounted, calling its hooks throws — so we check the env var first and
 * skip the hook entirely when it's absent.
 *
 * The conditional-hook pattern is normally taboo, but in our case the env
 * var is read once at module load and never changes during the lifetime
 * of a page render, so React's hook-rules invariant (same hooks called in
 * same order on every render) is preserved.
 */
import { usePrivy } from "@privy-io/react-auth";

const PRIVY_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

export function usePrivyWalletAddress(): string | null {
  if (!PRIVY_CONFIGURED) {
    return null;
  }
  // Inside this branch the PrivyProvider is mounted (see app/layout.tsx)
  // so usePrivy is safe to call.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { authenticated, user } = usePrivy();
  if (!authenticated || !user) return null;
  const addr = user.wallet?.address ?? null;
  return addr;
}
