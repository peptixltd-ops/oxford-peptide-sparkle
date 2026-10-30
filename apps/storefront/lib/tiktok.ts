export type TikTokContent = Record<string, string | number | undefined>;

export function tiktokEnabled() {
  return false;
}
export function tiktokSetConsent(_value: "accepted" | "rejected") {}
export function tiktokPage() {}
export function tiktokTrack(..._args: unknown[]) {}
export function tiktokAttribution() {
  return { ttclid: null as string | null, ttp: null as string | null };
}
