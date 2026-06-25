import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          `User-agent: *\nAllow: /\n\nSitemap: https://oxfordresearchpeptides.com/sitemap.xml\n`,
          { headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=3600" } },
        ),
    },
  },
});
