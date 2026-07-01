import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, H2, P } from "@/components/legal-page";
import { seo } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="LEGAL" title="Disclaimer" updated="January 2026">
      <H2>General information</H2>
      <P>
        The information provided on this website is for general informational purposes only. While
        we endeavour to keep content accurate and up to date, we make no representations or
        warranties of any kind, express or implied, about the completeness, accuracy, reliability
        or suitability of the information.
      </P>

      <H2>Research products</H2>
      <P>
        All peptide products sold through this website are supplied strictly for laboratory and
        scientific research purposes only. They are <strong>not</strong> intended for human
        consumption, veterinary use, therapeutic use, diagnostic use, cosmetic use, food use, or any
        other unauthorised application. Purchasers are responsible for ensuring products are
        handled only by suitably qualified professionals and in accordance with all applicable
        laws and regulations.
      </P>

      <H2>No medical advice</H2>
      <P>
        Nothing contained on this website should be interpreted as medical advice, healthcare
        advice or treatment recommendations. Always consult a qualified healthcare professional for
        any medical concerns.
      </P>

      <H2>No guarantees</H2>
      <P>
        While every effort is made to ensure accuracy, Oxford Research Syndicate Ltd makes no
        warranties regarding the completeness, reliability or accuracy of website content,
        including product specifications, third-party data or external links.
      </P>

      <H2>Limitation of liability</H2>
      <P>
        Oxford Research Syndicate Ltd shall not be liable for any misuse of products purchased
        through this website, nor for any direct, indirect, incidental or consequential loss
        arising from reliance on website content or use of any product.
      </P>

      <H2>Customer responsibility</H2>
      <P>
        Customers are responsible for ensuring compliance with all local laws and regulations
        applicable in their jurisdiction before placing an order. By purchasing, you confirm that
        you are a qualified researcher or laboratory professional and that the products will be
        used solely for in-vitro research purposes.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/disclaimer")({
  head: () => seo({ path: "/disclaimer", title: 'Disclaimer — Oxford Research Peptides', description: 'Research-use-only disclaimer and limitation of liability for Oxford Research Peptides.' }),
  component: Page,
});
