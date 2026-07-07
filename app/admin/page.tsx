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
} from "lucide-react";
import clsx from "clsx";
import { sectors, services, allProjects, hiddenSlugs } from "@/lib/site";
import { allInsights } from "@/lib/insights";

type Shot = { dataUrl: string; name: string };
type Mode = "project" | "article" | "manage";

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

  // shared
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
    setSelected([]); setShots([]); setFeatured(false);
    setStatus("idle"); setError("");
  }

  async function publish() {
    setError("");
    const paragraphs = body.split(/\n\s*\n/).filter((p) => p.trim());
    if (!title.trim()) return setError("A title is required.");
    if (mode === "project") {
      if (!summary.trim()) return setError("The short summary is required.");
      if (shots.length === 0)
        return setError("Add at least one photo — the first becomes the cover.");
    } else if (paragraphs.length === 0) {
      return setError("Write the article text before publishing.");
    }

    setStatus("busy");
    try {
      const endpoint =
        mode === "project" ? "/api/admin/add-project" : "/api/admin/add-article";
      const payload =
        mode === "project"
          ? {
              password,
              project: {
                title, sector, location, summary,
                body: paragraphs,
                servicesProvided: selected,
                featured,
              },
              images: shots.map((s) => ({ dataUrl: s.dataUrl })),
            }
          : {
              password,
              article: { title, body: paragraphs },
              image: shots[0] ? { dataUrl: shots[0].dataUrl } : undefined,
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
            {publishedMode === "project" ? "Project" : "Article"} published
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
            Add another
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
            Update the website
          </h1>
          <div className="rule" />
          <p className="mt-4 max-w-xl text-sm text-navy-200">
            Fill this in and press publish — your update appears on the
            website automatically a few minutes later.
          </p>
        </div>
      </div>

      <div className="container-site mt-10 grid max-w-4xl gap-6">
        {/* what are you adding? */}
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              { key: "project", label: "A project", Icon: HardHat },
              { key: "article", label: "News article", Icon: Newspaper },
              { key: "manage", label: "Manage existing", Icon: ListChecks },
            ] as const
          ).map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={mode === key}
              onClick={() => {
                setMode(key);
                setShots((s) => s.slice(0, key === "article" ? 1 : 12));
                setError("");
              }}
              className={clsx(
                "flex min-h-[64px] cursor-pointer items-center justify-center gap-3 border text-sm font-semibold uppercase tracking-wider transition-colors",
                mode === key
                  ? "border-brand bg-brand text-white"
                  : "border-navy-200 bg-white text-navy-700 hover:border-navy-800"
              )}
            >
              <Icon size={20} aria-hidden />
              {label}
            </button>
          ))}
        </div>

        {mode === "manage" ? (
          <ManagePanel password={password} />
        ) : (
          <>
        <div>
          <label htmlFor="title" className={labelCls}>
            {mode === "project" ? "Project name" : "Article title"}{" "}
            <span className="text-brand">*</span>
          </label>
          <input
            id="title"
            className={inputCls}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              mode === "project"
                ? "e.g. Mountrath Road Housing Scheme"
                : "e.g. AOCA appointed on new data centre project"
            }
          />
        </div>

        {mode === "project" && (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="sector" className={labelCls}>
                  Sector <span className="text-brand">*</span>
                </label>
                <select
                  id="sector"
                  className={inputCls}
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                >
                  {sectors.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className={labelCls}>
                  Location
                </label>
                <input
                  id="location"
                  className={inputCls}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Portlaoise, Co. Laois"
                />
              </div>
            </div>

            <div>
              <label htmlFor="summary" className={labelCls}>
                Short summary (shown on the project card){" "}
                <span className="text-brand">*</span>
              </label>
              <textarea
                id="summary"
                rows={2}
                className={inputCls}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="One or two sentences describing the project."
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="body" className={labelCls}>
            {mode === "project"
              ? "The Project — full description (optional)"
              : "Article text"}{" "}
            {mode === "article" && <span className="text-brand">*</span>}
          </label>
          <textarea
            id="body"
            rows={mode === "article" ? 10 : 6}
            className={inputCls}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Leave an empty line between paragraphs."
          />
        </div>

        {mode === "project" && (
          <fieldset>
            <legend className={labelCls}>Services provided</legend>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => {
                const on = selected.includes(s.slug);
                return (
                  <button
                    key={s.slug}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setSelected((cur) =>
                        on ? cur.filter((x) => x !== s.slug) : [...cur, s.slug]
                      )
                    }
                    className={clsx(
                      "min-h-[44px] cursor-pointer border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                      on
                        ? "border-brand bg-brand text-white"
                        : "border-navy-200 bg-white text-navy-700 hover:border-navy-800"
                    )}
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <div>
          <span className={labelCls}>
            {mode === "project" ? (
              <>
                Photos <span className="text-brand">*</span>{" "}
                <span className="font-normal text-navy-500">
                  — first photo becomes the cover; up to 12
                </span>
              </>
            ) : (
              <>
                Cover photo{" "}
                <span className="font-normal text-navy-500">
                  — optional; one image
                </span>
              </>
            )}
          </span>
          <label className="flex min-h-[7rem] cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-navy-200 bg-white p-6 text-navy-500 transition-colors hover:border-brand hover:text-brand">
            <ImagePlus size={28} aria-hidden />
            <span className="text-sm font-medium">
              Click to choose photos (or take them on your phone)
            </span>
            <input
              type="file"
              accept="image/*"
              multiple={mode === "project"}
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
          {shots.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {shots.map((s, i) => (
                <div key={i} className="group relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.dataUrl}
                    alt={`Photo ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute left-1 top-1 bg-brand px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label={`Remove photo ${i + 1}`}
                    onClick={() => setShots(shots.filter((_, j) => j !== i))}
                    className="absolute right-1 top-1 flex h-6 w-6 cursor-pointer items-center justify-center bg-navy-950/80 text-white hover:bg-brand"
                  >
                    <X size={13} aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {mode === "project" && (
          <label className="flex cursor-pointer items-center gap-3 text-sm text-navy-700">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-5 w-5 accent-[#c8202f]"
            />
            Feature this project on the homepage
          </label>
        )}

        {error && (
          <p
            role="alert"
            className="border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand-dark"
          >
            {error}
          </p>
        )}

        <div>
          <button
            type="button"
            onClick={publish}
            disabled={status === "busy"}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "busy" ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden />
                Publishing…
              </>
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

function ManagePanel({ password }: { password: string }) {
  const [hidden, setHidden] = useState<string[]>(hiddenSlugs);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState("");

  async function toggle(slug: string, title: string, hide: boolean) {
    setErr("");
    setBusy(slug);
    try {
      const res = await fetch("/api/admin/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: hide ? "hide" : "restore",
          slug,
          title,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setHidden((h) => (hide ? [...h, slug] : h.filter((s) => s !== slug)));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  const renderRow = (slug: string, title: string, sub?: string) => {
    const isHidden = hidden.includes(slug);
    return (
      <li
        key={slug}
        className={clsx(
          "flex items-center justify-between gap-4 border border-navy-100 bg-white px-5 py-3",
          isHidden && "opacity-60"
        )}
      >
        <div className="min-w-0">
          <p className="truncate font-medium text-navy-900">
            {title}
            {isHidden && (
              <span className="ml-2 bg-navy-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500">
                Removed
              </span>
            )}
          </p>
          {sub && <p className="truncate text-xs text-navy-400">{sub}</p>}
        </div>
        <button
          type="button"
          disabled={busy === slug}
          onClick={() => toggle(slug, title, !isHidden)}
          className={clsx(
            "flex min-h-[40px] shrink-0 cursor-pointer items-center gap-2 border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            isHidden
              ? "border-navy-300 text-navy-700 hover:border-navy-800"
              : "border-brand/40 text-brand hover:bg-brand hover:text-white"
          )}
        >
          {busy === slug ? (
            <Loader2 size={14} className="animate-spin" aria-hidden />
          ) : isHidden ? (
            <RotateCcw size={14} aria-hidden />
          ) : (
            <Trash2 size={14} aria-hidden />
          )}
          {isHidden ? "Restore" : "Remove"}
        </button>
      </li>
    );
  };

  return (
    <div className="grid gap-10">
      <p className="border border-navy-200 bg-white px-4 py-3 text-sm text-navy-600">
        Removing takes something off the website within a few minutes — it is
        never deleted, so you can restore it here any time.
      </p>

      {err && (
        <p
          role="alert"
          className="border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand-dark"
        >
          {err}
        </p>
      )}

      <section>
        <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
          Projects ({allProjects.length})
        </h2>
        <ul className="grid gap-2">
          {allProjects.map((p) =>
            renderRow(p.slug, p.title, p.location || p.sector)
          )}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900">
          News articles ({allInsights.length})
        </h2>
        <ul className="grid gap-2">
          {allInsights.map((a) => renderRow(a.slug, a.title, a.displayDate))}
        </ul>
      </section>
    </div>
  );
}
