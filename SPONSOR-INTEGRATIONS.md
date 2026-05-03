# Sponsor Integrations — Trove

This document maps each sponsor protocol/API to the exact code that uses it. Every link is a GitHub permalink (master branch).

Repo: https://github.com/edwardtay/trove
Live demo: https://trove.web3wagmi.com
Proof bundle (live): https://trove.web3wagmi.com/api/proof

---

## 1. 0G (OpenAgents track)

Trove uses **four** 0G primitives for persistent memory, identity, verifiable inference, and data availability.

### 1a. 0G Storage — persistent decision log + policy config

**What we use:** `@0gfoundation/0g-ts-sdk` (`Indexer`, `Blob`) to upload immutable JSON blobs and retrieve them by root hash. Every cycle writes a fresh `DecisionLog` blob; the new root hash becomes the iNFT's `memoryHash`.

| Code | Lines |
|---|---|
| Storage wrapper class (`StableRotatorStorage`) | [`src/og-storage.ts`](https://github.com/edwardtay/trove/blob/master/src/og-storage.ts) |
| Cycle writes to 0G Storage | [`app/api/agent/log/route.ts:129`](https://github.com/edwardtay/trove/blob/master/app/api/agent/log/route.ts#L129) |
| Retrieve by root for replay | [`app/api/agent/verify/route.ts:48`](https://github.com/edwardtay/trove/blob/master/app/api/agent/verify/route.ts#L48) |
| CLI: `npm run verify-decision <root>` | [`scripts/verify-decision.ts`](https://github.com/edwardtay/trove/blob/master/scripts/verify-decision.ts) |
| Encrypted policy blobs (NaCl secretbox) | [`src/og-encryption.ts`](https://github.com/edwardtay/trove/blob/master/src/og-encryption.ts) |

**Live proof:** Latest log root visible at https://trove.web3wagmi.com/api/decisions (field: `latestRoot`). Verify reproduces it: https://trove.web3wagmi.com/api/agent/verify?root=<latestRoot>.

---

### 1b. 0G Galileo iNFT — agent identity + on-chain counters

**What we use:** Custom ERC-7857-inspired contract (`StableRotatorAgent.sol`) deployed to **0G Galileo testnet (chainId 16602)**. Each token = one autonomous agent. Stores: `name`, `configHash`, `memoryHash`, decision counters, policy params. Cron tick calls `updateMemory()` + `recordDecision()` every cycle so counters grow over time.

| Code | Lines |
|---|---|
| Contract source | [`contracts/StableRotatorAgent.sol`](https://github.com/edwardtay/trove/blob/master/contracts/StableRotatorAgent.sol) |
| `recordDecision` increments counters | [`contracts/StableRotatorAgent.sol`](https://github.com/edwardtay/trove/blob/master/contracts/StableRotatorAgent.sol) (search `recordDecision`) |
| Reader / writer wrapper | [`src/og-inft.ts`](https://github.com/edwardtay/trove/blob/master/src/og-inft.ts) |
| Auto-commit per cron cycle | [`app/api/agent/log/route.ts:147-167`](https://github.com/edwardtay/trove/blob/master/app/api/agent/log/route.ts#L147-L167) |
| Live state endpoint | [`app/api/agent/inft/route.ts`](https://github.com/edwardtay/trove/blob/master/app/api/agent/inft/route.ts) |
| OpenSea-style metadata | [`app/api/inft/metadata/[tokenId]/route.ts`](https://github.com/edwardtay/trove/blob/master/app/api/inft/metadata/%5BtokenId%5D/route.ts) |
| Deploy script | [`scripts/deploy-inft.ts`](https://github.com/edwardtay/trove/blob/master/scripts/deploy-inft.ts) |

**Contract:** `0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64` · [chainscan](https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64)
**Token #0:** stable-rotator-genesis
**Live state JSON:** https://trove.web3wagmi.com/api/agent/inft

> Note: chainscan token page shows token info but no metadata image because this contract is ERC-7857-inspired — rich state lives in the custom `agents(tokenId)` getter, not standard `tokenURI()`. The endpoints above expose that state in machine-readable JSON.

---

### 1c. 0G Compute — verifiable LLM second opinion

**What we use:** `@0glabs/0g-serving-broker` to send a structured prompt to a 0G Compute provider every cycle. The LLM returns a recommendation + reasoning, run **in parallel** to the deterministic policy. Trove records both in the decision log so a judge can compare "policy says X, LLM-on-0G said Y" for every cycle — verifiable, not vibes.

| Code | Lines |
|---|---|
| Broker initialization, fund deposit, signer ack | [`src/og-compute.ts:50-145`](https://github.com/edwardtay/trove/blob/master/src/og-compute.ts#L50) |
| Per-cycle inference call (parallel to policy) | [`app/api/agent/tick/route.ts:135-156`](https://github.com/edwardtay/trove/blob/master/app/api/agent/tick/route.ts#L135) |
| Output schema | `recommendation`, `reasoning`, `model`, `provider` returned in tick response |

**Live proof:** Tick endpoint returns `ogCompute` block: https://trove.web3wagmi.com/api/agent/tick?address=0x38430336153468dcf36af5cea7d6bc472425633a

---

### 1d. 0G Data Availability — decision input publication

**What we use:** Scaffolded — publishes per-cycle decision inputs (pools considered, positions, policy snapshot) so anyone can independently replay against the same data. The DA endpoint integration is implemented but **honestly disclosed as `notClaimed: ["0G DA publication unreachable from this deployment"]`** in `/api/proof.integrationTruth`. Code is production-ready; testnet endpoint resolution is the gap.

| Code | Lines |
|---|---|
| DA wrapper class | [`src/og-da.ts`](https://github.com/edwardtay/trove/blob/master/src/og-da.ts) |
| Publish call per cycle | [`app/api/agent/tick/route.ts:91-119`](https://github.com/edwardtay/trove/blob/master/app/api/agent/tick/route.ts#L91) |
| Honest disclosure in proof bundle | [`app/api/proof/route.ts`](https://github.com/edwardtay/trove/blob/master/app/api/proof/route.ts) |

---

## 2. ENS

Trove is **discoverable + addressable + introspectable** entirely through ENS — no off-chain registry, no API key needed.

### 2a. Text records on `trove.web3wagmi.eth`

**What we use:** ENS public resolver `text(node, key)` reads to expose 8 agent-discovery records. Anyone publishing the same record schema becomes Trove-compatible automatically.

| Record | Purpose |
|---|---|
| `description`, `url`, `com.github`, `avatar` | Standard discovery |
| `x402-endpoint` | Where to call for paid decisions |
| `0g-config`, `0g-memory` | 0G Storage roots for policy + log |
| `0g-inft` | iNFT contract + tokenId pointer |

| Code | Lines |
|---|---|
| ENS resolver + record schema | [`src/agent-ens.ts`](https://github.com/edwardtay/trove/blob/master/src/agent-ens.ts) |
| Set records (one-time setup) | [`scripts/ens-set-records.ts`](https://github.com/edwardtay/trove/blob/master/scripts/ens-set-records.ts) |
| Live consumer in proof bundle | [`app/api/proof/route.ts:46`](https://github.com/edwardtay/trove/blob/master/app/api/proof/route.ts#L46) |

**Live proof:** https://app.ens.domains/trove.web3wagmi.eth (look at "Records" tab)

---

### 2b. Reverse resolution — `address → name`

**What we use:** ENS reverse resolver to display human-readable agent names instead of addresses. Used on the Discover page and the universal `/agent/<name>` route.

| Code | Lines |
|---|---|
| Reverse lookup endpoint | [`app/api/ens/reverse/route.ts`](https://github.com/edwardtay/trove/blob/master/app/api/ens/reverse/route.ts) |
| Used in agent discovery | [`app/AgentDiscover.tsx`](https://github.com/edwardtay/trove/blob/master/app/AgentDiscover.tsx) |

**Live proof:** https://trove.web3wagmi.com/api/ens/reverse?address=0x38430336153468dcf36af5cea7d6bc472425633a

---

### 2c. Universal `/agent/<ens-name>` route

**What we use:** Any ENS name with the right text records resolves to a Trove-style agent profile page. `agent-0.trove.web3wagmi.eth` is the genesis subname; clones get their own subnames.

| Code | Lines |
|---|---|
| Profile page (server-rendered) | [`app/agent/[name]/page.tsx`](https://github.com/edwardtay/trove/blob/master/app/agent/%5Bname%5D/page.tsx) |
| Subname mint (one-time) | [`scripts/ens-create-subname.ts`](https://github.com/edwardtay/trove/blob/master/scripts/ens-create-subname.ts) |

**Live proof:** https://trove.web3wagmi.com/agent/trove.web3wagmi.eth

---

## 3. KeeperHub

KeeperHub is the **execution boundary** — the schedule + retry + Turnkey-signed tx layer that executes actions Trove decides on. The deterministic policy is in our app; KeeperHub does cron, gas, nonce, and signing.

### 3a. Cron workflow JSON

**What we use:** A 13-node KeeperHub workflow that fires every 15 min, calls Trove's `/api/agent/tick` for the verdict, conditionally executes rebalance + harvest tx nodes, and finally commits the new memoryHash to the iNFT via the `commit_inft` node.

| Code | Lines |
|---|---|
| Workflow JSON (13 nodes) | [`keeperhub-workflow.json`](https://github.com/edwardtay/trove/blob/master/keeperhub-workflow.json) |
| KeeperHub API client | [`src/keeperhub.ts`](https://github.com/edwardtay/trove/blob/master/src/keeperhub.ts) |
| Live status reporter (workflow ID, Turnkey wallet, free-tier check) | [`src/keeperhub-status.ts`](https://github.com/edwardtay/trove/blob/master/src/keeperhub-status.ts) |

**Workflow nodes** (in the JSON):
1. `tick_decide` — calls our `/api/agent/tick`
2. `branch_action` — splits into harvest / rebalance / iNFT-commit
3. `harvest_*` — Aave/Merkl claim execution
4. `rebalance_*` — withdraw + supply on protocol adapter
5. `commit_inft` — calls our `/api/agent/log` to upload to 0G + grow iNFT counters

`wait_mode: any_complete` lets parallel branches converge cleanly.

---

### 3b. Turnkey-signed delegated claims

**What we use:** KeeperHub's per-user Turnkey wallet (`0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd`) is authorized via Aave V3 RewardsController's `setClaimer(user, claimer)`. Once authorized, KeeperHub calls `claimAllRewardsOnBehalf(user, …)` — proceeds always go to the user's wallet, never to KeeperHub. Permission is claim-only, revocable.

| Code | Lines |
|---|---|
| `setClaimer` calldata builder | [`src/aave-rewards.ts:89`](https://github.com/edwardtay/trove/blob/master/src/aave-rewards.ts#L89) |
| `claimAllRewardsOnBehalf` builder | [`src/aave-rewards.ts:74`](https://github.com/edwardtay/trove/blob/master/src/aave-rewards.ts#L74) |
| In-UI authorize flow | [`app/AuthorizeAutoClaim.tsx`](https://github.com/edwardtay/trove/blob/master/app/AuthorizeAutoClaim.tsx) |
| Rewards endpoint that returns both txs | [`app/api/agent/rewards/route.ts`](https://github.com/edwardtay/trove/blob/master/app/api/agent/rewards/route.ts) |

**Live proof:** GET https://trove.web3wagmi.com/api/agent/rewards?address=<wallet>&claimer=0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd → returns both `claimTx` (manual) and `setClaimerTx` (one-time delegate).

---

### 3c. Memory commit loop

After KeeperHub executes any tx, the workflow's `commit_inft` node calls our `/api/agent/log` which:
1. Uploads the updated decision log to 0G Storage → returns new root hash
2. Calls `iNFT.updateMemory(tokenId, newRootHash)` on 0G Galileo
3. Calls `iNFT.recordDecision(tokenId, kind)` to increment counters

This is the loop that keeps the iNFT's on-chain memory in sync with the agent's actual decisions.

| Code | Lines |
|---|---|
| Log endpoint with on-chain commits | [`app/api/agent/log/route.ts`](https://github.com/edwardtay/trove/blob/master/app/api/agent/log/route.ts) |

**Live proof:** Each cron tick produces a 0G Storage tx + an iNFT `updateMemory` tx + an iNFT `recordDecision` tx. Visible on chainscan-galileo by following any recent `inftCommit` field in the log response.

---

## Quick verification checklist for judges

```bash
# 0G Storage — replay any historic decision
curl -s https://trove.web3wagmi.com/api/decisions | jq .latestRoot
curl -s "https://trove.web3wagmi.com/api/agent/verify?root=<above>" | jq .allReproduce  # → true

# 0G iNFT — live counters grow each cycle
curl -s https://trove.web3wagmi.com/api/agent/inft | jq .agent.totalDecisions

# 0G Compute — LLM second opinion in tick response
curl -s "https://trove.web3wagmi.com/api/agent/tick?address=0x38430336153468dcf36af5cea7d6bc472425633a" | jq .ogCompute

# ENS — text records + reverse + agent profile
curl -s https://trove.web3wagmi.com/api/ens/reverse?address=0x38430336153468dcf36af5cea7d6bc472425633a | jq
curl -sI https://trove.web3wagmi.com/agent/trove.web3wagmi.eth  # 200

# KeeperHub — workflow JSON + Turnkey-signed claims
cat keeperhub-workflow.json | jq '.nodes | length'  # 13
curl -s "https://trove.web3wagmi.com/api/agent/rewards?address=0x38430336153468dcf36af5cea7d6bc472425633a&claimer=0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd" | jq .setClaimerTx.to
```

All endpoints are live now and return JSON-shaped proof you can pipe into `jq`.
