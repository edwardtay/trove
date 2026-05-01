// Live Base L2 gas oracle. Replaces the $0.25 hardcoded placeholder in the
// policy. Fetches eth_gasPrice from a public Base RPC and combines with live
// ETH price to convert wei → USD per op.

const BASE_RPC = "https://mainnet.base.org";
const ETH_PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

// Typical gas costs on Base for our operations.
// Numbers reflect what these txs actually consume — I cross-checked against
// recent Aave V3 supply / withdraw / Morpho deposit / Compound supply receipts
// on basescan; supply hovers around 130–180k, full withdraw+supply rebalance
// closer to 250–350k, claim+swap around 200–250k.
export const GAS_UNITS = {
  supply: 150_000,
  withdraw: 130_000,
  rebalance: 280_000, // withdraw + supply combined
  claimAndSwap: 220_000, // claim rewards + swap on Aerodrome/Uniswap
} as const;

export type GasQuote = {
  gweiPrice: number;
  ethUsd: number;
  perRebalanceUsd: number;
  perHarvestUsd: number;
  fetchedAt: string;
};

async function fetchBaseGasPriceWei(): Promise<bigint> {
  const res = await fetch(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_gasPrice",
      params: [],
      id: 1,
    }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Base RPC ${res.status}`);
  const json = (await res.json()) as { result?: string; error?: unknown };
  if (!json.result) throw new Error(`Base RPC returned no result`);
  return BigInt(json.result);
}

async function fetchEthUsd(): Promise<number> {
  const res = await fetch(ETH_PRICE_URL, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
  const json = (await res.json()) as { ethereum?: { usd?: number } };
  const usd = json.ethereum?.usd;
  if (typeof usd !== "number") throw new Error("CoinGecko: no eth price");
  return usd;
}

export async function fetchGasQuote(): Promise<GasQuote> {
  const [gasPriceWei, ethUsd] = await Promise.all([
    fetchBaseGasPriceWei(),
    fetchEthUsd(),
  ]);

  const gweiPrice = Number(gasPriceWei) / 1e9;

  function usdForGasUnits(units: number): number {
    const costWei = gasPriceWei * BigInt(units);
    const costEth = Number(costWei) / 1e18;
    return costEth * ethUsd;
  }

  return {
    gweiPrice,
    ethUsd,
    perRebalanceUsd: usdForGasUnits(GAS_UNITS.rebalance),
    perHarvestUsd: usdForGasUnits(GAS_UNITS.claimAndSwap),
    fetchedAt: new Date().toISOString(),
  };
}
