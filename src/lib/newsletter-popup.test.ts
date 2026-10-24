import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { NEWSLETTER_DELAY_MS, NEWSLETTER_COOLDOWN_MS, newsletterEligible, newsletterCooldownExpired } from "./newsletter-popup";

describe("newsletter popup rules", () => {
  test("waits 30 seconds", () => assert.equal(NEWSLETTER_DELAY_MS, 30_000));
  test("only allows homepage and shopping collections", () => {
    for (const path of ["/", "/shop", "/shop/", "/collections/peptides"]) assert.equal(newsletterEligible(path, 0, false, true), true);
    for (const path of ["/products/retatrutide", "/products/bpc-157", "/cart", "/cart/", "/about", "/research-hub/collections/research"]) assert.equal(newsletterEligible(path, 0, false, true), false);
  });
  test("never shows with one or more cart items", () => {
    for (const count of [1, 2, 10]) assert.equal(newsletterEligible("/", count, false, true), false);
  });
  test("never shows while the cart drawer is open", () => assert.equal(newsletterEligible("/shop", 0, true, true), false));
  test("never shows before age confirmation", () => assert.equal(newsletterEligible("/", 0, false, false), false));
  test("suppresses impressions/dismissals for 30 days", () => {
    const timestamp = 1_000_000;
    assert.equal(NEWSLETTER_COOLDOWN_MS, 30 * 24 * 60 * 60 * 1000);
    assert.equal(newsletterCooldownExpired(String(timestamp), timestamp + NEWSLETTER_COOLDOWN_MS - 1), false);
    assert.equal(newsletterCooldownExpired(String(timestamp), timestamp + NEWSLETTER_COOLDOWN_MS), true);
    assert.equal(newsletterCooldownExpired(null, timestamp), true);
  });
  test("never prompts subscribed visitors again", () => assert.equal(newsletterCooldownExpired("subscribed", Number.MAX_SAFE_INTEGER), false));
});