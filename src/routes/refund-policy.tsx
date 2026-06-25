import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, P } from "@/components/legal-page";

function makePolicy(kind: "refund" | "shipping" | "cancellation") {
  const map = {
    refund: { title: "Refund Policy", topic: "refunds and returns" },
    shipping: { title: "Shipping Policy", topic: "shipping and delivery" },
    cancellation: { title: "Cancellation Policy", topic: "cancellations" },
  } as const;
  const { title, topic } = map[kind];
  return function PolicyPage() {
    return (
      <LegalPage eyebrow="POLICIES" title={title} updated="January 2026">
        <P>
          Please refer to our Frequently Asked Questions (FAQ) page for complete information
          regarding {topic}. Our FAQ covers dispatch timelines, tracking, damaged or missing items,
          refunds, and how to contact our support team.
        </P>
        <div className="pt-2">
          <Link
            to="/faqs"
            className="inline-block px-8 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors"
          >
            VIEW FAQs
          </Link>
        </div>
        <P>
          If your question isn't answered in the FAQ, email <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com">oxfordresearchpeptides@gmail.com</a> and our team will reply within one working day.
        </P>
      </LegalPage>
    );
  };
}

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Oxford Research Peptides" },
      { name: "description", content: "Refund and returns information — please refer to our FAQ for full details." },
      { property: "og:url", content: "https://oxfordresearchpeptides.com/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "https://oxfordresearchpeptides.com/refund-policy" }],
  }),
  component: makePolicy("refund"),
});
