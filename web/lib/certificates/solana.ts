/**
 * Server-side Solana integration for certificate issuance.
 *
 * Design: users have no wallet. The server derives a deterministic ed25519
 * keypair per user (from CERTIFICATE_MASTER_SEED_HEX + userId) to use as
 * the "student" account in the on-chain PDA. The server's authority keypair
 * signs and pays for every transaction.
 *
 * Required env vars:
 *   CERTIFICATE_AUTHORITY_KEYPAIR  — base58 64-byte secret key (funded on devnet)
 *   CERTIFICATE_MASTER_SEED_HEX   — 64 hex chars (32 random bytes); run:
 *                                    openssl rand -hex 32
 *   SOLANA_RPC_URL                 — defaults to https://api.devnet.solana.com
 */

import { createHash } from "crypto";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";

export const CERTIFICATE_PROGRAM_ID = new PublicKey("AsuQPnJ7chUgFnnqQrZ4vrf1mC48NoXzPJUDV82Pm8XP");
const PROGRAM_ID = CERTIFICATE_PROGRAM_ID;

/**
 * SOL sent from the authority to the student's wallet in the same
 * transaction that records their certificate — a small "welcome" balance
 * so a freshly-minted certificate wallet can immediately pay for its own
 * transaction fees (e.g. sending SOL from the new Send/Receive flow).
 */
export const CERTIFICATE_REWARD_SOL = 0.01;
const CERTIFICATE_REWARD_LAMPORTS = Math.round(CERTIFICATE_REWARD_SOL * LAMPORTS_PER_SOL);

function getRpcUrl() {
  return process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
}

function getAuthorityKeypair(): Keypair {
  const raw = process.env.CERTIFICATE_AUTHORITY_KEYPAIR;
  if (!raw) throw new Error("CERTIFICATE_AUTHORITY_KEYPAIR env var is missing");
  return Keypair.fromSecretKey(bs58.decode(raw));
}

function getMasterSeed(): Buffer {
  const hex = process.env.CERTIFICATE_MASTER_SEED_HEX;
  if (!hex || hex.length !== 64) throw new Error("CERTIFICATE_MASTER_SEED_HEX must be 64 hex chars");
  return Buffer.from(hex, "hex");
}

/**
 * Derives a deterministic ed25519 keypair for a user.
 * Same user + same seed always gives the same Solana pubkey — their permanent
 * certificate identity even though they never hold the private key themselves.
 */
export function deriveStudentKeypair(userId: string): Keypair {
  const seed = createHash("sha256")
    .update(getMasterSeed())
    .update(Buffer.from(userId, "utf8"))
    .digest();
  const { secretKey } = nacl.sign.keyPair.fromSeed(seed);
  return Keypair.fromSecretKey(secretKey);
}

export function deriveStudentPubkey(userId: string): PublicKey {
  return deriveStudentKeypair(userId).publicKey;
}

// Anchor instruction discriminator = sha256("global:{method}")[0..8]
function discriminator(method: string): Buffer {
  return createHash("sha256").update(`global:${method}`).digest().subarray(0, 8);
}

// Borsh string: 4-byte LE length + UTF-8 bytes
function borshString(value: string): Buffer {
  const str = Buffer.from(value, "utf8");
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32LE(str.length, 0);
  return Buffer.concat([len, str]);
}

function getRegistryPda(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([Buffer.from("registry")], PROGRAM_ID);
}

function getCertificatePda(studentPubkey: PublicKey, courseIdShort: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("certificate"), studentPubkey.toBuffer(), Buffer.from(courseIdShort, "utf8")],
    PROGRAM_ID,
  );
}

/**
 * Returns the course_id string used as a PDA seed (must be ≤32 bytes).
 * We strip the UUID hyphens → 32 hex chars = 32 bytes.
 */
export function shortCourseId(courseId: string): string {
  return courseId.replace(/-/g, "");
}

async function initRegistryIfNeeded(connection: Connection, authority: Keypair): Promise<void> {
  const [registryPda] = getRegistryPda();
  const info = await connection.getAccountInfo(registryPda);
  if (info !== null) return; // already initialized

  const ix = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: registryPda, isSigner: false, isWritable: true },
      { pubkey: authority.publicKey, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: discriminator("initialize_registry"),
  });

  const tx = new Transaction().add(ix);
  await sendAndConfirmTransaction(connection, tx, [authority], { commitment: "confirmed" });
}

export interface MintResult {
  certificatePda: string;
  txSig: string;
}

/**
 * Issues an on-chain certificate for userId + courseId.
 * Idempotent: if the certificate PDA already exists the function returns its
 * address without spending another transaction.
 */
export async function issueCertificateOnChain(
  userId: string,
  courseId: string,
  metadataUri: string,
): Promise<MintResult> {
  const authority = getAuthorityKeypair();
  const connection = new Connection(getRpcUrl(), "confirmed");

  await initRegistryIfNeeded(connection, authority);

  const studentPubkey = deriveStudentPubkey(userId);
  const courseIdShort = shortCourseId(courseId);
  const [registryPda] = getRegistryPda();
  const [certificatePda] = getCertificatePda(studentPubkey, courseIdShort);

  // Idempotency check — don't re-mint
  const existing = await connection.getAccountInfo(certificatePda);
  if (existing !== null) {
    return { certificatePda: certificatePda.toBase58(), txSig: "" };
  }

  const data = Buffer.concat([
    discriminator("record_certificate"),
    borshString(courseIdShort),
    borshString(metadataUri),
  ]);

  const ix = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: registryPda, isSigner: false, isWritable: true },
      { pubkey: certificatePda, isSigner: false, isWritable: true },
      { pubkey: studentPubkey, isSigner: false, isWritable: false },
      { pubkey: authority.publicKey, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });

  // Bundle a small SOL transfer to the student's wallet in the same
  // transaction as the certificate record, so claiming a certificate is
  // itself a transaction that lands in (and tops up) the student's wallet.
  const rewardIx = SystemProgram.transfer({
    fromPubkey: authority.publicKey,
    toPubkey: studentPubkey,
    lamports: CERTIFICATE_REWARD_LAMPORTS,
  });

  const tx = new Transaction().add(ix, rewardIx);
  const txSig = await sendAndConfirmTransaction(connection, tx, [authority], { commitment: "confirmed" });

  return { certificatePda: certificatePda.toBase58(), txSig };
}
