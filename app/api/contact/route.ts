import { NextRequest, NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  lang: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactBody>;
    const { name, email, subject, message, lang } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── Resend integration ────────────────────────────────────────────────────
    // To enable: npm install resend  and set RESEND_API_KEY in .env.local
    //
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Fundi3 Contact <hello@fundi3.xyz>",
    //   to: ["hello@fundi3.xyz"],
    //   replyTo: email,
    //   subject: `[Fundi3 Contact] ${subject ?? "General"} — ${name}`,
    //   html: `
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject ?? "—"}</p>
    //     <p><strong>Language:</strong> ${lang ?? "—"}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, "<br>")}</p>
    //   `,
    // });
    // ─────────────────────────────────────────────────────────────────────────

    console.info("[contact]", { name, email, subject, lang, messageLength: message.length });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
