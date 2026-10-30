import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import type { NotificationTypes } from "@medusajs/framework/types"
import { appendFileSync, mkdirSync, readFileSync, existsSync } from "node:fs"
import { dirname } from "node:path"

type Options = { outboxPath?: string }

/**
 * Test-mode email provider. Messages are appended to a local outbox and never
 * leave the machine. Duplicate idempotency keys are recorded once.
 */
class TestNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "test-email"
  protected outbox_: string

  constructor(_: Record<string, unknown>, options: Options = {}) {
    super()
    this.outbox_ = options.outboxPath || process.env.EMAIL_OUTBOX || `${process.cwd()}/data/email-outbox.jsonl`
  }

  async send(notification: NotificationTypes.ProviderSendNotificationDTO) {
    const key = `${notification.template}:${notification.to}:${JSON.stringify(notification.data || {})}`
    mkdirSync(dirname(this.outbox_), { recursive: true })
    const existing = existsSync(this.outbox_) ? readFileSync(this.outbox_, "utf8") : ""
    if (existing.includes(`"dedupe":${JSON.stringify(key)}`)) {
      return { id: `deduped:${key}` }
    }
    const row = {
      at: new Date().toISOString(),
      dedupe: key,
      to: notification.to,
      channel: notification.channel,
      template: notification.template,
      data: notification.data || {},
      mode: "test",
    }
    appendFileSync(this.outbox_, `${JSON.stringify(row)}\n`)
    return { id: key }
  }
}

export default TestNotificationProviderService
