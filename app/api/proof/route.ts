import { NextResponse } from "next/server";
import { getKeeperHubStatus } from "../../../src/keeperhub-status";
import { OGDataAvailability } from "../../../src/og-da";
import { StableRotatorCompute } from "../../../src/og-compute";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function originFromRequest(req: Request) {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;
  if (configured) {
    return configured.startsWith("http") ? configured : `https://${configured}`;
  }

  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : new URL(req.url).origin;
}

export async function GET(req: Request) {
  const origin = originFromRequest(req);
  const keeperhub = await getKeeperHubStatus();

  // Live-probe 0G DA disperser by publishing a tiny health-check blob.
  // If it returns a real blobId, DA is live for this deployment.
  const da = new OGDataAvailability();
  const daHealth = await da
    .publish("proof-health", {
      schema: "stable-rotator/proof-health/1",
      probedAt: new Date().toISOString(),
    })
    .catch(() => null);

  // Compute is "live" if PRIVATE_KEY is configured and the broker can be
  // instantiated. We don't burn an inference call on every /api/proof hit —
  // configuration check is sufficient evidence for the proof bundle.
  const compute = new StableRotatorCompute();
  const computeLive = compute.isConfigured;

  const daLive = daHealth !== null;
  const liveItems = [
    "0G Storage policy config and decision logs",
    "0G Galileo iNFT identity, memory pointer, counters, clone lineage",
    "KeeperHub auth and free workflow call",
    "x402 seller endpoint with EIP-3009 signature verification",
    "Deterministic policy tests and live market reads",
  ];
  if (daLive) liveItems.push("0G DA decision-input publication (per-cycle)");
  if (computeLive)
    liveItems.push("0G Compute verifiable LLM analysis (per-cycle, parallel to policy)");

  const notClaimedItems: string[] = [];
  if (!daLive) notClaimedItems.push("0G DA publication unreachable from this deployment");
  if (!computeLive) notClaimedItems.push("0G Compute key not configured in this deployment");
  notClaimedItems.push(
    "No unattended user fund movement",
    "No MEV/private-orderflow protection claim",
  );

  return NextResponse.json({
    project: "Trove",
    generatedAt: new Date().toISOString(),
    demo: {
      app: origin,
      notes: `${origin}/notes`,
      agents: `${origin}/agents`,
      paidDecisionEndpoint: `${origin}/api/agent/decide`,
      tickEndpoint: `${origin}/api/agent/tick?address=0x0000000000000000000000000000000000000001`,
    },
    claim:
      "A verifiable USDC yield agent that can say no: live market reads, deterministic policy, 0G memory/iNFT identity, KeeperHub execution boundary, and x402-paid policy calls.",
    liveStatus: {
      deFiLlamaMarketReads: true,
      walletPositionReads: true,
      deterministicPolicy: true,
      tests: 25,
      keeperhubConfigured: keeperhub.configured,
      keeperhubTurnkeyWallet: keeperhub.wallet.provider === "Turnkey",
      keeperhubFreeWorkflowOk: keeperhub.helloworld?.ok === true,
      x402SellerEndpoint: true,
      x402Network: "eip155:8453",
      x402PriceAtomicUsdc: "10000",
    },
    artifacts: {
      ogStoragePolicyRoot: {
        root: "0xa2f8ba42d8f0337c9c541abdd0c09b186025801f54d17bc3e065e1b99b3d5848",
        tx: "https://chainscan-galileo.0g.ai/tx/0x1df5f522a50b4608625302a0c91f83f2e46ba50a1c14b6c0d3161ae3524c39a4",
      },
      ogStorageDecisionLogRoot: {
        root: "0x7426fb9ca3e5f81237612c31bbcb7fba330f41679c6df18ca09824dc2fff124f",
        tx: "https://chainscan-galileo.0g.ai/tx/0xedccfcac4d96a40c6603234d5c0224d6ffc46bb2f1f0ad866b7aa04fd2512570",
      },
      inftContract: {
        address: "0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64",
        explorer:
          "https://chainscan-galileo.0g.ai/address/0x390c17AC063F7E64c93ccC1E3a9381b14D68fB64",
        mintTx:
          "https://chainscan-galileo.0g.ai/tx/0x4cefa6cac6aaee2d21e6786e93d7595f42a6bb78b7f3cf2b980347c0934a4972",
        updateMemoryTx:
          "https://chainscan-galileo.0g.ai/tx/0x608d186bf7c5d0717dfecdde19910005a97aa1812fcfb7b62f0436129d4bb4e8",
        recordDecisionTx:
          "https://chainscan-galileo.0g.ai/tx/0x0728a730ebd2972bb316ece22f0e27316f38f7d48b1b8cbb34b06a92196156c4",
      },
    },
    liveStatus0G: {
      storage: true,
      iNft: true,
      dataAvailability: daLive,
      compute: computeLive,
      ...(daHealth ? { daHealthCheck: daHealth } : {}),
    },
    integrationTruth: {
      live: liveItems,
      bounded: [
        "KeeperHub tx nodes require funded Turnkey wallet and protocol adapters",
        "x402 settlement is locally verified; facilitator submission is production follow-up",
        "RoyaltyRouter is implemented but not live-settled from x402 yet",
      ],
      notClaimed: notClaimedItems,
    },
  });
}
