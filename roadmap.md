## Popup fixes
- [ ] Restrict store-credit popup timing, pages, cart and age eligibility; persist suppression for 30 days and verify click-through after closing.
- [ ] Remove bacteriostatic water countdown and use standing-offer wording, preserving checkout skip and styling; do not publish.
## Delivery offer visibility
- [x] Keep the £12 UK delivery offer in the cart drawer note only; the announcement bar and the product purchase-area line were reverted to their original state after the change of plan.
- [x] Point the full cart page shipping calculation at the shared UK £12 helper and align the NiftiPay delivery details modal note wording with the drawer.
- [x] Update outdated delivery copy site-wide and verify the visible changes without publishing; retain existing checkout calculations as requested.
## NiftiPay order summary
## NiftiPay international delivery
- [x] Update only NiftiPay UK free delivery to £12 for both methods, revise modal/cart wording and verify server tests and live display; no matching banner wording existed.
- [x] Add worldwide eligible countries, conditional region validation and live delivery totals.
- [x] Enforce UK/international shipping on the server; verify product/shop/cart modal flows, API rejection and mocked payment handoff without publishing or creating live test orders.
## Newsletter Shopify sync
- [x] Add non-blocking customer consent, tags and welcome-code sync; remove missing email RPC.
- [x] Wire footer signup; verify inline validation, simulated code delivery, double-submit protection and actual endpoint honeypot/validation.
- [ ] Activate live Shopify subscriber sync and welcome delivery: blocked by missing write_customers on the working token; Shopify welcome automation must also be enabled (not verified).

- [x] Check documented hosted-payment description support.
- [x] Add a shared card-checkout summary using server-verified totals.
- [x] Verify summary, back navigation, and payment handoff on mobile and desktop.
## Image performance
- [x] Convert every ORP product image and footer logo to WebP.
- [x] Update references and image loading/dimension attributes without CSS changes.
- [x] Verify image rendering and unchanged desktop/mobile sizing; report image sizes.
## SEO text lengths
- [ ] Shorten metadata and generated templates without changing visible content.
- [ ] Verify all actual routes/data, social matches, and limits; report examples and changed files.
## Targeted image and SEO updates
- [x] Optimize hero and header logo without changing their displayed sizes.
- [x] Improve light-background gold text contrast, preserving dark-surface and button gold.
- [x] Use each product image in its social metadata.
- [x] Make compound, glossary and collection H1s specific.
- [x] Check whether the www redirect can be changed in code; leave domain settings and publishing untouched (hosting-controlled 302).
