"use client";

/**
 * Big connect-wallet CTA for the disconnected hero. Uses Privy's `login()`
 * directly. Hidden when Privy isn't configured (mirrors ConnectWallet).
 */
import { LogIn, ArrowRight } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

const PRIVY_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

export default function HeroConnectButton() {
  if (!PRIVY_CONFIGURED) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ready, authenticated, login } = usePrivy();
  if (authenticated) return null;

  return (
    <button
      onClick={() => login()}
      disabled={!ready}
      className="group mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-[14px] font-semibold text-ink shadow-[0_0_0_4px_rgba(16,185,129,0.18)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_0_6px_rgba(16,185,129,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LogIn className="h-4 w-4" aria-hidden />
      <span>Connect wallet</span>
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </button>
  );
}
