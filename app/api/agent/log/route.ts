/**
 * Agent log endpoint — closes the KeeperHub loop.
 *
 * POST /api/agent/log
 * Body:
 *   {
 *     address:    user wallet,
 *     verdict:    "hold" | "move" | "harvest",
 *     reason:     human-readable,
 *     rebalance_tx?: string,    // tx hash from KeeperHub's execute_rebalance node
 *     harvest_tx?:   string,    // ditto for execute_harvest
 *     position?:  { project, balanceUsd, apyBase },
 *     best?:      { project, apyBase, apyReward }
 *   }
 *
 * 1. Append the entry to the per-address decision log
 * 2. Upload the cumulative log to 0G Storage
 * 3. Return the new memoryHash for KeeperHub's commit_inft node
 *
 * This endpoint requires PRIVATE_KEY (the agent runtime's signer for 0G
 * Storage uploads). It does NOT sign on-chain rebalance txs — that's
 * KeeperHub's job.
 */

import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  StableRotatorStorage,
  type DecisionLog,
  type DecisionEntry,
} from "../../../../src/og-storage";
import { StableRotatorINft, type DecisionKind } from "../../../../src/og-inft";

const INFT_ADDRESS =
  process.env.NEXT_PUBLIC_INFT_ADDRESS ??
  "0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64";
const INFT_TOKEN_ID = BigInt(process.env.NEXT_PUBLIC_INFT_TOKEN_ID ?? "0");

function verdictToKind(verdict: "hold" | "move" | "harvest"): DecisionKind {
  if (verdict === "move") return 1;
  if (verdict === "harvest") return 2;
  return 0;
}

// Write to /tmp inside the container — /app is owned by root and not writable
// by the `nextjs` user that the production image runs as. /tmp is always
// writable. /api/decisions also reads this path so writes round-trip cleanly.
const STATE_PATH = join(tmpdir(), "trove-og-state.json");

type LogBody = {
  address: string;
  verdict: "hold" | "move" | "harvest";
  reason: string;
  rebalance_tx?: string;
  harvest_tx?: string;
  position?: {
    project: string;
    balanceUsd: number;
    apyBase: number;
  };
  best?: {
    project: string;
    apyBase: number;
    apyReward: number;
  };
};

export async function POST(req: Request) {
  let body: LogBody;
  try {
    body = (await req.json()) as LogBody;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!body.address || !body.verdict) {
    return NextResponse.json(
      { error: "missing address or verdict" },
      { status: 400 },
    );
  }

  const storage = new StableRotatorStorage();
  if (!storage.isConfigured) {
    return NextResponse.json(
      { error: "agent not configured (PRIVATE_KEY missing)" },
      { status: 503 },
    );
  }

  // Load existing log
  let state: { log?: DecisionLog } = {};
  try {
    state = JSON.parse(await readFile(STATE_PATH, "utf-8"));
  } catch {
    /* fresh */
  }
  const log: DecisionLog = state.log ?? {
    schema: "stable-rotator/log/1",
    agentINftId: 0,
    startedAt: new Date().toISOString(),
    entries: [],
  };

  const cycleAt = new Date().toISOString();
  const entry: DecisionEntry = {
    cycleAt,
    verdict: body.verdict,
    reason: body.reason,
    position: body.position
      ? {
          project: body.position.project,
          principalUsd: body.position.balanceUsd,
          currentApy: body.position.apyBase,
        }
      : null,
    best: body.best
      ? {
          project: body.best.project,
          apyBase: body.best.apyBase,
          apyReward: body.best.apyReward,
        }
      : null,
  };
  log.entries.push(entry);

  // Upload
  const result = await storage.putDecisionLog(log);
  if (!result) {
    return NextResponse.json({ error: "0G upload failed" }, { status: 502 });
  }

  // Persist updated state
  const updated = {
    ...state,
    log,
    decisionLog: result,
  };
  try {
    await writeFile(STATE_PATH, JSON.stringify(updated, null, 2));
  } catch {
    // non-fatal — the upload succeeded, local cache write failed
  }

  // Best-effort on-chain commits to grow iNFT counters and sync memory hash.
  // Non-blocking: if either tx fails (RPC blip, gas, etc.), the 0G Storage
  // upload is still durable and the API returns success. Each commit is a
  // small testnet tx (~0.0001 OG); cron tick rate (~15 min) keeps cost low.
  let inftCommit: { updateMemoryTx?: string | null; recordDecisionTx?: string | null; err?: string } = {};
  try {
    const inft = new StableRotatorINft(INFT_ADDRESS);
    if (inft.isConfigured) {
      const memHash = await inft.updateMemory(INFT_TOKEN_ID, result.rootHash);
      const decHash = await inft.recordDecision(
        INFT_TOKEN_ID,
        verdictToKind(body.verdict),
      );
      inftCommit = {
        updateMemoryTx: memHash,
        recordDecisionTx: decHash,
      };
    }
  } catch (err) {
    inftCommit.err = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    memoryHash: result.rootHash,
    storageTx: result.txHash,
    uploadedAt: result.uploadedAt,
    entryCount: log.entries.length,
    inftCommit,
    storageExplorer: `https://chainscan-galileo.0g.ai/tx/${result.txHash}`,
  });
}
