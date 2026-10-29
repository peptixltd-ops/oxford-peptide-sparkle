import type { MetadataRoute } from "next";
import research from "@orp/config/research-index.json";
import catalogue from "@orp/config/catalogue.json";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.NEXT_PUBLIC_STAGING === "true") return [];
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oxfordresearchpeptides.com";
  const staticPaths = ["", "/shop", "/about", "/contact", "/faqs", "/coas", "/research-hub", "/compounds", "/privacy-policy", "/terms", "/cookie-policy", "/disclaimer", "/shipping-policy", "/refund-policy", "/cancellation-policy", "/research-use-only", "/testing-and-quality-control", "/certificate-of-analysis"];
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path || "/"}` })),
    ...catalogue.products.map((product) => ({ url: `${base}/products/${product.handle}` })),
    ...research.map((entry) => ({ url: `${base}${entry.path}` })),
  ];
}
