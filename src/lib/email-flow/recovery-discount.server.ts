/**
 * Per-recipient 30% recovery discount minting (Email 5 of the abandoned
 * checkout flow).
 *
 * Primary path: mint a brand-new, single-use 30% code in Shopify with a
 * genuine 12-hour expiry (endsAt = now + 12h), unique to the recipient.
 *
 * Fallback path: if minting is unavailable (token expired, Shopify error,
 * rate limit), return the standing FINAL-Q418FY code together with ITS real
 * end date. The email copy adapts, so it never states an expiry that is not
 * configured in Shopify.
 *
 * Server-only. Never import from client code.
 */

const SHOP_DOMAIN = "cqdyni-4v.myshopify.com";
const ADMIN_API_VERSION = "2025-07";

/** Standing fallback code. Its expiry is read live from Shopify. */
export const FALLBACK_CODE = "FINAL-Q418FY";

export const OFFER_WINDOW_HOURS = 12;

export type RecoveryDiscount = {
  code: string;
  /** ISO timestamp the code genuinely stops working. */
  expiresAt: string;
  /** Human copy for the email, e.g. "12 hours" or "until 21 Aug, 6:00pm". */
  expiryLabel: string;
  mode: "unique" | "fallback";
};

function adminToken(): string | undefined {
  return (
    process.env["SHOPIFY_ADMIN_API_TOKEN"] ||
    process.env["SHOPIFY_ACCESS_TOKEN"] ||
    undefined
  );
}

async function adminGraphql(query: string, variables: Record<string, unknown>) {
  const token = adminToken();
  if (!token) throw new Error("No Shopify Admin API token configured");

  const res = await fetch(
    `https://${SHOP_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  if (!res.ok) {
    throw new Error(`Shopify Admin API ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as {
    data?: Record<string, any>;
    errors?: Array<{ message: string }>;
  };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data ?? {};
}

/** Human-unambiguous, hard to guess, obviously personal. */
function buildCode(email: string): string {
  const seed = email.trim().toLowerCase();
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const alphabet = "ACDEFHJKLMNPRTUVWXY3479";
  const rand = (n: number) =>
    Array.from(
      { length: n },
      () => alphabet[Math.floor(Math.random() * alphabet.length)],
    ).join("");
  return `ORP-${h.toString(36).toUpperCase().slice(0, 4)}-${rand(5)}`;
}

const CREATE_MUTATION = `
  mutation CreateRecoveryCode($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode { id }
      userErrors { field message }
    }
  }
`;

function formatLondon(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

/** Read the standing fallback code's real end date from Shopify. */
async function fallbackDiscount(): Promise<RecoveryDiscount> {
  let expiresAt = "";
  try {
    const data = await adminGraphql(
      `query($code: String!) {
        codeDiscountNodeByCode(code: $code) {
          codeDiscount { ... on DiscountCodeBasic { endsAt } }
        }
      }`,
      { code: FALLBACK_CODE },
    );
    expiresAt = data?.codeDiscountNodeByCode?.codeDiscount?.endsAt ?? "";
  } catch {
    /* expiry unknown — copy omits the expiry claim */
  }

  return {
    code: FALLBACK_CODE,
    expiresAt,
    expiryLabel: expiresAt ? `until ${formatLondon(expiresAt)}` : "",
    mode: "fallback",
  };
}

/**
 * Mint a unique 30% code valid for exactly OFFER_WINDOW_HOURS.
 * 30% off order · no minimum spend · one use in total · one per customer.
 */
export async function mintRecoveryDiscount(
  email: string,
): Promise<RecoveryDiscount> {
  const startsAt = new Date();
  const endsAt = new Date(startsAt.getTime() + OFFER_WINDOW_HOURS * 3600_000);

  for (let attempt = 0; attempt < 3; attempt++) {
    const code = buildCode(email);
    try {
      const data = await adminGraphql(CREATE_MUTATION, {
        basicCodeDiscount: {
          title: `Abandoned Checkout 30% (12h) — ${email}`,
          code,
          startsAt: startsAt.toISOString(),
          endsAt: endsAt.toISOString(),
          usageLimit: 1,
          appliesOncePerCustomer: true,
          combinesWith: {
            orderDiscounts: false,
            productDiscounts: false,
            shippingDiscounts: true,
          },
          customerSelection: { all: true },
          customerGets: {
            value: { percentage: 0.3 },
            items: { all: true },
          },
        },
      });

      const errors = data?.discountCodeBasicCreate?.userErrors ?? [];
      if (errors.length) {
        // Code collision → retry with a fresh code; anything else → fallback.
        const collision = errors.some((e: { message: string }) =>
          /taken|already exists/i.test(e.message),
        );
        if (collision) continue;
        throw new Error(
          errors.map((e: { message: string }) => e.message).join("; "),
        );
      }

      return {
        code,
        expiresAt: endsAt.toISOString(),
        expiryLabel: `${OFFER_WINDOW_HOURS} hours`,
        mode: "unique",
      };
    } catch (err) {
      console.error("[recovery-discount] mint failed:", err);
      break;
    }
  }

  return fallbackDiscount();
}
