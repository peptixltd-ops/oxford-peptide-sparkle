import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils"
import { goodsSubtotal, quoteShipping } from "../../lib/shipping"

class OrpFulfillmentProviderService extends AbstractFulfillmentProviderService {
  static identifier = "orp"

  async getFulfillmentOptions() {
    return [
      { id: "uk-express", method: "express" },
      { id: "uk-standard", method: "standard" },
      { id: "international", method: "international" },
    ]
  }

  async validateOption(data: Record<string, unknown>) {
    return ["express", "standard", "international"].includes(String(data?.method || data?.id))
  }

  async validateFulfillmentData(optionData: Record<string, unknown>, data: Record<string, unknown>) {
    return { ...optionData, ...data }
  }

  async canCalculate() {
    return true
  }

  async calculatePrice(optionData: Record<string, unknown>, data: Record<string, unknown>, context: Record<string, unknown>) {
    const method = String(optionData?.method || data?.method || "express")
    const address = (context?.shipping_address || {}) as { country_code?: string }
    const quote = quoteShipping(
      goodsSubtotal(context as { items?: Array<{ unit_price?: unknown; quantity?: unknown }>; item_total?: unknown }),
      address.country_code || "",
      method,
    )
    return { calculated_amount: quote.amount, is_calculated_price_tax_inclusive: false }
  }

  async createFulfillment() {
    return { data: {}, labels: [] }
  }

  async cancelFulfillment() {
    return {}
  }
}

export default OrpFulfillmentProviderService
