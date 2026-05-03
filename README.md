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

Other agents can resolve `trove.web3wagmi.eth`, fetch the records, and discover the agent's full integration footprint with no API key or signed handshake. See `src/agent-ens.ts`.

## 0G integration

| Layer | Status | Evidence |
|---|---|---|
| **Storage** | Live | Policy + decision logs uploaded via `@0gfoundation/0g-ts-sdk`; root hashes above |
| **Chain / Agentic ID** | Live | iNFT minted on Galileo, `updateMemory` + `recordDecision` txs above |
| **KV** | Read-only probe | Public testnet KV node queried; signed write path stubbed |
| **Compute** | Scaffolded | Wrapper present (`src/og-compute.ts`); broker funding gate is the live activation step |
| **DA** | Scaffolded | Client present (`src/og-da.ts`); disperser endpoint config is the live activation step |

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
