import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/cookie-banner";
import { SkipToContent } from "@/components/skip-to-content";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: "Oxford Research Peptides" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png?v=3" },
      { rel: "apple-touch-icon", href: "/favicon.png?v=3" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
    scripts: [
      // Google Tag Manager (GTM-K8DXDC28 via custom domain)
      {
        children:
          "(function(w,d,s,l,i){\nw[l]=w[l]||[];\nw[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});\nvar f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),\ndl=l!='dataLayer'?'&l='+l:'';\nj.async=true;\nj.src='https://bhs.oxfordresearchpeptides.com/gtm.js?id='+i+dl;\nf.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-K8DXDC28');",
      },
      // Search Atlas / OTTO dynamic optimization pixel
      {
        id: "sa-dynamic-optimization",
        type: "text/javascript",
        src: "https://dashboard.blackhatstrategy.com/scripts/dynamic_optimization.js",
        "data-uuid": "b0670d1d-8d1a-464f-9237-3287f366b553",
        nowprocket: "",
        "nitro-exclude": "",
      },
      { src: "https://www.googletagmanager.com/gtag/js?id=G-VKHQ1KX316", async: true },
      // TikTok Pixel (base code)
      {
        children:
          "!function (w, d, t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=[\"page\",\"track\",\"identify\",\"instances\",\"debug\",\"on\",\"off\",\"once\",\"ready\",\"alias\",\"group\",\"enableCookie\",\"disableCookie\",\"holdConsent\",\"revokeConsent\",\"grantConsent\"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r=\"https://analytics.tiktok.com/i18n/pixel/events.js\",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement(\"script\");n.type=\"text/javascript\",n.async=!0,n.src=r+\"?sdkid=\"+e+\"&lib=\"+t;e=document.getElementsByTagName(\"script\")[0];e.parentNode.insertBefore(n,e)};if(/(^|\\.)oxfordresearchpeptides\\.com$/.test(w.location.hostname)){ttq.load('DB1V0D3C77UA626EFU30');ttq.page();}}(window, document, 'ttq');",
      },
      { children: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-VKHQ1KX316');" },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}#organization`,
          name: "Oxford Research Peptides",
          legalName: "Oxford Research Syndicate Ltd",
          url: SITE_URL,
          logo: DEFAULT_OG_IMAGE,
          email: "info@oxfordresearchpeptides.com",
          taxID: "17207898",
          founder: { "@type": "Organization", name: "Oxford Research Syndicate Ltd" },
          areaServed: "GB",
          knowsAbout: [
            "Research peptides",
            "Peptide chemistry",
            "Peptide reference standards",
            "HPLC purity analysis",
            "Laboratory methodology",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "info@oxfordresearchpeptides.com",
            areaServed: "GB",
            availableLanguage: "en-GB",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "131a Movers Lane",
            addressLocality: "Barking",
            addressRegion: "Essex",
            postalCode: "IG11 7UQ",
            addressCountry: "GB",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          name: "Oxford Research Peptides",
          url: SITE_URL,
          publisher: { "@id": `${SITE_URL}#organization` },
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — must be immediately after opening <body> */}
        <noscript>
          <iframe
            src="https://bhs.oxfordresearchpeptides.com/ns.html?id=GTM-K8DXDC28"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/447457404317?text=Hi%20there%2C%20I%20have%20a%20question%20about%20your%20products.%20Can%20you%20assist%20me%20please%3F"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg transition-transform hover:scale-105 hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-9.763A8.967 8.967 0 0 0 12 3c-4.97 0-9 4.03-9 9 0 1.58.415 3.096 1.19 4.42l-1.26 3.66 3.75-.99A8.957 8.957 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m0 16.5a7.46 7.46 0 0 1-3.823-1.054l-.273-.153-2.78.733.745-2.71-.174-.29A7.463 7.463 0 0 1 4.5 12c0-4.136 3.364-7.5 7.5-7.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5" />
      </svg>
    </a>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SkipToContent />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster />
        <CookieBanner />
        <NewsletterPopup />
        <WhatsAppButton />
      </CartProvider>
    </QueryClientProvider>
  );
}
