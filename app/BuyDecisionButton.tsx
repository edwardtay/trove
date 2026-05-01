"use client";

/**
 * Buy a personalized agent decision via x402 micropayment.
 *
 * Flow:
 *   1. User clicks button while connected to Privy embedded wallet
 *   2. POST /api/agent/decide → 402 with structured offer (0.01 USDC on Base)
 *   3. Build EIP-3009 transferWithAuthorization typed data
 *   4. Privy `signTypedData` opens approval modal; user approves
 *   5. Construct X-PAYMENT base64 header from offer + signature
 *   6. POST /api/agent/decide with X-PAYMENT → 200 with personalized verdict
 *
 * Settlement nuance: our endpoint verifies the EIP-712 signature recovery
 * but doesn't yet submit the on-chain transferWithAuthorization (that's
 * the facilitator's job in production). So the user signs but the actual
 * USDC isn't transferred — fine for demo, real settlement is one tx away.
 */

import { useState } from "react";
import { Coins, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useSignTypedData } from "@privy-io/react-auth";
import { usePrivyWalletAddress } from "./usePrivyWalletAddress";
import { protocolName } from "../src/protocols";

type Offer = {
  scheme: string;
  network: string;
  asset: string;
  amount: string;
  payTo: string;
  maxTimeoutSeconds: number;
  extra?: { name?: string; version?: string };
};

type DecisionResponse = {
  verdict: "hold" | "move" | "harvest";
  reason: string;
  candidate?: {
    project: string;
    apyBase: number;
    apyReward: number;
  };
  current?: {
    project: string;
    balanceUsd: number;
    apyBase: number;
  };
  best?: {
    project: string;
    apyBase: number;
    apyReward: number;
  };
  paidBy: string;
};

function randomNonce(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return (
    "0x" +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

export default function BuyDecisionButton({ endpoint = "/api/agent/decide" }: { endpoint?: string } = {}) {
  const connected = usePrivyWalletAddress();
  const { signTypedData } = useSignTypedData();
  const [phase, setPhase] = useState<
    "idle" | "fetching-offer" | "signing" | "settling" | "done" | "error"
  >("idle");
  const [result, setResult] = useState<DecisionResponse | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  if (!connected) return null;

  async function buy() {
    setErrMsg(null);
    setResult(null);

    try {
      // Step 1: get the 402 offer
      setPhase("fetching-offer");
      const probe = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: connected }),
      });
      if (probe.status !== 402) {
        throw new Error(`expected 402, got ${probe.status}`);
      }
      const probeJson = (await probe.json()) as {
        accepts: Offer[];
        resource: unknown;
      };
      const offer = probeJson.accepts[0];
      if (!offer) throw new Error("no payment offer in 402 response");

      // Step 2: sign EIP-3009 transferWithAuthorization
      setPhase("signing");
      const now = Math.floor(Date.now() / 1000);
      const auth = {
        from: connected,
        to: offer.payTo,
        value: offer.amount,
        validAfter: 0,
        validBefore: now + Math.min(offer.maxTimeoutSeconds, 600),
        nonce: randomNonce(),
      };
      // Parse CAIP-2 → chainId
      const chainId = Number(offer.network.match(/^eip155:(\d+)$/)?.[1] ?? 8453);
      const sig = await signTypedData({
        domain: {
          name: offer.extra?.name ?? "USD Coin",
          version: offer.extra?.version ?? "2",
          chainId,
          verifyingContract: offer.asset as `0x${string}`,
        },
        types: {
          TransferWithAuthorization: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "validAfter", type: "uint256" },
            { name: "validBefore", type: "uint256" },
            { name: "nonce", type: "bytes32" },
          ],
        },
        primaryType: "TransferWithAuthorization",
        message: auth,
      });
      const signature =
        typeof sig === "string"
          ? sig
          : (sig as { signature?: string }).signature ?? "";

      // Step 3: construct X-PAYMENT and retry
      setPhase("settling");
      const headerPayload = {
        x402Version: 2,
        resource: probeJson.resource ?? {},
        accepted: offer,
        payload: {
          signature,
          authorization: {
            from: auth.from,
            to: auth.to,
            value: auth.value,
            validAfter: String(auth.validAfter),
            validBefore: String(auth.validBefore),
            nonce: auth.nonce,
          },
        },
      };
      const headerB64 = btoa(JSON.stringify(headerPayload));
      const paid = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PAYMENT": headerB64,
        },
        body: JSON.stringify({ address: connected }),
      });
      if (!paid.ok) {
        const e = await paid.text();
        throw new Error(`settle failed (${paid.status}): ${e.slice(0, 120)}`);
      }
      const json = (await paid.json()) as DecisionResponse;
      setResult(json);
      setPhase("done");
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : String(err));
      setPhase("error");
    }
  }

  const busy = phase !== "idle" && phase !== "done" && phase !== "error";

  return (
    <div className="mt-3">
      <button
        onClick={buy}
        disabled={busy}
        className="group inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-[12px] font-semibold text-white transition-all hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Coins className="h-3.5 w-3.5" />
        )}
        {phase === "fetching-offer" && "Fetching offer…"}
        {phase === "signing" && "Sign in your wallet…"}
        {phase === "settling" && "Settling x402 payment…"}
        {phase === "done" && "Done — buy another"}
        {(phase === "idle" || phase === "error") &&
          "Buy my personal verdict · 0.01 USDC"}
      </button>

      {errMsg && (
        <div className="mt-2 inline-flex items-start gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] text-rose-800">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span className="font-mono">{errMsg}</span>
        </div>
      )}

      {result && (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
            <CheckCircle2 className="h-3 w-3" />
            x402-paid · agent verdict
          </div>
          <div className="mt-2 text-[24px] font-semibold tracking-crunched text-emerald-900">
            {result.verdict.toUpperCase()}
          </div>
          <p className="mt-1 text-[13px] leading-[1.5] text-emerald-900/80">
            {result.reason}
          </p>
          {result.candidate && (
            <p className="mt-2 text-[12px] text-emerald-900/70">
              Best:{" "}
              <span className="font-semibold">
                {protocolName(result.candidate.project)}
              </span>{" "}
              ·{" "}
              <span className="font-mono">
                {result.candidate.apyBase.toFixed(2)}%
              </span>
              {result.candidate.apyReward > 0 && (
                <>
                  {" + "}
                  <span className="font-mono">
                    {result.candidate.apyReward.toFixed(2)}%
                  </span>{" "}
                  rewards
                </>
              )}
            </p>
          )}
          <p className="mt-2 border-t border-emerald-200 pt-2 font-mono text-[10px] text-emerald-900/60">
            paidBy {result.paidBy.slice(0, 8)}…{result.paidBy.slice(-6)}
          </p>
        </div>
      )}
    </div>
  );
}
