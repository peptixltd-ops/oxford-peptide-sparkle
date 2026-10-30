"use client";
import { useSyncExternalStore } from "react";

/** Browser-safe registry of which bottom/blocking overlays are currently shown,
 *  so sticky bars and popups can stay out of each other's way. */
type OverlayName = "cookieBanner" | "ageGate";
// The age gate counts as open until the visitor has confirmed.
const state: Record<OverlayName, boolean> = { cookieBanner: false, ageGate: true };
const listeners = new Set<() => void>();

export function setOverlayOpen(name: OverlayName, open: boolean) {
  if (state[name] === open) return;
  state[name] = open;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useOverlayOpen(name: OverlayName): boolean {
  return useSyncExternalStore(subscribe, () => state[name], () => name === "ageGate");
}

/** Height in px of the bottom-most fixed layer (the product page's sticky Add to
 *  cart bar), so floating buttons can sit above it instead of overlapping it. */
let bottomLayerHeight = 0;

export function setBottomLayerHeight(px: number) {
  const next = Number.isFinite(px) && px > 0 ? Math.round(px) : 0;
  if (bottomLayerHeight === next) return;
  bottomLayerHeight = next;
  listeners.forEach((l) => l());
}

export function getBottomLayerHeight(): number {
  return bottomLayerHeight;
}

export function useBottomLayerHeight(): number {
  return useSyncExternalStore(subscribe, getBottomLayerHeight, () => 0);
}

/** Sticky product bar shows only when no other overlay could be covered. */
export function stickyBarVisible(o: { mainButtonVisible: boolean; drawerOpen: boolean; cookieBannerOpen: boolean; ageConfirmed: boolean }) {
  return o.ageConfirmed && !o.mainButtonVisible && !o.drawerOpen && !o.cookieBannerOpen;
}
