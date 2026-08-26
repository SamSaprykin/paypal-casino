import type { WebsiteLocaleKey } from "../cms/locales";
import { localeIdForWebsiteLocale } from "../i18n/websiteLocaleBridge";

/** Resolve `${currentMonth}` / `${currentYear}` in editorial copy (headings, TOC). */
export function resolveCopyPlaceholders(
  text: string | undefined,
  locale: WebsiteLocaleKey,
): string | undefined {
  if (!text) return text;
  const now = new Date();
  const currentMonth = new Intl.DateTimeFormat(
    localeIdForWebsiteLocale(locale),
    { month: "long" },
  ).format(now);
  const currentYear = String(now.getFullYear());
  return text
    .replaceAll("${currentMonth}", currentMonth)
    .replaceAll("${currentYear}", currentYear);
}
