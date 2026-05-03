# Trove

**A verifiable USDC yield agent on Base.** Auto-claims reward tokens, only rotates when the math works, refuses to act when refusing is correct. iNFT identity on 0G. ENS-resolvable. x402-paid policy decisions.

Live demo · [trove.web3wagmi.com](https://trove.web3wagmi.com)
Machine-readable proof · [`/api/proof`](https://trove.web3wagmi.com/api/proof)
Agent identity · [`trove.web3wagmi.eth`](https://app.ens.domains/trove.web3wagmi.eth)

---

## Verifiable artifacts

Real on-chain references — every link resolves to a real transaction or contract.

| Artifact | Reference |
|---|---|
| Policy config (0G Storage) | [`0xa2f8ba42…d5848`](https://chainscan-galileo.0g.ai/tx/0x1df5f522a50b4608625302a0c91f83f2e46ba50a1c14b6c0d3161ae3524c39a4) |
| Decision log (0G Storage) | [`0x7426fb9c…f124f`](https://chainscan-galileo.0g.ai/tx/0xedccfcac4d96a40c6603234d5c0224d6ffc46bb2f1f0ad866b7aa04fd2512570) |
| iNFT contract (0G Galileo) | [`0x390c17AC…fB64`](https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64) |
| Genesis agent token #0 mint | [tx](https://chainscan-galileo.0g.ai/tx/0x4cefa6cac6aaee2d21e6786e93d7595f42a6bb78b7f3cf2b980347c0934a4972) |
| `updateMemory` (memoryHash sync) | [tx](https://chainscan-galileo.0g.ai/tx/0x608d186bf7c5d0717dfecdde19910005a97aa1812fcfb7b62f0436129d4bb4e8) |
| `recordDecision` (counter++) | [tx](https://chainscan-galileo.0g.ai/tx/0x0728a730ebd2972bb316ece22f0e27316f38f7d48b1b8cbb34b06a92196156c4) |

## How it works

```
Observe   →  DeFiLlama pool yields + on-chain wallet positions (viem multicall)
Decide    →  Deterministic two-gate policy (APY delta + cost-vs-yield)
Prove     →  Append decision to 0G Storage log; commit hash to iNFT memoryHash
Sell      →  /api/agent/decide returns 402 unless caller pays 0.01 USDC via x402
Execute   →  KeeperHub workflow calls /api/agent/tick on schedule; tx nodes
             sign through KeeperHub Turnkey wallet behind protocol adapters
```

The decision core is a pure function (`src/policy.ts`) with 25 unit tests. Money movement is reproducible by design.

## ENS identity

Trove is discoverable via ENS text records on `trove.web3wagmi.eth`:

| Record | Purpose |
|---|---|
| `description`, `url`, `com.github`, `avatar` | Standard discovery |
| `x402-endpoint` | Paid decision endpoint URL |
| `0g-inft` | `chainId:contract:tokenId` of the agent's identity NFT |
| `0g-storage-policy` | Latest policy config root on 0G Storage |
| `0g-memory` | Latest decision-log root on 0G Storage |

Other agents can resolve `trove.web3wagmi.eth`, fetch the records, and discover the agent's full integration footprint with no API key or signed handshake.

The route `/agent/<ens-name>` resolves any ENS name to a Trove-style agent profile — `agent-0.trove.web3wagmi.eth` is the genesis iNFT subname; any team publishing the same record schema becomes Trove-compatible automatically. See `src/agent-ens.ts` and `app/agent/[name]/page.tsx`.

## Auto-claim rewards (Aave + Merkl + KeeperHub)

Trove's headline pitch — "auto-claims reward tokens you'd forget" — is implemented end-to-end:

1. `/api/agent/rewards?address=0x…` queries Aave V3's RewardsController **and** Merkl's distributor on Base. Returns unclaimed amounts with USD valuations (CoinGecko primary, DefiLlama fallback) plus a pre-built batched claim transaction.
2. UI panel surfaces the data — visible for any wallet lookup. "Claim now (you sign)" button enabled when the connected user matches the lookup.
3. For unattended auto-claim: user calls Aave's `setClaimer(user, KEEPERHUB_TURNKEY_WALLET)` once via the in-UI button. KeeperHub's cron workflow then claims rewards on-behalf forever. Merkl path requires no setClaimer (proofs hardcode recipient).
4. Configured KeeperHub Turnkey wallet: `0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd`. Workflow JSON in `keeperhub-workflow.json` (13 nodes, parallel branches, cross-chain Base + 0G Galileo).

## What's new (recent additions)

- **ENS-resolved agent profile route**: `/agent/<ens-name>` renders any agent published with the schema
- **In-UI verifier**: `/notes` and homepage panel let visitors paste a decision-log root and watch Trove fetch + replay the policy live
- **Aave + Merkl rewards**: combined endpoint with USD totals, pre-built claim tx
- **`payToENS` x402 field**: x402 offers include the ENS name pointing at the recipient — defends against offer tampering
- **iNFT identity card** on homepage: live decision counters + memory hash, reads on-chain
- **KeeperHub workflow** with delegated Aave claim path + Merkl claim node
- **Honest boundaries** maintained: every "scaffolded" feature documented, every activation gate named

## 0G integration

| Layer | Status | Evidence |
|---|---|---|
| **Storage** | Live | Policy + decision logs uploaded via `@0gfoundation/0g-ts-sdk`; root hashes above |
| **Chain / Agentic ID** | Live | iNFT minted on Galileo, `updateMemory` + `recordDecision` txs above |
| **KV** | Read-only probe | Public testnet KV node queried; signed write path stubbed |
| **Compute** | Scaffolded | Wrapper present (`src/og-compute.ts`); broker funding gate is the live activation step |
| **DA** | Scaffolded | Client present (`src/og-da.ts`); disperser endpoint config is the live activation step |

## Auto-claim rewards (KeeperHub + Aave)

Trove's headline pitch — "auto-claims reward tokens you'd forget" — is implemented end-to-end via Aave V3's delegated-claimer flow plus a KeeperHub workflow:

```
ONE-TIME (user signs once):
  user → Aave RewardsController.setClaimer(user, KEEPERHUB_TURNKEY_WALLET)

EVERY 15 MIN (KeeperHub cron):
  1. GET /api/agent/rewards?address=USER  →  unclaimed amounts + claim tx
  2. If unclaimed > 0  →  KeeperHub Turnkey signs claimAllRewardsOnBehalf
  3. Rewards land in user's wallet
  4. POST /api/agent/log  →  upload to 0G Storage
  5. iNFT.updateMemory  →  commit new memoryHash on Galileo
```

The `setClaimer` permission only allows claiming, not redirecting — proceeds always go to the user's wallet, never KeeperHub's. See `keeperhub-workflow.json` for the full workflow definition. Live activation requires (a) user calling `setClaimer`, (b) KeeperHub's Turnkey wallet funded with Base ETH for gas (~$5 buys ~30 claims).

Configured KeeperHub Turnkey claimer address: `0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd`

## Run locally

```bash
git clone https://github.com/edwardtay/trove.git
cd trove
npm install --legacy-peer-deps
cp .env.example .env.local      # set PRIVATE_KEY (Galileo testnet)
npm run dev                      # http://localhost:3000
```

End-to-end on-chain exercises:

```bash
npm run og:upload-policy        # PolicyConfig → 0G Storage
npm run og:log-decision         # full cycle: pools → policy → log → iNFT
npm run og:deploy-inft          # deploy StableRotatorAgent.sol to Galileo
npm run og:mint-agent           # mint token #0
```

## Verify any decision independently

The `verify-decision` script proves Trove's "verifiable" claim is real — anyone can take a decision-log root from 0G Storage and replay the deterministic policy locally to confirm the recorded verdict reproduces:

```bash
npm run verify-decision -- 0x7426fb9ca3e5f81237612c31bbcb7fba330f41679c6df18ca09824dc2fff124f
# → fetches log from 0G Storage, replays shouldRebalance() per entry,
#   reports PASS/MISMATCH per cycle, exits 0 if all reproduce.
```

This is the falsifiable form of "deterministic policy" — anyone, anytime, can run this against any historical decision and either confirm or expose a discrepancy.

## Endpoints

```
GET   /api/positions?address=0x…     on-chain USDC positions
GET   /api/agent/tick?address=0x…    verdict + tx payload (read-only)
POST  /api/agent/decide              x402-paid seller endpoint
POST  /api/agent/log                 upload decision to 0G Storage
GET   /api/agent/discover?name=…     resolve agent profile from ENS
GET   /api/keeperhub                 KeeperHub auth + free workflow probe
GET   /api/ens/reverse?address=0x…   reverse-resolve address → ENS name
GET   /api/proof                     full integration proof bundle
```

## Tech stack

- **Frontend** — Next.js 15 App Router, React 19, Tailwind, Privy wallet
- **On-chain** — Solidity 0.8.27, OpenZeppelin v5, Hardhat, viem multicall
- **0G** — `@0gfoundation/0g-ts-sdk` (Storage), `@0glabs/0g-serving-broker` (Compute)
- **ENS** — viem mainnet client, server-side reverse cache (5min TTL)
- **Yields** — DeFiLlama API, real 90-day backtest engine

Required env vars: `PRIVATE_KEY` (Galileo testnet), `KEEPERHUB_API_KEY`, `NEXT_PUBLIC_PRIVY_APP_ID`, `NEXT_PUBLIC_SITE_URL`. See `.env.example`.

## Honest boundaries

- **Real-world alpha is small.** Backtest shows ~3 bps net lift over Pinned-Aave at $10k principal. The benchmark page surfaces this, doesn't hide it.
- **0G Compute and 0G DA are scaffolded, not yet active in production.** Wrapper code is committed; activation requires broker funding and disperser endpoint config respectively. The live verifiable reasoning path is the deterministic policy.
- **x402 settlement is locally verified.** Signature recovery works (`ethers.verifyTypedData`); on-chain `transferWithAuthorization` submission to a facilitator is the production step.
- **No unattended user fund movement.** KeeperHub tx nodes require funded Turnkey wallet and protocol-specific calldata adapters before live execution.

## Deploy

- **CapRover** — `Dockerfile` + `captain-definition` ready
- **Vercel** — `vercel.json` ready (set the `@-prefixed` secrets via dashboard)
- **Self-hosted Docker** — multi-stage build, alpine runtime, ~252MB image

## License

MIT
