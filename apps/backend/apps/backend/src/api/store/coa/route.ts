import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { COA_MODULE } from "../../../modules/coa"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const handle = String(req.query.handle || "")
  const productId = String(req.query.product_id || "")
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  let resolved = productId
  if (!resolved && handle) {
    const { data } = await query.graph({
      entity: "product",
      fields: ["id", "handle"],
      filters: { handle },
    })
    resolved = data[0]?.id || ""
  }
  if (!resolved) {
    res.status(404).json({ batches: [] })
    return
  }
  const coa = req.scope.resolve(COA_MODULE) as {
    listCoaBatches: (filters: Record<string, unknown>, config?: Record<string, unknown>) => Promise<unknown[]>
  }
  const batches = await coa.listCoaBatches({ product_id: resolved }, { relations: ["tests"] })
  res.json({ product_id: resolved, batches })
}
