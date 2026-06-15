import { NextRequest, NextResponse } from "next/server";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { deriveStudentPubkey } from "@/lib/certificates/solana";
import { confirmSignature, getSolanaNetwork, getRpcUrl } from "@/lib/wallet/solana";

// POST /api/wallet/airdrop
// Devnet-only: sends 1 SOL from the public faucet to the user's wallet so
// they have something to "interact with" while learning. No-ops with an
// error on testnet/mainnet.
export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  if (getSolanaNetwork() !== "devnet") {
    return NextResponse.json({ error: "unsupported_network" }, { status: 400 });
  }

  try {
    const connection = new Connection(getRpcUrl(), "confirmed");
    const pubkey = deriveStudentPubkey(user.id);
    const signature = await connection.requestAirdrop(pubkey, LAMPORTS_PER_SOL);
    await confirmSignature(connection, signature);
    return NextResponse.json({ signature });
  } catch {
    return NextResponse.json({ error: "airdrop_failed" }, { status: 502 });
  }
}
