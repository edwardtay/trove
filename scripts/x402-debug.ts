/**
 * Debug the paid x402 call — dumps both the offer and the rejection in full
 * so we can see exactly what KeeperHub expects vs what we send.
 */
import "./_env";
import { ethers } from "ethers";

const KH_BASE = "https://app.keeperhub.com/api";
const SLUG = "usdc-yield-rates-aave-vs-compound";
const KH_KEY = process.env.KEEPERHUB_API_KEY!;
const RAW_KEY = process.env.PRIVATE_KEY!;
const PRIVATE_KEY = RAW_KEY.startsWith("0x") ? RAW_KEY : "0x" + RAW_KEY;

async function main() {
  console.log("─".repeat(70));
  console.log("Step 1 — probe (no payment) → expect 402");
  console.log("─".repeat(70));
  const probe = await fetch(`${KH_BASE}/mcp/workflows/${SLUG}/call`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KH_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const probeText = await probe.text();
  console.log("status:", probe.status);
  console.log("body:", probeText);

  if (probe.status !== 402) {
    console.error("expected 402");
    return;
  }
  const offerJson = JSON.parse(probeText) as {
    x402Version?: number;
    accepts?: Array<{
      scheme?: string;
      network: string;
      asset: string;
      amount: string;
      payTo: string;
      maxTimeoutSeconds: number;
      extra?: { name?: string; version?: string };
      resource?: string;
    }>;
    error?: string;
    resource?: { url?: string; description?: string; mimeType?: string };
  };

  console.log("\n[parsed offer]");
  console.log(JSON.stringify(offerJson, null, 2));

  const offer = offerJson.accepts?.[0];
  if (!offer) {
    console.error("no offer");
    return;
  }

  console.log("\n" + "─".repeat(70));
  console.log("Step 2 — sign EIP-3009 transferWithAuthorization");
  console.log("─".repeat(70));
  const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const chainId = Number(offer.network.match(/eip155:(\d+)/)?.[1] ?? 8453);
  const now = Math.floor(Date.now() / 1000);
  const auth = {
    from: wallet.address,
    to: offer.payTo,
    value: offer.amount,
    validAfter: 0,
    validBefore: now + Math.min(offer.maxTimeoutSeconds, 600),
    nonce: ethers.hexlify(ethers.randomBytes(32)),
  };
  const domain = {
    name: offer.extra?.name ?? "USD Coin",
    version: offer.extra?.version ?? "2",
    chainId,
    verifyingContract: offer.asset,
  };
  const types = {
    TransferWithAuthorization: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
      { name: "validAfter", type: "uint256" },
      { name: "validBefore", type: "uint256" },
      { name: "nonce", type: "bytes32" },
    ],
  };
  const signature = await wallet.signTypedData(domain, types, auth);
  console.log("signed by:", wallet.address);
  console.log("auth:", JSON.stringify(auth, null, 2));
  console.log("signature:", signature);

  // Try multiple header shapes — KeeperHub may want any of these:
  const shapes: Array<{ name: string; payload: unknown }> = [
    {
      name: "A: x402v2 wrapped (current)",
      payload: {
        x402Version: 2,
        resource: offerJson.resource ?? {},
        accepted: {
          scheme: offer.scheme ?? "exact",
          network: offer.network,
          amount: offer.amount,
          asset: offer.asset,
          payTo: offer.payTo,
          maxTimeoutSeconds: offer.maxTimeoutSeconds,
          extra: offer.extra ?? {},
        },
        payload: {
          signature,
          authorization: {
            from: auth.from,
            to: auth.to,
            value: auth.value,
            validAfter: String(auth.validAfter),
            validBefore: String(auth.validBefore),
            nonce: auth.nonce,
          },
        },
      },
    },
    {
      name: "B: x402v1 flat",
      payload: {
        x402Version: 1,
        scheme: "exact",
        network: offer.network,
        payload: {
          signature,
          authorization: {
            from: auth.from,
            to: auth.to,
            value: auth.value,
            validAfter: String(auth.validAfter),
            validBefore: String(auth.validBefore),
            nonce: auth.nonce,
          },
        },
      },
    },
    {
      name: "C: just payload",
      payload: {
        signature,
        authorization: {
          from: auth.from,
          to: auth.to,
          value: auth.value,
          validAfter: String(auth.validAfter),
          validBefore: String(auth.validBefore),
          nonce: auth.nonce,
        },
      },
    },
  ];

  for (const shape of shapes) {
    console.log("\n" + "─".repeat(70));
    console.log(`Step 3 [${shape.name}] — POST with X-PAYMENT`);
    console.log("─".repeat(70));
    const headerB64 = Buffer.from(JSON.stringify(shape.payload)).toString(
      "base64",
    );
    const res = await fetch(`${KH_BASE}/mcp/workflows/${SLUG}/call`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KH_KEY}`,
        "Content-Type": "application/json",
        "X-PAYMENT": headerB64,
      },
      body: JSON.stringify({}),
    });
    const bodyText = await res.text();
    console.log("status:", res.status);
    console.log("body:", bodyText.slice(0, 1000));
    if (res.status === 200) {
      console.log("\n✓ THIS SHAPE WORKED");
      return;
    }
  }
  console.log("\nAll shapes 4xx'd. Inspect bodies above for the rejection reason.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
