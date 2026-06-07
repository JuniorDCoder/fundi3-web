import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authMessage, isValidEmail, parseLang } from "@/lib/auth/messages";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !isValidEmail(email) || !password) {
    return NextResponse.json(
      { error: "missing_fields", message: authMessage("missingFields", lang) },
      { status: 400 },
    );
  }

  // Cookie-aware server client — sets the web session via Set-Cookie on this
  // response. Mobile clients use the returned access/refresh tokens directly.
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session || !data.user) {
    return NextResponse.json(
      { error: "invalid_credentials", message: authMessage("invalidCredentials", lang) },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: data.user,
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
      token_type: data.session.token_type,
    },
  });
}
