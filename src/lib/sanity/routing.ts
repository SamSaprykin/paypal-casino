import type { WebsiteLocaleKey } from "./locales";
import { WEBSITE_LOCALE_KEYS } from "./locales";

/**
 * Locale used by the legacy `/` route (still rendered by `src/pages/index.astro`).
 * All locales — including this one — are also served under their `/${langCode}/` path.
 */
export const ROOT_WEBSITE_LOCALE: WebsiteLocaleKey = "ireland";

/**
 * Canonical URL path prefix per locale. Every public URL is `/${LOCALE_PATH_PREFIX[locale]}/...`.
 * Keep aligned with what the CMS already uses for non-root locales.
 */
export const LOCALE_PATH_PREFIX: Record<WebsiteLocaleKey, string> = {
  ireland: "ie",
  denmark: "dk",
  finland: "fi",
  germany: "de",
  norway: "no",
  sweden: "se",
};

/**
 * Home slug per locale as stored on the shared Home document in Sanity.
 * Keep aligned with CMS; used for country selector links and fallbacks.
 */
export const HOME_CMS_SLUG: Record<WebsiteLocaleKey, string> = {
  ireland: "/",
  denmark: "/dk/",
  finland: "/fi/",
  germany: "/de/",
  norway: "/no/",
  sweden: "/se/",
};

export const WEBSITE_LOCALE_LABELS: Record<WebsiteLocaleKey, string> = {
  ireland: "Ireland",
  denmark: "Denmark",
  finland: "Finland",
  germany: "Germany",
  norway: "Norway",
  sweden: "Sweden",
};

/** Header nav labels per locale. Update here when copy needs tuning. */
export const NAV_LABELS: Record<
  WebsiteLocaleKey,
  { onlineCasino: string; paypalCasino: string }
> = {
  ireland: { onlineCasino: "Online Casino", paypalCasino: "Paypal Casino" },
  denmark: { onlineCasino: "Online Casino", paypalCasino: "Paypal Casino" },
  finland: { onlineCasino: "Nettikasino", paypalCasino: "Paypal-kasino" },
  germany: { onlineCasino: "Online Casino", paypalCasino: "Paypal Casino" },
  norway: { onlineCasino: "Nettkasino", paypalCasino: "Paypal Casino" },
  sweden: { onlineCasino: "Onlinecasino", paypalCasino: "Paypal Casino" },
};

export type WebsitePageLocalePath = {
  restPath: string;
  locale: WebsiteLocaleKey;
  cmsSlug: string;
};

/** Normalise Sanity slug strings to a leading/trailing slash form (except root `/`). */
export function normalizeCmsSlug(slug: string): string {
  const t = slug.trim();
  if (!t || t === "/") return "/";
  const noEdge = t.replace(/^\/+|\/+$/g, "");
  return `/${noEdge.split("/").filter(Boolean).join("/")}/`;
}

/** Astro `[...slug]` param (no leading/trailing slashes). Null means document maps to `/` only. */
export function cmsSlugToRestParam(cmsSlug: string): string | null {
  const norm = normalizeCmsSlug(cmsSlug);
  if (norm === "/") return null;
  return norm.replace(/^\/+|\/+$/g, "");
}

/** Public URL path with trailing slash (site uses trailingSlash: 'always'). Locale-agnostic. */
export function hrefFromCmsSlug(cmsSlug: string): string {
  const param = cmsSlugToRestParam(cmsSlug);
  return param ? `/${param}/` : "/";
}

/**
 * Astro `[...slug]` param including the locale path prefix.
 * Strips any leading `/${langCode}/` already in the CMS slug so we never double-prefix
 * (CMS data is inconsistent: home slugs like `/no/` already include it, sub-page slugs don't).
 */
export function cmsSlugToLocalizedRestParam(
  locale: WebsiteLocaleKey,
  cmsSlug: string,
): string {
  const norm = normalizeCmsSlug(cmsSlug);
  const langCode = LOCALE_PATH_PREFIX[locale];
  const prefix = `/${langCode}/`;
  let body = norm;
  if (body === prefix) body = "/";
  else if (body.startsWith(prefix)) body = `/${body.slice(prefix.length)}`;
  const rest = body.replace(/^\/+|\/+$/g, "");
  return rest ? `${langCode}/${rest}` : langCode;
}

/** Public URL with locale prefix, e.g. `/no/paypal-kasinoer-norge/` or `/ie/`. */
export function localizedHref(locale: WebsiteLocaleKey, cmsSlug: string): string {
  return `/${cmsSlugToLocalizedRestParam(locale, cmsSlug)}/`;
}

export function homeHrefForLocale(locale: WebsiteLocaleKey): string {
  return localizedHref(locale, HOME_CMS_SLUG[locale]);
}

/** URL path segments used in `src/pages/[lang]/...` (excludes Ireland — uses unprefixed routes). */
export const LOCALIZED_PAGE_LANG_CODES = ["dk", "fi", "de", "no", "se"] as const;

export type LocalizedPageLangCode = (typeof LOCALIZED_PAGE_LANG_CODES)[number];

const STATIC_LANG_TO_LOCALE: Record<LocalizedPageLangCode, WebsiteLocaleKey> = {
  dk: "denmark",
  fi: "finland",
  de: "germany",
  no: "norway",
  se: "sweden",
};

export function websiteLocaleFromPageLang(
  lang: string,
): WebsiteLocaleKey | undefined {
  return STATIC_LANG_TO_LOCALE[lang as LocalizedPageLangCode];
}

/**
 * Public URL for a non-CMS static path (e.g. `"contact-us"`, `"classic-games/tetris"`).
 * Ireland (root locale) has no `/ie/` prefix; other locales use `/{dk|fi|de|no|se}/`.
 */
export function localizedStaticPageHref(
  locale: WebsiteLocaleKey,
  relativePath: string,
): string {
  const trimmed = relativePath.replace(/^\/+|\/+$/g, "");
  if (locale === ROOT_WEBSITE_LOCALE) {
    return trimmed ? `/${trimmed}/` : `/`;
  }
  const prefix = LOCALE_PATH_PREFIX[locale];
  return trimmed ? `/${prefix}/${trimmed}/` : `/${prefix}/`;
}

export function isRootLocaleSlug(locale: WebsiteLocaleKey, cmsSlug: string): boolean {
  return locale === ROOT_WEBSITE_LOCALE && normalizeCmsSlug(cmsSlug) === "/";
}

export function flattenWebsitePagesLocalePaths(
  docs: Array<{ slug?: Partial<Record<WebsiteLocaleKey, string | null>> | null }>,
): WebsitePageLocalePath[] {
  const paths: WebsitePageLocalePath[] = [];

  for (const doc of docs) {
    if (!doc.slug) continue;
    for (const locale of WEBSITE_LOCALE_KEYS) {
      const raw = doc.slug[locale];
      if (raw == null || String(raw).trim() === "") continue;
      const cmsSlug = normalizeCmsSlug(String(raw));
      const restPath = cmsSlugToLocalizedRestParam(locale, cmsSlug);
      paths.push({ restPath, locale, cmsSlug });
    }
  }

  return paths;
}
