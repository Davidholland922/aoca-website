import { NextRequest, NextResponse } from "next/server";
import { adminGate } from "@/lib/admin-auth";
import { vaultGet, vaultList, vaultReady } from "@/lib/vault";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Admin: list recorded enquiries, newest first, from the private vault. */
export async function POST(req: NextRequest) {
  try {
    const { password } = (await req.json()) as { password: string };
    const denied = await adminGate(req, password);
    if (denied) return denied;
    if (!vaultReady()) return NextResponse.json({ error: "Storage is not set up" }, { status: 503 });
    const files = (await vaultList("enquiries/"))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .slice(0, 300);
    const list = (
      await Promise.all(
        files.map(async (f) => {
          try {
            const buf = await vaultGet(f.pathname);
            return buf ? JSON.parse(buf.toString("utf8")) : null;
          } catch {
            return null;
          }
        })
      )
    )
      .filter(Boolean)
      .sort((a, b) => String(b.at).localeCompare(String(a.at)));
    return NextResponse.json({ ok: true, enquiries: list }, { headers: { "Cache-Control": "no-store, private" } });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
