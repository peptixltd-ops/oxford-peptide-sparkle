# Migration audit

Date: 29 October 2026. Source: this repository plus the public catalogue at `https://checkout.oxfordresearchpeptides.com/products.json`.

## Current stack

- Storefront: TanStack Start / Vite / React in the repository root. Lovable syncs `main`.
- Commerce: Shopify store `cqdyni-4v.myshopify.com`, checkout host `checkout.oxfordresearchpeptides.com`.
- Payments in production: Pay by bank (Wallid) and NiftiPay card / Apple Pay / Google Pay. The success page does not mark orders paid; the NiftiPay webhook is the source of truth.
- Subscribers: newsletter signup creates a Shopify customer and returns `OXFORDWELCOME10`. Web3Forms receives the contact form.
- Age confirmation, cookie banner, cart drawer, and newsletter popup are coordinated so the age gate is first.

## Catalogue

The public feed contains 75 products. Vendors: BuyRetaUK 20, Pondok Peptides 19, UKPeptideLabs 18, Oxford Research Peptides 18. Only the Oxford Research Peptides vendor is in scope. Every kept variant SKU starts with `ORP-`. Semaglutide is not in that vendor list. It was removed from the shop on 28 October 2026 and must not return. Literature routes that mention it stay.

Shopify handles are suffixed (`retatrutide-2`, `bpc-158`). The public site handles are the canonical ones (`/products/retatrutide`, `/products/bpc-157`). The customer-facing title for retatrutide is **RT GLP**. Shopify’s title is “Reta GLP”; that string is kept in metadata.

Live prices match the storefront price list, including an SS-31 10mg variant (`ORP-SS31-10MG`, £44) that is in Shopify and the variant map but was missing from `src/lib/products.ts`. It is included.

Customer-facing descriptions use the compliant in-vitro copy from `src/lib/products.ts`. Several Shopify bodies mention pathways in a way that reads like a health claim. Those bodies were not copied onto the Medusa product.

## Shipping

| Destination | Method | Price | Notes |
| --- | --- | --- | --- |
| United Kingdom | Express | £3.99 | 1–2 days. Free when goods are £12 or more |
| United Kingdom | Standard | £5.99 | 3–5 days. Free when goods are £12 or more |
| International | Flat | £15 | Every country except Norway |
| Russia, Belarus | None | — | Already blocked on the live site |
| Norway | None | — | Excluded from the flat rate |

Dispatch cut-off is 2pm UK, Monday to Friday. Currency is GBP. There is no VAT rate in the source code. None was invented.

## Discounts

Customers receive codes by link (`?discount=` or `/discount/CODE`). They do not type them.

| Code | Rule | Confidence |
| --- | --- | --- |
| OXFORDWELCOME10 | 10% once per customer. Welcome popup and newsletter | Confirmed |
| BACWATER2OFF | £2 off bacteriostatic water | Confirmed in the live cart |
| OXFORD15 | 15% | Inferred from the code name |
| WELCOMEBACK10 | 10% | Inferred from the code name |
| COMEBACK20 | 20% | Inferred from the code name |

No subtotal-based discount is applied. Guest baskets cannot supply a Medusa `customer_id`, so the welcome code is active without an attribute budget. Once-per-customer still needs a logged-in customer before it can be enforced.

## Accounts, email, analytics

There is no Shopify Admin token, so customers and orders cannot be read. Orders can contain lines from more than one brand. Only ORP-only orders are importable. Mixed orders are flagged and skipped.

Sender: info@oxfordresearchpeptides.com. Sign-off: Sullivan, Founder. Address: 131a Movers Lane, Barking, IG11 7UQ. Company 17207898, Oxford Research Syndicate Ltd.

Analytics events already implied by the cookie policy: view_item, view_item_list, add_to_cart, view_cart, begin_checkout, purchase. They must wait for consent.

## What stays on the legacy app until cutover

The research hub’s long-form monographs are JSX in `src/content`. The new storefront keeps the public URLs, titles, and summaries. Full article bodies are not yet rendered. Those URLs are `hold-legacy-content` in the SEO map and must not be switched until the prose is ported or the legacy app keeps serving them.
