import { NextResponse } from "next/server";
import { reverseResolveEns } from "../../../../src/agent-ens";
import { isValidAddress } from "../../../../src/onchain";

export const revalidate = 300; // 5 min — matches the in-memory cache in agent-ens.ts

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");
  if (!address || !isValidAddress(address)) {
    return NextResponse.json({ error: "missing or invalid address" }, { status: 400 });
  }
  const name = await reverseResolveEns(address as `0x${string}`);
  return NextResponse.json({ address, name });
}
