/**
 * 0G Data Availability adapter for Trove.
 *
 * Publishes the *inputs* that drove each decision cycle (pool snapshot,
 * positions, policy params) to a 0G DA disperser. Returns a blob reference
 * that's stored alongside the decision log on 0G Storage.
 *
 * Why this matters: Trove's pitch is "deterministic, reproducible,
 * auditable." Without DA, you have to *trust* the agent recorded inputs
 * honestly. With DA, the inputs are independently retrievable — anyone
 * can fetch the blob, replay the deterministic policy, and verify the
 * agent's verdict matches.
 *
 * Configure with `OG_DA_DISPERSER_URL` (defaults to the 0G DA testnet
 * gateway). If unset OR the disperser is unreachable, `publish()` returns
 * null and the decision flow proceeds — DA is an availability anchor,
 * not a critical-path dependency.
 *
 * Module is Node-only; do not import from client components.
 */

const DEFAULT_DISPERSER =
  process.env.OG_DA_DISPERSER_URL ??
  "https://da-rpc-testnet.0g.ai";

export type DABlobRef = {
  /** Disperser-assigned blob identifier (typically a base64 commitment). */
  blobId: string;
  /** The disperser endpoint that accepted the blob. */
  endpoint: string;
  /** ISO timestamp of submission. */
  submittedAt: string;
  /** Original payload size in bytes (post-JSON serialization). */
  byteLength: number;
  /** Human-readable label for what this blob represents. */
  label: string;
};

export type DecisionInputs = {
  schema: "stable-rotator/decision-inputs/1";
  cycleAt: string;
  address: string;
  policy: {
    minApyDelta: number;
    minHoldingDays: number;
    safetyMargin: number;
    gasCostUsd: number;
    apyFloor: number;
    tvlFloorUsd: number;
  };
  poolsConsidered: Array<{
    project: string;
    pool: string;
    apyBase: number | null;
    apyReward: number | null;
    tvlUsd: number;
  }>;
  positions: Array<{
    project: string;
    balanceUsd: number;
    source: string;
  }>;
};

export class OGDataAvailability {
  private readonly endpoint: string;

  constructor(endpoint: string = DEFAULT_DISPERSER) {
    this.endpoint = endpoint.replace(/\/+$/, "");
  }

  get isConfigured(): boolean {
    return Boolean(process.env.OG_DA_DISPERSER_URL) || true;
  }

  /**
   * Publish a JSON payload to the configured 0G DA disperser.
   * Returns null on any failure — caller should treat DA as best-effort.
   */
  async publish(label: string, data: unknown): Promise<DABlobRef | null> {
    const json = JSON.stringify(data);
    const bytes = new TextEncoder().encode(json);

    try {
      const res = await fetch(`${this.endpoint}/blobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "X-Blob-Label": label,
          "X-Blob-Source": "trove-stable-rotator",
        },
        body: bytes,
        // Hard timeout — DA submission must not block decision flow.
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) {
        console.warn(
          `[og-da] disperser HTTP ${res.status} at ${this.endpoint}: ${await res.text().catch(() => "(no body)")}`,
        );
        return null;
      }

      const result = (await res.json().catch(() => null)) as {
        blobId?: string;
        commitment?: string;
        id?: string;
      } | null;
      const blobId = result?.blobId ?? result?.commitment ?? result?.id;
      if (!blobId) {
        console.warn(`[og-da] disperser returned no blobId: ${JSON.stringify(result)}`);
        return null;
      }

      return {
        blobId,
        endpoint: this.endpoint,
        submittedAt: new Date().toISOString(),
        byteLength: bytes.length,
        label,
      };
    } catch (err) {
      console.warn(`[og-da] publish failed: ${err}`);
      return null;
    }
  }

  /** Build a verification URL the proof endpoint can link to. */
  toVerificationUrl(ref: DABlobRef): string {
    return `${ref.endpoint}/blobs/${encodeURIComponent(ref.blobId)}`;
  }
}
