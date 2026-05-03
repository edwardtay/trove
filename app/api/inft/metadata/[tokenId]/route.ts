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
 * Reads directly from the on-chain contract (no internal HTTP hop) so
 * counters and 0G Storage hashes are always current.
 */

import { NextResponse } from "next/server";
import { StableRotatorINft } from "../../../../../src/og-inft";

export const revalidate = 30;
export const runtime = "nodejs";

const INFT_ADDRESS =
  process.env.NEXT_PUBLIC_INFT_ADDRESS ??
  "0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ tokenId: string }> },
) {
  const { tokenId } = await ctx.params;
  const tokenIdNum = Number(tokenId);
  if (!Number.isInteger(tokenIdNum) || tokenIdNum < 0) {
    return NextResponse.json({ error: "invalid tokenId" }, { status: 400 });
  }

  // Behind a reverse proxy (CapRover/nginx), req.url reports the internal
  // bind address (https://0.0.0.0:3000). Use the X-Forwarded-Host header for
  // the actual public origin, with a hardcoded fallback for the prod domain.
  const fwdHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const fwdProto = req.headers.get("x-forwarded-proto") ?? "https";
  const origin = fwdHost ? `${fwdProto}://${fwdHost}` : "https://trove.web3wagmi.com";

  const inft = new StableRotatorINft(INFT_ADDRESS);
  if (!inft.isConfigured) {
    return NextResponse.json(
      { error: "iNFT reader not configured (PRIVATE_KEY missing)" },
      { status: 503 },
    );
  }

  let a: Awaited<ReturnType<StableRotatorINft["getAgent"]>>;
  try {
    a = await inft.getAgent(BigInt(tokenIdNum));
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    );
  }
  if (!a) {
    return NextResponse.json(
      { error: `agent not found at tokenId ${tokenIdNum}` },
      { status: 404 },
    );
  }

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
    image: `${origin}/og-image.png`,
    attributes: [
      { trait_type: "Schema", value: "ERC-7857-inspired" },
      { trait_type: "Network", value: "0G Galileo testnet" },
      { trait_type: "Total Decisions", value: Number(a.totalDecisions), display_type: "number" },
      { trait_type: "Total Rebalances", value: Number(a.totalRebalances), display_type: "number" },
      { trait_type: "Total Harvests", value: Number(a.totalHarvests), display_type: "number" },
      { trait_type: "Min APY Delta (bps)", value: Number(a.minApyDeltaBps), display_type: "number" },
      { trait_type: "Min Holding Days", value: Number(a.minHoldingDays), display_type: "number" },
      { trait_type: "Safety Margin (bps)", value: Number(a.safetyMarginBps), display_type: "number" },
      { trait_type: "Harvester Enabled", value: a.harvester ? "Yes" : "No" },
      { trait_type: "Cloned From", value: a.clonedFrom.toString() },
      { trait_type: "Config Hash (0G Storage)", value: a.configHash },
      { trait_type: "Memory Hash (0G Storage)", value: a.memoryHash },
      { trait_type: "Minted (Unix)", value: Number(a.createdAt), display_type: "date" },
    ],
    trove: {
      contract: INFT_ADDRESS,
      tokenId: tokenIdNum,
      explorer: `https://chainscan-galileo.0g.ai/token/${INFT_ADDRESS}?a=${tokenIdNum}`,
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
