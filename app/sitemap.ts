import type { MetadataRoute } from "next";
import { site, services, projects, sectors, jobs } from "@/lib/site";
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
  // attach the page's own photographs so they can surface in image search
  const withImages = <T extends object>(entry: T, images: (string | undefined)[]) => ({
    ...entry,
    images: [...new Set(images.filter((i): i is string => !!i))].slice(0, 12).map((i) => `${site.url}${i}`),
  });

  return [
    page("", 1, "weekly"),
    page("/expertise", 0.9, "monthly"),
    page("/projects", 0.9, "weekly"),
    page("/company", 0.7, "monthly"),
    page("/history", 0.5, "yearly"),
    page("/culture", 0.5, "yearly"),
    page("/careers", 0.6, "weekly"),
    ...jobs.map((j) => page(`/careers/${j.slug}`, 0.6, "weekly", new Date(j.posted ?? LAUNCH))),
    page("/insights", 0.7, "weekly"),
    page("/contact", 0.8, "yearly"),
    page("/privacy", 0.2, "yearly"),
    ...officePlaces.map((o) => page(`/offices/${o.slug}`, 0.8, "monthly")),
    ...services.map((s) => withImages(page(`/expertise/${s.slug}`, 0.9, "monthly"), [s.image, ...s.sections.map((x) => x.image), ...s.gallery])),
    ...sectors.map((s) => page(`/projects/sector/${s.slug}`, 0.7, "weekly")),
    ...(LANDING_LIVE ? serviceLandings.map((l) => page(`/expertise/${l.slug}`, 0.8, "monthly", new Date("2026-10-05"))) : []),
    ...(LANDING_LIVE ? countyLandings.map((l) => page(`/areas/${l.slug}`, 0.7, "monthly", new Date("2026-10-05"))) : []),
    ...projects.map((p) => withImages(page(`/projects/${p.slug}`, 0.6, "monthly"), [p.hero, p.thumb, ...p.gallery])),
    ...insights.map((a) =>
      withImages(page(`/insights/${a.slug}`, 0.5, "yearly", a.date ? new Date(a.date) : LAUNCH), [a.image])
    ),
    page("/fire-safety-consultants", 0.6, "monthly"),
  ];
}
