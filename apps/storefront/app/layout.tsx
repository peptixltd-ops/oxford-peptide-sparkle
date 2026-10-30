import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";

const staging = process.env.NEXT_PUBLIC_STAGING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://oxfordresearchpeptides.com"),
  title: { default: "Oxford Research Peptides", template: "%s | Oxford Research Peptides" },
  description: "Evidence-based reference material for research peptides. Independently tested, UK manufactured — strictly for in-vitro laboratory research.",
  robots: staging ? { index: false, follow: false } : { index: true, follow: true },
  icons: { icon: "/favicon.png?v=3", apple: "/favicon.png?v=3" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Inter:wght@300;400;500;600;700&display=swap" />
      </head>
      <body>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
