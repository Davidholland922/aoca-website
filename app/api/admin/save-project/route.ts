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

    if (newImages?.length) {
      const stamp = Date.now().toString(36).slice(-5);
      const paths: string[] = [];
      newImages.slice(0, 12).forEach((img, i) => {
        const base64 = img.dataUrl.split(",")[1];
        if (!base64) return;
        const path = `public/images/uploads/${slug}-${stamp}-${i + 1}.jpg`;
        files.push({ path, base64 });
        paths.push(`/${path.replace(/^public\//, "")}`);
      });
      thumb = paths[0];
      hero = paths[0];
      gallery = paths.slice(1);
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
