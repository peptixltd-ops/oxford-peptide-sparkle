import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, FlaskConical, ClipboardCheck,
  Microscope, Truck, ArrowRight, Star, Calculator,
  Beaker, TestTube, Thermometer, Dna, MoreHorizontal, Droplet, Package, Award
} from "lucide-react";
import heroVial from "@/assets/vial-retatrutide.png";
import labStandards from "@/assets/lab-standards.jpg";
import artMolecule from "@/assets/article-molecule.jpg";
import artReconstitute from "@/assets/article-reconstitute.jpg";
import artVials from "@/assets/article-vials.jpg";
import artBook from "@/assets/article-book.jpg";
import artNetwork from "@/assets/article-network.jpg";
import wholesaleVials from "@/assets/wholesale-vials.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oxford Research Peptides — Premium UK Manufactured Research Peptides" },
      { name: "description", content: "UK manufactured, third-party tested research peptides with >99% purity. For laboratory research use only." },
      { property: "og:title", content: "Oxford Research Peptides — Premium UK Research Peptides" },
      { property: "og:description", content: "UK manufactured, third-party tested research peptides. Strictly for in-vitro laboratory research." },
    ],
  }),
  component: Home,
});

const trustBadges = [
  { icon: Award, title: "UK Manufactured", sub: "Made in the United Kingdom" },
  { icon: FlaskConical, title: "Third-Party Tested", sub: "Independent laboratory testing" },
  { icon: ClipboardCheck, title: "Batch Verified", sub: "Every batch verified" },
  { icon: Microscope, title: "Research Use Only", sub: "For laboratory research only" },
  { icon: Truck, title: "Fast UK Dispatch", sub: "Order by 2pm, ships same day" },
];

const researchAreas = [
  { icon: Dna, title: "Peptide Chemistry", items: ["Synthetic peptides", "Modified analogues", "Reference standards"] },
  { icon: Beaker, title: "Receptor Studies", items: ["GLP-1 ligands", "GHSR ligands", "Melanocortin ligands"] },
  { icon: TestTube, title: "Assay Development", items: ["HPLC standards", "MS reference", "Calibration peptides"] },
  { icon: Thermometer, title: "Stability Research", items: ["Lyophilised powders", "Reconstitution studies", "Long-term storage"] },
  { icon: MoreHorizontal, title: "Specialty Compounds", items: ["Copper peptides", "Cyclic peptides", "Custom syntheses"] },
];

const articles = [
  { img: artMolecule, date: "May 1, 2024", title: "Structural Notes on Retatrutide: A Triple Agonist Peptide" },
  { img: artReconstitute, date: "April 28, 2024", title: "Reconstituting Lyophilised Peptides: A Laboratory Guide" },
  { img: artNetwork, date: "May 1, 2024", title: "Comparative Sequence Analysis: Retatrutide vs Tirzepatide" },
  { img: artVials, date: "April 25, 2024", title: "Bacteriostatic Water: Composition and Laboratory Use" },
  { img: artBook, date: "April 20, 2024", title: "A Researcher's Primer to Peptide Handling and Storage" },
];

const reviews = [
  { text: "Consistently high purity with full COA provided. Fast delivery and discreet packaging. Highly recommended for in-vitro work.", who: "Verified Buyer" },
  { text: "Purity is consistently above 99%. Oxford Research Peptides has become our standard supplier for reference material.", who: "Laboratory Researcher" },
  { text: "Outstanding documentation and transparency. The best peptide supplier we've sourced from in the UK.", who: "Verified Buyer" },
];

function Home() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />

      {/* Trust strip */}
      <div className="bg-navy-deep text-bone border-b border-white/10">
        <div className="container-x grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <b.icon className="w-7 h-7 text-gold shrink-0" strokeWidth={1.5} />
              <div>
                <div className="text-[11px] font-bold tracking-wider">{b.title.toUpperCase()}</div>
                <div className="text-[11px] opacity-70">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative text-bone overflow-hidden min-h-[680px] flex items-center bg-navy-deep">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 75% 50%, rgba(180,140,70,0.18) 0%, transparent 55%), linear-gradient(180deg, #0a0f1a 0%, #0e1729 100%)"
        }} />
        <div className="container-x relative grid lg:grid-cols-[1.2fr_1fr] gap-10 py-24 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-[11px] font-bold tracking-[0.3em]">PREMIUM RESEARCH PEPTIDES</span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl font-medium leading-[1.02] mb-7">
              Research.<br />Quality.<br />Results<span className="text-gold">.</span>
            </h1>
            <p className="text-bone/75 text-base max-w-md mb-9 leading-relaxed">
              Premium research peptides manufactured in the UK with the highest standards of quality, documentation and transparency. Strictly for in-vitro laboratory research.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/shop" className="px-7 py-3.5 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors">
                SHOP PEPTIDES
              </Link>
              <Link to="/lab-testing" className="px-7 py-3.5 border border-bone/40 text-bone text-xs font-bold tracking-widest hover:bg-bone hover:text-navy-deep transition-colors">
                VIEW LAB REPORTS
              </Link>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold">Excellent</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />)}
              </div>
              <span className="text-bone/70">4.9/5 based on 120+ reviews</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center min-h-[480px]">
            <div className="absolute w-[380px] h-[380px] rounded-full" style={{
              background: "radial-gradient(circle, rgba(212,175,99,0.25) 0%, transparent 65%)"
            }} />
            <img
              src={heroVial}
              alt="Oxford Research Peptides vial"
              className="relative max-h-[560px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-bone py-16">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs font-bold tracking-[0.25em]">BEST SELLING RESEARCH PEPTIDES</h2>
            <Link to="/shop" className="text-xs font-bold tracking-widest flex items-center gap-2 hover:text-gold transition-colors">
              VIEW ALL PRODUCTS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => ["retatrutide", "mots-c", "semaglutide"].includes(p.slug)).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* Research areas */}
      <section className="bg-muted/40 py-16">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs font-bold tracking-[0.25em]">EXPLORE BY RESEARCH AREA</h2>
            <Link to="/shop" className="text-xs font-bold tracking-widest flex items-center gap-2 hover:text-gold">
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {researchAreas.map((a) => (
              <div key={a.title} className="bg-white p-6 group hover:shadow-lg transition-all border border-transparent hover:border-gold/30">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold leading-tight max-w-[60%]">{a.title}</h3>
                  <a.icon className="w-10 h-10 text-muted-foreground/60 group-hover:text-gold transition-colors" strokeWidth={1.2} />
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground mb-6">
                  {a.items.map(it => <li key={it}>{it}</li>)}
                </ul>
                <Link to="/shop" className="text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-gold">
                  EXPLORE <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence */}
      <section className="bg-navy-deep text-bone py-20">
        <div className="container-x grid lg:grid-cols-[1fr_1.2fr_0.9fr] gap-10 items-center">
          <div className="rounded-sm overflow-hidden">
            <img src={labStandards} alt="Lab standards" width={640} height={400} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-gold text-xs font-bold tracking-[0.25em] mb-4">OUR STANDARDS</div>
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-5 leading-tight">Excellence in Every Batch</h2>
            <p className="text-bone/70 mb-8 max-w-md leading-relaxed">
              We combine advanced peptide synthesis with independent third-party testing to deliver reference-grade material researchers can document and trust.
            </p>
            <div className="grid grid-cols-4 gap-4 mb-8 max-w-md">
              {[
                { icon: Award, l: "UK Manufactured" },
                { icon: Droplet, l: ">99% Purity" },
                { icon: ClipboardCheck, l: "COA Included" },
                { icon: Package, l: "Secure & Discreet" },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <s.icon className="w-8 h-8 text-gold mx-auto mb-2" strokeWidth={1.3} />
                  <div className="text-[10px] opacity-80 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-block px-7 py-3.5 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors">
              LEARN MORE ABOUT US
            </Link>
          </div>
          <div className="bg-white text-navy-deep p-6 rounded-sm shadow-2xl">
            <div className="text-center font-display text-sm font-semibold tracking-widest border-b border-border pb-3 mb-4">
              CERTIFICATE OF ANALYSIS
            </div>
            <dl className="text-xs space-y-2.5">
              {[
                ["Product", "Retatrutide"],
                ["Batch Number", "ORP-240501"],
                ["Purity (HPLC)", ">99%"],
                ["Appearance", "White Lyophilised Powder"],
                ["Molecular Weight", "4,574.6 g/mol"],
                ["Test Date", "01/05/2024"],
                ["Result", "PASS"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-dashed border-border pb-1.5">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex items-end justify-between mt-5">
              <div>
                <div className="font-display italic text-lg">Dr. A. Chen</div>
                <div className="text-[9px] text-muted-foreground">Head of Quality Control</div>
              </div>
              <div className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center text-gold text-[9px] font-bold rotate-[-12deg]">
                APPROVED
              </div>
            </div>
            <div className="text-center mt-5 pt-4 border-t border-border">
              <Link to="/lab-testing" className="text-[10px] font-bold tracking-widest hover:text-gold">VIEW SAMPLE COA →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Library */}
      <section className="bg-bone py-16">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs font-bold tracking-[0.25em]">RESEARCH LIBRARY</h2>
            <Link to="/research-hub" className="text-xs font-bold tracking-widest flex items-center gap-2 hover:text-gold">
              VIEW ALL ARTICLES <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {articles.map((a) => (
              <Link to="/research-hub" key={a.title} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden mb-3">
                  <img src={a.img} alt={a.title} width={400} height={300} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-[10px] text-muted-foreground mb-1.5 tracking-wider">{a.date}</div>
                <h3 className="font-display text-base font-semibold leading-snug group-hover:text-gold transition-colors">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator + Reviews */}
      <section className="bg-navy-deep text-bone py-14">
        <div className="container-x grid lg:grid-cols-2 gap-6">
          <div className="bg-navy-deep border border-white/10 p-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center shrink-0">
                <Calculator className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold tracking-[0.25em] mb-2">PEPTIDE RECONSTITUTION CALCULATOR</h3>
                <p className="text-bone/70 text-sm mb-5 leading-relaxed">
                  Calculate reconstitution volumes and concentrations for your in-vitro work with our easy-to-use calculator.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="email" placeholder="Enter your email"
                    className="flex-1 bg-white text-navy-deep px-4 py-3 text-sm outline-none placeholder:text-muted-foreground" />
                  <button className="px-6 py-3 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors whitespace-nowrap">
                    LAUNCH CALCULATOR
                  </button>
                </div>
                <div className="flex gap-5 mt-4 text-[11px] text-bone/60">
                  <span>🔒 100% Free</span><span>No Spam</span><span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-bone text-navy-deep p-8">
            <h3 className="text-xs font-bold tracking-[0.25em] mb-5 text-gold">TRUSTED BY RESEARCHERS</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {reviews.map((r) => (
                <div key={r.who} className="text-sm">
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                  </div>
                  <p className="text-xs leading-relaxed mb-3 text-navy-deep/80">"{r.text}"</p>
                  <div className="flex items-center gap-2 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />– {r.who}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale */}
      <section className="relative bg-muted overflow-hidden">
        <div className="container-x grid lg:grid-cols-[0.7fr_1.3fr_auto] gap-8 items-center py-10">
          <img src={wholesaleVials} alt="Wholesale vials" width={400} height={200} loading="lazy"
            className="w-full h-32 object-cover rounded-sm" />
          <div>
            <div className="text-gold text-[11px] font-bold tracking-[0.25em] mb-2">WHOLESALE & BULK SUPPLY</div>
            <h2 className="font-display text-2xl md:text-3xl font-medium mb-3 leading-tight">
              Supplying laboratories, universities and research institutions across the UK and worldwide.
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span>✓ Competitive pricing</span>
              <span>✓ Priority support</span>
              <span>✓ Discreet packaging</span>
              <span>✓ Consistent supply</span>
            </div>
          </div>
          <Link to="/wholesale" className="px-8 py-4 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
            APPLY FOR WHOLESALE
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
