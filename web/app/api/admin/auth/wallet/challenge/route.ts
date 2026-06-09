import { NextRequest, NextResponse } from "next/server";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { createWalletChallenge, isValidSolanaAddress } from "@/lib/admin/wallet";

/** Step 1 of wallet sign-in: hand the connected wallet a message to sign. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);
  const publicKey = typeof body?.publicKey === "string" ? body.publicKey.trim() : "";

  if (!publicKey || !isValidSolanaAddress(publicKey)) {
    return NextResponse.json(
      { error: "invalid_wallet", message: authMessage("invalidWallet", lang) },
      { status: 400 },
    );
  }

  const { message, serverToken } = createWalletChallenge(publicKey);
  return NextResponse.json({ message, serverToken });
}
