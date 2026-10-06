"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Lock, Mail, Phone, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";

type Application = {
  id: string;
  at: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  file: { name: string; type: string; size: number };
  captchaVerified: boolean;
};

/**
 * "Applications" tab: job applications and their CVs, newest first.
 * CVs are decrypted on the server only for a correct password and are
 * downloaded straight to this computer; there is no public link to any CV.
 */
export default function AdminApplications({ password: adminPassword }: { password: string }) {
  const [password, setPassword] = useState(adminPassword);
  const [needsOwn, setNeedsOwn] = useState(false);
  const [list, setList] = useState<Application[] | null>(null);
  const [retention, setRetention] = useState(365);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [working, setWorking] = useState("");
  const [confirming, setConfirming] = useState("");

  const call = (body: Record<string, string>, pw = password) =>
    fetch("/api/admin/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw, ...body }),
    });

  async function load(pw = password) {
    setBusy(true);
    setError("");
    try {
      const res = await call({ action: "list" }, pw);
      if (res.status === 401) {
        setNeedsOwn(true);
        setList(null);
        return;
      }
      const out = (await res.json()) as { applications?: Application[]; retentionDays?: number; error?: string };
      if (!res.ok) throw new Error(out.error || "Could not load");
      setNeedsOwn(false);
      setList(out.applications ?? []);
      setRetention(out.retentionDays ?? 365);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function download(a: Application) {
    setWorking(a.id);
    setError("");
    try {
      const res = await call({ action: "download", id: a.id });
      if (!res.ok) throw new Error("Could not download that CV");
      const url = URL.createObjectURL(await res.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `CV-${a.name.replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-") || "applicant"}.${a.file.name.split(".").pop()}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not download");
    } finally {
      setWorking("");
    }
  }

  async function remove(a: Application) {
    setWorking(a.id);
    setError("");
    try {
      const res = await call({ action: "delete", id: a.id });
      if (!res.ok) throw new Error("Could not delete that application");
      setList((l) => (l ?? []).filter((x) => x.id !== a.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete");
    } finally {
      setWorking("");
      setConfirming("");
    }
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("en-IE", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const size = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);
  const deletesOn = (iso: string) =>
    new Date(new Date(iso).getTime() + retention * 86_400_000).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-navy-900">Applications</h2>
          <p className="mt-1 max-w-xl text-sm text-navy-600">
            Every application sent through the careers page, newest first. CVs are stored encrypted and
            can only be downloaded here. Each application is deleted automatically after {Math.round(retention / 30.4)} months.
          </p>
        </div>
        <button
          type="button"
          onClick={() => load()}
          disabled={busy}
          className="flex min-h-[44px] items-center gap-2 border border-navy-200 bg-white px-4 text-sm font-semibold text-navy-800 hover:border-navy-800 disabled:opacity-60"
        >
          {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <RefreshCw size={15} aria-hidden />}
          Refresh
        </button>
      </div>

      {needsOwn && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void load();
          }}
          className="flex flex-wrap items-end gap-3 border border-navy-200 bg-white p-5"
        >
          <label className="flex flex-col gap-2 text-sm font-medium text-navy-800">
            <span className="flex items-center gap-2">
              <Lock size={14} aria-hidden /> Applications password
            </span>
            <input
              type="password"
              value={password === adminPassword ? "" : password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="min-h-[44px] border border-navy-200 px-3"
            />
          </label>
          <button type="submit" className="btn-primary">
            Open
          </button>
        </form>
      )}

      {error && (
        <p className="border border-brand bg-white px-4 py-3 text-sm text-brand" role="alert">
          {error}
        </p>
      )}

      {list === null && !error && !needsOwn && <p className="text-sm text-navy-500">Loading…</p>}

      {list && list.length === 0 && (
        <p className="border border-navy-200 bg-white px-4 py-6 text-center text-sm text-navy-500">
          No applications yet. They will appear here as soon as someone applies on the careers page.
        </p>
      )}

      {list && list.length > 0 && (
        <ul className="grid gap-4">
          {list.map((a) => (
            <li key={a.id} className="border border-navy-200 bg-white p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-base font-semibold text-navy-900">{a.name}</p>
                <p className="text-xs uppercase tracking-wider text-navy-500">{fmt(a.at)}</p>
              </div>
              <p className="mt-1 text-sm font-medium text-brand">{a.role}</p>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <a
                  href={`mailto:${a.email}?subject=${encodeURIComponent(`Your application to AOCA: ${a.role}`)}`}
                  className="flex items-center gap-1.5 font-medium text-navy-800 underline-offset-2 hover:underline"
                >
                  <Mail size={14} aria-hidden /> {a.email}
                </a>
                {a.phone && (
                  <a href={`tel:${a.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-1.5 text-navy-700 underline-offset-2 hover:underline">
                    <Phone size={14} aria-hidden /> {a.phone}
                  </a>
                )}
              </div>
              {a.message && <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-navy-800">{a.message}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-navy-100 pt-4">
                <button
                  type="button"
                  onClick={() => download(a)}
                  disabled={working === a.id}
                  className="flex min-h-[44px] items-center gap-2 bg-navy-900 px-4 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
                >
                  {working === a.id ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Download size={15} aria-hidden />}
                  Download CV
                </button>
                <span className="text-xs text-navy-500">
                  {a.file.name} · {size(a.file.size)}
                </span>
                <span className="ml-auto flex items-center gap-3">
                  {confirming === a.id ? (
                    <>
                      <span className="text-xs text-navy-600">Delete this application and CV for good?</span>
                      <button type="button" onClick={() => remove(a)} className="text-xs font-semibold uppercase tracking-wider text-brand hover:underline">
                        Yes, delete
                      </button>
                      <button type="button" onClick={() => setConfirming("")} className="text-xs font-semibold uppercase tracking-wider text-navy-600 hover:underline">
                        Keep
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirming(a.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-500 hover:text-brand"
                    >
                      <Trash2 size={13} aria-hidden /> Delete
                    </button>
                  )}
                </span>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-navy-400">
                <ShieldCheck size={12} aria-hidden />
                Deletes automatically on {deletesOn(a.at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
