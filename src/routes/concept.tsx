import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { products, fromPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import {
  ShieldCheck,
  FlaskConical,
  Microscope,
  Package,
  ArrowRight,
  ShoppingCart,
  Star,
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";
import heroTrio from "@/assets/hero-lab-trio.png.asset.json";
import labStandards from "@/assets/lab-standards.jpg";


export const Route = createFileRoute("/concept")({
  head: () => ({
    meta: [
      { title: "Concept — Oxford Research Peptides" },
      { name: "description", content: "Radically simplified homepage concept." },
    ],
  }),
  component: ConceptHome,
});

const trustPills = [
  { icon: FlaskConical, label: "Laboratory Research Use" },
  { icon: ShieldCheck, label: "HPLC & MS Verified" },
  { icon: Package, label: "UK Dispatch, Tracked" },
  { icon: Microscope, label: "COA Available On Request" },
];

const bestSellers = products.filter((p) =>
  ["retatrutide", "tirzepatide", "semaglutide", "ghk-cu"].includes(p.slug)
);

const topResearch = products.filter((p) =>
  ["bpc-157", "mots-c", "ss-31", "semax"].includes(p.slug)
);

const feedback = [
  {
    who: "DR. SARAH M.",
    text: "Easily the most reliable UK supplier we've used in the lab. Purity matches the COA every time and reconstitution is clean — no cloudiness, no residue.",
  },
  {
    who: "ALEX P., RESEARCH TECH",
    text: "Ordered Friday evening, arrived Monday morning in discreet, secure packaging. Lyophilised cake was intact and the lot number matched the certificate exactly.",
  },
  {
    who: "JAMES K., PHD CANDIDATE",
    text: "Independent third-party HPLC came back at 99.4%, bang on the label. Quality I can actually cite in my notes.",
  },
];

const researchTags = [
  { label: "GLP-1 RESEARCH", to: "/research-hub/mechanisms" },
  { label: "STRUCTURAL RESEARCH", to: "/compounds" },
  { label: "SENESCENCE RESEARCH", to: "/research-hub/literature" },
  { label: "NEURO RESEARCH", to: "/research-hub/guides" },
  { label: "ENDOCRINE RESEARCH", to: "/research-hub/mechanisms" },
  { label: "RESEARCH GUIDES", to: "/research-hub/guides" },
] as const;

const stats = [
  { big: "≥99%", small: "PURITY" },
  { big: "Quality", small: "TESTED" },
  { big: "UK-Based", small: "SUPPLIER" },
  { big: "Next Day", small: "DELIVERY" },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders placed before 3pm ship same day via tracked next-day courier within the UK.",
  },
  {
    q: "When are orders dispatched?",
    a: "Monday to Friday, excluding UK public holidays. You will receive a dispatch confirmation with tracking as soon as your parcel leaves us.",
  },
  {
    q: "Will I receive tracking?",
    a: "Yes — a tracked courier reference is emailed to you on dispatch so you can follow the parcel to delivery.",
  },
  {
    q: "Is a Certificate of Analysis included?",
    a: "Every batch is verified by HPLC and MS. An in-house Certificate of Analysis is available on request, and independent third-party testing can also be supplied.",
  },
  {
    q: "How should material be stored?",
    a: "Lyophilised powders should be stored at 2–8°C, protected from light. Reconstituted material should be handled per your own laboratory protocols.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, to most destinations. International parcels are shipped tracked; customers are responsible for local import requirements.",
  },
  {
    q: "Can I place a bulk order?",
    a: "Yes — laboratories, universities and institutions can apply for wholesale pricing and priority support via our wholesale page.",
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span className="font-display text-lg md:text-xl text-navy-deep">{f.q}</span>
              {isOpen ? (
                <Minus className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
              ) : (
                <Plus className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
              )}
            </button>
            {isOpen && (
              <p className="pb-6 -mt-1 text-sm text-navy-deep/70 max-w-3xl leading-relaxed">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}


function ConceptProductCard({ product: p }: { product: (typeof products)[0] }) {
  const { add } = useCart();
  const firstVariant = p.variants[0];

  return (
    <div className="bg-white border border-border group flex flex-col">
      <Link to={`/products/${p.slug}`} className="block aspect-[4/5] bg-bone p-6 flex items-center justify-center">
        <img
          src={p.img}
          alt={p.name}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-lg leading-tight mb-1 text-navy-deep">
          {p.name} <span className="italic font-normal">— Research Peptide</span>
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Lyophilised, {p.purity}
        </p>
        <p className="font-semibold text-navy-deep mb-4">
          £{fromPrice(p).toFixed(2)}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            type="button"
            onClick={() => add(p.slug, firstVariant.id)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-navy-deep text-bone text-[10px] font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
            ADD
          </button>
          <Link
            to={`/products/${p.slug}`}
            className="flex items-center justify-center px-4 py-3 border border-navy-deep text-navy-deep text-[10px] font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
}

function ConceptHome() {
  return (
    <div
      className="min-h-screen bg-bone text-navy-deep"
      style={
        {
          "--secondary": "oklch(0.94 0.012 258)",
          "--secondary-foreground": "oklch(0.16 0.035 258)",
          "--muted": "oklch(0.90 0.016 258)",
          "--muted-foreground": "oklch(0.40 0.025 258)",
        } as React.CSSProperties
      }
    >
      <div className="bg-navy-deep text-bone text-[11px] py-2 text-center tracking-wide">
        For Laboratory Research Use Only · Not For Human Or Veterinary Use
      </div>
      <SiteHeader />

      <main>
        {/* Trust pills */}
        <section className="bg-white border-b border-border">
          <div className="container-x py-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {trustPills.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-sm text-xs font-medium text-navy-deep"
                >
                  <t.icon className="w-4 h-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-bone">
          <div className="container-x grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-20">
            <div className="order-2 md:order-1">
              <div className="inline-block px-3 py-1 bg-navy-deep text-bone text-[10px] font-bold tracking-[0.2em] mb-5">
                FOR LABORATORY RESEARCH USE ONLY
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5 text-navy-deep">
                Laboratory-Grade{" "}
                <span className="italic text-gold">Research Peptides</span>, UK.
              </h1>
              <p className="text-sm md:text-base text-navy-deep/75 max-w-md mb-8 leading-relaxed">
                A UK supplier of laboratory research peptides. HPLC and MS
                verification with Certificate of Analysis available on request.
                For in-vitro laboratory research only, not for human or
                veterinary use.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  to="/shop"
                  className="px-7 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-gold"
                >
                  SHOP ALL <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  to="/about"
                  className="px-7 py-3.5 border border-navy-deep text-navy-deep text-xs font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                >
                  ABOUT US
                </Link>
              </div>
              <div className="flex items-center gap-2 text-xs text-navy-deep/70">
                <ShieldCheck className="w-4 h-4 text-gold" aria-hidden="true" />
                Trusted by researchers nationwide
              </div>
            </div>
            <div className="order-1 md:order-2 flex items-center justify-center">
              <img
                src={heroTrio.url}
                alt="Oxford Research Peptides — BPC-157, Retatrutide and GHK-Cu research vials"
                fetchPriority="high"
                className="w-full max-w-xl h-auto rounded-sm shadow-2xl"
              />
            </div>

          </div>
        </section>

        {/* Best sellers */}
        <section className="bg-white py-16 md:py-20">
          <div className="container-x">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-gold text-[11px] font-bold tracking-[0.25em] mb-2">
                  SHOP
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-navy-deep">
                  Best <span className="italic text-gold">Sellers</span>
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold tracking-widest text-navy-deep hover:text-gold transition-colors"
              >
                VIEW ALL <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {bestSellers.map((p) => (
                <ConceptProductCard key={p.slug} product={p} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-navy-deep hover:text-gold transition-colors"
              >
                VIEW ALL <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Top research peptides */}
        <section className="bg-muted/40 py-16 md:py-20">
          <div className="container-x">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-gold text-[11px] font-bold tracking-[0.25em] mb-2">
                  MOST RESEARCHED
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-navy-deep">
                  Top <span className="italic text-gold">Research Peptides</span>
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold tracking-widest text-navy-deep hover:text-gold transition-colors"
              >
                BROWSE ALL PEPTIDES <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {topResearch.map((p) => (
                <ConceptProductCard key={p.slug} product={p} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-navy-deep hover:text-gold transition-colors"
              >
                BROWSE ALL PEPTIDES <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Customer feedback */}
        <section className="bg-white py-16 md:py-20">
          <div className="container-x">
            <div className="text-center mb-10">
              <div className="text-gold text-[11px] font-bold tracking-[0.25em] mb-2">
                CUSTOMER FEEDBACK
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-navy-deep">
                What <span className="italic text-gold">Researchers Say</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {feedback.map((f) => (
                <div key={f.who} className="bg-bone border border-border p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[11px] font-bold tracking-widest text-navy-deep">
                      {f.who}
                    </div>
                    <div className="flex gap-0.5" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-navy-deep/75 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-bone py-16 md:py-20">
          <div className="container-x max-w-4xl mx-auto text-center">
            <div className="text-gold text-[11px] font-bold tracking-[0.25em] mb-3">
              ABOUT OXFORD RESEARCH PEPTIDES
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-navy-deep mb-4">
              Committed To Precision. Built On <span className="italic text-gold">Trust</span>.
            </h2>
            <p className="text-sm md:text-base text-navy-deep/70 mb-8">
              High quality research peptides supplied with consistency, control and
              uncompromising standards.
            </p>
            <div className="text-left space-y-4 text-sm md:text-base text-navy-deep/80 leading-relaxed">
              <p>
                Oxford Research Peptides supplies{" "}
                <strong className="font-semibold text-navy-deep">
                  laboratory research peptides
                </strong>{" "}
                in the UK, with a focus on identity verification, documented purity and
                reliable dispatch. Every product is intended strictly for in-vitro
                laboratory research by qualified researchers and institutions.
              </p>
              <p>
                Each batch is verified by HPLC and MS; a Certificate of Analysis is
                available on request and independent third-party testing can be supplied.
                Our research catalogue includes retatrutide, tirzepatide, semaglutide,
                BPC-157 and TB-500.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {researchTags.map((t) => (
                <Link
                  key={t.label}
                  to={t.to}
                  className="px-4 py-2 border border-navy-deep/25 text-[10px] font-bold tracking-widest text-navy-deep hover:border-gold hover:text-gold transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Controlled. Verified. Reliable. */}
        <section className="bg-white">
          <div className="grid md:grid-cols-2 items-stretch">
            <img
              src={labStandards}
              alt="Laboratory bench with research peptide vials and glassware"
              loading="lazy"
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="bg-muted/40 px-6 md:px-14 py-12 md:py-20 flex flex-col justify-center">
              <h2 className="font-display text-3xl md:text-4xl text-navy-deep mb-6 leading-tight">
                Controlled. Verified. <span className="italic text-gold">Reliable.</span>
              </h2>
              <ul className="space-y-3">
                {[
                  "Independently batch-tested for purity",
                  "Transparent labelling",
                  "Manufactured to strict standards",
                ].map((l) => (
                  <li key={l} className="flex items-center gap-3 text-sm md:text-base text-navy-deep/80">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <Link
                to="/lab-testing"
                className="mt-8 self-start px-7 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-gold"
              >
                TESTING & QUALITY <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-navy-deep text-bone py-16">
          <div className="container-x text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-3">
              Built For Long-Term <span className="italic text-gold">Reliability</span>
            </h2>
            <p className="text-sm text-bone/70 max-w-xl mx-auto mb-12">
              Oxford Research Peptides is built to be a dependable supplier — focused on
              consistency, professionalism and trust.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.small}>
                  <div className="font-display text-3xl md:text-4xl text-gold mb-1">{s.big}</div>
                  <div className="text-[10px] font-bold tracking-[0.25em] text-bone/70">
                    {s.small}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-bone py-16 md:py-20">
          <div className="container-x max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-gold text-[11px] font-bold tracking-[0.25em] mb-2">
                HELP CENTRE
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-navy-deep">
                Frequently Asked <span className="italic text-gold">Questions</span>
              </h2>
            </div>
            <FaqAccordion />
            <div className="text-center mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-navy-deep text-navy-deep text-xs font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                CONTACT SUPPORT <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick links row */}
        <section className="bg-white border-t border-border">
          <nav aria-label="Quick links" className="container-x py-6">
            <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-[11px] font-bold tracking-[0.2em] text-navy-deep">
              {[
                { l: "SEARCH", to: "/search" },
                { l: "COMPOUNDS", to: "/compounds" },
                { l: "METHODOLOGY", to: "/methodology" },
                { l: "LAB TESTING", to: "/lab-testing" },
              ].map((i) => (
                <li key={i.l}>
                  <Link to={i.to} className="hover:text-gold transition-colors">
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>


      </main>

      <SiteFooter />
    </div>
  );
}
