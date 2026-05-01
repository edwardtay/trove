# Trove Submission Brief

## One-Liner

Trove is a verifiable USDC yield agent on Base that can say no: it watches live lending markets, refuses unprofitable moves, stores decisions on 0G, and sells policy verdicts to other agents through x402.

## Why Judges Should Remember It

Most hackathon yield agents overclaim autonomy. Trove makes the opposite bet: fund movement should be deterministic, reproducible, and auditable. The agent uses live market/wallet reads, but its decision core is a pure policy function with tests and a 90-day benchmark. 0G is used for memory and identity, KeeperHub for scheduled execution boundaries, and x402 for agent-to-agent monetization.

## Demo Path

1. Open `https://trove.web3wagmi.com` and show live Base USDC pools.
2. Paste or connect a wallet to show real position reads.
3. Open `https://trove.web3wagmi.com/notes#simulate` and show a HOLD case where rotation is rejected.
4. Open `https://trove.web3wagmi.com/notes#status` and show live KeeperHub plus 0G receipts.
5. Call `POST /api/agent/decide` without payment to show the x402 offer.
6. Open `https://trove.web3wagmi.com/api/proof` for the machine-readable proof bundle.

## Track Fit

| Track | Why Trove Fits |
|---|---|
| 0G OpenAgents | 0G Storage decision memory, Galileo iNFT agent identity, clone lineage, deterministic verifiable reasoning |
| KeeperHub | Scheduled workflow boundary, Turnkey execution wallet model, REST/MCP workflow client, x402 buyer/seller integration |

## Criteria Matrix

| Requirement | Status | Evidence |
|---|---|---|
| Project name + short description | Ready | `Trove` + one-liner above |
| Live demo link | Ready | https://trove.web3wagmi.com |
| Public GitHub repo with README/setup | Manual final step | Push this workspace to a public repo; README has setup + architecture |
| Demo video under 3 minutes | Manual final step | Use `/notes#submission` 90-second script |
| Contract deployment addresses | Ready | 0G iNFT contract and tx links below |
| Explain protocol features/SDKs used | Ready | README `0G integration truth table`, `Integration internals`, KeeperHub section |
| iNFT explorer link + embedded memory proof | Ready | `agents(0)` stores configHash + memoryHash; explorer link below |
| KeeperHub working demo | Ready | `/api/keeperhub` auth + `helloworld` workflow call |
| KeeperHub write-up | Ready | README + `/notes#track-fit` + `keeperhub-workflow.json` |
| Team member names + contact | Manual final step | Add in ETHGlobal form; do not leave blank |

## Live Evidence

| Evidence | Link |
|---|---|
| App | https://trove.web3wagmi.com |
| Private notes / proof | https://trove.web3wagmi.com/notes |
| Machine-readable proof | https://trove.web3wagmi.com/api/proof |
| 0G iNFT contract | https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64 |
| 0G Storage policy upload | https://chainscan-galileo.0g.ai/tx/0x1df5f522a50b4608625302a0c91f83f2e46ba50a1c14b6c0d3161ae3524c39a4 |
| 0G Storage decision log upload | https://chainscan-galileo.0g.ai/tx/0xedccfcac4d96a40c6603234d5c0224d6ffc46bb2f1f0ad866b7aa04fd2512570 |

## Honest Boundaries

Trove does not claim live 0G DA, live 0G Compute inference, unattended fund movement, or MEV protection. The live submission proves the product loop, memory/identity layer, execution boundary, and payment interface. Protocol calldata adapters, funded KeeperHub tx execution, 0G Compute analysis, and RoyaltyRouter settlement are production follow-ups.

## Final Form Checklist

- Add the public GitHub URL after pushing this workspace.
- Add the demo video URL after recording with the 90-second script.
- Add solo builder name and contact details in ETHGlobal: Telegram and X for 0G, plus any email/contact requested by KeeperHub.
- Paste the 0G iNFT contract address: `0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`.
- Paste the live proof endpoint: `https://trove.web3wagmi.com/api/proof`.
