# Demo Video Script — Trove (90 seconds, real-world framing)

Built around a specific user pain point: **"I deposited USDC into Aave and forgot to claim the reward tokens that pile up on top."** Show the problem, show the fix, show the on-chain proof. No abstract pitching.

---

## Setup before recording

**Tabs in order:**
1. `https://trove.web3wagmi.com/` — homepage
2. `https://app.aave.com/` — real Aave UI for the same wallet (proof we read the same data)
3. `https://trove.web3wagmi.com/api/proof` — proof endpoint (open as JSON)
4. A terminal window — for the `verify-decision` command live demo
5. `https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64` — iNFT explorer

**Test wallet to use throughout:** `0x38430336153468dcf36af5cea7d6bc472425633a` (has aWETH + Merkl rewards visible — picked because it represents a normal DeFi user, not a whale)

---

## Script (~95 seconds, room to breathe)

### 0–10s · OPEN ON THE PROBLEM (no logos, no team intro)

**Voice-over:**
> "If you've supplied USDC to Aave on Base, there's a good chance you have unclaimed reward tokens piling up. Most people never claim. That's the problem Trove solves."

**Screen:** Cut to Aave UI (`app.aave.com`) showing the user's wallet with "Available rewards: $0.93" or whatever number is visible. Highlight that number with cursor.

---

### 10–25s · DEMO 1 — Trove sees what Aave shows, instantly

**Action:** Switch to `trove.web3wagmi.com`. Paste `0x38430336153468dcf36af5cea7d6bc472425633a`. Hit "check."

**Voice-over:**
> "Paste any wallet — Trove finds every DeFi position, not just Aave USDC. Here we see aWETH, a Morpho vault, USDS — $79 across four protocols. Below that: the same unclaimed Merkl rewards Aave's UI is showing. Same data source — Merkl's distributor on Base."

**Screen:** Position table loads, scroll to the Unclaimed Rewards panel. The 4 Merkl rewards (sUP, YO, SUMR, WELL) appear with USD totals. Briefly toggle back to Aave's UI to show the totals match.

---

### 25–40s · DEMO 2 — The agent's verdict + reasoning

**Action:** Scroll to the AGENT SAYS panel showing "Hold" with reasoning.

**Voice-over:**
> "An agent that can say no. Right now Trove says HOLD — the APY delta isn't worth the gas to rebalance. It explains why, with the math. Most yield aggregators chase APY blindly. Trove refuses moves that don't pay for themselves. That's what makes it safe to run unattended."

**Screen:** Agent recommendation panel. Highlight the verdict + the policy reasoning ("delta 0.43% below threshold 0.5%").

---

### 40–55s · DEMO 3 — Verifiable, not just claimed

**Action:** Switch to terminal. Run `npm run verify-decision -- 0x7426fb9ca3e5f81237612c31bbcb7fba330f41679c6df18ca09824dc2fff124f`

**Voice-over:**
> "Verifiable means a real command anyone can run. This script downloads the agent's decision log from 0G Storage, replays the same policy locally, and confirms every recorded verdict reproduces. No off-chain LLM could have biased the decisions — they're deterministic and falsifiable."

**Screen:** Show terminal output: ✅ PASS per entry, then summary "All entries reproduce — policy was applied deterministically."

---

### 55–70s · DEMO 4 — KeeperHub auto-claim (the "set and forget" story)

**Action:** Back on homepage, scroll to the AuthorizeAutoClaim button. Click "Authorize" but cancel the wallet popup (don't actually sign).

**Voice-over:**
> "One click. User signs Aave's setClaimer — KeeperHub's wallet now has permission to claim rewards on their behalf, never to redirect them. From then on, KeeperHub's cron workflow checks every 15 minutes: if rewards are claimable, it submits a single batched claim transaction. Proceeds land in the user's wallet. The user never thinks about it again."

**Screen:** Show the signature popup (Privy modal). Briefly switch to a tab showing the workflow JSON file in the GitHub repo — scroll past the 13 nodes.

---

### 70–85s · DEMO 5 — On-chain identity, ENS-discoverable

**Action:** Scroll to the iNFT identity card on the homepage. Hover the explorer link. Then briefly show `app.ens.domains/trove.web3wagmi.eth`.

**Voice-over:**
> "The agent isn't just a backend daemon — it's an iNFT on 0G Galileo. Token zero, decision counters, memory hash committed every cycle. And it's discoverable by ENS — `trove.web3wagmi.eth` resolves to the agent's address, with text records pointing at the iNFT contract, the x402 endpoint, the policy hash, all on-chain. Other agents find Trove by name, no API key, no signed handshake."

**Screen:** iNFT identity card showing token #0, decision counters, hashes. Switch to ENS app showing all 8 text records.

---

### 85–95s · CLOSE — honest scope

**Action:** Brief shot of `/notes` Live Status snapshot or `/api/proof`.

**Voice-over:**
> "Five sponsor integrations live and verifiable. Honest boundaries documented — Compute broker funding, Turnkey wallet activation, all explicit. Code at github.com/edwardtay/trove. Trove."

**Screen:** End on the `/notes` Live Status snapshot panel with the green checkmarks.

---

## Production tips

**The big shift from "showcase" to "real-world":**
- Open with the user's pain (forgotten rewards), not the architecture
- Show Aave's UI as proof we read the same data — establishes credibility immediately
- Run `verify-decision` LIVE in a terminal — turns "verifiable" from claim to evidence
- Use real numbers throughout — don't abstract them away

**Voice-over discipline:**
- Speak like you're explaining to a peer dev, not a marketing audience
- Pause between segments for breath and to let the screen catch up
- Don't say "as you can see" — let them see

**One take vs many:**
- Record each section separately (~15s each)
- Stitch in Descript or QuickTime
- Final cut should feel continuous

**Length sanity:**
- Target 90s, accept up to 110s
- If you go past 120s, cut a section (probably DEMO 5 — iNFT identity is also visible in DEMO 3's verify-decision output)

---

## Submission form

- **GitHub:** `https://github.com/edwardtay/trove`
- **Live demo:** `https://trove.web3wagmi.com`
- **Proof endpoint:** `https://trove.web3wagmi.com/api/proof`
- **iNFT contract:** `0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`
- **iNFT explorer:** `https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`
- **ENS:** `trove.web3wagmi.eth`
- **KeeperHub Turnkey:** `0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd`
- **Verify a decision (CLI):** `npm run verify-decision -- 0x7426fb9c...`

## Two-sentence elevator pitch

> Trove is a USDC yield agent on Base that finds and auto-claims the reward tokens you forget about. Identity as an iNFT on 0G Galileo, discoverable by ENS at `trove.web3wagmi.eth`, decisions verifiable via a CLI anyone can run.
