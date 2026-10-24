export const NEWSLETTER_PROMPT_KEY = "orp_newsletter_prompt";
export const NEWSLETTER_DELAY_MS = 30_000;
export const NEWSLETTER_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

export function newsletterPageEligible(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/" || path === "/shop" || path === "/collections" || path.startsWith("/collections/");
}

export function newsletterEligible(pathname: string, cartItemCount: number, drawerOpen: boolean, ageConfirmed: boolean): boolean {
  return ageConfirmed && cartItemCount === 0 && !drawerOpen && newsletterPageEligible(pathname);
}

export function newsletterCooldownExpired(value: string | null, now: number): boolean {
  if (value === "subscribed") return false;
  if (!value) return true;
  const timestamp = Number(value);
  return !Number.isFinite(timestamp) || now - timestamp >= NEWSLETTER_COOLDOWN_MS;
}