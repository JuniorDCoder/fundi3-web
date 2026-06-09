import type { Lang } from "@/lib/i18n";

const brand = {
  bg: "#0A0F0E",
  surface: "#111915",
  border: "#1E2E28",
  primary: "#0F6E56",
  accent: "#1D9E75",
  amber: "#EF9F27",
  white: "#F5FAF7",
  muted: "#4A6358",
};

function wrapper(lang: Lang, title: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html lang="${lang}">
  <body style="margin:0;padding:0;background:${brand.bg};font-family:Inter,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:480px;background:${brand.surface};border:1px solid ${brand.border};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 0 32px;">
                <span style="font-family:'Space Grotesk',Arial,sans-serif;font-weight:600;font-size:20px;color:${brand.white};letter-spacing:-0.02em;">
                  Fundi<span style="color:${brand.amber};">3</span>
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px 32px;color:${brand.white};">
                <h1 style="font-family:'Space Grotesk',Arial,sans-serif;font-size:20px;font-weight:600;margin:0 0 16px 0;color:${brand.white};">
                  ${title}
                </h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${brand.border};">
                <p style="margin:0;font-size:12px;color:${brand.muted};">
                  Fundi3 — Web3, Enfin Clair. / Web3, Finally Clear.<br/>
                  Buea, Cameroun 🇨🇲
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function codeBlock(code: string) {
  return `<div style="margin:24px 0;text-align:center;">
    <span style="display:inline-block;font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:600;letter-spacing:0.3em;color:${brand.white};background:${brand.bg};border:1px solid ${brand.border};border-radius:12px;padding:16px 24px;">
      ${code}
    </span>
  </div>`;
}

export function verificationEmail(lang: Lang, code: string) {
  if (lang === "fr") {
    return {
      subject: "Votre code de vérification Fundi3",
      html: wrapper(
        lang,
        "Vérifiez votre adresse email",
        `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
           Merci de vous être inscrit sur Fundi3 ! Utilisez le code ci-dessous pour vérifier votre adresse email :
         </p>
         ${codeBlock(code)}
         <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
           Ce code expire dans 60 minutes. Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email en toute sécurité.
         </p>`,
      ),
      text: `Bienvenue sur Fundi3 !\n\nVotre code de vérification est : ${code}\n\nCe code expire dans 60 minutes. Si vous n'avez pas demandé ce code, ignorez cet email.`,
    };
  }

  return {
    subject: "Your Fundi3 verification code",
    html: wrapper(
      lang,
      "Verify your email address",
      `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
         Thanks for signing up for Fundi3! Use the code below to verify your email address:
       </p>
       ${codeBlock(code)}
       <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
         This code expires in 60 minutes. If you didn't request this, you can safely ignore this email.
       </p>`,
    ),
    text: `Welcome to Fundi3!\n\nYour verification code is: ${code}\n\nThis code expires in 60 minutes. If you didn't request this, you can ignore this email.`,
  };
}

export function welcomeEmail(lang: Lang, firstName?: string) {
  const name = firstName?.trim() || (lang === "fr" ? "ami" : "friend");

  if (lang === "fr") {
    return {
      subject: "Bienvenue sur Fundi3 🎉",
      html: wrapper(
        lang,
        `Bienvenue, ${name} !`,
        `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
           Votre compte est vérifié et prêt. Vous pouvez maintenant commencer votre parcours Web3 — en français, à votre rythme, avec des exemples africains.
         </p>
         <p style="margin:16px 0 0 0;font-size:13px;color:${brand.muted};">
           Direction votre tableau de bord pour choisir votre premier cours.
         </p>`,
      ),
      text: `Bienvenue, ${name} !\n\nVotre compte Fundi3 est vérifié et prêt. Connectez-vous pour commencer votre premier cours.`,
    };
  }

  return {
    subject: "Welcome to Fundi3 🎉",
    html: wrapper(
      lang,
      `Welcome, ${name}!`,
      `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
         Your account is verified and ready. You can now start your Web3 journey — in your language, at your pace, with African examples.
       </p>
       <p style="margin:16px 0 0 0;font-size:13px;color:${brand.muted};">
         Head to your dashboard to pick your first course.
       </p>`,
    ),
    text: `Welcome, ${name}!\n\nYour Fundi3 account is verified and ready. Sign in to start your first course.`,
  };
}
