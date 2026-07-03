import type { MetadataRoute } from "next";
import { site, services, projects } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/company",
    "/culture",
    "/careers",
    "/expertise",
    "/projects",
    "/contact",
  ].map((path) => ({ url: `${site.url}${path}` }));

  return [
    ...staticPages,
    ...services.map((s) => ({ url: `${site.url}/expertise/${s.slug}` })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
  ];
}
