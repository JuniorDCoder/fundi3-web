/**
 * Extracts an authenticated Supabase user from either:
 *  - a cookie-based session (web)
 *  - an Authorization: Bearer <token> header (mobile)
 */
import type { NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createClient as createBrowserClient } from "@supabase/supabase-js";
import { createClient as createCookieClient } from "./server";

export async function getUserFromRequest(request: NextRequest): Promise<User | null> {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await client.auth.getUser(token);
    return data.user ?? null;
  }

  const supabase = createCookieClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
