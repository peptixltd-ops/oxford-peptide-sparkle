/**
 * Release 3.1 — Editorial & EEAT framework barrel.
 *
 * Every editorial page imports from `@/lib/editorial`. Individual modules
 * (`authors`, `policies`, `citations`, `revisions`) can be imported directly
 * for tree-shaking, but this barrel keeps route/component code readable.
 */

export * from "./authors";
export * from "./policies";
export * from "./citations";
export * from "./revisions";
