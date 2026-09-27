import nodemailer from "nodemailer";
import { contact } from "@/content/about";

export async function POST(request: Request) {
  const { name, email, msg } = await request.json();

  if (typeof msg !== "string" || !msg.trim()) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("Missing GMAIL_USER/GMAIL_APP_PASSWORD env vars");
    return Response.json(
      { error: "Email is not configured" },
      { status: 500 },
    );
  }

  const safeName = typeof name === "string" ? name.replace(/[\r\n]+/g, " ") : "";
  const safeEmail = typeof email === "string" ? email.replace(/[\r\n]+/g, " ") : "";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: contact.email,
      replyTo: safeEmail || undefined,
      subject: `Portfolio · ${safeName || "Hola"}`,
      text: `${msg}\n\n${safeName}${safeEmail ? ` (${safeEmail})` : ""}`,
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return Response.json({ error: "Failed to send message" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
