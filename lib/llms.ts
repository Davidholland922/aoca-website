import { site, offices, services, sectors, projects, team, accreditations, stats } from "@/lib/site";
import { insights } from "@/lib/insights";
import { LANDING_LIVE, serviceLandings, countyLandings } from "@/lib/landing";
import { officePlaces, servicesForProject } from "@/lib/seo";
import { expertiseFaqs, companyFaqs } from "@/lib/faqs";

/**
 * llms.txt: a plain-Markdown guide to the site for AI assistants and answer
 * engines (https://llmstxt.org). Built from the same content the pages
 * render, so it can never drift from what a visitor sees.
 *
 * /llms.txt       a short map: who AOCA is, plus links with one-line summaries
 * /llms-full.txt  the substance itself, so a model can answer without crawling
 */
const u = (path: string) => `${site.url}${path}`;
const one = (t: string) => t.replace(/\s+/g, " ").trim();

function header() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.name} (legal name ${site.legalName}, known as AOCA) is an Irish multidisciplinary engineering consultancy founded in ${site.founded} in Portlaoise, Co. Laois. It provides civil and structural engineering, insurance and forensic engineering, fire safety and accessibility consultancy, building envelope engineering, building surveying, project and construction management, and Assigned Certifier and regulatory compliance services across Ireland, the UK and Europe.`,
    "",
    "## Key facts",
    "",
    `- Founded: ${site.founded}, by Aidan O'Connell, in Portlaoise, Ireland`,
    `- Offices: ${offices.map((o) => `${o.name.replace(/\s*—\s*/g, ", ")}: ${o.address.join(", ")}`).join(" | ")}`,
    `- Leadership: ${team.map((m) => `${m.name} (${m.role})`).join(", ")}`,
    ...stats.filter((s) => /project/i.test(s.label)).map((s) => `- ${s.label}: ${s.value}`),
    `- Accreditations: ${accreditations.join("; ")}`,
    `- Sister company: Fire Safety Consultants, established with OCF (${u("/fire-safety-consultants")})`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Website: ${site.url}`,
    "",
  ];
}

function officeLines() {
  return offices.flatMap((o, i) => {
    const place = officePlaces[i];
    if (!place) return [];
    return [`- [${o.name}](${u(`/offices/${place.slug}`)}): ${o.address.join(", ")}. Phone ${o.phone}. Email ${o.email}.`];
  });
}

export function llmsTxt() {
  return [
    ...header(),
    "## Expertise",
    "",
    ...services.map((s) => `- [${s.title}](${u(`/expertise/${s.slug}`)}): ${one(s.short)}`),
    "",
    ...(LANDING_LIVE
      ? [
          "## Specialist services",
          "",
          ...serviceLandings.map((l) => `- [${l.title}](${u(`/expertise/${l.slug}`)}): ${one(l.metaDescription)}`),
          "",
          "## Areas served",
          "",
          ...countyLandings.map((l) => `- [${l.title}](${u(`/areas/${l.slug}`)}): ${one(l.metaDescription)}`),
          "",
        ]
      : []),
    "## Offices",
    "",
    ...officeLines(),
    "",
    "## Sectors",
    "",
    ...sectors.map((s) => `- [${s.title}](${u(`/projects/sector/${s.slug}`)}): ${one(s.blurb)}`),
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.title}](${u(`/projects/${p.slug}`)})${p.location ? ` (${p.location})` : ""}: ${one(p.summary)}`),
    "",
    "## Insights",
    "",
    ...insights.map((a) => `- [${a.title}](${u(`/insights/${a.slug}`)}) (${a.displayDate})`),
    "",
    "## Company",
    "",
    `- [About AOCA](${u("/company")}): history, values, management team and accreditations`,
    `- [Our history](${u("/history")}): the practice year by year since ${site.founded}`,
    `- [Our culture](${u("/culture")}): life at AOCA`,
    `- [Careers](${u("/careers")}): current vacancies`,
    `- [Contact](${u("/contact")}): enquiries, phone numbers and office addresses`,
    "",
    "## Optional",
    "",
    `- [Full text for AI assistants](${u("/llms-full.txt")}): every service described in full, with questions and answers`,
    `- [Sitemap](${u("/sitemap.xml")})`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const out: string[] = [...header()];

  out.push("## Offices", "", ...officeLines(), "");

  out.push("## Management team", "");
  for (const m of team) out.push(`- **${m.name}**, ${m.role}${m.cred ? ` (${m.cred})` : ""}${m.bio ? `. ${one(m.bio)}` : ""}`);
  out.push("");

  out.push("## About AOCA: questions and answers", "");
  for (const f of companyFaqs) out.push(`**${f.q}**`, f.a, "");

  out.push("## Expertise", "");
  for (const s of services) {
    out.push(`### ${s.title}`, "", `Page: ${u(`/expertise/${s.slug}`)}`, "", one(s.intro), "");
    for (const sec of s.sections) out.push(`**${sec.heading}.** ${one(sec.body)}`, "");
    if (s.highlights.length) out.push(`What AOCA delivers: ${s.highlights.join("; ")}.`, "");
    for (const f of expertiseFaqs[s.slug] ?? []) out.push(`**${f.q}**`, f.a, "");
  }

  if (LANDING_LIVE) {
    out.push("## Specialist services", "");
    for (const l of serviceLandings) {
      out.push(`### ${l.title}`, "", `Page: ${u(`/expertise/${l.slug}`)}`, "", ...l.intro.map(one), "");
      for (const f of l.faqs) out.push(`**${f.q}**`, f.a, "");
    }
    out.push("## Areas served", "");
    for (const l of countyLandings) {
      out.push(`### ${l.title}`, "", `Page: ${u(`/areas/${l.slug}`)}`, "", ...l.intro.map(one), "");
      for (const f of l.faqs) out.push(`**${f.q}**`, f.a, "");
    }
  }

  out.push("## Projects", "");
  for (const p of projects) {
    const sector = sectors.find((x) => x.slug === p.sector)?.title;
    const svc = servicesForProject(p)
      .map((slug) => services.find((x) => x.slug === slug)?.title)
      .filter(Boolean)
      .join(", ");
    out.push(
      `### ${p.title}`,
      "",
      `Page: ${u(`/projects/${p.slug}`)}`,
      [sector && `Sector: ${sector}`, p.location && `Location: ${p.location}`, svc && `Services: ${svc}`].filter(Boolean).join(". ") + ".",
      "",
      one(p.summary),
      "",
      ...p.body.map(one),
      "",
    );
  }

  out.push("## Insights", "");
  for (const a of insights) out.push(`- [${a.title}](${u(`/insights/${a.slug}`)}) (${a.displayDate}): ${one(a.excerpt)}`);
  out.push("");

  return out.join("\n");
}
