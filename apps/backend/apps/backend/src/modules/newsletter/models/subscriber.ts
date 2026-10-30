import { model } from "@medusajs/framework/utils"

const Subscriber = model.define("subscriber", {
  id: model.id().primaryKey(),
  email: model.text().unique(),
  source: model.text().default("footer"),
  code: model.text().default("OXFORDWELCOME10"),
})

export default Subscriber
