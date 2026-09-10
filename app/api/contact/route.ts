import { NextResponse } from "next/server";

/**
 * Contact form endpoint. Delivery options, in order of preference:
 *   1. WEB3FORMS_ACCESS_KEY  — zero DNS changes (client's choice: email
 *      setup must not be touched). Key is tied to info@aoca.ie.
 *   2. RESEND_API_KEY        — needs a verified sender domain (DNS TXT).
 * With neither set the endpoint accepts the message and reports it as
 * simulated so the draft keeps working end-to-end.
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

  // Preferred: Web3Forms — no DNS changes needed. Ciara requests a free
  // access key at web3forms.com using info@aoca.ie (it emails the key to
  // that inbox); enquiries then land there. Add copies in the dashboard.
  const w3 = process.env.WEB3FORMS_ACCESS_KEY;
  if (w3) {
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: w3,
        subject: `Project enquiry from ${name}`,
        from_name: "AOCA Website",
        name,
        email,
        phone,
        message,
      }),
    });
    if (!r.ok) {
      console.error("[contact] Web3Forms error:", r.status, await r.text());
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
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
