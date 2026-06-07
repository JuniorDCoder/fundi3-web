import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: (process.env.SMTP_ENCRYPTION ?? "ssl").toLowerCase() === "ssl",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const fromName = process.env.SMTP_FROM_NAME ?? "Fundi3";
  const fromAddress = process.env.SMTP_FROM_ADDRESS ?? process.env.SMTP_USERNAME;

  await getTransporter().sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}
