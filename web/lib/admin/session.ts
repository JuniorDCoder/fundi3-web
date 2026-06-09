import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

/**
 * Mints a real Supabase session for a known user without a password —
 * the same trick app/api/auth/verify/route.ts already uses for the OTP
 * flow (admin.generateLink → verifyOtp), just with `magiclink` instead of
 * `signup` and no email actually sent. Used for wallet sign-in, where
 * there's no password to check — only a verified wallet signature.
 */
export async function mintSessionForEmail(
  adminClient: SupabaseClient,
  sessionClient: SupabaseClient,
  email: string,
): Promise<{ user: User; session: Session }> {
  const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  const otp = linkData?.properties?.email_otp;
  if (linkError || !otp) {
    throw new Error(linkError?.message ?? "Failed to generate sign-in link");
  }

  const { data, error } = await sessionClient.auth.verifyOtp({
    email,
    token: otp,
    type: "magiclink",
  });

  if (error || !data.session || !data.user) {
    throw new Error(error?.message ?? "Failed to verify sign-in link");
  }

  return { user: data.user, session: data.session };
}

export function serializeSession(session: Session) {
  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    token_type: session.token_type,
  };
}
