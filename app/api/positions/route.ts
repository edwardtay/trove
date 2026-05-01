import { NextResponse } from "next/server";
import { readAllPositions, resolveEns } from "../../../src/onchain";

export const revalidate = 30;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawAddress = url.searchParams.get("address");
  const address = rawAddress ? await resolveEns(rawAddress) : null;
  if (!address) {
    return NextResponse.json(
      { error: "missing or invalid address/ENS" },
      { status: 400 },
    );
  }
  try {
    const positions = await readAllPositions(address);
    return NextResponse.json({ positions });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
