import { NextRequest, NextResponse } from "next/server";
import { adminGate } from "@/lib/admin-auth";
import { commitFiles, readRepoJson } from "@/lib/github";

export const runtime = "nodejs";

/** Hide (remove from site) or restore a project/article by slug. */
export async function POST(req: NextRequest) {
  try {
    const { password, action, slug, title } = (await req.json()) as {
      password: string;
      action: "hide" | "restore";
      slug: string;
      title?: string;
    };

    const denied = await adminGate(req, password);
    if (denied) return denied;
    if (!slug || (action !== "hide" && action !== "restore")) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const current = (await readRepoJson("content/hidden.json")) as string[];
    const next =
      action === "hide"
        ? Array.from(new Set([...current, slug]))
        : current.filter((s) => s !== slug);

    if (JSON.stringify(next) === JSON.stringify(current)) {
      return NextResponse.json({ ok: true, unchanged: true });
    }

    const commit = await commitFiles(
      `${action === "hide" ? "Remove" : "Restore"} via admin: ${title || slug}`,
      [{ path: "content/hidden.json", utf8: JSON.stringify(next, null, 2) + "\n" }]
    );
    return NextResponse.json({ ok: true, commit });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
