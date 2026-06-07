import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendMail } from "@/lib/email/mailer";
import { welcomeEmail } from "@/lib/email/templates";
import { authMessage, isValidEmail, parseLang } from "@/lib/auth/messages";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const token = typeof body?.token === "string" ? body.token.trim() : "";

  if (!email || !isValidEmail(email) || !token) {
    return NextResponse.json(
      { error: "missing_fields", message: authMessage("missingFields", lang) },
      { status: 400 },
    );
  }

  // Uses the cookie-aware server client so a verified web session is persisted
  // via Set-Cookie on this response. Mobile clients use the returned tokens directly.
  const supabase = createClient();

  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });

  if (error || !data.session || !data.user) {
    return NextResponse.json(
      { error: "invalid_code", message: authMessage("invalidCode", lang) },
      { status: 400 },
    );
  }

  const { subject, html, text } = welcomeEmail(lang);
  sendMail({ to: email, subject, html, text }).catch((mailError) => {
    console.error("[auth/verify] failed to send welcome email:", mailError);
  });

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
