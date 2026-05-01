/**
 * Call any KeeperHub workflow by slug, with optional x402 payment.
 *
 *   GET  /api/keeperhub/call?slug=helloworld           → free
 *   GET  /api/keeperhub/call?slug=usdc-yield-rates-aave-vs-compound&pay=1
 *
 * When `pay=1`, uses x402-fetch to auto-pay the USDC micropayment on Base
 * before retrying. Requires the agent's PRIVATE_KEY wallet to hold USDC + ETH.
 */

import { NextResponse } from "next/server";
import { callWorkflow, callWorkflowPaid } from "../../../../src/keeperhub";

export const revalidate = 0;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? "helloworld";
  const pay = url.searchParams.get("pay") === "1";
  const bodyStr = url.searchParams.get("body");
  let body: unknown = {};
  if (bodyStr) {
    try {
      body = JSON.parse(bodyStr);
    } catch {
      return NextResponse.json(
        { error: "body must be valid JSON" },
        { status: 400 },
      );
    }
  }

  try {
    const result = pay
      ? await callWorkflowPaid(slug, body)
      : await callWorkflow(slug, body);
    return NextResponse.json({ slug, paid: pay, ...result });
  } catch (err) {
    return NextResponse.json(
      {
        slug,
        paid: pay,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
