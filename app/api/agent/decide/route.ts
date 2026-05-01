/**
 * Paywalled agent decision endpoint — the seller side of x402.
 *
 *   POST /api/agent/decide
 *   Body: { address: "0x..." }
 *
 * Behavior:
 *   - No X-PAYMENT header → 402 with structured x402v2 offer (0.01 USDC on Base)
 *   - X-PAYMENT header present → verify EIP-712 signature locally, return verdict
 *
 * This makes the agent's policy decision a *paid service* on the x402 web.
 * Other agents (on KeeperHub, ElizaOS, LangChain, etc.) can call this and
 * pay 0.01 USDC per decision. Settlement on a real Coinbase facilitator
 * happens out-of-band; for the hackathon demo we verify the signature
 * locally and grant access on a valid sig (the actual on-chain settlement
 * would be a follow-on tx).
 *
 * Why this matters: it makes stable-rotator monetizable per-call. Combined
 * with the iNFT (which records `clonedFrom` lineage), royalty splits to the
 * original strategy creator are a natural extension.
 */

import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { fetchPools, filterCandidates, rankByOrganicApy } from "../../../../src/llama";
import { DEFAULT_POLICY, shouldRebalance } from "../../../../src/policy";
import { isValidAddress, readAllPositions } from "../../../../src/onchain";

// USDC on Base mainnet
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
// Per-decision price: 0.01 USDC (6 decimals)
const PRICE_USDC_WEI = "10000";
// Recipient: set ROYALTY_ROUTER_BASE once the Base router is deployed.
// Until then, payTo is the agent runtime wallet and the split is only
// described in the offer metadata. The hackathon endpoint verifies the
// x402 signature locally; on-chain USDC settlement is a production follow-up.
const PAY_TO =
  process.env.ROYALTY_ROUTER_BASE ?? "0x15ECEE3445E3C8cf28D4D93fAB50181de728b86d";
// The iNFT this query is "billed to" (revenue is split to its lineage chain)
const BILLED_INFT_TOKEN_ID = Number(
  process.env.NEXT_PUBLIC_INFT_TOKEN_ID ?? 0,
);

function getResource(req: Request) {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;
  const forwardedHost =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const forwardedProto = req.headers.get("x-forwarded-proto") ?? "https";
  const requestOrigin = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : new URL(req.url).origin;
  const origin = configured
    ? configured.startsWith("http")
      ? configured
      : `https://${configured}`
    : requestOrigin;

  return {
    url: `${origin}/api/agent/decide`,
    description:
      "Stable-rotator agent decision: verdict and reasoning for any USDC wallet on Base",
    mimeType: "application/json",
  };
}

const ACCEPT_OFFER = {
  scheme: "exact",
  network: "eip155:8453",
  asset: USDC_BASE,
  amount: PRICE_USDC_WEI,
  payTo: PAY_TO,
  maxTimeoutSeconds: 300,
  extra: {
    name: "USD Coin",
    version: "2",
  },
};

/** Verify the EIP-3009 signed authorization matches the caller and offer.
 *  Returns the recovered signer if valid, null otherwise. */
function verifyX402Header(headerB64: string): { from: string } | null {
  try {
    const decoded = JSON.parse(
      Buffer.from(headerB64, "base64").toString("utf8"),
    ) as {
      x402Version?: number;
      payload?: {
        signature?: string;
        authorization?: {
          from?: string;
          to?: string;
          value?: string;
          validAfter?: string;
          validBefore?: string;
          nonce?: string;
        };
      };
    };
    const auth = decoded.payload?.authorization;
    const sig = decoded.payload?.signature;
    if (!auth || !sig) return null;
    if (
      !auth.from ||
      !auth.to ||
      !auth.value ||
      auth.to.toLowerCase() !== PAY_TO.toLowerCase() ||
      auth.value !== PRICE_USDC_WEI
    ) {
      return null;
    }

    const domain = {
      name: "USD Coin",
      version: "2",
      chainId: 8453,
      verifyingContract: USDC_BASE,
    };
    const types = {
      TransferWithAuthorization: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "validAfter", type: "uint256" },
        { name: "validBefore", type: "uint256" },
        { name: "nonce", type: "bytes32" },
      ],
    };
    const message = {
      from: auth.from,
      to: auth.to,
      value: auth.value,
      validAfter: auth.validAfter ?? "0",
      validBefore: auth.validBefore ?? "0",
      nonce: auth.nonce ?? "",
    };
    const recovered = ethers.verifyTypedData(domain, types, message, sig);
    if (recovered.toLowerCase() !== auth.from.toLowerCase()) return null;

    // Time-validity check
    const now = Math.floor(Date.now() / 1000);
    const after = Number(message.validAfter);
    const before = Number(message.validBefore);
    if (now < after || now > before) return null;

    return { from: recovered };
  } catch {
    return null;
  }
}

function paymentRequired(req: Request) {
  const resource = getResource(req);
  return NextResponse.json(
    {
      x402Version: 2,
      error: "Payment required",
      resource,
      accepts: [ACCEPT_OFFER],
      extensions: {
        bazaar: {
          discoverable: true,
          schema: {
            input: {
              body: {
                type: "object",
                required: ["address"],
                properties: {
                  address: { type: "string", description: "USDC wallet on Base" },
                },
              },
            },
          },
        },
        royalty: {
          billedINftTokenId: BILLED_INFT_TOKEN_ID,
          split: { ownerBps: 8000, lineageBps: 1500, treasuryBps: 500 },
          note:
            "RoyaltyRouter implements this lineage split once deployed and wired to settlement. This demo verifies the x402 signature locally; on-chain USDC routing is the production follow-up.",
        },
      },
    },
    {
      status: 402,
      headers: {
        "x-payment-requirements": Buffer.from(
          JSON.stringify({ accepts: [ACCEPT_OFFER], resource }),
        ).toString("base64"),
      },
    },
  );
}

export async function POST(req: Request) {
  const headerB64 = req.headers.get("x-payment");

  if (!headerB64) {
    return paymentRequired(req);
  }

  const verified = verifyX402Header(headerB64);
  if (!verified) {
    return NextResponse.json(
      {
        x402Version: 2,
        error: "Invalid or expired payment authorization",
        accepts: [ACCEPT_OFFER],
      },
      { status: 402 },
    );
  }

  // Parse body
  let body: { address?: string };
  try {
    body = (await req.json()) as { address?: string };
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const address = body.address;
  if (!address || !isValidAddress(address)) {
    return NextResponse.json(
      { error: "missing or invalid address" },
      { status: 400 },
    );
  }

  // Run the policy — same logic as /api/agent/tick, but gated by payment
  const cycleAt = new Date().toISOString();
  const [pools, positions] = await Promise.all([
    fetchPools(),
    readAllPositions(address),
  ]);
  const candidates = rankByOrganicApy(filterCandidates(pools, DEFAULT_POLICY));
  const best = candidates[0];

  const tracked = positions
    .filter((p) => p.source === "tracked" && p.balanceUsd > 0)
    .sort((a, b) => b.balanceUsd - a.balanceUsd);
  const current = tracked[0];

  if (!best) {
    return NextResponse.json({
      address,
      cycleAt,
      verdict: "hold",
      reason: "no candidates clear the filter",
      paidBy: verified.from,
    });
  }

  if (!current) {
    return NextResponse.json({
      address,
      cycleAt,
      verdict: "hold",
      reason: `no position; would supply to ${best.project} at ${(best.apyBase ?? 0).toFixed(2)}% organic`,
      candidate: { project: best.project, apyBase: best.apyBase, apyReward: best.apyReward },
      paidBy: verified.from,
    });
  }

  const currentPool = candidates.find((c) => c.project === current.project);
  const currentApy = currentPool?.apyBase ?? best.apyBase ?? 0;
  const decision = shouldRebalance(
    {
      project: current.project,
      pool: currentPool?.pool ?? "",
      principalUsd: current.balanceUsd,
      currentApy,
      enteredAt: cycleAt,
    },
    best,
    DEFAULT_POLICY,
    24,
  );

  return NextResponse.json({
    address,
    cycleAt,
    verdict: decision.move ? "move" : "hold",
    reason: decision.reason,
    current: {
      project: current.project,
      balanceUsd: current.balanceUsd,
      apyBase: currentApy,
    },
    best: {
      project: best.project,
      apyBase: best.apyBase,
      apyReward: best.apyReward,
    },
    paidBy: verified.from,
  });
}
