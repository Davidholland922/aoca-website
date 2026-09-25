"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import {
  team as currentTeam,
  stats as currentStats,
  offices as currentOffices,
  aboutParagraphs as currentAbout,
  jobs as currentJobs,
  banners as currentBanners,
  timeline as currentTimeline,
  contactKeys as currentContactKeys,
  mission as currentMission,
  missionNote as currentMissionNote,
  heroText as currentHero,
  sectors as currentSectors,
  values as currentValues,
  accreditations as currentAccreditations,
  testimonials as currentTestimonials,
} from "@/lib/site";

type Section =
  | "team"
  | "stats"
  | "offices"
  | "about"
  | "jobs"
  | "banners"
  | "timeline"
  | "contactKeys"
  | "mission"
  | "hero"
  | "sectorText"
  | "values"
  | "accreditations"
  | "testimonials";

type TestimonialRow = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  logo?: string;
  logoTall?: boolean;
};

type TimelineRow = {
  year: string;
  title: string;
  text: string;
  image?: string;
  clipping?: string;
};

type TeamRow = { name: string; role: string; cred: string };
type StatRow = { value: string; label: string };
type OfficeRow = { name: string; address: string; phone: string; email: string };
type JobRow = { title: string; location: string; type: string; summary: string };

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
  const [about, setAbout] = useState<string>(currentAbout.join("\n\n"));
  const [jobRows, setJobRows] = useState<JobRow[]>(currentJobs.map((j) => ({ ...j })));
  const [timelineRows, setTimelineRows] = useState<TimelineRow[]>(
    currentTimeline.map((m) => ({ ...m }))
  );
  const [missionRows, setMissionRows] = useState<string[]>([
    currentMission,
    currentMissionNote,
  ]);
  const [heroRows, setHeroRows] = useState<string[]>([
    currentHero.headline,
    currentHero.headlineAccent,
    currentHero.subline,
  ]);
  const [sectorRows, setSectorRows] = useState(
    currentSectors.map((s) => ({ slug: s.slug, title: s.title, blurb: s.blurb }))
  );
  const [valueRows, setValueRows] = useState(
    currentValues.map((v) => ({ ...v }))
  );
  const [accredRows, setAccredRows] = useState<string[]>([
    ...currentAccreditations,
  ]);
  const [testimonialRows, setTestimonialRows] = useState<TestimonialRow[]>(
    currentTestimonials.map((x) => ({ ...x }))
  );
  const [keyRows, setKeyRows] = useState(
    (["ie", "uk"] as const).map((inbox) => ({
      inbox,
      accessKey:
        currentContactKeys.find((k) => k.inbox === inbox)?.accessKey ?? "",
    }))
  );
  const [bannerRows, setBannerRows] = useState(
    (["home", "projects"] as const).map((key) => ({
      key,
      title: currentBanners[key].title,
      body: currentBanners[key].body,
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
        section === "team"
          ? team
          : section === "stats"
            ? stats
            : section === "offices"
              ? offices
              : section === "about"
                ? about.split(/\n\s*\n/).filter((p) => p.trim())
                : section === "banners"
                  ? bannerRows
                  : section === "timeline"
                    ? timelineRows
                    : section === "contactKeys"
                      ? keyRows.filter((k) => k.accessKey.trim())
                      : section === "mission"
                        ? missionRows
                        : section === "hero"
                          ? heroRows
                          : section === "sectorText"
                            ? sectorRows
                            : section === "values"
                              ? valueRows
                              : section === "accreditations"
                                ? accredRows.filter((a) => a.trim())
                                : section === "testimonials"
                                  ? testimonialRows
                                  : jobRows;
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
    { key: "about", label: "About us" },
    { key: "jobs", label: "Job openings" },
    { key: "banners", label: "Page banners" },
    { key: "timeline", label: "History timeline" },
    { key: "contactKeys", label: "Contact form" },
    { key: "mission", label: "Our mission" },
    { key: "hero", label: "Homepage headline" },
    { key: "sectorText", label: "Sector cards" },
    { key: "values", label: "Our values" },
    { key: "accreditations", label: "Accreditations" },
    { key: "testimonials", label: "Testimonials" },
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
            The numbers across the top of the homepage.
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

      {section === "about" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The &ldquo;Our story&rdquo; text on the Company page. Leave an
            empty line between paragraphs.
          </p>
          <textarea
            className={input}
            rows={12}
            value={about}
            aria-label="About us text"
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
      )}

      {section === "jobs" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            Positions listed on the Careers page. Applicants email{" "}
            <strong>info@aoca.ie</strong> with the job title as the subject.
          </p>
          {jobRows.map((j, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4">
              <div className="flex gap-2">
                <input className={input} placeholder="Job title (e.g. Senior Structural Engineer)"
                  value={j.title}
                  aria-label={`Job ${i + 1} title`}
                  onChange={(e) => setJobRows(jobRows.map((x, k) => (k === i ? { ...x, title: e.target.value } : x)))} />
                <button type="button" aria-label={`Remove job ${i + 1}`}
                  onClick={() => setJobRows(jobRows.filter((_, k) => k !== i))}
                  className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <input className={input} placeholder="Location (e.g. Portlaoise or Dublin)"
                  value={j.location}
                  aria-label={`Job ${i + 1} location`}
                  onChange={(e) => setJobRows(jobRows.map((x, k) => (k === i ? { ...x, location: e.target.value } : x)))} />
                <input className={input} placeholder="Type (e.g. Full-time)"
                  value={j.type}
                  aria-label={`Job ${i + 1} type`}
                  onChange={(e) => setJobRows(jobRows.map((x, k) => (k === i ? { ...x, type: e.target.value } : x)))} />
              </div>
              <textarea className={input} rows={3} placeholder="Short description of the role"
                value={j.summary}
                aria-label={`Job ${i + 1} description`}
                onChange={(e) => setJobRows(jobRows.map((x, k) => (k === i ? { ...x, summary: e.target.value } : x)))} />
            </div>
          ))}
          <button type="button"
            onClick={() => setJobRows([...jobRows, { title: "", location: "", type: "", summary: "" }])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add job opening
          </button>
        </div>
      )}

      {section === "banners" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The big red-button banners at the bottom of the homepage and the
            Projects page.
          </p>
          {bannerRows.map((b, i) => (
            <div key={b.key} className="grid gap-2 border border-navy-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                {b.key === "home" ? "Homepage banner" : "Projects page banner"}
              </p>
              <input className={input} placeholder="Banner heading" value={b.title}
                aria-label={`${b.key} banner heading`}
                onChange={(e) => setBannerRows(bannerRows.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
              <textarea className={input} rows={3} placeholder="Banner text" value={b.body}
                aria-label={`${b.key} banner text`}
                onChange={(e) => setBannerRows(bannerRows.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)))} />
            </div>
          ))}
        </div>
      )}

      {section === "timeline" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The milestones on the Our History page, oldest first. Each
            milestone keeps its photo — to change a photo, send it to David.
          </p>
          {timelineRows.map((m, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4">
              <div className="flex gap-2">
                <input className={clsx(input, "max-w-[10rem]")} placeholder="Year (e.g. 2017)"
                  value={m.year}
                  aria-label={`Milestone ${i + 1} year`}
                  onChange={(e) => setTimelineRows(timelineRows.map((x, j) => (j === i ? { ...x, year: e.target.value } : x)))} />
                <input className={input} placeholder="Milestone title" value={m.title}
                  aria-label={`Milestone ${i + 1} title`}
                  onChange={(e) => setTimelineRows(timelineRows.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
                <button type="button" aria-label={`Move milestone ${i + 1} up`}
                  disabled={i === 0}
                  onClick={() => {
                    const next = [...timelineRows];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    setTimelineRows(next);
                  }}
                  className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-navy-800 hover:text-navy-800 disabled:cursor-not-allowed disabled:opacity-30">
                  <ArrowUp size={15} aria-hidden />
                </button>
                <button type="button" aria-label={`Move milestone ${i + 1} down`}
                  disabled={i === timelineRows.length - 1}
                  onClick={() => {
                    const next = [...timelineRows];
                    [next[i], next[i + 1]] = [next[i + 1], next[i]];
                    setTimelineRows(next);
                  }}
                  className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-navy-800 hover:text-navy-800 disabled:cursor-not-allowed disabled:opacity-30">
                  <ArrowDown size={15} aria-hidden />
                </button>
                <button type="button" aria-label={`Remove milestone ${i + 1}`}
                  onClick={() => setTimelineRows(timelineRows.filter((_, j) => j !== i))}
                  className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
              <textarea className={input} rows={3} placeholder="What happened" value={m.text}
                aria-label={`Milestone ${i + 1} text`}
                onChange={(e) => setTimelineRows(timelineRows.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))} />
            </div>
          ))}
          <button type="button"
            onClick={() => setTimelineRows([...timelineRows, { year: "", title: "", text: "" }])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add milestone
          </button>
        </div>
      )}

      {section === "contactKeys" && (
        <div className="grid gap-3">
          <div className="border border-navy-100 bg-white p-4 text-sm leading-relaxed text-navy-600">
            <p className="font-semibold text-navy-900">
              Connect the contact form to your inbox (one-off, ~2 minutes)
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>
                Go to{" "}
                <a
                  href="https://app.web3forms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand underline-offset-2 hover:underline"
                >
                  app.web3forms.com
                </a>{" "}
                and choose <strong>Continue with Email</strong> using{" "}
                <strong>info@aoca.ie</strong> (it sends a sign-in link to that
                inbox).
              </li>
              <li>Once signed in, copy the Access Key it shows you.</li>
              <li>Paste it below and press Save changes.</li>
            </ol>
            <p className="mt-2">
              From then on, every website enquiry lands in info@aoca.ie. To
              also get copies in info@aoca.co.uk, repeat the steps with that
              address and paste its key in the second box.
            </p>
          </div>
          {keyRows.map((k, i) => (
            <div key={k.inbox} className="grid gap-2 border border-navy-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                {k.inbox === "ie"
                  ? "Access key for info@aoca.ie"
                  : "Access key for info@aoca.co.uk (optional)"}
              </p>
              <input className={input}
                placeholder="e.g. 1a2b3c4d-1234-1234-1234-123456abcdef"
                value={k.accessKey}
                aria-label={`Access key ${k.inbox}`}
                onChange={(e) => setKeyRows(keyRows.map((x, j) => (j === i ? { ...x, accessKey: e.target.value } : x)))} />
            </div>
          ))}
        </div>
      )}

      {section === "mission" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The &ldquo;Our mission&rdquo; section on the homepage.
          </p>
          <div className="grid gap-2 border border-navy-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
              Mission statement (the big heading)
            </p>
            <textarea className={input} rows={3} value={missionRows[0]}
              aria-label="Mission statement"
              onChange={(e) => setMissionRows([e.target.value, missionRows[1]])} />
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
              Supporting line underneath
            </p>
            <textarea className={input} rows={3} value={missionRows[1]}
              aria-label="Mission supporting line"
              onChange={(e) => setMissionRows([missionRows[0], e.target.value])} />
          </div>
        </div>
      )}

      {section === "hero" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The big opening text over the homepage video. The first part is
            white, the second part red; the strapline appears underneath
            after the brand&rsquo;s A mark, so start it without the word
            &ldquo;A&rdquo;.
          </p>
          <div className="grid gap-2 border border-navy-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">Headline — white part</p>
            <input className={input} value={heroRows[0]} aria-label="Hero headline"
              onChange={(e) => setHeroRows([e.target.value, heroRows[1], heroRows[2]])} />
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">Headline — red part</p>
            <input className={input} value={heroRows[1]} aria-label="Hero headline accent"
              onChange={(e) => setHeroRows([heroRows[0], e.target.value, heroRows[2]])} />
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">Strapline (rendered after the A mark)</p>
            <input className={input} value={heroRows[2]} aria-label="Hero strapline"
              onChange={(e) => setHeroRows([heroRows[0], heroRows[1], e.target.value])} />
          </div>
        </div>
      )}

      {section === "sectorText" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The seven sector tiles on the homepage — names and one-line
            descriptions. Photos on the tiles are changed by David.
          </p>
          {sectorRows.map((s, i) => (
            <div key={s.slug} className="grid gap-2 border border-navy-100 bg-white p-4">
              <input className={input} value={s.title} aria-label={`Sector ${i + 1} name`}
                onChange={(e) => setSectorRows(sectorRows.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
              <textarea className={input} rows={2} value={s.blurb} aria-label={`Sector ${i + 1} description`}
                onChange={(e) => setSectorRows(sectorRows.map((x, j) => (j === i ? { ...x, blurb: e.target.value } : x)))} />
            </div>
          ))}
        </div>
      )}

      {section === "values" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The &ldquo;What it&rsquo;s like to work with us&rdquo; list on the
            homepage (numbering is automatic).
          </p>
          {valueRows.map((v, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4">
              <div className="flex gap-2">
                <input className={input} placeholder="Value name" value={v.title} aria-label={`Value ${i + 1} name`}
                  onChange={(e) => setValueRows(valueRows.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
                <button type="button" aria-label={`Remove value ${i + 1}`}
                  onClick={() => setValueRows(valueRows.filter((_, j) => j !== i))}
                  className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
              <textarea className={input} rows={2} value={v.body} aria-label={`Value ${i + 1} text`}
                onChange={(e) => setValueRows(valueRows.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)))} />
            </div>
          ))}
          <button type="button"
            onClick={() => setValueRows([...valueRows, { title: "", body: "" }])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add value
          </button>
        </div>
      )}

      {section === "accreditations" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            The accreditations &amp; certifications list on the homepage. The
            badge logos are matched up by David — send him the logo for any
            new accreditation.
          </p>
          {accredRows.map((a, i) => (
            <div key={i} className="flex gap-2">
              <input className={input} value={a} aria-label={`Accreditation ${i + 1}`}
                onChange={(e) => setAccredRows(accredRows.map((x, j) => (j === i ? e.target.value : x)))} />
              <button type="button" aria-label={`Remove accreditation ${i + 1}`}
                onClick={() => setAccredRows(accredRows.filter((_, j) => j !== i))}
                className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                <Trash2 size={15} aria-hidden />
              </button>
            </div>
          ))}
          <button type="button"
            onClick={() => setAccredRows([...accredRows, ""])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add accreditation
          </button>
        </div>
      )}

      {section === "testimonials" && (
        <div className="grid gap-3">
          <p className="text-sm text-navy-500">
            What clients say on the homepage. Logos stay attached to each
            testimonial — send David the logo for any new one.
          </p>
          {testimonialRows.map((x, i) => (
            <div key={i} className="grid gap-2 border border-navy-100 bg-white p-4">
              <div className="flex items-start gap-2">
                <textarea className={input} rows={3} placeholder="The quote" value={x.quote}
                  aria-label={`Testimonial ${i + 1} quote`}
                  onChange={(e) => setTestimonialRows(testimonialRows.map((y, j) => (j === i ? { ...y, quote: e.target.value } : y)))} />
                <button type="button" aria-label={`Remove testimonial ${i + 1}`}
                  onClick={() => setTestimonialRows(testimonialRows.filter((_, j) => j !== i))}
                  className="flex w-11 shrink-0 cursor-pointer items-center justify-center border border-navy-200 text-navy-400 hover:border-brand hover:text-brand">
                  <Trash2 size={15} aria-hidden />
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <input className={input} placeholder="Name" value={x.author}
                  aria-label={`Testimonial ${i + 1} name`}
                  onChange={(e) => setTestimonialRows(testimonialRows.map((y, j) => (j === i ? { ...y, author: e.target.value } : y)))} />
                <input className={input} placeholder="Role (e.g. Director)" value={x.role}
                  aria-label={`Testimonial ${i + 1} role`}
                  onChange={(e) => setTestimonialRows(testimonialRows.map((y, j) => (j === i ? { ...y, role: e.target.value } : y)))} />
                <input className={input} placeholder="Company (optional)" value={x.company ?? ""}
                  aria-label={`Testimonial ${i + 1} company`}
                  onChange={(e) => setTestimonialRows(testimonialRows.map((y, j) => (j === i ? { ...y, company: e.target.value } : y)))} />
              </div>
            </div>
          ))}
          <button type="button"
            onClick={() => setTestimonialRows([...testimonialRows, { quote: "", author: "", role: "" }])}
            className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-navy-200 text-sm font-medium text-navy-500 hover:border-brand hover:text-brand">
            <Plus size={16} aria-hidden /> Add testimonial
          </button>
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
