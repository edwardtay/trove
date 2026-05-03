# Demo Video Script — Trove (90 seconds, with live on-chain claim)

Built around a specific user pain point: **"I deposited USDC into Aave on Base and forgot to claim the reward tokens that pile up on top."** Show the problem, show Trove detect it, **execute a real claim live on camera**, show the verifiable architecture. No abstract pitching.

---

## Pre-recording checklist (~5 min)

**1. Wallet ready**
- MetaMask installed, the account `0x38430336153468dcf36af5cea7d6bc472425633a` (your `edwardtay.eth`) selected
- Has at least $1 in Base ETH for gas (~$0.10 claim tx)
- Connected to **Base mainnet** in MetaMask

**2. Verify rewards are still claimable BEFORE recording** (Merkl epochs reset every few hours)
```bash
curl -s "https://trove.web3wagmi.com/api/agent/rewards?address=0x38430336153468dcf36af5cea7d6bc472425633a" \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'Claimable: {len(d[\"unclaimed\"])} reward tokens')"
```
If `Claimable: 0` → wait for next Merkl root or use a different wallet

**3. Tabs open in order (left → right)**
1. `https://trove.web3wagmi.com/` — homepage (NOT logged in yet)
2. `https://app.aave.com/` — same wallet's Aave dashboard
3. `https://trove.web3wagmi.com/api/proof` — proof bundle (JSON view)
4. Terminal window — for the verify command

---

## Script (~95 seconds)

### 0–10s · OPEN ON THE PROBLEM (no logos, no team intro)

**Voice-over:**
> "If you've supplied USDC to Aave on Base, you probably have unclaimed reward tokens piling up. Most people never claim. That's the problem Trove solves."

**Screen:** Black or just `app.aave.com` showing the user's wallet with the "Available rewards" total visible. Highlight that number.

---

### 10–25s · DEMO 1 — Trove sees the same data

**Action:** Switch to `trove.web3wagmi.com`. Paste your wallet address into the "What you have right now" input. Click check.

**Voice-over:**
> "Paste any wallet — Trove finds every DeFi position. Aave, Morpho vaults, Sky USDS — $79 across four protocols. Below: the same unclaimed Merkl rewards Aave's UI shows. Same source — Merkl's distributor on Base. The agent says HOLD because the APY delta isn't worth the gas to rebalance."

**Screen:** Position table loads, scroll past it to the Unclaimed Rewards panel showing 4 Merkl tokens (sUP, YO, SUMR, WELL).

---

### 25–45s · DEMO 2 — REAL on-chain claim, live (the wow moment)

**Action:**
1. Click **Connect wallet** top-right → choose MetaMask → approve
2. The "Connect this wallet to claim" button changes to **"Claim now (you sign)"**
3. Click it → MetaMask popup appears
4. Confirm in MetaMask → tx submits to Base

**Voice-over:**
> "Connect MetaMask. The agent prepared a single batched claim transaction for all four reward tokens — one signature, one tx, all four collected. Submitting now to Base. … Done. Tokens land in the wallet."

**Screen:** Show the MetaMask popup, then the success state showing the basescan tx hash. Briefly switch to basescan to show the tx confirmed.

---

### 45–60s · DEMO 3 — set-and-forget via KeeperHub

**Action:** Scroll to the indigo "Authorize auto-claim" panel. Don't actually sign — just gesture at the button.

**Voice-over:**
> "For users who'd rather not click every time: one signature here authorizes KeeperHub's wallet to claim on your behalf. From then on, KeeperHub's cron runs every 15 minutes — checks Merkl, claims if anything's available, logs to 0G Storage, updates the iNFT. Proceeds always go to your wallet, never to KeeperHub. Permission is claim-only, revocable."

**Screen:** Authorize panel visible. Briefly show the workflow JSON file in GitHub — scroll past the 13 nodes.

---

### 60–75s · DEMO 4 — verifiable, not just claimed

**Action:** Switch to terminal. Run:
```bash
npm run verify-decision -- 0x7426fb9ca3e5f81237612c31bbcb7fba330f41679c6df18ca09824dc2fff124f
```

**Voice-over:**
> "Verifiable means a real CLI anyone can run. This script downloads Trove's decision log from 0G Storage, replays the deterministic policy locally, confirms every recorded verdict reproduces. No off-chain LLM could have biased the decisions — they're falsifiable. Same logic available in the UI panel below."

**Screen:** Terminal output: ✅ PASS per entry, summary "All entries reproduce." Then briefly cut to the in-UI VerifyDecision panel showing the same result.

---

### 75–90s · DEMO 5 — on-chain identity via 0G iNFT + ENS

**Action:** Scroll to the iNFT identity card on homepage. Hover the explorer link, briefly click into chainscan. Then `app.ens.domains/trove.web3wagmi.eth`.

**Voice-over:**
> "Trove isn't just a backend — it's an iNFT on 0G Galileo. Token zero, decision counters, memory hash. Discoverable by ENS — `trove.web3wagmi.eth` resolves to the agent's address with text records pointing at the iNFT, x402 endpoint, policy hash. Five sponsor integrations live and verifiable at slash-api-slash-proof. Code at github.com/edwardtay/trove. Trove."

**Screen:** iNFT identity card → ENS app text records → end on the iNFT card with the contract visible.

---

## Production tips

**Critical for the LIVE CLAIM moment (DEMO 2):**
- Have MetaMask unlocked + the right account selected BEFORE recording
- Pre-confirm Base mainnet is the active network
- Practice the click flow once before recording (Connect → Claim → MetaMask confirm)
- If MetaMask popup is hidden behind a window, viewers won't see it — keep it visible
- The claim tx is small (~$0.10 gas) so retries are cheap

**Voice-over style:**
- Talk like explaining to a peer dev — not marketing
- Pause after "Done" in DEMO 2 — let the success state register visually
- Don't say "as you can see" — let viewers see

**Two takes:**
- Take 1: full continuous run — you'll go long
- Take 2: shorter takes per section, stitched in Descript

**If the live claim fails:**
- Don't panic — Merkl epochs change, sometimes pending becomes 0 between recordings
- Cut DEMO 2's "Done — tokens land" section, replace with: "Connecting MetaMask, signing, transaction submitted to Base — claim flow is one tx, batched across all four tokens"
- Architecture story still works without on-chain proof

---

## Submission form details

- **GitHub:** `https://github.com/edwardtay/trove`
- **Live demo:** `https://trove.web3wagmi.com`
- **Proof endpoint:** `https://trove.web3wagmi.com/api/proof`
- **iNFT contract:** `0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`
- **iNFT explorer:** `https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`
- **ENS:** `trove.web3wagmi.eth`
- **KeeperHub Turnkey:** `0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd`
- **Verify CLI:** `npm run verify-decision -- 0x7426fb9c...`
- **Universal ENS profile:** `/agent/<ens-name>` route

## Two-sentence elevator pitch

> Trove is a USDC yield agent on Base that finds and auto-claims the reward tokens you forget about — across Aave, Merkl, and any protocol that distributes through Merkl's Base distributor. iNFT identity on 0G Galileo, ENS-discoverable at `trove.web3wagmi.eth`, decisions verifiable via `npm run verify-decision` (or the in-UI panel) — anyone can replay any historical decision against the deterministic policy.
