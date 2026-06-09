import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authMessage, parseLang } from "@/lib/auth/messages";

/**
 * Exchanges a refresh token for a new session. Mainly for mobile clients —
 * the web app refreshes its session automatically via middleware + cookies.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);
  const refreshToken = typeof body?.refresh_token === "string" ? body.refresh_token : "";

  if (!refreshToken) {
    return NextResponse.json(
      { error: "missing_fields", message: authMessage("missingFields", lang) },
      { status: 400 },
    );
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

  if (error || !data.session || !data.user) {
    return NextResponse.json(
      { error: "invalid_refresh_token", message: authMessage("invalidRefreshToken", lang) },
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
