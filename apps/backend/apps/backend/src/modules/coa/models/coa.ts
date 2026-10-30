import { model } from "@medusajs/framework/utils"

const CoaBatch = model.define("coa_batch", {
  id: model.id().primaryKey(),
  product_id: model.text().index(),
  variant_id: model.text().nullable(),
  batch_number: model.text(),
  status: model.enum(["current", "archived", "pending"]).default("current"),
  tests: model.hasMany(() => CoaTest, { mappedBy: "batch" }),
})

const CoaTest = model.define("coa_test", {
  id: model.id().primaryKey(),
  purity: model.text(),
  lab: model.text(),
  test_date: model.text(),
  document_url: model.text(),
  test_type: model.text().default("HPLC"),
  status: model.enum(["current", "archived"]).default("current"),
  batch: model.belongsTo(() => CoaBatch, { mappedBy: "tests" }),
})

export { CoaBatch, CoaTest }
