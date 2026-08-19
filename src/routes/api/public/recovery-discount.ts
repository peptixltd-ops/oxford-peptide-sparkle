/**
 * POST /api/public/recovery-discount
 *
 * Called by the abandoned-checkout automation just before Email 5 is sent.
 * Mints a unique, single-use 30% code that genuinely expires 12 hours later,
 * and returns the code plus ready-to-render copy for the email.
 *
 * Auth: shared secret in the X-Recovery-Secret header (RECOVERY_DISCOUNT_SECRET).
 */
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { mintRecoveryDiscount } from "@/lib/email-flow/recovery-discount.server";

const bodySchema = z.object({
  email: z.string().email().max(320),
});

export const Route = createFileRoute("/api/public/recovery-discount")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["RECOVERY_DISCOUNT_SECRET"];
        if (!secret) {
          return new Response(
            JSON.stringify({ error: "not_configured" }),
            { status: 503, headers: { "Content-Type": "application/json" } },
          );
        }

        const provided = request.headers.get("x-recovery-secret") ?? "";
        if (
          provided.length !== secret.length ||
          !provided.split("").every((c, i) => c === secret[i])
        ) {
          return new Response("Unauthorized", { status: 401 });
        }

        let parsed: z.infer<typeof bodySchema>;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return new Response(
            JSON.stringify({ error: "invalid_body" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const discount = await mintRecoveryDiscount(parsed.email);

        return new Response(
          JSON.stringify({
            code: discount.code,
            expires_at: discount.expiresAt,
            expiry_label: discount.expiryLabel,
            mode: discount.mode,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          },
        );
      },
    },
  },
});
