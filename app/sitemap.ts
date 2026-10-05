import type { MetadataRoute } from "next";
import { site, services, projects, sectors } from "@/lib/site";
import { insights } from "@/lib/insights";
import { officePlaces } from "@/lib/seo";
import { LANDING_LIVE, serviceLandings, countyLandings } from "@/lib/landing";

const LAUNCH = new Date("2026-10-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified: Date = LAUNCH
  ) => ({ url: `${site.url}${path}`, lastModified, changeFrequency, priority });

  return [
    page("", 1, "weekly"),
    page("/expertise", 0.9, "monthly"),
    page("/projects", 0.9, "weekly"),
    page("/company", 0.7, "monthly"),
    page("/history", 0.5, "yearly"),
    page("/culture", 0.5, "yearly"),
    page("/careers", 0.5, "monthly"),
    page("/insights", 0.7, "weekly"),
    page("/contact", 0.8, "yearly"),
    page("/privacy", 0.2, "yearly"),
    ...officePlaces.map((o) => page(`/offices/${o.slug}`, 0.8, "monthly")),
    ...services.map((s) => page(`/expertise/${s.slug}`, 0.9, "monthly")),
    ...sectors.map((s) => page(`/projects/sector/${s.slug}`, 0.7, "weekly")),
    ...(LANDING_LIVE ? serviceLandings.map((l) => page(`/expertise/${l.slug}`, 0.8, "monthly", new Date("2026-10-05"))) : []),
    ...(LANDING_LIVE ? countyLandings.map((l) => page(`/areas/${l.slug}`, 0.7, "monthly", new Date("2026-10-05"))) : []),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.6, "monthly")),
    ...insights.map((a) =>
      page(`/insights/${a.slug}`, 0.5, "yearly", a.date ? new Date(a.date) : LAUNCH)
    ),
  ];
}
