const REQUIRED_SCOPES = [
  "read_products",
  "read_inventory",
  "read_customers",
  "read_orders",
  "read_all_orders",
  "read_discounts",
  "read_shipping",
];

export function adminConfig() {
  const token = process.env.SHOPIFY_ADMIN_TOKEN || "";
  const domain = process.env.SHOPIFY_STORE_DOMAIN || "cqdyni-4v.myshopify.com";
  const version = process.env.SHOPIFY_ADMIN_API_VERSION || "2025-10";
  return { token, domain, version, scopes: REQUIRED_SCOPES };
}

export function assertAdminToken() {
  const config = adminConfig();
  if (!config.token) {
    const blocker = {
      blocker: true,
      service: "Shopify Admin API",
      credential: "SHOPIFY_ADMIN_TOKEN",
      why: "Customers, orders, discount values, inventory levels and delta sync cannot be read from the public products.json feed.",
      minimum_scopes: config.scopes,
      store: config.domain,
    };
    console.error(JSON.stringify(blocker, null, 2));
    process.exitCode = 2;
    return null;
  }
  return config;
}

export async function adminGet(path) {
  const config = assertAdminToken();
  if (!config) return null;
  const url = `https://${config.domain}/admin/api/${config.version}${path}`;
  const response = await fetch(url, { headers: { "X-Shopify-Access-Token": config.token, Accept: "application/json" } });
  if (!response.ok) throw new Error(`Shopify Admin ${response.status} ${path}`);
  return response.json();
}

export function usesFixture(argv = process.argv) {
  return argv.includes("--fixture");
}
