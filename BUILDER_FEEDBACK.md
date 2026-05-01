# Builder Feedback — KeeperHub x402 paid-workflow settlement

**Date:** 2026-04-30
**Submitter:** Trove (ETHGlobal OpenAgents)
**Severity:** Blocker for paid-workflow integration from third-party agents
**Reproducible:** Yes — `npm run kh:e2e` from this repo with `KEEPERHUB_API_KEY` and `PRIVATE_KEY` set

## Summary

The KeeperHub paid-workflow call endpoint advertises x402 in its `x-payment-info` block but does not appear to verify or settle the `X-PAYMENT` header. Three different header shapes all return a byte-identical 402 response, indicating the header is silently ignored rather than parsed-then-rejected.

## Reproduction

Authenticated as `edwardtay7@gmail.com` (KeeperHub account id `oNkg3yd86HUAE49FvmNxjrohn7pXkLTj`), called the paid workflow `usdc-yield-rates-aave-vs-compound` with a valid EIP-3009 `transferWithAuthorization` signature for 0.01 USDC on Base. Agent wallet `0x15ECEE3445E3C8cf28D4D93fAB50181de728b86d` has 1.0 USDC + 0.005 ETH on Base mainnet (verified live).

### Step 1: probe → expected 402 (works correctly)

```http
POST /api/mcp/workflows/usdc-yield-rates-aave-vs-compound/call
Authorization: Bearer kh_...
Content-Type: application/json

{}
```

Returns:

```json
{
  "x402Version": 2,
  "error": "Payment required",
  "resource": { "url": "...", "description": "...", "mimeType": "application/json" },
  "accepts": [{
    "scheme": "exact",
    "network": "eip155:8453",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "amount": "10000",
    "payTo": "0x650a09bc1cda076486716acdd80fce1bba5e84ff",
    "maxTimeoutSeconds": 300,
    "extra": { "name": "USD Coin", "version": "2" }
  }],
  "extensions": { "bazaar": { "discoverable": true } }
}
```

### Step 2: sign EIP-3009 transferWithAuthorization (correct per spec)

Domain: `{ name: "USD Coin", version: "2", chainId: 8453, verifyingContract: 0x833589fc... }`
Types: standard EIP-3009 `TransferWithAuthorization` shape.
Message: `{from, to, value, validAfter=0, validBefore=now+300, nonce}`.
Signed by agent wallet → produced 65-byte EVM signature.

### Step 3: retry with X-PAYMENT — all three shapes fail identically

Tried three header payload shapes:

| Shape | Description | Result |
|---|---|---|
| A | `{x402Version:2, resource, accepted, payload:{signature, authorization}}` (wrapped v2) | 402 (identical body to step 1) |
| B | `{x402Version:1, scheme, network, payload:{signature, authorization}}` (flat v1) | 402 (identical body to step 1) |
| C | `{signature, authorization}` (raw, unwrapped) | 402 (identical body to step 1) |

In each case the response body matches the original 402 byte-for-byte. There is no signature-verification error, no "missing field" error, no malformed-payload error — only the original "Payment required" message. This is consistent with the X-PAYMENT header not being read at all.

## Root cause analysis

The OpenAPI spec (`GET /api/openapi`) shows each paid workflow with:

```json
"x-payment-info": {
  "protocols": [
    { "x402": { "network": "eip155:8453" } },
    { "mpp":  { "method": "tempo", "intent": "charge", "currency": "USDC" } }
  ]
}
```

Both x402 and MPP (Stripe Tempo) are advertised. But neither appears to be wired into the call endpoint as a verification step. Possible causes (any of these would explain the symptom):

1. **No x402 facilitator deployed.** The settlement step (verify EIP-3009 signature → submit on-chain `transferWithAuthorization` → only then forward to workflow execution) is missing from the call-handler middleware chain.
2. **Settlement happens out-of-band via MPP.** Paid workflows may require a Stripe Tempo invoice flow, with the call endpoint expecting an `mpp_intent_id` or similar — but this isn't documented in the OpenAPI.
3. **Header name mismatch.** The endpoint may expect `X-Payment` (single capital) or some custom header name we haven't tried, but giving an identical response across three header shapes argues against this — the server isn't reading any header.

## Suggested fix

Either:

- (a) **Wire the x402 facilitator into the workflow call middleware.** On `X-PAYMENT` present, verify EIP-712 typed-data recovery → check `value`, `to`, `validBefore` match the offered terms → submit the EIP-3009 transferWithAuthorization to the USDC contract → on success, run the workflow → return execution result.

- (b) **Document the actual paid-call flow.** If MPP/Tempo is the live path, the OpenAPI should list the exact request shape (intent endpoint, invoice ID header, etc.) so third-party agents can integrate without reverse-engineering.

- (c) **Reject malformed X-PAYMENT explicitly.** Even if facilitator is in development, returning a discriminated error (`"x402_not_implemented"` / `"signature_invalid"` / etc.) instead of the identical 402 would let callers distinguish "not yet supported" from "your signing is broken."

## What works correctly

- Bearer auth → `GET /api/user`, `GET /api/workflows` (workflows array empty for users with no published workflows; expected)
- Free-workflow calls → `POST /api/mcp/workflows/helloworld/call` returns 200 with a real `executionId`. Verified live: `r7r4eoxu8o2galymcc049` (local agent), `3kgd29wqojljd76ssfgzp` (deployed agent at `https://ethglobal-openagents-trove.lever-labs.com/api/keeperhub`)
- 402 offer surface is well-formed and matches the x402 v2 spec

## Reproducer

In this repo:

```bash
KEEPERHUB_API_KEY=kh_... PRIVATE_KEY=... npm run kh:e2e
# Or for the multi-shape probe:
KEEPERHUB_API_KEY=kh_... PRIVATE_KEY=... npx tsx scripts/x402-debug.ts
```

The debug script tries three X-PAYMENT shapes against the workflow and dumps each response body in full.
