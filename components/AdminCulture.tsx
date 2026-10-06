"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ImagePlus, Loader2, RefreshCw, Trash2, Undo2 } from "lucide-react";
import { companyImages, cultureImages, cultureText, cultureTextDefaults, type CultureTextKey } from "@/lib/site";

/**
 * "Culture page" editor: the wording, the header photo and the photo gallery.
 * Photos can be added, replaced, removed and put in any order (drag a photo,
 * or use its arrows). Nothing changes on the website until Save is pressed.
 */
type Photo = { id: string; src: string; dataUrl?: string; /** shown until the site rebuilds with the saved file */ preview?: string };

const MAX_PHOTOS = 60;
const MAX_UPLOAD_BYTES = 3_600_000; // the hosting accepts about 4.5 MB per save

const input =
  "w-full min-h-[44px] border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-300 focus:border-navy-800";

const FIELDS: { key: CultureTextKey; label: string; long?: boolean }[] = [
  { key: "heroTitle", label: "Page heading" },
  { key: "heroLead", label: "Line under the heading", long: true },
  { key: "filmTitle", label: "Film heading" },
  { key: "filmLead", label: "Line under the film heading", long: true },
  { key: "galleryTitle", label: "Gallery heading" },
  { key: "galleryLead", label: "Line under the gallery heading", long: true },
  { key: "valuesTitle", label: "Values heading" },
  { key: "ctaTitle", label: "Closing banner heading" },
  { key: "ctaBody", label: "Closing banner line", long: true },
];

/** Shrinks a photo to website size in the browser, so uploads stay small. */
async function resize(file: File, maxW = 1600, quality = 0.82): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error(`"${file.name}" is not a photo this browser can open. Use a JPG or PNG.`));
      i.src = url;
    });
    const scale = Math.min(1, maxW / img.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff"; // transparent PNGs get a white background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

let counter = 0;
const newId = () => `p${Date.now().toString(36)}${counter++}`;

export default function AdminCulture({ password }: { password: string }) {
  const [text, setText] = useState<Record<CultureTextKey, string>>({ ...cultureText });
  const [photos, setPhotos] = useState<Photo[]>(cultureImages.map((src) => ({ id: newId(), src })));
  const [hero, setHero] = useState<{ src: string; dataUrl?: string; preview?: string }>({ src: companyImages.cultureHero });
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [working, setWorking] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");
  const dragId = useRef<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const addInput = useRef<HTMLInputElement>(null);
  const replaceInput = useRef<HTMLInputElement>(null);
  const heroInput = useRef<HTMLInputElement>(null);
  const replacing = useRef<string | null>(null);

  const touch = () => {
    setDirty(true);
    setSaved(false);
    setErr("");
  };
  const uploadBytes = (list: Photo[], h = hero) =>
    [...list.map((p) => p.dataUrl), h.dataUrl].reduce((n, d) => n + (d ? d.length : 0), 0);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setWorking(true);
    touch();
    try {
      const next = [...photos];
      for (const f of Array.from(files)) {
        if (next.length >= MAX_PHOTOS) throw new Error(`The gallery holds up to ${MAX_PHOTOS} photos.`);
        const dataUrl = await resize(f);
        if (uploadBytes(next) + dataUrl.length > MAX_UPLOAD_BYTES) {
          setPhotos(next);
          throw new Error("That is as many new photos as one save can carry. Press Save, wait a moment, then add the rest.");
        }
        next.unshift({ id: newId(), src: "", dataUrl }); // newest first
      }
      setPhotos(next);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not add that photo");
    } finally {
      setWorking(false);
      if (addInput.current) addInput.current.value = "";
    }
  }

  async function replaceFile(files: FileList | null) {
    const id = replacing.current;
    replacing.current = null;
    if (!files?.[0] || !id) return;
    setWorking(true);
    touch();
    try {
      const dataUrl = await resize(files[0]);
      const without = photos.map((p) => (p.id === id ? { ...p, dataUrl: undefined } : p));
      if (uploadBytes(without) + dataUrl.length > MAX_UPLOAD_BYTES) {
        throw new Error("Press Save first, then replace this photo.");
      }
      setPhotos(photos.map((p) => (p.id === id ? { id: p.id, src: "", dataUrl } : p)));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not use that photo");
    } finally {
      setWorking(false);
      if (replaceInput.current) replaceInput.current.value = "";
    }
  }

  async function replaceHero(files: FileList | null) {
    if (!files?.[0]) return;
    setWorking(true);
    touch();
    try {
      const dataUrl = await resize(files[0], 2000, 0.84);
      if (uploadBytes(photos, { src: "" }) + dataUrl.length > MAX_UPLOAD_BYTES) {
        throw new Error("Press Save first, then change the header photo.");
      }
      setHero({ src: "", dataUrl });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not use that photo");
    } finally {
      setWorking(false);
      if (heroInput.current) heroInput.current.value = "";
    }
  }

  function move(id: string, by: number) {
    const i = photos.findIndex((p) => p.id === id);
    const j = i + by;
    if (i < 0 || j < 0 || j >= photos.length) return;
    const next = [...photos];
    [next[i], next[j]] = [next[j], next[i]];
    setPhotos(next);
    touch();
  }

  function dropOn(targetId: string) {
    const from = dragId.current;
    dragId.current = null;
    setOver(null);
    if (!from || from === targetId) return;
    const next = [...photos];
    const [moved] = next.splice(next.findIndex((p) => p.id === from), 1);
    next.splice(next.findIndex((p) => p.id === targetId), 0, moved);
    setPhotos(next);
    touch();
  }

  async function save() {
    setErr("");
    setSaved(false);
    if (photos.length === 0) return setErr("Keep at least one photo in the gallery.");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/culture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          text,
          photos: photos.map((p) => (p.dataUrl ? { dataUrl: p.dataUrl } : p.src)),
          heroImage: hero.dataUrl ? { dataUrl: hero.dataUrl } : hero.src,
        }),
      });
      const out = (await res.json().catch(() => ({}))) as { photos?: string[]; heroImage?: string | null; error?: string };
      if (!res.ok) throw new Error(out.error || (res.status === 413 ? "Too many new photos in one save. Remove a few, save, then add the rest." : "Something went wrong"));
      // uploaded photos now have a permanent address; keep the preview until the site rebuilds
      if (out.photos?.length === photos.length) {
        setPhotos(photos.map((p, i) => ({ id: p.id, src: out.photos![i], preview: p.dataUrl ?? p.preview })));
      }
      if (out.heroImage) setHero({ src: out.heroImage, preview: hero.dataUrl ?? hero.preview });
      setDirty(false);
      setSaved(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const shown = (p: { src: string; dataUrl?: string; preview?: string }) => p.dataUrl || p.preview || p.src;
  const fresh = (p: { dataUrl?: string }) => !!p.dataUrl;

  return (
    <div className="grid gap-10">
      <input ref={addInput} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} aria-label="Add photos" />
      <input ref={replaceInput} type="file" accept="image/*" className="sr-only" onChange={(e) => replaceFile(e.target.files)} aria-label="Replace photo" />
      <input ref={heroInput} type="file" accept="image/*" className="sr-only" onChange={(e) => replaceHero(e.target.files)} aria-label="Change header photo" />

      {/* GALLERY */}
      <section className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-navy-900">Photos</h3>
            <p className="mt-1 max-w-2xl text-sm text-navy-500">
              The gallery on the culture page, in this order. The same photos scroll across the homepage.
              Drag a photo to move it, or use its arrows. New photos go in at the start.
            </p>
          </div>
          <button
            type="button"
            onClick={() => addInput.current?.click()}
            disabled={working || busy}
            className="flex min-h-[44px] cursor-pointer items-center gap-2 bg-navy-900 px-4 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
          >
            {working ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <ImagePlus size={16} aria-hidden />}
            Add photos
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((p, i) => (
            <li
              key={p.id}
              draggable
              onDragStart={() => (dragId.current = p.id)}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(p.id);
              }}
              onDragLeave={() => setOver((o) => (o === p.id ? null : o))}
              onDrop={(e) => {
                e.preventDefault();
                dropOn(p.id);
              }}
              onDragEnd={() => {
                dragId.current = null;
                setOver(null);
              }}
              className={`group relative cursor-grab border bg-white active:cursor-grabbing ${
                over === p.id ? "border-brand ring-2 ring-brand" : "border-navy-200"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shown(p)} alt={`Culture photo ${i + 1}`} loading="lazy" draggable={false} className="h-full w-full object-cover" />
                <span className="absolute left-1.5 top-1.5 bg-navy-900/85 px-1.5 py-0.5 text-[11px] font-semibold text-white">{i + 1}</span>
                {fresh(p) && (
                  <span className="absolute right-1.5 top-1.5 bg-brand px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">New</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-1 p-1.5">
                <span className="flex">
                  <button type="button" onClick={() => move(p.id, -1)} disabled={i === 0} aria-label={`Move photo ${i + 1} earlier`}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-navy-500 hover:text-navy-900 disabled:cursor-default disabled:opacity-25">
                    <ArrowLeft size={16} aria-hidden />
                  </button>
                  <button type="button" onClick={() => move(p.id, 1)} disabled={i === photos.length - 1} aria-label={`Move photo ${i + 1} later`}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-navy-500 hover:text-navy-900 disabled:cursor-default disabled:opacity-25">
                    <ArrowRight size={16} aria-hidden />
                  </button>
                </span>
                <span className="flex">
                  <button type="button" aria-label={`Replace photo ${i + 1}`} title="Replace with another photo"
                    onClick={() => {
                      replacing.current = p.id;
                      replaceInput.current?.click();
                    }}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-navy-500 hover:text-navy-900">
                    <RefreshCw size={15} aria-hidden />
                  </button>
                  <button type="button" aria-label={`Remove photo ${i + 1}`} title="Remove from the page"
                    onClick={() => {
                      setPhotos(photos.filter((x) => x.id !== p.id));
                      touch();
                    }}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center text-navy-500 hover:text-brand">
                    <Trash2 size={15} aria-hidden />
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-navy-400">
          {photos.length} photo{photos.length === 1 ? "" : "s"}. Any shape works; photos are resized for the web automatically.
        </p>
      </section>

      {/* HEADER PHOTO */}
      <section className="grid gap-3">
        <h3 className="text-lg font-semibold text-navy-900">Header photo</h3>
        <p className="max-w-2xl text-sm text-navy-500">The wide photo behind the heading at the top of the culture page. A landscape photo works best.</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative h-28 w-52 overflow-hidden border border-navy-200 bg-navy-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shown(hero)} alt="Current header photo" className="h-full w-full object-cover" />
          </div>
          <button type="button" onClick={() => heroInput.current?.click()} disabled={working || busy}
            className="flex min-h-[44px] cursor-pointer items-center gap-2 border border-navy-200 bg-white px-4 text-sm font-semibold text-navy-800 hover:border-navy-800 disabled:opacity-60">
            <RefreshCw size={15} aria-hidden /> Change header photo
          </button>
        </div>
      </section>

      {/* WORDING */}
      <section className="grid gap-4">
        <div>
          <h3 className="text-lg font-semibold text-navy-900">Wording</h3>
          <p className="mt-1 max-w-2xl text-sm text-navy-500">
            The headings and lines on the culture page. The list of values is edited under &ldquo;Our values&rdquo;.
          </p>
        </div>
        {FIELDS.map((f) => (
          <label key={f.key} className="grid gap-1.5 text-sm font-medium text-navy-800">
            <span className="flex items-center justify-between gap-3">
              {f.label}
              {text[f.key] !== cultureTextDefaults[f.key] && (
                <button type="button"
                  onClick={() => {
                    setText({ ...text, [f.key]: cultureTextDefaults[f.key] });
                    touch();
                  }}
                  className="flex cursor-pointer items-center gap-1 text-xs font-semibold uppercase tracking-wider text-navy-400 hover:text-brand">
                  <Undo2 size={12} aria-hidden /> Original wording
                </button>
              )}
            </span>
            {f.long ? (
              <textarea className={input} rows={2} maxLength={400} value={text[f.key]}
                onChange={(e) => {
                  setText({ ...text, [f.key]: e.target.value });
                  touch();
                }} />
            ) : (
              <input className={input} maxLength={120} value={text[f.key]}
                onChange={(e) => {
                  setText({ ...text, [f.key]: e.target.value });
                  touch();
                }} />
            )}
          </label>
        ))}
      </section>

      {err && (
        <p role="alert" className="border border-brand/30 bg-brand/5 px-4 py-3 text-sm text-brand-dark">
          {err}
        </p>
      )}
      {saved && (
        <p role="status" className="flex items-center gap-2 border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700">
          <CheckCircle2 size={16} className="text-brand" aria-hidden />
          Saved. The website updates itself within a few minutes.
        </p>
      )}

      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-4 border-t border-navy-100 bg-navy-50/95 px-1 py-3 backdrop-blur">
        <button type="button" onClick={save} disabled={busy || working || !dirty}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            "Save culture page"
          )}
        </button>
        <span className="hidden text-sm text-navy-500 sm:inline">{dirty ? "You have changes that are not saved yet." : "No unsaved changes."}</span>
      </div>
    </div>
  );
}
