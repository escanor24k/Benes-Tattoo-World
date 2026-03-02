import nodemailer from "nodemailer";

function createTransporter(): nodemailer.Transporter {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail({ subject, html, replyTo }: MailOptions): Promise<void> {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    replyTo,
    subject,
    html,
  });
}
