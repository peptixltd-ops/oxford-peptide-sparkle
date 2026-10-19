<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Mount the entry age confirmation once in the root shell, using a blocking accessible dialog and tab-session persistence; defer competing popups until confirmation so entry remains consistent across routes.
- Normalize route metadata through the shared SEO text helper and keep editorial metadata overrides separate from content registries, so shortening search text never changes visible prose or headings.
- Keep social images on leaf route heads, with product image overrides, so root defaults cannot replace product-specific previews.
- Scope readable gold text through surface-inherited tokens instead of altering the artwork gold token, preserving dark-surface and button treatments.
- NiftiPay card checkout creates a Shopify draft order server-side and completes it only from the signature-verified NiftiPay webhook; the success page never marks orders paid — the webhook is the single source of payment truth.
- All NiftiPay entry points use the shared client helper to open the NiftiPay payment page directly; the server verifies the order summary against the same Shopify draft total charged by NiftiPay, preventing mismatched amounts.
- NiftiPay country/region validation and shipping rules live in browser-safe shared modules; the checkout route independently applies them to its derived subtotal, so displayed totals and server charges agree without trusting client shipping amounts.
- Newsletter popup and footer share the subscriber endpoint; Shopify customer synchronization is isolated in a server-only helper and never blocks saved-code delivery, so provider permission errors cannot break signup.
- Keep newsletter popup eligibility and suppression rules in a browser-safe helper, and unmount the overlay when closed or ineligible, so route/cart changes cannot leave a click-blocking layer.
- Cart payment guidance reads the validated country from saved NiftiPay delivery details after hydration; do not infer location from GBP or browser language, because this site has no visitor geolocation detector.
- Overlay coordination (age gate, cookie banner, cart drawer, sticky bars, popups) goes through the shared browser-safe overlay registry, so only one blocking/bottom layer shows at a time and the age gate always comes first. A bottom-fixed bar publishes its measured height to that registry so floating buttons sit above it instead of overlapping.
- Spend-tier messaging reads the same tier list checkout applies, so displayed savings can never differ from what Shopify or NiftiPay charge.
