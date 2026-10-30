import { AbstractPaymentProvider, PaymentSessionStatus } from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  ProviderWebhookPayload,
  WebhookActionResult,
} from "@medusajs/framework/types"

/**
 * Sandbox card provider. It never calls a payment network.
 * The storefront may submit only an approval flag and last4 — never a PAN.
 * Test approval is `data.approved === true` together with last4 4242.
 */
class SandboxPaymentProviderService extends AbstractPaymentProvider {
  static identifier = "sandbox"

  constructor(cradle: Record<string, unknown>, config?: Record<string, unknown>) {
    super(cradle, config)
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const incoming = (input.data || {}) as { approved?: boolean; last4?: string }
    if (incoming.approved !== true || incoming.last4 !== "4242") {
      throw new Error("Sandbox payment was not approved. Use the sandbox test card.")
    }
    const id = `sandbox_${Date.now()}`
    return {
      id,
      status: PaymentSessionStatus.PENDING,
      data: { id, sandbox: true, approved: true, last4: "4242", mode: "sandbox" },
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    const data = (input.data || {}) as { approved?: boolean; id?: string }
    if (data.approved !== true) {
      throw new Error("Sandbox payment is not approved.")
    }
    return { status: PaymentSessionStatus.AUTHORIZED, data: { ...data, authorized_at: new Date().toISOString() } }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return { data: { ...(input.data || {}), captured_at: new Date().toISOString(), sandbox: true } }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: { ...(input.data || {}), canceled_at: new Date().toISOString() } }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data || {} }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    const data = (input.data || {}) as { captured_at?: string; authorized_at?: string }
    if (data.captured_at) return { status: PaymentSessionStatus.CAPTURED }
    if (data.authorized_at) return { status: PaymentSessionStatus.AUTHORIZED }
    return { status: PaymentSessionStatus.PENDING }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return { data: { ...(input.data || {}), refunded_amount: input.amount, sandbox: true } }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return input.data || {}
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: { ...(input.data || {}), amount: input.amount } }
  }

  async getWebhookActionAndData(_payload: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    return { action: "not_supported" }
  }
}

export default SandboxPaymentProviderService
