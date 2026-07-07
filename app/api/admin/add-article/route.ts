import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson, slugify } from "@/lib/github";

export const runtime = "nodejs";

type IncomingArticle = {
  title: string;
  body: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { password, article, image } = (await req.json()) as {
      password: string;
      article: IncomingArticle;
      image?: { dataUrl: string };
    };

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "Server not configured (missing GitHub token)" },
        { status: 500 }
      );
    }
    const body = (article?.body ?? []).map((p) => p.trim()).filter(Boolean);
    if (!article?.title || body.length === 0) {
      return NextResponse.json(
        { error: "Title and article text are required" },
        { status: 400 }
      );
    }

    const slug = slugify(article.title);
    const files: Parameters<typeof commitFiles>[1] = [];

    // cover image (optional — falls back to a real AOCA project photo)
    let imagePath = "/images/2026-02-arklowwwtpfeb25-1.jpg";
    const base64 = image?.dataUrl?.split(",")[1];
    if (base64) {
      const path = `public/images/uploads/${slug}-cover.jpg`;
      files.push({ path, base64 });
      imagePath = `/${path.replace(/^public\//, "")}`;
    }

    const now = new Date();
    const record = {
      slug,
      title: article.title.trim(),
      date: now.toISOString().slice(0, 10),
      displayDate: now.toLocaleDateString("en-IE", {
        month: "long",
        year: "numeric",
      }),
      image: imagePath,
      excerpt:
        body[0].length > 180 ? body[0].slice(0, 180).trimEnd() + "…" : body[0],
      body,
    };

    const current = (await readRepoJson("content/articles.json")) as unknown[];
    files.push({
      path: "content/articles.json",
      utf8: JSON.stringify([record, ...current], null, 2) + "\n",
    });

    const commit = await commitFiles(
      `Add article via admin: ${record.title}`,
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
