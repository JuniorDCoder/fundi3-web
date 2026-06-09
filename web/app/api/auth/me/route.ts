import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authMessage, parseLang } from "@/lib/auth/messages";

/**
 * Returns the current user. Web clients are identified via the Supabase
 * session cookies; mobile clients pass `Authorization: Bearer <access_token>`.
 */
export async function GET(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const supabase = createClient();

  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : undefined;

  const { data, error } = await supabase.auth.getUser(bearerToken);

  if (error || !data.user) {
    return NextResponse.json(
      { error: "not_authenticated", message: authMessage("notAuthenticated", lang) },
      { status: 401 },
    );
  }

  return NextResponse.json({ user: data.user });
}
