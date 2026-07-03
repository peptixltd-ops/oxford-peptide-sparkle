/**
 * Scientific Publishing Component Library — Release 2.0 → 4.1
 *
 * Central barrel for reusable publishing components used across guides,
 * compound monographs, methodology pages, literature reviews, comparisons,
 * glossary entries, and future educational resources.
 *
 * All components:
 *  - accept structured props
 *  - inherit brand tokens (navy / gold / bone) via CSS variables
 *  - support dark mode via the .dark variant
 *  - avoid hardcoded scientific content
 */

export * from "./types";
export * from "./primitives";
export * from "./evidence";
export * from "./callouts";
export * from "./references";
export * from "./figures";
export * from "./editorial";
export * from "./article";
export * from "./styling";

// Release 4.1 additions
export * from "./scientific-figures";
export * from "./evidence-matrix";
export * from "./enhanced-references";
export * from "./article-utilities";
export * from "./ai-readability";
