/** Minimal GitHub commit helper used by the /admin publish API routes. */

const OWNER = "Davidholland922";
const REPO = "aoca-website";
const BRANCH = "main";

export async function gh(path: string, init: RequestInit = {}) {
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

export async function readRepoJson(path: string): Promise<unknown> {
  const file = await gh(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
  return JSON.parse(Buffer.from(file.content, "base64").toString("utf8"));
}

export type CommitFile =
  | { path: string; base64: string }
  | { path: string; utf8: string };

/** Commit a set of files to main in one atomic commit. Returns the commit sha. */
export async function commitFiles(message: string, files: CommitFile[]) {
  const ref = await gh(`/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
  const headSha = ref.object.sha;
  const headCommit = await gh(`/repos/${OWNER}/${REPO}/git/commits/${headSha}`);

  const tree: { path: string; mode: string; type: string; sha: string }[] = [];
  for (const f of files) {
    const blob = await gh(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: "POST",
      body: JSON.stringify(
        "base64" in f
          ? { content: f.base64, encoding: "base64" }
          : { content: f.utf8, encoding: "utf-8" }
      ),
    });
    tree.push({ path: f.path, mode: "100644", type: "blob", sha: blob.sha });
  }

  const newTree = await gh(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: headCommit.tree.sha, tree }),
  });
  const commit = await gh(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: newTree.sha,
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
  return commit.sha as string;
}

export function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) + `-${Date.now().toString(36).slice(-4)}`
  );
}
