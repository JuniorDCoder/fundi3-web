import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendMail } from "@/lib/email/mailer";
import { verificationEmail } from "@/lib/email/templates";
import { authMessage, isValidEmail, parseLang } from "@/lib/auth/messages";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "invalid_email", message: authMessage("invalidEmail", lang) },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  // Re-issuing a signup link regenerates a fresh OTP for a still-unconfirmed user
  // without erroring — Supabase only rejects this for already-confirmed accounts.
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
    password: crypto.randomUUID(),
  });

  if (error || !data?.properties?.email_otp) {
    // Don't reveal whether the account exists/is confirmed — respond as success either way.
    return NextResponse.json({ success: true, email });
  }

  const { subject, html, text } = verificationEmail(lang, data.properties.email_otp);

  try {
    await sendMail({ to: email, subject, html, text });
  } catch (mailError) {
    console.error("[auth/resend] failed to send verification email:", mailError);
    return NextResponse.json(
      { error: "email_send_failed", message: authMessage("emailSendFailed", lang) },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, email });
}
