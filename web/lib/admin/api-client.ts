import { createClient } from "@/lib/supabase/client";
import type { Lang } from "@/lib/i18n";

export type ApiError = { error: string; message: string };

/** Authenticated fetch helper for admin API routes — attaches the session bearer token. */
export async function authedFetch(path: string, lang: Lang, init: RequestInit = {}): Promise<Response> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("no_session");

  // GET/HEAD requests can't carry a body — fetch() throws synchronously if one is set.
  const method = (init.method ?? "GET").toUpperCase();
  const canHaveBody = method !== "GET" && method !== "HEAD";
  const body = canHaveBody ? (init.body ?? JSON.stringify({ lang })) : undefined;

  return fetch(path, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body,
  });
}
