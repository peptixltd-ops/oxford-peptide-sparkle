import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/lib/products";
import { compoundEntries, guides, glossaryTerms, comparisons, studies } from "@/lib/taxonomy";

const BASE_URL = "https://oxfordresearchpeptides.com";

interface Entry { path: string; changefreq?: string; priority?: string }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/shop", changefreq: "weekly", priority: "0.9" },
          { path: "/research-hub", changefreq: "monthly", priority: "0.6" },
          { path: "/lab-testing", changefreq: "monthly", priority: "0.6" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/wholesale", changefreq: "monthly", priority: "0.6" },
          { path: "/faqs", changefreq: "monthly", priority: "0.6" },
          { path: "/editorial-standards", changefreq: "yearly", priority: "0.5" },
          { path: "/research-methodology", changefreq: "yearly", priority: "0.5" },
          { path: "/publication-workflow", changefreq: "yearly", priority: "0.5" },
          { path: "/sitemap", changefreq: "monthly", priority: "0.3" },
          { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
          { path: "/refund-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/shipping-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/cancellation-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/editorial-policy", changefreq: "yearly", priority: "0.5" },
          { path: "/corrections-policy", changefreq: "yearly", priority: "0.5" },
          { path: "/funding-and-conflicts", changefreq: "yearly", priority: "0.5" },
          { path: "/scientific-advisory-board", changefreq: "monthly", priority: "0.5" },
          { path: "/testing-and-quality-control", changefreq: "yearly", priority: "0.5" },
          { path: "/certificate-of-analysis", changefreq: "yearly", priority: "0.5" },
          { path: "/research-use-only", changefreq: "yearly", priority: "0.5" },
          { path: "/explore", changefreq: "weekly", priority: "0.7" },
          { path: "/explore/compounds", changefreq: "weekly", priority: "0.7" },
          { path: "/explore/mechanisms", changefreq: "weekly", priority: "0.7" },
          { path: "/explore/pathways", changefreq: "monthly", priority: "0.6" },
          { path: "/explore/pathways/beginner", changefreq: "monthly", priority: "0.5" },
          { path: "/explore/pathways/intermediate", changefreq: "monthly", priority: "0.5" },
          { path: "/explore/pathways/advanced", changefreq: "monthly", priority: "0.5" },
          { path: "/explore/pathways/compound-focused", changefreq: "monthly", priority: "0.5" },
          { path: "/explore/pathways/mechanism-focused", changefreq: "monthly", priority: "0.5" },
          { path: "/explore/pathways/methodology-focused", changefreq: "monthly", priority: "0.5" },
        ];

        for (const p of products) {
          entries.push({ path: `/products/${p.slug}`, changefreq: "weekly", priority: "0.8" });
        }
        for (const c of compoundEntries.filter((c) => c.populated)) {
          entries.push({ path: `/compounds/${c.slug}`, changefreq: "monthly", priority: "0.8" });
        }
        for (const g of guides.filter((g) => g.populated)) {
          entries.push({ path: `/research-hub/guides/${g.slug}`, changefreq: "monthly", priority: "0.7" });
        }
        for (const t of glossaryTerms.filter((t) => t.populated)) {
          entries.push({ path: `/research-hub/glossary/${t.slug}`, changefreq: "monthly", priority: "0.5" });
        }

        const urls = entries.map(e =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        ).join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
