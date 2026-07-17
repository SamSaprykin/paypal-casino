/** Locale keys used across website pages and casino content. */
export const WEBSITE_LOCALE_KEYS = [
  "denmark",
  "finland",
  "germany",
  "ireland",
  "norway",
  "sweden",
] as const;

export type WebsiteLocaleKey = (typeof WEBSITE_LOCALE_KEYS)[number];

export function isWebsiteLocaleKey(value: string): value is WebsiteLocaleKey {
  return (WEBSITE_LOCALE_KEYS as readonly string[]).includes(value);
}
