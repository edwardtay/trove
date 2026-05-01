# @trove/eliza-plugin

ElizaOS plugin that lets your agent query **Trove** — a USDC yield agent on Base — for verdicts and pay for verifiable decisions via x402 micropayments.

## What it adds

| Action | Description |
|---|---|
| `GET_AGENT_VERDICT` | Read-only — calls `/api/agent/tick`, returns the agent's verdict (`MOVE` / `HOLD` / `HARVEST`) for any Base USDC wallet |
| `BUY_AGENT_DECISION` | x402-paid — surfaces the 0.01 USDC payment offer for the host runtime to settle. The host's wallet signs EIP-3009 `transferWithAuthorization`, attaches as `X-PAYMENT` base64, gets back a personalized verdict |

## Install

```bash
npm install @trove/eliza-plugin
```

## Wire into your character

```ts
import { trovePlugin } from "@trove/eliza-plugin";

export const character = {
  name: "Treasurer",
  // ... rest of character ...
  plugins: [trovePlugin],
  settings: {
    secrets: {
      TROVE_URL: "https://your-trove.example.com",
    },
  },
};
```

## Example dialog

```
user: "What does Trove say about 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045?"

agent (calls GET_AGENT_VERDICT):
  Trove verdict for 0xd8dA…6045: HOLD
  no position; would supply to fluid-lending at 3.77% organic
  Best available: fluid-lending (3.77% APY)

user: "Buy me a verdict for that address"

agent (calls BUY_AGENT_DECISION):
  Trove decision is x402-paid:
  · network: eip155:8453
  · token: USDC (0x833589fc…)
  · amount: 10000 (= 0.01 USDC at 6 decimals)
  · payTo: 0x15ECEE34…
  · revenue routes through RoyaltyRouter to the iNFT lineage (80/15/5).

  Sign an EIP-3009 transferWithAuthorization with your wallet, attach as
  X-PAYMENT base64, retry. The endpoint will verify the sig and return
  the verdict.
```

## How it pairs with KeeperHub

Trove is itself **registered as a KeeperHub workflow** (`stable-rotator-cycle` — slug preserved from registration). When your ElizaOS agent calls `BUY_AGENT_DECISION`, it's hitting the same x402-paywalled endpoint that KeeperHub workflows hit. **One x402 surface, two entry points** — direct API for ElizaOS, automation DAG for KeeperHub.

## License

MIT
