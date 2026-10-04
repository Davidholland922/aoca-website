import { NextRequest, NextResponse } from "next/server";
import { readRepoJson } from "@/lib/github";

export const runtime = "nodejs";

/** Admin: list recorded enquiries, newest first, straight from the repo. */
export async function POST(req: NextRequest) {
  try {
    const { password } = (await req.json()) as { password: string };
    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    const list = await readRepoJson("content/enquiries.json");
    return NextResponse.json({ ok: true, enquiries: Array.isArray(list) ? list : [] });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
