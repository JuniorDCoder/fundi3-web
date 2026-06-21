import type { NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getAdminMetadata, type AdminAppMetadata } from "./metadata";

export interface AuthenticatedAdmin {
  user: User;
  metadata: AdminAppMetadata;
}

/** Resolves the caller (cookie session or Bearer token) and confirms admin access. */
export async function getAuthenticatedAdmin(request: NextRequest): Promise<AuthenticatedAdmin | null> {
  const supabase = createClient();
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : undefined;

  const { data, error } = await supabase.auth.getUser(bearerToken);
  if (error || !data.user) return null;

  const metadata = getAdminMetadata(data.user);
  if (!metadata) return null;

  return { user: data.user, metadata };
}

export function isSuperadmin(metadata: AdminAppMetadata): boolean {
  return metadata.admin_role === "superadmin";
}

export function isTutor(metadata: AdminAppMetadata): boolean {
  return metadata.admin_role === "tutor";
}

export function canManageUsers(metadata: AdminAppMetadata): boolean {
  return metadata.admin_role === "admin" || metadata.admin_role === "superadmin";
}

export function canViewAllData(metadata: AdminAppMetadata): boolean {
  return metadata.admin_role === "admin" || metadata.admin_role === "superadmin";
}
