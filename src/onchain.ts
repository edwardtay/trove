/**
 * Read-only on-chain position queries against Base mainnet.
 * Uses a public Base RPC + viem multicall — no wallet, no signing.
 *
 * Currently queries Compound V3 cUSDCv3 (highest-confidence contract address
 * for our purposes). Aave V3 aBasUSDC and others can be added as we verify
 * each address against basescan.
 */

import {
  createPublicClient,
  http,
  formatUnits,
  isAddress,
  type Address,
} from "viem";
import { base, mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export const BASE_RPC =
  process.env.NEXT_PUBLIC_BASE_RPC ?? "https://mainnet.base.org";

const publicClient = createPublicClient({
  chain: base,
  transport: http(BASE_RPC),
});

const l1Client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Verified addresses on Base mainnet (chainId 8453).
// Each entry includes the project's display name + DeFiLlama pool ID for
// cross-reference back to live yield data.
export const POSITIONS = [
  {
    project: "compound-v3",
    label: "Compound V3 USDC",
    receiptAddress: "0xb125E6687d4313864e53df431d5425969c15Eb2F" as Address,
    decimals: 6,
    receiptKind: "comet", // Comet exposes balanceOf() in USDC units directly
    poolId: "0c8567f8-ba5b-41ad-80de-00a71895eb19",
  },
  {
    project: "aave-v3",
    label: "Aave V3 USDC",
    receiptAddress: "0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB" as Address,
    decimals: 6,
    receiptKind: "aToken", // aTokens 1:1 with underlying after rebasing
    poolId: "7e0661bf-8cf3-45e6-9424-31916d4c7b84",
  },
] as const;

const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export type PositionResult = {
  project: string;
  label: string;
  receiptAddress: Address;
  balanceUsd: number;
  raw: string;
  source: "tracked" | "detected";
};

export function isValidAddress(input: string): input is Address {
  return isAddress(input);
}

export async function resolveEns(input: string): Promise<Address | null> {
  const trimmed = input.trim();
  if (isAddress(trimmed)) return trimmed;
  if (trimmed.endsWith(".eth")) {
    try {
      const address = await l1Client.getEnsAddress({ name: normalize(trimmed) });
      return address as Address | null;
    } catch {
      return null;
    }
  }
  return null;
}

export async function readPositions(
  address: Address,
): Promise<PositionResult[]> {
  const calls = POSITIONS.map((p) => ({
    address: p.receiptAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf" as const,
    args: [address],
  }));

  const results = await publicClient.multicall({ contracts: calls });

  return POSITIONS.map((p, i) => {
    const r = results[i];
    const balanceRaw =
      r && r.status === "success" ? (r.result as bigint) : 0n;
    const balanceUsd = Number(formatUnits(balanceRaw, p.decimals));
    return {
      project: p.project,
      label: p.label,
      receiptAddress: p.receiptAddress,
      balanceUsd,
      raw: balanceRaw.toString(),
      source: "tracked" as const,
    };
  });
}

/**
 * Auto-discover USDC-related holdings via Blockscout's public REST API.
 * Catches receipt tokens for protocols we haven't hardcoded yet (Morpho
 * vaults, Fluid fTokens, Moonwell mTokens, Euler vaults, etc.).
 *
 * Filter: any ERC-20 whose symbol or name contains "usdc" (case-insensitive).
 * The plain USDC token is excluded (idle wallet balance, not a yield position).
 */
type BlockscoutToken = {
  token: {
    address: string;
    name: string;
    symbol: string;
    decimals: string;
  };
  value: string;
};

const PLAIN_USDC = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913".toLowerCase();
const PLAIN_USDBC = "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca".toLowerCase();

function inferProjectFromName(name: string, symbol: string): string {
  const probe = `${name} ${symbol}`.toLowerCase();
  if (probe.includes("aave")) return "aave-v3";
  if (probe.includes("compound") || /^cusdc/i.test(symbol)) return "compound-v3";
  if (probe.includes("moonwell") || /^musdc/i.test(symbol)) return "moonwell";
  if (probe.includes("fluid") || /^fusdc/i.test(symbol)) return "fluid-lending";
  if (probe.includes("morpho") || probe.includes("steak") || probe.includes("gauntlet")) return "morpho-blue";
  if (probe.includes("spark") || /^susdc/i.test(symbol)) return "spark";
  if (probe.includes("euler") || /^eusdc/i.test(symbol)) return "euler-v2";
  return "other";
}

export async function detectPositions(
  address: Address,
): Promise<PositionResult[]> {
  try {
    const url = `https://base.blockscout.com/api/v2/addresses/${address}/tokens?type=ERC-20`;
    const res = await fetch(url, {
      next: { revalidate: 30 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { items?: BlockscoutToken[] };
    const items = json.items ?? [];

    const candidates: PositionResult[] = [];
    for (const item of items) {
      const tokenAddr = item.token.address.toLowerCase();
      if (tokenAddr === PLAIN_USDC || tokenAddr === PLAIN_USDBC) continue;
      const probe = `${item.token.name ?? ""} ${item.token.symbol ?? ""}`.toLowerCase();
      const looksUsdc = /usdc|usdb|usds|usd\.e/i.test(probe);
      if (!looksUsdc) continue;
      const decimals = Number(item.token.decimals) || 6;
      const balanceUsd = Number(formatUnits(BigInt(item.value), decimals));
      if (balanceUsd < 0.01) continue; // sub-cent dust
      candidates.push({
        project: inferProjectFromName(item.token.name, item.token.symbol),
        label: `${item.token.name} (${item.token.symbol})`,
        receiptAddress: item.token.address as Address,
        balanceUsd,
        raw: item.value,
        source: "detected",
      });
    }
    return candidates.sort((a, b) => b.balanceUsd - a.balanceUsd);
  } catch {
    return [];
  }
}

export async function readAllPositions(
  address: Address,
): Promise<PositionResult[]> {
  const [tracked, detected] = await Promise.all([
    readPositions(address),
    detectPositions(address),
  ]);
  // Dedup: don't double-count receipt addresses we already track.
  const trackedAddrs = new Set(
    tracked.map((p) => p.receiptAddress.toLowerCase()),
  );
  const trackedNonZero = tracked.filter((p) => p.balanceUsd > 0);
  const onlyDetected = detected.filter(
    (p) => !trackedAddrs.has(p.receiptAddress.toLowerCase()),
  );
  return [...trackedNonZero, ...onlyDetected];
}
