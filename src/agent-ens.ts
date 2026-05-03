/**
 * Resolves AI agent metadata via ENS text records.
 *
 * The canonical Trove agent identity lives at `web3wagmi.eth` on Ethereum
 * mainnet. Verifiable records (settable via app.ens.domains):
 *  - "x402-endpoint": The payment URL for requesting decisions
 *  - "0g-inft": The Galileo iNFT contract address and token ID
 *  - "0g-memory": The latest 0G Storage decision-log root hash
 *  - "description", "url", "com.github": standard discovery fields
 *
 * This turns any ENS name into a discoverable agent profile — no central
 * directory required. Other agents can find Trove by resolving the well-known
 * `web3wagmi.eth` name, no API key, no signed handshake.
 */

import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export type AgentDiscoverProfile = {
  name: string;
  address: `0x${string}` | null;
  x402Endpoint: string | null;
  ogInft: string | null;
  ogMemory: string | null;
  description: string | null;
  url: string | null;
  github: string | null;
  avatar: string | null;
};

// Canonical Trove agent identity. All text records are real on-chain.
export const TROVE_AGENT_ENS = "web3wagmi.eth";

const l1Client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export async function discoverAgent(ensName: string): Promise<AgentDiscoverProfile | null> {
  const normalized = normalize(ensName.trim());

  try {
    // Address resolution + all text records in parallel.
    const [address, x402, inft, memory, description, url, github, avatar] =
      await Promise.all([
        l1Client.getEnsAddress({ name: normalized }),
        l1Client.getEnsText({ name: normalized, key: "x402-endpoint" }),
        l1Client.getEnsText({ name: normalized, key: "0g-inft" }),
        l1Client.getEnsText({ name: normalized, key: "0g-memory" }),
        l1Client.getEnsText({ name: normalized, key: "description" }),
        l1Client.getEnsText({ name: normalized, key: "url" }),
        l1Client.getEnsText({ name: normalized, key: "com.github" }),
        l1Client.getEnsText({ name: normalized, key: "avatar" }),
      ]);

    if (!address) return null;

    // To count as an agent profile, we require at least an x402 endpoint
    // or an iNFT pointer. Otherwise it's just a regular ENS name.
    if (!x402 && !inft) return null;

    return {
      name: normalized,
      address,
      x402Endpoint: x402,
      ogInft: inft,
      ogMemory: memory,
      description,
      url,
      github,
      avatar,
    };
  } catch (error) {
    console.error(`Failed to resolve agent ENS for ${ensName}:`, error);
    return null;
  }
}

/** In-memory reverse-resolution cache to avoid hammering RPC on every render. */
const reverseCache = new Map<string, { name: string | null; cachedAt: number }>();
const REVERSE_TTL_MS = 5 * 60_000; // 5 min

/**
 * Reverse-resolve an Ethereum address to its primary ENS name (if set).
 * Returns null if the address has no reverse record. Cached for 5 minutes.
 */
export async function reverseResolveEns(
  address: `0x${string}`,
): Promise<string | null> {
  const key = address.toLowerCase();
  const hit = reverseCache.get(key);
  if (hit && Date.now() - hit.cachedAt < REVERSE_TTL_MS) {
    return hit.name;
  }

  try {
    const name = await l1Client.getEnsName({ address });
    reverseCache.set(key, { name: name ?? null, cachedAt: Date.now() });
    return name ?? null;
  } catch {
    reverseCache.set(key, { name: null, cachedAt: Date.now() });
    return null;
  }
}
