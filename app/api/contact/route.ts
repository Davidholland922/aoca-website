import { NextResponse } from "next/server";
import { contactKeys } from "@/lib/site";

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
  // One key per destination inbox: WEB3FORMS_ACCESS_KEY (info@aoca.ie)
  // and optionally WEB3FORMS_ACCESS_KEY_UK (info@aoca.co.uk).
  const w3keys = [
    process.env.WEB3FORMS_ACCESS_KEY ??
      contactKeys.find((k) => k.inbox === "ie")?.accessKey,
    process.env.WEB3FORMS_ACCESS_KEY_UK ??
      contactKeys.find((k) => k.inbox === "uk")?.accessKey,
  ].filter((k): k is string => !!k);
  if (w3keys.length) {
    const results = await Promise.all(
      w3keys.map((key) =>
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: key,
            subject: `Project enquiry from ${name}`,
            from_name: "AOCA Website",
            name,
            email,
            phone,
            message,
          }),
        }).catch(() => null)
      )
    );
    // the enquiry counts as delivered if the primary inbox got it
    if (!results[0]?.ok) {
      console.error("[contact] Web3Forms error:", results[0]?.status);
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
