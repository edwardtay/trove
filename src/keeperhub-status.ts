import { callWorkflow } from "./keeperhub";

const KH_KEY = process.env.KEEPERHUB_API_KEY;

export type KeeperHubStatusResult = {
  configured: boolean;
  hint?: string;
  auth?: { id?: string; name?: string; error?: string };
  helloworld?: Awaited<ReturnType<typeof callWorkflow>>;
  wallet: {
    provider: string;
    role: string;
    configuredIn: string;
    funding: {
      readOnlyRequired: boolean;
      writeTxRequired: boolean;
      documentedNetworks: string[];
    };
    note: string;
  };
  workflows?: { count: number; items?: unknown[]; error?: string };
  catalog?: { slug: string; paid: boolean; costUsdc?: number }[];
};

export const keeperHubWallet = {
  provider: "Turnkey",
  role: "KeeperHub organization execution wallet",
  configuredIn: "KeeperHub Organization Wallet",
  funding: {
    readOnlyRequired: false,
    writeTxRequired: true,
    documentedNetworks: ["Ethereum Mainnet", "Sepolia Testnet"],
  },
  note:
    "KeeperHub tx workflow nodes are signed by its org Turnkey wallet; Trove user wallet remains Privy/x402.",
};

const catalog = [
  { slug: "helloworld", paid: false },
  { slug: "usdc-yield-rates-aave-vs-compound", paid: true, costUsdc: 0.01 },
  { slug: "yield-read-morpho-get-market", paid: true, costUsdc: 0.01 },
  { slug: "defi-risk-snapshot", paid: true, costUsdc: 0.01 },
];

async function fetchJson<T>(url: string, init: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, { ...init, cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getKeeperHubStatus(): Promise<KeeperHubStatusResult> {
  if (!KH_KEY) {
    return {
      configured: false,
      hint: "set KEEPERHUB_API_KEY in .env.local",
      wallet: keeperHubWallet,
      catalog,
    };
  }

  const authHeaders = { Authorization: `Bearer ${KH_KEY}` };
  const [user, hello, workflows] = await Promise.all([
    fetchJson<{ id: string; name?: string; email?: string }>(
      "https://app.keeperhub.com/api/user",
      { headers: authHeaders },
    ),
    callWorkflow("helloworld"),
    fetchJson<unknown[]>("https://app.keeperhub.com/api/workflows", {
      headers: authHeaders,
    }),
  ]);

  return {
    configured: true,
    auth: user ? { id: user.id, name: user.name } : { error: "auth failed" },
    helloworld: hello,
    wallet: keeperHubWallet,
    workflows: workflows
      ? { count: workflows.length, items: workflows }
      : { count: 0, error: "workflow list unavailable" },
    catalog,
  };
}
