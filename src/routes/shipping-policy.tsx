import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, P } from "@/components/legal-page";

function Page() {
  return (
    <LegalPage eyebrow="POLICIES" title="Shipping Policy" updated="January 2026">
      <P>
        Please refer to our Frequently Asked Questions (FAQ) page for complete shipping and
        delivery information, including dispatch times, tracking, courier partners and
        availability.
      </P>
      <div className="pt-2">
        <Link to="/faqs" className="inline-block px-8 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
          VIEW FAQs
        </Link>
      </div>
      <P>
        Need help with a specific order? Email <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com">oxfordresearchpeptides@gmail.com</a> with your order number.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — Oxford Research Peptides" },
      { name: "description", content: "Shipping and delivery information — please refer to our FAQ for full details." },
      { property: "og:url", content: "https://oxfordresearchpeptides.com/shipping-policy" },
    ],
    links: [{ rel: "canonical", href: "https://oxfordresearchpeptides.com/shipping-policy" }],
  }),
  component: Page,
});
