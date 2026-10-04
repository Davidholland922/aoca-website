"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, Mail, Phone, RefreshCw } from "lucide-react";

type Enquiry = {
  id: string;
  at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  delivered: boolean;
};

/** "Enquiries" tab: every contact-form message, newest first. */
export default function AdminEnquiries({ password }: { password: string }) {
  const [list, setList] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const out = (await res.json()) as { enquiries?: Enquiry[]; error?: string };
      if (!res.ok) throw new Error(out.error || "Could not load");
      setList(out.enquiries ?? []);
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

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("en-IE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-navy-900">Enquiries</h2>
          <p className="mt-1 max-w-xl text-sm text-navy-600">
            Every message sent through the contact form, newest first. The
            same message is emailed to info@aoca.ie. If an email ever goes
            missing, the copy is here.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={busy}
          className="flex min-h-[44px] items-center gap-2 border border-navy-200 bg-white px-4 text-sm font-semibold text-navy-800 hover:border-navy-800 disabled:opacity-60"
        >
          {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <RefreshCw size={15} aria-hidden />}
          Refresh
        </button>
      </div>

      {error && (
        <p className="border border-brand bg-white px-4 py-3 text-sm text-brand" role="alert">
          {error}
        </p>
      )}

      {list === null && !error && (
        <p className="text-sm text-navy-500">Loading…</p>
      )}

      {list && list.length === 0 && (
        <p className="border border-navy-200 bg-white px-4 py-6 text-center text-sm text-navy-500">
          No enquiries recorded yet. Messages sent from today onward will appear here.
        </p>
      )}

      {list && list.length > 0 && (
        <ul className="grid gap-4">
          {list.map((q) => (
            <li key={q.id} className="border border-navy-200 bg-white p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-base font-semibold text-navy-900">{q.name}</p>
                <p className="text-xs uppercase tracking-wider text-navy-500">{fmt(q.at)}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <a
                  href={`mailto:${q.email}?subject=${encodeURIComponent("Re: your enquiry to AOCA")}`}
                  className="flex items-center gap-1.5 font-medium text-brand underline-offset-2 hover:underline"
                >
                  <Mail size={14} aria-hidden /> {q.email}
                </a>
                {q.phone && (
                  <a
                    href={`tel:${q.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-1.5 text-navy-700 underline-offset-2 hover:underline"
                  >
                    <Phone size={14} aria-hidden /> {q.phone}
                  </a>
                )}
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-navy-800">
                {q.message}
              </p>
              {!q.delivered && (
                <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand">
                  <AlertTriangle size={14} aria-hidden />
                  The email for this one did not send. Reply from here.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
