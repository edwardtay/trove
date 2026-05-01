const ADDR_RE = /0x[a-fA-F0-9]{40}/;
function extractAddress(text) {
    if (!text)
        return null;
    const m = text.match(ADDR_RE);
    return m ? m[0] : null;
}
/**
 * GET_AGENT_VERDICT — query the stable-rotator agent for its current verdict
 * on any Base USDC wallet. Returns the verdict, reason, current best pool,
 * and (if applicable) the suggested rebalance target.
 *
 * Underlying call: `GET /api/agent/tick?address=…` against a deployed
 * stable-rotator instance. Endpoint URL is configured via
 * `runtime.getSetting("STABLE_ROTATOR_URL")`.
 */
export const getAgentVerdict = {
    name: "GET_AGENT_VERDICT",
    similes: [
        "STABLE_ROTATOR_DECISION",
        "AGENT_DECISION",
        "WHAT_WOULD_THE_AGENT_DO",
        "USDC_REBALANCE_VERDICT",
    ],
    description: "Asks the stable-rotator agent (on Base) what to do with a given USDC wallet. Returns MOVE / HOLD / HARVEST + reason.",
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "What does stable-rotator say about 0xd8dA…45?" },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Asking stable-rotator…",
                    action: "GET_AGENT_VERDICT",
                },
            },
        ],
    ],
    validate: async (_runtime, message) => {
        const text = typeof message?.content?.text === "string" ? message.content.text : "";
        return ADDR_RE.test(text);
    },
    handler: async (runtime, message, _state, _options, callback) => {
        const text = typeof message?.content?.text === "string" ? message.content.text : "";
        const address = extractAddress(text);
        if (!address) {
            callback?.({ text: "I need a Base address (0x…) to query the agent." });
            return false;
        }
        const baseUrl = runtime?.getSetting?.("STABLE_ROTATOR_URL") ?? "http://localhost:3001";
        try {
            const res = await fetch(`${baseUrl}/api/agent/tick?address=${encodeURIComponent(address)}`, { method: "GET" });
            if (!res.ok) {
                callback?.({
                    text: `stable-rotator returned ${res.status} for ${address}`,
                });
                return false;
            }
            const json = (await res.json());
            const lines = [];
            lines.push(`Stable-rotator verdict for ${address.slice(0, 8)}…${address.slice(-4)}: **${(json.verdict ?? "unknown").toUpperCase()}**`);
            if (json.reason)
                lines.push(json.reason);
            if (json.current?.project) {
                lines.push(`Current: ${json.current.project} ($${json.current.balanceUsd?.toFixed(2)})`);
            }
            if (json.best?.project) {
                lines.push(`Best available: ${json.best.project} (${json.best.apyBase?.toFixed(2)}% APY)`);
            }
            callback?.({ text: lines.join("\n") });
            return true;
        }
        catch (err) {
            callback?.({
                text: `stable-rotator call failed: ${err instanceof Error ? err.message : String(err)}`,
            });
            return false;
        }
    },
};
