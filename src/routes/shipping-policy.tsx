import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, P } from "@/components/legal-page";
import { seo } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="POLICIES" title="Shipping Policy" updated="January 2026">
      <P>
        UK delivery is free on orders of £12 or more. Under £12, Express delivery is £3.99
        and Standard delivery is £5.99. International delivery is a flat £15 regardless of
        order value, excluding Russia and Belarus.
      </P>
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
        Need help with a specific order? Email <a className="text-gold" href="mailto:info@oxfordresearchpeptides.com">info@oxfordresearchpeptides.com</a> with your order number.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/shipping-policy")({
  head: () => seo({ path: "/shipping-policy", title: 'Shipping Policy — Oxford Research Peptides', description: 'Research-only orders: UK delivery free from £12; under £12 Express £3.99 / Standard £5.99. International flat £15, excluding Russia and Belarus.' }),
  component: Page,
});
