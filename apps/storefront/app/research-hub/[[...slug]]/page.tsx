import type { Metadata } from "next";
import Link from "next/link";
import research from "@orp/config/research-index.json";

export const dynamic = "force-static";

function pathFor(slug: string[] | undefined) {
  return `/research-hub${slug?.length ? `/${slug.join("/")}` : ""}`;
}

export function generateStaticParams() {
  const paths = new Set<string>(["/research-hub", "/research-hub/guides", "/research-hub/glossary", "/research-hub/literature", "/research-hub/comparisons"]);
  for (const entry of research) if (entry.path.startsWith("/research-hub/")) paths.add(entry.path);
  return [...paths].map((path) => ({ slug: path === "/research-hub" ? [] : path.replace("/research-hub/", "").split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = pathFor(slug);
  const entry = research.find((item) => item.path === path);
  return {
    title: entry?.title || "Research hub",
    description: entry?.summary || "Educational reference material. Research use only.",
    alternates: { canonical: path },
  };
}

export default async function ResearchPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = pathFor(slug);
  const entry = research.find((item) => item.path === path);
  const children = research.filter((item) => item.path.startsWith(`${path}/`) && item.path.split("/").length === path.split("/").length + 1);
  const listing = path === "/research-hub" ? research.filter((item) => item.path.split("/").length === 4).slice(0, 24) : children;
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem", maxWidth: 800 }}>
      <p className="gold-text" style={{ letterSpacing: "0.16em", fontSize: 12, fontWeight: 700 }}>RESEARCH HUB</p>
      <h1 style={{ fontSize: 48 }}>{entry?.title || "Research hub"}</h1>
      <p>{entry?.summary || "Reference guides, glossary entries, comparisons and literature notes. This material is educational and is not a health claim. Semaglutide remains in the literature where it was already published; it is not sold."}</p>
      <p style={{ fontSize: 14, color: "var(--muted)" }}>Long-form monograph bodies still live in the legacy editorial source. These routes keep the public URLs, titles and summaries so they can be reconciled before cutover. They are marked hold in the SEO map until the full articles are rendered here.</p>
      <ul>{listing.map((item) => <li key={item.path}><Link href={item.path}>{item.title}</Link>{item.summary ? ` — ${item.summary}` : ""}</li>)}</ul>
    </main>
  );
}
