import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import bs58 from "bs58";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { deriveStudentKeypair } from "@/lib/certificates/solana";

// POST /api/wallet/export
// Body: { password: string }
// Re-verifies the user's password before revealing their wallet's private
// key — the key itself is re-derived on demand and never stored anywhere.
export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user || !user.email) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!password) {
    return NextResponse.json({ error: "password_required" }, { status: 400 });
  }

  const verifier = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { error } = await verifier.auth.signInWithPassword({ email: user.email, password });
  if (error) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  const secretKey = bs58.encode(deriveStudentKeypair(user.id).secretKey);
  return NextResponse.json({ secretKey });
}
