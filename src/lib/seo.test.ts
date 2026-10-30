import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { seo, seoText } from "./seo";
import { SEO_METADATA } from "./seo-metadata";

describe("SEO metadata rules", () => {
  test("titles stay at or below 60 characters with the full brand suffix", () => {
    for (const topic of ["X", "A long compound topic ".repeat(20), "X".repeat(100)]) {
      const result = seoText("/future-page", topic, "Research summary.");
      assert.ok(result.title.length <= 60);
      assert.ok(result.title.endsWith(" | Oxford Research Peptides"));
    }
  });
  test("descriptions stay at or below 155 characters", () => {
    assert.ok(seoText("/future-page", "Trial", "Trial evidence and limitations ".repeat(30)).description.length <= 155);
    for (const [path, entry] of Object.entries(SEO_METADATA)) {
      const result = seoText(path, entry.topic ?? "Topic", entry.description ?? "Summary.");
      assert.ok(result.title.length <= 60, path);
      assert.ok(result.description.length <= 155, path);
    }
  });
  test("shortening retains an explicit laboratory research restriction", () => {
    const result = seoText("/future-page", "Trial", `${"Evidence and limitations ".repeat(30)}For in-vitro laboratory research only.`);
    assert.ok(result.description.length <= 155);
    assert.match(result.description, /For laboratory research only\.$/);
  });
  test("shortening stops on a clause boundary instead of a dangling fragment", () => {
    const long = "Example peptide is a reference standard studied in receptor research. Purity ≥99% (HPLC Verified), Lyophilized Powder, Storage -20°C or lower. For in vitro research use only.";
    const result = seoText("/future-page", "Example", long);
    assert.ok(result.description.length <= 155, result.description);
    assert.ok(!/\([^)]*[.!?]$/.test(result.description), result.description);
    assert.match(result.description, /For laboratory research only\.$/);
  });
  test("search, Open Graph and Twitter use identical normalized values", () => {
    const result = seo({ path: "/future-page", title: "Trial evidence ".repeat(20), description: "Research evidence ".repeat(30) });
    const meta = result.meta;
    const title = meta.find((tag) => tag.title)?.title;
    const description = meta.find((tag) => tag.name === "description")?.content;
    assert.equal(meta.find((tag) => tag.property === "og:title")?.content, title);
    assert.equal(meta.find((tag) => tag.name === "twitter:title")?.content, title);
    assert.equal(meta.find((tag) => tag.property === "og:description")?.content, description);
    assert.equal(meta.find((tag) => tag.name === "twitter:description")?.content, description);
  });
  test("product social images use the product image on the canonical domain", () => {
    const image = "https://oxfordresearchpeptides.com/__l5e/assets-v1/product/semaglutide.webp";
    const result = seo({ path: "/products/semaglutide", title: "Semaglutide", description: "Laboratory research only.", ogImage: image });
    assert.equal(result.meta.find((tag) => tag.property === "og:image")?.content, image);
    assert.equal(result.meta.find((tag) => tag.name === "twitter:image")?.content, image);
  });
  test("non-product pages retain og-image.jpg for both social images", () => {
    const result = seo({ path: "/about", title: "About", description: "About Oxford Research Peptides." });
    assert.equal(result.meta.find((tag) => tag.property === "og:image")?.content, "https://oxfordresearchpeptides.com/og-image.jpg");
    assert.equal(result.meta.find((tag) => tag.name === "twitter:image")?.content, "https://oxfordresearchpeptides.com/og-image.jpg");
  });
});