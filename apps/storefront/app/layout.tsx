import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

const staging = process.env.NEXT_PUBLIC_STAGING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://oxfordresearchpeptides.com"),
  title: { default: "Oxford Research Peptides", template: "%s | Oxford Research Peptides" },
  description: "Evidence-based reference material for research peptides. Independently tested, UK manufactured — strictly for in-vitro laboratory research.",
  robots: staging ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { images: ["/og-image.jpg"], siteName: "Oxford Research Peptides" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Oxford Research Peptides",
    legalName: "Oxford Research Syndicate Ltd",
    url: "https://oxfordresearchpeptides.com",
    email: "info@oxfordresearchpeptides.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "131a Movers Lane",
      addressLocality: "Barking",
      postalCode: "IG11 7UQ",
      addressCountry: "GB",
    },
  };
  return (
    <html lang="en-GB">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <Suspense fallback={null}>
          <SiteChrome>{children}</SiteChrome>
        </Suspense>
      </body>
    </html>
  );
}
