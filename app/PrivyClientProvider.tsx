"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { base } from "viem/chains";
import type { ReactNode } from "react";

/**
 * Privy auth wrapper.
 *
 * UX/security model:
 *  - Users with an existing wallet (MetaMask, Coinbase, Rainbow, etc.)
 *    connect it directly. Trove never sees their private keys.
 *  - Users without a wallet can sign in with email/Google/Twitter; Privy
 *    creates a non-custodial embedded wallet via threshold-shared keys.
 *  - We never accept pasted private keys or seed phrases.
 *  - Embedded wallets are scoped to this app and recoverable via the user's
 *    login method (no separate seed phrase to misplace).
 */
export default function PrivyClientProvider({
  children,
  appId,
}: {
  children: ReactNode;
  appId: string;
}) {
  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#059669",
          logo: undefined,
          // Surface the most common Base-ecosystem wallets first.
          walletList: [
            "metamask",
            "coinbase_wallet",
            "rainbow",
            "wallet_connect",
          ],
          showWalletLoginFirst: true, // existing-wallet users see "Connect" before "Sign up"
        },
        loginMethods: ["wallet", "email", "google", "twitter"],
        embeddedWallets: {
          ethereum: {
            // Only create an embedded wallet for users who don't already have one.
            // Existing-wallet users keep using their wallet — Trove never sees keys.
            createOnLogin: "users-without-wallets",
          },
        },
        // WalletConnect bridge for mobile/cross-device connections.
        // Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to enable mobile QR flow.
        walletConnectCloudProjectId:
          process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        defaultChain: base,
        supportedChains: [base],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
