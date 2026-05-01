/**
 * @trove/eliza-plugin
 *
 * Lets ElizaOS agents query the Trove yield agent for verdicts on
 * USDC wallets on Base, and pay for verifiable decisions via x402.
 *
 * Install:
 *   npm install @trove/eliza-plugin
 *
 * Wire in your character's plugins array:
 *   import { trovePlugin } from "@trove/eliza-plugin";
 *   const character = { ..., plugins: [trovePlugin] };
 *
 * Set TROVE_URL in your character settings, default localhost:3001.
 */

import type { Plugin } from "./types";
import { getAgentVerdict } from "./actions/getVerdict";
import { buyAgentDecision } from "./actions/buyDecision";

export const trovePlugin: Plugin = {
  name: "trove",
  description:
    "Query Trove (USDC yield agent on Base) for verdicts and reward-leak analysis. Pay for decisions via x402 micropayments.",
  actions: [getAgentVerdict, buyAgentDecision],
  evaluators: [],
  providers: [],
};

export { getAgentVerdict, buyAgentDecision };
export type { Plugin } from "./types";

export default trovePlugin;
