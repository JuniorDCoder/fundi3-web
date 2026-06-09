import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";
import { deriveStudentPubkey } from "@/lib/certificates/solana";

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("display_name, student_pubkey")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });
  if (!data) return NextResponse.json({ profile: null }, { status: 200 });

  return NextResponse.json({ profile: { displayName: data.display_name, studentPubkey: data.student_pubkey } });
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const displayName = typeof body?.displayName === "string" ? body.displayName.trim() : "";

  if (displayName.length < 2 || displayName.length > 100) {
    return NextResponse.json({ error: "Name must be 2–100 characters" }, { status: 400 });
  }

  const studentPubkey = deriveStudentPubkey(user.id).toBase58();

  const supabase = createClient();
  const { error } = await supabase
    .from("user_profiles")
    .upsert(
      { user_id: user.id, display_name: displayName, student_pubkey: studentPubkey },
      { onConflict: "user_id" },
    );

  if (error) return NextResponse.json({ error: "server_error" }, { status: 500 });

  return NextResponse.json({ displayName, studentPubkey });
}
