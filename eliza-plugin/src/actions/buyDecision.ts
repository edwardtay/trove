import type { Action } from "../types";

const ADDR_RE = /0x[a-fA-F0-9]{40}/;

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
export const buyAgentDecision: Action = {
  name: "BUY_AGENT_DECISION",
  similes: ["PAY_FOR_VERDICT", "X402_AGENT_QUERY", "PURCHASE_AGENT_DECISION"],
  description:
    "Pay 0.01 USDC via x402 to get a personalized Trove verdict. Returns the 402 offer; settle via your wallet.",

  validate: async (_runtime, message) => {
    const text =
      typeof message?.content?.text === "string" ? message.content.text : "";
    return ADDR_RE.test(text) && /buy|pay|x402|purchase|paid/i.test(text);
  },

  handler: async (runtime, message, _state, _options, callback) => {
    const text =
      typeof message?.content?.text === "string" ? message.content.text : "";
    const address = text.match(ADDR_RE)?.[0];
    if (!address) {
      callback?.({ text: "Need a Base address to buy a decision for." });
      return false;
    }
    const baseUrl =
      runtime?.getSetting?.("TROVE_URL") ?? "http://localhost:3001";

    try {
      const res = await fetch(`${baseUrl}/api/agent/decide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (res.status !== 402) {
        callback?.({
          text: `Expected x402 offer (402), got ${res.status}. Endpoint may be misconfigured.`,
        });
        return false;
      }

      const offer = (await res.json()) as {
        accepts?: Array<{
          asset?: string;
          amount?: string;
          payTo?: string;
          network?: string;
        }>;
        extensions?: { royalty?: { split?: object } };
      };
      const a = offer.accepts?.[0];
      if (!a) {
        callback?.({ text: "Payment offer was empty." });
        return false;
      }

      const lines = [
        `Trove decision is x402-paid:`,
        `· network: ${a.network}`,
        `· token: USDC (${a.asset})`,
        `· amount: ${a.amount} (= 0.01 USDC at 6 decimals)`,
        `· payTo: ${a.payTo}`,
        offer.extensions?.royalty
          ? `· revenue routes through RoyaltyRouter to the iNFT lineage (80/15/5).`
          : "",
        ``,
        `Sign an EIP-3009 transferWithAuthorization with your wallet, attach as X-PAYMENT base64, retry. The endpoint will verify the sig and return the verdict.`,
      ]
        .filter(Boolean)
        .join("\n");

      callback?.({ text: lines });
      return true;
    } catch (err) {
      callback?.({
        text: `buy_decision failed: ${err instanceof Error ? err.message : String(err)}`,
      });
      return false;
    }
  },
};
