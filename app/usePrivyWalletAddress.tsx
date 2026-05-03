"use client";

/**
 * Returns the address of the wallet the user wants to SIGN with.
 *
 * Resolution order:
 *   1. First connected EXTERNAL wallet (MetaMask, Coinbase, Rainbow,
 *      WalletConnect) from `useWallets()` — this is what the user
 *      explicitly connected to act as.
 *   2. Privy embedded wallet (created from email/social login) as fallback.
 *   3. Email/SMS account address as ultra-fallback.
 *
 * `useWallets()` is Privy's canonical hook for "currently connected wallets"
 * and updates immediately when `connectWallet()` from `useConnectWallet`
 * succeeds. Reading from `user.linkedAccounts` directly was unreliable
 * because the React-state propagation differs.
 *
 * Defensive about Privy not being mounted (we conditionally mount it via
 * NEXT_PUBLIC_PRIVY_APP_ID).
 */
import { usePrivy, useWallets } from "@privy-io/react-auth";

const PRIVY_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

export function usePrivyWalletAddress(): string | null {
  if (!PRIVY_CONFIGURED) {
    return null;
  }
  // Inside this branch the PrivyProvider is mounted (see app/layout.tsx)
  // so usePrivy + useWallets are safe to call.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { authenticated, user } = usePrivy();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { wallets, ready: walletsReady } = useWallets();

  if (!authenticated) return null;

  if (walletsReady && wallets.length > 0) {
    // Prefer external wallets over embedded.
    const external = wallets.find((w) => w.walletClientType !== "privy");
    if (external?.address) return external.address;
    // Fallback to first connected wallet (could be embedded).
    const first = wallets[0];
    if (first?.address) return first.address;
  }

  // Last-resort fallbacks from the user object.
  if (user?.wallet?.address) return user.wallet.address;
  return null;
}
