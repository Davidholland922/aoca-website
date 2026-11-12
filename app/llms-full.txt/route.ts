import { llmsFullTxt } from "@/lib/llms";

// built once at deploy from the site's own content
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
