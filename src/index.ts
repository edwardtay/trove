import { fetchPools, filterCandidates, rankByOrganicApy } from "./llama";
import { DEFAULT_POLICY, shouldRebalance } from "./policy";
import { hoursSince, readState, writeState } from "./state";
import type { LlamaPool } from "./types";

const DRY_RUN = process.env.DRY_RUN !== "false";
const FAKE_PRINCIPAL_USD = Number(process.env.PRINCIPAL_USD ?? 10_000);

function fmtPool(p: LlamaPool): string {
  const base = (p.apyBase ?? 0).toFixed(2);
  const reward = (p.apyReward ?? 0).toFixed(2);
  const tvl = (p.tvlUsd / 1_000_000).toFixed(1);
  return `${p.project.padEnd(16)} apyBase=${base}% apyReward=${reward}% tvl=$${tvl}M pool=${p.pool}`;
}

async function main() {
  const policy = DEFAULT_POLICY;
  const state = await readState();
  const cycleAt = new Date().toISOString();

  console.log(`\n[${cycleAt}] cycle start  (DRY_RUN=${DRY_RUN})`);

  const pools = await fetchPools();
  const candidates = rankByOrganicApy(filterCandidates(pools, policy));
  console.log(`fetched ${pools.length} pools → ${candidates.length} candidates after filter`);

  if (candidates.length === 0) {
    console.log("no eligible pools — check filter or DeFiLlama coverage");
    return;
  }

  console.log("top candidates:");
  for (const p of candidates.slice(0, 5)) console.log("  " + fmtPool(p));

  const best = candidates[0]!;

  if (!state.position) {
    console.log(
      `\nno current position → would supply $${FAKE_PRINCIPAL_USD.toLocaleString()} to ${best.project} @ ${(best.apyBase ?? 0).toFixed(2)}%`,
    );
    if (!DRY_RUN) {
      await writeState({
        position: {
          project: best.project,
          pool: best.pool,
          principalUsd: FAKE_PRINCIPAL_USD,
          currentApy: best.apyBase ?? 0,
          enteredAt: cycleAt,
        },
        lastMoveAt: cycleAt,
      });
      console.log("state.json updated");
    }
    return;
  }

  const livePool = pools.find((p) => p.pool === state.position!.pool);
  const liveApy = livePool?.apyBase ?? state.position.currentApy;
  console.log(
    `\ncurrent position: ${state.position.project} pool=${state.position.pool} principal=$${state.position.principalUsd.toLocaleString()} apy=${liveApy.toFixed(2)}%`,
  );

  const decision = shouldRebalance(
    { ...state.position, currentApy: liveApy },
    best,
    policy,
    hoursSince(state.lastMoveAt),
  );

  if (!decision.move) {
    console.log(`decision: HOLD — ${decision.reason}`);
    return;
  }

  console.log(
    `decision: MOVE ${decision.from.project} → ${decision.to.project} — ${decision.reason}`,
  );
  if (!DRY_RUN) {
    await writeState({
      position: {
        project: best.project,
        pool: best.pool,
        principalUsd: state.position.principalUsd,
        currentApy: best.apyBase ?? 0,
        enteredAt: cycleAt,
      },
      lastMoveAt: cycleAt,
    });
    console.log("state.json updated");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
