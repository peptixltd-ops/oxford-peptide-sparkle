import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { COUNTRIES, customerSchema } from "./niftipay-customer";
import { niftiPayShipping } from "./niftipay-shipping";

const customer = { name: "Test Researcher", email: "researcher@example.com", phone: "+442012345678", address1: "12 Test Street", city: "London", postcode: "SW1A 1AA", country: "GB" };

describe("NiftiPay delivery rules", () => {
  test("all 249 ISO destinations except RU/BY are accepted, with GB first and others alphabetical", () => {
    assert.equal(COUNTRIES.length, 247);
    assert.deepEqual(COUNTRIES[0], ["GB", "United Kingdom"]);
    const names = COUNTRIES.slice(1).map(([, name]) => name);
    assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, "en")));
    assert.equal(new Set(COUNTRIES.map(([code]) => code)).size, 247);
    for (const [code] of COUNTRIES) {
      assert.match(code, /^[A-Z]{2}$/);
      assert.equal(customerSchema.safeParse({ ...customer, country: code, region: "Test Region" }).success, true);
    }
  });
  test("Russia and Belarus are rejected with a clear error", () => {
    for (const country of ["RU", "BY"]) {
      const result = customerSchema.safeParse({ ...customer, country });
      assert.equal(result.success, false);
      if (!result.success) assert.match(result.error.issues[0].message, /Russia and Belarus/);
      assert.throws(() => niftiPayShipping(100, country), /Russia and Belarus/);
    }
    assert.equal(customerSchema.safeParse({ ...customer, country: "XX" }).success, false);
  });
  test("UK Express remains £3.99 below £20 and free from £20", () => {
    assert.equal(niftiPayShipping(19.99, "GB", "express"), 3.99);
    assert.equal(niftiPayShipping(20, "GB", "express"), 0);
    assert.equal(niftiPayShipping(50, "GB"), 0);
  });
  test("UK Standard is £5.99 below £30 and free from £30", () => {
    assert.equal(niftiPayShipping(29.99, "GB", "standard"), 5.99);
    assert.equal(niftiPayShipping(30, "GB", "standard"), 0);
  });
  test("every eligible international destination costs £15 without a free threshold", () => {
    for (const [country] of COUNTRIES.slice(1)) {
      for (const subtotal of [0, 20, 30, 10000]) {
        assert.equal(niftiPayShipping(subtotal, country, "express"), 15);
        assert.equal(niftiPayShipping(subtotal, country, "standard"), 15);
      }
    }
  });
  test("US, CA and AU require a nonblank region; other countries do not", () => {
    for (const country of ["US", "CA", "AU"]) {
      assert.equal(customerSchema.safeParse({ ...customer, country }).success, false);
      assert.equal(customerSchema.safeParse({ ...customer, country, region: "  " }).success, false);
      assert.equal(customerSchema.safeParse({ ...customer, country, region: "California" }).success, true);
    }
    assert.equal(customerSchema.safeParse(customer).success, true);
    assert.equal(customerSchema.safeParse({ ...customer, country: "FR" }).success, true);
  });
});