# Demo Video Script — Trove (90 seconds, target ≤120s)

Designed for screen-recording with voice-over. Open all the URLs in tabs before you start. Speak in short sentences with short pauses between sections.

---

## Setup before recording

Open these URLs in tabs (in order, left → right):

1. `https://trove.web3wagmi.com/` — homepage
2. `https://trove.web3wagmi.com/api/proof` — proof bundle (open in tab, format JSON)
3. `https://app.ens.domains/trove.web3wagmi.eth` — ENS profile
4. `https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64` — iNFT explorer
5. `https://trove.web3wagmi.com/api/agent/decide` — POST endpoint (will show 402 in browser)
6. `https://trove.web3wagmi.com/notes` — full architecture write-up

Also: have wallet `0x38430336153468dcf36af5cea7d6bc472425633a` ready to paste (it has aWETH + Merkl rewards visible).

---

## Script (~90 seconds)

### 0–10s · HOOK (no logos, no team intro)

**Voice-over:**
> "Most yield agents over-promise autonomy. Trove makes the opposite bet."

**Screen:** Black or just hero. Cut to homepage at ~5s.

---

### 10–25s · DEMO 1 — the unique angle

**Action:** On homepage, paste `0x38430336153468dcf36af5cea7d6bc472425633a` into the wallet check input. Click check.

**Voice-over:**
> "Paste any Base wallet. Trove finds every position — Aave, Morpho vaults, USDS — values them in real time. Then it checks Aave's RewardsController and Merkl's distributor for unclaimed rewards. Same data your wallet sees on app.aave.com."

**Screen:** Show the position table with detected aWETH ($42), Morpho GTUSDA ($21), etc. Then scroll to Unclaimed Rewards panel showing the Merkl tokens.

---

### 25–45s · DEMO 2 — the verifiable trace (THE KILLER SHOT)

**Action:** Click the `/api/proof` tab. Highlight specific fields.

**Voice-over:**
> "Every claim Trove makes is checkable from this one endpoint. ENS identity at `trove.web3wagmi.eth`, iNFT live on 0G Galileo as token zero, 0G Storage hashes for the agent's policy and memory, KeeperHub workflow status. Self-probing — the proof endpoint itself queries the Merkl disperser to verify reachability."

**Screen:** Show `liveStatus0G`, `ensIdentity.profile`, `integrationTruth.live` array.

---

### 45–60s · DEMO 3 — agent identity is on-chain

**Action:** Switch to the iNFT identity card on the homepage (scroll to it). Then click the explorer link to open chainscan.

**Voice-over:**
> "The agent isn't just a server-side daemon. It's an on-chain object — token zero in the StableRotatorAgent contract. Memory hash, policy hash, decision counters — all stored on-chain at every cycle. Other agents can find Trove by resolving `trove.web3wagmi.eth` — the ENS subname resolves to the agent's address, and the text records describe the full integration footprint. No central directory needed."

**Screen:** Show the iNFT card with decision counts. Brief flash to ENS app showing text records.

---

### 60–75s · DEMO 4 — autonomous claim loop

**Action:** Show the AuthorizeAutoClaim button on homepage. Then briefly pop the workflow JSON file in GitHub.

**Voice-over:**
> "Headline pitch: auto-claims rewards you'd forget. Two execution paths: user signs once via Aave's setClaimer, then KeeperHub's cron workflow auto-claims forever. Or any caller can claim Merkl rewards on the user's behalf since proofs hardcode the recipient. Workflow file in the repo: thirteen nodes, two-chain execution, branched on rewards and verdicts."

**Screen:** AuthorizeAutoClaim button → flash to keeperhub-workflow.json on GitHub.

---

### 75–90s · CLOSE — honest boundaries

**Action:** Scroll to `/notes` to show the Live Status panel. End on the iNFT identity card.

**Voice-over:**
> "Honest boundaries section: 0G DA wired but disperser not live. 0G Compute integrated but broker funding gates inference. KeeperHub Turnkey wallet shipped but not yet funded. We say what we ship and what we don't. Five sponsor integrations, real on-chain artifacts, public repo at github.com/edwardtay/trove. Trove."

**Screen:** End on the iNFT card with the contract address visible.

---

## Production tips

**Do:**
- Speak in punchy short sentences. Pause between sections.
- Use Loom or QuickTime + Descript for cuts.
- Record at 1080p, 60fps.
- Mouse cursor should be VISIBLE — zoom browser to 110% for clearer screen text.
- Voice-over recorded separately, layered on top.

**Don't:**
- No logo intros, no music, no transitions.
- No team photos.
- No reading the README aloud.
- No "thank you for watching."

**Pacing trick:**
- 90 seconds = roughly 200-250 words spoken. The script above is ~190 words.
- If you fumble a section, cut and restart that segment only. Stitch in Descript.

**Two takes:**
- Take 1: just say everything end-to-end. You'll go long (~120s) and miss beats.
- Take 2: do shorter takes per section. ~20s per section. Stitch them.

---

## Submission form details (paste these)

- **GitHub:** `https://github.com/edwardtay/trove`
- **Live demo:** `https://trove.web3wagmi.com`
- **Proof endpoint:** `https://trove.web3wagmi.com/api/proof`
- **iNFT contract:** `0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`
- **iNFT explorer:** `https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64`
- **ENS identity:** `trove.web3wagmi.eth`
- **KeeperHub Turnkey wallet:** `0x1A09587D1f8D7BFB88454Abd51EB0354A2fdeDDd`
- **Tracks:** 0G OpenAgents, KeeperHub, ENS

## Two-line elevator pitch (for the form's "describe project")

> A USDC yield agent on Base that earns the rewards most people forget to claim. iNFT identity on 0G Galileo, ENS-discoverable at `trove.web3wagmi.eth`, paid policy decisions via x402, and a KeeperHub workflow that auto-claims rewards across Aave + Merkl on a 15-minute cron. Honest engineering — every claim verifiable at `/api/proof`.
