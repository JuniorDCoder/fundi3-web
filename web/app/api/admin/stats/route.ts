import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin } from "@/lib/admin/guard";
import { countAllUsers, listAdminUsers } from "@/lib/admin/users";

/** GET: live counts for the dashboard overview cards — pulled from auth.users. */
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
  const [totalUsers, admins] = await Promise.all([countAllUsers(admin), listAdminUsers(admin)]);

  return NextResponse.json({ totalUsers, totalAdmins: admins.length });
}
