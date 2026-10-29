import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import SandboxPaymentProviderService from "./service"

export default ModuleProvider(Modules.PAYMENT, {
  services: [SandboxPaymentProviderService],
})
