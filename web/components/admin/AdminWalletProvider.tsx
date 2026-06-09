"use client";

import { useMemo, type ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { clusterApiUrl, type Cluster } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

const NETWORK: Cluster =
  process.env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet-beta" || process.env.NEXT_PUBLIC_SOLANA_NETWORK === "testnet"
    ? process.env.NEXT_PUBLIC_SOLANA_NETWORK
    : "devnet";

/**
 * Wraps the admin login page's "Connect wallet" tab in the Solana wallet
 * adapter context. Scoped to /admin/login (not the whole app) — only admins
 * sign in with a wallet, learners never need this.
 */
export function AdminWalletProvider({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => clusterApiUrl(NETWORK), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
