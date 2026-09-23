import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson, slugify } from "@/lib/github";

export const runtime = "nodejs";

type Record_ = {
  slug?: string;
  title: string;
  sector: string;
  location?: string;
  thumb?: string;
  hero?: string;
  gallery?: string[];
  summary: string;
  body: string[];
  featured?: boolean;
  servicesProvided?: string[];
  servicesText?: string[];
  video?: string;
  videoPoster?: string;
  /** Existing photos the editor kept, in order (first = cover). */
  keptImages?: string[];
};

/** Create OR edit a project (upsert by slug into content/projects.json). */
export async function POST(req: NextRequest) {
  try {
    const { password, record, newImages } = (await req.json()) as {
      password: string;
      record: Record_;
      newImages?: { dataUrl: string }[];
    };

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    if (!record?.title || !record?.sector || !record?.summary) {
      return NextResponse.json(
        { error: "Title, sector and summary are required" },
        { status: 400 }
      );
    }

    const isEdit = !!record.slug;
    const slug = record.slug || slugify(record.title);
    const files: Parameters<typeof commitFiles>[1] = [];

    let thumb = record.thumb;
    let hero = record.hero;
    let gallery = record.gallery ?? [];

    const kept = (record.keptImages ?? []).filter(
      (s) => typeof s === "string" && s.startsWith("/images/")
    );
    const newPaths: string[] = [];
    if (newImages?.length) {
      const stamp = Date.now().toString(36).slice(-5);
      newImages.slice(0, 12).forEach((img, i) => {
        const base64 = img.dataUrl.split(",")[1];
        if (!base64) return;
        const path = `public/images/uploads/${slug}-${stamp}-${i + 1}.jpg`;
        files.push({ path, base64 });
        newPaths.push(`/${path.replace(/^public\//, "")}`);
      });
    }
    if (record.keptImages !== undefined || newPaths.length) {
      // The editor sent an explicit photo list: kept photos first (their
      // order preserved), new uploads appended; first overall is the cover.
      const combined = [...kept, ...newPaths].slice(0, 12);
      thumb = combined[0];
      hero = combined[0];
      gallery = combined.slice(1);
    }
    if (!thumb) {
      return NextResponse.json(
        { error: "At least one photo is required" },
        { status: 400 }
      );
    }

    const current = (await readRepoJson("content/projects.json")) as {
      slug: string;
    }[];
    const cleaned = {
      slug,
      title: record.title.trim(),
      sector: record.sector,
      location: record.location?.trim() || undefined,
      thumb,
      hero,
      gallery,
      summary: record.summary.trim(),
      body: (record.body ?? []).map((p) => p.trim()).filter(Boolean),
      featured: !!record.featured,
      servicesProvided: record.servicesProvided ?? [],
      servicesText: (record.servicesText ?? [])
        .map((p) => p.trim())
        .filter(Boolean),
      video: record.video?.trim() || undefined,
      videoPoster: record.videoPoster?.trim() || undefined,
    };
    const next = [cleaned, ...current.filter((p) => p.slug !== slug)];
    files.push({
      path: "content/projects.json",
      utf8: JSON.stringify(next, null, 2) + "\n",
    });

    const commit = await commitFiles(
      `${isEdit ? "Edit" : "Add"} project via admin: ${cleaned.title}`,
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
