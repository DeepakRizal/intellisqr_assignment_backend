import nodemailer from "nodemailer";

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail({ to, subject, text }: MailOptions) {
  // for development purpose if smtp is not cofigured
  if (!process.env.SMTP_HOST) {
    console.log("Email send to: ", { to, subject, text });
    return;
  }

  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM || "no-reply@example.com",
    to,
    subject,
    text,
  });

  console.log("Email sent:", info.messageId);
}

export default sendEmail;
