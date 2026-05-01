/**
 * KeeperHub status + free-call test endpoint.
 *
 * GET  /api/keeperhub          → connection status + recent free-call result
 *   - confirms API key is valid (`/api/user`)
 *   - calls helloworld (free) to prove wiring works
 *   - lists discoverable workflows
 *
 * The paid-call path is exercised separately via `/api/keeperhub/call`.
 */

import { NextResponse } from "next/server";
import { getKeeperHubStatus } from "../../../src/keeperhub-status";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(await getKeeperHubStatus());
}
