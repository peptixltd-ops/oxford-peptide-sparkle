import { Module } from "@medusajs/framework/utils"
import CoaModuleService from "./service"

export const COA_MODULE = "coa"

export default Module(COA_MODULE, {
  service: CoaModuleService,
})
