/**
 * Resolves AI agent metadata via ENS text records.
 *
 * This turns an ENS name (like `trove-agent.eth`) into a discoverable agent profile.
 * Records we look for:
 *  - "x402-endpoint": The payment URL for requesting decisions
 *  - "0g-inft": The Galileo iNFT contract address and token ID
 *  - "0g-memory": The latest storage root hash (if available directly on ENS)
 */

import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export type AgentDiscoverProfile = {
  name: string;
  x402Endpoint: string | null;
  ogInft: string | null;
  ogMemory: string | null;
  description: string | null;
};

// We use mainnet viem client to resolve ENS
const l1Client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

/**
 * For the hackathon demo, we provide a mock profile for a specific name
 * since we can't easily set real text records on a mainnet ENS name without paying gas.
 */
const MOCK_AGENT_NAME = "trove-agent.eth";

const MOCK_PROFILE: AgentDiscoverProfile = {
  name: MOCK_AGENT_NAME,
  x402Endpoint: "https://trove.web3wagmi.com/api/agent/decide",
  ogInft: "16602:0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64:0",
  ogMemory: "0x7426fb9c...f124f", // Mocked root hash
  description: "A disciplined USDC yield allocator on Base. Auto-claims and rotates when profitable.",
};

export async function discoverAgent(ensName: string): Promise<AgentDiscoverProfile | null> {
  const normalized = normalize(ensName.trim());

  // Return mock for the demo if it matches
  if (normalized === MOCK_AGENT_NAME) {
    return MOCK_PROFILE;
  }

  try {
    // 1. Ensure the name actually resolves
    const address = await l1Client.getEnsAddress({ name: normalized });
    if (!address) return null;

    // 2. Fetch all relevant text records
    const [x402, inft, memory, description] = await Promise.all([
      l1Client.getEnsText({ name: normalized, key: "x402-endpoint" }),
      l1Client.getEnsText({ name: normalized, key: "0g-inft" }),
      l1Client.getEnsText({ name: normalized, key: "0g-memory" }),
      l1Client.getEnsText({ name: normalized, key: "description" }),
    ]);

    // An agent must have at least an x402 endpoint or an iNFT to be valid here
    if (!x402 && !inft) {
      return null; // Not an agent profile
    }

    return {
      name: normalized,
      x402Endpoint: x402,
      ogInft: inft,
      ogMemory: memory,
      description,
    };
  } catch (error) {
    console.error(`Failed to resolve agent ENS for ${ensName}:`, error);
    return null;
  }
}
