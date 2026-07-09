"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Newspaper,
  HardHat,
  X,
  ListChecks,
  Trash2,
  RotateCcw,
  Settings2,
  Layers,
  Pencil,
  Star,
} from "lucide-react";
import clsx from "clsx";
import {
  sectors,
  services,
  allProjects,
  hiddenSlugs,
  featuredSlugs,
  type Project,
} from "@/lib/site";
import { allInsights, type Article } from "@/lib/insights";
import AdminSections from "@/components/AdminSections";
import AdminExpertise from "@/components/AdminExpertise";

type Shot = { dataUrl: string; name: string };
type Mode = "project" | "article" | "manage" | "expertise" | "details";

/** Downscale a photo in the browser so uploads stay small and consistent. */
async function resizeImage(file: File, maxW = 1600): Promise<Shot> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = document.createElement("img");
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });
  const scale = Math.min(1, maxW / img.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { dataUrl: canvas.toDataURL("image/jpeg", 0.82), name: file.name };
}

const inputCls =
  "w-full min-h-[48px] border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-300 focus:border-navy-800";
const labelCls = "mb-2 block text-sm font-medium text-navy-800";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [mode, setMode] = useState<Mode>("project");

  // shared publish form state
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<{
    thumb?: string;
    hero?: string;
    gallery?: string[];
    image?: string;
    date?: string;
    displayDate?: string;
  }>({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [shots, setShots] = useState<Shot[]>([]);
  const [status, setStatus] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");
  const [publishedMode, setPublishedMode] = useState<Mode>("project");

  // project-only
  const [sector, setSector] = useState(sectors[0].slug);
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [servicesText, setServicesText] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);

  const maxShots = mode === "project" ? 12 : 1;

  async function addFiles(files: FileList | null) {
    if (!files) return;
    setError("");
    const next = [...shots];
    for (const f of Array.from(files).slice(0, maxShots - next.length)) {
      next.push(await resizeImage(f));
    }
    setShots(next.slice(0, maxShots));
  }

  function reset() {
    setTitle(""); setLocation(""); setSummary(""); setBody("");
    setServicesText(""); setSelected([]); setShots([]); setFeatured(false);
    setVideoPath("");
    setEditingSlug(null); setExistingImages({});
    setStatus("idle"); setError("");
  }

  function startEditProject(p: Project) {
    reset();
    setMode("project");
    setEditingSlug(p.slug);
    setTitle(p.title);
    setSector(p.sector);
    setLocation(p.location ?? "");
    setSummary(p.summary);
    setBody(p.body.join("\n\n"));
    setServicesText((p.servicesText ?? []).join("\n\n"));
    setVideoPath(p.video ?? "");
    setSelected(p.servicesProvided ?? []);
    setFeatured(
      featuredSlugs ? featuredSlugs.includes(p.slug) : !!p.featured
    );
    setExistingImages({ thumb: p.thumb, hero: p.hero, gallery: p.gallery });
    window.scrollTo({ top: 0 });
  }

  function startEditArticle(a: Article) {
    reset();
    setMode("article");
    setEditingSlug(a.slug);
    setTitle(a.title);
    setBody(a.body.join("\n\n"));
    setExistingImages({
      image: a.image,
      date: a.date,
      displayDate: a.displayDate,
    });
    window.scrollTo({ top: 0 });
  }

  async function publish() {
    setError("");
    const paragraphs = body.split(/\n\s*\n/).filter((p) => p.trim());
    if (!title.trim()) return setError("A title is required.");
    if (mode === "project") {
      if (!summary.trim()) return setError("The short summary is required.");
      if (shots.length === 0 && !existingImages.thumb)
        return setError("Add at least one photo — the first becomes the cover.");
    } else if (paragraphs.length === 0) {
      return setError("Write the article text before publishing.");
    }

    setStatus("busy");
    try {
      const endpoint =
        mode === "project" ? "/api/admin/save-project" : "/api/admin/save-article";
      const payload =
        mode === "project"
          ? {
              password,
              record: {
                slug: editingSlug ?? undefined,
                title, sector, location, summary,
                thumb: existingImages.thumb,
                hero: existingImages.hero,
                gallery: existingImages.gallery,
                video: videoPath || undefined,
                videoPoster: undefined,
                body: paragraphs,
                servicesProvided: selected,
                servicesText: servicesText
                  .split(/\n\s*\n/)
                  .filter((p) => p.trim()),
                featured,
              },
              newImages: shots.length
                ? shots.map((s) => ({ dataUrl: s.dataUrl }))
                : undefined,
            }
          : {
              password,
              record: {
                slug: editingSlug ?? undefined,
                title,
                body: paragraphs,
                image: existingImages.image,
                date: existingImages.date,
                displayDate: existingImages.displayDate,
              },
              newImage: shots[0] ? { dataUrl: shots[0].dataUrl } : undefined,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setPublishedSlug(json.slug);
      setPublishedMode(mode);
      setStatus("done");
    } catch (e) {
      setStatus("idle");
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (!unlocked) {
    return (
      <div className="blueprint flex min-h-svh items-center justify-center bg-navy-950 px-5">
        <form
          className="w-full max-w-sm border border-white/10 bg-navy-900/70 p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (password.trim()) setUnlocked(true);
          }}
        >
          <Image
            src="/aoca-logo-white.png"
            alt="AOCA"
            width={190}
            height={95}
            unoptimized
            className="h-12 w-auto"
          />
          <h1 className="mt-6 text-xl font-semibold text-white">
            Website updates
          </h1>
          <div className="rule" />
          <label htmlFor="pw" className="mt-6 block text-sm text-navy-200">
            Password
          </label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-white/20 bg-navy-950 px-4 py-3 text-white focus:border-brand"
            autoFocus
          />
          <button type="submit" className="btn-primary mt-6 w-full">
            Open
          </button>
          <p className="mt-4 text-xs text-navy-400">
            The password is checked when you publish.
          </p>
        </form>
      </div>
    );
  }

  if (status === "done") {
    const path =
      publishedMode === "project"
        ? `/projects/${publishedSlug}`
        : `/insights/${publishedSlug}`;
    return (
      <div className="flex min-h-svh items-center justify-center bg-navy-50/60 px-5">
        <div className="w-full max-w-lg border border-navy-100 bg-white p-10 text-center">
          <CheckCircle2 size={48} className="mx-auto text-brand" aria-hidden />
          <h1 className="mt-5 text-2xl font-semibold text-navy-900">
            {publishedMode === "project" ? "Project" : "Article"} saved
          </h1>
          <div className="rule mx-auto" />
          <p className="mt-5 leading-relaxed text-navy-600">
            <strong>{title}</strong> has been saved. The website rebuilds
            automatically — it will be live at{" "}
            <a
              href={path}
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              {path}
            </a>{" "}
            in about three minutes.
          </p>
          <button type="button" className="btn-primary mt-8" onClick={reset}>
            Back to admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy-50/60 pb-24">
      <div className="blueprint bg-navy-950">
        <div className="container-site py-12">
          <p className="eyebrow">AOCA admin</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            {editingSlug
              ? `Editing: ${title || editingSlug}`
              : "Website updates"}
          </h1>
          <div className="rule" />
          <p className="mt-4 max-w-xl text-sm text-navy-200">
            Changes appear on the website automatically about three minutes
            after you save.
          </p>
        </div>
      </div>

      <div className="container-site mt-10 grid max-w-4xl gap-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(
            [
              { key: "project", label: "A project", Icon: HardHat },
              { key: "article", label: "News article", Icon: Newspaper },
              { key: "manage", label: "Manage existing", Icon: ListChecks },
              { key: "expertise", label: "Expertise pages", Icon: Layers },
              { key: "details", label: "Edit details", Icon: Settings2 },
            ] as const
          ).map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (key !== mode) reset();
                setMode(key);
              }}
              className={clsx(
                "flex min-h-[52px] cursor-pointer items-center justify-center gap-2 border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                mode === key
                  ? "border-brand bg-brand text-white"
                  : "border-navy-200 bg-white text-navy-700 hover:border-navy-800"
              )}
            >
              <Icon size={16} aria-hidden />
              {label}
            </button>
          ))}
        </div>

        {mode === "manage" ? (
          <ManagePanel
            password={password}
            onEditProject={startEditProject}
            onEditArticle={startEditArticle}
          />
        ) : mode === "expertise" ? (
          <AdminExpertise password={password} />
        ) : mode === "details" ? (
          <AdminSections password={password} />
        ) : (
          <>
        {editingSlug && (
          <p className="border border-navy-200 bg-white px-4 py-3 text-sm text-navy-600">
            You are editing an existing {mode}. Photos are kept unless you add
            new ones (new photos replace the old set).
            <button
              type="button"
              onClick={reset}
              className="ml-2 cursor-pointer font-semibold text-brand hover:underline"
            >
              Cancel editing
            </button>
          </p>
        )}
        <div>
          <label htmlFor="title" className={labelCls}>
            {mode === "project" ? "Project name" : "Article title"}{" "}
            <span className="text-brand">*</span>
          </label>
          <input id="title" className={inputCls} value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={mode === "project" ? "e.g. Mountrath Road Housing Scheme" : "e.g. AOCA appointed on new data centre campus"} />
        </div>

        {mode === "project" && (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="sector" className={labelCls}>
                  Sector <span className="text-brand">*</span>
                </label>
                <select id="sector" className={inputCls} value={sector}
                  onChange={(e) => setSector(e.target.value)}>
                  {sectors.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className={labelCls}>Location</label>
                <input id="location" className={inputCls} value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Portlaoise, Co. Laois" />
              </div>
            </div>

            <div>
              <label htmlFor="summary" className={labelCls}>
                Short summary (shown on the project card){" "}
                <span className="text-brand">*</span>
              </label>
              <textarea id="summary" rows={2} className={inputCls} value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="One or two sentences describing the project." />
            </div>
          </>
        )}

        <div>
          <label htmlFor="body" className={labelCls}>
            {mode === "project"
              ? "Project Overview (optional)"
              : "Article text"}
            {mode === "article" && <span className="text-brand"> *</span>}
          </label>
          <textarea id="body" rows={6} className={inputCls} value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Leave an empty line between paragraphs." />
        </div>

        {mode === "project" && (
          <>
            <div>
              <label htmlFor="servicesText" className={labelCls}>
                Services Provided — description (optional)
              </label>
              <textarea id="servicesText" rows={4} className={inputCls}
                value={servicesText}
                onChange={(e) => setServicesText(e.target.value)}
                placeholder="Describe what AOCA delivered on this project. Leave an empty line between paragraphs." />
            </div>

            <div>
              <label htmlFor="videoPath" className={labelCls}>
                Project film{" "}
                <span className="font-normal text-navy-500">
                  — optional; video files need compressing first, so send the
                  film to David and he&apos;ll give you the address to paste
                  here (e.g. /video/projects/my-project.mp4)
                </span>
              </label>
              <input id="videoPath" className={inputCls} value={videoPath}
                onChange={(e) => setVideoPath(e.target.value)}
                placeholder="/video/projects/…" />
            </div>

            <fieldset>
              <legend className={labelCls}>
                Services Provided — tick all that apply
              </legend>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => {
                  const on = selected.includes(s.slug);
                  return (
                    <label key={s.slug}
                      className={clsx(
                        "flex min-h-[44px] cursor-pointer items-center gap-2 border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                        on
                          ? "border-brand bg-brand text-white"
                          : "border-navy-200 bg-white text-navy-700 hover:border-navy-800"
                      )}>
                      <input type="checkbox" checked={on}
                        onChange={() =>
                          setSelected((cur) =>
                            on ? cur.filter((x) => x !== s.slug) : [...cur, s.slug]
                          )
                        }
                        className="h-4 w-4 accent-white"
                      />
                      {s.title}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}

        <div>
          <span className={labelCls}>
            Photos {mode === "project" && !editingSlug && <span className="text-brand">*</span>}{" "}
            <span className="font-normal text-navy-500">
              {mode === "project"
                ? "— first photo becomes the cover; up to 12"
                : "— one cover image (optional)"}
            </span>
          </span>
          <label className="flex min-h-[7rem] cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-navy-200 bg-white p-6 text-navy-500 transition-colors hover:border-brand hover:text-brand">
            <ImagePlus size={28} aria-hidden />
            <span className="text-sm font-medium">
              Click to choose photos (or take them on your phone)
            </span>
            <input type="file" accept="image/*" multiple={mode === "project"}
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)} />
          </label>
          {shots.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {shots.map((s, i) => (
                <div key={i} className="group relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.dataUrl} alt={`Photo ${i + 1}`}
                    className="h-full w-full object-cover" />
                  {i === 0 && (
                    <span className="absolute left-1 top-1 bg-brand px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">
                      Cover
                    </span>
                  )}
                  <button type="button" aria-label={`Remove photo ${i + 1}`}
                    onClick={() => setShots(shots.filter((_, j) => j !== i))}
                    className="absolute right-1 top-1 flex h-6 w-6 cursor-pointer items-center justify-center bg-navy-950/80 text-white hover:bg-brand">
                    <X size={13} aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {mode === "project" && (
          <label className="flex cursor-pointer items-center gap-3 text-sm text-navy-700">
            <input type="checkbox" checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-5 w-5 accent-[#c8202f]" />
            <Star size={15} className="text-brand" aria-hidden />
            Featured project — show large on the homepage
          </label>
        )}

        {error && (
          <p role="alert" className="border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand-dark">
            {error}
          </p>
        )}

        <div>
          <button type="button" onClick={publish} disabled={status === "busy"}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
            {status === "busy" ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden />
                Saving…
              </>
            ) : editingSlug ? (
              "Save changes"
            ) : (
              "Publish to website"
            )}
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

function ManagePanel({
  password,
  onEditProject,
  onEditArticle,
}: {
  password: string;
  onEditProject: (p: Project) => void;
  onEditArticle: (a: Article) => void;
}) {
  const [hidden, setHidden] = useState<string[]>(hiddenSlugs);
  const [feat, setFeat] = useState<string[]>(
    featuredSlugs ?? allProjects.filter((p) => p.featured).map((p) => p.slug)
  );
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState("");

  async function post(url: string, bodyObj: unknown) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Something went wrong");
  }

  async function toggleHidden(slug: string, title: string, hide: boolean) {
    setErr(""); setBusy(slug);
    try {
      await post("/api/admin/manage", {
        password, action: hide ? "hide" : "restore", slug, title,
      });
      setHidden((h) => (hide ? [...h, slug] : h.filter((s) => s !== slug)));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally { setBusy(null); }
  }

  async function toggleFeatured(slug: string) {
    setErr(""); setBusy(slug + ":feat");
    const next = feat.includes(slug)
      ? feat.filter((s) => s !== slug)
      : [...feat, slug];
    try {
      await post("/api/admin/update-section", {
        password, section: "featured", data: next,
      });
      setFeat(next);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally { setBusy(null); }
  }

  const rowCls = (isHidden: boolean) =>
    clsx(
      "flex flex-wrap items-center justify-between gap-3 border border-navy-100 bg-white px-5 py-3",
      isHidden && "opacity-60"
    );
  const btnCls =
    "flex min-h-[40px] shrink-0 cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="grid gap-10">
      <p className="border border-navy-200 bg-white px-4 py-3 text-sm text-navy-600">
        <strong>Edit</strong> opens the full editor. <strong>Remove</strong>{" "}
        takes something off the website (reversible — nothing is deleted).
        The <strong>star</strong> chooses the featured projects on the
        homepage. Changes go live within a few minutes.
      </p>

      {err && (
        <p role="alert" className="border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand-dark">
          {err}
        </p>
      )}

      <section>
        <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
          Projects ({allProjects.length})
        </h2>
        <ul className="grid gap-2">
          {allProjects.map((p) => {
            const isHidden = hidden.includes(p.slug);
            const isFeat = feat.includes(p.slug);
            return (
              <li key={p.slug} className={rowCls(isHidden)}>
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">
                    {p.title}
                    {isHidden && (
                      <span className="ml-2 bg-navy-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500">
                        Removed
                      </span>
                    )}
                  </p>
                  <p className="truncate text-xs text-navy-400">
                    {p.location || p.sector}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" disabled={busy === p.slug + ":feat"}
                    aria-pressed={isFeat}
                    aria-label={`${isFeat ? "Unfeature" : "Feature"} ${p.title}`}
                    onClick={() => toggleFeatured(p.slug)}
                    className={clsx(btnCls,
                      isFeat
                        ? "border-brand bg-brand text-white"
                        : "border-navy-200 text-navy-500 hover:border-brand hover:text-brand")}>
                    {busy === p.slug + ":feat"
                      ? <Loader2 size={14} className="animate-spin" aria-hidden />
                      : <Star size={14} aria-hidden />}
                    {isFeat ? "Featured" : "Feature"}
                  </button>
                  <button type="button"
                    onClick={() => onEditProject(p)}
                    className={clsx(btnCls, "border-navy-300 text-navy-700 hover:border-navy-800")}>
                    <Pencil size={14} aria-hidden /> Edit
                  </button>
                  <button type="button" disabled={busy === p.slug}
                    onClick={() => toggleHidden(p.slug, p.title, !isHidden)}
                    className={clsx(btnCls,
                      isHidden
                        ? "border-navy-300 text-navy-700 hover:border-navy-800"
                        : "border-brand/40 text-brand hover:bg-brand hover:text-white")}>
                    {busy === p.slug
                      ? <Loader2 size={14} className="animate-spin" aria-hidden />
                      : isHidden
                        ? <RotateCcw size={14} aria-hidden />
                        : <Trash2 size={14} aria-hidden />}
                    {isHidden ? "Restore" : "Remove"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
          News articles ({allInsights.length})
        </h2>
        <ul className="grid gap-2">
          {allInsights.map((a) => {
            const isHidden = hidden.includes(a.slug);
            return (
              <li key={a.slug} className={rowCls(isHidden)}>
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">
                    {a.title}
                    {isHidden && (
                      <span className="ml-2 bg-navy-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500">
                        Removed
                      </span>
                    )}
                  </p>
                  <p className="truncate text-xs text-navy-400">{a.displayDate}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button"
                    onClick={() => onEditArticle(a)}
                    className={clsx(btnCls, "border-navy-300 text-navy-700 hover:border-navy-800")}>
                    <Pencil size={14} aria-hidden /> Edit
                  </button>
                  <button type="button" disabled={busy === a.slug}
                    onClick={() => toggleHidden(a.slug, a.title, !isHidden)}
                    className={clsx(btnCls,
                      isHidden
                        ? "border-navy-300 text-navy-700 hover:border-navy-800"
                        : "border-brand/40 text-brand hover:bg-brand hover:text-white")}>
                    {busy === a.slug
                      ? <Loader2 size={14} className="animate-spin" aria-hidden />
                      : isHidden
                        ? <RotateCcw size={14} aria-hidden />
                        : <Trash2 size={14} aria-hidden />}
                    {isHidden ? "Restore" : "Remove"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
