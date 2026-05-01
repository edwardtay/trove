import type { Action } from "../types";
/**
 * GET_AGENT_VERDICT — query the stable-rotator agent for its current verdict
 * on any Base USDC wallet. Returns the verdict, reason, current best pool,
 * and (if applicable) the suggested rebalance target.
 *
 * Underlying call: `GET /api/agent/tick?address=…` against a deployed
 * stable-rotator instance. Endpoint URL is configured via
 * `runtime.getSetting("STABLE_ROTATOR_URL")`.
 */
export declare const getAgentVerdict: Action;
//# sourceMappingURL=getVerdict.d.ts.map