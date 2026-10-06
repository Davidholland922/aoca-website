import { NextRequest, NextResponse } from "next/server";
import { safeEqual, vaultReady } from "@/lib/vault";
import { RETENTION_DAYS, deleteApplication, getCv, listApplications } from "@/lib/applications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Admin: list job applications, download a CV, delete an application.
 * Uses APPLICATIONS_PASSWORD when one is set, otherwise the admin password.
 * The password travels in the request body, never in a URL, and CVs are
 * decrypted only here, for the person who supplied it.
 */
const noStore = { "Cache-Control": "no-store, private" };

export async function POST(req: NextRequest) {
  try {
    const { password, action, id } = (await req.json()) as { password?: string; action?: string; id?: string };
    const expected = process.env.APPLICATIONS_PASSWORD || process.env.ADMIN_PASSWORD;
    if (!expected || !password || !safeEqual(password, expected)) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401, headers: noStore });
    }
    if (!vaultReady()) return NextResponse.json({ error: "Storage is not set up" }, { status: 503, headers: noStore });

    if (action === "download" && id) {
      const found = await getCv(id);
      if (!found) return NextResponse.json({ error: "Not found" }, { status: 404, headers: noStore });
      const person = found.app.name.normalize("NFKD").replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-").slice(0, 40) || "applicant";
      const ext = found.app.file.name.split(".").pop();
      return new NextResponse(new Uint8Array(found.cv), {
        headers: {
          ...noStore,
          "Content-Type": found.app.file.type,
          "Content-Disposition": `attachment; filename="CV-${person}.${ext}"`,
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
    if (action === "delete" && id) {
      await deleteApplication(id);
      return NextResponse.json({ ok: true }, { headers: noStore });
    }
    return NextResponse.json(
      { ok: true, applications: await listApplications(), retentionDays: RETENTION_DAYS },
      { headers: noStore }
    );
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unexpected error" }, { status: 500, headers: noStore });
  }
}
