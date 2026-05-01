/**
 * Deploy StableRotatorAgent.sol to 0G Galileo testnet (chainId 16602).
 * Saves the contract address to og-state.json.
 *
 * Usage:
 *   PRIVATE_KEY=0x... npm run og:deploy-inft
 *
 * Requires the wallet to hold Galileo testnet 0G for gas. Faucet:
 *   https://faucet.0g.ai/
 */

import { writeFile, readFile } from "node:fs/promises";
import hre from "hardhat";

async function main() {
  if (!process.env.PRIVATE_KEY) {
    console.error("[error] PRIVATE_KEY not set in env");
    process.exit(1);
  }

  // Hardhat 2 API: ethers is attached to hre via hardhat-ethers plugin
  // and the network is selected via --network flag (no .connect)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ethers = (hre as any).ethers;
  const [deployer] = await ethers.getSigners();
  console.log(`[deploy] deployer: ${await deployer.getAddress()}`);
  console.log(
    `[deploy] balance:  ${ethers.formatEther(
      await ethers.provider.getBalance(await deployer.getAddress()),
    )} 0G`,
  );

  const Factory = await ethers.getContractFactory("StableRotatorAgent");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`[deploy] ✓ StableRotatorAgent deployed at: ${address}`);
  console.log(
    `[deploy] ✓ explorer: https://chainscan-galileo.0g.ai/address/${address}`,
  );

  let state: Record<string, unknown> = {};
  try {
    state = JSON.parse(await readFile("og-state.json", "utf-8"));
  } catch {
    /* fresh */
  }
  state.iNftContract = {
    address,
    deployedAt: new Date().toISOString(),
    chainId: 16602,
    explorerUrl: `https://chainscan-galileo.0g.ai/address/${address}`,
  };
  await writeFile("og-state.json", JSON.stringify(state, null, 2));
  console.log(`[deploy] ✓ wrote og-state.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
