/**
 * GET /api/public/shopify-oauth
 *
 * One-off setup helper: starts the Shopify OAuth grant for the custom
 * "Lovable Discounts" app so we can obtain a real offline Admin API token
 * (Dev Dashboard automation tokens are NOT valid for the store Admin API).
 *
 * Visit this URL once while signed into the store admin, approve the install,
 * and the callback prints the token for you to save as a secret.
 */
import { createFileRoute } from "@tanstack/react-router";

export const SHOPIFY_APP_CLIENT_ID = "641b4b12f2435c4667e52e3de3bb4bf5";
export const SHOPIFY_SHOP_DOMAIN = "cqdyni-4v.myshopify.com";
export const SHOPIFY_OAUTH_SCOPES =
  "read_price_rules,write_price_rules,read_discounts,write_discounts";

export const Route = createFileRoute("/api/public/shopify-oauth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Must exactly match the whitelisted redirect URL in the Shopify app version
        const redirectUri =
          "https://oxford-peptide-sparkle.lovable.app/api/public/shopify-oauth/callback";
        const state = crypto.randomUUID();

        const authorizeUrl =
          `https://${SHOPIFY_SHOP_DOMAIN}/admin/oauth/authorize` +
          `?client_id=${encodeURIComponent(SHOPIFY_APP_CLIENT_ID)}` +
          `&scope=${encodeURIComponent(SHOPIFY_OAUTH_SCOPES)}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&state=${encodeURIComponent(state)}`;

        return new Response(null, {
          status: 302,
          headers: { Location: authorizeUrl },
        });
      },
    },
  },
});
