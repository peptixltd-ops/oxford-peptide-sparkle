import { normaliseDiscountCode } from "../../packages/config/discounts.mjs";

export const ORP_VENDOR = "Oxford Research Peptides";
export const OTHER_BRAND_VENDORS = ["Pondok Peptides", "UKPeptideLabs", "BuyRetaUK"];

const HANDLE_TO_CANONICAL = {
  "bpc-158": "bpc-157",
  "bacteriostatic-water-2": "bacteriostatic-water",
  "tesamorelin-2": "tesamorelin",
  "tb-502": "tb-500",
  "ss-32": "ss-31",
  "semax-2": "semax",
  "pt-142": "pt-141",
  "nad-2": "nad",
  "mots-c-2": "mots-c",
  "klow-1": "klow",
  "ipamorelin-2": "ipamorelin",
  "igf-lr3-1": "igf-lr3",
  "selank-2": "selank",
  "bpc-157-tb-500-mix-2": "bpc-tb500",
  "ghk-cu-2": "ghk-cu",
  "cagrilintide-2": "cagrilintide",
  "tirzepatide-2": "tirzepatide",
  "retatrutide-2": "retatrutide",
};

const DISPLAY_TITLES = {
  retatrutide: "RT GLP",
  "igf-lr3": "IGF-1 LR3",
};

const COMPLIANT_DESCRIPTIONS = {
  retatrutide: "Triple agonist research peptide (GLP-1 / GIP / glucagon receptor ligand). Lyophilised powder supplied in a sealed vial for in-vitro laboratory research only.",
  tirzepatide: "Dual GIP / GLP-1 receptor ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  "ghk-cu": "Copper tripeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
  "mots-c": "Mitochondrial-derived peptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
  "bacteriostatic-water": "Sterile bacteriostatic water for laboratory reconstitution of lyophilised peptides.",
  nad: "Nicotinamide adenine dinucleotide reference standard. Lyophilised powder for in-vitro laboratory research only.",
  "bpc-tb500": "Combined BPC-157 and TB-500 reference standard blend. Lyophilised powder for in-vitro laboratory research only.",
  ipamorelin: "Selective GHSR ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  selank: "Synthetic heptapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
  tesamorelin: "GHRH analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  klow: "Multi-peptide research blend (KPV, LL-37, GHK-Cu, TB-500). Lyophilised powder for in-vitro laboratory research only.",
  "tb-500": "Thymosin Beta-4 fragment reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  "igf-lr3": "Long Arg3 IGF-1 analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  cagrilintide: "Long-acting amylin analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  "ss-31": "Mitochondria-targeted tetrapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
  "pt-141": "Melanocortin receptor ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  semax: "Synthetic ACTH(4-10) analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
  "bpc-157": "Synthetic pentadecapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
};

const PURITY = {
  "ghk-cu": "99.93% Purity",
  "bacteriostatic-water": "0.9% Benzyl Alcohol",
};

export function isRetiredProductSlug(slug) {
  return /^(?:orp[-_])?semaglutide(?:[-_].*)?$/i.test(String(slug || ""));
}

export function canonicalHandle(shopifyHandle) {
  return HANDLE_TO_CANONICAL[shopifyHandle] || shopifyHandle;
}

export function variantKeyFromSku(sku) {
  const match = String(sku || "").match(/^ORP-[A-Z0-9-]+-(.+)$/i);
  if (!match) return null;
  const raw = match[1].toLowerCase();
  if (raw.endsWith("ml")) return raw.replace(/ml$/, "mL");
  if (raw === "20mg") return "20mg";
  return raw;
}

function strengthLabel(sku, option1) {
  if (option1) return option1;
  const key = variantKeyFromSku(sku);
  return key || "Default";
}

export function selectOrpProducts(products) {
  const accepted = [];
  const rejected = [];
  for (const product of products || []) {
    const vendor = product.vendor || "";
    const handle = canonicalHandle(product.handle);
    if (vendor !== ORP_VENDOR) {
      rejected.push({ id: product.id, handle: product.handle, reason: `vendor:${vendor || "missing"}` });
      continue;
    }
    if (isRetiredProductSlug(handle) || isRetiredProductSlug(product.handle) || /semaglutide/i.test(product.title || "")) {
      rejected.push({ id: product.id, handle: product.handle, reason: "retired-semaglutide" });
      continue;
    }
    const variants = [];
    for (const variant of product.variants || []) {
      const sku = variant.sku || "";
      if (!sku.startsWith("ORP-")) {
        rejected.push({ id: variant.id, handle: product.handle, reason: `sku:${sku || "missing"}` });
        continue;
      }
      variants.push({
        shopify_variant_id: variant.id,
        sku,
        title: strengthLabel(sku, variant.option1 || variant.title),
        option_value: strengthLabel(sku, variant.option1 || variant.title),
        price: Number(variant.price),
        shopify_available: variant.available ?? null,
      });
    }
    if (!variants.length) {
      rejected.push({ id: product.id, handle: product.handle, reason: "no-orp-variants" });
      continue;
    }
    accepted.push({
      shopify_product_id: product.id,
      shopify_handle: product.handle,
      handle,
      title: DISPLAY_TITLES[handle] || product.title,
      shopify_title: product.title,
      vendor,
      description: COMPLIANT_DESCRIPTIONS[handle] || "Lyophilised reference material for in-vitro laboratory research only.",
      purity: PURITY[handle] || ">99% Purity",
      image: `/products/${handle}.webp`,
      variants,
    });
  }
  return { accepted, rejected };
}

export function classifyOrder(order) {
  const lines = order.line_items || order.lineItems || [];
  const orp = [];
  const other = [];
  for (const line of lines) {
    const vendor = line.vendor || "";
    const sku = line.sku || "";
    const ours = vendor === ORP_VENDOR && sku.startsWith("ORP-") && !isRetiredProductSlug(line.handle || sku);
    if (ours) orp.push(line);
    else other.push(line);
  }
  if (orp.length && other.length) {
    return { action: "flag-ambiguous", reason: "mixed-brand-order", orp, other };
  }
  if (orp.length) return { action: "import", reason: "orp-only", orp, other: [] };
  return { action: "skip", reason: other.length ? "other-brand-only" : "empty", orp: [], other };
}

export function classifyCustomer(customer, orders) {
  const related = (orders || []).filter((order) => String(order.email || "").toLowerCase() === String(customer.email || "").toLowerCase() || order.customer_id === customer.id);
  const classes = related.map(classifyOrder);
  const hasOrp = classes.some((entry) => entry.action === "import" || entry.orp.length);
  const ambiguous = classes.some((entry) => entry.action === "flag-ambiguous");
  if (!hasOrp && !ambiguous) return { action: "skip", reason: "not-attributable-to-orp" };
  if (ambiguous) return { action: "flag-ambiguous", reason: "shared-or-mixed-orders" };
  return { action: "import", reason: "orp-orders-only" };
}

export function planDiscounts(records) {
  return (records || []).map((record) => {
    const code = normaliseDiscountCode(record.code || record.title || "");
    return {
      code,
      shopify_price_rule_id: record.id || null,
      value_type: record.value_type || null,
      value: record.value ?? null,
      action: code ? "upsert" : "skip",
    };
  });
}
