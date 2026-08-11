import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, ClipboardCheck,
  ArrowRight, Star,
  Droplet, Package, Award,
  BookOpen, Users, FileText,
} from "lucide-react";

import heroTrio from "@/assets/hero-trio-transparent.png.asset.json";
import labStandards from "@/assets/lab-standards.jpg";
import wholesaleVials from "@/assets/wholesale-vials.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { TrustBar } from "@/components/trust-bar";
import { SectionHeader } from "@/components/section-header";
import { CoaCard } from "@/components/coa-card";

import { products } from "@/lib/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const base = seo({
      path: "/",
      title: "Oxford Research Peptides — The UK's Educational Authority on Peptide Research",
      description:
        "Evidence-based guides, laboratory methodology and reference material for research peptides. Independently tested, UK manufactured — strictly for in-vitro laboratory research.",
      ogType: "website",
    });
    return {
      meta: base.meta,
      links: [
        ...base.links,
        // Preload the LCP hero asset so it starts fetching in parallel with the HTML.
        { rel: "preload", as: "image", href: heroTrio.url },
      ],
    };
  },
  component: Home,
});




const reviews = [
  { text: "Consistently high purity with full COA provided. Fast delivery and discreet packaging. Highly recommended for in-vitro work.", who: "Verified Buyer" },
  { text: "Purity is consistently above 99%. Oxford Research Peptides has become our standard supplier for reference material.", who: "Laboratory Researcher" },
  { text: "Outstanding documentation and transparency. The best peptide supplier we've sourced from in the UK.", who: "Verified Buyer" },
  { text: "Lot numbers match the certificates every time and the lyophilised cake is always intact on arrival. Reconstitutes cleanly.", who: "Research Technician" },
  { text: "Ordered late Friday, delivered Monday morning in secure, discreet packaging. Exactly what our lab needs from a UK supplier.", who: "Verified Buyer" },
];


function Home() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <TrustBar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative text-bone overflow-hidden bg-navy-deep">
          {/* Decorative background: DNA helix + molecule glyphs */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 1600 900" className="absolute right-0 top-0 h-full w-full" preserveAspectRatio="xMaxYMid slice">
              <defs>
                <linearGradient id="dnaG" x1="0" x2="1">
                  <stop offset="0" stopColor="#7BB8E8" stopOpacity="0.9"/>
                  <stop offset="1" stopColor="#7BB8E8" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
              <g stroke="url(#dnaG)" strokeWidth="1.5" fill="none">
                {Array.from({length: 28}).map((_,i) => {
                  const y = 40 + i*30;
                  const x1 = 720 + Math.sin(i*0.5)*70;
                  const x2 = 720 - Math.sin(i*0.5)*70;
                  return <g key={i}><line x1={x1} y1={y} x2={x2} y2={y}/></g>;
                })}
                <path d={`M 720 40 ${Array.from({length: 60}).map((_,i) => `L ${720 + Math.sin(i*0.25)*70} ${40+i*15}`).join(' ')}`}/>
                <path d={`M 720 40 ${Array.from({length: 60}).map((_,i) => `L ${720 - Math.sin(i*0.25)*70} ${40+i*15}`).join(' ')}`}/>
              </g>
              <g stroke="#7BB8E8" strokeWidth="1.2" fill="none" opacity="0.7">
                <polygon points="1150,180 1220,140 1290,180 1290,260 1220,300 1150,260"/>
                <line x1="1290" y1="180" x2="1360" y2="140"/>
                <line x1="1150" y1="180" x2="1080" y2="140"/>
                <line x1="1220" y1="300" x2="1220" y2="370"/>
                <circle cx="1360" cy="140" r="10"/>
                <circle cx="1080" cy="140" r="10"/>
                <circle cx="1220" cy="370" r="10"/>
                <text x="1355" y="145" fill="#7BB8E8" fontSize="18" opacity="0.6">O</text>
                <text x="1075" y="145" fill="#7BB8E8" fontSize="18" opacity="0.6">N</text>
              </g>
            </svg>
          </div>

          <div className="container-x relative grid grid-cols-1 md:grid-cols-[1fr_1.3fr] lg:grid-cols-[1fr_1.5fr] gap-6 md:gap-10 py-14 md:py-20 items-center">
            <div className="relative z-20">
              <div className="text-gold text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.35em] mb-4 md:mb-5">
                RESEARCH <span className="opacity-50 mx-1" aria-hidden="true">|</span> EDUCATION <span className="opacity-50 mx-1" aria-hidden="true">|</span> INNOVATION
              </div>
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-medium leading-[1.05] mb-5 md:mb-6">
                The UK's Educational<br/>Authority on<br/>
                <span className="text-gold italic">Peptide Research<span className="not-italic">.</span></span>
              </h1>
              <p className="hidden sm:block text-bone/75 text-base max-w-md mb-8 leading-relaxed">
                Evidence-based guides, comparisons and scientific resources to advance knowledge and support laboratory research. Strictly for in-vitro use.
              </p>

              <div className="flex flex-wrap gap-3 mb-6 md:mb-8">
                <Link to="/shop" className="px-5 md:px-7 py-3 md:py-3.5 bg-gold text-navy-deep text-[10px] md:text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-navy-deep">
                  SHOP PEPTIDES <ArrowRight className="w-3.5 h-3.5" aria-hidden="true"/>
                </Link>
              </div>


              <div className="hidden sm:flex items-center gap-3 text-sm">
                <span className="font-semibold">Excellent</span>
                <div className="flex gap-0.5" aria-hidden="true">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />)}
                </div>
                <span className="text-bone/70">Trusted by researchers nationwide</span>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <img
                src={heroTrio.url}
                alt="Oxford Research Peptides — Retatrutide, BPC-157 and Semaglutide research vials"
                fetchPriority="high"
                decoding="async"
                className="w-[160%] max-w-none h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] brightness-110"
              />
            </div>
          </div>

          {/* Feature strip */}
          <div className="relative border-t border-white/10 bg-navy-deep/60">
            <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 py-5">
              {[
                { icon: BookOpen, l: "Comprehensive Research Library" },
                { icon: ShieldCheck, l: "Evidence-Based Content" },
                { icon: Users, l: "Transparent Methodology" },
                { icon: FileText, l: "Cited by Researchers and AI Systems" },
              ].map(f => (
                <div key={f.l} className="flex items-center gap-3 text-bone/90">
                  <f.icon className="w-6 h-6 text-bone/80 shrink-0" strokeWidth={1.3} aria-hidden="true"/>
                  <div className="text-xs md:text-sm font-medium leading-tight">{f.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Compounds */}
        <section className="bg-muted/30 py-14">
          <div className="container-x">
            <SectionHeader
              eyebrow="FEATURED COMPOUNDS"
              ctaLabel="VIEW ALL PRODUCTS"
              ctaTo="/shop"
            />
            <p className="text-sm text-muted-foreground max-w-2xl -mt-6 mb-8">
              A selection of the research peptides most frequently referenced by laboratories working with our material. Product listings support research — not the other way around.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.filter(p => ["retatrutide", "mots-c", "semaglutide", "bpc-157"].includes(p.slug)).map(p => <ProductCard key={p.slug} p={p} />)}
            </div>
            <div className="flex justify-center mt-10">
              <Link to="/shop" className="px-8 py-3.5 border border-navy-deep text-navy-deep text-xs font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-gold">
                SHOP ALL PRODUCTS <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>


        {/* Excellence + CoA */}
        <section className="bg-navy-deep text-bone py-20">
          <div className="container-x grid lg:grid-cols-[1fr_1.2fr_0.9fr] gap-10 items-center">
            <div className="rounded-sm overflow-hidden">
              <img src={labStandards} alt="Laboratory reference standards" width={640} height={400} loading="lazy" className="w-full h-full object-cover" />
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
                    <s.icon className="w-8 h-8 text-gold mx-auto mb-2" strokeWidth={1.3} aria-hidden="true" />
                    <div className="text-[10px] opacity-80 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-block px-7 py-3.5 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors focus-visible:outline-2 focus-visible:outline-bone">
                LEARN MORE ABOUT US
              </Link>
            </div>
            <CoaCard />
          </div>
        </section>


        {/* Reviews */}
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x">
            <div className="bg-bone text-navy-deep p-8">
              <h3 className="text-xs font-bold tracking-[0.25em] mb-5 text-gold">TRUSTED BY RESEARCHERS</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {reviews.map(r => (
                  <div key={r.who + r.text.slice(0, 12)} className="text-sm">
                    <div className="flex gap-0.5 mb-2" aria-hidden="true">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                    </div>
                    <p className="text-xs leading-relaxed mb-3 text-navy-deep/80">"{r.text}"</p>
                    <div className="flex items-center gap-2 text-[11px] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" aria-hidden="true" />– {r.who}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
