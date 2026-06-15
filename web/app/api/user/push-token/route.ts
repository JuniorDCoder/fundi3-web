import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";
import { registerPushToken } from "@/lib/push/tokens";

/** POST: register (or refresh) the calling user's Expo push token. */
export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  if (!token) return NextResponse.json({ error: "invalid_token" }, { status: 400 });

  const admin = createAdminClient();
  await registerPushToken(admin, user.id, token);

  return NextResponse.json({ success: true });
}
