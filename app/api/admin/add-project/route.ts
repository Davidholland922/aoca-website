import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson, slugify } from "@/lib/github";

export const runtime = "nodejs";

type UploadImage = { dataUrl: string };
type IncomingProject = {
  title: string;
  sector: string;
  location?: string;
  summary: string;
  body: string[];
  servicesProvided: string[];
  featured: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const { password, project, images } = (await req.json()) as {
      password: string;
      project: IncomingProject;
      images: UploadImage[];
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
    if (!project?.title || !project?.sector || !project?.summary) {
      return NextResponse.json(
        { error: "Title, sector and summary are required" },
        { status: 400 }
      );
    }
    if (!images?.length) {
      return NextResponse.json(
        { error: "At least one photo is required" },
        { status: 400 }
      );
    }

    const slug = slugify(project.title);
    const files: Parameters<typeof commitFiles>[1] = [];
    const imagePaths: string[] = [];

    images.slice(0, 12).forEach((img, i) => {
      const base64 = img.dataUrl.split(",")[1];
      if (!base64) return;
      const path = `public/images/uploads/${slug}-${i + 1}.jpg`;
      files.push({ path, base64 });
      imagePaths.push(`/${path.replace(/^public\//, "")}`);
    });

    const current = (await readRepoJson("content/projects.json")) as unknown[];
    const record = {
      slug,
      title: project.title.trim(),
      sector: project.sector,
      location: project.location?.trim() || undefined,
      thumb: imagePaths[0],
      hero: imagePaths[0],
      gallery: imagePaths.slice(1),
      summary: project.summary.trim(),
      body: (project.body ?? []).map((p) => p.trim()).filter(Boolean),
      featured: !!project.featured,
      servicesProvided: project.servicesProvided ?? [],
    };
    files.push({
      path: "content/projects.json",
      utf8: JSON.stringify([record, ...current], null, 2) + "\n",
    });

    const commit = await commitFiles(
      `Add project via admin: ${record.title}`,
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
