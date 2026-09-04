import { WEBSITE_LOCALE_KEYS, type WebsiteLocaleKey } from "../cms/locales";
import {
  localizedHref,
  normalizeCmsSlug,
  ROOT_WEBSITE_LOCALE,
} from "../cms/routing";
import { localeIdForWebsiteLocale } from "../i18n/websiteLocaleBridge";
import { toAbsoluteUrl } from "./site";

export type HreflangLink = { lang: string; href: string };

/**
 * One `hreflang` row per localized URL, plus `x-default` pointing at Ireland
 * when that variant exists (otherwise the first available URL).
 */
export function hreflangFromLocaleHrefs(
  hrefs: Partial<Record<WebsiteLocaleKey, string>> | undefined,
): HreflangLink[] {
  if (!hrefs) return [];

  const links: HreflangLink[] = [];
  for (const locale of WEBSITE_LOCALE_KEYS) {
    const href = hrefs[locale];
    if (!href?.trim()) continue;
    links.push({
      lang: localeIdForWebsiteLocale(locale),
      href: toAbsoluteUrl(href),
    });
  }
  if (links.length === 0) return [];

  const xDefault = hrefs[ROOT_WEBSITE_LOCALE] || Object.values(hrefs).find(Boolean);
  if (xDefault) {
    links.push({ lang: "x-default", href: toAbsoluteUrl(xDefault) });
  }
  return links;
}

export function hreflangFromLocalizedSlugs(
  slugs: Partial<Record<WebsiteLocaleKey, string>> | undefined,
): HreflangLink[] {
  if (!slugs) return [];
  const hrefs: Partial<Record<WebsiteLocaleKey, string>> = {};
  for (const locale of WEBSITE_LOCALE_KEYS) {
    const raw = slugs[locale];
    if (!raw?.trim()) continue;
    hrefs[locale] = localizedHref(locale, normalizeCmsSlug(raw));
  }
  return hreflangFromLocaleHrefs(hrefs);
}

/** English-only utility pages that share one URL across the country selector. */
export function selfHreflang(canonicalPath: string, lang: string): HreflangLink[] {
  const href = toAbsoluteUrl(canonicalPath);
  return [
    { lang, href },
    { lang: "x-default", href },
  ];
}
