"use client";
// Browser-safe storage for a discount code captured from email links or typed in the cart.
import { useSyncExternalStore } from "react";

export const DISCOUNT_KEY = "orp_discount";
export const DISCOUNT_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const CODE_RE = /^[A-Z0-9_-]{1,40}$/;

export function normalizeDiscountCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toUpperCase();
  return CODE_RE.test(code) ? code : null;
}

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function getSavedDiscount(now = Date.now()): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DISCOUNT_KEY);
    if (!raw) return null;
    const { code, expires } = JSON.parse(raw) as { code?: string; expires?: number };
    if (!code || typeof expires !== "number" || expires <= now) {
      window.localStorage.removeItem(DISCOUNT_KEY);
      return null;
    }
    return normalizeDiscountCode(code);
  } catch {
    return null;
  }
}

export function saveDiscount(raw: unknown): string | null {
  const code = normalizeDiscountCode(raw);
  if (!code || typeof window === "undefined") return null;
  try {
    window.localStorage.setItem(DISCOUNT_KEY, JSON.stringify({ code, expires: Date.now() + DISCOUNT_TTL_MS }));
  } catch {}
  emit();
  return code;
}

export function clearDiscount() {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(DISCOUNT_KEY); } catch {}
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => { if (e.key === DISCOUNT_KEY) l(); };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(l); window.removeEventListener("storage", onStorage); };
}

export function useSavedDiscount(): string | null {
  return useSyncExternalStore(subscribe, () => getSavedDiscount(), () => null);
}

/** Reads ?discount= / ?discount_code= from a URL search string. */
export function discountFromSearch(search: string): string | null {
  const p = new URLSearchParams(search);
  return normalizeDiscountCode(p.get("discount") ?? p.get("discount_code"));
}
