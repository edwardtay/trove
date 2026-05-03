/**
 * GET /api/agent/inft
 *
 * Returns the live on-chain state of Trove's genesis iNFT (token #0) on
 * 0G Galileo. This is the agent's canonical identity record — read directly
 * from the StableRotatorAgent contract.
 *
 * Used by the homepage iNFT identity card so visitors can see the agent
 * is a real on-chain object (not just a server-side daemon).
 */

import { NextResponse } from "next/server";
import { StableRotatorINft } from "../../../../src/og-inft";

export const revalidate = 30;

const INFT_ADDRESS =
  process.env.NEXT_PUBLIC_INFT_ADDRESS ??
  "0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64";
const INFT_TOKEN_ID = BigInt(process.env.NEXT_PUBLIC_INFT_TOKEN_ID ?? "0");

export async function GET() {
  const inft = new StableRotatorINft(INFT_ADDRESS);

  if (!inft.isConfigured) {
    return NextResponse.json(
      {
        contract: INFT_ADDRESS,
        tokenId: Number(INFT_TOKEN_ID),
        chainId: 16602,
        explorer: `https://chainscan-galileo.0g.ai/address/${INFT_ADDRESS}`,
        configured: false,
        error: "iNFT reader not configured (PRIVATE_KEY missing)",
      },
      { status: 200 },
    );
  }

  try {
    const data = await inft.getAgent(INFT_TOKEN_ID);
    if (!data) {
      return NextResponse.json(
        {
          contract: INFT_ADDRESS,
          tokenId: Number(INFT_TOKEN_ID),
          chainId: 16602,
          explorer: `https://chainscan-galileo.0g.ai/address/${INFT_ADDRESS}`,
          error: "Agent data not found on-chain",
        },
        { status: 200 },
      );
    }
    return NextResponse.json({
      contract: INFT_ADDRESS,
      tokenId: Number(INFT_TOKEN_ID),
      chainId: 16602,
      chainName: "0G Galileo testnet",
      explorer: `https://chainscan-galileo.0g.ai/address/${INFT_ADDRESS}`,
      tokenExplorer: `https://chainscan-galileo.0g.ai/token/${INFT_ADDRESS}?a=${INFT_TOKEN_ID}`,
      agent: {
        name: data.name,
        configHash: data.configHash,
        memoryHash: data.memoryHash,
        totalDecisions: data.totalDecisions.toString(),
        totalRebalances: data.totalRebalances.toString(),
        totalHarvests: data.totalHarvests.toString(),
        clonedFrom: data.clonedFrom.toString(),
        createdAt: Number(data.createdAt),
        createdAtIso: new Date(Number(data.createdAt) * 1000).toISOString(),
        minApyDeltaBps: data.minApyDeltaBps.toString(),
        minHoldingDays: data.minHoldingDays.toString(),
        safetyMarginBps: data.safetyMarginBps.toString(),
        harvester: data.harvester,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        contract: INFT_ADDRESS,
        tokenId: Number(INFT_TOKEN_ID),
        chainId: 16602,
        explorer: `https://chainscan-galileo.0g.ai/address/${INFT_ADDRESS}`,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 200 },
    );
  }
}
