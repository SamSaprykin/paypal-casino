import type { WebsiteLocaleKey } from "./locales";
import { WEBSITE_LOCALE_KEYS } from "./locales";

/**
 * Locale used by the legacy `/` route (rendered by `src/pages/index.astro`).
 * Ireland pages live at unprefixed paths (`/`, `/paypal-casino-ireland/`, etc.).
 */
export const ROOT_WEBSITE_LOCALE: WebsiteLocaleKey = "ireland";

/**
 * URL path prefix for non-root locales (`/dk/`, `/fi/`, …).
 * Ireland uses unprefixed paths at the site root (no `/ie/` segment).
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
  denmark: "Danmark",
  finland: "Suomi",
  germany: "Deutschland",
  norway: "Norge",
  sweden: "Sverige",
};

/** Header nav labels per locale. Update here when copy needs tuning. */
export type NavLabelSet = {
  onlineCasino: string;
  paypalCasino: string;
  newCasinos: string;
  bonuses: string;
  fastPayoutCasinos: string;
  mobileCasinos: string;
};

export const NAV_LABELS: Record<
  WebsiteLocaleKey,
  NavLabelSet & { short: NavLabelSet }
> = {
  ireland: {
    onlineCasino: "Online Casino",
    paypalCasino: "Paypal Casino",
    newCasinos: "New Casinos",
    bonuses: "Bonuses",
    fastPayoutCasinos: "Fast Payout",
    mobileCasinos: "Mobile Casinos",
    short: {
      onlineCasino: "Home",
      paypalCasino: "PayPal",
      newCasinos: "New",
      bonuses: "Bonuses",
      fastPayoutCasinos: "Payouts",
      mobileCasinos: "Mobile",
    },
  },
  denmark: {
    onlineCasino: "Online Casino",
    paypalCasino: "Paypal Casino",
    newCasinos: "Nye kasinoer",
    bonuses: "Bonusser",
    fastPayoutCasinos: "Hurtig udbetaling",
    mobileCasinos: "Mobil casinoer",
    short: {
      onlineCasino: "Forside",
      paypalCasino: "PayPal",
      newCasinos: "Nye",
      bonuses: "Bonus",
      fastPayoutCasinos: "Udbetaling",
      mobileCasinos: "Mobil",
    },
  },
  finland: {
    onlineCasino: "Nettikasino",
    paypalCasino: "Paypal-kasino",
    newCasinos: "Uudet kasinot",
    bonuses: "Bonukset",
    fastPayoutCasinos: "Nopeat kotiutukset",
    mobileCasinos: "Mobiilikasinot",
    short: {
      onlineCasino: "Etusivu",
      paypalCasino: "PayPal",
      newCasinos: "Uudet",
      bonuses: "Bonukset",
      fastPayoutCasinos: "Kotiutukset",
      mobileCasinos: "Mobiili",
    },
  },
  germany: {
    onlineCasino: "Online Casino",
    paypalCasino: "Paypal Casino",
    newCasinos: "Neue Casinos",
    bonuses: "Bonus",
    fastPayoutCasinos: "Schnelle Auszahlung",
    mobileCasinos: "Handy-Casinos",
    short: {
      onlineCasino: "Start",
      paypalCasino: "PayPal",
      newCasinos: "Neue",
      bonuses: "Bonus",
      fastPayoutCasinos: "Auszahlung",
      mobileCasinos: "Handy",
    },
  },
  norway: {
    onlineCasino: "Nettkasino",
    paypalCasino: "Paypal Casino",
    newCasinos: "Nye kasinoer",
    bonuses: "Bonuser",
    fastPayoutCasinos: "Rask utbetaling",
    mobileCasinos: "Mobilkasinoer",
    short: {
      onlineCasino: "Hjem",
      paypalCasino: "PayPal",
      newCasinos: "Nye",
      bonuses: "Bonus",
      fastPayoutCasinos: "Utbetaling",
      mobileCasinos: "Mobil",
    },
  },
  sweden: {
    onlineCasino: "Onlinecasino",
    paypalCasino: "Paypal Casino",
    newCasinos: "Nya casinon",
    bonuses: "Bonusar",
    fastPayoutCasinos: "Snabb utbetalning",
    mobileCasinos: "Mobilcasinon",
    short: {
      onlineCasino: "Start",
      paypalCasino: "PayPal",
      newCasinos: "Nya",
      bonuses: "Bonus",
      fastPayoutCasinos: "Utbetalning",
      mobileCasinos: "Mobil",
    },
  },
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
 * Astro `[...slug]` param including locale path prefix when needed.
 * Strips any leading `/${langCode}/` already in the CMS slug so we never double-prefix
 * (CMS data is inconsistent: home slugs like `/no/` already include it, sub-page slugs don't).
 * Ireland (root locale) omits the `/ie/` prefix — home maps to `""`, pages to `paypal-casino-ireland`, etc.
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
  if (locale === ROOT_WEBSITE_LOCALE) return rest;
  return rest ? `${langCode}/${rest}` : langCode;
}

/** Public URL with locale prefix when needed, e.g. `/no/paypal-kasinoer-norge/` or `/paypal-casino-ireland/`. */
export function localizedHref(
  locale: WebsiteLocaleKey,
  cmsSlug: string,
): string {
  const rest = cmsSlugToLocalizedRestParam(locale, cmsSlug);
  return rest ? `/${rest}/` : "/";
}

export function homeHrefForLocale(locale: WebsiteLocaleKey): string {
  return localizedHref(locale, HOME_CMS_SLUG[locale]);
}

/** URL path segments used in `src/pages/[lang]/...` (excludes Ireland — uses unprefixed routes). */
export const LOCALIZED_PAGE_LANG_CODES = [
  "dk",
  "fi",
  "de",
  "no",
  "se",
] as const;

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

/**
 * Localized URL path segment for casino routes (listing + detail).
 * e.g. ireland → `casino`, denmark → `kasino`.
 * Keep aligned with public URLs and future `/casino/` listing pages.
 */
export const CASINO_URL_SEGMENT: Record<WebsiteLocaleKey, string> = {
  ireland: "casino",
  denmark: "kasino",
  finland: "kasino",
  germany: "casino",
  norway: "kasino",
  sweden: "casino",
};

export function casinoUrlSegmentForLocale(locale: WebsiteLocaleKey): string {
  return CASINO_URL_SEGMENT[locale];
}

/** Public URL for a casino detail page, e.g. `/casino/bet365/` or `/dk/kasino/bet365/`. */
export function localizedCasinoDetailHref(
  locale: WebsiteLocaleKey,
  casinoSlug: string,
): string {
  const slug = casinoSlug.replace(/^\/+|\/+$/g, "");
  const segment = casinoUrlSegmentForLocale(locale);
  return localizedStaticPageHref(locale, `${segment}/${slug}`);
}

/** Public URL for the casino listing hub (future page), e.g. `/casino/` or `/dk/kasino/`. */
export function localizedCasinoListingHref(locale: WebsiteLocaleKey): string {
  return localizedStaticPageHref(locale, casinoUrlSegmentForLocale(locale));
}

export function isRootLocaleSlug(
  locale: WebsiteLocaleKey,
  cmsSlug: string,
): boolean {
  return locale === ROOT_WEBSITE_LOCALE && normalizeCmsSlug(cmsSlug) === "/";
}

export function flattenWebsitePagesLocalePaths(
  docs: Array<{
    slug?: Partial<Record<WebsiteLocaleKey, string | null>> | null;
  }>,
): WebsitePageLocalePath[] {
  const paths: WebsitePageLocalePath[] = [];

  for (const doc of docs) {
    if (!doc.slug) continue;
    for (const locale of WEBSITE_LOCALE_KEYS) {
      const raw = doc.slug[locale];
      if (raw == null || String(raw).trim() === "") continue;
      const cmsSlug = normalizeCmsSlug(String(raw));
      if (isRootLocaleSlug(locale, cmsSlug)) continue;
      const restPath = cmsSlugToLocalizedRestParam(locale, cmsSlug);
      paths.push({ restPath, locale, cmsSlug });
    }
  }

  return paths;
}
