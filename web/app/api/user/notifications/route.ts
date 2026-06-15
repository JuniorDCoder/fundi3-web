import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getNotificationPreferences,
  upsertNotificationPreferences,
  type NotificationPreferences,
} from "@/lib/user/preferences";

const PREFERENCE_KEYS: (keyof NotificationPreferences)[] = [
  "emailCourseCompleted",
  "emailNewCourse",
  "emailCertificatePdf",
  "emailWalletActivity",
];

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const admin = createAdminClient();
  const preferences = await getNotificationPreferences(admin, user.id);
  return NextResponse.json({ preferences });
}

export async function PUT(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const partial: Partial<NotificationPreferences> = {};
  for (const key of PREFERENCE_KEYS) {
    if (key in body) {
      const value = (body as Record<string, unknown>)[key];
      if (typeof value !== "boolean") {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
      }
      partial[key] = value;
    }
  }

  const admin = createAdminClient();
  const preferences = await upsertNotificationPreferences(admin, user.id, partial);
  return NextResponse.json({ preferences });
}
