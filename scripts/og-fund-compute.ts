/**
 * One-time setup: deposit testnet 0G to the compute ledger and lock 1 0G to
 * a chat provider's sub-account. Subsequent inference calls draw from that.
 *
 * Usage:  PRIVATE_KEY=0x... npm run og:fund-compute
 *
 * Persists chosen provider + model to og-state.json.
 */

import "./_env";
import { writeFile, readFile } from "node:fs/promises";
import { StableRotatorCompute } from "../src/og-compute";

const STATE_PATH = "og-state.json";

async function main() {
  const compute = new StableRotatorCompute();
  if (!compute.isConfigured) {
    console.error("[error] PRIVATE_KEY not set");
    process.exit(1);
  }

  const result = await compute.ensureFunded();
  if (!result) {
    console.error("[og-compute] funding failed");
    process.exit(1);
  }

  console.log(`[og-compute] ✓ provider: ${result.providerAddress}`);
  console.log(`[og-compute] ✓ model:    ${result.model}`);

  let state: Record<string, unknown> = {};
  try {
    state = JSON.parse(await readFile(STATE_PATH, "utf-8"));
  } catch {
    /* fresh */
  }
  state.compute = {
    providerAddress: result.providerAddress,
    model: result.model,
    fundedAt: new Date().toISOString(),
  };
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2));
  console.log(`[og-compute] ✓ wrote ${STATE_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
