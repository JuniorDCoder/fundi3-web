import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { deriveStudentPubkey } from "@/lib/certificates/solana";
import { getSolanaNetwork, getExplorerUrl, getBalanceSol } from "@/lib/wallet/solana";

// GET /api/wallet
// Returns the authenticated user's Solana wallet address (deterministically
// derived from their user id — created silently the moment their account
// exists, no separate signup step needed), current network, and SOL balance.
export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const pubkey = deriveStudentPubkey(user.id);
  const address = pubkey.toBase58();
  const network = getSolanaNetwork();
  const balanceSol = await getBalanceSol(pubkey);

  return NextResponse.json({
    address,
    network,
    balanceSol,
    explorerUrl: getExplorerUrl(address),
  });
}
