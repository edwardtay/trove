/**
 * Deploy RoyaltyRouter.sol on 0G Galileo testnet.
 *
 * Reads the deployed StableRotatorAgent address from og-state.json.
 * Uses Galileo USDC (or a mock if not deployed there yet — Galileo is a
 * testnet so a real USDC may not exist; we pass the agent's wallet as a
 * placeholder and mark it for production swap).
 *
 * Usage:
 *   PRIVATE_KEY=0x... npm run og:deploy-router
 */

import { writeFile, readFile } from "node:fs/promises";
import hre from "hardhat";

// On Base mainnet, USDC is 0x833589fcD6eDb6E08f4c7C32D4f71b54bdA02913.
// On 0G Galileo (chainId 16602) there's no canonical USDC; we deploy with
// a placeholder address and document that production routing happens on
// Base mainnet where USDC is real.
const USDC_PLACEHOLDER = "0x833589fcD6eDb6E08f4c7C32D4f71b54bdA02913";

async function main() {
  if (!process.env.PRIVATE_KEY) {
    console.error("[error] PRIVATE_KEY not set");
    process.exit(1);
  }

  let state: { iNftContract?: { address: string } } = {};
  try {
    state = JSON.parse(await readFile("og-state.json", "utf-8"));
  } catch {
    /* fresh */
  }
  if (!state.iNftContract?.address) {
    console.error(
      "[error] no iNFT contract address. Run `npm run og:deploy-inft` first.",
    );
    process.exit(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethers = (hre as any).ethers;
  const [deployer] = await ethers.getSigners();
  console.log(`[deploy] deployer: ${await deployer.getAddress()}`);

  const Factory = await ethers.getContractFactory("RoyaltyRouter");
  const contract = await Factory.deploy(
    USDC_PLACEHOLDER,
    state.iNftContract.address,
  );
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`[deploy] ✓ RoyaltyRouter deployed at: ${address}`);
  console.log(
    `[deploy] ✓ explorer: https://chainscan-galileo.0g.ai/address/${address}`,
  );

  const updated = {
    ...state,
    royaltyRouter: {
      address,
      deployedAt: new Date().toISOString(),
      chainId: 16602,
      iNftContract: state.iNftContract.address,
      usdcAddress: USDC_PLACEHOLDER,
      explorerUrl: `https://chainscan-galileo.0g.ai/address/${address}`,
    },
  };
  await writeFile("og-state.json", JSON.stringify(updated, null, 2));
  console.log(`[deploy] ✓ wrote og-state.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
