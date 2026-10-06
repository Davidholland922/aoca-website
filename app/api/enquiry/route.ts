import { NextRequest, NextResponse } from "next/server";
import { vaultPut, vaultReady } from "@/lib/vault";

export const runtime = "nodejs";

/**
 * Keeps a copy of every contact-form enquiry so the client can see them in
 * /admin even if the notification email goes astray. The email itself is
 * sent by the browser to Web3Forms; this is the belt-and-braces record.
 *
 * Copies are stored encrypted in the private vault (lib/vault.ts), one file
 * per enquiry. They are never written to the git repository, which is public.
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

  if (!vaultReady()) {
    console.error("[enquiry] vault is not configured; enquiry not recorded");
    return NextResponse.json({ error: "Could not record" }, { status: 503 });
  }
  try {
    await vaultPut(`enquiries/${entry.id}`, Buffer.from(JSON.stringify(entry)));
    return NextResponse.json({ ok: true, id: entry.id });
  } catch (e) {
    console.error("[enquiry] could not record:", e);
    return NextResponse.json({ error: "Could not record" }, { status: 500 });
  }
}
