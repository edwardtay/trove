import type { LlamaPool, Policy } from "./types";

const LLAMA_POOLS_URL = "https://yields.llama.fi/pools";

export async function fetchPools(): Promise<LlamaPool[]> {
  const res = await fetch(LLAMA_POOLS_URL);
  if (!res.ok) throw new Error(`DeFiLlama ${res.status}`);
  const json = (await res.json()) as { status: string; data: LlamaPool[] };
  if (json.status !== "success") throw new Error("DeFiLlama returned non-success");
  return json.data;
}

export function filterCandidates(pools: LlamaPool[], policy: Policy): LlamaPool[] {
  return pools.filter((p) => {
    if (p.chain !== "Base") return false;
    if (!p.stablecoin) return false;
    if (p.exposure !== "single") return false;
    if (p.ilRisk !== "no") return false;
    if (p.symbol !== "USDC") return false;
    if (!policy.allowlist.has(p.project)) return false;
    if (p.tvlUsd < policy.tvlFloorUsd) return false;
    if ((p.apyBase ?? 0) < policy.apyFloor) return false;
    return true;
  });
}

export function rankByOrganicApy(candidates: LlamaPool[]): LlamaPool[] {
  return [...candidates].sort((a, b) => (b.apyBase ?? 0) - (a.apyBase ?? 0));
}

/**
 * Returns the top USDC pool per allowlisted project, regardless of whether
 * it clears the policy's TVL/APY floor. Used to display the full breadth
 * of "what we monitor" alongside a pass/fail indicator on the home page.
 */
export function topPoolPerProject(
  pools: LlamaPool[],
  policy: Policy,
): LlamaPool[] {
  const baseUsdc = pools.filter(
    (p) =>
      p.chain === "Base" &&
      p.symbol === "USDC" &&
      p.stablecoin &&
      p.exposure === "single" &&
      p.ilRisk === "no" &&
      policy.allowlist.has(p.project),
  );
  const byProject = new Map<string, LlamaPool>();
  for (const p of baseUsdc) {
    const cur = byProject.get(p.project);
    if (!cur || p.tvlUsd > cur.tvlUsd) byProject.set(p.project, p);
  }
  return [...byProject.values()].sort((a, b) => b.tvlUsd - a.tvlUsd);
}

export function passesPolicyFilter(p: LlamaPool, policy: Policy): boolean {
  return (
    p.tvlUsd >= policy.tvlFloorUsd && (p.apyBase ?? 0) >= policy.apyFloor
  );
}
