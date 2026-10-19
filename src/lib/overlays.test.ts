import { test } from "node:test";
import assert from "node:assert/strict";
import { getBottomLayerHeight, setBottomLayerHeight, stickyBarVisible } from "./overlays";

const base = { mainButtonVisible: false, drawerOpen: false, cookieBannerOpen: false, ageConfirmed: true };
test("shows once main button is out of view", () => assert.equal(stickyBarVisible(base), true));
test("hidden while main button visible", () => assert.equal(stickyBarVisible({ ...base, mainButtonVisible: true }), false));
test("hidden while cart drawer open", () => assert.equal(stickyBarVisible({ ...base, drawerOpen: true }), false));
test("hidden while cookie banner open", () => assert.equal(stickyBarVisible({ ...base, cookieBannerOpen: true }), false));
test("hidden before age confirmation", () => assert.equal(stickyBarVisible({ ...base, ageConfirmed: false }), false));
test("sticky bar height is published for floating buttons", () => {
  setBottomLayerHeight(64.4);
  assert.equal(getBottomLayerHeight(), 64);
});
test("non-positive or unusable bar heights fall back to zero", () => {
  setBottomLayerHeight(-10);
  assert.equal(getBottomLayerHeight(), 0);
  setBottomLayerHeight(NaN);
  assert.equal(getBottomLayerHeight(), 0);
});
