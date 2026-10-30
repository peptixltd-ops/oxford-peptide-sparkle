# Migration plan

Oxford Research Peptides moves from the Lovable TanStack storefront and Shopify checkout to Medusa v2.22.1 (PostgreSQL, Redis) and a custom Next.js storefront. Work stays on `cursor/medusa-migration-1e9d`. Nothing is merged to `main`.

## Layout

- `apps/backend` — official Medusa 2.22 application (`apps/backend` inside that package is the server)
- `apps/storefront` — Next.js storefront
- `packages/config` — shipping, discounts, catalogue, brand
- `packages/ui` — shared display helpers
- `migration/shopify` — idempotent, resumable importers and fixtures
- `tests` — Playwright
- `docker-compose.yml` — Postgres, Redis, backend, storefront

## Sequence

1. Audit the live catalogue, routes, shipping, discounts, and payments.
2. Run Medusa with a UK/GBP region, one sales channel, the Barking stock location, and calculated shipping.
3. Rebuild the commerce storefront against the Medusa Store API.
4. Import only vendor `Oxford Research Peptides` / `ORP-*` from the public products feed. Keep site handles. Re-host vial images.
5. Reconcile counts. Do not import other brands or semaglutide.
6. Publish the SEO map, 301s for retired and legacy Shopify handles, sitemap, robots, canonicals, and JSON-LD. Staging sends `noindex`.
7. Model each compound as one product and each strength as a variant.
8. Add a COA module: product → batch → test, visible in Admin and on product pages.
9. Cart, sandbox checkout, accounts, test-mode email, and consent-gated analytics.
10. Playwright at 375, 768, and 1440. Production build of the storefront.
11. Stop before DNS, Shopify cancellation, production data changes, or live charges.

## Shipping and money

UK Express £3.99 (1–2 days) and Standard £5.99 (3–5 days), both free from £12. International £15 except Norway. Russia and Belarus stay blocked, matching the current site. Dispatch cut-off is 2pm UK. VAT is not configured.

## Payments

Today: Shopify Pay by bank (Wallid) and NiftiPay cards. This build uses a sandbox provider that never calls a payment network. Real providers are blockers.
