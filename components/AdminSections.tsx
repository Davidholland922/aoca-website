"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { team as currentTeam, stats as currentStats, offices as currentOffices } from "@/lib/site";

type Section = "team" | "stats" | "offices";

type TeamRow = { name: string; role: string; cred: string };
type StatRow = { value: string; label: string };
type OfficeRow = { name: string; address: string; phone: string; email: string };

const input =
  "w-full min-h-[44px] border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 placeholder:text-navy-300 focus:border-navy-800";

/** "Edit details" tab: client edits team / stats / office details directly. */
export default function AdminSections({ password }: { password: string }) {
  const [section, setSection] = useState<Section>("team");
  const [team, setTeam] = useState<TeamRow[]>(currentTeam.map((m) => ({ ...m })));
  const [stats, setStats] = useState<StatRow[]>(currentStats.map((s) => ({ ...s })));
  const [offices, setOffices] = useState<OfficeRow[]>(
    currentOffices.map((o) => ({
      name: o.name,
      address: o.address.join("\n"),
      phone: o.phone,
      email: o.email,
    }))
  );
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  async function save() {
    setErr("");
    setSaved(false);
    setBusy(true);
    try {
      const data =
        section === "team" ? team : section === "stats" ? stats : offices;
      const res = await fetch("/api/admin/update-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, section, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setSaved(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const tabs: { key: Section; label: string }[] = [
    { key: "team", label: "Management team" },
    { key: "stats", label: "Homepage numbers" },
    { key: "offices", label: "Office details" },
  ];

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => { setSection(t.key); setSaved(false); setErr(""); }}
            className={clsx(
              "min-h-[44px] cursor-pointer border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              section === t.key
                ? "border-brand bg-brand text-white"
                : "border-navy-200 bg-white text-navy-700 hover:border-navy-800"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {section === "team" && (
        <div className="grid gap-3">
          {team.map((m, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4 sm:grid-cols-[1fr,1fr,8rem,2.5rem]">
              <input className={input} placeholder="Name" value={m.name}
                aria-label={`Team member ${i + 1} name`}
                onChange={(e) => setTeam(team.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
              <input className={input} placeholder="Role (e.g. Director)" value={m.role}
                aria-label={`Team member ${i + 1} role`}
                onChange={(e) => setTeam(team.map((x, j) => (j === i ? { ...x, role: e.target.value } : x)))} />
              <input className={input} placeholder="Letters (MIEI)" value={m.cred}
                aria-label={`Team member ${i + 1} credentials`}
                onChange={(e) => setTeam(team.map((x, j) => (j === i ? { ...x, cred: e.target.value } : x)))} />
              <button type="button" aria-label={`Remove team member ${i + 1}`}
                onClick={() => setTeam(team.filter((_, j) => j !== i))}
                className="flex min-h-[44px] cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                <Trash2 size={15} aria-hidden />
              </button>
            </div>
          ))}
          <button type="button"
            onClick={() => setTeam([...team, { name: "", role: "", cred: "" }])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add team member
          </button>
        </div>
      )}

      {section === "stats" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The four numbers across the top of the homepage.
          </p>
          {stats.map((s, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4 sm:grid-cols-[10rem,1fr]">
              <input className={input} placeholder="Number (e.g. 7,000+)" value={s.value}
                aria-label={`Stat ${i + 1} value`}
                onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
              <input className={input} placeholder="Label (e.g. Projects delivered)" value={s.label}
                aria-label={`Stat ${i + 1} label`}
                onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
            </div>
          ))}
        </div>
      )}

      {section === "offices" && (
        <div className="grid gap-3">
          {offices.map((o, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4">
              <input className={input} placeholder="Office name" value={o.name}
                aria-label={`Office ${i + 1} name`}
                onChange={(e) => setOffices(offices.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
              <textarea className={input} rows={3} placeholder={"Address — one line per row"} value={o.address}
                aria-label={`Office ${i + 1} address`}
                onChange={(e) => setOffices(offices.map((x, j) => (j === i ? { ...x, address: e.target.value } : x)))} />
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={input} placeholder="Phone" value={o.phone}
                  aria-label={`Office ${i + 1} phone`}
                  onChange={(e) => setOffices(offices.map((x, j) => (j === i ? { ...x, phone: e.target.value } : x)))} />
                <input className={input} placeholder="Email" value={o.email}
                  aria-label={`Office ${i + 1} email`}
                  onChange={(e) => setOffices(offices.map((x, j) => (j === i ? { ...x, email: e.target.value } : x)))} />
              </div>
            </div>
          ))}
        </div>
      )}

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
        <button type="button" onClick={save} disabled={busy}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}
