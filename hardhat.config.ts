import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

import "@nomicfoundation/hardhat-ethers";
import type { HardhatUserConfig } from "hardhat/config";

// Ethers requires the 0x prefix; auto-add it if user only provided hex chars
const RAW_KEY = process.env.PRIVATE_KEY ?? "";
const PRIVATE_KEY = RAW_KEY
  ? RAW_KEY.startsWith("0x")
    ? RAW_KEY
    : `0x${RAW_KEY}`
  : "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      evmVersion: "cancun",
      viaIR: true, // needed because AgentData struct + clone-fee logic
                   // pushes the stack past the EVM's 16-slot limit
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    cache: "./cache",
  },
  networks: {
    "0g-galileo": {
      type: "http",
      url: process.env.ZG_RPC_URL ?? "https://evmrpc-testnet.0g.ai",
      chainType: "generic",
      chainId: 16602,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
