import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, User, ShoppingBag, ShieldCheck, FlaskConical, ClipboardCheck,
  Microscope, Truck, ArrowRight, Star, Calculator, Instagram, Twitter, Mail,
  Activity, Heart, TrendingUp, Atom, MoreHorizontal, Droplet, Package, Award
} from "lucide-react";
import heroVial from "@/assets/hero-vial.jpg";
import labStandards from "@/assets/lab-standards.jpg";
import artMolecule from "@/assets/article-molecule.jpg";
import artReconstitute from "@/assets/article-reconstitute.jpg";
import artVials from "@/assets/article-vials.jpg";
import artBook from "@/assets/article-book.jpg";
import artNetwork from "@/assets/article-network.jpg";
import wholesaleVials from "@/assets/wholesale-vials.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oxford Research Peptides — Premium UK Manufactured Research Peptides" },
      { name: "description", content: "UK manufactured, third-party tested research peptides with >99% purity. Certificates of analysis included on every batch." },
      { property: "og:title", content: "Oxford Research Peptides — Premium UK Research Peptides" },
      { property: "og:description", content: "UK manufactured, third-party tested research peptides with >99% purity." },
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

const products = [
  { name: "Retatrutide", dose: "10mg", purity: ">99% Purity", color: "oklch(0.4 0.04 258)" },
  { name: "BPC-157", dose: "10mg", purity: ">99% Purity", color: "oklch(0.35 0.1 250)" },
  { name: "TB-500", dose: "10mg", purity: ">99% Purity", color: "oklch(0.4 0.08 150)" },
  { name: "BPC-157 / TB-500 Blend", dose: "10mg", purity: ">99% Purity", color: "oklch(0.35 0.12 290)" },
  { name: "GHK-Cu", dose: "5mg", purity: ">98% Purity", color: "oklch(0.5 0.13 50)" },
  { name: "CJC-1295 (no DAC)", dose: "5mg", purity: ">99% Purity", color: "oklch(0.45 0.09 220)" },
];

const researchAreas = [
  { icon: Activity, title: "Weight Management Research", items: ["Retatrutide", "Tirzepatide", "Semaglutide"] },
  { icon: Heart, title: "Recovery Research", items: ["BPC-157", "TB-500", "BPC/TB Blend"] },
  { icon: TrendingUp, title: "Growth Hormone Research", items: ["CJC-1295", "Ipamorelin", "Sermorelin"] },
  { icon: Atom, title: "Copper Peptides Research", items: ["GHK-Cu", "TB-500", "Copper Peptides"] },
  { icon: MoreHorizontal, title: "Other Research Peptides", items: ["Melanotan II", "PT-141", "And more"] },
];

const articles = [
  { img: artMolecule, date: "May 1, 2024", title: "Retatrutide Benefits: What The Research Shows" },
  { img: artReconstitute, date: "April 28, 2024", title: "How to Reconstitute Peptides: A Step-by-Step Guide" },
  { img: artNetwork, date: "May 1, 2024", title: "Retatrutide vs Tirzepatide: Key Differences" },
  { img: artVials, date: "April 25, 2024", title: "What is Bacteriostatic Water and Why Is It Important?" },
  { img: artBook, date: "April 20, 2024", title: "Peptides Beginner Guide: Everything You Need to Know" },
];

const reviews = [
  { text: "Excellent quality peptides with full COA provided. Fast delivery and discreet packaging. Highly recommended.", who: "Verified Buyer" },
  { text: "The purity is consistently above 99%. Oxford Research Peptides is my go-to supplier.", who: "Laboratory Researcher" },
  { text: "Outstanding customer service and transparency. The best peptide supplier in the UK.", who: "Verified Buyer" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`w-9 h-10 rounded-sm flex items-center justify-center border-2 ${light ? "border-gold" : "border-gold"}`}
           style={{ background: "linear-gradient(180deg, var(--navy) 0%, var(--navy-deep) 100%)" }}>
        <span className="text-gold text-lg font-display font-bold">O</span>
      </div>
      <div className={`leading-tight ${light ? "text-bone" : "text-navy-deep"}`}>
        <div className="font-display text-lg font-semibold tracking-wide">OXFORD</div>
        <div className="text-[9px] tracking-[0.2em] -mt-1 opacity-80">RESEARCH PEPTIDES</div>
      </div>
    </Link>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container-x flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-widest">
            <a href="#" className="hover:text-gold transition-colors">SHOP PEPTIDES ▾</a>
            <a href="#" className="hover:text-gold transition-colors">RESEARCH HUB ▾</a>
            <a href="#" className="hover:text-gold transition-colors">LAB TESTING</a>
            <a href="#" className="hover:text-gold transition-colors">ABOUT US</a>
            <a href="#" className="hover:text-gold transition-colors">WHOLESALE</a>
          </nav>
          <div className="flex items-center gap-5">
            <button aria-label="Search"><Search className="w-5 h-5" /></button>
            <button aria-label="Account"><User className="w-5 h-5" /></button>
            <button aria-label="Cart" className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-gold text-navy-deep text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </header>

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
      <section className="relative overflow-hidden text-bone"
        style={{ background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0%, transparent 40%)"
        }} />
        <div className="container-x relative grid lg:grid-cols-[1.1fr_1fr_0.7fr] gap-10 py-20 items-center">
          <div>
            <div className="text-gold text-xs font-bold tracking-[0.25em] mb-6">PREMIUM RESEARCH PEPTIDES</div>
            <h1 className="font-display text-6xl md:text-7xl font-medium leading-[1.05] mb-6">
              Research.<br />Quality.<br />Results<span className="text-gold">.</span>
            </h1>
            <p className="text-bone/70 text-base max-w-md mb-8 leading-relaxed">
              Premium research peptides manufactured in the UK with the highest standards of quality and transparency.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="px-7 py-3.5 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors">
                SHOP PEPTIDES
              </button>
              <button className="px-7 py-3.5 border border-bone/40 text-bone text-xs font-bold tracking-widest hover:bg-bone hover:text-navy-deep transition-colors">
                VIEW LAB REPORTS
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold">Excellent</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />)}
              </div>
              <span className="text-bone/70">4.9/5 based on 120+ reviews</span>
              <span className="text-emerald-400 font-semibold">★ Trustpilot</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full" />
            <img src={heroVial} alt="Premium research peptide vial" width={520} height={520}
              className="relative max-w-full h-auto drop-shadow-2xl" />
          </div>

          <div className="hidden lg:flex flex-col gap-5">
            {trustBadges.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-wider">{b.title.toUpperCase()}</div>
                  <div className="text-[11px] opacity-70">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-bone py-16">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs font-bold tracking-[0.25em]">BEST SELLING RESEARCH PEPTIDES</h2>
            <a href="#" className="text-xs font-bold tracking-widest flex items-center gap-2 hover:text-gold transition-colors">
              VIEW ALL PRODUCTS <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((p) => (
              <div key={p.name} className="bg-white border border-border p-5 flex flex-col group hover:border-gold transition-colors">
                <div className="aspect-square flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-x-4 inset-y-2 bg-gradient-to-b from-transparent to-muted/60 rounded-full blur-xl" />
                  <div className="relative w-20 h-32 flex flex-col items-center">
                    <div className="w-14 h-6 rounded-t-sm" style={{ background: p.color }} />
                    <div className="w-20 h-26 bg-gradient-to-b from-white/90 to-white/60 border border-muted-foreground/20 rounded-b-sm flex items-center justify-center px-1" style={{ height: "6.5rem" }}>
                      <span className="text-[10px] font-bold text-navy-deep text-center leading-tight">{p.name.split(" ")[0]}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-base font-semibold mb-2">{p.name}</h3>
                <span className="inline-block bg-gold/20 text-navy-deep text-[10px] font-bold px-2 py-1 mb-1 w-fit">{p.dose}</span>
                <div className="text-xs text-muted-foreground mb-4">{p.purity}</div>
                <button className="mt-auto border border-border py-2.5 text-[10px] font-bold tracking-widest hover:bg-navy-deep hover:text-bone hover:border-navy-deep transition-colors">
                  VIEW PRODUCT
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research areas */}
      <section className="bg-muted/40 py-16">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs font-bold tracking-[0.25em]">EXPLORE BY RESEARCH AREA</h2>
            <a href="#" className="text-xs font-bold tracking-widest flex items-center gap-2 hover:text-gold">
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </a>
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
                <a href="#" className="text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-gold">
                  EXPLORE <ArrowRight className="w-3 h-3" />
                </a>
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
              We combine advanced manufacturing with independent testing to deliver peptides researchers can trust.
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
            <button className="px-7 py-3.5 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors">
              LEARN MORE ABOUT US
            </button>
          </div>
          <div className="bg-white text-navy-deep p-6 rounded-sm shadow-2xl">
            <div className="text-center font-display text-sm font-semibold tracking-widest border-b border-border pb-3 mb-4">
              CERTIFICATE OF ANALYSIS
            </div>
            <dl className="text-xs space-y-2.5">
              {[
                ["Product", "Retatrutide"],
                ["Batch Number", "ORP-240501"],
                ["Purity", ">99%"],
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
              <a href="#" className="text-[10px] font-bold tracking-widest hover:text-gold">VIEW SAMPLE COA →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Research Library */}
      <section className="bg-bone py-16">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xs font-bold tracking-[0.25em]">RESEARCH LIBRARY</h2>
            <a href="#" className="text-xs font-bold tracking-widest flex items-center gap-2 hover:text-gold">
              VIEW ALL ARTICLES <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {articles.map((a) => (
              <article key={a.title} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden mb-3">
                  <img src={a.img} alt={a.title} width={400} height={300} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-[10px] text-muted-foreground mb-1.5 tracking-wider">{a.date}</div>
                <h3 className="font-display text-base font-semibold leading-snug group-hover:text-gold transition-colors">{a.title}</h3>
              </article>
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
                  Calculate your peptide dosages and reconstitution amounts with our easy-to-use calculator.
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
              Supplying laboratories, clinics and research institutions across the UK and worldwide.
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span>✓ Competitive pricing</span>
              <span>✓ Priority support</span>
              <span>✓ Discreet packaging</span>
              <span>✓ Consistent supply</span>
            </div>
          </div>
          <button className="px-8 py-4 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
            APPLY FOR WHOLESALE
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-bone">
        <div className="container-x py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Logo light />
            <p className="text-bone/60 text-xs mt-5 max-w-xs leading-relaxed">
              Premium research peptides manufactured in the UK with the highest standards of quality and transparency.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" aria-label="Email" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
          {[
            { h: "SHOP", links: ["All Peptides", "Bestsellers", "New Arrivals", "Peptide Blends", "Consumables"] },
            { h: "RESEARCH HUB", links: ["Peptide Guides", "Research Articles", "Comparison Guides", "Beginner Guide", "Glossary"] },
            { h: "LAB TESTING", links: ["Lab Testing Process", "Certificates (COA)", "Quality Standards", "Purity & Testing", "FAQs"] },
            { h: "COMPANY", links: ["About Us", "Our Mission", "Careers", "Contact Us"] },
            { h: "SUPPORT", links: ["Shipping & Delivery", "Returns & Refunds", "FAQs", "Terms & Conditions", "Privacy Policy"] },
          ].map(col => (
            <div key={col.h}>
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-gold mb-4">{col.h}</h4>
              <ul className="space-y-2.5 text-xs text-bone/70">
                {col.links.map(l => <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-gold mb-4">STAY UPDATED</h4>
            <p className="text-xs text-bone/70 mb-4">Get the latest research news, new peptides, and exclusive offers.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-bone/20 px-3 py-2.5 text-xs outline-none focus:border-gold" />
              <button className="px-4 bg-gold text-navy-deep" aria-label="Subscribe"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        <div className="border-t border-bone/10">
          <div className="container-x py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-bone/50">
            <div>© 2024 Oxford Research Peptides. All rights reserved.</div>
            <div>Research Use Only. Not for Human Consumption.</div>
            <div className="flex gap-2 opacity-70">
              {["VISA","MC","AMEX","PP","AP","GP"].map(p => (
                <span key={p} className="bg-white text-navy-deep text-[9px] font-bold px-2 py-1 rounded-sm">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
