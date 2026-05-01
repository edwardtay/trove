/**
 * 0G KV Storage client — uses the public hackathon KV node at
 * 178.238.236.119:6789, no auth, no rate limit.
 * https://trivo25.github.io/agentio/
 *
 * Pairs with 0G Storage (which holds the append-only decision log) to
 * provide the canonical "Log + KV" persistence pattern from the 0G
 * OpenAgents track brief. KV is for live mutable state — the agent's
 * current pool, last harvest time, unclaimed reward stash — that we
 * read/write every cycle without re-uploading the full log.
 *
 * The KV node speaks JSON-RPC. Methods are ergonomic wrappers around
 * 0G's KV stream interface.
 */

const KV_RPC =
  process.env.AGENTIO_0G_KV_RPC ?? "http://178.238.236.119:6789";
const STREAM_ID =
  process.env.AGENTIO_0G_STREAM_ID ??
  "0x000000000000000000000000000000000000000000000000000000007374626c"; // "stbl" (stable-rotator)

type RpcRequest = {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params?: unknown[];
};

type RpcResponse<T> = {
  jsonrpc: "2.0";
  id: number;
  result?: T;
  error?: { code: number; message: string };
};

let nextId = 1;

async function call<T>(method: string, params: unknown[] = []): Promise<T> {
  const body: RpcRequest = {
    jsonrpc: "2.0",
    id: nextId++,
    method,
    params,
  };
  const res = await fetch(KV_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // KV is meant for short-lived reads; keep them fresh
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`0G KV ${res.status}`);
  const json = (await res.json()) as RpcResponse<T>;
  if (json.error) throw new Error(`0G KV: ${json.error.message}`);
  return json.result as T;
}

function toHex(s: string): string {
  return "0x" + Buffer.from(s, "utf8").toString("hex");
}

function fromHex(hex: string): string {
  if (!hex || hex === "0x") return "";
  return Buffer.from(hex.replace(/^0x/, ""), "hex").toString("utf8");
}

export type AgentLiveState = {
  schema: "stable-rotator/state/1";
  currentPool: string | null; // pool ID currently supplied to
  currentProject: string | null;
  principalUsd: number;
  lastCycleAt: string | null;
  lastHarvestAt: string | null;
  unclaimedRewardUsd: number;
  cycleCount: number;
};

const KEY = toHex("agent:live");

/**
 * Verified RPC shape (probed Apr 2026):
 *   kv_getValue(streamId: hex32, key: hex, startVersion: u64, endVersion: u64)
 *     → { version: u64, data: hex, size: u64 }
 *
 * The public hackathon node is **read-only**. Writing requires signed
 * transactions to the 0G KV contract on Galileo — out of scope for this
 * RPC client.
 */
const KV_RPC_METHOD = "kv_getValue";

export async function ping(): Promise<{ ok: boolean; method?: string; error?: string }> {
  try {
    const result = await call<{ version: number; size: number }>(KV_RPC_METHOD, [
      STREAM_ID,
      KEY,
      0,
      0xffffffff,
    ]);
    return {
      ok: true,
      method: `${KV_RPC_METHOD} (version=${result.version}, size=${result.size})`,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function readLiveState(): Promise<AgentLiveState | null> {
  try {
    const result = await call<{ version: number; data: string; size: number }>(
      KV_RPC_METHOD,
      [STREAM_ID, KEY, 0, 0xffffffff],
    );
    if (!result || !result.data || result.size === 0) return null;
    const json = fromHex(result.data);
    if (!json) return null;
    return JSON.parse(json) as AgentLiveState;
  } catch {
    return null;
  }
}

/**
 * Write path is stubbed — requires signed tx to the 0G KV contract on
 * Galileo, not the public read-only RPC. v2 work.
 */
export async function writeLiveState(_state: AgentLiveState): Promise<boolean> {
  // Until the on-chain write path is wired, return false. The agent's runtime
  // can still derive its current state from the 0G Storage decision log.
  return false;
}

export const KV_INFO = {
  rpc: KV_RPC,
  streamId: STREAM_ID,
  key: "agent:live",
} as const;
