import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { COA_MODULE } from "../../../modules/coa"

type CoaService = {
  listCoaBatches: (filters: Record<string, unknown>, config?: Record<string, unknown>) => Promise<unknown[]>
  createCoaBatches: (data: Record<string, unknown>) => Promise<{ id: string }>
  createCoaTests: (data: Record<string, unknown>) => Promise<unknown>
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productId = String(req.query.product_id || "")
  const coa = req.scope.resolve(COA_MODULE) as CoaService
  const batches = await coa.listCoaBatches(productId ? { product_id: productId } : {}, { relations: ["tests"] })
  res.json({ batches })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as {
    product_id: string
    variant_id?: string | null
    batch_number: string
    purity: string
    lab: string
    test_date: string
    document_url: string
    test_type?: string
    status?: "current" | "archived" | "pending"
  }
  const coa = req.scope.resolve(COA_MODULE) as CoaService
  const batch = await coa.createCoaBatches({
    product_id: body.product_id,
    variant_id: body.variant_id || null,
    batch_number: body.batch_number,
    status: body.status || "current",
  })
  const test = await coa.createCoaTests({
    batch_id: batch.id,
    purity: body.purity,
    lab: body.lab,
    test_date: body.test_date,
    document_url: body.document_url,
    test_type: body.test_type || "HPLC",
    status: body.status === "archived" ? "archived" : "current",
  })
  res.status(201).json({ batch, test })
}
