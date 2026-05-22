import type { WebsiteLocaleKey } from "../sanity/locales";
import type { LocaleId } from "./locales";

export const WEBSITE_LOCALE_TO_LOCALE_ID: Record<WebsiteLocaleKey, LocaleId> = {
  ireland: "en-IE",
  sweden: "sv-SE",
  denmark: "da-DK",
  finland: "fi-FI",
  germany: "de-DE",
  norway: "nb-NO",
};

export function localeIdForWebsiteLocale(locale: WebsiteLocaleKey): LocaleId {
  return WEBSITE_LOCALE_TO_LOCALE_ID[locale];
}
