import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";


const groups = [
  {
    h: "Shop",
    links: [
      { l: "Home", to: "/" },
      { l: "Shop All Peptides", to: "/shop" },
      { l: "Search", to: "/search" },
      { l: "Cart", to: "/cart" },
      { l: "Account", to: "/account" },
    ],
  },
  {
    h: "Company",
    links: [
      { l: "About Us", to: "/about" },
      { l: "Contact Us", to: "/contact" },
      { l: "Wholesale", to: "/wholesale" },
      { l: "FAQs", to: "/faqs" },
    ],
  },
  {
    h: "Research",
    links: [
      { l: "Research Hub", to: "/research-hub" },
      { l: "Lab Testing", to: "/lab-testing" },
    ],
  },
  {
    h: "Legal & Policies",
    links: [
      { l: "Privacy Policy", to: "/privacy-policy" },
      { l: "Terms & Conditions", to: "/terms" },
      { l: "Cookie Policy", to: "/cookie-policy" },
      { l: "Disclaimer", to: "/disclaimer" },
      { l: "Refund Policy", to: "/refund-policy" },
      { l: "Shipping Policy", to: "/shipping-policy" },
      { l: "Cancellation Policy", to: "/cancellation-policy" },
    ],
  },
] as const;

function Page() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Sitemap" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">NAVIGATION</div>
            <h1 className="font-display text-5xl font-medium">Sitemap</h1>
          </div>
        </section>
        <section className="py-12">
          <div className="container-x max-w-4xl grid sm:grid-cols-2 gap-10">
            {groups.map(g => (
              <div key={g.h}>
                <h2 className="text-[11px] font-bold tracking-[0.25em] text-gold mb-4">{g.h.toUpperCase()}</h2>
                <ul className="space-y-2 text-sm">
                  {g.links.map(l => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-navy-deep/80 hover:text-gold focus-visible:text-gold transition-colors">{l.l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/sitemap")({
  head: () =>
    seo({
      path: "/sitemap",
      title: "Sitemap — Oxford Research Peptides",
      description: "Browse all pages on the Oxford Research Peptides website.",
    }),
  component: Page,
});

