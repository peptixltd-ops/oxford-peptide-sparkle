# Release 1.1 — Foundation

Release 1.1 is a **foundation-only** release. No visual redesign, no new educational
content, no Compound Library, no Shopify changes. The goal is to give Oxford Research
Peptides the technical, SEO, accessibility and architectural base that later releases
(educational hub, compound monographs, methodology library) will build on.

---

## 1. Files changed

### New components
- `src/lib/seo.ts` — central `seo()` helper for canonical, `og:*`, `twitter:*`, robots.
- `src/components/breadcrumbs.tsx` — reusable trail + `BreadcrumbList` JSON-LD.
- `src/components/mobile-nav.tsx` — full-height responsive nav drawer.
- `src/components/skip-to-content.tsx` — keyboard-accessible skip link.
- `src/components/section-header.tsx` — shared eyebrow / title / CTA header.
- `src/components/trust-bar.tsx` — sitewide navy trust strip.
- `src/components/article-card.tsx` — reusable card for the Research Library / Hub.
- `src/components/coa-card.tsx` — shared Certificate of Analysis asset.

### New routes (non-indexable placeholders)
- `src/routes/compounds.tsx` — Compound Library "Coming Soon" (noindex).
- `src/routes/methodology.tsx` — Laboratory Methodology "Coming Soon" (noindex).

### Updated
- `src/routes/__root.tsx` — Organization + WebSite JSON-LD, SkipToContent, sitewide OG image.
- `src/routes/index.tsx` — SEO helper + hero preload; Research Library promoted above
  Featured Compounds (renamed from "Best Sellers"); shared components integrated.
- `src/routes/research-hub.tsx` — `ArticleCard` + `Breadcrumbs` + `seo()`.
- `src/routes/faqs.tsx` — `FAQPage` schema + `Breadcrumbs` + `seo()`.
- `src/routes/products.$slug.tsx` — `Product` schema (with per-variant `Offer`) + `Breadcrumbs` + `seo()`.
- `src/routes/about.tsx`, `src/routes/shop.tsx`, `src/routes/lab-testing.tsx`,
  `src/routes/contact.tsx`, `src/routes/wholesale.tsx`, `src/routes/cart.tsx`,
  `src/routes/account.tsx`, `src/routes/search.tsx`, `src/routes/sitemap.tsx`
  — all migrated to `seo()`, wrapped in `<main id="main-content">`, `<Breadcrumbs>` added
  (cart / account / search are `noindex`).
- `src/routes/privacy-policy.tsx`, `src/routes/terms.tsx`, `src/routes/cookie-policy.tsx`,
  `src/routes/disclaimer.tsx`, `src/routes/refund-policy.tsx`, `src/routes/shipping-policy.tsx`,
  `src/routes/cancellation-policy.tsx` — all migrated to `seo()`; breadcrumbs rendered
  automatically via updated `LegalPage`.
- `src/components/legal-page.tsx` — now renders shared `<Breadcrumbs>` and wraps content in `<main id="main-content">`.
- `src/components/site-header.tsx` — reordered primary nav (education-first),
  `MobileNav` integration, larger tap targets, visible focus rings, `aria-hidden`
  on decorative icons, `aria-label`s on all icon buttons.
- `public/og-image.jpg` — permanent branded 1200×630 sitewide Open Graph asset.

---

## 2. Technical SEO improvements

- Every route now emits **canonical URL**, **`og:url`**, **`og:type`**, **`og:image`**,
  **`og:title`**, **`og:description`** and full Twitter card metadata via the central
  `seo()` helper (`src/lib/seo.ts`).
- Homepage title / description rewritten to reflect educational positioning:
  _"The UK's Educational Authority on Peptide Research"_.
- Sitewide Open Graph image moved to a stable path in `/public/og-image.jpg`.
- Homepage hero image is now **preloaded** (`<link rel="preload" as="image" fetchpriority="high">`).
- Non-indexable routes (`/compounds`, `/methodology`, `/cart`, `/account`, `/search`) emit
  `<meta name="robots" content="noindex, nofollow">` so we do not expose thin or private pages.
- XML sitemap (`/sitemap.xml`) continues to exclude noindex placeholder routes.

---

## 3. Schema additions

- **Organization** + **WebSite** JSON-LD in the root shell, including registered address,
  company number, contact point, `knowsAbout` and `SearchAction`.
- **BreadcrumbList** JSON-LD emitted by the shared `Breadcrumbs` component on every non-home page.
- **Product** JSON-LD with per-variant `Offer` array on `/products/$slug`.
- **FAQPage** JSON-LD on `/faqs` covering all questions across all categories.

_Article schema is intentionally deferred to Release 2 alongside the educational templates._

---

## 4. Accessibility improvements

- Skip-to-content link on every page (first tab-stop).
- `<main id="main-content">` on every route.
- Visible focus states (`focus-visible:outline-2 focus-visible:outline-gold`) on all
  interactive elements: nav links, buttons, form inputs, cards.
- All decorative icons/SVGs marked `aria-hidden="true"`.
- All icon-only buttons have accessible `aria-label`s (search, cart, account, menu, close, qty).
- Minimum 44×44px tap targets on header icons and mobile nav rows.
- Cart badge has descriptive label (`aria-label="Cart, N items"`).
- Mobile nav drawer is a proper `role="dialog" aria-modal="true"` with Escape-to-close
  and background scroll lock.
- FAQ tabs use `role="tablist"` / `role="tab"` / `aria-selected`.
- Body copy remains ≥14px; core reading text 15–16px; WCAG AA contrast preserved.

---

## 5. Performance improvements

- Homepage hero image preloaded with `fetchpriority="high"` and `decoding="async"`.
- Images on product cards, articles and lab-testing use `loading="lazy"`.
- No CSS filters applied to LCP hero (previous `blur`/heavy `drop-shadow` on the LCP
  element removed; retained only a lightweight drop-shadow that does not force
  additional paint on the LCP frame).
- Google Fonts preconnected in `__root.tsx`.
- No visual regressions — same assets, same layout.

---

## 6. Navigation improvements

New primary order (education-first):

1. Research
2. Compounds *(placeholder — noindex)*
3. Methodology *(placeholder — noindex)*
4. Lab Testing
5. About
6. Shop
7. Wholesale
8. Contact
9. FAQs

Also:
- Fully responsive **mobile navigation drawer** with brand tokens (navy / bone / gold).
- Keyboard-accessible throughout; Escape closes; scroll-locked while open.
- Placeholder pages clearly state "Coming Soon" and are noindex.

---

## 7. Homepage information hierarchy

- **Research Library** section now sits **above** commerce.
- Old "Best Selling Research Peptides" renamed to **"Featured Compounds"** and moved below
  the education-first sections.
- Featured Compounds carries a short reframing line making its subordinate role explicit:
  _"Product listings support research — not the other way around."_
- No redesign — spacing, colours, typography and imagery unchanged.

---

## 8. Shared components (no duplicated markup remains)

| Component        | Used by                                                                 |
|------------------|-------------------------------------------------------------------------|
| `SectionHeader`  | Homepage (Research Library, Research Areas, Featured Compounds)         |
| `TrustBar`       | Homepage                                                                |
| `ArticleCard`    | Homepage Research Library, `/research-hub`                              |
| `CoaCard`        | Homepage Excellence section                                             |
| `Breadcrumbs`    | Every non-home route (including all legal pages via `LegalPage`)         |
| `MobileNav`      | `SiteHeader`                                                            |
| `SkipToContent`  | Root shell                                                              |

---

## 9. Typecheck status

`bunx tsgo --noEmit` → **clean, no errors**.

## 10. Build status

Build is handled by the platform's automatic pipeline. No manual build was run.
No new dependencies added.

---

## 11. Recommendations for Release 1.2

1. **Article schema + educational templates.** Introduce an `<Article>` layout with
   `Article` + `Person` (author) JSON-LD, sharing `Breadcrumbs`, `SectionHeader` and
   `ArticleCard`. Move the current placeholder article tiles to real MDX-backed pages.
2. **Compound Library MVP.** Ship 5–10 monograph pages under `/compounds/$slug` with
   `ChemicalSubstance` schema, structural data table and citations. Remove noindex.
3. **Methodology hub MVP.** First cluster: reconstitution, storage, HPLC purity,
   handling. Cross-link from every product page.
4. **Internal linking pass.** Product pages → related compound → related methodology
   guide → related article.
5. **Core Web Vitals telemetry.** Add web-vitals reporting to GA4 (LCP/INP/CLS) so we
   can measure the impact of the hero preload and further optimisations.
6. **Server-generated OG images** per article/compound using a lightweight edge route
   sharing brand tokens.
7. **Search v2.** Replace basic in-memory search with a scored index (Fuse.js or MiniSearch)
   and surface articles + compounds alongside products.
8. **Hreflang / i18n scaffolding** if international shipping goes live.
