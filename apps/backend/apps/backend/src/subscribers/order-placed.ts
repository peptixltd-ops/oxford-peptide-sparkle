import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function orderPlacedHandler({ event, container }: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const notification = container.resolve(Modules.NOTIFICATION)
  const { data } = await query.graph({
    entity: "order",
    fields: ["id", "email", "display_id", "total"],
    filters: { id: event.data.id },
  })
  const order = data[0]
  if (!order?.email) return
  await notification.createNotifications({
    to: order.email,
    channel: "email",
    template: "order.placed",
    data: { order_id: order.id, display_id: order.display_id, total: order.total },
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
