# Migration reconciliation

Source: public `products.json` filtered to vendor Oxford Research Peptides, compared with `src/lib/products.ts` and the Medusa database after seed.

| Check | Public ORP feed | Medusa |
| --- | --- | --- |
| Products | 18 | 18 |
| Semaglutide products | 0 | 0 |
| Other-brand products | 0 (rejected by the filter) | 0 |
| Retatrutide title | Shopify “Reta GLP”; site title RT GLP | RT GLP, Shopify title in metadata |
| Handles | Suffixed Shopify handles | Canonical site handles |
| Welcome and named codes | 5 codes | 5 promotions |
| COA batches from `src/lib/coa.ts` | 17 | 17 |
| Inventory quantities | Not in the public feed | `manage_inventory: false`, metadata `inventory_status=unverified_public_catalogue` |
| Customers | Not readable | 0 migrated |
| Orders | Not readable | 0 migrated. One sandbox dev order exists and is not a Shopify order |

## Variant notes

- SS-31 10mg (`ORP-SS31-10MG`, £44) is in Shopify and is now a Medusa variant. It was absent from the hardcoded product list.
- BPC-157 / TB-500 and KLOW keep their blend labels (`20mg blend`, `80mg blend`).
- Prices are major GBP units, matching Shopify (RT GLP 10mg = 45).

## Attribution rules tested on fixtures

| Fixture | Result |
| --- | --- |
| ORP-only order | import |
| Order with an ORP line and a Pondok Peptides line | flag-ambiguous, not imported |
| UKPeptideLabs-only order | skip |
| Customer with only ORP orders | import, `needs_activation` |
| Customer on a mixed order | flag-ambiguous |
| Customer with no ORP orders | skip |
| Non-`ORP-` inventory row | skip |

Unit tests: `node --test packages/config/shipping.test.mjs migration/shopify/filter.test.mjs` — 5 passed.

## Shipping checked against the running server

| Basket | Destination | Quoted |
| --- | --- | --- |
| Bacteriostatic water 3mL, £6 | GB Express | £3.99 |
| Bacteriostatic water 3mL, £6 | GB Standard | £5.99 |
| RT GLP 10mg, £45 | GB Express | £0.00 |
| Bacteriostatic water, £6 | US | £15.00 |
| Any | Norway | Address update rejected (country not on the region) |

Sandbox order `order_01M641XZMRHNGAE33Z8TXQSZSD`: goods £6.00, `OXFORDWELCOME10` −£0.60, shipping £3.99, total £9.39. No tax line. Receipt appended to the local outbox only.
