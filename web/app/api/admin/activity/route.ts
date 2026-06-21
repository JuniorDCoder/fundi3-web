import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, canViewAllData } from "@/lib/admin/guard";
import { getRecentActivity } from "@/lib/activity/log";

export async function GET(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const caller = await getAuthenticatedAdmin(request);
  if (!caller || !canViewAllData(caller.metadata)) {
    return NextResponse.json(
      { error: "not_authorized", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const limit = Math.min(Number(request.nextUrl.searchParams.get("limit")) || 50, 100);
  const offset = Math.max(Number(request.nextUrl.searchParams.get("offset")) || 0, 0);

  const admin = createAdminClient();
  const entries = await getRecentActivity(admin, limit, offset);

  return NextResponse.json({ entries });
}
