/**
 * Aave V3 transaction-calldata builder for Trove's rebalance flow.
 *
 * Lets the /api/agent/tick endpoint return a real `txPayload` (instead of
 * a template) when both source and target are Aave V3 markets on Base —
 * the most common Trove rebalance case (USDC supply moving between Aave
 * markets, e.g. when reward emissions shift).
 *
 * For cross-protocol rebalances (Aave→Compound, Morpho→Aave, etc.), each
 * pair needs its own adapter. This module covers the Aave V3 self-rebalance
 * case which is real today and demonstrable.
 */

import {
  type Address,
  type Hex,
  encodeFunctionData,
} from "viem";

/**
 * Aave V3 Pool address on Base mainnet.
 * Source: https://docs.aave.com/developers/deployed-contracts/v3-mainnet/base
 */
export const AAVE_V3_POOL_BASE: Address =
  "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5";

const POOL_ABI = [
  {
    type: "function",
    name: "supply",
    stateMutability: "nonpayable",
    inputs: [
      { name: "asset", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "onBehalfOf", type: "address" },
      { name: "referralCode", type: "uint16" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "withdraw",
    stateMutability: "nonpayable",
    inputs: [
      { name: "asset", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "to", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

/**
 * Special amount value: withdraw the user's entire balance for the asset.
 * Aave V3 interprets uint256.max as "withdraw all available."
 */
export const WITHDRAW_ALL = (1n << 256n) - 1n;

export type AaveTxPayload = {
  to: Address;
  data: Hex;
  value: "0x0";
  description: string;
};

/** Build calldata to withdraw an Aave V3 supply to the user's wallet. */
export function buildAaveWithdraw(params: {
  asset: Address;
  amount: bigint;
  to: Address;
}): AaveTxPayload {
  const { asset, amount, to } = params;
  return {
    to: AAVE_V3_POOL_BASE,
    data: encodeFunctionData({
      abi: POOL_ABI,
      functionName: "withdraw",
      args: [asset, amount, to],
    }),
    value: "0x0",
    description:
      amount === WITHDRAW_ALL
        ? `Withdraw all of ${asset.slice(0, 6)}…${asset.slice(-4)} from Aave V3 to ${to.slice(0, 6)}…${to.slice(-4)}`
        : `Withdraw ${amount} units of ${asset.slice(0, 6)}…${asset.slice(-4)} from Aave V3`,
  };
}

/** Build calldata to supply an asset into an Aave V3 market. */
export function buildAaveSupply(params: {
  asset: Address;
  amount: bigint;
  onBehalfOf: Address;
  referralCode?: number;
}): AaveTxPayload {
  const { asset, amount, onBehalfOf, referralCode = 0 } = params;
  return {
    to: AAVE_V3_POOL_BASE,
    data: encodeFunctionData({
      abi: POOL_ABI,
      functionName: "supply",
      args: [asset, amount, onBehalfOf, referralCode],
    }),
    value: "0x0",
    description: `Supply ${amount} units of ${asset.slice(0, 6)}…${asset.slice(-4)} to Aave V3 on behalf of ${onBehalfOf.slice(0, 6)}…${onBehalfOf.slice(-4)}`,
  };
}
