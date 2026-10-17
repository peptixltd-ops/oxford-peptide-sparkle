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
- Newsletter popup and footer share the subscriber endpoint; Shopify customer synchronization is isolated in a server-only helper and never blocks saved-code delivery, so provider permission errors cannot break signup.
