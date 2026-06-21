import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, isSuperadmin } from "@/lib/admin/guard";
import { logActivity } from "@/lib/activity/log";

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
  const { data, error } = await admin
    .from("commission_config")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({
    defaultTutorRate: Number(data.default_tutor_rate),
    platformWalletAddress: data.platform_wallet_address ?? "",
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);

  const caller = await getAuthenticatedAdmin(request);
  if (!caller || !isSuperadmin(caller.metadata)) {
    return NextResponse.json(
      { error: "not_authorized", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  const rate = Number(body?.defaultTutorRate);
  if (isNaN(rate) || rate < 0 || rate > 100) {
    return NextResponse.json(
      { error: "invalid_rate", message: authMessage("invalidRate", lang) },
      { status: 400 },
    );
  }

  const walletAddress = typeof body?.platformWalletAddress === "string"
    ? body.platformWalletAddress.trim()
    : "";

  const admin = createAdminClient();
  const { data: existing } = await admin.from("commission_config").select("id").limit(1).single();

  if (!existing) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const { error } = await admin
    .from("commission_config")
    .update({
      default_tutor_rate: rate,
      platform_wallet_address: walletAddress || null,
      updated_by: caller.user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id);

  if (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  await logActivity(admin, caller.user.id, "commission_updated", "commission", null, {
    rate,
    walletAddress,
  });

  return NextResponse.json({ success: true });
}
