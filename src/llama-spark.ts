/**
 * Lightweight DeFiLlama chart fetcher — returns the last N daily samples of
 * apyBase for a given pool. Used to draw inline sparklines next to live yield
 * candidates on the home page.
 */

type ChartPoint = {
  timestamp: string;
  apyBase: number | null;
  apy: number | null;
};

export async function fetchSparkline(
  poolId: string,
  days = 7,
): Promise<number[]> {
  try {
    const res = await fetch(`https://yields.llama.fi/chart/${poolId}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: ChartPoint[] };
    const data = json.data ?? [];
    const tail = data.slice(-days);
    return tail.map((p) => p.apyBase ?? p.apy ?? 0);
  } catch {
    return [];
  }
}

export async function fetchSparklines(
  poolIds: string[],
  days = 7,
): Promise<Record<string, number[]>> {
  const entries = await Promise.all(
    poolIds.map(async (id) => [id, await fetchSparkline(id, days)] as const),
  );
  return Object.fromEntries(entries);
}
