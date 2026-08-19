/**
 * GET /api/public/shopify-oauth/callback
 *
 * Completes the one-off Shopify OAuth grant and shows the resulting offline
 * Admin API access token so it can be stored as SHOPIFY_ADMIN_API_TOKEN.
 * Requires SHOPIFY_APP_CLIENT_SECRET.
 */
import { createFileRoute } from "@tanstack/react-router";
import { SHOPIFY_APP_CLIENT_ID } from "./shopify-oauth";

function page(body: string, status = 200) {
  return new Response(
    `<!doctype html><meta name="robots" content="noindex"><body style="font-family:system-ui;max-width:46rem;margin:4rem auto;line-height:1.6">${body}</body>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export const Route = createFileRoute("/api/public/shopify-oauth/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const shop = url.searchParams.get("shop");
        const clientSecret = process.env["SHOPIFY_APP_CLIENT_SECRET"];

        if (!clientSecret) {
          return page("<h1>Not configured</h1><p>SHOPIFY_APP_CLIENT_SECRET is missing.</p>", 503);
        }
        if (!code || !shop || !/^[a-z0-9-]+\.myshopify\.com$/.test(shop)) {
          return page("<h1>Invalid request</h1><p>Missing or malformed OAuth parameters.</p>", 400);
        }

        const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: SHOPIFY_APP_CLIENT_ID,
            client_secret: clientSecret,
            code,
          }),
        });

        const text = await res.text();
        if (!res.ok) {
          return page(
            `<h1>Token exchange failed</h1><pre>${res.status} ${text.replace(/</g, "&lt;")}</pre>`,
            502,
          );
        }

        const data = JSON.parse(text) as { access_token?: string; scope?: string };
        if (!data.access_token) {
          return page("<h1>No token returned</h1>", 502);
        }

        return page(
          `<h1>Admin API token</h1>
           <p>Copy this value and paste it back into the Lovable chat so it can be saved as <code>SHOPIFY_ADMIN_API_TOKEN</code>, then close this page.</p>
           <pre style="background:#f4f4f5;padding:1rem;border-radius:.5rem;word-break:break-all;white-space:pre-wrap">${data.access_token}</pre>
           <p><small>Scopes: ${data.scope ?? "unknown"}</small></p>`,
        );
      },
    },
  },
});
