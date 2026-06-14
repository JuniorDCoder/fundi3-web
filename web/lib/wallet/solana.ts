/**
 * Shared helpers for the learner-facing Solana wallet (dashboard /wallet page).
 *
 * Every Fundi3 account has a wallet from the moment it's created — the
 * keypair is deterministically derived from the user's id (see
 * lib/certificates/solana.ts), so there's no separate "create wallet" step.
 */

import { Connection, LAMPORTS_PER_SOL, type PublicKey } from "@solana/web3.js";

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
