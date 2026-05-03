/**
 * KeeperHub REST/MCP workflow client.
 *
 * Two modes:
 *   - Free workflows (e.g. `helloworld`): plain Bearer-auth POST.
 *   - Paid workflows (yield rates, mcp-test): wrapped in x402-fetch which
 *     auto-pays the USDC micropayment on Base before retrying.
 *
 * KeeperHub's API shape (verified against /api/openapi):
 *   POST /api/mcp/workflows/{slug}/call
 *   Auth: Authorization: Bearer kh_...
 *   Body: workflow-specific JSON (some workflows take {address}, etc.)
 *   200 → { executionId, status, output? }
 *   402 → { x402Version, accepts: [{ network, asset, amount, payTo }] }
 */

import { ethers } from "ethers";

const KH_BASE = "https://app.keeperhub.com/api";
const KH_KEY = process.env.KEEPERHUB_API_KEY;
const BASE_RPC = "https://mainnet.base.org";

let _baseProvider: ethers.JsonRpcProvider | null = null;
function getBaseProvider(): ethers.JsonRpcProvider {
  if (!_baseProvider) _baseProvider = new ethers.JsonRpcProvider(BASE_RPC);
  return _baseProvider;
}

export type WorkflowCallResult =
  | { ok: true; executionId: string; status: string; output?: unknown }
  | {
      ok: false;
      error: string;
      payment?: PaymentRequirement;
      resource?: PaymentResource;
      httpStatus: number;
    };

export type PaymentRequirement = {
  scheme?: string;
  network: string;
  asset: string;
  amount: string;
  payTo: string;
  maxTimeoutSeconds: number;
  extra?: { name?: string; version?: string };
};

export type PaymentResource = {
  url?: string;
  description?: string;
  mimeType?: string;
};

/** Call a KeeperHub workflow. If it 402s, surface the payment offer.
 *  For paid calls, use `callWorkflowPaid` which wraps x402-fetch. */
export async function callWorkflow(
  slug: string,
  body: unknown = {},
): Promise<WorkflowCallResult> {
  if (!KH_KEY) return { ok: false, error: "KEEPERHUB_API_KEY missing", httpStatus: 0 };

  const res = await fetch(`${KH_BASE}/mcp/workflows/${slug}/call`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KH_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return { ok: false, error: `non-json: ${text.slice(0, 200)}`, httpStatus: res.status };
  }

  if (res.status === 200) {
    const j = json as { executionId: string; status: string; output?: unknown };
    return { ok: true, executionId: j.executionId, status: j.status, output: j.output };
  }
  if (res.status === 402) {
    const j = json as {
      accepts?: PaymentRequirement[];
      resource?: PaymentResource;
      error?: string;
    };
    return {
      ok: false,
      error: j.error ?? "payment required",
      payment: j.accepts?.[0],
      resource: j.resource,
      httpStatus: 402,
    };
  }
  return {
    ok: false,
    error: (json as { error?: string }).error ?? `http ${res.status}`,
    httpStatus: res.status,
  };
}

/**
 * Manual x402v2 payment via EIP-3009 `transferWithAuthorization`.
 *
 * Why manual: x402-fetch@1.2.0 validates against an older spec version that
 * doesn't accept KeeperHub's CAIP-2 network identifier (`eip155:8453`). The
 * underlying mechanism is well-defined though — sign an EIP-712 typed
 * meta-transaction authorizing USDC transfer, attach as base64 in the
 * X-PAYMENT header, server settles + executes the workflow.
 *
 * Requires PRIVATE_KEY wallet to hold USDC + ETH on Base (~$0.05).
 */
async function buildX402PaymentHeader(
  offer: PaymentRequirement,
  resource: PaymentResource | undefined,
  wallet: ethers.Wallet,
): Promise<string> {
  // Parse CAIP-2 network identifier → chainId
  const m = offer.network.match(/^eip155:(\d+)$/);
  const chainId = m ? Number(m[1]) : 8453;

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

  const now = Math.floor(Date.now() / 1000);
  const message = {
    from: wallet.address,
    to: offer.payTo,
    value: offer.amount,
    validAfter: 0,
    validBefore: now + Math.min(offer.maxTimeoutSeconds, 600),
    nonce: ethers.hexlify(ethers.randomBytes(32)),
  };

  const signature = await wallet.signTypedData(domain, types, message);

  // x402v2 header payload — per coinbase/x402 exact-EVM spec:
  // wraps the *accepted* offer + echoes the *resource* block from the 402.
  const headerPayload = {
    x402Version: 2,
    resource: resource ?? {},
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
        from: message.from,
        to: message.to,
        value: message.value,
        validAfter: String(message.validAfter),
        validBefore: String(message.validBefore),
        nonce: message.nonce,
      },
    },
  };

  return Buffer.from(JSON.stringify(headerPayload)).toString("base64");
}

export async function callWorkflowPaid(
  slug: string,
  body: unknown = {},
): Promise<WorkflowCallResult> {
  if (!KH_KEY)
    return { ok: false, error: "KEEPERHUB_API_KEY missing", httpStatus: 0 };
  const raw = process.env.PRIVATE_KEY;
  if (!raw)
    return { ok: false, error: "PRIVATE_KEY missing for x402 payment", httpStatus: 0 };

  const key = raw.startsWith("0x") ? raw : `0x${raw}`;
  const wallet = new ethers.Wallet(key, getBaseProvider());

  // Step 1: discover the payment offer with an unauthenticated call
  const probe = await callWorkflow(slug, body);
  if (probe.ok) return probe; // free workflow, no payment needed
  if (probe.httpStatus !== 402 || !probe.payment) {
    return probe;
  }

  // Step 2: sign EIP-3009 transferWithAuthorization
  const headerB64 = await buildX402PaymentHeader(
    probe.payment,
    probe.resource,
    wallet,
  );

  // Step 3: retry with the signed payment header
  const res = await fetch(`${KH_BASE}/mcp/workflows/${slug}/call`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KH_KEY}`,
      "Content-Type": "application/json",
      "X-PAYMENT": headerB64,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return { ok: false, error: `non-json: ${text.slice(0, 200)}`, httpStatus: res.status };
  }

  if (res.status === 200) {
    const j = json as { executionId: string; status: string; output?: unknown };
    return { ok: true, executionId: j.executionId, status: j.status, output: j.output };
  }
  // Surface the server's error verbatim — almost always insufficient-funds
  // or signature-verification details.
  return {
    ok: false,
    error:
      typeof json === "object" && json && "error" in json
        ? String((json as { error: unknown }).error)
        : `http ${res.status}`,
    httpStatus: res.status,
    payment: probe.payment,
  };
}
