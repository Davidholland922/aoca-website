import type { MetadataRoute } from "next";

// Draft/staging: block all crawlers until the production domain goes live.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
