import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";

function Page() {
  return (
    <LegalPage eyebrow="LEGAL" title="Privacy Policy" updated="January 2026">
      <P>
        This Privacy Policy explains how Oxford Research Syndicate Ltd ("we", "us", "our") collects,
        uses and protects personal information when you visit oxfordresearchpeptides.com or purchase
        from us. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data
        Protection Act 2018. This brand is owned and operated by Oxford Research Syndicate Ltd.
      </P>

      <H2>1. Information we collect</H2>
      <UL>
        <li>Identity and contact details (name, email, phone, billing and shipping address).</li>
        <li>Order and transaction details (products purchased, order value, dates).</li>
        <li>Payment confirmation data (we do not store full card details — see section 6).</li>
        <li>Account credentials, where you create an account.</li>
        <li>Technical data (IP address, browser type, device, pages visited, referring URL).</li>
        <li>Marketing preferences and communications history.</li>
      </UL>

      <H2>2. How information is collected</H2>
      <UL>
        <li>Directly from you when you place an order, create an account or contact us.</li>
        <li>Automatically through cookies and similar technologies — see our Cookie Policy.</li>
        <li>From third parties such as payment processors and shipping carriers.</li>
      </UL>

      <H2>3. How we use your information</H2>
      <UL>
        <li>To process and deliver your orders and provide customer support.</li>
        <li>To manage your account and authenticate you.</li>
        <li>To send transactional emails (order confirmations, dispatch notices).</li>
        <li>To send marketing communications where you have opted in.</li>
        <li>To prevent fraud and meet our legal and accounting obligations.</li>
        <li>To improve our website, products and services.</li>
      </UL>

      <H2>4. Cookies</H2>
      <P>
        We use cookies to operate the website, remember preferences and measure traffic. Full details
        and your choices are set out in our Cookie Policy.
      </P>

      <H2>5. Marketing communications</H2>
      <P>
        We only send marketing emails where you have given consent. You can withdraw consent at any
        time by clicking "unsubscribe" in any marketing email or by contacting us.
      </P>

      <H2>6. Payment information</H2>
      <P>
        Payments are processed by PCI-DSS compliant payment providers. We do not store full card
        numbers or CVV codes on our servers. Limited transaction metadata is retained for fraud
        prevention and accounting.
      </P>

      <H2>7. Data retention</H2>
      <P>
        We retain personal data only for as long as is necessary for the purposes for which it was
        collected, including legal, accounting and reporting requirements. Order records are
        typically retained for six years to satisfy UK tax law.
      </P>

      <H2>8. Third-party service providers</H2>
      <P>
        We share data with carefully selected processors who help us operate the business, including
        payment processors, shipping carriers, email service providers, hosting and analytics
        providers. They are contractually bound to protect your data and use it only on our
        instructions.
      </P>

      <H2>9. Your rights under UK GDPR</H2>
      <UL>
        <li>Right of access to your personal data.</li>
        <li>Right to rectification of inaccurate data.</li>
        <li>Right to erasure ("right to be forgotten") in certain circumstances.</li>
        <li>Right to restrict or object to processing.</li>
        <li>Right to data portability.</li>
        <li>Right to withdraw consent.</li>
        <li>Right to lodge a complaint with the Information Commissioner's Office (ico.org.uk).</li>
      </UL>

      <H2>10. Security</H2>
      <P>
        We use appropriate technical and organisational measures to protect personal data, including
        encryption in transit (HTTPS), access controls and secure hosting.
      </P>

      <H2>11. Privacy enquiries</H2>
      <P>
        For any privacy enquiry, please email <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com">oxfordresearchpeptides@gmail.com</a> or write to us at the registered office address below.
      </P>

      <H2>12. Policy updates</H2>
      <P>
        We may update this Privacy Policy from time to time. The "last updated" date at the top of
        this page reflects the most recent changes.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Oxford Research Peptides" },
      { name: "description", content: "UK GDPR compliant Privacy Policy for Oxford Research Peptides, owned and operated by Oxford Research Syndicate Ltd." },
      { property: "og:title", content: "Privacy Policy — Oxford Research Peptides" },
      { property: "og:url", content: "https://oxfordresearchpeptides.com/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://oxfordresearchpeptides.com/privacy-policy" }],
  }),
  component: Page,
});
