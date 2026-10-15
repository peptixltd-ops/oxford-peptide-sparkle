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
});