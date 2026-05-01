import type { DaySnapshot, ProtocolApy } from "./benchmark";

export type PoolSpec = {
  project: string;
  poolId: string;
  label: string;
};

// Top USDC-on-Base pool per allowlisted project, by TVL at time of writing.
export const HISTORY_POOLS: PoolSpec[] = [
  {
    project: "aave-v3",
    poolId: "7e0661bf-8cf3-45e6-9424-31916d4c7b84",
    label: "Aave V3 USDC",
  },
  {
    project: "morpho-blue",
    poolId: "7820bd3c-461a-4811-9f0b-1d39c1503c3f",
    label: "Morpho STEAKUSDC vault",
  },
  {
    project: "fluid-lending",
    poolId: "7372edda-f07f-4598-83e5-4edec48c4039",
    label: "Fluid USDC",
  },
  {
    project: "compound-v3",
    poolId: "0c8567f8-ba5b-41ad-80de-00a71895eb19",
    label: "Compound V3 USDC",
  },
];

type ChartPoint = {
  timestamp: string;
  tvlUsd: number;
  apy: number | null;
  apyBase: number | null;
  apyReward: number | null;
};

async function fetchChart(poolId: string): Promise<ChartPoint[]> {
  const res = await fetch(`https://yields.llama.fi/chart/${poolId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`chart ${poolId}: ${res.status}`);
  const json = (await res.json()) as { status: string; data: ChartPoint[] };
  if (json.status !== "success") throw new Error("chart non-success");
  return json.data;
}

function dayKey(ts: string): string {
  return ts.slice(0, 10);
}

function shiftDay(ymd: string, deltaDays: number): string {
  const t = Date.parse(ymd + "T00:00:00Z") + deltaDays * 86400 * 1000;
  return new Date(t).toISOString().slice(0, 10);
}

export type HistoricalSeriesResult = {
  series: DaySnapshot[];
  startDate: string;
  endDate: string;
  pools: PoolSpec[];
};

export async function fetchHistoricalSeries({
  days,
}: {
  days: number;
}): Promise<HistoricalSeriesResult> {
  const charts = await Promise.all(
    HISTORY_POOLS.map((p) =>
      fetchChart(p.poolId).then((data) => ({ ...p, data })),
    ),
  );

  // Index each chart by YYYY-MM-DD
  const indexed = charts.map((c) => {
    const byDay = new Map<string, ChartPoint>();
    for (const pt of c.data) byDay.set(dayKey(pt.timestamp), pt);
    return { project: c.project, byDay };
  });

  // Find the common end day (latest date all pools have)
  const lastDays = indexed.map((i) =>
    Math.max(...[...i.byDay.keys()].map((d) => Date.parse(d + "T00:00:00Z"))),
  );
  const commonEndMs = Math.min(...lastDays);
  const commonEnd = new Date(commonEndMs).toISOString().slice(0, 10);

  // Build day list: last `days` days ending at commonEnd
  const dayList: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    dayList.push(shiftDay(commonEnd, -i));
  }

  // Forward-fill any missing per-pool days from up to 7 days back.
  function lookup(idx: number, day: string): ChartPoint | undefined {
    const map = indexed[idx]!.byDay;
    let pt = map.get(day);
    if (pt) return pt;
    for (let back = 1; back <= 7; back++) {
      pt = map.get(shiftDay(day, -back));
      if (pt) return pt;
    }
    return undefined;
  }

  const series: DaySnapshot[] = [];
  for (let i = 0; i < dayList.length; i++) {
    const day = dayList[i]!;
    const pools: ProtocolApy[] = indexed.map((idx, j) => {
      const pt = lookup(j, day);
      return {
        project: idx.project,
        apyBase: pt?.apyBase ?? pt?.apy ?? 0,
        apyReward: pt?.apyReward ?? 0,
      };
    });
    series.push({ day: i, pools });
  }

  return {
    series,
    startDate: dayList[0]!,
    endDate: dayList[dayList.length - 1]!,
    pools: HISTORY_POOLS,
  };
}
