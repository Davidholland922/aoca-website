import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson, slugify } from "@/lib/github";

export const runtime = "nodejs";

type Record_ = {
  slug?: string;
  title: string;
  date?: string;
  displayDate?: string;
  image?: string;
  body: string[];
};

/** Create OR edit a news article (upsert by slug into content/articles.json). */
export async function POST(req: NextRequest) {
  try {
    const { password, record, newImage } = (await req.json()) as {
      password: string;
      record: Record_;
      newImage?: { dataUrl: string };
    };

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    const body = (record?.body ?? []).map((p) => p.trim()).filter(Boolean);
    if (!record?.title || body.length === 0) {
      return NextResponse.json(
        { error: "Title and article text are required" },
        { status: 400 }
      );
    }

    const isEdit = !!record.slug;
    const slug = record.slug || slugify(record.title);
    const files: Parameters<typeof commitFiles>[1] = [];

    let image = record.image || "/images/2026-02-arklowwwtpfeb25-1.jpg";
    const base64 = newImage?.dataUrl?.split(",")[1];
    if (base64) {
      const path = `public/images/uploads/${slug}-cover-${Date.now()
        .toString(36)
        .slice(-5)}.jpg`;
      files.push({ path, base64 });
      image = `/${path.replace(/^public\//, "")}`;
    }

    const now = new Date();
    const cleaned = {
      slug,
      title: record.title.trim(),
      date: record.date || now.toISOString().slice(0, 10),
      displayDate:
        record.displayDate ||
        now.toLocaleDateString("en-IE", { month: "long", year: "numeric" }),
      image,
      excerpt:
        body[0].length > 180 ? body[0].slice(0, 180).trimEnd() + "…" : body[0],
      body,
    };

    const current = (await readRepoJson("content/articles.json")) as {
      slug: string;
    }[];
    const next = [cleaned, ...current.filter((a) => a.slug !== slug)];
    files.push({
      path: "content/articles.json",
      utf8: JSON.stringify(next, null, 2) + "\n",
    });

    const commit = await commitFiles(
      `${isEdit ? "Edit" : "Add"} article via admin: ${cleaned.title}`,
      files
    );
    return NextResponse.json({ ok: true, slug, commit });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
