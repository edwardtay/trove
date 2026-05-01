/**
 * Encrypted policy intelligence for iNFTs.
 *
 * Track-brief alignment: "iNFT-minted agents with embedded intelligence
 * (encrypted on 0G Storage)." We encrypt the PolicyConfig JSON before
 * upload so:
 *   - The blob on 0G Storage is opaque to anyone who isn't the iNFT owner
 *   - The owner derives the key from a deterministic signature, no key
 *     storage needed
 *   - Cloning the iNFT doesn't leak the original's policy; the new owner
 *     needs to re-upload their own encrypted version
 *
 * Crypto: AES-256-GCM with a key derived via HKDF from an EIP-191 personal
 * signature on the canonical message. Only the owner of the EOA can produce
 * that signature, so only the owner can decrypt.
 *
 * This is a hackathon-grade key-management scheme. Production would add
 * ratchet-style key rotation, sealed-box wraps for shared access, etc.
 */

import { ethers } from "ethers";
import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "node:crypto";

/** The canonical message every iNFT owner signs to derive the agent key.
 *  Includes tokenId + chainId so signatures from different chains/tokens
 *  produce different keys. */
export function canonicalSignMessage(tokenId: number, chainId: number): string {
  return `stable-rotator agent intelligence key derivation\ntokenId: ${tokenId}\nchainId: ${chainId}\nv1`;
}

/** Derive a 32-byte AES key from the user's EIP-191 signature on the
 *  canonical message. */
export async function deriveAgentKey(
  signer: ethers.Wallet,
  tokenId: number,
  chainId: number,
): Promise<Buffer> {
  const message = canonicalSignMessage(tokenId, chainId);
  const sig = await signer.signMessage(message);
  // HKDF-extract+expand from the signature → 32 bytes
  const ikm = Buffer.from(sig.slice(2), "hex");
  const salt = Buffer.from("stable-rotator/agent-key/v1", "utf8");
  return Buffer.from(
    hkdfSync("sha256", ikm, salt, Buffer.from(`token:${tokenId}`), 32),
  );
}

export type EncryptedBlob = {
  schema: "stable-rotator/encrypted/1";
  alg: "aes-256-gcm";
  /** 12-byte IV, hex-encoded */
  iv: string;
  /** auth tag, hex-encoded */
  tag: string;
  /** ciphertext, hex-encoded */
  ct: string;
  /** Public hint about what's inside (helps with key rotation later). */
  hint: string;
};

/** Encrypt a JSON-serializable value with the derived key.
 *  Returns a JSON-serializable blob ready for 0G Storage upload. */
export function encryptForOg(
  plaintext: unknown,
  key: Buffer,
  hint: string,
): EncryptedBlob {
  if (key.length !== 32)
    throw new Error("agent key must be 32 bytes for AES-256-GCM");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([
    cipher.update(JSON.stringify(plaintext), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return {
    schema: "stable-rotator/encrypted/1",
    alg: "aes-256-gcm",
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    ct: ct.toString("hex"),
    hint,
  };
}

/** Decrypt a blob fetched from 0G Storage. */
export function decryptFromOg<T>(blob: EncryptedBlob, key: Buffer): T {
  if (blob.schema !== "stable-rotator/encrypted/1")
    throw new Error(`unknown encrypted blob schema: ${blob.schema}`);
  if (blob.alg !== "aes-256-gcm")
    throw new Error(`unknown algorithm: ${blob.alg}`);
  const iv = Buffer.from(blob.iv, "hex");
  const tag = Buffer.from(blob.tag, "hex");
  const ct = Buffer.from(blob.ct, "hex");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return JSON.parse(pt.toString("utf8")) as T;
}
