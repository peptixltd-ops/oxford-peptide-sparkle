import { test, expect } from "@playwright/test";

async function enter(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "ENTER" }).click();
  await page.getByRole("button", { name: "REJECT" }).click();
}

test("home shop product cart and sandbox checkout", async ({ page }, testInfo) => {
  await enter(page);
  await expect(page.getByRole("heading", { name: /Gold Standard/i })).toBeVisible();
  await expect(page.getByRole("img", { name: /research vials/i })).toBeVisible();
  const shot = (name: string) => page.screenshot({ path: `/workspace/artifacts/screenshots/${testInfo.project.name}-${name}.png`, fullPage: true });
  await shot("home");
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: "Shop", exact: true })).toBeVisible();
  await expect(page.getByText("RT GLP").first()).toBeVisible();
  await expect(page.getByText(/Semaglutide/i)).toHaveCount(0);
  await shot("shop");
  await page.goto("/products/retatrutide");
  await expect(page.getByRole("heading", { name: "RT GLP" })).toBeVisible();
  await expect(page.getByText("ORP-RETATRUTIDE-10MG")).toBeVisible();
  await shot("product");
  await Promise.all([
    page.waitForResponse((response) => response.url().includes("/api/cart") && response.request().method() === "POST" && response.ok()),
    page.getByRole("button", { name: "ADD TO BASKET" }).first().click(),
  ]);
  await expect(page.getByText("Your basket")).toBeVisible();
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Basket" })).toBeVisible();
  await shot("cart");
  await page.goto("/checkout");
  const checkout = page.locator("main");
  await checkout.getByLabel("Email").fill("playwright.buyer@example.com");
  await checkout.getByLabel("First name").fill("Play");
  await checkout.getByLabel("Last name").fill("Wright");
  await checkout.getByLabel("Address").fill("131a Movers Lane");
  await checkout.getByLabel("City").fill("Barking");
  await checkout.getByLabel("Postcode").fill("IG11 7UQ");
  await page.getByLabel("Sandbox card number").fill("4242424242424242");
  await page.getByLabel("Expiry").fill("12/30");
  await page.getByLabel("CVC").fill("123");
  await shot("checkout");
  if (testInfo.project.name === "desktop") {
    await page.getByRole("button", { name: "PLACE SANDBOX ORDER" }).click();
    await expect(page.getByRole("heading", { name: "Order received" })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(/does not mark anything as paid/i)).toBeVisible();
  }
});

test("retired semaglutide product redirects and research article remains", async ({ page }) => {
  await page.goto("/products/semaglutide");
  await expect(page).toHaveURL(/\/shop$/);
  await enter(page);
  await page.goto("/compounds/semaglutide");
  await expect(page.getByText(/not sold/i)).toBeVisible();
});

test("discount link stores the code without typing", async ({ page }) => {
  await page.goto("/discount/OXFORDWELCOME10");
  await expect(page).toHaveURL(/discount=OXFORDWELCOME10/);
});

test("staging robots disallow indexing", async ({ request }) => {
  const response = await request.get("/robots.txt");
  const body = await response.text();
  expect(body).toContain("Disallow: /");
});
