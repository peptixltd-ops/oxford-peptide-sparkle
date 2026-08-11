import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type QA = { q: string; a: string };
type Category = { id: string; label: string; items: QA[] };

const categories: Category[] = [
  {
    id: "orders",
    label: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Orders placed before 2pm are shipped the same working day via tracked next-day courier within the UK." },
      { q: "When are orders dispatched?", a: "Monday to Friday, excluding UK bank holidays." },
      { q: "Will I receive tracking?", a: "Yes — every order is sent with Royal Mail or DPD tracking and you'll receive the tracking number by email as soon as the parcel is collected." },
      { q: "What if my order hasn't arrived?", a: "Get in touch with our team within 14 days of dispatch and we'll resolve it the same working day." },
      { q: "Do you ship internationally?", a: "At the moment we ship within the UK only. International shipping is on our roadmap — sign up to our newsletter to be notified when it goes live." },
      { q: "What if my product arrives damaged?", a: "Email us your order number, a clear photo of the damage and a short description of the issue. We'll arrange a replacement as quickly as possible." },
      { q: "Can I place a bulk order?", a: "Yes. We offer bulk pricing for researchers, clinics and laboratories. Send us the products and quantities you need and we'll come back to you with pricing and lead times." },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    items: [
      { q: "Which payment methods do you accept?", a: "We accept all major credit and debit cards, Apple Pay and Google Pay at checkout." },
      { q: "Is checkout secure?", a: "All transactions are PCI-compliant and processed with end-to-end encryption. Card details are never stored on our servers." },
      { q: "Do you offer subscriptions?", a: "Yes — save 10% on recurring monthly deliveries. You can pause, edit or cancel from your account at any time." },
    ],
  },
  {
    id: "quality",
    label: "Product & Quality",
    items: [
      { q: "Do you provide a Certificate of Analysis (CoA)?", a: "Yes. Every batch ships with an in-house CoA showing HPLC purity and identity confirmation. Batch-specific CoAs are also available on each product page." },
      { q: "What is the difference between peptide purity and peptide yield?", a: "Purity is the proportion of the target peptide compared to all related species, measured by HPLC — a purity of 98% means 98% is the correct sequence and 2% are related impurities. This is the main quality metric. Yield is the total mass recovered from a synthesis run after purification — a manufacturing figure, not a quality indicator. We specify our products by purity, not yield, and yield figures are not published." },
      { q: "Why does a 5mg vial appear nearly empty? Can it be verified by weight?", a: "This is completely normal. 5mg is a tiny amount of material — roughly a few grains of fine salt — and in a standard 2ml or 3ml vial it will look like a thin film, a small disc, or barely-visible powder at the bottom. Weighing the vial isn't a reliable check: lab balance tolerances often exceed the peptide mass at this scale, the glass, stopper, crimp seal and residual moisture dwarf the peptide weight, and tare weights vary vial-to-vial even within the same batch. The proper way to verify content is analytical testing (HPLC or mass spectrometry) — see the CoA on each product page. If you have a concern about a specific vial, send us the order reference and photos and we'll look into it." },
      { q: "Why does my vial appear different or lack a vacuum seal?", a: "Minor cosmetic differences between vials are normal and don't indicate a quality issue. The freeze-dried cake can range from a compact disc to a looser powder, and cap colours sometimes differ between batches. Not every vial is sealed under vacuum — some are nitrogen-flushed instead, depending on the manufacturer and the peptide. Vacuum or no vacuum, quality and purity are unaffected provided the vial has been stored correctly (sealed, refrigerated, away from light). If something looks wrong — a broken seal or visible contamination — send us photos and we'll investigate." },
      { q: "What vial sizes are available?", a: "Vial sizes and peptide quantities vary by product and are listed on each product page. Common sizes are 2mg, 5mg, 10mg and 15mg, with some products available in larger quantities. All vials are laboratory-grade borosilicate glass with crimped aluminium seals and rubber stoppers. If you need a quantity that isn't listed, let us know." },
      { q: "How should peptides be handled and stored?", a: "Proper handling keeps peptides in good condition. Temperature: store freeze-dried peptides at 2–8°C (fridge) for short-term use, or -20°C (freezer) for long-term storage. Light: keep away from direct light — UV can degrade tryptophan and tyrosine residues in particular. Moisture: keep vials sealed until use, as freeze-dried peptides absorb moisture from the air, accelerating degradation. Handling: let refrigerated or frozen vials reach room temperature before opening to prevent condensation forming inside. After reconstitution: aliquot into single-use volumes where possible and store frozen, avoiding repeated freeze-thaw cycles. Treat all products as research chemicals in line with your institutional safety guidelines. MSDS sheets are available on request." },
      { q: "Where are your products made?", a: "Synthesised in audited UK facilities to strict quality and research standards, and independently tested by a third-party laboratory before release." },
    ],
  },
  {
    id: "compliance",
    label: "Compliance",
    items: [
      { q: "Are your products legal in the UK?", a: "Yes — all products are supplied strictly as reference compounds for in-vitro laboratory research and are not classified as medicines. They are not for human or animal consumption." },
      { q: "Do you make medical claims?", a: "No. Our products are research compounds and are not intended to diagnose, treat, cure or prevent any disease." },
    ],
  },
  {
    id: "support",
    label: "Support",
    items: [
      { q: "How do I contact you?", a: "Email info@oxfordresearchpeptides.com and a member of the team will get back to you within one working day." },
      { q: "Do you accept returns?", a: "Due to the nature of our products we are unable to accept returns. We will, however, resolve any issue with your order promptly." },
      { q: "Do you issue refunds?", a: "Refunds are handled on a case-by-case basis by our customer service team. When requesting a refund, please include your order number, a description of the issue and any supporting photos." },
    ],
  },
];

const allItems: QA[] = categories.flatMap((c) => c.items);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allItems.map((qa) => ({
    "@type": "Question",
    name: qa.q,
    acceptedAnswer: { "@type": "Answer", text: qa.a },
  })),
};

function FaqsPage() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "FAQs" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">HELP CENTRE</div>
            <h1 className="font-display text-5xl font-medium">Frequently Asked Questions</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container-x max-w-4xl">
            <div className="flex flex-wrap gap-2 border-b border-navy-deep/15 mb-8" role="tablist" aria-label="FAQ categories">
              {categories.map((c) => {
                const isActive = c.id === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(c.id)}
                    className={`px-4 py-3 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors border-b-2 -mb-px focus-visible:outline-2 focus-visible:outline-gold ${
                      isActive
                        ? "text-gold border-gold"
                        : "text-navy-deep/60 border-transparent hover:text-navy-deep"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            <Accordion type="single" collapsible className="w-full">
              {current.items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-navy-deep/15">
                  <AccordionTrigger className="text-left text-base font-medium text-navy-deep py-5 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-navy-deep/75 text-[15px] leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 p-6 border border-navy-deep/15 bg-white">
              <h2 className="font-display text-2xl font-medium mb-2">Still have a question?</h2>
              <p className="text-navy-deep/75 mb-4">
                Email our team and we'll get back to you within one working day.
              </p>
              <a
                href="mailto:info@oxfordresearchpeptides.com"
                className="inline-block px-6 py-3 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/faqs")({
  head: () => {
    const base = seo({
      path: "/faqs",
      title: "FAQs — Oxford Research Peptides",
      description:
        "Answers to common questions about Oxford Research Peptides — orders, shipping, payments, product quality, compliance and support.",
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      ],
    };
  },
  component: FaqsPage,
});
