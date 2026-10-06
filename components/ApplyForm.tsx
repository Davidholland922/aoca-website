"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Check, CheckCircle2, Copy, FileText, Loader2, Send, ShieldCheck, UploadCloud, X } from "lucide-react";

/**
 * Job application form with a CV upload.
 *
 * The CV goes to /api/apply, which stores it encrypted in private storage.
 * It is never emailed and never public. AOCA is notified by email (through
 * Web3Forms, like the contact form) and downloads the CV from /admin.
 *
 * Bot defence, in the order a submission meets it:
 *  - a signed challenge fetched when the page loads, which must be at least
 *    four seconds old and carry a small proof of work the browser computes
 *    in the background (invisible to the applicant);
 *  - a hidden trap field;
 *  - the hCaptcha "I am human" box;
 *  - on the server, a check that the file really is a PDF or Word document.
 */
const SHARED_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2"; // Web3Forms' key, used until AOCA's own is set
const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const field =
  "min-h-[48px] w-full border border-navy-200 bg-white px-4 text-navy-900 placeholder:text-navy-300 focus:border-navy-800";

function leadingZeroBits(bytes: Uint8Array) {
  let n = 0;
  for (const b of bytes) {
    if (b === 0) { n += 8; continue; }
    n += Math.clz32(b) - 24;
    break;
  }
  return n;
}

/** Finds a nonce whose hash with the token starts with enough zero bits. */
async function solve(token: string, bits: number, alive: () => boolean) {
  const enc = new TextEncoder();
  for (let n = 0; alive(); n += 64) {
    const batch = await Promise.all(
      Array.from({ length: 64 }, (_, i) => crypto.subtle.digest("SHA-256", enc.encode(`${token}:${n + i}`)))
    );
    const hit = batch.findIndex((d) => leadingZeroBits(new Uint8Array(d)) >= bits);
    if (hit >= 0) return String(n + hit);
    if (n % 1024 === 0) await new Promise((r) => setTimeout(r, 0)); // keep the page responsive
  }
  return null;
}

const prettySize = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export default function ApplyForm({
  roles,
  email,
  accessKey,
  ownSitekey,
  retentionMonths = 12,
}: {
  /** advertised job titles; "Speculative application" is always offered */
  roles: string[];
  /** fallback address shown under the form */
  email: string;
  /** Web3Forms key for the notification email to AOCA */
  accessKey?: string;
  /** AOCA's own hCaptcha site key, when set; the server then verifies it */
  ownSitekey?: string;
  retentionMonths?: number;
}) {
  const options = [...roles, "Speculative application"];
  const [role, setRole] = useState(options[0]);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);

  const challenge = useRef<{ token: string; nonce: Promise<string | null> } | null>(null);
  const alive = useRef(true);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // fetch a challenge and start solving it quietly in the background
  const prepare = useCallback(async () => {
    try {
      const r = await fetch("/api/apply", { cache: "no-store" });
      if (!r.ok) return;
      const c = (await r.json()) as { token: string; bits: number };
      challenge.current = { token: c.token, nonce: solve(c.token, c.bits, () => alive.current) };
    } catch {
      /* retried on submit */
    }
  }, []);

  useEffect(() => {
    alive.current = true;
    void prepare();
    const onApply = (e: Event) => {
      const wanted = (e as CustomEvent<string>).detail;
      if (options.includes(wanted)) setRole(wanted);
    };
    window.addEventListener("aoca:apply", onApply);
    return () => {
      alive.current = false;
      window.removeEventListener("aoca:apply", onApply);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prepare]);

  function renderCaptcha() {
    const el = captchaRef.current;
    if (!el || el.hasChildNodes() || !window.hcaptcha) return;
    try {
      // the standard box is 303px wide; narrow phones get the compact one
      widgetId.current = window.hcaptcha.render(el, {
        sitekey: ownSitekey || SHARED_SITEKEY,
        theme: "light",
        size: el.clientWidth < 303 ? "compact" : "normal",
      });
    } catch {
      /* widget unavailable: the challenge and server checks still apply */
    }
  }

  function choose(f: File | null | undefined) {
    setError("");
    if (!f) return;
    if (!/\.(pdf|docx?)$/i.test(f.name)) return setError("Please attach your CV as a PDF or Word document.");
    if (f.size > MAX_BYTES) return setError(`That file is ${prettySize(f.size)}. The limit is 4 MB.`);
    if (f.size === 0) return setError("That file is empty.");
    setFile(f);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the address is shown as text */
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    if (!file) return setError("Please attach your CV.");
    const captchaShown = !!captchaRef.current?.hasChildNodes();
    const captchaToken =
      widgetId.current !== null && window.hcaptcha ? window.hcaptcha.getResponse(widgetId.current) : "";
    if (captchaShown && !captchaToken) return setError("Please tick the “I am human” box before sending.");

    setStatus("sending");
    setProgress(0);
    try {
      if (!challenge.current) await prepare();
      const c = challenge.current;
      const nonce = c ? await c.nonce : null;
      if (!c || !nonce) throw new Error("We could not prepare the upload. Please reload the page and try again.");

      fd.delete("h-captcha-response");
      fd.delete("g-recaptcha-response");
      fd.set("cv", file);
      fd.set("role", role);
      fd.set("token", c.token);
      fd.set("nonce", nonce);
      // only AOCA's own key can be checked by our server; the shared key is checked by Web3Forms below
      if (ownSitekey && captchaToken) fd.set("h-captcha-response", captchaToken);

      const out = await new Promise<{ ok?: boolean; ref?: string; error?: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/apply");
        xhr.upload.onprogress = (ev) => ev.lengthComputable && setProgress(Math.round((ev.loaded / ev.total) * 100));
        xhr.onload = () => {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch {
            reject(new Error(xhr.status === 413 ? "That file is too large. The limit is 4 MB." : "The upload failed. Please try again."));
          }
        };
        xhr.onerror = () => reject(new Error("The upload failed. Please check your connection and try again."));
        xhr.send(fd);
      });
      if (!out.ok) throw new Error(out.error || "The upload failed. Please try again.");

      // tell AOCA by email; the application is already safely stored either way
      if (accessKey) {
        const name = String(fd.get("name") ?? "");
        const from = String(fd.get("email") ?? "");
        void fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Job application: ${role}, from ${name}`,
            from_name: "AOCA Website",
            replyto: from,
            name,
            email: from,
            phone: String(fd.get("phone") ?? ""),
            role,
            message: String(fd.get("message") ?? ""),
            cv: `${file.name} (${prettySize(file.size)}). Download it at https://www.aoca.ie/admin under Applications. Reference ${out.ref}.`,
            ...(!ownSitekey && captchaToken ? { "h-captcha-response": captchaToken } : {}),
          }),
        }).catch(() => {});
      }
      setRef(out.ref ?? "");
      setStatus("sent");
      window.gtag?.("event", "job_application", { role });
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      if (widgetId.current !== null) window.hcaptcha?.reset(widgetId.current);
      challenge.current = null;
      void prepare(); // a challenge can only be used once
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center border border-navy-100 bg-white px-8 py-16 text-center" role="status">
        <CheckCircle2 size={44} className="text-brand" aria-hidden />
        <h3 className="mt-5 text-xl font-semibold text-navy-900">Application received.</h3>
        <p className="mt-2 max-w-md text-navy-600">
          Thank you. Your CV is with us and we reply to every application.
          {ref && (
            <>
              {" "}Your reference is <span className="font-semibold text-navy-900">{ref}</span>.
            </>
          )}
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid grid-cols-1 gap-5 border border-navy-100 bg-white p-4 sm:grid-cols-2 sm:p-8 [&>*]:min-w-0">
      <Script
        src="https://js.hcaptcha.com/1/api.js?recaptchacompat=off&render=explicit"
        strategy="lazyOnload"
        onReady={renderCaptcha}
      />
      {/* trap field: hidden from people, irresistible to form-filling bots */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="apply-role" className="text-sm font-medium text-navy-800">
          Role <span className="text-brand">*</span>
        </label>
        <select id="apply-role" value={role} onChange={(e) => setRole(e.target.value)} className={field} required>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="apply-name" className="text-sm font-medium text-navy-800">
          Name <span className="text-brand">*</span>
        </label>
        <input id="apply-name" name="name" required minLength={2} maxLength={120} autoComplete="name" className={field} placeholder="Your name" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="apply-phone" className="text-sm font-medium text-navy-800">
          Phone
        </label>
        <input id="apply-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} placeholder="087 123 4567" />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="apply-email" className="text-sm font-medium text-navy-800">
          Email <span className="text-brand">*</span>
        </label>
        <input id="apply-email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@example.ie" />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <span id="apply-cv-label" className="text-sm font-medium text-navy-800">
          Your CV <span className="text-brand">*</span>
        </span>
        <input
          ref={fileInput}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          aria-labelledby="apply-cv-label"
          onChange={(e) => choose(e.target.files?.[0])}
        />
        {file ? (
          <div className="flex items-center justify-between gap-3 border border-navy-800 bg-navy-50/60 px-4 py-3">
            <span className="flex min-w-0 items-center gap-3 text-sm text-navy-900">
              <FileText size={20} className="shrink-0 text-brand" aria-hidden />
              <span className="truncate font-medium">{file.name}</span>
              <span className="shrink-0 text-navy-500">{prettySize(file.size)}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInput.current) fileInput.current.value = "";
              }}
              className="flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wider text-navy-600 hover:text-brand"
              disabled={sending}
            >
              <X size={14} aria-hidden /> Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              choose(e.dataTransfer.files?.[0]);
            }}
            className={`flex min-h-[120px] flex-col items-center justify-center gap-2 border-2 border-dashed px-4 py-6 text-center transition-colors ${
              dragging ? "border-brand bg-navy-50" : "border-navy-200 bg-navy-50/40 hover:border-navy-800"
            }`}
          >
            <UploadCloud size={28} className="text-brand" aria-hidden />
            <span className="text-sm font-semibold text-navy-900">Choose your CV, or drop it here</span>
            <span className="text-xs text-navy-500">PDF or Word, up to 4 MB</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="apply-message" className="text-sm font-medium text-navy-800">
          Anything you would like to add
        </label>
        <textarea id="apply-message" name="message" rows={4} maxLength={2000} className="border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder:text-navy-300 focus:border-navy-800" placeholder="Optional. Notice period, the office you would like to work from, or a line about your experience." />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-navy-700 sm:col-span-2">
        <input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4 shrink-0 accent-[#C8202F]" />
        <span>
          I am happy for AOCA to hold my application to consider me for a role. Applications are kept for {retentionMonths} months and then deleted.{" "}
          <Link href="/privacy" className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy policy
          </Link>
        </span>
      </label>

      <div className="sm:col-span-2">
        <div ref={captchaRef} className="min-h-[1px]" aria-label="Spam protection check" />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          {sending ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden />
              {progress < 100 ? `Uploading ${progress}%` : "Finishing"}
            </>
          ) : (
            <>
              Send application
              <Send size={15} aria-hidden />
            </>
          )}
        </button>
        {sending && (
          <div className="mt-3 h-1 w-full bg-navy-100" aria-hidden>
            <div className="h-1 bg-brand transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
        {error && (
          <p className="mt-3 text-sm text-brand" role="alert">
            {error}
          </p>
        )}
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-navy-500">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-navy-400" aria-hidden />
          Your CV is encrypted and stored privately. Only AOCA can open it.
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-2 border-t border-navy-100 pt-4 text-sm text-navy-600">
          Prefer email? Send your CV to
          <span className="select-all font-medium text-navy-900">{email}</span>
          <button type="button" onClick={copyEmail} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand hover:text-brand-dark">
            {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
            {copied ? "Copied" : "Copy"}
          </button>
        </p>
      </div>
    </form>
  );
}
