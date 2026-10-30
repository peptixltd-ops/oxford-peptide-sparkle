import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  DefaultsUtils,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createPromotionsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"
import { COA_MODULE } from "../modules/coa"
import { DEFAULT_REGION_STORE_POLICIES } from "../lib/region-store-policies"

const EXCLUDED = new Set(["no", "ru", "by"])

type CatalogueProduct = {
  handle: string
  title: string
  shopify_title: string
  shopify_handle: string
  shopify_product_id: number
  description: string
  purity: string
  image: string
  variants: Array<{
    sku: string
    title: string
    option_value: string
    price: number
    shopify_variant_id: number
  }>
}

type CoaEntry = {
  handle: string
  option: string
  batch: string
  purity: string
  date: string
  file: string
  test_type?: string
}

export default async function initial_data_seed({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: existingChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  if (existingChannels.some((channel) => channel.name === "Oxford Research Peptides")) {
    await seedCoaRecords(container, logger)
    logger.info("Oxford Research Peptides is already seeded. COA records checked.")
    return
  }

  const countries = DefaultsUtils.defaultCountries
    .map((country) => country.alpha2.toLowerCase())
    .filter((code) => !EXCLUDED.has(code))

  logger.info("Seeding Oxford Research Peptides store...")
  const { result: [salesChannel] } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [{
        name: "Oxford Research Peptides",
        description: "UK research-peptide storefront",
      }],
    },
  })

  const { result: [publishableApiKey] } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [{ title: "Oxford storefront", type: "publishable", created_by: "" }],
    },
  })

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [salesChannel.id] },
  })

  await createStoresWorkflow(container).run({
    input: {
      stores: [{
        name: "Oxford Research Peptides",
        supported_currencies: [{ currency_code: "gbp", is_default: true }],
        default_sales_channel_id: salesChannel.id,
      }],
    },
  })

  const { result: [region] } = await createRegionsWorkflow(container).run({
    input: {
      regions: [{
        name: "United Kingdom and international",
        currency_code: "gbp",
        countries,
        payment_providers: ["pp_sandbox_sandbox"],
        metadata: {
          ...DEFAULT_REGION_STORE_POLICIES,
          vat_status: "unconfigured",
          free_shipping_threshold_gbp: 12,
          uk_express_gbp: 3.99,
          uk_standard_gbp: 5.99,
          international_flat_gbp: 15,
          excluded_countries: ["no", "ru", "by"],
          dispatch_cutoff: "14:00 Europe/London",
        },
      }],
    },
  })

  logger.info("Creating tax regions without a VAT rate. Finance must confirm VAT before cutover.")
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({ country_code, provider_id: "tp_system" })),
  })

  const { result: [stockLocation] } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [{
        name: "Barking UK",
        address: {
          address_1: "131a Movers Lane",
          city: "Barking",
          province: "Essex",
          postal_code: "IG11 7UQ",
          country_code: "gb",
        },
      }],
    },
  })

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "orp_orp" },
  })

  const fulfillment = container.resolve(ModuleRegistrationName.FULFILLMENT)
  const { data: shippingProfiles } = await query.graph({ entity: "shipping_profile", fields: ["id", "type"] })
  const shippingProfile = shippingProfiles[0]
  const international = countries.filter((code) => code !== "gb")
  const fulfillmentSet = await fulfillment.createFulfillmentSets({
    name: "Oxford Research Peptides delivery",
    type: "shipping",
    service_zones: [
      { name: "United Kingdom", geo_zones: [{ country_code: "gb", type: "country" }] },
      { name: "International", geo_zones: international.map((country_code) => ({ country_code, type: "country" })) },
    ],
  })

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  })

  const ukZone = fulfillmentSet.service_zones.find((zone) => zone.name === "United Kingdom")
  const worldZone = fulfillmentSet.service_zones.find((zone) => zone.name === "International")
  const optionBase = {
    price_type: "calculated" as const,
    provider_id: "orp_orp",
    shipping_profile_id: shippingProfile.id,
    prices: [{ currency_code: "gbp", amount: 0 }],
    rules: [
      { attribute: "enabled_in_store", value: "true", operator: "eq" },
      { attribute: "is_return", value: "false", operator: "eq" },
    ],
  }
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        ...optionBase,
        name: "UK Express",
        service_zone_id: ukZone.id,
        data: { method: "express" },
        type: { label: "UK Express", description: "1–2 days. Free from £12.", code: "uk-express" },
      },
      {
        ...optionBase,
        name: "UK Standard",
        service_zone_id: ukZone.id,
        data: { method: "standard" },
        type: { label: "UK Standard", description: "3–5 days. Free from £12.", code: "uk-standard" },
      },
      {
        ...optionBase,
        name: "International Shipping",
        service_zone_id: worldZone.id,
        data: { method: "international" },
        type: { label: "International", description: "Flat £15. Norway excluded.", code: "international" },
      },
    ],
  })

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [salesChannel.id] },
  })

  const { result: categories } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: [
        { name: "Research peptides", handle: "research-peptides", is_active: true },
        { name: "Laboratory supplies", handle: "laboratory-supplies", is_active: true },
      ],
    },
  })
  const peptideCategory = categories.find((category) => category.handle === "research-peptides")!
  const supplyCategory = categories.find((category) => category.handle === "laboratory-supplies")!

  const catalogue = JSON.parse(readFileSync(`${process.cwd()}/data/catalogue.json`, "utf8")) as { products: CatalogueProduct[] }
  const { result: products } = await createProductsWorkflow(container).run({
    input: {
      products: catalogue.products.map((product) => ({
        title: product.title,
        handle: product.handle,
        description: product.description,
        status: ProductStatus.PUBLISHED,
        shipping_profile_id: shippingProfile.id,
        category_ids: [product.handle === "bacteriostatic-water" ? supplyCategory.id : peptideCategory.id],
        sales_channels: [{ id: salesChannel.id }],
        thumbnail: product.image,
        images: [{ url: product.image }],
        metadata: {
          shopify_product_id: product.shopify_product_id,
          shopify_handle: product.shopify_handle,
          shopify_title: product.shopify_title,
          purity: product.purity,
          vendor: "Oxford Research Peptides",
          research_use_only: true,
          inventory_status: "unverified_public_catalogue",
        },
        options: [{ title: "Strength", values: [...new Set(product.variants.map((variant) => variant.option_value))] }],
        variants: product.variants.map((variant) => ({
          title: variant.title,
          sku: variant.sku,
          manage_inventory: false,
          options: { Strength: variant.option_value },
          prices: [{ amount: variant.price, currency_code: "gbp" }],
          metadata: {
            shopify_variant_id: variant.shopify_variant_id,
            inventory_status: "unverified_public_catalogue",
          },
        })),
      })),
    },
  })

  const bac = products.find((product) => product.handle === "bacteriostatic-water")
  const promotions = [
    promo("OXFORDWELCOME10", 10, true, "Confirmed 10% welcome offer, once per customer."),
    promo("OXFORD15", 15, false, "Percentage inferred from the code name. Confirm before cutover."),
    promo("WELCOMEBACK10", 10, false, "Percentage inferred from the code name. Confirm before cutover."),
    promo("COMEBACK20", 20, false, "Percentage inferred from the code name. Confirm before cutover."),
  ]
  await createPromotionsWorkflow(container).run({ input: { promotionsData: promotions } })
  if (bac) {
    await createPromotionsWorkflow(container).run({
      input: {
        promotionsData: [{
          code: "BACWATER2OFF",
          type: "standard",
          status: "active",
          is_automatic: false,
          metadata: { confirmed: true, note: "£2 off bacteriostatic water." },
          application_method: {
            type: "fixed",
            target_type: "items",
            allocation: "each",
            value: 2,
            max_quantity: 1,
            currency_code: "gbp",
            target_rules: [{ attribute: "items.product.id", operator: "in", values: [bac.id] }],
          },
        }],
      },
    })
  }

  await seedCoaRecords(container, logger, products)

  mkdirSync(`${process.cwd()}/data`, { recursive: true })
  writeFileSync(`${process.cwd()}/data/publishable-key.json`, JSON.stringify({
    publishable_key: publishableApiKey.token,
    region_id: region.id,
    sales_channel_id: salesChannel.id,
  }, null, 2))
  logger.info("Oxford Research Peptides seed completed. VAT is not configured.")
}

async function seedCoaRecords(container: MedusaContainer, logger: { info: (message: string) => void }, knownProducts?: Array<{ id: string; handle: string; variants?: Array<{ id: string; title?: string | null }> }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const coa = container.resolve(COA_MODULE) as {
    listCoaBatches: (filters: Record<string, unknown>) => Promise<Array<{ batch_number: string }>>
    createCoaBatches: (data: Record<string, unknown>) => Promise<{ id: string }>
    createCoaTests: (data: Record<string, unknown>) => Promise<unknown>
  }
  const entries = JSON.parse(readFileSync(`${process.cwd()}/data/coa.json`, "utf8")) as CoaEntry[]
  const existing = await coa.listCoaBatches({}).catch(() => [])
  const seen = new Set(existing.map((batch) => batch.batch_number))
  let products = knownProducts
  if (!products) {
    const { data } = await query.graph({ entity: "product", fields: ["id", "handle", "variants.id", "variants.title"] })
    products = data
  }
  for (const entry of entries) {
    if (seen.has(entry.batch)) continue
    const product = products.find((item) => item.handle === entry.handle)
    const variant = product?.variants?.find((item) => item.title === entry.option)
    if (!product) continue
    const batch = await coa.createCoaBatches({
      product_id: product.id,
      variant_id: variant?.id || null,
      batch_number: entry.batch,
      status: "current",
    })
    await coa.createCoaTests({
      batch_id: batch.id,
      purity: entry.purity,
      lab: "Janoshik Analytical",
      test_date: entry.date,
      document_url: entry.file,
      test_type: entry.test_type || "HPLC",
      status: "current",
    })
    seen.add(entry.batch)
  }
  logger.info(`COA batches recorded: ${seen.size}`)
}

function promo(code: string, value: number, once: boolean, note: string) {
  return {
    code,
    type: "standard" as const,
    status: "active" as const,
    is_automatic: false,
    metadata: { confirmed: code === "OXFORDWELCOME10", assumption: once ? null : "code-name", note },
    application_method: { type: "percentage" as const, target_type: "order" as const, allocation: "across" as const, value },
    ...(once ? {
      campaign: {
        name: code,
        campaign_identifier: code.toLowerCase(),
        description: "Once-per-customer is recorded in metadata. Guest baskets cannot supply customer_id, so the budget is not attribute-locked.",
        budget: { type: "usage" as const, currency_code: "gbp" },
      },
    } : {}),
  }
}
