import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import research from "@orp/config/research-index.json";

export function generateStaticParams() {
  return research.filter((entry) => entry.page_type === "compound").map((entry) => ({ slug: entry.path.split("/").pop()! }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = research.find((item) => item.path === `/compounds/${slug}`);
  return { title: entry?.title || "Compound", description: entry?.summary, alternates: { canonical: `/compounds/${slug}` } };
}

export default async function CompoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = research.find((item) => item.path === `/compounds/${slug}`);
  if (!entry) notFound();
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem", maxWidth: 760 }}>
      <h1>{entry.title}</h1>
      <p>{entry.summary || "Compound reference. Research use only. This page keeps the public URL. The full monograph remains in the legacy editorial source until it is rendered here."}</p>
      {slug !== "semaglutide" && <p><Link href={`/products/${slug}`}>View the research product, where one is sold.</Link></p>}
      {slug === "semaglutide" && <p>Semaglutide is not sold. The product URL redirects to the shop. This literature page stays.</p>}
    </main>
  );
}
