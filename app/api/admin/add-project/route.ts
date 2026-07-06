import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OWNER = "Davidholland922";
const REPO = "aoca-website";
const BRANCH = "main";

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

async function gh(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${path} → ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

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

    const slug = `${slugify(project.title)}-${Date.now().toString(36).slice(-4)}`;

    // current head commit + tree
    const ref = await gh(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
    const headSha = ref.object.sha;
    const headCommit = await gh(`/repos/${OWNER}/${REPO}/git/commits/${headSha}`);

    // image blobs
    const treeEntries: {
      path: string;
      mode: string;
      type: string;
      sha: string;
    }[] = [];
    const imagePaths: string[] = [];
    for (let i = 0; i < Math.min(images.length, 12); i++) {
      const base64 = images[i].dataUrl.split(",")[1];
      if (!base64) continue;
      const blob = await gh(`/repos/${OWNER}/${REPO}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: base64, encoding: "base64" }),
      });
      const path = `public/images/uploads/${slug}-${i + 1}.jpg`;
      treeEntries.push({ path, mode: "100644", type: "blob", sha: blob.sha });
      imagePaths.push(`/${path.replace(/^public\//, "")}`);
    }

    // updated projects.json (new project first)
    const currentFile = await gh(
      `/repos/${OWNER}/${REPO}/contents/content/projects.json?ref=${BRANCH}`
    );
    const current = JSON.parse(
      Buffer.from(currentFile.content, "base64").toString("utf8")
    ) as unknown[];

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

    const updated = JSON.stringify([record, ...current], null, 2) + "\n";
    const jsonBlob = await gh(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: updated, encoding: "utf-8" }),
    });
    treeEntries.push({
      path: "content/projects.json",
      mode: "100644",
      type: "blob",
      sha: jsonBlob.sha,
    });

    // one atomic commit
    const tree = await gh(`/repos/${OWNER}/${REPO}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ base_tree: headCommit.tree.sha, tree: treeEntries }),
    });
    const commit = await gh(`/repos/${OWNER}/${REPO}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: `Add project via admin: ${record.title}`,
        tree: tree.sha,
        parents: [headSha],
        author: {
          name: "AOCA Website Admin",
          email: "admin@aoca.ie",
          date: new Date().toISOString(),
        },
      }),
    });
    await gh(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha }),
    });

    return NextResponse.json({ ok: true, slug, commit: commit.sha });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
