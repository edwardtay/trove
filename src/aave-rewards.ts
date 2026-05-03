/**
 * Aave V3 unclaimed-rewards reader and claim-tx builder.
 *
 * Trove's headline pitch is "auto-claims rewards you'd forget" — this module
 * makes that real for Aave V3 positions on Base. The agent enumerates the
 * user's aTokens, queries Aave's RewardsController for any unclaimed
 * incentive emissions, and returns both the claimable amounts and a ready-
 * to-sign transaction the user (or KeeperHub) can submit.
 *
 * Read-only on the server side. Tx submission is left to the wallet/keeper.
 */

import {
  type Address,
  type Hex,
  encodeFunctionData,
  formatUnits,
} from "viem";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const BASE_RPC =
  process.env.NEXT_PUBLIC_BASE_RPC ?? "https://mainnet.base.org";

const client = createPublicClient({
  chain: base,
  transport: http(BASE_RPC, { timeout: 8_000, retryCount: 1 }),
});

/**
 * Aave V3 RewardsController on Base mainnet.
 * Source: https://docs.aave.com/developers/deployed-contracts/v3-mainnet/base
 */
export const AAVE_REWARDS_CONTROLLER: Address =
  "0x21202b9DDc8a04D4A02C2EeA3CB78e8c00bd56Fc";

const REWARDS_CONTROLLER_ABI = [
  {
    type: "function",
    name: "getAllUserRewards",
    stateMutability: "view",
    inputs: [
      { name: "assets", type: "address[]" },
      { name: "user", type: "address" },
    ],
    outputs: [
      { name: "rewardsList", type: "address[]" },
      { name: "unclaimedAmounts", type: "uint256[]" },
    ],
  },
  {
    type: "function",
    name: "claimAllRewards",
    stateMutability: "nonpayable",
    inputs: [
      { name: "assets", type: "address[]" },
      { name: "to", type: "address" },
    ],
    outputs: [
      { name: "rewardsList", type: "address[]" },
      { name: "claimedAmounts", type: "uint256[]" },
    ],
  },
] as const;

const ERC20_METADATA_ABI = [
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

export type UnclaimedReward = {
  rewardToken: Address;
  symbol: string;
  decimals: number;
  amountRaw: string;
  amountFormatted: string;
};

export type RewardsSummary = {
  user: Address;
  /** aTokens (and variable-debt tokens) we queried against. */
  assetsChecked: Address[];
  /** Per-reward unclaimed amounts. Empty if no incentives are accruing. */
  rewards: UnclaimedReward[];
  /** Total dollar value where price is known (best-effort, may be 0). */
  totalUsdEstimate: number | null;
  /** Pre-built transaction the wallet can sign as-is to claim everything. */
  claimTx: {
    to: Address;
    data: Hex;
    value: "0x0";
    description: string;
  } | null;
};

/**
 * Query Aave's RewardsController for any unclaimed incentive emissions
 * across the given aToken positions.
 *
 * Returns a structured summary. If `assetsChecked` is empty (user has no
 * Aave positions), `rewards` will be empty and `claimTx` will be null.
 */
export async function getUnclaimedAaveRewards(
  user: Address,
  aTokens: Address[],
): Promise<RewardsSummary> {
  const summary: RewardsSummary = {
    user,
    assetsChecked: aTokens,
    rewards: [],
    totalUsdEstimate: null,
    claimTx: null,
  };

  if (aTokens.length === 0) return summary;

  let rewardsList: readonly Address[] = [];
  let amounts: readonly bigint[] = [];

  try {
    const result = (await client.readContract({
      address: AAVE_REWARDS_CONTROLLER,
      abi: REWARDS_CONTROLLER_ABI,
      functionName: "getAllUserRewards",
      args: [aTokens, user],
    })) as readonly [readonly Address[], readonly bigint[]];
    rewardsList = result[0];
    amounts = result[1];
  } catch (err) {
    console.warn(`[aave-rewards] getAllUserRewards failed: ${err}`);
    return summary;
  }

  // Resolve each reward token's symbol + decimals (best-effort, skip on error).
  for (let i = 0; i < rewardsList.length; i++) {
    const token = rewardsList[i]!;
    const amount = amounts[i] ?? 0n;
    if (amount <= 0n) continue;

    let symbol = token.slice(0, 8);
    let decimals = 18;
    try {
      [symbol, decimals] = await Promise.all([
        client.readContract({
          address: token,
          abi: ERC20_METADATA_ABI,
          functionName: "symbol",
        }) as Promise<string>,
        client.readContract({
          address: token,
          abi: ERC20_METADATA_ABI,
          functionName: "decimals",
        }) as Promise<number>,
      ]);
    } catch {
      // Use fallback values
    }

    summary.rewards.push({
      rewardToken: token,
      symbol,
      decimals,
      amountRaw: amount.toString(),
      amountFormatted: formatUnits(amount, decimals),
    });
  }

  // If anything is claimable, build the claim tx. We claim to the user (the
  // recipient address); keepers calling this would substitute the executor.
  if (summary.rewards.length > 0) {
    const data = encodeFunctionData({
      abi: REWARDS_CONTROLLER_ABI,
      functionName: "claimAllRewards",
      args: [aTokens, user],
    });
    summary.claimTx = {
      to: AAVE_REWARDS_CONTROLLER,
      data,
      value: "0x0",
      description: `Claim ${summary.rewards.length} unclaimed reward${summary.rewards.length === 1 ? "" : "s"} from Aave V3 to ${user.slice(0, 6)}…${user.slice(-4)}`,
    };
  }

  return summary;
}
