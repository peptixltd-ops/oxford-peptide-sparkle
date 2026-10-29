/** Keep in sync with packages/config/shipping.mjs. Amounts are major GBP units. */

const FREE_FROM = 12

export function quoteShipping(subtotal: number, country: string, method = "express") {
  const code = String(country || "").trim().toUpperCase()
  const goods = Number(subtotal)
  if (!Number.isFinite(goods) || goods < 0) throw new Error("A valid goods subtotal is required to quote shipping.")
  if (!code) throw new Error("A destination country is required.")
  if (code === "NO") throw new Error("Shipping to Norway is not available.")
  if (code === "RU" || code === "BY") throw new Error("Shipping to Russia and Belarus is not available.")
  if (code !== "GB") {
    return { country: code, method: "international", amount: 15, label: "International Shipping" }
  }
  const selected = method === "standard" ? "standard" : "express"
  const paid = selected === "standard" ? 5.99 : 3.99
  const amount = goods >= FREE_FROM ? 0 : paid
  const label = selected === "standard" ? "UK Standard" : "UK Express"
  return { country: code, method: selected, amount, label: amount === 0 ? `${label} (free over £12)` : label }
}

export function goodsSubtotal(context: { items?: Array<{ unit_price?: unknown; quantity?: unknown }>; item_total?: unknown }) {
  if (context?.item_total != null && context.item_total !== "") {
    const total = Number(context.item_total)
    if (Number.isFinite(total)) return total
  }
  return (context?.items || []).reduce((sum, item) => {
    const unit = Number(item.unit_price ?? 0)
    const qty = Number(item.quantity ?? 0)
    return sum + (Number.isFinite(unit) ? unit : 0) * (Number.isFinite(qty) ? qty : 0)
  }, 0)
}
