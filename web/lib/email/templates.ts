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
                  Bamenda, Cameroun 🇨🇲
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

function ctaButton(href: string, label: string) {
  return `<div style="margin:24px 0;">
    <a href="${href}" style="display:inline-block;font-family:'Space Grotesk',Arial,sans-serif;font-size:14px;font-weight:600;color:${brand.bg};background:${brand.primary};border-radius:10px;padding:12px 24px;text-decoration:none;">
      ${label}
    </a>
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

const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://fundi3.xyz").replace(/\/$/, "");

export function courseCompletedEmail(lang: Lang, courseName: string) {
  const dashboardUrl = `${appUrl}/dashboard`;

  if (lang === "fr") {
    return {
      subject: `Félicitations — vous avez terminé ${courseName} 🎉`,
      html: wrapper(
        lang,
        "Cours terminé ! 🎉",
        `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
           Bravo ! Vous avez terminé <strong>${courseName}</strong>. C'est une étape importante dans votre parcours Web3.
         </p>
         <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
           Rendez-vous sur votre tableau de bord pour réclamer votre certificat NFT, vérifiable sur la blockchain Solana.
         </p>
         ${ctaButton(dashboardUrl, "Réclamer mon certificat")}`,
      ),
      text: `Bravo ! Vous avez terminé ${courseName}.\n\nRendez-vous sur votre tableau de bord pour réclamer votre certificat NFT : ${dashboardUrl}`,
    };
  }

  return {
    subject: `You completed ${courseName} 🎉`,
    html: wrapper(
      lang,
      "Course completed! 🎉",
      `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
         Congratulations! You've completed <strong>${courseName}</strong> — a big step in your Web3 journey.
       </p>
       <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
         Head to your dashboard to claim your NFT certificate, verifiable on the Solana blockchain.
       </p>
       ${ctaButton(dashboardUrl, "Claim my certificate")}`,
    ),
    text: `Congratulations! You've completed ${courseName}.\n\nHead to your dashboard to claim your NFT certificate: ${dashboardUrl}`,
  };
}

export function certificatePdfEmail(lang: Lang, courseName: string) {
  if (lang === "fr") {
    return {
      subject: `Votre certificat — ${courseName}`,
      html: wrapper(
        lang,
        "Votre certificat est prêt 📜",
        `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
           Voici votre certificat de complétion pour <strong>${courseName}</strong>, en pièce jointe (PDF).
         </p>
         <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
           Ce certificat est aussi vérifiable en ligne via le QR code qu'il contient.
         </p>`,
      ),
      text: `Voici votre certificat de complétion pour ${courseName}, en pièce jointe (PDF).`,
    };
  }

  return {
    subject: `Your certificate — ${courseName}`,
    html: wrapper(
      lang,
      "Your certificate is ready 📜",
      `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
         Here's your certificate of completion for <strong>${courseName}</strong>, attached as a PDF.
       </p>
       <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
         It's also verifiable online via the QR code printed on it.
       </p>`,
    ),
    text: `Here's your certificate of completion for ${courseName}, attached as a PDF.`,
  };
}

export function newCourseEmail(lang: Lang, courseTitle: string, courseUrl: string) {
  if (lang === "fr") {
    return {
      subject: `Nouveau cours sur Fundi3 : ${courseTitle}`,
      html: wrapper(
        lang,
        "Nouveau cours disponible 🚀",
        `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
           Un nouveau cours vient d'être publié : <strong>${courseTitle}</strong>.
         </p>
         <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
           Découvrez-le dès maintenant et continuez votre parcours Web3.
         </p>
         ${ctaButton(courseUrl, "Voir le cours")}`,
      ),
      text: `Un nouveau cours vient d'être publié : ${courseTitle}.\n\nDécouvrez-le ici : ${courseUrl}`,
    };
  }

  return {
    subject: `New course on Fundi3: ${courseTitle}`,
    html: wrapper(
      lang,
      "New course available 🚀",
      `<p style="margin:0 0 8px 0;font-size:14px;color:${brand.white};opacity:0.85;">
         A new course just went live: <strong>${courseTitle}</strong>.
       </p>
       <p style="margin:0 0 8px 0;font-size:13px;color:${brand.muted};">
         Check it out now and keep your Web3 journey going.
       </p>
       ${ctaButton(courseUrl, "View course")}`,
    ),
    text: `A new course just went live: ${courseTitle}.\n\nCheck it out here: ${courseUrl}`,
  };
}
