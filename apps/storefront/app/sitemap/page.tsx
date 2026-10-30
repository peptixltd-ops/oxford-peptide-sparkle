import Link from "next/link";
import catalogue from "@orp/config/catalogue.json";

export const metadata = { title: "Sitemap", alternates: { canonical: "/sitemap" } };

export default function SitemapPage() {
  const links = ["/", "/shop", "/about", "/contact", "/faqs", "/coas", "/research-hub", "/account", "/cart", ...catalogue.products.map((product) => `/products/${product.handle}`)];
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem" }}>
      <h1>Sitemap</h1>
      <ul>{links.map((href) => <li key={href}><Link href={href}>{href}</Link></li>)}</ul>
    </main>
  );
}
