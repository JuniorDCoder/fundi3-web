#!/usr/bin/env node
// One-off bootstrap: grants admin access to an existing Fundi3 account.
//
//   node scripts/promote-admin.mjs you@example.com
//   node scripts/promote-admin.mjs you@example.com --role=superadmin --wallet=7xKX...gAsU
//
// Needs SUPABASE_SERVICE_ROLE_KEY (loaded from .env.local) — same service-role
// client used by lib/supabase/admin.ts. After this, manage further admins from
// the dashboard's Admins page (it uses the same app_metadata mechanism).

import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const [, , emailArg, ...flagArgs] = process.argv;

if (!emailArg || !emailArg.includes("@")) {
  console.error("Usage: node scripts/promote-admin.mjs <email> [--role=admin|superadmin] [--wallet=<base58 pubkey>]");
  process.exit(1);
}

const flags = Object.fromEntries(
  flagArgs
    .map((arg) => arg.match(/^--([^=]+)=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);

const email = emailArg.trim().toLowerCase();
const role = flags.role === "superadmin" ? "superadmin" : "admin";
const wallet = flags.wallet?.trim() || undefined;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(target) {
  const perPage = 200;
  for (let page = 1; page <= 25; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find((u) => u.email?.toLowerCase() === target);
    if (match) return match;
    if (data.users.length < perPage) return null;
  }
  return null;
}

const user = await findUserByEmail(email);

if (!user) {
  console.error(`No Fundi3 account found for ${email}. Sign up at /auth/signup first, then re-run this.`);
  process.exit(1);
}

const { error } = await supabase.auth.admin.updateUserById(user.id, {
  app_metadata: {
    ...user.app_metadata,
    is_admin: true,
    admin_role: role,
    ...(wallet ? { wallet_address: wallet } : {}),
  },
});

if (error) {
  console.error("Failed to promote user:", error.message);
  process.exit(1);
}

console.log(`✓ ${email} is now a Fundi3 ${role}${wallet ? ` (wallet linked: ${wallet})` : ""}.`);
console.log("  Sign in at /admin/login.");
