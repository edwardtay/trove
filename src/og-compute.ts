/**
 * Experimental 0G Compute wrapper for stable-rotator.
 *
 * This is intentionally not on the critical submission path. The live agent's
 * verifiable reasoning is the deterministic policy in src/policy.ts. We keep
 * this wrapper to show the intended upgrade path once 0G Compute testnet
 * broker contracts/providers are usable for this flow.
 *
 * Intended funding flow (once Compute is operational on the target network):
 *   1) `npm run og:fund-compute`  — deposits 3 0G to ledger, transfers 1 0G
 *      to a discovered provider for inference. One-time setup.
 *   2) Subsequent `analyzeRebalance` calls draw from that locked balance.
 *
 * Module is Node-only — uses ethers Wallet with PRIVATE_KEY. Don't import
 * from client components.
 */

import { ethers } from "ethers";

const ZG_RPC = process.env.ZG_RPC_URL || "https://evmrpc-testnet.0g.ai";

export type AnalyzeInput = {
  currentProject: string | null;
  currentApy: number | null;
  bestProject: string;
  bestApy: number;
  bestApyReward: number;
  principalUsd: number;
  policy: {
    minApyDelta: number;
    safetyMargin: number;
    minHoldingDays: number;
  };
};

export type AnalyzeOutput = {
  recommendation: "move" | "hold" | "harvest";
  reasoning: string;
  modelUsed: string;
  providerAddress: string;
  durationMs: number;
};

export class StableRotatorCompute {
  private signer: ethers.Wallet | null;

  constructor() {
    const raw = process.env.PRIVATE_KEY;
    if (!raw) {
      this.signer = null;
      return;
    }
    const key = raw.startsWith("0x") ? raw : `0x${raw}`;
    const provider = new ethers.JsonRpcProvider(ZG_RPC);
    this.signer = new ethers.Wallet(key, provider);
  }

  get isConfigured(): boolean {
    return this.signer !== null;
  }

  /** Deposit testnet 0G to ledger + transfer to a chat provider sub-account.
   *  Run once via `npm run og:fund-compute`. */
  async ensureFunded(opts?: {
    depositOG?: number;
    transferOG?: number;
  }): Promise<{ providerAddress: string; model: string } | null> {
    if (!this.signer) return null;
    // SDK 2.0.0 has a known issue where its package.json `exports` doesn't
    // expose the .d.ts file, so TypeScript can't resolve types. The runtime
    // import works fine; cast to `any` to bypass the missing-types error.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { createZGComputeNetworkBroker } = (await import(
      // @ts-expect-error — SDK exports field omits .d.ts
      "@0glabs/0g-serving-broker"
    )) as {
      createZGComputeNetworkBroker: (
        signer: ethers.Wallet,
        ledgerCA?: string,
        inferenceCA?: string,
        fineTuningCA?: string,
      ) => Promise<any>;
    };
    // SDK 2.0.0 ships mainnet defaults that aren't deployed on Galileo.
    // The testnet contracts are real — verified via eth_getCode — at the
    // addresses below. Source: @0glabs/0g-serving-broker@0.7.5 constants.
    const TESTNET_LEDGER = "0xE70830508dAc0A97e6c087c75f402f9Be669E406";
    const TESTNET_INFERENCE = "0xa79F4c8311FF93C06b8CfB403690cc987c93F91E";
    const TESTNET_FINE_TUNING = "0xC6C075D8039763C8f1EbE580be5ADdf2fd6941bA";
    const broker = await createZGComputeNetworkBroker(
      this.signer,
      TESTNET_LEDGER,
      TESTNET_INFERENCE,
      TESTNET_FINE_TUNING,
    );

    const depositOG = opts?.depositOG ?? 3;
    const transferOG = opts?.transferOG ?? 1;

    try {
      await broker.ledger.depositFund(depositOG);
      console.log(`[og-compute] deposited ${depositOG} 0G`);
    } catch (err) {
      // May already have a balance — not fatal
      console.log(`[og-compute] deposit skipped or already funded: ${err}`);
    }

    const services = await broker.inference.listService();
    if (services.length === 0)
      throw new Error("[og-compute] no providers available on Galileo");

    const chat =
      services.find((s: { model?: string }) =>
        /chat|llama|qwen|glm|gpt/i.test(s.model ?? ""),
      ) ?? services[0]!;
    const providerAddress = chat.provider;
    const model = chat.model ?? "unknown";

    try {
      await broker.ledger.transferFund(
        providerAddress,
        "inference",
        BigInt(transferOG) * 10n ** 18n,
      );
      console.log(
        `[og-compute] transferred ${transferOG} 0G to ${providerAddress.slice(0, 10)}…`,
      );
    } catch (err) {
      console.log(`[og-compute] transfer skipped (may already be locked): ${err}`);
    }

    try {
      await broker.inference.acknowledgeProviderSigner(providerAddress);
    } catch {
      /* may already be acknowledged */
    }

    return { providerAddress, model };
  }

  async analyzeRebalance(input: AnalyzeInput): Promise<AnalyzeOutput | null> {
    if (!this.signer) return null;
    const start = Date.now();
    // SDK 2.0.0 has a known issue where its package.json `exports` doesn't
    // expose the .d.ts file, so TypeScript can't resolve types. The runtime
    // import works fine; cast to `any` to bypass the missing-types error.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { createZGComputeNetworkBroker } = (await import(
      // @ts-expect-error — SDK exports field omits .d.ts
      "@0glabs/0g-serving-broker"
    )) as {
      createZGComputeNetworkBroker: (
        signer: ethers.Wallet,
        ledgerCA?: string,
        inferenceCA?: string,
        fineTuningCA?: string,
      ) => Promise<any>;
    };
    // SDK 2.0.0 ships mainnet defaults that aren't deployed on Galileo.
    // The testnet contracts are real — verified via eth_getCode — at the
    // addresses below. Source: @0glabs/0g-serving-broker@0.7.5 constants.
    const TESTNET_LEDGER = "0xE70830508dAc0A97e6c087c75f402f9Be669E406";
    const TESTNET_INFERENCE = "0xa79F4c8311FF93C06b8CfB403690cc987c93F91E";
    const TESTNET_FINE_TUNING = "0xC6C075D8039763C8f1EbE580be5ADdf2fd6941bA";
    const broker = await createZGComputeNetworkBroker(
      this.signer,
      TESTNET_LEDGER,
      TESTNET_INFERENCE,
      TESTNET_FINE_TUNING,
    );

    const services: Array<{ provider: string; model?: string }> =
      await broker.inference.listService();
    const chat =
      services.find((s) => /chat|llama|qwen|glm|gpt/i.test(s.model ?? "")) ??
      services[0];
    if (!chat) throw new Error("[og-compute] no providers");
    const providerAddress = chat.provider;

    const { endpoint, model } =
      await broker.inference.getServiceMetadata(providerAddress);
    const headers = await broker.inference.getRequestHeaders(providerAddress);

    const prompt = buildPrompt(input);
    const res = await fetch(`${endpoint}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a disciplined yield-allocation analyst. Output strict JSON only: {\"recommendation\":\"move|hold|harvest\",\"reasoning\":\"<one sentence>\"}",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0,
      }),
    });
    if (!res.ok)
      throw new Error(`[og-compute] inference HTTP ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data.choices?.[0]?.message?.content?.trim() ?? "";

    let parsed: { recommendation: "move" | "hold" | "harvest"; reasoning: string };
    try {
      // Strip ```json fences if model wrapped output
      const stripped = raw
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      parsed = JSON.parse(stripped);
    } catch {
      parsed = {
        recommendation: "hold",
        reasoning: `unparseable model output: ${raw.slice(0, 100)}`,
      };
    }

    return {
      recommendation: parsed.recommendation,
      reasoning: parsed.reasoning,
      modelUsed: model,
      providerAddress,
      durationMs: Date.now() - start,
    };
  }
}

function buildPrompt(i: AnalyzeInput): string {
  const delta =
    i.currentApy != null ? (i.bestApy - i.currentApy).toFixed(2) : "N/A";
  return `Decide whether the agent should MOVE, HOLD, or HARVEST given:
- Current position: ${i.currentProject ?? "none"} @ ${i.currentApy?.toFixed(2) ?? "N/A"}% APY
- Best candidate: ${i.bestProject} @ ${i.bestApy.toFixed(2)}% organic + ${i.bestApyReward.toFixed(2)}% reward
- Δ APY: ${delta}%
- Principal: $${i.principalUsd.toLocaleString()}
- Policy: minDelta ${i.policy.minApyDelta}%, holding ${i.policy.minHoldingDays}d, safety×${i.policy.safetyMargin}

Rules:
- MOVE only if delta > minDelta AND extra yield over holding period > cost × safety margin.
- HARVEST if there are claimable rewards above the gas threshold.
- Otherwise HOLD.

Output strict JSON only: {"recommendation":"move|hold|harvest","reasoning":"<≤25 word reason>"}`;
}
