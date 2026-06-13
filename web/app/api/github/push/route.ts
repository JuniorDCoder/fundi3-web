import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase/get-user";
import { createAdminClient } from "@/lib/supabase/admin";

const GITHUB_API = "https://api.github.com";
const REPO_NAME_PATTERN = /^[a-zA-Z0-9._-]{1,100}$/;

interface PushBody {
  repoName: string;
  commitMessage: string;
  files: Record<string, string>;
}

function isPushBody(value: unknown): value is PushBody {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.repoName === "string" &&
    typeof v.commitMessage === "string" &&
    !!v.files &&
    typeof v.files === "object" &&
    Object.values(v.files as Record<string, unknown>).every((c) => typeof c === "string")
  );
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "not_authenticated" }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  if (!isPushBody(body)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { repoName, commitMessage, files } = body;
  if (!REPO_NAME_PATTERN.test(repoName)) {
    return NextResponse.json({ error: "invalid_repo_name" }, { status: 400 });
  }
  if (Object.keys(files).length === 0) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: connection } = await admin
    .from("github_connections")
    .select("github_username, access_token")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!connection) {
    return NextResponse.json({ error: "github_not_connected" }, { status: 403 });
  }

  const username = connection.github_username as string;
  const token = connection.access_token as string;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  try {
    // 1. Ensure the repo exists — create it if not.
    let repoRes = await fetch(`${GITHUB_API}/repos/${username}/${repoName}`, { headers });
    if (repoRes.status === 404) {
      repoRes = await fetch(`${GITHUB_API}/user/repos`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: repoName,
          private: false,
          auto_init: true,
          description: "Built with Fundi3 \u{1F680} — https://fundi3.xyz",
        }),
      });
    }
    if (!repoRes.ok) {
      const message = await repoRes.text();
      return NextResponse.json({ error: "github_api_error", message }, { status: 502 });
    }
    const repo = await repoRes.json();
    const branch = repo.default_branch ?? "main";

    // 2. Push each file via the Contents API.
    const fileUrls: Record<string, string> = {};
    for (const [path, content] of Object.entries(files)) {
      const contentsUrl = `${GITHUB_API}/repos/${username}/${repoName}/contents/${path}`;

      let sha: string | undefined;
      const existingRes = await fetch(`${contentsUrl}?ref=${branch}`, { headers });
      if (existingRes.ok) {
        const existing = await existingRes.json();
        sha = existing.sha;
      }

      const putRes = await fetch(contentsUrl, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: commitMessage || `Update ${path} via Fundi3`,
          content: Buffer.from(content, "utf-8").toString("base64"),
          sha,
          branch,
        }),
      });

      if (!putRes.ok) {
        const message = await putRes.text();
        return NextResponse.json({ error: "github_api_error", message }, { status: 502 });
      }

      fileUrls[path] = `${repo.html_url}/blob/${branch}/${path}`;
    }

    return NextResponse.json({ repoUrl: repo.html_url, fileUrls });
  } catch (err) {
    return NextResponse.json(
      { error: "github_api_error", message: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    );
  }
}
