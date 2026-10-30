import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const staging = process.env.NEXT_PUBLIC_STAGING === "true";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oxfordresearchpeptides.com";
  if (staging) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${base}/sitemap.xml` };
}
