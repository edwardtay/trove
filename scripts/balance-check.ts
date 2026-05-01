import "./_env";
import { ethers } from "ethers";

const RPC = "https://mainnet.base.org";
const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const ABI = ["function balanceOf(address) view returns (uint256)"];

async function main() {
  const key = process.env.PRIVATE_KEY;
  if (!key) {
    console.error("no PRIVATE_KEY");
    process.exit(1);
  }
  const provider = new ethers.JsonRpcProvider(RPC);
  const wallet = new ethers.Wallet(
    key.startsWith("0x") ? key : "0x" + key,
    provider,
  );
  const eth = await provider.getBalance(wallet.address);
  const usdc = new ethers.Contract(USDC, ABI, provider);
  const bal = await usdc.balanceOf(wallet.address);
  console.log("agent wallet:", wallet.address);
  console.log("ETH on Base:", ethers.formatEther(eth));
  console.log("USDC on Base:", Number(bal) / 1e6);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
