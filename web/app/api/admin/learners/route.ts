import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin } from "@/lib/admin/guard";
import { listLearners } from "@/lib/admin/learners";

/** GET: every Fundi3 account with platform-wide stats — the admin "Learners" table. */
export async function GET(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const admin = createAdminClient();
  const learners = await listLearners(admin);

  return NextResponse.json({ learners });
}
