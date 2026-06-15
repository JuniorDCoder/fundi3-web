import type { SupabaseClient } from "@supabase/supabase-js";

/** Registers (or refreshes) an Expo push token for a user. */
export async function registerPushToken(admin: SupabaseClient, userId: string, token: string): Promise<void> {
  const { error } = await admin
    .from("user_push_tokens")
    .upsert({ user_id: userId, expo_push_token: token }, { onConflict: "user_id,expo_push_token" });

  if (error) throw error;
}

/** Returns every Expo push token registered for a user. */
export async function getPushTokensForUser(admin: SupabaseClient, userId: string): Promise<string[]> {
  const { data, error } = await admin
    .from("user_push_tokens")
    .select("expo_push_token")
    .eq("user_id", userId);

  if (error) throw error;
  return (data ?? []).map((row) => row.expo_push_token as string);
}

/** Removes tokens Expo reports as no longer registered (e.g. app uninstalled). */
export async function removePushTokens(admin: SupabaseClient, tokens: string[]): Promise<void> {
  if (tokens.length === 0) return;
  const { error } = await admin.from("user_push_tokens").delete().in("expo_push_token", tokens);
  if (error) console.error("[push:tokens] failed to prune stale tokens:", error);
}
