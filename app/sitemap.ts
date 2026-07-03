import type { MetadataRoute } from "next";
import { site, services, projects } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/services", "/projects", "/contact"].map(
    (path) => ({ url: `${site.url}${path}` })
  );

  return [
    ...staticPages,
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}` })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
  ];
}
