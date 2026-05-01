/**
 * Upload current DEFAULT_POLICY to 0G Storage as ENCRYPTED intelligence.
 *
 * Track-brief alignment: "iNFT-minted agents with embedded intelligence
 * (encrypted on 0G Storage)."
 *
 * Flow:
 *   1. Sign EIP-191 canonical message → HKDF → 32-byte AES key
 *   2. AES-256-GCM encrypt policy JSON → opaque ciphertext blob
 *   3. Upload encrypted blob to 0G Storage → rootHash
 *   4. Commit rootHash on-chain as iNFT.configHash (next mint or update)
 *
 * Anyone fetching the blob from 0G sees only ciphertext. Only an actor
 * who holds the iNFT owner's private key can produce the canonical sig,
 * derive the same AES key, and decrypt.
 *
 * Usage: PRIVATE_KEY=0x... npm run og:upload-policy
 */

import "./_env";
import { writeFile, readFile } from "node:fs/promises";
import { ethers } from "ethers";
import { DEFAULT_POLICY } from "../src/policy";
import { StableRotatorStorage, type PolicyConfig } from "../src/og-storage";
import { deriveAgentKey, encryptForOg } from "../src/og-encryption";

const STATE_PATH = "og-state.json";
const ZG_GALILEO_CHAIN_ID = 16602;

async function main() {
  const storage = new StableRotatorStorage();
  if (!storage.isConfigured) {
    console.error(
      "[error] PRIVATE_KEY not set. Get Galileo testnet 0G from https://faucet.0g.ai/ and set PRIVATE_KEY in .env",
    );
    process.exit(1);
  }
  console.log(`[og] signer: ${storage.signerAddress}`);

  const config: PolicyConfig = {
    schema: "stable-rotator/policy/1",
    createdAt: new Date().toISOString(),
    minApyDelta: DEFAULT_POLICY.minApyDelta,
    minHoldingDays: DEFAULT_POLICY.minHoldingDays,
    gasCostUsd: DEFAULT_POLICY.gasCostUsd,
    slippageBufferBps: DEFAULT_POLICY.slippageBufferBps,
    cooldownHours: DEFAULT_POLICY.cooldownHours,
    tvlFloorUsd: DEFAULT_POLICY.tvlFloorUsd,
    apyFloor: DEFAULT_POLICY.apyFloor,
    safetyMargin: DEFAULT_POLICY.safetyMargin,
    keeperFeePct: DEFAULT_POLICY.keeperFeePct,
    harvester: true,
    allowlist: [...DEFAULT_POLICY.allowlist].sort(),
  };

  // Read existing state to find tokenId (defaults to 0 if not yet minted)
  let state: { iNftToken?: { tokenId: string } } = {};
  try {
    state = JSON.parse(await readFile(STATE_PATH, "utf-8"));
  } catch {
    /* fresh */
  }
  const tokenId = state.iNftToken?.tokenId ? Number(state.iNftToken.tokenId) : 0;

  // Derive the agent's encryption key from the owner's signature
  const raw = process.env.PRIVATE_KEY!;
  const key = raw.startsWith("0x") ? raw : `0x${raw}`;
  const wallet = new ethers.Wallet(key);
  const agentKey = await deriveAgentKey(wallet, tokenId, ZG_GALILEO_CHAIN_ID);
  console.log(
    `[og] derived agent key for token #${tokenId} on chain ${ZG_GALILEO_CHAIN_ID}`,
  );

  // Encrypt before upload
  const encrypted = encryptForOg(
    config,
    agentKey,
    `policy/v1 · ${config.allowlist.length} pools`,
  );
  console.log(`[og] encrypted blob:`);
  console.log(`     alg=${encrypted.alg}`);
  console.log(`     ct=${encrypted.ct.length / 2}b ciphertext`);
  console.log(`     hint=${encrypted.hint}`);

  console.log(`[og] uploading encrypted policy...`);
  const result = await storage.putPolicyConfig(
    encrypted as unknown as PolicyConfig,
  );
  if (!result) {
    console.error("[og] upload returned null");
    process.exit(1);
  }

  console.log(`[og] ✓ rootHash: ${result.rootHash}`);
  console.log(`[og] ✓ txHash:   ${result.txHash}`);

  // Persist
  const updated = {
    ...state,
    policyConfig: {
      ...result,
      encrypted: true,
      hint: encrypted.hint,
      ownerAddress: wallet.address,
      tokenId,
      // Note: we explicitly DO NOT persist the plaintext config to og-state.json
      // anymore. The whole point is that the policy is encrypted.
    },
  };
  await writeFile(STATE_PATH, JSON.stringify(updated, null, 2));
  console.log(`[og] ✓ wrote ${STATE_PATH}`);
  console.log(
    `[og] policy is now encrypted on 0G Storage. Only the owner of`,
  );
  console.log(`     ${wallet.address} can decrypt it via signing.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
