/**
 * Liveness + readiness probe for stable-rotator.
 *
 *   GET /api/healthz       readiness: returns 200 only if all required deps
 *                          respond; 503 with details if anything is down.
 *   GET /api/healthz?lite  liveness: skips upstream probes, just confirms
 *                          this process is up. Use for k8s/Vercel pings.
 *
 * Probe targets:
 *   - DeFiLlama  /yields/pools (yield data)
 *   - Base RPC   eth_blockNumber
 *   - 0G Indexer GET / (root)
 *   - 0G KV node ping (kv_getValue)
 *   - KeeperHub  /api/user (auth)
 */

import { NextResponse } from "next/server";

export const revalidate = 0;
export const runtime = "nodejs";

type ProbeResult = {
  name: string;
  ok: boolean;
  ms: number;
  detail?: string;
};

async function probe(
  name: string,
  fn: () => Promise<{ ok: boolean; detail?: string }>,
): Promise<ProbeResult> {
  const t0 = Date.now();
  try {
    const r = await Promise.race([
      fn(),
      new Promise<{ ok: boolean; detail?: string }>((_, rej) =>
        setTimeout(() => rej(new Error("probe timeout")), 6000),
      ),
    ]);
    return { name, ok: r.ok, ms: Date.now() - t0, detail: r.detail };
  } catch (err) {
    return {
      name,
      ok: false,
      ms: Date.now() - t0,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lite = url.searchParams.has("lite");

  if (lite) {
    return NextResponse.json({ ok: true, mode: "lite" });
  }

  const probes = await Promise.all([
    probe("defillama", async () => {
      const r = await fetch("https://yields.llama.fi/pools", { cache: "no-store" });
      return { ok: r.ok, detail: `${r.status}` };
    }),
    probe("base-rpc", async () => {
      const r = await fetch("https://mainnet.base.org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
        cache: "no-store",
      });
      const j = await r.json().catch(() => null);
      const block = j?.result;
      return {
        ok: r.ok && typeof block === "string",
        detail: block ? `block ${parseInt(block, 16)}` : "no block",
      };
    }),
    probe("0g-indexer", async () => {
      const r = await fetch(
        "https://indexer-storage-testnet-turbo.0g.ai/",
        { cache: "no-store" },
      );
      // Indexer's root may 404 but a connection success implies it's up
      return { ok: r.status < 500, detail: `${r.status}` };
    }),
    probe("0g-kv", async () => {
      const r = await fetch("http://178.238.236.119:6789", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "kv_getValue",
          params: [
            "000000000000000000000000000000000000000000000000000000007374626c",
            "6167656e743a6c697665",
            0,
            0xffff,
          ],
        }),
        cache: "no-store",
      });
      const j = await r.json().catch(() => null);
      return { ok: r.ok && j?.result !== undefined, detail: `${r.status}` };
    }),
    probe("keeperhub", async () => {
      const key = process.env.KEEPERHUB_API_KEY;
      if (!key) return { ok: true, detail: "skipped (no key)" };
      const r = await fetch("https://app.keeperhub.com/api/user", {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      return { ok: r.status === 200, detail: `${r.status}` };
    }),
  ]);

  const allOk = probes.every((p) => p.ok);
  return NextResponse.json(
    {
      ok: allOk,
      probes,
      checkedAt: new Date().toISOString(),
    },
    { status: allOk ? 200 : 503 },
  );
}
