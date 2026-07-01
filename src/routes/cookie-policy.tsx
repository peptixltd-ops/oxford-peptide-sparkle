import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="LEGAL" title="Cookie Policy" updated="January 2026">
      <H2>What are cookies?</H2>
      <P>
        Cookies are small text files placed on your device when you visit a website. They are widely
        used to make websites work, improve performance and provide information to site owners.
      </P>

      <H2>Essential cookies</H2>
      <P>
        Required for the website to function — for example, remembering items in your cart,
        maintaining your session and processing checkout. These cookies cannot be disabled.
      </P>

      <H2>Functional cookies</H2>
      <P>
        Remember preferences such as language, region and display options to personalise your
        experience.
      </P>

      <H2>Analytics cookies</H2>
      <P>
        Help us understand how visitors interact with the website so we can improve it. We use
        Google Analytics, which sets cookies to collect aggregated, anonymous usage data.
      </P>

      <H2>Marketing cookies</H2>
      <P>
        Used to deliver advertising that is more relevant to you, measure campaign performance and
        limit the number of times you see an advertisement.
      </P>

      <H2>Managing your cookie preferences</H2>
      <P>
        You can accept or reject non-essential cookies via the cookie banner that appears on your
        first visit. You can also control cookies through your browser settings. Disabling cookies
        may affect site functionality.
      </P>

      <H2>Third-party cookies</H2>
      <UL>
        <li>Google Analytics — website usage measurement.</li>
        <li>Payment providers — secure checkout.</li>
        <li>Embedded content from social platforms (where applicable).</li>
      </UL>

      <H2>Cookie duration</H2>
      <P>
        Session cookies expire when you close your browser. Persistent cookies remain on your device
        for the period specified by the cookie, typically up to 24 months.
      </P>

      <H2>Cookie consent banner wording</H2>
      <P>
        "We use cookies to operate this site, measure performance and provide a better experience.
        You can accept all cookies, reject non-essential cookies, or manage your preferences at any
        time."
      </P>

      <H2>Contact</H2>
      <P>
        For questions about cookies email <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com">oxfordresearchpeptides@gmail.com</a>.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/cookie-policy")({
  head: () => seo({ path: "/cookie-policy", title: 'Cookie Policy — Oxford Research Peptides', description: 'How Oxford Research Peptides uses cookies and how to manage your preferences.' }),
  component: Page,
});
