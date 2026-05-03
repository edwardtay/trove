/**
 * OpenSea-style ERC-721 metadata endpoint for the Trove iNFT.
 *
 *   GET /api/inft/metadata/0
 *
 * Even though our contract (StableRotatorAgent.sol) is ERC-7857-inspired and
 * exposes rich state via the custom `agents(tokenId)` getter rather than the
 * standard `tokenURI()`, this endpoint returns OpenSea-compatible JSON so
 * judges and explorers that DO know to fetch tokenURI-style metadata see
 * meaningful data instead of "no metadata."
 *
 * The data is pulled live from /api/agent/inft on every request, so counters
 * (totalDecisions, totalRebalances, totalHarvests) and pointers (configHash,
 * memoryHash) are always current — never stale baked-in JSON.
 */

import { NextResponse } from "next/server";

export const revalidate = 30;
export const runtime = "nodejs";

type INftAgent = {
  name: string;
  configHash: string;
  memoryHash: string;
  totalDecisions: string;
  totalRebalances: string;
  totalHarvests: string;
  clonedFrom: string;
  createdAt: number;
  createdAtIso: string;
  minApyDeltaBps: string;
  minHoldingDays: string;
  safetyMarginBps: string;
  harvester: boolean;
};

type INftResponse = {
  contract: string;
  tokenId: number;
  chainName: string;
  tokenExplorer: string;
  agent: INftAgent;
};

export async function GET(
  req: Request,
  ctx: { params: Promise<{ tokenId: string }> },
) {
  const { tokenId } = await ctx.params;
  const tokenIdNum = Number(tokenId);
  if (!Number.isInteger(tokenIdNum) || tokenIdNum < 0) {
    return NextResponse.json({ error: "invalid tokenId" }, { status: 400 });
  }

  const origin = new URL(req.url).origin;
  const inftRes = await fetch(`${origin}/api/agent/inft?tokenId=${tokenIdNum}`, {
    next: { revalidate: 30 },
  });
  if (!inftRes.ok) {
    return NextResponse.json(
      { error: `failed to load iNFT state (${inftRes.status})` },
      { status: 502 },
    );
  }
  const inft = (await inftRes.json()) as INftResponse;
  const a = inft.agent;

  // OpenSea-compliant metadata schema
  const metadata = {
    name: `${a.name} · #${tokenIdNum}`,
    description:
      `Trove iNFT — a USDC yield agent on Base with persistent memory and identity on 0G. ` +
      `Decisions are deterministic (replay any historic decision via npm run verify-decision) ` +
      `and committed every cycle as memory hash on this iNFT. ` +
      `Configuration: configHash → 0G Storage. Memory: memoryHash → 0G Storage. ` +
      `On-chain counters track total decisions, rebalances, and harvests.`,
    external_url: `${origin}/agent/trove.web3wagmi.eth`,
    // Fallback image — replace with a richer one if needed
    image: `${origin}/og-image.png`,
    attributes: [
      { trait_type: "Schema", value: "ERC-7857-inspired" },
      { trait_type: "Network", value: inft.chainName },
      { trait_type: "Total Decisions", value: Number(a.totalDecisions), display_type: "number" },
      { trait_type: "Total Rebalances", value: Number(a.totalRebalances), display_type: "number" },
      { trait_type: "Total Harvests", value: Number(a.totalHarvests), display_type: "number" },
      { trait_type: "Min APY Delta (bps)", value: Number(a.minApyDeltaBps), display_type: "number" },
      { trait_type: "Min Holding Days", value: Number(a.minHoldingDays), display_type: "number" },
      { trait_type: "Safety Margin (bps)", value: Number(a.safetyMarginBps), display_type: "number" },
      { trait_type: "Harvester Enabled", value: a.harvester ? "Yes" : "No" },
      { trait_type: "Cloned From", value: a.clonedFrom },
      { trait_type: "Config Hash (0G Storage)", value: a.configHash },
      { trait_type: "Memory Hash (0G Storage)", value: a.memoryHash },
      { trait_type: "Minted (Unix)", value: a.createdAt, display_type: "date" },
    ],
    // Custom Trove-specific fields
    trove: {
      contract: inft.contract,
      tokenId: inft.tokenId,
      explorer: inft.tokenExplorer,
      ensProfile: `${origin}/agent/trove.web3wagmi.eth`,
      verifyDecision: `${origin}/api/agent/verify?root=${a.memoryHash}`,
      proofBundle: `${origin}/api/proof`,
    },
  };

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, max-age=30, s-maxage=60",
    },
  });
}
