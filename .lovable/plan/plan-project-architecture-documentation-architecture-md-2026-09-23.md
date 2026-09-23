# Plan: Project Architecture Documentation (`architecture.md`)

Create a single `architecture.md` at the project root describing how the whole
Oxford Research Peptides platform is put together. No code changes.

## Content outline

1. **Overview** — what the platform is: a commerce storefront plus an
   educational "knowledge platform" (compound monographs, studies, glossary,
   comparisons) built as one app.

2. **Technology stack**
   - TanStack Start v1 (React 19, SSR), Vite 7, Nitro targeting Cloudflare
     Workers; deployed via Lovable.
   - TypeScript, Tailwind CSS v4 (`src/styles.css`, design tokens), shadcn/ui
     (new-york style) + Radix primitives, TanStack Query for data.
   - Lovable Cloud (Supabase) as the database/auth backend.
   - Shopify as the commerce engine (cart, checkout, orders, discounts).

3. **Application bootstrap & server**
   - `src/router.tsx` (router + QueryClient), `src/routes/__root.tsx` (app
     shell: CartProvider, toaster, cookie banner, newsletter popup, WhatsApp
     button, global scripts), `src/server.ts` (SSR entry with error
     normalization), `src/start.ts` (middleware: error handling +
     Supabase auth attacher), `vite.config.ts`.

4. **Routing model**
   - File-based routing in `src/routes`, `routeTree.gen.ts` auto-generated.
   - Map of route groups: storefront (`/`, `/shop`, `/products/$slug`,
     `/cart`, `/coas`, legal pages), knowledge platform
     (`/research-hub/*`, `/compounds/*`, `/explore/*`), editorial
     (`/editorial/*`), operational (`/dashboard.*`), API endpoints
     (`/api/public/*`).

5. **Knowledge architecture** (the editorial core)
   - `src/lib/taxonomy.ts` as single source of truth (categories, guide
     types, families, mechanisms).
   - Registries: `src/content/*` (clusters, studies, comparisons, glossary),
     `src/lib/knowledge-graph.ts`, `study-graph.ts`, `study-collections.ts`,
     `programmes.ts`, `editorial/*`.
   - `src/lib/knowledge-api.ts` — the unified Knowledge API facade
     (getters, search, traversal) that consumes all registries without
     duplicating data.
   - Layout system: `src/components/knowledge/*` slot-based layouts,
     `src/components/publishing/*` scientific publishing component library.
   - Rule: "add data, not layouts."

6. **Commerce layer**
   - `src/lib/products.ts` product catalogue, `src/lib/cart.tsx` cart state,
     `src/lib/shopify.ts` Shopify Storefront/Admin integration, checkout URL
     flow, upsell logic (BAC water), discount codes, COA registry
     (`src/lib/coa.ts` + `public/coas/`).

7. **Backend & API endpoints**
   - Server functions vs `src/routes/api/public/*` routes.
   - `newsletter-subscribe` (subscriber capture + Shopify discount creation),
     `shopify-order-paid` webhook (HMAC-verified, server-side TikTok Purchase
     events), `recovery-discount`, `shopify-oauth` + callback.
   - Lovable Cloud usage: `newsletter_subscribers` table, generated Supabase
     client modules.

8. **Analytics & tracking**
   - GTM `GTM-TKX4G2TK` (head + noscript), GA4 gtag, TikTok Pixel
     `DAHEEERC77U250DBOKQG` (production-domain gated), `src/lib/tracking.ts`
     dataLayer events shared with TikTok via `src/lib/tiktok.ts` (same
     event_id for dedup), server-side Purchase via webhook.

9. **SEO infrastructure**
   - `src/lib/seo.ts` helper used by every route, breadcrumbs + JSON-LD,
     `sitemap[.]xml.ts`, `robots[.]txt.ts`, noindex policy for scaffolds.

10. **Cross-cutting concerns**
    - Error handling (`error-capture.ts`, `error-page.ts`,
      `lovable-error-reporting.ts`), WhatsApp button, favicon, release-notes
      files as project history.

11. **Directory map** — annotated tree of `src/`.

12. **Data-flow diagrams** (ASCII) — storefront purchase flow and content
    rendering flow.

## Notes
- Single new file: `architecture.md` in the project root. Nothing else changes.
