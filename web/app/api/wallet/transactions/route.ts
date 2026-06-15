import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { deriveStudentPubkey } from "@/lib/certificates/solana";
import { getRecentTransactions } from "@/lib/wallet/solana";

// GET /api/wallet/transactions
// Returns the authenticated user's most recent Solana transaction history
// (newest first), best-effort — an RPC failure returns an empty list.
export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const pubkey = deriveStudentPubkey(user.id);
  const transactions = await getRecentTransactions(pubkey);

  return NextResponse.json({ transactions });
}
