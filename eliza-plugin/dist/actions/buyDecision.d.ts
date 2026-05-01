import type { Action } from "../types";
/**
 * BUY_AGENT_DECISION — call the paywalled `/api/agent/decide` endpoint via
 * x402 micropayment (0.01 USDC on Base). Demonstrates inter-agent commerce:
 * one ElizaOS agent paying another agent for verifiable on-chain reasoning.
 *
 * NOTE: This handler stops at the 402 response and surfaces the offer for
 * the user/runtime to decide whether to actually pay. A complete x402-aware
 * fetch wrapper (with the runtime's signer) belongs in the host project,
 * since key management is host-specific.
 */
export declare const buyAgentDecision: Action;
//# sourceMappingURL=buyDecision.d.ts.map