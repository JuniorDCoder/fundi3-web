import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authMessage, parseLang } from "@/lib/auth/messages";
import { getAuthenticatedAdmin } from "@/lib/admin/guard";
import { randomUUID } from "crypto";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] ?? "bin";
}

export async function POST(request: NextRequest) {
  const lang = parseLang(request.nextUrl.searchParams.get("lang"));
  const caller = await getAuthenticatedAdmin(request);
  if (!caller) {
    return NextResponse.json(
      { error: "not_admin", message: authMessage("notAdminAccount", lang) },
      { status: 403 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form", message: "Expected multipart/form-data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "no_file", message: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "invalid_type", message: "Only JPEG, PNG, WebP, and GIF are allowed" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "too_large", message: "File must be under 5MB" }, { status: 400 });
  }

  const folder = (formData.get("folder") as string) || "general";
  const ext = extFromMime(file.type);
  const filename = `${folder}/${randomUUID()}-${Date.now()}.${ext}`;

  const admin = createAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await admin.storage
    .from("course-images")
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    console.error("[upload] Supabase storage error:", uploadError.message);
    return NextResponse.json({ error: "upload_failed", message: "Upload failed" }, { status: 500 });
  }

  const { data: urlData } = admin.storage.from("course-images").getPublicUrl(filename);

  return NextResponse.json({ url: urlData.publicUrl });
}
