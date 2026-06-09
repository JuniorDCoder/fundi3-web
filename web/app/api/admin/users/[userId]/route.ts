import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin, isSuperadmin } from "@/lib/admin/guard";
import { isValidSolanaAddress } from "@/lib/admin/wallet";
import { findAdminByWallet, listAdminUsers } from "@/lib/admin/users";
import { getAdminMetadata, type AdminRole } from "@/lib/admin/metadata";

interface RouteParams {
  params: { userId: string };
}

async function requireSuperadmin(request: NextRequest, lang: ReturnType<typeof parseLang>) {
  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return { error: NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    ) };
  }
  if (!isSuperadmin(caller.metadata)) {
    return { error: NextResponse.json(
      { error: "not_authorized", message: authMessage("notAuthenticated", lang) },
      { status: 403 },
    ) };
  }
  return { caller };
}

/** PATCH: update an admin's role and/or linked wallet. Superadmin-only. */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const body = await request.json().catch(() => null);
  const lang = parseLang(body?.lang);

  const guard = await requireSuperadmin(request, lang);
  if (guard.error) return guard.error;

  const admin = createAdminClient();
  const { data: targetData, error: targetError } = await admin.auth.admin.getUserById(params.userId);
  const target = targetData?.user;
  const targetMeta = getAdminMetadata(target);
  if (targetError || !target || !targetMeta) {
    return NextResponse.json(
      { error: "user_not_found", message: authMessage("userNotFound", lang) },
      { status: 404 },
    );
  }

  const nextMeta = { ...target.app_metadata };

  if (typeof body?.role === "string") {
    const role: AdminRole = body.role === "superadmin" ? "superadmin" : "admin";
    nextMeta.admin_role = role;
  }

  if ("walletAddress" in (body ?? {})) {
    const raw = typeof body.walletAddress === "string" ? body.walletAddress.trim() : "";
    if (raw) {
      if (!isValidSolanaAddress(raw)) {
        return NextResponse.json(
          { error: "invalid_wallet", message: authMessage("invalidWallet", lang) },
          { status: 400 },
        );
      }
      const existingOwner = await findAdminByWallet(admin, raw);
      if (existingOwner && existingOwner.id !== target.id) {
        return NextResponse.json(
          { error: "wallet_in_use", message: authMessage("walletInUse", lang) },
          { status: 409 },
        );
      }
      nextMeta.wallet_address = raw;
    } else {
      delete nextMeta.wallet_address;
    }
  }

  const { error } = await admin.auth.admin.updateUserById(target.id, { app_metadata: nextMeta });
  if (error) {
    return NextResponse.json(
      { error: "server_error", message: authMessage("serverError", lang) },
      { status: 500 },
    );
  }

  return NextResponse.json({
    admin: {
      id: target.id,
      email: target.email ?? "",
      role: nextMeta.admin_role === "superadmin" ? "superadmin" : "admin",
      walletAddress: nextMeta.wallet_address ?? null,
      lastLoginAt: nextMeta.last_login_at ?? null,
      lastLoginMethod: nextMeta.last_login_method ?? null,
      createdAt: target.created_at,
    },
  });
}

/** DELETE: revoke admin access. Superadmin-only; refuses to remove the last superadmin. */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));

  const guard = await requireSuperadmin(request, lang);
  if (guard.error) return guard.error;

  const admin = createAdminClient();
  const { data: targetData, error: targetError } = await admin.auth.admin.getUserById(params.userId);
  const target = targetData?.user;
  const targetMeta = getAdminMetadata(target);
  if (targetError || !target || !targetMeta) {
    return NextResponse.json(
      { error: "user_not_found", message: authMessage("userNotFound", lang) },
      { status: 404 },
    );
  }

  if (targetMeta.admin_role === "superadmin") {
    const admins = await listAdminUsers(admin);
    const remainingSuperadmins = admins.filter((a) => a.role === "superadmin" && a.id !== target.id);
    if (remainingSuperadmins.length === 0) {
      return NextResponse.json(
        { error: "last_superadmin", message: authMessage("notAuthenticated", lang) },
        { status: 409 },
      );
    }
  }

  const { is_admin, admin_role, wallet_address, last_login_method, last_login_at, ...rest } = target.app_metadata ?? {};
  void is_admin;
  void admin_role;
  void wallet_address;
  void last_login_method;
  void last_login_at;

  const { error } = await admin.auth.admin.updateUserById(target.id, { app_metadata: rest });
  if (error) {
    return NextResponse.json(
      { error: "server_error", message: authMessage("serverError", lang) },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
