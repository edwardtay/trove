/**
 * GET /api/agent/rewards?address=0x…
 *
 * Returns ALL claimable yield-bearing rewards for a wallet on Base —
 * spanning Aave V3's native incentives controller AND Merkl distributions
 * (which is how most Aave Base + Morpho + Spectra + others actually
 * distribute today).
 *
 * Drives Trove's "auto-claims rewards you'd forget" promise. KeeperHub's
 * scheduled workflow can call this and execute either the Aave-delegated
 * claim (requires user setClaimer) OR the Merkl claim (no auth needed —
 * Merkl proofs hardcode the recipient).
 */

import { NextResponse } from "next/server";
import { isValidAddress, readAllPositions } from "../../../../src/onchain";
import { getUnclaimedAaveRewards } from "../../../../src/aave-rewards";
import { getMerklRewards } from "../../../../src/merkl-rewards";
import type { Address } from "viem";

export const revalidate = 30;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");
  if (!address || !isValidAddress(address)) {
    return NextResponse.json(
      { error: "missing or invalid address" },
      { status: 400 },
    );
  }

  // Aave: query for native incentives across detected aTokens.
  // (Most Aave Base rewards now flow via Merkl, but check both for completeness.)
  const positions = await readAllPositions(address as Address);
  const aTokens = positions
    .filter((p) => p.project === "aave-v3" && p.balanceUsd > 0)
    .map((p) => p.receiptAddress);

  // Optional ?claimer=… for setClaimer tx (Aave delegated path)
  const claimerParam =
    url.searchParams.get("claimer") ??
    process.env.NEXT_PUBLIC_KEEPERHUB_CLAIMER_ADDRESS ??
    null;
  const claimer =
    claimerParam && isValidAddress(claimerParam)
      ? (claimerParam as Address)
      : undefined;

  // Run both queries in parallel.
  const [aave, merkl] = await Promise.all([
    getUnclaimedAaveRewards(address as Address, aTokens, claimer),
    getMerklRewards(address as Address),
  ]);

  // Merge into a unified "unclaimed" view for the UI.
  const unclaimed = [
    ...aave.rewards.map((r) => ({
      source: "aave" as const,
      symbol: r.symbol,
      rewardToken: r.rewardToken,
      decimals: r.decimals,
      amountFormatted: r.amountFormatted,
    })),
    ...merkl.pending.map((r) => ({
      source: "merkl" as const,
      symbol: r.symbol,
      rewardToken: r.rewardToken,
      decimals: r.decimals,
      amountFormatted: r.amountPendingFormatted,
    })),
  ];

  return NextResponse.json({
    address,
    checkedAt: new Date().toISOString(),
    aaveAssetsChecked: aave.assetsChecked.length,
    unclaimed,
    totalCount: unclaimed.length,
    sources: {
      aave: {
        controllerChecked: "0xf9cc4F0D883F1a1eb2c253bdb46c254Ca51E1F44",
        unclaimedCount: aave.rewards.length,
        claimTx: aave.claimTx,
        setClaimerTx: aave.setClaimerTx,
      },
      merkl: {
        distributor: "0x3Ef3D8bA38EBe18DB133cEc108f4D14CE00Dd9Ae",
        unclaimedCount: merkl.pending.length,
        claimTx: merkl.claimTx,
      },
    },
    // Convenience: prefer Merkl claim tx since most Base rewards live there
    // and it requires no setClaimer authorization (proofs hardcode recipient).
    claimTx: merkl.claimTx ?? aave.claimTx?.manual ?? null,
    setClaimerTx: aave.setClaimerTx,
  });
}
