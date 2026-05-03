/**
 * GET /api/agent/rewards?address=0x…
 *
 * Returns unclaimed Aave V3 incentive rewards for the given wallet on Base,
 * plus a pre-built transaction the wallet can sign to claim them all.
 *
 * Drives Trove's "auto-claims rewards you'd forget" promise — the agent both
 * detects (via /api/positions) and surfaces unclaimed rewards on those
 * positions. KeeperHub's tx-execution boundary can also call this and
 * include the returned `claimTx` in a multicall.
 */

import { NextResponse } from "next/server";
import { isValidAddress, readAllPositions } from "../../../../src/onchain";
import { getUnclaimedAaveRewards } from "../../../../src/aave-rewards";
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

  // Find user's Aave V3 aTokens (both tracked aUSDC and detected variants
  // like aWETH, aGHO, etc.) — these are the assets we query for rewards.
  const positions = await readAllPositions(address as Address);
  const aTokens = positions
    .filter((p) => p.project === "aave-v3" && p.balanceUsd > 0)
    .map((p) => p.receiptAddress);

  const summary = await getUnclaimedAaveRewards(address as Address, aTokens);

  return NextResponse.json({
    address,
    checkedAt: new Date().toISOString(),
    aaveAssetsChecked: summary.assetsChecked.length,
    unclaimed: summary.rewards,
    totalUsdEstimate: summary.totalUsdEstimate,
    claimTx: summary.claimTx,
  });
}
