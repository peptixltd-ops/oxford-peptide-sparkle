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

/** Sticky product bar shows only when no other overlay could be covered. */
export function stickyBarVisible(o: { mainButtonVisible: boolean; drawerOpen: boolean; cookieBannerOpen: boolean; ageConfirmed: boolean }) {
  return o.ageConfirmed && !o.mainButtonVisible && !o.drawerOpen && !o.cookieBannerOpen;
}
