import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import OrpFulfillmentProviderService from "./service"

export default ModuleProvider(Modules.FULFILLMENT, {
  services: [OrpFulfillmentProviderService],
})
