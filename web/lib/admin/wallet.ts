import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import nacl from "tweetnacl";
import bs58 from "bs58";

const FRESHNESS_WINDOW_MS = 5 * 60 * 1000;
const CLOCK_SKEW_MS = 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_WALLET_AUTH_SECRET;
  if (!secret) throw new Error("ADMIN_WALLET_AUTH_SECRET is not configured");
  return secret;
}

function signMessage(message: string): string {
  return createHmac("sha256", getSecret()).update(message).digest("hex");
}

export interface WalletChallenge {
  message: string;
  serverToken: string;
}

/**
 * Builds a "Sign-In With Solana"-style challenge and HMAC-signs it with a
 * server secret. Stateless on purpose — no nonce table to write or clean up.
 * The HMAC proves the message is ours and untampered; the embedded "Issued
 * At" timestamp (checked in verifyWalletChallenge) prevents replay.
 */
export function createWalletChallenge(publicKey: string): WalletChallenge {
  const nonce = randomBytes(16).toString("hex");
  const issuedAt = new Date().toISOString();
  const message = [
    "Fundi3 Admin Login",
    `Wallet: ${publicKey}`,
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
  ].join("\n");

  return { message, serverToken: signMessage(message) };
}

export type ChallengeFailure = "invalid" | "expired" | "wallet_mismatch";

function readField(message: string, label: string): string | undefined {
  const line = message.split("\n").find((l) => l.startsWith(`${label}: `));
  return line?.slice(label.length + 2).trim();
}

/** Verifies the HMAC, freshness window, and that the message names this wallet. */
export function verifyWalletChallenge(
  message: string,
  serverToken: string,
  expectedPublicKey: string,
): { ok: true } | { ok: false; reason: ChallengeFailure } {
  let expected: Buffer;
  let actual: Buffer;
  try {
    expected = Buffer.from(signMessage(message), "hex");
    actual = Buffer.from(serverToken, "hex");
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return { ok: false, reason: "invalid" };
  }

  const wallet = readField(message, "Wallet");
  if (wallet !== expectedPublicKey) {
    return { ok: false, reason: "wallet_mismatch" };
  }

  const issuedAtRaw = readField(message, "Issued At");
  const issuedAt = issuedAtRaw ? Date.parse(issuedAtRaw) : NaN;
  const age = Date.now() - issuedAt;
  if (!Number.isFinite(issuedAt) || age > FRESHNESS_WINDOW_MS || age < -CLOCK_SKEW_MS) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true };
}

/** Verifies an ed25519 signature of `message` against a base58 Solana pubkey. */
export function verifyWalletSignature(
  message: string,
  signatureBase58: string,
  publicKeyBase58: string,
): boolean {
  try {
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signatureBase58);
    const publicKeyBytes = bs58.decode(publicKeyBase58);
    if (publicKeyBytes.length !== 32) return false;
    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  } catch {
    return false;
  }
}

/** Loose base58 Solana-pubkey shape check (32 bytes once decoded). */
export function isValidSolanaAddress(value: string): boolean {
  try {
    return bs58.decode(value).length === 32;
  } catch {
    return false;
  }
}
