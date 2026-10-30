# Final acceptance report

**NOT READY** for production cutover.

The Medusa 2.22.1 backend and Next.js storefront run in this environment on branch `cursor/medusa-migration-1e9d`. A draft pull request tracks the branch. It must not be merged.

## Blockers

| Service | Credential | Why | Minimum permission | Rough cost |
| --- | --- | --- | --- | --- |
| Shopify Admin | `SHOPIFY_ADMIN_TOKEN` | Customers, orders, real inventory, and confirmed discount values are not in the public products feed | `read_products`, `read_inventory`, `read_customers`, `read_orders`, `read_all_orders`, `read_discounts`, `read_shipping` | Admin API is included with Shopify. `read_all_orders` needs Shopify approval for orders older than 60 days |
| VAT | Accountant confirmation | No rate exists in the source. Checkout currently adds no tax | Decision only | — |
| Card payments | NiftiPay or a Medusa card provider (Stripe is the official module) | Sandbox provider never charges a network. Apple Pay and Google Pay need the live provider | Provider secret key, webhook secret | Stripe UK is per-transaction. NiftiPay has no official Medusa module; a custom provider plus their sandbox keys is required |
| Pay by bank | Wallid / a UK bank provider | No Medusa provider is wired | Provider merchant id and webhook secret | Provider pricing |
| Email | Postmark, Resend, or SendGrid (`@medusajs/notification-sendgrid` ships with Medusa) | Test mode writes `data/email-outbox.jsonl` only | API key, verified sender `info@oxfordresearchpeptides.com` | Resend or Postmark free tiers are small; a few pounds per month above that |
| Hosting | None in this environment | App runs on the VM plus `docker-compose.yml` | Deploy access | See hosting note |
| Web3Forms | `WEB3FORMS_ACCESS_KEY` | Contact form stores messages locally when the key is absent | Existing form key, moved to env | Free tier |
| Research hub prose | Engineering | URLs and summaries exist. Full monograph JSX is still in the legacy app | — | — |
| Discount values | Shopify discounts read | `OXFORD15`, `WELCOMEBACK10`, `COMEBACK20` percentages are inferred from the names | `read_discounts` | — |

### Hosting, if chosen later

Not purchased. Sensible shape: Medusa on Railway or Render (~$10–20/month for a small service), managed Postgres (~$15/month), managed Redis (~$10/month), Next.js on Vercel hobby/pro ($0–20/month). A single small VM running `docker-compose.yml` is about $20–40/month and is simpler to operate. These are list-price sketches, not quotes.

## Test results

- Shipping and catalogue unit tests: 5 passed.
- Playwright: 12 passed across 1440, 768, and 375. Desktop placed a sandbox order and saw “Order received” plus the notice that the page does not mark payment.
- Store API smoke test: 18 products, RT GLP 10mg at £45, UK express £3.99 under £12 and £0 at £45, international £15, Norway rejected.
- Sandbox order total £9.39 on a £6 line with 10% off and express shipping. Outbox has one `order.placed` row. No email left the machine.
- `next build` and `medusa build` both succeeded.
- Semaglutide product URL returns 308 to `/shop`. `/compounds/semaglutide` still explains that it is not sold.

## Data reconciliation

18 ORP products, 0 other brands, 0 semaglutide products, 5 promotion codes, 17 COA batches. Inventory, customers, and historical orders are not migrated. See `MIGRATION_RECONCILIATION.md`.

## SEO status

`SEO_MIGRATION_MAP.csv` has 157 rows. Commerce URLs are canonical to themselves. `/products/semaglutide` is a 301 to `/shop`. Legacy Shopify handles such as `/products/retatrutide-2` 301 to the site handle. Research URLs are `hold-legacy-content` and must not replace the long articles yet. Staging robots disallow indexing. Product pages emit Product JSON-LD. The root layout emits Organization JSON-LD.

## Required manual actions

1. Issue a Shopify custom app token with the scopes above and run the importers against a staging copy, not production writes.
2. Confirm VAT and the three inferred discount codes.
3. Choose card and Pay by bank providers and their sandbox keys.
4. Choose email and hosting. Do not sign up from this run.
5. Review legal pages against the current site before they replace it.
6. Decide whether research articles move in the same cutover.

## Cutover action

Do not cut over. Follow `CUTOVER_PLAN.md` only after the blockers are closed and someone approves DNS.

## Rollback

Keep Shopify serving production. Revert DNS if it was ever changed. Restore the Postgres snapshot. Refund any captured payment in the provider. Do not delete Shopify and do not merge this branch.

## Screenshots

Home, shop, product, cart, and checkout at mobile, tablet, and desktop: `artifacts/screenshots/`.
