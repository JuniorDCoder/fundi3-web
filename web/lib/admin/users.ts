import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getAdminMetadata, type AdminLoginMethod, type AdminRole } from "./metadata";

// The Admin API has no "find by email" or "find by metadata field" endpoint,
// so we page through users and filter in memory. Fine for an admin-management
// surface (infrequent calls, bounded by MAX_PAGES) — not a hot path.
const PER_PAGE = 200;
const MAX_PAGES = 25;

export interface AdminUserSummary {
  id: string;
  email: string;
  role: AdminRole;
  walletAddress: string | null;
  lastLoginAt: string | null;
  lastLoginMethod: AdminLoginMethod | null;
  createdAt: string;
}

function toSummary(user: User): AdminUserSummary | null {
  const meta = getAdminMetadata(user);
  if (!meta) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    role: meta.admin_role === "superadmin" ? "superadmin" : meta.admin_role === "tutor" ? "tutor" : "admin",
    walletAddress: meta.wallet_address ?? null,
    lastLoginAt: meta.last_login_at ?? null,
    lastLoginMethod: meta.last_login_method ?? null,
    createdAt: user.created_at,
  };
}

async function forEachUser(
  admin: SupabaseClient,
  visit: (user: User) => "stop" | void,
): Promise<void> {
  for (let page = 1; page <= MAX_PAGES; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: PER_PAGE });
    if (error) throw error;

    for (const user of data.users) {
      if (visit(user) === "stop") return;
    }
    if (data.users.length < PER_PAGE) return;
  }
}

export async function listAdminUsers(admin: SupabaseClient): Promise<AdminUserSummary[]> {
  const admins: AdminUserSummary[] = [];
  await forEachUser(admin, (user) => {
    const summary = toSummary(user);
    if (summary) admins.push(summary);
  });
  admins.sort((a, b) => a.email.localeCompare(b.email));
  return admins;
}

export async function countAllUsers(admin: SupabaseClient): Promise<number> {
  let count = 0;
  await forEachUser(admin, () => {
    count += 1;
  });
  return count;
}

/** Every Fundi3 account (learners + admins) — backs the admin "Learners" management page. */
export async function listAllAuthUsers(admin: SupabaseClient): Promise<User[]> {
  const users: User[] = [];
  await forEachUser(admin, (user) => {
    users.push(user);
  });
  return users;
}

export async function findUserByEmail(admin: SupabaseClient, email: string): Promise<User | null> {
  const target = email.trim().toLowerCase();
  let found: User | null = null;
  await forEachUser(admin, (user) => {
    if (user.email?.toLowerCase() === target) {
      found = user;
      return "stop";
    }
  });
  return found;
}

export async function findAdminByWallet(admin: SupabaseClient, walletAddress: string): Promise<User | null> {
  let found: User | null = null;
  await forEachUser(admin, (user) => {
    const meta = getAdminMetadata(user);
    if (meta?.wallet_address === walletAddress) {
      found = user;
      return "stop";
    }
  });
  return found;
}
