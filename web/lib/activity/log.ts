import type { SupabaseClient } from "@supabase/supabase-js";

export type ActivityAction =
  | "course_created"
  | "course_updated"
  | "course_published"
  | "user_enrolled"
  | "certificate_issued"
  | "wallet_send"
  | "wallet_receive"
  | "role_promoted"
  | "role_revoked"
  | "commission_updated";

export type EntityType = "course" | "user" | "certificate" | "wallet" | "commission";

export interface LogEntry {
  id: string;
  actorId: string | null;
  actorEmail: string | null;
  action: ActivityAction;
  entityType: EntityType;
  entityId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

interface LogRow {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export async function logActivity(
  admin: SupabaseClient,
  actorId: string | null,
  action: ActivityAction,
  entityType: EntityType,
  entityId: string | null,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  await admin
    .from("activity_log")
    .insert({ actor_id: actorId, action, entity_type: entityType, entity_id: entityId, metadata })
    .then(({ error }) => {
      if (error) console.error("[activity] log insert failed:", error.message);
    });
}

export async function getRecentActivity(
  admin: SupabaseClient,
  limit = 50,
  offset = 0,
): Promise<LogEntry[]> {
  const { data, error } = await admin
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  const rows = (data ?? []) as LogRow[];

  const actorIds = Array.from(new Set(rows.map((r) => r.actor_id).filter(Boolean))) as string[];
  const emailMap = new Map<string, string>();

  if (actorIds.length > 0) {
    for (let page = 1; page <= 10; page++) {
      const { data: users } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      if (!users?.users) break;
      for (const u of users.users) {
        if (actorIds.includes(u.id)) emailMap.set(u.id, u.email ?? "");
      }
      if (emailMap.size >= actorIds.length || users.users.length < 200) break;
    }
  }

  return rows.map((r) => ({
    id: r.id,
    actorId: r.actor_id,
    actorEmail: r.actor_id ? emailMap.get(r.actor_id) ?? null : null,
    action: r.action as ActivityAction,
    entityType: r.entity_type as EntityType,
    entityId: r.entity_id,
    metadata: r.metadata,
    createdAt: r.created_at,
  }));
}
