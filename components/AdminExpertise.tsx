"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import clsx from "clsx";
import { allServices, hiddenSlugs, type Service } from "@/lib/site";

const input =
  "w-full min-h-[44px] border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-300 focus:border-navy-800";
const label = "mb-2 block text-sm font-medium text-navy-800";

async function resizeImage(file: File, maxW = 1600): Promise<string> {
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
  return canvas.toDataURL("image/jpeg", 0.82);
}

type SectionRow = { heading: string; body: string };

/** Expertise pages: edit any page, add a new one, remove/restore. */
export default function AdminExpertise({ password }: { password: string }) {
  const [hidden, setHidden] = useState<string[]>(hiddenSlugs);
  const [editing, setEditing] = useState<Service | "new" | null>(null);

  // editor state
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [intro, setIntro] = useState("");
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  function openEditor(s: Service | "new") {
    setEditing(s);
    setSaved(false);
    setErr("");
    setNewImage(null);
    if (s === "new") {
      setTitle(""); setShort(""); setIntro("");
      setSections([{ heading: "", body: "" }]);
      setHighlights([""]);
    } else {
      setTitle(s.title);
      setShort(s.short);
      setIntro(s.intro);
      setSections(s.sections.map((x) => ({ ...x })));
      setHighlights([...s.highlights]);
    }
  }

  async function save() {
    setErr(""); setSaved(false);
    if (!title.trim() || !short.trim() || !intro.trim()) {
      return setErr("Title, short description and introduction are required.");
    }
    setBusy("save");
    try {
      const base = editing !== "new" && editing ? editing : null;
      const res = await fetch("/api/admin/save-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          record: {
            slug: base?.slug,
            title, short, intro,
            icon: base?.icon,
            image: base?.image,
            gallery: base?.gallery,
            sections, highlights,
          },
          newImage: newImage ? { dataUrl: newImage } : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setSaved(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  async function toggleHidden(slug: string, name: string, hide: boolean) {
    setErr(""); setBusy(slug);
    try {
      const res = await fetch("/api/admin/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password, action: hide ? "hide" : "restore", slug, title: name,
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

  // ------- list view -------
  if (!editing) {
    return (
      <div className="grid gap-6">
        <p className="border border-navy-200 bg-white px-4 py-3 text-sm text-navy-600">
          These are the pages under <strong>Expertise</strong> in the site
          menu. Edit any page, add a new one, or remove one from the site
          (reversible). Changes go live within a few minutes.
        </p>
        {err && (
          <p role="alert" className="border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand-dark">
            {err}
          </p>
        )}
        <ul className="grid gap-2">
          {allServices.map((s) => {
            const isHidden = hidden.includes(s.slug);
            return (
              <li key={s.slug}
                className={clsx(
                  "flex flex-wrap items-center justify-between gap-3 border border-navy-100 bg-white px-5 py-3",
                  isHidden && "opacity-60"
                )}>
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">
                    {s.title}
                    {isHidden && (
                      <span className="ml-2 bg-navy-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500">
                        Removed
                      </span>
                    )}
                  </p>
                  <p className="truncate text-xs text-navy-400">{s.short}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEditor(s)}
                    className="flex min-h-[40px] cursor-pointer items-center gap-1.5 border border-navy-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-700 hover:border-navy-800">
                    <Pencil size={14} aria-hidden /> Edit
                  </button>
                  <button type="button" disabled={busy === s.slug}
                    onClick={() => toggleHidden(s.slug, s.title, !isHidden)}
                    className={clsx(
                      "flex min-h-[40px] cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-50",
                      isHidden
                        ? "border-navy-300 text-navy-700 hover:border-navy-800"
                        : "border-brand/40 text-brand hover:bg-brand hover:text-white"
                    )}>
                    {busy === s.slug
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
        <button type="button" onClick={() => openEditor("new")}
          className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
          <Plus size={18} aria-hidden /> Add a new expertise page
        </button>
      </div>
    );
  }

  // ------- editor view -------
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-navy-900">
          {editing === "new" ? "New expertise page" : `Editing: ${title}`}
        </h2>
        <button type="button" onClick={() => setEditing(null)}
          className="cursor-pointer text-sm font-semibold text-brand hover:underline">
          ← Back to list
        </button>
      </div>

      <div>
        <label htmlFor="ex-title" className={label}>
          Page title <span className="text-brand">*</span>
        </label>
        <input id="ex-title" className={input} value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Building Surveying" />
      </div>

      <div>
        <label htmlFor="ex-short" className={label}>
          Short description (menu cards & homepage tile){" "}
          <span className="text-brand">*</span>
        </label>
        <textarea id="ex-short" rows={2} className={input} value={short}
          onChange={(e) => setShort(e.target.value)} />
      </div>

      <div>
        <label htmlFor="ex-intro" className={label}>
          Introduction paragraph <span className="text-brand">*</span>
        </label>
        <textarea id="ex-intro" rows={4} className={input} value={intro}
          onChange={(e) => setIntro(e.target.value)} />
      </div>

      <fieldset>
        <legend className={label}>Page sections (heading + text)</legend>
        <div className="grid gap-3">
          {sections.map((s, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4">
              <div className="flex gap-2">
                <input className={input} placeholder="Section heading"
                  value={s.heading}
                  aria-label={`Section ${i + 1} heading`}
                  onChange={(e) => setSections(sections.map((x, j) => j === i ? { ...x, heading: e.target.value } : x))} />
                <button type="button" aria-label={`Remove section ${i + 1}`}
                  onClick={() => setSections(sections.filter((_, j) => j !== i))}
                  className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
              <textarea className={input} rows={3} placeholder="Section text"
                value={s.body}
                aria-label={`Section ${i + 1} text`}
                onChange={(e) => setSections(sections.map((x, j) => j === i ? { ...x, body: e.target.value } : x))} />
            </div>
          ))}
          <button type="button"
            onClick={() => setSections([...sections, { heading: "", body: "" }])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add section
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>
          &ldquo;What we deliver&rdquo; bullet points
        </legend>
        <div className="grid gap-2">
          {highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input className={input} value={h}
                aria-label={`Bullet ${i + 1}`}
                placeholder="e.g. Technical due diligence"
                onChange={(e) => setHighlights(highlights.map((x, j) => (j === i ? e.target.value : x)))} />
              <button type="button" aria-label={`Remove bullet ${i + 1}`}
                onClick={() => setHighlights(highlights.filter((_, j) => j !== i))}
                className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                <Trash2 size={15} aria-hidden />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setHighlights([...highlights, ""])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add bullet
          </button>
        </div>
      </fieldset>

      <div>
        <span className={label}>
          Page photo{" "}
          <span className="font-normal text-navy-500">
            — optional; replaces the current one
          </span>
        </span>
        <label className="flex min-h-[6rem] cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-navy-200 bg-white p-5 text-navy-500 hover:border-brand hover:text-brand">
          <ImagePlus size={24} aria-hidden />
          <span className="text-sm font-medium">
            {newImage ? "Photo selected ✓ (click to change)" : "Choose a photo"}
          </span>
          <input type="file" accept="image/*" className="sr-only"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) setNewImage(await resizeImage(f));
            }} />
        </label>
      </div>

      {err && (
        <p role="alert" className="border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand-dark">
          {err}
        </p>
      )}
      {saved && (
        <p role="status" className="flex items-center gap-2 border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700">
          <CheckCircle2 size={16} className="text-brand" aria-hidden />
          Saved — the website updates itself within a few minutes.
        </p>
      )}

      <div>
        <button type="button" onClick={save} disabled={busy === "save"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {busy === "save" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Saving…
            </>
          ) : editing === "new" ? (
            "Publish new page"
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}
