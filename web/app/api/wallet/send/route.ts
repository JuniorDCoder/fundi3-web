import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseLang } from "@/lib/auth/messages";
import { deriveStudentKeypair, deriveStudentPubkey } from "@/lib/certificates/solana";
import { getBalanceSol, isValidSolanaAddress, sendSol, WALLET_FEE_BUFFER_SOL } from "@/lib/wallet/solana";
import { notifyUser } from "@/lib/notifications/dispatch";

// POST /api/wallet/send
// Body: { password: string, recipient: string, amountSol: number, lang?: "en" | "fr" }
// Re-verifies the user's password (same pattern as /api/wallet/export) before
// signing and submitting a SOL transfer from the user's custodial wallet.
export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user || !user.email) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const recipient = typeof body?.recipient === "string" ? body.recipient.trim() : "";
  const amountSol = typeof body?.amountSol === "number" ? body.amountSol : NaN;
  const lang = parseLang(body?.lang);

  if (!password) {
    return NextResponse.json({ error: "password_required" }, { status: 400 });
  }
  if (!recipient || !isValidSolanaAddress(recipient)) {
    return NextResponse.json({ error: "invalid_recipient" }, { status: 400 });
  }
  if (!Number.isFinite(amountSol) || amountSol <= 0) {
    return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
  }

  const senderPubkey = deriveStudentPubkey(user.id);
  if (recipient === senderPubkey.toBase58()) {
    return NextResponse.json({ error: "self_transfer" }, { status: 400 });
  }

  const verifier = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { error: authError } = await verifier.auth.signInWithPassword({ email: user.email, password });
  if (authError) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  const balance = await getBalanceSol(senderPubkey);
  if (balance === null) {
    return NextResponse.json({ error: "balance_unavailable" }, { status: 502 });
  }
  if (balance < amountSol + WALLET_FEE_BUFFER_SOL) {
    return NextResponse.json({ error: "insufficient_balance" }, { status: 400 });
  }

  try {
    const keypair = deriveStudentKeypair(user.id);
    const result = await sendSol(keypair, recipient, amountSol);

    const admin = createAdminClient();
    await notifyUser(
      admin,
      user.id,
      user.email,
      { type: "wallet_send", amountSol, recipient, signature: result.signature, explorerUrl: result.explorerUrl },
      lang,
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
