import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, canManageUsers } from "@/lib/admin/guard";
import { listAllAuthUsers } from "@/lib/admin/users";
import { getAdminMetadata, adminRole } from "@/lib/admin/metadata";

export async function GET(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const caller = await getAuthenticatedAdmin(request);
  if (!caller || !canManageUsers(caller.metadata)) {
    return NextResponse.json(
      { error: "not_authorized", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const query = (request.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();
  if (query.length < 2) {
    return NextResponse.json({ users: [] });
  }

  const admin = createAdminClient();
  const allUsers = await listAllAuthUsers(admin);

  const matches = allUsers
    .filter((u) => u.email?.toLowerCase().includes(query))
    .slice(0, 20)
    .map((u) => {
      const meta = getAdminMetadata(u);
      return {
        id: u.id,
        email: u.email ?? "",
        role: meta ? adminRole(u) : "learner" as const,
      };
    });

  return NextResponse.json({ users: matches });
}
