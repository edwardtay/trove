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
 * Aave V3 RewardsController on Base mainnet. Verified by querying any
 * Aave V3 Base aToken's `getIncentivesController()` function.
 *
 * Note: most active Aave Base reward campaigns flow through Merkl rather
 * than this controller. See `src/merkl-rewards.ts` for the Merkl path.
 */
export const AAVE_REWARDS_CONTROLLER: Address =
  "0xf9cc4F0D883F1a1eb2c253bdb46c254Ca51E1F44";

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
  {
    /**
     * Authorized-claimer flow: lets a pre-approved claimer (e.g. a
     * KeeperHub-managed Turnkey wallet) claim rewards on behalf of the
     * user. The user must first call `setClaimer(user, claimer)`.
     */
    type: "function",
    name: "claimAllRewardsOnBehalf",
    stateMutability: "nonpayable",
    inputs: [
      { name: "assets", type: "address[]" },
      { name: "user", type: "address" },
      { name: "to", type: "address" },
    ],
    outputs: [
      { name: "rewardsList", type: "address[]" },
      { name: "claimedAmounts", type: "uint256[]" },
    ],
  },
  {
    /** One-time user authorization for a delegated claimer. */
    type: "function",
    name: "setClaimer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "user", type: "address" },
      { name: "claimer", type: "address" },
    ],
    outputs: [],
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
  /**
   * Pre-built transactions for two execution modes:
   *  - `manual` — user signs themselves via their own wallet
   *  - `delegated` — a pre-authorized claimer (KeeperHub Turnkey wallet)
   *    signs and submits, requires a one-time `setClaimer` from the user
   */
  claimTx: {
    manual: TxPayload;
    delegated: TxPayload;
  } | null;
  /**
   * One-time tx the user signs to authorize a claimer. Only included when
   * a claimer address is requested in the API call.
   */
  setClaimerTx: TxPayload | null;
};

type TxPayload = {
  to: Address;
  data: Hex;
  value: "0x0";
  description: string;
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
  claimerToAuthorize?: Address,
): Promise<RewardsSummary> {
  const summary: RewardsSummary = {
    user,
    assetsChecked: aTokens,
    rewards: [],
    totalUsdEstimate: null,
    claimTx: null,
    setClaimerTx: null,
  };

  // If caller wants the setClaimer tx (one-time auth flow), build it.
  if (claimerToAuthorize) {
    summary.setClaimerTx = {
      to: AAVE_REWARDS_CONTROLLER,
      data: encodeFunctionData({
        abi: REWARDS_CONTROLLER_ABI,
        functionName: "setClaimer",
        args: [user, claimerToAuthorize],
      }),
      value: "0x0",
      description: `One-time authorization: allow ${claimerToAuthorize.slice(0, 6)}…${claimerToAuthorize.slice(-4)} (KeeperHub) to claim Aave rewards on behalf of ${user.slice(0, 6)}…${user.slice(-4)}`,
    };
  }

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

  // If anything is claimable, build BOTH execution paths:
  //  - manual: user calls claimAllRewards from their own wallet
  //  - delegated: KeeperHub's Turnkey wallet calls claimAllRewardsOnBehalf
  if (summary.rewards.length > 0) {
    const manualData = encodeFunctionData({
      abi: REWARDS_CONTROLLER_ABI,
      functionName: "claimAllRewards",
      args: [aTokens, user],
    });
    const delegatedData = encodeFunctionData({
      abi: REWARDS_CONTROLLER_ABI,
      functionName: "claimAllRewardsOnBehalf",
      args: [aTokens, user, user], // claim FOR user, send TO user
    });
    const desc = `Claim ${summary.rewards.length} unclaimed reward${summary.rewards.length === 1 ? "" : "s"} from Aave V3`;
    summary.claimTx = {
      manual: {
        to: AAVE_REWARDS_CONTROLLER,
        data: manualData,
        value: "0x0",
        description: `${desc} (user signs)`,
      },
      delegated: {
        to: AAVE_REWARDS_CONTROLLER,
        data: delegatedData,
        value: "0x0",
        description: `${desc} (KeeperHub claims on behalf of user)`,
      },
    };
  }

  return summary;
}
