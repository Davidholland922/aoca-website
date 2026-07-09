import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson } from "@/lib/github";

export const runtime = "nodejs";

type Record_ = {
  slug?: string;
  title: string;
  short: string;
  icon?: string;
  image?: string;
  gallery?: string[];
  intro: string;
  sections: { heading: string; body: string }[];
  highlights: string[];
};

function serviceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/['’&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Create OR edit an expertise page (upsert by slug into content/services.json). */
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
    if (!record?.title || !record?.short || !record?.intro) {
      return NextResponse.json(
        { error: "Title, short description and introduction are required" },
        { status: 400 }
      );
    }

    const isEdit = !!record.slug;
    const slug = record.slug || serviceSlug(record.title);
    const files: Parameters<typeof commitFiles>[1] = [];

    let image = record.image || "/images/2026-02-1950x1462-cover-1.jpg";
    const base64 = newImage?.dataUrl?.split(",")[1];
    if (base64) {
      const path = `public/images/uploads/expertise-${slug}-${Date.now()
        .toString(36)
        .slice(-5)}.jpg`;
      files.push({ path, base64 });
      image = `/${path.replace(/^public\//, "")}`;
    }

    const cleaned = {
      slug,
      title: record.title.trim(),
      short: record.short.trim(),
      icon: record.icon || "building",
      image,
      gallery: record.gallery ?? [],
      intro: record.intro.trim(),
      sections: (record.sections ?? [])
        .map((s) => ({ heading: s.heading.trim(), body: s.body.trim() }))
        .filter((s) => s.heading && s.body),
      highlights: (record.highlights ?? [])
        .map((h) => h.trim())
        .filter(Boolean),
    };

    const current = (await readRepoJson("content/services.json")) as {
      slug: string;
    }[];
    const next = [cleaned, ...current.filter((s) => s.slug !== slug)];
    files.push({
      path: "content/services.json",
      utf8: JSON.stringify(next, null, 2) + "\n",
    });

    const commit = await commitFiles(
      `${isEdit ? "Edit" : "Add"} expertise page via admin: ${cleaned.title}`,
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
