import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";

/** GET: the calling user's 50 most recent notifications, plus their unread count. */
export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const admin = createAdminClient();

  const [{ data: notifications, error: listError }, { count: unreadCount, error: countError }] = await Promise.all([
    admin
      .from("notifications")
      .select("id, type, title_en, title_fr, body_en, body_fr, data, read_at, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50),
    admin
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .is("read_at", null),
  ]);

  if (listError || countError) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({
    notifications: (notifications ?? []).map((n) => ({
      id: n.id,
      type: n.type,
      titleEn: n.title_en,
      titleFr: n.title_fr,
      bodyEn: n.body_en,
      bodyFr: n.body_fr,
      data: n.data,
      readAt: n.read_at,
      createdAt: n.created_at,
    })),
    unreadCount: unreadCount ?? 0,
  });
}

/** PATCH: mark notifications as read — either specific `ids`, or `all: true` for every unread row. */
export async function PATCH(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const admin = createAdminClient();

  let query = admin.from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", user.id).is("read_at", null);

  if (body?.all === true) {
    // no-op: query already targets all unread rows for this user
  } else if (Array.isArray(body?.ids) && body.ids.every((id: unknown) => typeof id === "string")) {
    if (body.ids.length === 0) return NextResponse.json({ success: true });
    query = query.in("id", body.ids);
  } else {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { error } = await query;
  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });

  return NextResponse.json({ success: true });
}
