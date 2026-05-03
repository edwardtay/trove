"use client";

/**
 * One-time button: user signs Aave's setClaimer(user, KEEPERHUB_TURNKEY)
 * to authorize KeeperHub's Turnkey wallet to claim rewards on their behalf.
 *
 * After this single tx, KeeperHub's scheduled workflow can call
 * claimAllRewardsOnBehalf forever — no further user signatures needed.
 * Rewards always land in the user's wallet (not KeeperHub's). The setClaimer
 * permission is claim-only and revocable.
 */

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useSendTransaction } from "@privy-io/react-auth";
import { usePrivyWalletAddress } from "./usePrivyWalletAddress";

type SetClaimerTx = {
  to: `0x${string}`;
  data: `0x${string}`;
  value: "0x0";
  description: string;
};

const KEEPERHUB_CLAIMER_DEFAULT =
  "0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd";

const KEEPERHUB_CLAIMER =
  process.env.NEXT_PUBLIC_KEEPERHUB_CLAIMER_ADDRESS ??
  KEEPERHUB_CLAIMER_DEFAULT;

export default function AuthorizeAutoClaim() {
  const connected = usePrivyWalletAddress();
  const { sendTransaction } = useSendTransaction();

  const [setClaimerTx, setSetClaimerTx] = useState<SetClaimerTx | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "loading" | "ready" | "signing" | "done" | "error"
  >("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // Fetch the pre-built setClaimer tx for the connected user.
  useEffect(() => {
    if (!connected) return;
    setPhase("loading");
    fetch(
      `/api/agent/rewards?address=${encodeURIComponent(connected)}&claimer=${encodeURIComponent(KEEPERHUB_CLAIMER)}`,
    )
      .then((r) => r.json())
      .then((d: { setClaimerTx?: SetClaimerTx | null }) => {
        if (d.setClaimerTx) {
          setSetClaimerTx(d.setClaimerTx);
          setPhase("ready");
        } else {
          setPhase("error");
          setErrMsg("Could not build setClaimer tx");
        }
      })
      .catch((err) => {
        setPhase("error");
        setErrMsg(err instanceof Error ? err.message : String(err));
      });
  }, [connected]);

  if (!connected) return null;

  async function authorize() {
    if (!setClaimerTx) return;
    setErrMsg(null);
    setPhase("signing");
    try {
      const result = await sendTransaction({
        to: setClaimerTx.to,
        data: setClaimerTx.data,
        value: setClaimerTx.value,
        chainId: 8453, // Base mainnet
      });
      const hash =
        typeof result === "string"
          ? result
          : (result as { hash?: string }).hash ?? "";
      setTxHash(hash);
      setPhase("done");
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : String(err));
      setPhase("error");
    }
  }

  return (
    <div className="mt-5 -mx-4 border border-indigo-200 bg-indigo-50/60 px-4 py-5 sm:-mx-0 sm:rounded-2xl sm:p-5">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
        <ShieldCheck className="h-3 w-3" aria-hidden />
        Authorize auto-claim (one-time)
      </div>

      <p className="mt-2 text-[13px] leading-[1.5] text-indigo-900/80">
        Authorize KeeperHub's wallet to claim Aave V3 rewards on your behalf.
        Proceeds always land in <strong>your wallet</strong>, never KeeperHub's
        — the permission is claim-only and revocable.
      </p>

      <p className="mt-2 text-[11px] font-mono text-indigo-900/60">
        Claimer: <span className="select-all">{KEEPERHUB_CLAIMER}</span>
      </p>

      <div className="mt-4">
        {phase === "loading" && (
          <span className="inline-flex items-center gap-2 text-[12px] text-indigo-900/60">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Preparing authorization…
          </span>
        )}

        {(phase === "ready" || phase === "signing" || phase === "error") && (
          <button
            onClick={authorize}
            disabled={phase === "signing"}
            className="group inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-[12px] font-semibold text-white transition-all hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60"
          >
            {phase === "signing" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5" />
            )}
            {phase === "signing"
              ? "Sign in your wallet…"
              : "Authorize KeeperHub auto-claim"}
          </button>
        )}

        {phase === "done" && txHash && (
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] text-emerald-900">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Authorization sent</span>
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-mono text-[11px] underline-offset-2 hover:underline"
            >
              {txHash.slice(0, 10)}…
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {errMsg && (
          <div className="mt-2 inline-flex items-start gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] text-rose-800">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span className="font-mono">{errMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
