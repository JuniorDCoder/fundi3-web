/**
 * Shared helpers for the learner-facing Solana wallet (dashboard /wallet page).
 *
 * Every Fundi3 account has a wallet from the moment it's created — the
 * keypair is deterministically derived from the user's id (see
 * lib/certificates/solana.ts), so there's no separate "create wallet" step.
 */

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { CERTIFICATE_PROGRAM_ID } from "@/lib/certificates/solana";

export type SolanaNetwork = "devnet" | "testnet" | "mainnet-beta";

export function getSolanaNetwork(): SolanaNetwork {
  const value = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
  if (value === "mainnet-beta" || value === "testnet") return value;
  return "devnet";
}

export function getRpcUrl(): string {
  return process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
}

export function getExplorerUrl(address: string): string {
  const network = getSolanaNetwork();
  return network === "mainnet-beta"
    ? `https://explorer.solana.com/address/${address}`
    : `https://explorer.solana.com/address/${address}?cluster=${network}`;
}

export function getTxExplorerUrl(signature: string): string {
  const network = getSolanaNetwork();
  return network === "mainnet-beta"
    ? `https://explorer.solana.com/tx/${signature}`
    : `https://explorer.solana.com/tx/${signature}?cluster=${network}`;
}

/** Returns the SOL balance for a pubkey, or null if the RPC call fails. */
export async function getBalanceSol(pubkey: PublicKey): Promise<number | null> {
  try {
    const connection = new Connection(getRpcUrl(), "confirmed");
    const lamports = await connection.getBalance(pubkey);
    return lamports / LAMPORTS_PER_SOL;
  } catch {
    return null;
  }
}

/** True if `address` parses as a valid Solana base58 public key. */
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export interface WalletTransaction {
  signature: string;
  blockTime: number | null;
  status: "success" | "failed";
  direction: "in" | "out" | "other";
  changeSol: number | null;
  counterparty: string | null;
  explorerUrl: string;
  /** "certificate" when this transaction recorded an on-chain course certificate. */
  kind: "certificate" | "transfer";
}

/**
 * Returns the most recent confirmed transactions that touched `pubkey`,
 * newest first. Best-effort: any RPC failure returns an empty list rather
 * than throwing, since transaction history is a "nice to have" on the
 * wallet page.
 */
export async function getRecentTransactions(pubkey: PublicKey, limit = 15): Promise<WalletTransaction[]> {
  try {
    const connection = new Connection(getRpcUrl(), "confirmed");
    const signatures = await connection.getSignaturesForAddress(pubkey, { limit });
    if (signatures.length === 0) return [];

    const parsed = await connection.getParsedTransactions(
      signatures.map((s) => s.signature),
      { maxSupportedTransactionVersion: 0 },
    );

    return signatures.map((sigInfo, i) => {
      const tx = parsed[i];
      const status: "success" | "failed" = sigInfo.err ? "failed" : "success";

      let changeSol: number | null = null;
      let counterparty: string | null = null;
      let direction: "in" | "out" | "other" = "other";
      let kind: "certificate" | "transfer" = "transfer";

      if (tx?.meta && tx.transaction) {
        const accountKeys = tx.transaction.message.accountKeys;
        const idx = accountKeys.findIndex((k) => k.pubkey.equals(pubkey));
        if (idx !== -1) {
          const pre = tx.meta.preBalances[idx];
          const post = tx.meta.postBalances[idx];
          changeSol = (post - pre) / LAMPORTS_PER_SOL;
          direction = changeSol > 0 ? "in" : changeSol < 0 ? "out" : "other";
        }

        const instructions = tx.transaction.message.instructions;
        if (instructions.some((ix) => ix.programId.equals(CERTIFICATE_PROGRAM_ID))) {
          kind = "certificate";
        }

        const addressStr = pubkey.toBase58();
        for (const ix of instructions) {
          if ("parsed" in ix && ix.program === "system" && ix.parsed?.type === "transfer") {
            const info = ix.parsed.info as { source: string; destination: string; lamports: number };
            if (info.source === addressStr) {
              counterparty = info.destination;
              break;
            }
            if (info.destination === addressStr) {
              counterparty = info.source;
              break;
            }
          }
        }

        // Certificate transactions are labeled by `kind`, not by counterparty.
        if (kind === "certificate") counterparty = null;
      }

      return {
        signature: sigInfo.signature,
        blockTime: sigInfo.blockTime ?? null,
        status,
        direction,
        changeSol,
        counterparty,
        explorerUrl: getTxExplorerUrl(sigInfo.signature),
        kind,
      };
    });
  } catch {
    return [];
  }
}

export interface SendSolResult {
  signature: string;
  explorerUrl: string;
}

/**
 * Builds, signs (with `from`), and submits a SOL transfer. Throws on any
 * failure — callers are expected to catch and translate to an API error.
 */
export async function sendSol(from: Keypair, toAddress: string, amountSol: number): Promise<SendSolResult> {
  const connection = new Connection(getRpcUrl(), "confirmed");
  const toPubkey = new PublicKey(toAddress);
  const lamports = Math.round(amountSol * LAMPORTS_PER_SOL);

  const tx = new Transaction().add(
    SystemProgram.transfer({ fromPubkey: from.publicKey, toPubkey, lamports }),
  );

  const signature = await sendAndConfirmTransaction(connection, tx, [from], { commitment: "confirmed" });
  return { signature, explorerUrl: getTxExplorerUrl(signature) };
}
