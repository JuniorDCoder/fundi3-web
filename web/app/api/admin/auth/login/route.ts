import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, isValidEmail, parseLang } from "@/lib/auth/messages";
import { isAdminUser } from "@/lib/admin/metadata";
import { serializeSession } from "@/lib/admin/session";

/** Email + password sign-in for the admin dashboard — same shape as
 * /api/auth/login, plus a check that the account actually has admin access. */
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

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session || !data.user) {
    return NextResponse.json(
      { error: "invalid_credentials", message: authMessage("invalidCredentials", lang) },
      { status: 401 },
    );
  }

  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const admin = createAdminClient();
  await admin.auth.admin.updateUserById(data.user.id, {
    app_metadata: {
      ...data.user.app_metadata,
      last_login_method: "password",
      last_login_at: new Date().toISOString(),
    },
  });

  return NextResponse.json({
    user: data.user,
    session: serializeSession(data.session),
  });
}
