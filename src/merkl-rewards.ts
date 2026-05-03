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
  proofs: Hex[];
  /** Total cumulative amount the proof commits to (what `claim` needs). */
  proofAmount: string;
};

export type MerklSummary = {
  user: Address;
  pending: MerklReward[];
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
 * Fetch unclaimed Merkl rewards for a user on Base mainnet.
 * Builds a single claim tx that batches all pending rewards.
 */
export async function getMerklRewards(
  user: Address,
): Promise<MerklSummary> {
  const summary: MerklSummary = {
    user,
    pending: [],
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
  for (const chainEntry of data) {
    for (const r of chainEntry.rewards ?? []) {
      const pendingBig = BigInt(r.pending ?? "0");
      if (pendingBig <= 0n) continue;

      const decimals = r.token?.decimals ?? 18;
      const symbol =
        r.token?.symbol ??
        (r.token?.address ? r.token.address.slice(0, 6) : "?");
      const tokenAddr = (r.token?.address ?? "0x0") as Address;

      summary.pending.push({
        rewardToken: tokenAddr,
        symbol,
        decimals,
        amountTotal: r.amount,
        amountClaimed: r.claimed,
        amountPending: pendingBig.toString(),
        amountPendingFormatted: formatUnits(pendingBig, decimals),
        proofs: r.proofs as Hex[],
        // Merkl's claim() takes the cumulative `amount`, not the pending diff
        // — the contract stores claimed amounts and computes the delta.
        proofAmount: r.amount,
      });
    }
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
