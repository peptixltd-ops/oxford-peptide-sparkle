import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createHash, randomBytes } from "crypto";

const SHOPIFY_SHOP = "cqdyni-4v.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const PARENT_PRICE_RULE_ID = "1812859748693";

function normalizePhone(input: string): string | null {
  const raw = input.trim().replace(/[\s\-().]/g, "");
  if (!raw) return null;
  // E.164 already
  if (/^\+[1-9]\d{6,14}$/.test(raw)) return raw;
  // UK local: 07xxxxxxxxx -> +447xxxxxxxxx
  if (/^0\d{9,10}$/.test(raw)) return "+44" + raw.slice(1);
  // 00 international prefix -> +
  if (/^00[1-9]\d{6,14}$/.test(raw)) return "+" + raw.slice(2);
  // Digits only, plausible international length
  if (/^[1-9]\d{7,14}$/.test(raw)) return "+" + raw;
  return null;
}

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().optional().or(z.literal("").transform(() => undefined)),
  sms_consent: z.boolean().optional().default(false),
  source: z.string().max(64).optional().default("popup"),
  website: z.string().optional(), // honeypot
});

function alphanumSuffix(len = 6): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

function getShopifyAdminTokens(env: NodeJS.ProcessEnv): string[] {
  const tokens = [
    env.SHOPIFY_ACCESS_TOKEN,
    env.SHOPIFY_ADMIN_TOKEN,
    ...Object.entries(env)
      .filter(([key, value]) => key.startsWith("SHOPIFY_ONLINE_ACCESS_TOKEN:user:") && !!value)
      .map(([, value]) => value),
  ].filter((token): token is string => Boolean(token));

  return Array.from(new Set(tokens));
}

async function createShopifyDiscountCode(code: string, adminTokens: string[]) {
  let lastError = "No Shopify admin token configured.";
  const url = `https://${SHOPIFY_SHOP}/admin/api/${SHOPIFY_API_VERSION}/price_rules/${PARENT_PRICE_RULE_ID}/discount_codes.json`;

  for (const adminToken of adminTokens) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": adminToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discount_code: { code } }),
    });
    if (res.ok) {
      const json = (await res.json()) as { discount_code?: { id?: number } };
      return { id: json.discount_code?.id, token: adminToken };
    }
    const text = await res.text();
    lastError = `Shopify discount code create failed [${res.status}] tokenLen=${adminToken.length} prefix=${adminToken.slice(0, 6)}: ${text}`;
    console.error("shopify discount attempt failed", lastError);
    if (res.status === 401 || res.status === 403) continue;
    throw new Error(lastError);
  }

  throw new Error(lastError);
}

// In-memory rate limit (best-effort; edge workers may cold-start).
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function rateLimited(ipHash: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ipHash);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ipHash, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > 5;
}

const jsonHeaders = { "Content-Type": "application/json" } as const;

export const Route = createFileRoute("/api/public/newsletter-subscribe")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "content-type",
          },
        }),
      POST: async ({ request }) => {
        try {
          const raw = await request.json().catch(() => null);
          const parsed = bodySchema.safeParse(raw);
          if (!parsed.success) {
            const first = parsed.error.issues[0]?.message ?? "Invalid input";
            return new Response(
              JSON.stringify({ success: false, error: first }),
              { status: 400, headers: jsonHeaders },
            );
          }
          const { email, phone: phoneRaw, sms_consent, source, website } = parsed.data;

          // Honeypot
          if (website && website.trim() !== "") {
            return new Response(JSON.stringify({ success: true }), { status: 200, headers: jsonHeaders });
          }

          let phone: string | undefined;
          if (phoneRaw) {
            const normalized = normalizePhone(phoneRaw);
            if (!normalized) {
              return new Response(
                JSON.stringify({ success: false, error: "Please enter a valid phone number (e.g. 07700 900123 or +447700900123)." }),
                { status: 400, headers: jsonHeaders },
              );
            }
            phone = normalized;
          }

          // Marketing SMS requires explicit consent when phone provided
          if (phone && !sms_consent) {
            return new Response(
              JSON.stringify({ success: false, error: "SMS consent required to store phone number." }),
              { status: 400, headers: jsonHeaders },
            );
          }

          const ip =
            request.headers.get("cf-connecting-ip") ??
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            "unknown";
          const ipHash = createHash("sha256").update(ip).digest("hex");

          if (rateLimited(ipHash)) {
            return new Response(JSON.stringify({ success: false, error: "Too many requests. Please try again shortly." }), {
              status: 429,
              headers: jsonHeaders,
            });
          }

          const supabaseUrl = process.env.SUPABASE_URL!;
          const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
          // Match the working Pondok flow first, with connector-managed tokens as safe fallbacks.
          const adminTokens = getShopifyAdminTokens(process.env);
          if (!supabaseUrl || !serviceKey) {
            return new Response(JSON.stringify({ success: false, error: "Server misconfigured." }), {
              status: 500,
              headers: jsonHeaders,
            });
          }
          if (adminTokens.length === 0) {
            return new Response(
              JSON.stringify({ success: false, error: "Discount service unavailable. Please try again later." }),
              { status: 503, headers: jsonHeaders },
            );
          }

          const supabase = createClient(supabaseUrl, serviceKey, {
            auth: { autoRefreshToken: false, persistSession: false },
          });

          // Suppression list check (table exists only after email infra setup — tolerate absence)
          try {
            const { data: suppressed } = await supabase
              .from("suppressed_emails")
              .select("email")
              .eq("email", email)
              .maybeSingle();
            if (suppressed) {
              return new Response(
                JSON.stringify({ success: false, error: "This email cannot receive our messages." }),
                { status: 400, headers: jsonHeaders },
              );
            }
          } catch {
            /* suppression table not yet available */
          }

          // Duplicate check
          const { data: existing } = await supabase
            .from("newsletter_subscribers")
            .select("id")
            .eq("email", email)
            .maybeSingle();
          if (existing) {
            return new Response(
              JSON.stringify({ success: false, error: "You're already subscribed to our list." }),
              { status: 409, headers: jsonHeaders },
            );
          }

          // Generate unique code + create in Shopify
          const code = `WELCOME20-${alphanumSuffix(6)}`;
          let discountId: number | undefined;
          let discountToken: string | undefined;
          try {
            const discount = await createShopifyDiscountCode(code, adminTokens);
            discountId = discount.id;
            discountToken = discount.token;
          } catch (err) {
            console.error("shopify discount create failed", err);
            return new Response(
              JSON.stringify({ success: false, error: "Could not create your discount code. Please try again." }),
              { status: 502, headers: jsonHeaders },
            );
          }

          const ua = request.headers.get("user-agent") ?? undefined;

          const { error: insertError } = await supabase.from("newsletter_subscribers").insert({
            email,
            phone: phone ?? null,
            sms_consent: !!sms_consent,
            discount_code: code,
            source: source ?? "popup",
            ip_hash: ipHash,
            user_agent: ua ?? null,
            metadata: { shopify_discount_code_id: discountId ?? null },
          });

          if (insertError) {
            // Rollback the Shopify code so we don't leak orphaned codes
            if (discountId && discountToken) {
              await fetch(
                `https://${SHOPIFY_SHOP}/admin/api/${SHOPIFY_API_VERSION}/price_rules/${PARENT_PRICE_RULE_ID}/discount_codes/${discountId}.json`,
                { method: "DELETE", headers: { "X-Shopify-Access-Token": discountToken } },
              ).catch(() => undefined);
            }
            console.error("subscriber insert failed", insertError);
            return new Response(
              JSON.stringify({ success: false, error: "Could not save your subscription. Please try again." }),
              { status: 500, headers: jsonHeaders },
            );
          }

          // Compute expiry (30 days from now)
          const expiresOn = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          // Enqueue welcome email (RPC exists only after email infra is set up)
          try {
            await supabase.rpc("enqueue_email", {
              queue_name: "transactional_emails",
              template_name: "newsletter-welcome",
              recipient_email: email,
              template_data: { code, expiresOn },
              idempotency_key: `newsletter-welcome-${email}`,
            });
          } catch (err) {
            console.warn("enqueue_email not available yet; email will not be sent until email infra is configured.", err);
          }

          return new Response(JSON.stringify({ success: true, code }), { status: 200, headers: jsonHeaders });
        } catch (err) {
          console.error("newsletter-subscribe unexpected error", err);
          return new Response(JSON.stringify({ success: false, error: "Unexpected error." }), {
            status: 500,
            headers: jsonHeaders,
          });
        }
      },
    },
  },
});
