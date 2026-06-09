import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { findAdminByWallet } from "@/lib/admin/users";
import { isValidSolanaAddress, verifyWalletChallenge, verifyWalletSignature } from "@/lib/admin/wallet";
import { mintSessionForEmail, serializeSession } from "@/lib/admin/session";

const CHALLENGE_FAILURE_KEY = {
  invalid: "invalidChallenge",
  expired: "challengeExpired",
  wallet_mismatch: "invalidChallenge",
} as const;

/**
 * Step 2 of wallet sign-in. Verifies (a) the challenge we issued wasn't
 * tampered with and is fresh, (b) the wallet actually signed it, then (c)
 * looks the wallet up against linked admin accounts and mints a session —
 * the same generateLink+verifyOtp trick app/api/auth/verify uses, since a
 * wallet has no password to check against.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);
  const publicKey = typeof body?.publicKey === "string" ? body.publicKey.trim() : "";
  const message = typeof body?.message === "string" ? body.message : "";
  const serverToken = typeof body?.serverToken === "string" ? body.serverToken.trim() : "";
  const signature = typeof body?.signature === "string" ? body.signature.trim() : "";

  if (!publicKey || !isValidSolanaAddress(publicKey) || !message || !serverToken || !signature) {
    return NextResponse.json(
      { error: "missing_fields", message: authMessage("missingFields", lang) },
      { status: 400 },
    );
  }

  const challenge = verifyWalletChallenge(message, serverToken, publicKey);
  if (!challenge.ok) {
    const key = CHALLENGE_FAILURE_KEY[challenge.reason];
    return NextResponse.json(
      { error: `wallet_${challenge.reason}`, message: authMessage(key, lang) },
      { status: 400 },
    );
  }

  if (!verifyWalletSignature(message, signature, publicKey)) {
    return NextResponse.json(
      { error: "invalid_signature", message: authMessage("invalidSignature", lang) },
      { status: 401 },
    );
  }

  const admin = createAdminClient();
  const adminUser = await findAdminByWallet(admin, publicKey);

  if (!adminUser || !adminUser.email) {
    return NextResponse.json(
      { error: "wallet_not_linked", message: authMessage("walletNotLinked", lang) },
      { status: 403 },
    );
  }

  let minted: Awaited<ReturnType<typeof mintSessionForEmail>>;
  try {
    minted = await mintSessionForEmail(admin, createClient(), adminUser.email);
  } catch (mintError) {
    console.error("[admin/auth/wallet/verify] failed to mint session:", mintError);
    return NextResponse.json(
      { error: "session_mint_failed", message: authMessage("sessionMintFailed", lang) },
      { status: 502 },
    );
  }

  await admin.auth.admin.updateUserById(adminUser.id, {
    app_metadata: {
      ...adminUser.app_metadata,
      last_login_method: "wallet",
      last_login_at: new Date().toISOString(),
    },
  });

  return NextResponse.json({
    user: minted.user,
    session: serializeSession(minted.session),
  });
}
