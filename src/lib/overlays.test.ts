import { test } from "node:test";
import assert from "node:assert/strict";
import { stickyBarVisible } from "./overlays";

const base = { mainButtonVisible: false, drawerOpen: false, cookieBannerOpen: false, ageConfirmed: true };
test("shows once main button is out of view", () => assert.equal(stickyBarVisible(base), true));
test("hidden while main button visible", () => assert.equal(stickyBarVisible({ ...base, mainButtonVisible: true }), false));
test("hidden while cart drawer open", () => assert.equal(stickyBarVisible({ ...base, drawerOpen: true }), false));
test("hidden while cookie banner open", () => assert.equal(stickyBarVisible({ ...base, cookieBannerOpen: true }), false));
test("hidden before age confirmation", () => assert.equal(stickyBarVisible({ ...base, ageConfirmed: false }), false));
