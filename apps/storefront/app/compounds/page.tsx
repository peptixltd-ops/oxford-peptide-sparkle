import Link from "next/link";
import research from "@orp/config/research-index.json";

export const metadata = { title: "Compounds", alternates: { canonical: "/compounds" } };

export default function CompoundsPage() {
  const compounds = research.filter((entry) => entry.page_type === "compound");
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem" }}>
      <h1>Compounds</h1>
      <ul>{compounds.map((entry) => <li key={entry.path}><Link href={entry.path}>{entry.title}</Link></li>)}</ul>
    </main>
  );
}
