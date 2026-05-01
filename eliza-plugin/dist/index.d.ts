/**
 * @stable-rotator/eliza-plugin
 *
 * Lets ElizaOS agents query the stable-rotator yield agent for verdicts on
 * USDC wallets on Base, and pay for verifiable decisions via x402.
 *
 * Install:
 *   npm install @stable-rotator/eliza-plugin
 *
 * Wire in your character's plugins array:
 *   import { stableRotatorPlugin } from "@stable-rotator/eliza-plugin";
 *   const character = { ..., plugins: [stableRotatorPlugin] };
 *
 * Set STABLE_ROTATOR_URL in your character settings, default localhost:3001.
 */
import type { Plugin } from "./types";
import { getAgentVerdict } from "./actions/getVerdict";
import { buyAgentDecision } from "./actions/buyDecision";
export declare const stableRotatorPlugin: Plugin;
export { getAgentVerdict, buyAgentDecision };
export type { Plugin } from "./types";
export default stableRotatorPlugin;
//# sourceMappingURL=index.d.ts.map