import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, P } from "@/components/legal-page";

function Page() {
  return (
    <LegalPage eyebrow="POLICIES" title="Cancellation Policy" updated="January 2026">
      <P>
        Please refer to our Frequently Asked Questions (FAQ) page for complete cancellation
        information, including timeframes and how to request a cancellation.
      </P>
      <div className="pt-2">
        <Link to="/faqs" className="inline-block px-8 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
          VIEW FAQs
        </Link>
      </div>
      <P>
        For urgent cancellation requests, email <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com">oxfordresearchpeptides@gmail.com</a> with your order number as soon as possible.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation Policy — Oxford Research Peptides" },
      { name: "description", content: "Order cancellation information — please refer to our FAQ for full details." },
      { property: "og:url", content: "https://oxfordresearchpeptides.com/cancellation-policy" },
    ],
    links: [{ rel: "canonical", href: "https://oxfordresearchpeptides.com/cancellation-policy" }],
  }),
  component: Page,
});
