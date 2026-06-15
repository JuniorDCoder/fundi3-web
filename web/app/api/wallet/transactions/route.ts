import { NextRequest, NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";
import { deriveStudentPubkey } from "@/lib/certificates/solana";
import { getRecentTransactions, type WalletTransaction } from "@/lib/wallet/solana";
import { notifyUser } from "@/lib/notifications/dispatch";

// GET /api/wallet/transactions
// Returns the authenticated user's most recent Solana transaction history
// (newest first), best-effort — an RPC failure returns an empty list.
export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const pubkey = deriveStudentPubkey(user.id);
  const transactions = await getRecentTransactions(pubkey);

  await notifyAboutNewDeposits(user, transactions);

  return NextResponse.json({ transactions });
}

/**
 * Diffs the newest-first transaction list against `user_wallet_watch` to
 * detect incoming SOL transfers that arrived since the last refresh, and
 * fires a "wallet_receive" notification for each. The first-ever call for a
 * user just records a baseline without notifying, so pre-existing history
 * doesn't flood the notification center.
 */
async function notifyAboutNewDeposits(user: User, transactions: WalletTransaction[]): Promise<void> {
  if (transactions.length === 0) return;

  const admin = createAdminClient();

  try {
    const { data: watch } = await admin
      .from("user_wallet_watch")
      .select("last_signature")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!watch) {
      await admin
        .from("user_wallet_watch")
        .upsert({ user_id: user.id, last_signature: transactions[0].signature }, { onConflict: "user_id" });
      return;
    }

    const lastIndex = transactions.findIndex((tx) => tx.signature === watch.last_signature);
    const newTransactions = lastIndex === -1 ? transactions : transactions.slice(0, lastIndex);

    const deposits = newTransactions
      .filter((tx) => tx.direction === "in" && tx.kind === "transfer" && tx.status === "success" && tx.changeSol !== null)
      .reverse();

    for (const tx of deposits) {
      await notifyUser(
        admin,
        user.id,
        user.email ?? null,
        {
          type: "wallet_receive",
          amountSol: Math.abs(tx.changeSol as number),
          sender: tx.counterparty,
          signature: tx.signature,
          explorerUrl: tx.explorerUrl,
        },
        "en",
      );
    }

    await admin
      .from("user_wallet_watch")
      .upsert({ user_id: user.id, last_signature: transactions[0].signature }, { onConflict: "user_id" });
  } catch (err) {
    console.error("[wallet:transactions] failed to check for new deposits:", err);
  }
}
