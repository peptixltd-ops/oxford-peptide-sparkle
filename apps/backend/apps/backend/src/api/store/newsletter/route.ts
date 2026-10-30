import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { NEWSLETTER_MODULE } from "../../../modules/newsletter"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE = "OXFORDWELCOME10"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = (req.body || {}) as { email?: string; source?: string; website?: string }
  if (body.website) {
    res.json({ success: true, code: CODE })
    return
  }
  const email = String(body.email || "").trim().toLowerCase()
  if (!EMAIL.test(email) || email.length > 255) {
    res.status(400).json({ success: false, error: "Please enter a valid email address." })
    return
  }
  const newsletter = req.scope.resolve(NEWSLETTER_MODULE) as {
    listSubscribers: (filters: Record<string, unknown>) => Promise<Array<{ email: string; code: string }>>
    createSubscribers: (data: Record<string, unknown>) => Promise<unknown>
  }
  const existing = await newsletter.listSubscribers({ email })
  if (!existing.length) {
    await newsletter.createSubscribers({ email, source: body.source || "footer", code: CODE })
  }
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["id", "email"],
    filters: { email },
  })
  res.json({
    success: true,
    code: existing[0]?.code || CODE,
    customer_linked: Boolean(customers[0]),
  })
}
