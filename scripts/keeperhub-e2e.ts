/**
 * KeeperHub end-to-end smoke test.
 *
 * Proves the buyer side of our two-sided x402 setup: the agent's wallet
 * actually authenticates to KeeperHub, lists workflows, and successfully
 * calls a free workflow.
 *
 * Run: npm run kh:e2e
 */
import "./_env";
import { callWorkflow, callWorkflowPaid } from "../src/keeperhub";

const KH_BASE = "https://app.keeperhub.com/api";

async function main() {
  const key = process.env.KEEPERHUB_API_KEY;
  if (!key) {
    console.error("✗ KEEPERHUB_API_KEY missing in env");
    process.exit(1);
  }

  console.log("─".repeat(60));
  console.log("KeeperHub end-to-end smoke test");
  console.log("─".repeat(60));

  // 1) Auth probe
  console.log("\n[1/3] auth probe → GET /api/user");
  const userRes = await fetch(`${KH_BASE}/user`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  const userJson = (await userRes.json().catch(() => ({}))) as {
    email?: string;
    id?: string;
    error?: string;
  };
  if (!userRes.ok) {
    console.error(`    ✗ ${userRes.status} ${JSON.stringify(userJson)}`);
    process.exit(1);
  }
  console.log(
    `    ✓ authenticated as ${userJson.email ?? userJson.id ?? "<no-email>"}`,
  );

  // 2) List available workflows
  console.log("\n[2/3] list workflows → GET /api/workflows");
  const wfRes = await fetch(`${KH_BASE}/workflows`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  const wfJson = (await wfRes.json().catch(() => [])) as Array<{
    slug?: string;
    name?: string;
    paid?: boolean;
  }>;
  if (!Array.isArray(wfJson)) {
    console.error(`    ✗ unexpected shape: ${JSON.stringify(wfJson).slice(0, 200)}`);
    process.exit(1);
  }
  console.log(`    ✓ ${wfJson.length} workflows visible`);
  for (const w of wfJson.slice(0, 8)) {
    console.log(
      `      · ${w.slug ?? "?"} ${w.paid ? "[paid]" : "[free]"} ${w.name ? "— " + w.name : ""}`,
    );
  }

  // 3) Call a free workflow end-to-end
  console.log("\n[3/3] call free workflow → POST /api/mcp/workflows/helloworld/call");
  const result = await callWorkflow("helloworld", {});
  if (!result.ok) {
    console.error(`    ✗ ${result.error} (http ${result.httpStatus})`);
    if (result.payment) {
      console.error(
        `      offer: ${result.payment.amount} ${result.payment.network} → ${result.payment.payTo}`,
      );
    }
    process.exit(1);
  }
  console.log(`    ✓ executionId=${result.executionId} status=${result.status}`);
  if (result.output) {
    console.log(`      output: ${JSON.stringify(result.output).slice(0, 200)}`);
  }

  // 4) Paid x402 call — actually settles 0.01 USDC on-chain
  console.log(
    "\n[4/4] paid x402 call → POST /api/mcp/workflows/usdc-yield-rates-aave-vs-compound/call",
  );
  console.log("      (signs EIP-3009 authorization, KeeperHub settles on-chain)");
  const paid = await callWorkflowPaid("usdc-yield-rates-aave-vs-compound", {});
  if (!paid.ok) {
    console.error(`    ✗ ${paid.error} (http ${paid.httpStatus})`);
    if (paid.payment) {
      console.error(
        `      offer was: ${Number(paid.payment.amount) / 1e6} USDC on ${paid.payment.network} → ${paid.payment.payTo}`,
      );
    }
  } else {
    console.log(
      `    ✓ executionId=${paid.executionId} status=${paid.status}`,
    );
    if (paid.output) {
      const out = JSON.stringify(paid.output);
      console.log(`      output: ${out.slice(0, 240)}${out.length > 240 ? "…" : ""}`);
    }
  }

  console.log("\n" + "─".repeat(60));
  console.log("✓ KeeperHub integration verified end-to-end (buyer side)");
  console.log("─".repeat(60));
}

main().catch((err) => {
  console.error("✗ unexpected error:", err);
  process.exit(1);
});
