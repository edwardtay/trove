# Trove

**A USDC yield agent on Base that earns the 1–3% per year most people leave on the table by forgetting to claim reward tokens.** Auto-rotates only when the math works. iNFT identity on 0G. x402-paid policy decisions.

> Live demo: https://trove.web3wagmi.com · Runs locally at `http://localhost:3000`. This repo also ships with `vercel.json` for Vercel-style deploys.

---


## What's verifiable on-chain right now

Real Galileo testnet artifacts. **Click any link, you'll see real txs.**

| Artifact | Address / Hash | Where |
|---|---|---|
| Policy config on 0G Storage | `0xa2f8ba42…d5848` | [tx ↗](https://chainscan-galileo.0g.ai/tx/0x1df5f522a50b4608625302a0c91f83f2e46ba50a1c14b6c0d3161ae3524c39a4) |
| Decision log on 0G Storage (5+ entries) | `0x7426fb9c…f124f` | [tx ↗](https://chainscan-galileo.0g.ai/tx/0xedccfcac4d96a40c6603234d5c0224d6ffc46bb2f1f0ad866b7aa04fd2512570) |
| StableRotatorAgent iNFT contract | `0x390c17AC…fB64` | [contract ↗](https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64) |
| Genesis agent token #0 (mint tx) | — | [tx ↗](https://chainscan-galileo.0g.ai/tx/0x4cefa6cac6aaee2d21e6786e93d7595f42a6bb78b7f3cf2b980347c0934a4972) |
| `updateMemory` on iNFT (memoryHash sync) | — | [tx ↗](https://chainscan-galileo.0g.ai/tx/0x608d186bf7c5d0717dfecdde19910005a97aa1812fcfb7b62f0436129d4bb4e8) |
| `recordDecision` on iNFT (counter++) | — | [tx ↗](https://chainscan-galileo.0g.ai/tx/0x0728a730ebd2972bb316ece22f0e27316f38f7d48b1b8cbb34b06a92196156c4) |

---

## 0G integration truth table

| 0G layer | Status | Evidence |
|---|---|---|
| Storage | **Live** | Policy config + decision log uploaded through `@0gfoundation/0g-ts-sdk`; root hashes linked above |
| Chain / Agentic ID | **Live** | `StableRotatorAgent` iNFT deployed and token #0 minted on Galileo; `updateMemory` + `recordDecision` txs linked above |
| KV | **Read-only probe wired** | Public hackathon KV node is queried; signed write path is intentionally stubbed until the tx shape is documented |
| Compute | **Scaffolded, not live** | Wrapper/scripts exist, but tested broker contracts/providers were non-operational for this Galileo flow; deterministic policy is the live verifiable reasoning path |
| DA | **Not used** | Trove is not a rollup/appchain and does not publish DA blobs; claiming DA integration would be dishonest |

---

## Why this matters (60-second pitch)

**The problem.** USDC suppliers on Aave / Compound / Morpho / Fluid / Moonwell earn 3–5% organic APY plus 1–2% in *reward tokens that nobody bothers to claim*. Most retail users never claim, eroding their effective yield by ~30%. Existing yield aggregators (Yearn V3, Idle, Origin Dollar) take 10–20% performance fees, eating most of the alpha. Coinbase / Robinhood won't ship this for regulatory reasons.

**The agent.** A disciplined allocator that auto-claims reward tokens and only rotates when the math actually pays for itself. **Two-gate policy**: (1) min APY delta vs current, (2) cost-vs-yield with a 1.5× safety margin. Refuses to act when refusing is correct. Logs every decision (move *or* hold) on 0G Storage. Identity is an ERC-7857-style iNFT on 0G Chain. Other agents pay 0.01 USDC via x402 to query its decisions.

**Why it's honest.** The simulator at `/notes#simulate` shows scenarios where the agent correctly *refuses* to fire. The benchmark at `/notes#benchmark` runs 8 strategies on real DeFiLlama 90-day history and admits real-world alpha is in single-digit bps net. We don't claim to beat passive — we claim to *match it without hindsight* and avoid the Pinned-Aave-by-default trap.

**Why this is not just hardcoded rules with sponsor logos.** The live alpha source is deliberately a deterministic rule, not an LLM. That is the right choice for fund movement: the policy must be reproducible, testable, and able to say "hold." 0G is used where determinism needs a public audit trail: policy config and decision memory live on 0G Storage, and the iNFT owns the agent identity, memory pointer, and clone lineage. KeeperHub is used where the rule needs external execution: schedule the check, retry failed RPCs, manage nonce/gas, and eventually sign tx nodes through its Turnkey organization wallet. If this were only a one-off dashboard, 0G/KeeperHub would be overkill; for a long-running paid agent, they make the rule accountable and executable.

**Where AI fits, honestly.** Trove is an agent because it loops, observes, decides, logs, sells decisions, and can be externally executed. It is not claiming live LLM/0G Compute inference. Future AI/Compute belongs above the deterministic core: explaining why a strategy is risky, summarizing cycles, detecting anomalous yield spikes, or proposing policy knob changes. The execution rule stays deterministic because that is what users and judges can verify.

**Where KeeperHub/MEV-style infra fits, honestly.** KeeperHub is automation/reliability, not a source of yield and not live MEV protection. The point is to turn "should move" into a safe execution workflow: timed trigger → read-only verdict → branch → tx node only if profitable → memory commit. MEV/private-orderflow routing would be a production upgrade for the tx node; the current submission proves the workflow boundary and payment integration without pretending that unattended fund movement is live.

**Why it fits the 0G showcase pattern.** Past highlighted 0G builds lean into verifiable agent loops: agents use 0G Compute or deterministic reasoning, store memory/proofs on 0G Storage, and expose clear on-chain execution or approval boundaries. Trove follows that pattern with a reproducible policy function, an append-only decision log on 0G Storage, an iNFT identity on 0G Chain, and a KeeperHub workflow that can automate the safe parts while leaving fund movement behind explicit calldata adapters.

## The Actual Flow

```text
1. Observe
   DeFiLlama + Base reads provide pool APY, rewards, gas, and wallet position.

2. Decide
   src/policy.ts runs a deterministic two-gate policy: APY delta and cost-vs-yield.
   This is intentionally boring because money movement should be reproducible.

3. Prove
   Store policy config + decision memory on 0G Storage.
   Commit configHash/memoryHash/decision counter to the Galileo iNFT.

4. Sell / compose
   Other agents call /api/agent/decide and pay 0.01 USDC via x402.
   The iNFT lineage gives a path to route revenue to strategy creators.

5. Execute
   KeeperHub workflow calls /api/agent/tick on schedule.
   If HOLD: log memory only.
   If MOVE/HARVEST: tx node signs through KeeperHub Turnkey wallet after adapters,
   funding, and target-chain support are confirmed.
```

## Integration internals

### 0G Storage: content-addressed agent memory

Trove persists two JSON artifact types through `src/og-storage.ts`:

| Artifact | Schema | Purpose |
|---|---|---|
| `PolicyConfig` | `stable-rotator/policy/1` | Policy knobs: APY delta, min holding period, TVL floor, safety margin, keeper fee, harvester flag, allowlist |
| `DecisionLog` | `stable-rotator/log/1` | Append-only cycle log: verdict, reason, position snapshot, best candidate, cost math, harvest math |

Upload path:

```ts
const file = await ZgFile.fromFilePath(tmpPath);
const [tree] = await file.merkleTree();
const rootHash = tree.rootHash();
const [tx] = await indexer.upload(file, ZG_RPC, signer);
```

The returned `rootHash` becomes the agent's memory pointer. The tx hash proves the artifact was uploaded to 0G Storage; the iNFT stores only the pointer, not the full JSON.

### 0G Chain / iNFT: agent identity and lineage

`contracts/StableRotatorAgent.sol` is an ERC-721 with agent-specific state:

```solidity
struct AgentData {
  string name;
  uint256 minApyDeltaBps;
  uint256 minHoldingDays;
  uint256 safetyMarginBps;
  bool harvester;
  string configHash;
  string memoryHash;
  uint256 totalDecisions;
  uint256 totalRebalances;
  uint256 totalHarvests;
  uint256 clonedFrom;
  uint256 mergedFrom;
  uint256 createdAt;
}
```

Runtime methods used by `src/og-inft.ts`:

| Method | Who can call | Why it matters |
|---|---|---|
| `updateMemory(tokenId, memoryHash)` | owner or authorized caller | Commits latest 0G Storage decision log pointer |
| `recordDecision(tokenId, kind)` | owner or authorized caller | Increments hold/rebalance/harvest counters |
| `authorizeCaller(tokenId, caller, bool)` | token owner | Future path for a KeeperHub execution address |
| `cloneAgent(sourceTokenId)` | any caller | Forks a strategy with fresh memory and lineage |
| `mergeAgents(parentA, parentB)` | any caller | Creates a child with averaged policy knobs |

This is the point of the iNFT: the strategy is not just code in a repo; it is an ownable, cloneable agent object with memory pointers and usage counters.

### x402: paid agent-to-agent decisions

`/api/agent/decide` is the seller side. It returns HTTP 402 unless the caller includes `X-PAYMENT`.

```text
POST /api/agent/decide
no X-PAYMENT
→ 402 with accepts[0]:
  scheme: exact
  network: eip155:8453
  asset: Base USDC
  amount: 10000        # 0.01 USDC
  payTo: agent wallet or RoyaltyRouter
```

The paid path verifies an EIP-3009 `TransferWithAuthorization` signature locally with `ethers.verifyTypedData`. It does not yet submit the USDC transfer to a facilitator; that is the production settlement step. The reason this still matters for the hackathon is composability: another agent can discover the price, sign the authorization, and unlock the deterministic policy verdict without an account or API key.

### KeeperHub: external execution boundary

KeeperHub is wired in `src/keeperhub.ts` and `/api/keeperhub`:

| Piece | Status | Detail |
|---|---|---|
| Auth probe | Live | `GET https://app.keeperhub.com/api/user` with `KEEPERHUB_API_KEY` |
| Free workflow | Live | Calls `POST /api/mcp/workflows/helloworld/call`, returns real `executionId` |
| Paid workflow client | Wired | Handles 402 offers and manually signs x402 EIP-3009 because `x402-fetch@1.2.0` rejects KeeperHub's `eip155:8453` format |
| Trove workflow | Specified | `keeperhub-workflow.json`: cron → `/api/agent/tick` → branch → optional tx → `/api/agent/log` → iNFT memory commit |
| Tx signing | Documented boundary | KeeperHub tx nodes sign through its organization Turnkey wallet; read-only/status calls do not need funding |

Current safe live path is read-only decisioning + logging. Unattended tx execution intentionally waits for protocol-specific calldata adapters, target-chain support confirmation, and a funded KeeperHub Turnkey wallet.

### Custody model

| Wallet / key | Role | Current use |
|---|---|---|
| User wallet via Privy | User identity and future permissioning | Demo wallet UX; not replaced by KeeperHub |
| `PRIVATE_KEY` runtime wallet | Hackathon signer for 0G uploads, iNFT updates, x402 local signatures | Used for verified artifacts and scripts |
| KeeperHub Turnkey org wallet | Future workflow tx executor | Required only for KeeperHub tx nodes, not for read-only calls |

This separation is deliberate: the agent can publish/verifiably sell decisions without custodying user funds. Fund movement should move later through a scoped smart-account permission or explicitly funded execution wallet.

---


## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  /                                                              │
│  ┌─ Hero (orbital animated SVG) ─┐  ┌─ Live "leak / capture" ─┐│
│  │  Earn the yield you're missing│  │  ~$189/yr  →  6.04% APY ││
│  └───────────────────────────────┘  └─────────────────────────┘│
│  ┌─ Live yields (sparklines, real DeFiLlama) ─────────────────┐│
│  │  1  Fluid    ▂▃▂▄▅▆  4.32% + 1.91% rwd  $11.6M           ││
│  │  2  Aave     ▄▄▄▅▄▄  3.49% organic        $20.8M           ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─ Paste any wallet, see their real position ─┐               │
│  │  0x3843…633a  →  $0 in tracked, $109 in Fluid (detected) │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─ Reward leak calculator (interactive slider) ─────────────┐ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  /notes                                                         │
│  Sticky TOC ║ 13 sections                                       │
│            ║  · Framing                                         │
│            ║  · Filter / Decision policy / Safety margin        │
│            ║  · Simulate (interactive sliders)                  │
│            ║  · Benchmark (interactive, real DeFiLlama 90d)     │
│            ║  · Findings (5 honest takeaways)                   │
│            ║  · 0G + KeeperHub integration depth                │
│            ║  · Status (live 0G Storage + KeeperHub panels)     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Endpoints (read-only)                                          │
│  GET  /api/positions?address=0x…    on-chain USDC positions    │
│  GET  /api/agent/tick?address=0x…   verdict + tx payload       │
│  POST /api/agent/log                upload to 0G Storage        │
│  GET  /api/keeperhub                KH auth + free call status  │
│  GET  /api/keeperhub/call?slug=…    invoke any KH workflow      │
│  POST /api/agent/decide  ⭐         x402-PAID seller endpoint   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Run it

```bash
git clone <repo>
cd ethglobal-openagents-2
npm install --legacy-peer-deps   # React 19 / wagmi peer-dep conflict
cp .env.example .env.local       # add PRIVATE_KEY (Galileo testnet)
npm run dev                       # http://localhost:3000
```

To exercise the on-chain side end-to-end:

```bash
npm run og:upload-policy    # uploads PolicyConfig → 0G Storage
npm run og:log-decision     # full cycle: DeFiLlama → policy → log → iNFT
npm run og:deploy-inft      # deploys StableRotatorAgent.sol to Galileo
npm run og:mint-agent       # mints token #0 with the configHash
npm run og:deploy-router    # deploys RoyaltyRouter.sol
```

---

## What's deliberately honest

- **Stablecoin yield rotation is a saturated space.** Yearn V3, Idle, OUSD, Sommelier all do most of this. Our differentiator isn't novelty — it's the **accounting layer** (simulator + benchmark + honest "refuses to act" log) and the **two-sided x402 economy** (other agents can pay us).
- **Real-world alpha is small.** On 90-day DeFiLlama backtest, the agent's lift over Pinned-Aave is ~3 bps net at $10k. We don't hide this; the benchmark page surfaces it.
- **0G Compute is scaffolded but not live.** The wrapper and scripts are present, but tested broker contracts/providers were non-operational for this Galileo flow. The live verifiable path is deterministic policy + 0G Storage + iNFT commits.
- **0G DA is not integrated.** Trove is an app using 0G Storage and 0G Chain, not a rollup/appchain publishing data availability blobs.
- **x402 settlement** is verified locally (signature recovery via `ethers.verifyTypedData`) but doesn't yet submit the on-chain `transferWithAuthorization`. Production would forward the signed authorization to a Coinbase facilitator.

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15 App Router · React 19 · Tailwind v3 · Inter variable font · `lucide-react` icons |
| Wallet | Privy for user wallet/auth; KeeperHub uses a Turnkey organization wallet for tx workflow execution |
| On-chain reads | `viem` multicall against Base public RPC + Blockscout REST for auto-discovery |
| Smart contracts | Solidity 0.8.27 · OpenZeppelin v5 · Hardhat 2.28 |
| 0G Storage | `@0gfoundation/0g-ts-sdk@1.2.6` (Indexer + ZgFile + merkleTree) |
| 0G Compute | `@0glabs/0g-serving-broker@2.0.0` wrapper present; not a live dependency |
| 0G KV | Public hackathon node JSON-RPC at `178.238.236.119:6789` (read-only probe) |
| Yields data | DeFi Llama API (`/pools` + `/chart/{poolId}`) |
| KeeperHub | REST API at `app.keeperhub.com/api` + custom EIP-3009 x402v2 client (`src/keeperhub.ts`) |
| Sim engine | Pure TS, deterministic per-seed `mulberry32` PRNG, real DeFiLlama history overlay |

Required env vars for the full demo:

- `PRIVATE_KEY` for 0G Storage uploads, iNFT actions, and x402 signing
- `KEEPERHUB_API_KEY` for the live KeeperHub status panel and workflow calls
- `NEXT_PUBLIC_PRIVY_APP_ID` for real wallet connect instead of demo mode
- `NEXT_PUBLIC_SITE_URL` after deployment, so x402 offers point at the live app

KeeperHub Turnkey note: the Turnkey wallet is configured and funded inside the KeeperHub organization wallet UI, not via this repo's `.env`. Funding is only needed for tx workflow nodes; read-only monitoring and the verified `helloworld` call do not need it.

---

## 90-second demo script

0-15s: Open `/`. Show live Base USDC yield scan, ranked pools, reward APY, and the agent's current cycle status.

15-30s: Paste or select a sample wallet. Show real on-chain positions, the personalized reward leak, and the MOVE/HOLD recommendation.

30-45s: Click the paid verdict flow. Show `/api/agent/decide` returning a structured x402 offer, then a signed payment unlocking the agent's decision.

45-60s: Open `/notes#simulate`. Move the sliders to show the two-gate policy refusing bad rotations when gas/slippage exceeds the extra yield.

60-75s: Open `/notes#benchmark`. Show the 90-day DeFiLlama benchmark and call out the honest finding: small but measurable bps, no hindsight.

75-90s: Open `/notes#status` and `/agents`. Show 0G Storage hashes, the live Galileo iNFT contract, memory updates, decision counter, cloneable variants, and KeeperHub workflow status.

---

## Files of interest for code review

| File | What it does |
|---|---|
| `src/policy.ts` | Two-gate decision policy + safety margin |
| `src/benchmark.ts` | 8-strategy simulator with harvester logic |
| `src/keeperhub.ts` | Two-sided x402 client (buyer + helpers for seller verification) |
| `src/og-storage.ts` | 0G Storage wrapper (upload/download by rootHash) |
| `src/og-inft.ts` | iNFT contract bindings (`updateMemory`, `recordDecision`) |
| `contracts/StableRotatorAgent.sol` | ERC-7857-inspired iNFT |
| `contracts/RoyaltyRouter.sol` | 80/15/5 split router across iNFT lineage |
| `app/api/agent/decide/route.ts` | x402-PAID seller endpoint with EIP-712 sig verifier |
| `app/notes/page.tsx` | Master document — 13 sections, sticky TOC, embedded simulator + benchmark |

---


## License

MIT
