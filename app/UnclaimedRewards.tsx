"use client";

/**
 * Live unclaimed Aave V3 rewards panel + claim action.
 *
 * Two execution paths:
 *  - "Claim now" — user signs the manual claimAllRewards tx via Privy
 *  - "Authorize auto-claim" — one-time setClaimer, then KeeperHub's cron
 *    workflow auto-claims forever via claimAllRewardsOnBehalf
 *
 * Always renders even when zero rewards exist — the agent's pitch is "we
 * check for you, so you don't have to wonder." Showing "$0 right now"
 * is more honest than showing nothing.
 */

import { useEffect, useState } from "react";
import {
  Coins,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Zap,
} from "lucide-react";
import { useSendTransaction, usePrivy } from "@privy-io/react-auth";
import { usePrivyWalletAddress } from "./usePrivyWalletAddress";

type UnclaimedReward = {
  source: "aave" | "merkl";
  rewardToken: string;
  symbol: string;
  decimals: number;
  amountFormatted: string;
  valueUsd: number | null;
};

type TxPayload = {
  to: `0x${string}`;
  data: `0x${string}`;
  value: "0x0";
  description: string;
};

type RewardsResponse = {
  address: string;
  checkedAt: string;
  aaveAssetsChecked: number;
  unclaimed: UnclaimedReward[];
  totalCount: number;
  totalValueUsd: number;
  totalValueUsdFormatted: string;
  sources: {
    aave: { unclaimedCount: number };
    merkl: { unclaimedCount: number };
  };
  claimTx: TxPayload | null;
  setClaimerTx: TxPayload | null;
};

export default function UnclaimedRewards({ address }: { address: string }) {
  const connected = usePrivyWalletAddress();
  const { sendTransaction } = useSendTransaction();
  const { login, authenticated } = usePrivy();

  const [data, setData] = useState<RewardsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimPhase, setClaimPhase] = useState<"idle" | "signing" | "done" | "error">("idle");
  const [claimTxHash, setClaimTxHash] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/agent/rewards?address=${encodeURIComponent(address)}`)
      .then((r) => r.json())
      .then((d: RewardsResponse) => setData(d))
      .catch((err) => setErrMsg(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [address]);

  async function claimNow() {
    if (!data?.claimTx) return;
    setErrMsg(null);
    setClaimPhase("signing");
    try {
      const result = await sendTransaction({
        to: data.claimTx.to,
        data: data.claimTx.data,
        value: data.claimTx.value,
        chainId: 8453,
      });
      const hash =
        typeof result === "string"
          ? result
          : (result as { hash?: string }).hash ?? "";
      setClaimTxHash(hash);
      setClaimPhase("done");
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : String(err));
      setClaimPhase("error");
    }
  }

  // The panel ALWAYS renders (so visitors see "the agent checks rewards
  // for any wallet"). Claim button is only enabled when the connected
  // user matches the wallet being inspected.
  const isOwnWallet = Boolean(
    connected && address.toLowerCase() === connected.toLowerCase(),
  );

  if (loading) {
    return (
      <div className="mt-5 rounded-2xl border border-hairline bg-subtle p-5">
        <span className="inline-flex items-center gap-2 text-[12px] text-ink-faint">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Checking Aave V3 RewardsController for unclaimed amounts…
        </span>
      </div>
    );
  }
  if (!data) return null;

  const hasRewards = data.unclaimed.length > 0;

  return (
    <div className="mt-5 -mx-4 border border-amber-200 bg-amber-50/40 px-4 py-5 sm:-mx-0 sm:rounded-2xl sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
          <Coins className="h-3 w-3" aria-hidden />
          Unclaimed rewards · Aave + Merkl on Base
        </div>
        <span className="font-mono text-[11px] text-amber-900/60">
          aave: {data.sources.aave.unclaimedCount} · merkl: {data.sources.merkl.unclaimedCount}
        </span>
      </div>
      {hasRewards && data.totalValueUsd > 0 && (
        <div className="mt-2 text-[20px] font-semibold tracking-crunched text-amber-900">
          {data.totalValueUsdFormatted}
          <span className="ml-2 text-[11px] font-normal text-amber-900/60">
            total claimable
          </span>
        </div>
      )}

      {hasRewards ? (
        <>
          <div className="mt-3 space-y-1.5">
            {data.unclaimed.map((r, i) => (
              <div
                key={`${r.source}-${r.rewardToken}-${i}`}
                className="flex items-center justify-between rounded-md border border-amber-200/60 bg-white/40 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                      r.source === "aave"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {r.source}
                  </span>
                  <span className="font-mono text-[12px] text-amber-900">
                    {r.symbol}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[14px] font-semibold tabular-nums text-amber-900">
                    {Number(r.amountFormatted).toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}
                  </span>
                  {r.valueUsd !== null && r.valueUsd > 0 && (
                    <span className="font-mono text-[11px] text-amber-900/60">
                      ≈ ${r.valueUsd.toFixed(4)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {claimPhase === "done" && claimTxHash ? (
              <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] text-emerald-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Claim sent
                <a
                  href={`https://basescan.org/tx/${claimTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 font-mono text-[11px] underline-offset-2 hover:underline"
                >
                  {claimTxHash.slice(0, 10)}…
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ) : !authenticated ? (
              // Not connected at all → button opens Privy modal
              <button
                onClick={() => login()}
                className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-3 py-2 text-[12px] font-semibold text-white transition-all hover:bg-amber-700"
              >
                <Zap className="h-3.5 w-3.5" />
                Connect wallet to claim
              </button>
            ) : !isOwnWallet ? (
              // Connected as a DIFFERENT wallet → can't claim someone else's
              <button
                disabled
                title={`You're connected as a different wallet. Reconnect with the wallet that owns ${address.slice(0, 6)}…${address.slice(-4)} to claim its rewards.`}
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-md bg-amber-600 px-3 py-2 text-[12px] font-semibold text-white opacity-50"
              >
                <Zap className="h-3.5 w-3.5" />
                Switch to this wallet to claim
              </button>
            ) : (
              // Connected as the same wallet → enable the claim
              <button
                onClick={claimNow}
                disabled={claimPhase === "signing"}
                title="Submits a single batched claim tx to Merkl"
                className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-3 py-2 text-[12px] font-semibold text-white transition-all hover:bg-amber-700 disabled:cursor-wait disabled:opacity-60"
              >
                {claimPhase === "signing" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Zap className="h-3.5 w-3.5" />
                )}
                {claimPhase === "signing" ? "Sign in your wallet…" : "Claim now (you sign)"}
              </button>
            )}
            <span className="text-[11px] text-amber-900/60">
              {!authenticated
                ? "or any owner can authorize KeeperHub for unattended claims (see panel below)"
                : isOwnWallet
                  ? "or authorize KeeperHub below to auto-claim every 15 min"
                  : "this wallet's owner can authorize KeeperHub via the panel below"}
            </span>
          </div>

          {errMsg && (
            <div className="mt-2 inline-flex items-start gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] text-rose-800">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span className="font-mono">{errMsg}</span>
            </div>
          )}
        </>
      ) : (
        <p className="mt-2 text-[13px] leading-[1.5] text-amber-900/80">
          <strong>Nothing claimable in the current Merkl root.</strong> The
          agent checked Aave V3&apos;s RewardsController and Merkl&apos;s
          distributor on Base — no amounts in the on-chain merkle root for
          this wallet right now. Merkl typically publishes a new root every
          few hours; rewards earned in this epoch will appear here when the
          next root lands. KeeperHub&apos;s cron workflow (if authorized)
          will claim automatically once they do.
        </p>
      )}
    </div>
  );
}
