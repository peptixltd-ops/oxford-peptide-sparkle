import { MedusaService } from "@medusajs/framework/utils"
import { CoaBatch, CoaTest } from "./models/coa"

class CoaModuleService extends MedusaService({
  CoaBatch,
  CoaTest,
}) {}

export default CoaModuleService
