import { expect, test } from "bun:test";
import { stickyBarVisible } from "./overlays";

const base = { mainButtonVisible: false, drawerOpen: false, cookieBannerOpen: false, ageConfirmed: true };
test("shows once main button is out of view", () => expect(stickyBarVisible(base)).toBe(true));
test("hidden while main button visible", () => expect(stickyBarVisible({ ...base, mainButtonVisible: true })).toBe(false));
test("hidden while cart drawer open", () => expect(stickyBarVisible({ ...base, drawerOpen: true })).toBe(false));
test("hidden while cookie banner open", () => expect(stickyBarVisible({ ...base, cookieBannerOpen: true })).toBe(false));
test("hidden before age confirmation", () => expect(stickyBarVisible({ ...base, ageConfirmed: false })).toBe(false));
