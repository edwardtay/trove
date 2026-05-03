/**
 * Merkl unclaimed-rewards reader and claim-tx builder.
 *
 * On Base (and most L2s), DeFi protocol incentive distributions — including
 * Aave V3's reward campaigns — flow through Merkl rather than each
 * protocol's native distributor. So a real "claim my rewards" flow has to
 * query Merkl, not just Aave's RewardsController.
 *
 * Merkl uses Merkle-tree distributions. Each reward entry includes:
 *  - root: which Merkle root the reward is rolled up under
 *  - token: the reward token address
 *  - amount: total ever earned (cumulative)
 *  - claimed: amount already claimed
 *  - pending: amount - claimed (claimable now)
 *  - proofs: Merkle proof needed by the Distributor contract
 *
 * The claim() tx accepts arrays — claim everything pending in one call.
 */

import {
  type Address,
  type Hex,
  encodeFunctionData,
  formatUnits,
} from "viem";

/**
 * Merkl Angle Distributor on Base mainnet.
 * Source: https://docs.merkl.xyz/merkl-mechanisms/contract-addresses
 */
export const MERKL_DISTRIBUTOR: Address =
  "0x3Ef3D8bA38EBe18DB133cEc108f4D14CE00Dd9Ae";

const DISTRIBUTOR_ABI = [
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [
      { name: "users", type: "address[]" },
      { name: "tokens", type: "address[]" },
      { name: "amounts", type: "uint256[]" },
      { name: "proofs", type: "bytes32[][]" },
    ],
    outputs: [],
  },
] as const;

export type MerklReward = {
  rewardToken: Address;
  symbol: string;
  decimals: number;
  amountTotal: string;
  amountClaimed: string;
  amountPending: string;
  amountPendingFormatted: string;
  /** USD price per token from CoinGecko (null if unknown). */
  priceUsd: number | null;
  /** USD value of the pending amount (null if price unknown). */
  valueUsd: number | null;
  proofs: Hex[];
  /** Total cumulative amount the proof commits to (what `claim` needs). */
  proofAmount: string;
};

export type MerklSummary = {
  user: Address;
  pending: MerklReward[];
  /** Sum of USD values across all pending rewards (priced ones only). */
  totalValueUsd: number;
  /** Claim tx — call Merkl distributor with all pending rewards in one tx. */
  claimTx: {
    to: Address;
    data: Hex;
    value: "0x0";
    description: string;
  } | null;
};

type MerklApiResponse = Array<{
  chain: { id: number };
  rewards: Array<{
    root: string;
    distributionChainId: number;
    recipient: string;
    amount: string;
    claimed: string;
    pending: string;
    proofs: string[];
    token?: {
      address: string;
      symbol?: string;
      decimals?: number;
    };
  }>;
}>;

/**
 * Best-effort USD price lookup. Tries CoinGecko first (broader token coverage
 * than DefiLlama for small/new tokens), falls back to DefiLlama. Returns
 * a map of lowercased-address → USD price.
 */
async function fetchPrices(
  addrs: Address[],
): Promise<Record<string, number>> {
  if (addrs.length === 0) return {};
  const list = addrs.map((a) => a.toLowerCase()).join(",");

  // CoinGecko free tier — broader coverage for small Base tokens.
  try {
    const cg = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/base?contract_addresses=${list}&vs_currencies=usd`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) },
    );
    if (cg.ok) {
      const data = (await cg.json()) as Record<string, { usd?: number }>;
      const out: Record<string, number> = {};
      for (const [addr, v] of Object.entries(data)) {
        if (typeof v.usd === "number") out[addr.toLowerCase()] = v.usd;
      }
      // If CoinGecko returned anything, use it (don't merge with DefiLlama —
      // mixing oracles can produce inconsistent totals).
      if (Object.keys(out).length > 0) return out;
    }
  } catch {
    /* fall through to DefiLlama */
  }

  // DefiLlama fallback (faster, narrower coverage)
  try {
    const ll = await fetch(
      `https://coins.llama.fi/prices/current/${addrs.map((a) => `base:${a.toLowerCase()}`).join(",")}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) },
    );
    if (ll.ok) {
      const data = (await ll.json()) as { coins?: Record<string, { price?: number }> };
      const out: Record<string, number> = {};
      for (const [key, v] of Object.entries(data.coins ?? {})) {
        const addr = key.replace(/^base:/, "").toLowerCase();
        if (typeof v.price === "number") out[addr] = v.price;
      }
      return out;
    }
  } catch {
    /* return empty */
  }
  return {};
}

/**
 * Fetch unclaimed Merkl rewards for a user on Base mainnet.
 * Builds a single claim tx that batches all pending rewards.
 * Includes USD pricing from CoinGecko (DefiLlama fallback).
 */
export async function getMerklRewards(
  user: Address,
): Promise<MerklSummary> {
  const summary: MerklSummary = {
    user,
    pending: [],
    totalValueUsd: 0,
    claimTx: null,
  };

  let data: MerklApiResponse;
  try {
    const res = await fetch(
      `https://api.merkl.xyz/v4/users/${user}/rewards?chainId=8453`,
      {
        next: { revalidate: 60 },
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      console.warn(`[merkl] HTTP ${res.status}`);
      return summary;
    }
    data = (await res.json()) as MerklApiResponse;
  } catch (err) {
    console.warn(`[merkl] fetch failed: ${err}`);
    return summary;
  }

  // Flatten across chain entries (Base only here, but defensively iterate)
  const tempRewards: Omit<MerklReward, "priceUsd" | "valueUsd">[] = [];
  for (const chainEntry of data) {
    for (const r of chainEntry.rewards ?? []) {
      const pendingBig = BigInt(r.pending ?? "0");
      if (pendingBig <= 0n) continue;

      const decimals = r.token?.decimals ?? 18;
      const symbol =
        r.token?.symbol ??
        (r.token?.address ? r.token.address.slice(0, 6) : "?");
      const tokenAddr = (r.token?.address ?? "0x0") as Address;

      tempRewards.push({
        rewardToken: tokenAddr,
        symbol,
        decimals,
        amountTotal: r.amount,
        amountClaimed: r.claimed,
        amountPending: pendingBig.toString(),
        amountPendingFormatted: formatUnits(pendingBig, decimals),
        proofs: r.proofs as Hex[],
        proofAmount: r.amount,
      });
    }
  }

  // Price all reward tokens in one parallel call.
  const prices = await fetchPrices(tempRewards.map((r) => r.rewardToken));
  for (const r of tempRewards) {
    const priceUsd = prices[r.rewardToken.toLowerCase()] ?? null;
    const human = Number(r.amountPendingFormatted);
    const valueUsd = priceUsd !== null ? human * priceUsd : null;
    summary.pending.push({ ...r, priceUsd, valueUsd });
    if (valueUsd !== null) summary.totalValueUsd += valueUsd;
  }

  // Build a single batched claim tx if anything is claimable.
  if (summary.pending.length > 0) {
    const users = summary.pending.map(() => user);
    const tokens = summary.pending.map((p) => p.rewardToken);
    const amounts = summary.pending.map((p) => BigInt(p.proofAmount));
    const proofs = summary.pending.map((p) => p.proofs);

    summary.claimTx = {
      to: MERKL_DISTRIBUTOR,
      data: encodeFunctionData({
        abi: DISTRIBUTOR_ABI,
        functionName: "claim",
        args: [users, tokens, amounts, proofs],
      }),
      value: "0x0",
      description: `Claim ${summary.pending.length} Merkl reward${summary.pending.length === 1 ? "" : "s"} (${summary.pending.map((p) => p.symbol).join(", ")})`,
    };
  }

  return summary;
}
