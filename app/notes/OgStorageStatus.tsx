import { readFileSync } from "node:fs";
import { ZG_TESTNET } from "../../src/og-storage";

type OgState = {
  policyConfig?: {
    rootHash: string;
    txHash: string;
    uploadedAt: string;
    snapshot?: { allowlist?: string[] };
  };
  decisionLog?: {
    rootHash: string;
    txHash: string;
    uploadedAt: string;
  };
  log?: { entries?: unknown[] };
  iNftContract?: {
    address: string;
    deployedAt: string;
    chainId: number;
    explorerUrl: string;
  };
  iNftToken?: {
    tokenId: string;
    mintedAt: string;
    txHash: string;
    configHashAtMint: string;
  };
  compute?: {
    providerAddress: string;
    model: string;
    fundedAt: string;
  };
  lastAnalysis?: {
    recommendation: string;
    reasoning: string;
    modelUsed: string;
    providerAddress: string;
    durationMs: number;
    timestamp: string;
    bestProject: string;
    bestApy: number;
  };
};

function readState(): OgState | null {
  try {
    const raw = readFileSync("og-state.json", "utf-8");
    return JSON.parse(raw) as OgState;
  } catch {
    return null;
  }
}

function shortHash(h: string): string {
  if (!h) return "—";
  return `${h.slice(0, 10)}…${h.slice(-8)}`;
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleString();
}

function Card({
  title,
  done,
  children,
}: {
  title: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-md border p-4 text-sm ${
        done
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-neutral-200 bg-neutral-50"
      }`}
    >
      <div
        className={`text-[10px] font-semibold uppercase tracking-wider ${
          done ? "text-emerald-700" : "text-neutral-500"
        }`}
      >
        {title}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function OgStorageStatus() {
  const state = readState();
  const isConfigured = Boolean(process.env.PRIVATE_KEY);

  if (!state) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
        <div className="font-semibold text-amber-900">
          0G integration: not yet exercised
        </div>
        <p className="mt-2 text-neutral-700">
          {isConfigured
            ? "PRIVATE_KEY is set. Run the scripts below to upload artifacts to 0G:"
            : "PRIVATE_KEY not set in .env. Get Galileo testnet 0G from "}
          {!isConfigured && (
            <>
              <a
                href="https://faucet.0g.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-amber-800 underline"
              >
                faucet.0g.ai
              </a>
              , then:
            </>
          )}
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 font-mono text-xs text-neutral-700">
          <li>npm run og:upload-policy</li>
          <li>npm run og:log-decision</li>
          <li>npm run og:fund-compute</li>
          <li>npm run og:analyze</li>
          <li>npm run og:deploy-inft</li>
          <li>npm run og:mint-agent</li>
        </ol>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Card
        title="Policy config (configHash)"
        done={Boolean(state.policyConfig)}
      >
        {state.policyConfig ? (
          <>
            <div className="font-mono text-xs tabular-nums text-neutral-900">
              {shortHash(state.policyConfig.rootHash)}
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">
              uploaded {fmtTime(state.policyConfig.uploadedAt)}
            </div>
            {state.policyConfig.txHash && (
              <a
                href={`${ZG_TESTNET.explorer}/tx/${state.policyConfig.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-mono text-[11px] text-emerald-700 hover:underline"
              >
                tx ↗ {shortHash(state.policyConfig.txHash)}
              </a>
            )}
          </>
        ) : (
          <div className="text-xs text-neutral-500">
            run <code>npm run og:upload-policy</code>
          </div>
        )}
      </Card>

      <Card
        title="Decision log (memoryHash)"
        done={Boolean(state.decisionLog)}
      >
        {state.decisionLog ? (
          <>
            <div className="font-mono text-xs tabular-nums text-neutral-900">
              {shortHash(state.decisionLog.rootHash)}
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">
              {state.log?.entries?.length ?? 0} cycle
              {(state.log?.entries?.length ?? 0) === 1 ? "" : "s"} ·{" "}
              {fmtTime(state.decisionLog.uploadedAt)}
            </div>
            {state.decisionLog.txHash && (
              <a
                href={`${ZG_TESTNET.explorer}/tx/${state.decisionLog.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-mono text-[11px] text-emerald-700 hover:underline"
              >
                tx ↗ {shortHash(state.decisionLog.txHash)}
              </a>
            )}
          </>
        ) : (
          <div className="text-xs text-neutral-500">
            run <code>npm run og:log-decision</code>
          </div>
        )}
      </Card>

      <Card
        title="iNFT contract (StableRotatorAgent)"
        done={Boolean(state.iNftContract)}
      >
        {state.iNftContract ? (
          <>
            <a
              href={state.iNftContract.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tabular-nums text-emerald-700 hover:underline"
            >
              {shortHash(state.iNftContract.address)} ↗
            </a>
            <div className="mt-1 text-[11px] text-neutral-500">
              chain {state.iNftContract.chainId} · deployed{" "}
              {fmtTime(state.iNftContract.deployedAt)}
            </div>
            {state.iNftToken && (
              <div className="mt-2 border-t border-emerald-100 pt-2 text-[11px] text-neutral-600">
                token <span className="font-mono">#{state.iNftToken.tokenId}</span>{" "}
                minted {fmtTime(state.iNftToken.mintedAt)}
              </div>
            )}
          </>
        ) : (
          <div className="text-xs text-neutral-500">
            run <code>npm run og:deploy-inft</code> then{" "}
            <code>og:mint-agent</code>
          </div>
        )}
      </Card>

      <Card title="0G Compute" done={Boolean(state.compute)}>
        {state.compute ? (
          <>
            <div className="font-mono text-xs tabular-nums text-neutral-900">
              {state.compute.model}
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">
              provider {shortHash(state.compute.providerAddress)} · funded{" "}
              {fmtTime(state.compute.fundedAt)}
            </div>
            {state.lastAnalysis && (
              <div className="mt-2 border-t border-emerald-100 pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                  last analysis ·{" "}
                  {state.lastAnalysis.recommendation.toUpperCase()}
                </div>
                <div className="mt-1 text-[11px] leading-relaxed text-neutral-700">
                  &ldquo;{state.lastAnalysis.reasoning}&rdquo;
                </div>
                <div className="mt-1 text-[10px] text-neutral-500">
                  {state.lastAnalysis.bestProject} @{" "}
                  {state.lastAnalysis.bestApy.toFixed(2)}% ·{" "}
                  {state.lastAnalysis.durationMs}ms
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-xs text-neutral-500">
            run <code>npm run og:fund-compute</code> then{" "}
            <code>og:analyze</code>
          </div>
        )}
      </Card>
    </div>
  );
}
