/**
 * Mint a StableRotator agent iNFT, using the latest configHash from
 * og-state.json (uploaded via `npm run og:upload-policy`).
 *
 * Usage:
 *   PRIVATE_KEY=0x... npm run og:mint-agent
 *
 * Requires:
 *   - iNFT contract deployed (`og:deploy-inft`)
 *   - Policy config uploaded (`og:upload-policy`)
 *   - Wallet funded with Galileo 0G
 */

import { writeFile, readFile } from "node:fs/promises";
import hre from "hardhat";

// Policy constants mirrored from src/policy.ts (avoid TS import resolution
// issues under hardhat's ts-node ESM loader).
const DEFAULT_POLICY = {
  minApyDelta: 0.5,
  minHoldingDays: 7,
  safetyMargin: 1.5,
};

async function main() {
  if (!process.env.PRIVATE_KEY) {
    console.error("[error] PRIVATE_KEY not set");
    process.exit(1);
  }

  let state: {
    iNftContract?: { address: string };
    policyConfig?: { rootHash: string };
  } = {};
  try {
    state = JSON.parse(await readFile("og-state.json", "utf-8"));
  } catch {
    /* */
  }
  if (!state.iNftContract?.address) {
    console.error(
      "[error] no iNFT contract address. Run `npm run og:deploy-inft` first.",
    );
    process.exit(1);
  }
  if (!state.policyConfig?.rootHash) {
    console.error(
      "[error] no policy configHash. Run `npm run og:upload-policy` first.",
    );
    process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethers = (hre as any).ethers;
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt(
    "StableRotatorAgent",
    state.iNftContract.address,
    signer,
  );

  const minApyDeltaBps = Math.round(DEFAULT_POLICY.minApyDelta * 100);
  const safetyMarginBps = Math.round(DEFAULT_POLICY.safetyMargin * 10000);

  console.log(`[mint] minting agent with config:`);
  console.log(`       minApyDeltaBps:  ${minApyDeltaBps} (${DEFAULT_POLICY.minApyDelta}%)`);
  console.log(`       minHoldingDays:  ${DEFAULT_POLICY.minHoldingDays}`);
  console.log(`       safetyMarginBps: ${safetyMarginBps} (×${DEFAULT_POLICY.safetyMargin})`);
  console.log(`       harvester:       true`);
  console.log(`       configHash:      ${state.policyConfig.rootHash.slice(0, 20)}…`);

  const tx = await contract.mintAgent(
    "stable-rotator-genesis",
    minApyDeltaBps,
    DEFAULT_POLICY.minHoldingDays,
    safetyMarginBps,
    true,
    state.policyConfig.rootHash,
  );
  console.log(`[mint] tx hash: ${tx.hash}`);
  const receipt = await tx.wait();
  console.log(`[mint] mined in block: ${receipt?.blockNumber}`);

  // Token id = current totalSupply - 1 (we just minted)
  const tokenId = (await contract.totalSupply()) - 1n;
  console.log(`[mint] ✓ tokenId: ${tokenId}`);
  console.log(
    `[mint] ✓ explorer: https://chainscan-galileo.0g.ai/tx/${tx.hash}`,
  );

  const updated = {
    ...state,
    iNftToken: {
      tokenId: tokenId.toString(),
      mintedAt: new Date().toISOString(),
      txHash: tx.hash,
      configHashAtMint: state.policyConfig.rootHash,
    },
  };
  await writeFile("og-state.json", JSON.stringify(updated, null, 2));
  console.log(`[mint] ✓ wrote og-state.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
