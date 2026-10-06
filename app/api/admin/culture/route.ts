import { NextRequest, NextResponse } from "next/server";
import { commitFiles, readRepoJson, type CommitFile } from "@/lib/github";
import { safeEqual } from "@/lib/vault";
import { cultureTextDefaults, type CultureTextKey } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Admin: save the culture page — its wording, its header photo and its
 * gallery (order, removals, replacements and new uploads) in one commit.
 *
 * A photo arrives either as a path that is already on the site, or as a
 * freshly resized JPEG (data URL) to be stored under public/images/uploads.
 */
type Incoming = string | { dataUrl: string };
const MAX_PHOTOS = 60;
const MAX_TEXT = 400;

const isSitePath = (p: string) => /^\/images\/[\w\-./]+\.(jpe?g|png|webp|avif)$/i.test(p) && !p.includes("..");

function jpegBase64(dataUrl: string) {
  const m = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!m) return null;
  const head = Buffer.from(m[1].slice(0, 8), "base64");
  return head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff ? m[1] : null;
}

export async function POST(req: NextRequest) {
  try {
    const { password, text, photos, heroImage } = (await req.json()) as {
      password?: string;
      text?: Record<string, string>;
      photos?: Incoming[];
      heroImage?: Incoming;
    };
    if (!process.env.ADMIN_PASSWORD || !password || !safeEqual(password, process.env.ADMIN_PASSWORD)) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }
    if (!Array.isArray(photos) || photos.length === 0) {
      return NextResponse.json({ error: "Keep at least one photo in the gallery." }, { status: 400 });
    }
    if (photos.length > MAX_PHOTOS) {
      return NextResponse.json({ error: `The gallery holds up to ${MAX_PHOTOS} photos.` }, { status: 400 });
    }

    const files: CommitFile[] = [];
    const stamp = Date.now().toString(36);
    let n = 0;
    const store = (item: Incoming, label: string): string | null => {
      if (typeof item === "string") return isSitePath(item) ? item : null;
      const base64 = item?.dataUrl ? jpegBase64(item.dataUrl) : null;
      if (!base64) return null;
      const path = `public/images/uploads/culture-${label}-${stamp}-${++n}.jpg`;
      files.push({ path, base64 });
      return path.replace(/^public/, "");
    };

    const savedPhotos: string[] = [];
    for (const p of photos) {
      const saved = store(p, "photo");
      if (!saved) return NextResponse.json({ error: "One of the photos could not be read. Please add it again." }, { status: 400 });
      if (!savedPhotos.includes(saved)) savedPhotos.push(saved);
    }
    const savedHero = heroImage ? store(heroImage, "header") : null;
    if (heroImage && !savedHero) {
      return NextResponse.json({ error: "The header photo could not be read. Please add it again." }, { status: 400 });
    }

    // keep only wording that differs from the built-in text
    const cleanText: Partial<Record<CultureTextKey, string>> = {};
    for (const key of Object.keys(cultureTextDefaults) as CultureTextKey[]) {
      const value = String(text?.[key] ?? "").trim().slice(0, MAX_TEXT);
      if (value && value !== cultureTextDefaults[key]) cleanText[key] = value;
    }

    const overrides = (await readRepoJson("content/overrides.json")) as Record<string, unknown>;
    overrides.culture = {
      text: cleanText,
      photos: savedPhotos,
      ...(savedHero ? { heroImage: savedHero } : {}),
    };
    files.push({ path: "content/overrides.json", utf8: JSON.stringify(overrides, null, 2) + "\n" });

    const commit = await commitFiles("Update culture page via admin", files);
    return NextResponse.json({ ok: true, commit, photos: savedPhotos, heroImage: savedHero });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unexpected error" }, { status: 500 });
  }
}
