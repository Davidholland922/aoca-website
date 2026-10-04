import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson } from "@/lib/github";

export const runtime = "nodejs";

/**
 * Keeps a copy of every contact-form enquiry in content/enquiries.json so
 * the client can see them in /admin even if the notification email goes
 * astray. The email itself is sent by the browser to Web3Forms; this is
 * the belt-and-braces record.
 */
export type Enquiry = {
  id: string;
  at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  delivered: boolean;
};

const MAX = 500; // keep the file small; oldest fall off

export async function POST(req: NextRequest) {
  let body: Partial<Enquiry> & { botcheck?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (body.botcheck) return NextResponse.json({ ok: true }); // honeypot

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const phone = (body.phone ?? "").toString().trim().slice(0, 50);
  const message = (body.message ?? "").toString().trim().slice(0, 5000);
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry: Enquiry = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    name,
    email,
    phone,
    message,
    delivered: body.delivered !== false,
  };

  // two enquiries in the same second can race on the commit; retry once
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      // the file may not exist yet on the first ever enquiry
      const current = (await readRepoJson("content/enquiries.json").catch(() => [])) as Enquiry[];
      const next = [entry, ...(Array.isArray(current) ? current : [])].slice(0, MAX);
      await commitFiles(`Enquiry from ${name}`, [
        { path: "content/enquiries.json", utf8: JSON.stringify(next, null, 2) + "\n" },
      ]);
      return NextResponse.json({ ok: true, id: entry.id });
    } catch (e) {
      if (attempt === 1) {
        console.error("[enquiry] could not record:", e);
        return NextResponse.json({ error: "Could not record" }, { status: 500 });
      }
    }
  }
  return NextResponse.json({ error: "Could not record" }, { status: 500 });
}
