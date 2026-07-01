import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="LEGAL" title="Terms & Conditions" updated="January 2026">
      <H2>1. Acceptance of terms</H2>
      <P>
        By accessing or using oxfordresearchpeptides.com (the "Website") or placing an order, you
        agree to be bound by these Terms & Conditions. If you do not accept them, please do not use
        the Website.
      </P>

      <H2>2. Company details</H2>
      <P>
        The Website is owned and operated by <strong>Oxford Research Syndicate Ltd</strong>, a
        company registered in England & Wales (Company Registration Number 17207898). Registered
        office: 131a Movers Lane, Barking, Essex, IG11 7UQ, United Kingdom.
      </P>

      <H2>3. Website use</H2>
      <P>
        You agree to use the Website lawfully and not to interfere with its operation, attempt to
        gain unauthorised access, or use it for any unlawful purpose.
      </P>

      <H2>4. Orders</H2>
      <P>
        An order placed through the Website is an offer to purchase. A contract is formed only once
        we issue a dispatch confirmation. We reserve the right to refuse or cancel any order at our
        discretion, including where stock is unavailable, pricing is incorrect, or the order does
        not meet our compliance requirements.
      </P>

      <H2>5. Pricing</H2>
      <P>
        Prices are displayed in GBP and are correct at the time of publication. We reserve the right
        to change prices at any time without notice. Promotional pricing applies only while
        advertised.
      </P>

      <H2>6. Payments</H2>
      <P>
        Payment is required in full at the time of order via the payment methods displayed at
        checkout. All transactions are processed through secure third-party providers.
      </P>

      <H2>7. Availability</H2>
      <P>
        All orders are subject to stock availability. Where an item becomes unavailable after order
        placement we will contact you to arrange a replacement, partial dispatch or refund.
      </P>

      <H2>8. Intellectual property</H2>
      <P>
        All content on the Website — including text, images, logos, branding, product photography
        and design — is the property of Oxford Research Syndicate Ltd or its licensors and is
        protected by UK and international copyright laws. You may not reproduce, distribute or
        modify any content without prior written consent.
      </P>

      <H2>9. Product descriptions</H2>
      <P>
        We take reasonable care to ensure product descriptions, specifications and images are
        accurate. Minor variations may occur, and we do not warrant that descriptions are entirely
        free from error.
      </P>

      <H2>10. Limitation of liability</H2>
      <P>
        To the maximum extent permitted by law, Oxford Research Syndicate Ltd shall not be liable
        for any indirect, incidental, consequential or special damages arising from use of the
        Website or any product purchased through it. Our total liability shall not exceed the
        amount paid for the relevant order. Nothing in these terms limits liability for death or
        personal injury caused by negligence, or for fraud.
      </P>

      <H2>11. User conduct</H2>
      <UL>
        <li>You must not misuse the Website or its content.</li>
        <li>You must not submit false information or impersonate any person.</li>
        <li>You must comply with all applicable laws and regulations in your jurisdiction.</li>
      </UL>

      <H2>12. Governing law</H2>
      <P>
        These Terms are governed by the laws of England & Wales and any dispute is subject to the
        exclusive jurisdiction of the courts of England & Wales.
      </P>

      <H2>13. Force majeure</H2>
      <P>
        We shall not be liable for any failure or delay in performance caused by events outside our
        reasonable control, including but not limited to strikes, supply-chain disruption, natural
        disasters, pandemics, or actions of public authorities.
      </P>

      <H2>14. Contact</H2>
      <P>
        Questions about these Terms should be sent to <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com">oxfordresearchpeptides@gmail.com</a>.
      </P>

      <H2>15. Changes to these terms</H2>
      <P>
        We may revise these Terms from time to time. The current version will always be posted on
        this page with an updated date.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/terms")({
  head: () => seo({ path: "/terms", title: 'Terms & Conditions — Oxford Research Peptides', description: 'Terms & Conditions for purchases made through Oxford Research Peptides, operated by Oxford Research Syndicate Ltd.' }),
  component: Page,
});
