import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session?.provider_token && data.user) {
      const identity = data.user.identities?.find((i) => i.provider === "github");
      const identityData = identity?.identity_data;

      if (identity && identityData) {
        const username =
          (identityData.user_name as string | undefined) ??
          (identityData.preferred_username as string | undefined) ??
          (identityData.login as string | undefined) ??
          "";
        const githubUserId = Number(identityData.provider_id ?? identityData.sub ?? 0);

        const admin = createAdminClient();
        await admin.from("github_connections").upsert(
          {
            user_id: data.user.id,
            github_username: username,
            github_user_id: githubUserId,
            access_token: data.session.provider_token,
            scopes: "repo read:user user:email",
          },
          { onConflict: "user_id" },
        );
      }
    }
  }

  return NextResponse.redirect(`${origin}/dashboard/settings?github=connected`);
}
