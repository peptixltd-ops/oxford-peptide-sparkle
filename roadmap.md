## Timed Halloween cart promotion
- [x] Apply shared promotion to card delivery summary and server-verified Shopify draft/NiftiPay charge; 20 tests and the live delivery window verified. No live payment created; not published.
- [x] Add shared timed promotion, both cart estimates and non-combining bank checkout selection; seven tests pass, both carts and intercepted same-tab bank handoff verified. Not published; card checkout unchanged.

## Remove Semaglutide from sale
- [x] Remove catalogue, sale copy, variant mapping and stale-cart entries; redirect old product slugs to /shop.
- [x] Verify shop, search, cart, five permanent redirects, sitemap and card endpoint rejection; 17 tests passed. Retain scientific/historical references and report them. Not published.
## Remove preview popup override
- [x] Delete the temporary ?previewpopup=1 override so the pop-up follows only its normal rules (30s timer or desktop exit intent, empty cart, eligible page, age gate, 30-day cooldown). Not published.
## Welcome offer fallback and preview
- [x] Replace obsolete welcome-credit references with OXFORDWELCOME10; configured node 1847011410261; 16 tests pass and immediate preview popup verified with age gate first, existing cooldown and a nonempty basket. Not published.
- [ ] Independently verify OXFORDWELCOME10 on the Welcome 10% discount: blocked by Shopify reporting that this discount is unavailable to the connected account/channel; store-owner access is required.
## Remove spend-tier discounts
- [x] Remove spend-tier copy, cart credits/progress and automatic codes from both checkouts; preserve email codes, water offer and delivery rules.
- [x] Verify £90 cart/drawer totals and both checkout discount payloads with intercepted payment handoffs; 15 relevant tests passed without publishing or creating live orders.
## Wording consistency
- [x] Align dispatch and delivery wording, payment labels and GHK-Cu purity; footer Bestsellers already targets /shop and was verified. Preserved styling, prices, legal identity and scripts; 15 tests passed and desktop/mobile checks completed without publishing.
## Cart payment choices
- [x] Update both cart payment blocks with equal buttons and saved non-UK delivery-country guidance (no visitor-country detector exists); verified desktop/mobile, card delivery modal and actual same-tab Shopify handoffs without publishing.
## Popup fixes
- [x] Restrict newsletter popup timing, pages, cart and age eligibility; persist suppression for 30 days and verify click-through after closing.
- [x] Remove bacteriostatic water countdown and use standing-offer wording, preserving checkout skip and styling; verified without publishing.
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
## WhatsApp button above sticky bar
- [x] Lift the WhatsApp button above the mobile sticky Add to cart bar; unchanged when the bar is hidden.
- [x] Verify no overlap on a phone screen and unchanged position at the top of the page and on desktop.
