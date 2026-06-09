import type { User } from "@supabase/supabase-js";

export type AdminRole = "admin" | "superadmin";
export type AdminLoginMethod = "password" | "wallet";

/**
 * Admin status lives in the Supabase auth user's `app_metadata` — only
 * settable with the service-role key (see lib/supabase/admin.ts), and
 * included in the session JWT on every sign-in. No separate table/migration
 * needed; `supabaseAdmin.auth.admin.listUsers()` is enough to manage admins.
 */
export interface AdminAppMetadata {
  is_admin?: boolean;
  admin_role?: AdminRole;
  wallet_address?: string;
  last_login_method?: AdminLoginMethod;
  last_login_at?: string;
}

type MetadataBearer = Pick<User, "app_metadata"> | null | undefined;

export function getAdminMetadata(user: MetadataBearer): AdminAppMetadata | null {
  const meta = user?.app_metadata as AdminAppMetadata | undefined;
  return meta?.is_admin ? meta : null;
}

export function isAdminUser(user: MetadataBearer): boolean {
  return getAdminMetadata(user) !== null;
}

export function adminRole(user: MetadataBearer): AdminRole {
  return getAdminMetadata(user)?.admin_role === "superadmin" ? "superadmin" : "admin";
}
