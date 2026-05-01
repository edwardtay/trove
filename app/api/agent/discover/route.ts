import { NextResponse } from "next/server";
import { discoverAgent } from "../../../../src/agent-ens";

export const revalidate = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name");

  if (!name || !name.endsWith(".eth")) {
    return NextResponse.json(
      { error: "Please provide a valid .eth ENS name" },
      { status: 400 }
    );
  }

  try {
    const profile = await discoverAgent(name);
    if (!profile) {
      return NextResponse.json(
        { error: "No agent profile found on this ENS name" },
        { status: 404 }
      );
    }
    return NextResponse.json({ profile });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
