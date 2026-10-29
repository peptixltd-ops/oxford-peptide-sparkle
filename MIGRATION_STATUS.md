# Migration status

Branch: `cursor/medusa-migration-1e9d`. Medusa **2.22.1**. Not merged.

| Phase | State |
| --- | --- |
| 1 Audit | Written in `MIGRATION_AUDIT.md` |
| 2 Platform | Running locally. UK/GBP region, sales channel, Barking stock location, Redis cache, event bus, workflow engine, and locking |
| 3 Storefront | Live Lovable JSX, Tailwind tokens, and chrome ported into Next.js. Viewport diff versus production is under 1% on home, shop, product, cart, COAs, about, contact, FAQ, and legal pages at 375/768/1440 |
| 4 Catalogue import | 18 ORP products from the public feed. Images re-hosted under `/products`. Handles are the live site handles |
| 5 Reconciliation | `MIGRATION_RECONCILIATION.md` |
| 6 SEO | `SEO_MIGRATION_MAP.csv` (157 rows). Staging `robots.txt` disallows all. Semaglutide product 301s to `/shop` |
| 7 Product model | One product per compound, strength variants, `ORP-*` SKUs |
| 8 COA module | Product → batch → test. 17 batches. Admin widget and `/store/coa` |
| 9 Cart | Store API cart. Drawer and `/cart` |
| 10 Checkout | Sandbox provider. One completed order in dev: goods £6, 10% welcome, express £3.99, total £9.39. Success page does not mark payment |
| 11 Accounts | Register, login, and reset routes. Reset mail stays in the test outbox |
| 12 Email | Local JSONL outbox with dedupe. No customer email was sent |
| 13 Analytics | Events fire only after cookie consent |
| 14 Performance | Production Next build succeeds. Hero and vials are local |
| 15 Playwright | 12 passed (desktop 1440, tablet 768, mobile 375) |
| 16 Visual QA | Screenshots in `artifacts/screenshots` for home, shop, product, cart, checkout |
| 17 Debug | Shipping calculate endpoint, guest welcome code, and publishable-key loading fixed against the running server |
| 18 Security | `.env.example` only. Local secrets are gitignored. Sandbox never stores a PAN |
| 19 Builds | `next build` and `medusa build` both succeeded |
| 20 Delta sync | `migration/shopify/delta-sync.mjs` exits 2 without `SHOPIFY_ADMIN_TOKEN` |
| 21 Cutover | `CUTOVER_PLAN.md`. No DNS or production change was made |

## Verdict

**NOT READY** for production cutover. The staging stack runs. Live payments, VAT, inventory, customers, orders, and long-form research pages are still blocked.
