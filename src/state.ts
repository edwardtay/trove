import { readFile, writeFile } from "node:fs/promises";
import type { Position } from "./types";

const STATE_PATH = new URL("../state.json", import.meta.url);

type State = {
  position: Position | null;
  lastMoveAt: string | null;
};

const EMPTY: State = { position: null, lastMoveAt: null };

export async function readState(): Promise<State> {
  try {
    const raw = await readFile(STATE_PATH, "utf8");
    return JSON.parse(raw) as State;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return EMPTY;
    throw err;
  }
}

export async function writeState(state: State): Promise<void> {
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2));
}

export function hoursSince(iso: string | null): number {
  if (!iso) return Infinity;
  return (Date.now() - Date.parse(iso)) / 3_600_000;
}
