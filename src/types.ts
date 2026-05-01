export type LlamaPool = {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number | null;
  apyReward: number | null;
  apy: number | null;
  stablecoin: boolean;
  ilRisk: "no" | "yes";
  exposure: "single" | "multi";
  poolMeta: string | null;
  underlyingTokens?: string[];
};

export type Position = {
  project: string;
  pool: string;
  principalUsd: number;
  currentApy: number;
  enteredAt: string;
};

export type Policy = {
  minApyDelta: number;
  minHoldingDays: number;
  gasCostUsd: number;
  slippageBufferBps: number;
  cooldownHours: number;
  tvlFloorUsd: number;
  apyFloor: number;
  safetyMargin: number;
  /** Surcharge added on top of every gas-paying op when execution runs through
   * a decentralized keeper service (Gelato/KeeperHub typically charge 5-15%). */
  keeperFeePct: number;
  allowlist: ReadonlySet<string>;
};

export type Decision =
  | { move: false; reason: string }
  | { move: true; reason: string; from: Position; to: LlamaPool };
