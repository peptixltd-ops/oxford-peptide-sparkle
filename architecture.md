# Oxford Research Peptides — Project Architecture

This document describes how the whole platform is put together: the runtime
stack, the app bootstrap, routing, the knowledge (educational) architecture,
the commerce layer, backend endpoints, analytics, and SEO infrastructure.

---

## 1. Overview

Oxford Research Peptides is a single web application that combines two
products:

1. **A commerce storefront** — product catalogue, cart, upsells, discounts,
   and checkout (delegated to Shopify on a separate domain).
2. **An educational "knowledge platform"** — compound monographs, research
   guides, study summaries, comparisons, glossary, and editorial profiles,
   organised as a large interlinked content graph.

Both are served from one codebase. The guiding editorial rule is
**"add data, not layouts"**: new content extends typed registries; layout
components consume those registries and never hardcode content.

---

## 2. Technology stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start v1 (React 19, SSR), file-based routing |
| Build | Vite 7 + Nitro, targeting Cloudflare Workers (serverless edge) |
| Language | TypeScript (strict), `tsgo` for typechecks |
| Styling | Tailwind CSS v4 via `src/styles.css` (CSS-first config, design tokens), shadcn/ui (new-york) on Radix primitives, `lucide-react` icons |
| Client data | TanStack Query v5 |
| Backend / DB | Lovable Cloud (managed Supabase) — database, auth session plumbing |
| Commerce | Shopify (Storefront + Admin APIs), checkout on `checkout.oxfordresearchsyndicate.com` |
| Hosting | Lovable (preview + published), custom domain `oxfordresearchpeptides.com` |

Key entry config: `vite.config.ts` delegates to
`@lovable.dev/vite-tanstack-config` and points the server entry at
`src/server.ts`.

---

## 3. Application bootstrap & server

- **`src/router.tsx`** — creates the TanStack Router with the generated
  route tree and a `QueryClient` in router context.
- **`src/routes/__root.tsx`** — the app shell wrapping every page:
  - Providers: `CartProvider`, `QueryClientProvider`, `<Toaster />` (sonner).
  - Global UI: cookie banner, newsletter popup, skip-to-content link, fixed
    WhatsApp contact button (bottom-right), favicon links.
  - Global scripts in `head()`: Google Tag Manager (`GTM-TKX4G2TK`), GA4
    gtag, TikTok Pixel base code (gated to the production hostname), and a
    third-party SEO pixel. The GTM `<noscript>` iframe sits right after
    `<body>`.
  - Root `ErrorComponent` (reports errors, offers retry) and a custom 404.
- **`src/server.ts`** — the SSR entry point. Wraps the TanStack server
  handler; catches catastrophic SSR errors (including h3-swallowed 500s) and
  renders a static error page via `src/lib/error-page.ts`.
- **`src/start.ts`** — registers middleware: a request-level error
  middleware and `attachSupabaseAuth` function middleware, which attaches
  the user's bearer token to server-function calls.

---

## 4. Routing model

File-based routing in `src/routes`; `src/routeTree.gen.ts` is generated —
never edited by hand.

| Group | Routes | Purpose |
| --- | --- | --- |
| Storefront | `/`, `/shop`, `/products/$slug`, `/cart`, `/coas`, `/wholesale`, `/contact`, `/about`, `/lab-testing`, `/faqs` | Shopping, product detail, cart, certificates of analysis |
| Legal / policy | `/terms`, `/privacy-policy`, `/refund-policy`, `/shipping-policy`, `/cookie-policy`, `/disclaimer`, `/research-use-only`, `/corrections-policy`, `/editorial-policy`, `/editorial-standards`, `/funding-and-conflicts`, `/cancellation-policy`, `/publication-workflow`, `/methodology`, `/scientific-advisory-board` | Trust, compliance, editorial transparency |
| Knowledge platform | `/research-hub` + children (`guides`, `mechanisms`, `methodology`, `literature`, `comparisons`, `glossary`, `faqs`, `collections`, `programmes`), `/compounds` + `/compounds/$slug`, `/explore/*` | Educational content, category landings and `$slug` detail pages |
| Editorial | `/editorial/authors/$id`, `/editorial/reviewers/$id` | Author / reviewer transparency profiles |
| Operational | `/dashboard.editorial`, `/dashboard.abandoned-checkout`, `/search`, `/sitemap`, `/account`, `/concept` | Internal tooling and utilities |
| API | `/api/public/newsletter-subscribe`, `/api/public/shopify-order-paid`, `/api/public/recovery-discount`, `/api/public/shopify-oauth(.callback)` | Public HTTP endpoints (webhooks, signup) — see §7 |
| SEO | `/sitemap.xml`, `/robots.txt` | Generated via server routes |

Layout routes (`research-hub.tsx`, `compounds.tsx`) render only `<Outlet />`;
all chrome lives in leaf components so each leaf owns its SEO metadata.

---

## 5. Knowledge architecture (the editorial core)

### Single source of truth

**`src/lib/taxonomy.ts`** (~1,600 lines) declares the entire educational
hierarchy: eight top-level research categories, guide types, compound
families, mechanism groups, research areas, reading pathways, and the
`populated` flags that drive `noindex` and "SOON" badges. Every navigation
surface, sidebar, breadcrumb and related-content component reads from it.

### Registries (data, not layouts)

| Registry | File |
| --- | --- |
| Compound & guide registry | `src/content/registry.ts` |
| Topic clusters (Semaglutide, Tirzepatide, Retatrutide, BPC-157, + AI variants) | `src/content/*-cluster*.tsx` |
| Study summaries | `src/content/studies-content.tsx`, `src/content/programme1-studies.tsx` |
| Comparisons | `src/content/comparisons-content.tsx` |
| Glossary | `src/content/glossary-content.tsx` |
| Knowledge graph edges | `src/lib/knowledge-graph.ts` |
| Study citation graph | `src/lib/study-graph.ts` |
| Study collections | `src/lib/study-collections.ts` |
| Programmes | `src/lib/programmes.ts` |
| Authors / reviewers / citations / policies / revisions | `src/lib/editorial/*` |
| Topic clusters / explorer helpers | `src/lib/topic-clusters.ts`, `src/lib/knowledge-explorer.ts` |

### Unified Knowledge API

**`src/lib/knowledge-api.ts`** is a strongly-typed facade over every
registry. It exposes getters (`getCompound`, `getGuide`, `getStudy`,
`getGlossary`, `getComparison`, `getFigure`, `getProgramme`, `getAuthor`,
…), plus `searchKnowledge`, `getRelatedKnowledge`, `listEntities` and
`knowledgeStats`. Every getter returns one unified shape —
`identity / summary / editorial / graph / relationships / references / raw`
— so any entity can be rendered through a shared pattern. No data is
duplicated; everything is derived from the registries, and nothing imports
back from the API (no cycles).

### Layout & component system

- **`src/components/knowledge/*`** — slot-based layouts (`GuideLayout`,
  `CompoundLayout`, `CategoryLanding`, `PlaceholderKnowledgePage`) and
  navigation components (`KnowledgeNav`, `ResearchSidebar`,
  `ReadingPathway`, `Related*`, `ContinueReading`, breadcrumbs). Layouts
  consume slots; navigation components consume the taxonomy.
- **`src/components/publishing/*`** — the scientific publishing library:
  primitives, evidence blocks, callouts, references, figures, editorial
  bylines, evidence matrices, AI-readability, and 24 reusable SVG research
  figures (`research-figures.tsx`). All brand-token driven (navy / gold /
  bone).

---

## 6. Commerce layer

- **`src/lib/products.ts`** — the product catalogue (19 products, 36
  variants): slugs, names, prices, sizes, imagery, technical data. This is
  the storefront's source of truth, kept in sync with Shopify.
- **`src/lib/cart.tsx`** — `CartProvider` + cart state (line items,
  quantities), rendered by `cart-drawer.tsx` (portaled to `document.body`,
  high z-index) and `/cart`.
- **`src/lib/shopify.ts`** — Shopify integration: Storefront cart/checkout
  URL creation, Admin API helpers (discount codes, newsletter logic),
  attribution passthrough (`ttclid`, `_ttp` appended to checkout URLs), and
  the adaptive store-credit logic.
- **Upsells** — `bac-water-upsell.tsx` (in-cart offer with a 15-minute
  countdown, fixed-£ discount code) and `bac-water-buy-now-dialog.tsx`
  (intercepts Buy Now before redirecting to Shopify checkout).
- **COAs** — `src/lib/coa.ts` registry + batch-report images in
  `public/coas/`, rendered by `coa-card.tsx` on `/coas`.

Checkout itself happens on Shopify's domain; the site hands off via
checkout URLs (opened synchronously to avoid popup blockers).

---

## 7. Backend & API endpoints

Two server-side patterns:

1. **Server functions** (`createServerFn` from `@tanstack/react-start`) for
   app-internal typed RPC, with `attachSupabaseAuth` middleware for
   authenticated calls.
2. **Server routes** under `src/routes/api/public/*` for raw HTTP from
   external callers (this prefix bypasses site auth, so each handler
   verifies the caller itself).

| Endpoint | Purpose |
| --- | --- |
| `api/public/newsletter-subscribe` | Stores the subscriber in Lovable Cloud, creates a unique Shopify discount code (fallback `OXFORD20`), rate-limited |
| `api/public/shopify-order-paid` | Shopify `orders/paid` webhook. Verifies `x-shopify-hmac-sha256` with `SHOPIFY_WEBHOOK_SECRET`, then sends a **server-side TikTok `Purchase`** event: hashed email/phone (SHA-256), real order total/currency, line items, `ttclid`, stable `purchase_{order.id}` event_id for dedup |
| `api/public/recovery-discount` | Abandoned-checkout recovery discounts |
| `api/public/shopify-oauth` + `.callback` | Shopify app OAuth handshake |

**Lovable Cloud** holds the `newsletter_subscribers` table and auth session
plumbing. Client code uses the generated client at
`@/integrations/supabase/client`; server-side privileged work uses the
generated server client. Secrets (Shopify tokens, webhook secret, TikTok
Events API token) live in encrypted env vars, read inside handlers.

---

## 8. Analytics & tracking

- **Google Tag Manager `GTM-TKX4G2TK`** — installed globally (head script +
  body noscript) in `__root.tsx`; the only GTM container.
- **GA4** — gtag `G-VKHQ1KX316`, loaded globally.
- **`src/lib/tracking.ts`** — pushes ecommerce events to the GTM dataLayer:
  `view_item_stape`, `add_to_cart_stape`, `remove_from_cart_stape`,
  `view_cart_stape`, `begin_checkout_stape` (consumed by GA4/Meta via GTM
  and the server-side Stape container).
- **TikTok Pixel `DAHEEERC77U250DBOKQG`** — base snippet gated to the
  production hostname so preview/staging traffic never reaches the pixel.
  **`src/lib/tiktok.ts`** fires `ViewContent`, `AddToCart` and
  `InitiateCheckout` via the named instance, sharing the **same event_id**
  as the matching dataLayer push for dedup. `Purchase` is server-side only
  via the order webhook (§7). `ttclid` and `_ttp` are persisted and passed
  across the Shopify domain hop for attribution.

---

## 9. SEO infrastructure

- **`src/lib/seo.ts`** — every route calls `seo({ path, title, description,
  noindex? })`; no route sets meta tags by hand. Scaffolded/unpopulated
  knowledge pages emit `noindex`.
- **Breadcrumbs** (`breadcrumbs.tsx` + `breadcrumbs-graph.ts`) on every
  knowledge route, emitting `BreadcrumbList` JSON-LD.
- **`sitemap[.]xml.ts` / `robots[.]txt.ts`** — generated sitemap and robots.
- `og:image` only on leaf routes with a meaningful absolute image; site-wide
  default in `__root.tsx`.

---

## 10. Cross-cutting concerns

- **Error handling**: `error-capture.ts` (captures SSR errors h3 swallows),
  `error-page.ts` (static fallback page), `lovable-error-reporting.ts`
  (client-side reporting), root error boundary in `__root.tsx`.
- **`research-use-notice.tsx`** — "Research Use Only. Not for Human or
  Animal Consumption." band rendered above the footer on all public pages.
- **Compliance UI**: cookie banner, dispatch countdown, trust bar.
- **Release notes** (`RELEASE_*.md`, `KNOWLEDGE_*.md`) at the root form the
  project's documented history.

---

## 11. Directory map

```text
src/
├── router.tsx                 Router + QueryClient bootstrap
├── start.ts                   Middleware (errors, Supabase auth attacher)
├── server.ts                  SSR entry with error normalisation
├── routeTree.gen.ts           Generated route tree (do not edit)
├── styles.css                 Tailwind v4 theme tokens (navy/gold/bone)
├── routes/                    File-based routes
│   ├── __root.tsx             App shell: providers, global scripts, chrome
│   ├── index.tsx              Homepage
│   ├── shop.tsx / products.$slug.tsx / cart.tsx / coas.tsx
│   ├── research-hub.*.tsx     Knowledge category landings + $slug pages
│   ├── compounds.*.tsx        Compound reference
│   ├── explore.*.tsx          Graph explorers
│   ├── editorial.*.tsx        Author / reviewer profiles
│   ├── dashboard.*.tsx        Internal tools
│   ├── api/public/*.ts        Webhooks & public endpoints
│   └── sitemap[.]xml.ts, robots[.]txt.ts
├── lib/
│   ├── taxonomy.ts            Single source of truth for the knowledge hierarchy
│   ├── knowledge-api.ts       Unified Knowledge API facade
│   ├── knowledge-graph.ts / study-graph.ts / study-collections.ts
│   ├── topic-clusters.ts / knowledge-explorer.ts / programmes.ts
│   ├── products.ts / cart.tsx / shopify.ts / coa.ts
│   ├── tracking.ts / tiktok.ts
│   ├── seo.ts / breadcrumbs-graph.ts / scaffolds.tsx
│   ├── editorial/             Authors, reviewers, citations, policies
│   ├── email-flow/            Abandoned-checkout email templates + recovery
│   └── error-*.ts / lovable-error-reporting.ts
├── content/                   Content registries (clusters, studies, glossary…)
├── components/
│   ├── knowledge/             Slot layouts + taxonomy-driven navigation
│   ├── publishing/            Scientific publishing component library
│   ├── ui/                    shadcn/ui primitives
│   └── site-header/footer, cart-drawer, upsells, popups, notices…
└── integrations/supabase/     Generated Lovable Cloud clients (do not edit)
```

---

## 12. Data-flow diagrams

### Storefront purchase flow

```text
Product page (/products/$slug)
   │  trackViewItem  ─────────► dataLayer (GTM) + TikTok ViewContent
   ▼
Add to cart ─────────────────► dataLayer + TikTok AddToCart (same event_id)
   │
   ├─ Cart drawer / /cart ──► BAC-water upsell (15-min countdown, £-off code)
   ▼
Buy Now / Checkout ──────────► upsell dialog (if no BAC water in cart)
   │  trackBeginCheckout ─────► dataLayer + TikTok InitiateCheckout
   ▼
Shopify checkout URL (+ttclid, +_ttp) ──► checkout.oxfordresearchsyndicate.com
   │
   ▼
Shopify order paid ──webhook──► /api/public/shopify-order-paid
                                 │ verify HMAC
                                 ▼
                    TikTok Events API: server-side Purchase
                    (hashed email/phone, order total, event_id dedup)
```

### Content rendering flow

```text
taxonomy.ts ──► navigation (KnowledgeNav, ResearchSidebar, Breadcrumbs)
     │
content registries ──► knowledge-api.ts (unified entity responses)
     │                        │
     ▼                        ▼
knowledge/* slot layouts   publishing/* components
     │                        │
     └────────► route leaf (head() SEO + JSON-LD) ◄── seo.ts
```
