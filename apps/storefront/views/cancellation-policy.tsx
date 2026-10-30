"use client";
import { createFileRoute, Link } from "@/shims/router";
import { LegalPage, P } from "@/components/legal-page";
import { seo } from "@/lib/seo";

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
        For urgent cancellation requests, email <a className="text-gold" href="mailto:info@oxfordresearchpeptides.com">info@oxfordresearchpeptides.com</a> with your order number as soon as possible.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/cancellation-policy")({
  head: () => seo({ path: "/cancellation-policy", title: 'Cancellation Policy — Oxford Research Peptides', description: 'Order cancellation information — please refer to our FAQ for full details.' }),
  component: Page,
});
