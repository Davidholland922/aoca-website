import type { MetadataRoute } from "next";
import { site, services, projects } from "@/lib/site";
import { insights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/company",
    "/culture",
    "/careers",
    "/expertise",
    "/projects",
    "/insights",
    "/contact",
  ].map((path) => ({ url: `${site.url}${path}` }));

  return [
    ...staticPages,
    ...services.map((s) => ({ url: `${site.url}/expertise/${s.slug}` })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...insights.map((a) => ({ url: `${site.url}/insights/${a.slug}` })),
  ];
}
