export const AGE_CONFIRMATION_KEY = "orp_age_confirmed";

// Only an explicit checkbox confirmation grants entry.
export function isAgeConfirmed(value: unknown): value is true {
  return value === true;
}