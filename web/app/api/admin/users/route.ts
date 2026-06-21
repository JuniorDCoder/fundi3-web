import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, isValidEmail, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, isSuperadmin } from "@/lib/admin/guard";
import { isValidSolanaAddress } from "@/lib/admin/wallet";
import { findAdminByWallet, findUserByEmail, listAdminUsers, type AdminUserSummary } from "@/lib/admin/users";
import type { AdminRole } from "@/lib/admin/metadata";
import { logActivity } from "@/lib/activity/log";

function toSummary(userId: string, email: string, role: AdminRole, walletAddress: string | null): AdminUserSummary {
  return {
    id: userId,
    email,
    role,
    walletAddress,
    lastLoginAt: null,
    lastLoginMethod: null,
    createdAt: new Date().toISOString(),
  };
}

/** GET: list admin accounts (the "DB sync" demo — pulled live from auth.users). */
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
  const admins = await listAdminUsers(admin);

  return NextResponse.json({ admins });
}

/** POST: promote an existing Fundi3 account to admin. Superadmin-only. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);

  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }
  const role: AdminRole = body?.role === "superadmin" ? "superadmin" : body?.role === "tutor" ? "tutor" : "admin";

  if (!isSuperadmin(caller.metadata)) {
    if (!(caller.metadata.admin_role === "admin" && role === "tutor")) {
      return NextResponse.json(
        { error: "not_authorized", message: authMessage("notAuthenticated", lang) },
        { status: 403 },
      );
    }
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const walletAddressRaw = typeof body?.walletAddress === "string" ? body.walletAddress.trim() : "";
  const walletAddress = walletAddressRaw || null;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "invalid_email", message: authMessage("invalidEmail", lang) },
      { status: 400 },
    );
  }
  if (walletAddress && !isValidSolanaAddress(walletAddress)) {
    return NextResponse.json(
      { error: "invalid_wallet", message: authMessage("invalidWallet", lang) },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  const target = await findUserByEmail(admin, email);
  if (!target) {
    return NextResponse.json(
      { error: "user_not_found", message: authMessage("userNotFound", lang) },
      { status: 404 },
    );
  }

  if (walletAddress) {
    const existingOwner = await findAdminByWallet(admin, walletAddress);
    if (existingOwner && existingOwner.id !== target.id) {
      return NextResponse.json(
        { error: "wallet_in_use", message: authMessage("walletInUse", lang) },
        { status: 409 },
      );
    }
  }

  const { error } = await admin.auth.admin.updateUserById(target.id, {
    app_metadata: {
      ...target.app_metadata,
      is_admin: true,
      admin_role: role,
      wallet_address: walletAddress ?? target.app_metadata?.wallet_address,
    },
  });

  if (error) {
    return NextResponse.json(
      { error: "server_error", message: authMessage("serverError", lang) },
      { status: 500 },
    );
  }

  await logActivity(admin, caller.user.id, "role_promoted", "user", target.id, {
    email: target.email ?? email,
    role,
  });

  return NextResponse.json({
    admin: toSummary(target.id, target.email ?? email, role, walletAddress ?? target.app_metadata?.wallet_address ?? null),
  });
}
