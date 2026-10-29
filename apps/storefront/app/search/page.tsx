import type { Metadata } from "next";
import Link from "next/link";
import { listProducts } from "@/lib/medusa";
import research from "@orp/config/research-index.json";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Search", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const products = query ? (await listProducts()).filter((product) => `${product.title} ${product.handle} ${product.description || ""}`.toLowerCase().includes(query)) : [];
  const articles = query ? research.filter((entry) => `${entry.title} ${entry.summary}`.toLowerCase().includes(query)).slice(0, 20) : [];
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem" }}>
      <h1>Search</h1>
      <form><input name="q" defaultValue={q} aria-label="Search" style={{ width: "min(480px, 100%)", padding: "0.8rem" }} /><button className="btn" style={{ marginLeft: 8 }}>SEARCH</button></form>
      <h2>Products</h2>
      {!products.length && <p>No matching Oxford Research Peptides products.</p>}
      <ul>{products.map((product) => <li key={product.id}><Link href={`/products/${product.handle}`}>{product.title}</Link></li>)}</ul>
      <h2>Research hub</h2>
      <ul>{articles.map((entry) => <li key={entry.path}><Link href={entry.path}>{entry.title}</Link></li>)}</ul>
    </main>
  );
}
