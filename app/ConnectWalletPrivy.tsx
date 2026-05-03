"use client";

import { usePrivy } from "@privy-io/react-auth";
import { LogIn, LogOut, Wallet } from "lucide-react";
import { EnsName } from "./EnsName";

export default function ConnectWalletPrivy() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  if (!ready) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-subtle px-3 py-1.5 text-[12px] text-ink-faint">
        <Wallet className="h-3.5 w-3.5" aria-hidden />
        loading…
      </span>
    );
  }

  if (authenticated && user) {
    const wallet = user.wallet?.address ?? user.email?.address ?? "anon";
    const isEvm = wallet.startsWith("0x");
    return (
      <button
        onClick={() => logout()}
        className="group inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-[12px] font-medium text-emerald-900 transition-colors hover:bg-emerald-50"
        title="Click to disconnect"
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
          aria-hidden
        />
        {isEvm ? (
          <EnsName address={wallet} className="font-mono tabular-nums" />
        ) : (
          <span className="font-mono tabular-nums">{wallet}</span>
        )}
        <LogOut
          className="h-3 w-3 text-emerald-700/60 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </button>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="group inline-flex items-center gap-1.5 rounded-md border border-rule bg-elev px-3 py-1.5 text-[12px] font-medium text-ink shadow-card transition-all hover:shadow-card-lift"
    >
      <LogIn className="h-3.5 w-3.5" aria-hidden />
      <span>Connect wallet</span>
    </button>
  );
}
