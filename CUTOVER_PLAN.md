# Cutover plan

Do not execute this until the blockers in `FINAL_ACCEPTANCE_REPORT.md` are closed and a person explicitly approves it. This document is the plan only.

## Before the window

1. Freeze Shopify catalogue edits or record the freeze time.
2. Confirm VAT with the company accountant and enter the rate in Medusa. Do not guess 20%.
3. Load inventory with `read_inventory` and turn `manage_inventory` on.
4. Confirm `OXFORD15`, `WELCOMEBACK10`, and `COMEBACK20` values from Shopify discounts (`read_discounts`).
5. Import customers and ORP-only orders. Review the ambiguous-order log. Send activation links from the real email provider, not the test outbox.
6. Connect a live card provider and Pay by bank. Run one real £0 or provider-sandbox transaction on a staging hostname.
7. Port research-hub article bodies or keep those URLs on the legacy app. Do not 301 rich articles to summary pages.
8. Point a staging hostname at this stack with `NEXT_PUBLIC_STAGING=true` and confirm `noindex`.
9. Take a Postgres snapshot and a Shopify product/order export.

## Cutover

1. Run `migration/shopify/delta-sync.mjs` with the admin token.
2. Lower DNS TTL ahead of time (a DNS change itself waits for approval).
3. Put Shopify into a pause or password page only when approved. Do not delete it.
4. Switch the apex and `www` to the Next.js host and the Medusa host to their production URLs.
5. Set `NEXT_PUBLIC_STAGING=false` only after robots, canonicals, and the sitemap are checked on the production host.
6. Place a staff order with a real provider in test mode, then one low-value live order if finance agrees.
7. Watch Medusa orders, the email provider, and payment webhooks for the first hour.

## Rollback

1. Restore the previous DNS records. Shopify checkout stays available because it was not deleted.
2. Restore the Postgres snapshot if any live order must be replayed. Do not delete Medusa orders that already captured funds; refund them in the payment provider.
3. Keep the Medusa branch. Do not force-push and do not merge to `main` as part of rollback.
4. Tell customers who ordered during the window from the Medusa email log. The test outbox is not that log once a real provider is connected.

## Explicitly out of scope until a later approval

DNS edits, cancelling Shopify, deleting Shopify data, charging real cards, emailing customers, and merging this branch.
