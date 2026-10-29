import Link from "next/link";
import { listProducts } from "@/lib/medusa";
import { ProductTile } from "@/components/product-tile";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await listProducts().catch(() => []);
  const featured = ["retatrutide", "mots-c", "bpc-157"].map((handle) => products.find((product) => product.handle === handle)).filter(Boolean);
  return (
    <main id="main-content">
      <section className="on-navy" style={{ background: "var(--navy-deep)", color: "var(--bone)" }}>
        <div className="container-x hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 32, alignItems: "center", padding: "3.5rem 0" }}>
          <div>
            <div className="gold-text" style={{ letterSpacing: "0.28em", fontSize: 12, fontWeight: 700, marginBottom: 16 }}>UK MANUFACTURED | INDEPENDENTLY TESTED | RESEARCH-READY</div>
            <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", lineHeight: 1.05, margin: "0 0 1rem" }}>
              The Gold Standard<br />in UK Peptide<br /><span className="gold-text" style={{ fontStyle: "italic" }}>Research.</span>
            </h1>
            <p style={{ color: "rgba(247,244,238,.75)", maxWidth: 460 }}>Independently verified ≥99% purity. Every batch ships with a traceable COA and discreet packaging. UK delivery is by Royal Mail Tracked 24, usually delivered the next working day.</p>
            <Link className="btn" href="/shop">SHOP PEPTIDES</Link>
          </div>
          <img src="/brand/hero-trio-960.webp" alt="Oxford Research Peptides — Retatrutide, BPC-157 and Tirzepatide research vials" width={960} height={640} style={{ width: "100%" }} />
        </div>
      </section>
      <section style={{ background: "#f6f3ed", padding: "3.5rem 0" }}>
        <div className="container-x">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16 }}>
            <h2 style={{ fontSize: 42, margin: 0 }}>Featured compounds</h2>
            <Link href="/shop" className="gold-text" style={{ letterSpacing: "0.14em", fontSize: 12, fontWeight: 700 }}>VIEW ALL PRODUCTS</Link>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: 640 }}>A selection of the research peptides most frequently referenced by laboratories working with our material. Product listings support research — not the other way around.</p>
          <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {featured.map((product) => product && <ProductTile key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      <section className="on-navy" style={{ background: "var(--navy-deep)", color: "var(--bone)", padding: "4rem 0" }}>
        <div className="container-x split" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 28, alignItems: "center" }}>
          <img src="/brand/lab-standards.jpg" alt="Laboratory reference standards" width={640} height={400} />
          <div>
            <div className="gold-text" style={{ letterSpacing: "0.22em", fontSize: 12, fontWeight: 700 }}>OUR STANDARDS</div>
            <h2 style={{ fontSize: 48, margin: "0.3rem 0 0.8rem" }}>Excellence in Every Batch</h2>
            <p style={{ color: "rgba(247,244,238,.75)" }}>We combine advanced peptide synthesis with independent third-party testing to deliver reference-grade material researchers can document and trust.</p>
            <Link className="btn" href="/coas">VIEW CERTIFICATES</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
