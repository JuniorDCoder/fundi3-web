import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendMail } from "@/lib/email/mailer";
import { verificationEmail } from "@/lib/email/templates";
import { authMessage, isValidEmail, parseLang } from "@/lib/auth/messages";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "invalid_email", message: authMessage("invalidEmail", lang) },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "weak_password", message: authMessage("weakPassword", lang) },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
    password,
  });

  if (error || !data?.properties?.email_otp) {
    const alreadyExists =
      error?.code === "email_exists" ||
      error?.status === 422 ||
      /already registered|already exists/i.test(error?.message ?? "");

    return NextResponse.json(
      {
        error: alreadyExists ? "email_in_use" : "signup_failed",
        message: authMessage(alreadyExists ? "emailInUse" : "signupFailed", lang),
      },
      { status: alreadyExists ? 409 : 400 },
    );
  }

  const { subject, html, text } = verificationEmail(lang, data.properties.email_otp);

  try {
    await sendMail({ to: email, subject, html, text });
  } catch (mailError) {
    console.error("[auth/signup] failed to send verification email:", mailError);
    return NextResponse.json(
      { error: "email_send_failed", message: authMessage("emailSendFailed", lang) },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, email });
}
