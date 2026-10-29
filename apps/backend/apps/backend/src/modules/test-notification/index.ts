import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import TestNotificationProviderService from "./service"

export default ModuleProvider(Modules.NOTIFICATION, {
  services: [TestNotificationProviderService],
})
