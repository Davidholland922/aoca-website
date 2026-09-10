import { NextResponse } from "next/server";

/**
 * Contact form endpoint. Sends the enquiry to AOCA's inboxes via Resend
 * when RESEND_API_KEY is configured (set CONTACT_FROM to a verified
 * sender once the aoca.ie domain is verified in Resend). Without a key
 * the endpoint accepts the message but reports it as simulated so the
 * draft site keeps working end-to-end.
 */
const TO = ["info@aoca.ie", "info@aoca.co.uk"];

export async function POST(req: Request) {
  let body: { name?: string; phone?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 50);
  const message = (body.message ?? "").trim().slice(0, 5000);
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[contact] simulated send (no RESEND_API_KEY):", { name, email, phone });
    return NextResponse.json({ ok: true, simulated: true });
  }

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <h2>New project enquiry — aoca.ie</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Phone:</strong> ${esc(phone) || "—"}</p>
    <p><strong>Message:</strong></p>
    <p>${esc(message).replace(/\n/g, "<br/>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "AOCA Website <onboarding@resend.dev>",
      to: TO,
      reply_to: email,
      subject: `Project enquiry from ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error:", res.status, await res.text());
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
