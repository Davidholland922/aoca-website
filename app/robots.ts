import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const PRIVATE = ["/admin", "/api/", "/launch-kit/"];

/**
 * AI assistants and answer engines are welcome: being read is how AOCA gets
 * cited when someone asks one for an engineer. They are named explicitly so
 * the intent is unambiguous (some crawlers only act on a rule addressed to
 * them) and get the same private areas kept out as everyone else.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI, model training
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // ChatGPT fetching a page for a user
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini and AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot", // Common Crawl, used by many models
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
