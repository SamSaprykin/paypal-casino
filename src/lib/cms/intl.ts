import type { WebsiteLocaleKey } from "./locales";
import { WEBSITE_LOCALE_KEYS } from "./locales";

function hasAllLocaleKeys(obj: Record<string, unknown>): boolean {
  return WEBSITE_LOCALE_KEYS.every((k) =>
    Object.prototype.hasOwnProperty.call(obj, k),
  );
}

/**
 * Collapses Sanity `intlText`, `intlMarkdown`, and `intlDescription` objects (six locale keys)
 * into a single string per branch for the active locale.
 */
export function deepPickIntl<T>(value: T, locale: WebsiteLocaleKey): T {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value.map((item) => deepPickIntl(item, locale)) as T;
  }

  const obj = value as Record<string, unknown>;

  if (hasAllLocaleKeys(obj)) {
    const picked = obj[locale];
    /** Intl ref lists (e.g. `casinoListsByCountry`) — never fall back to another market. */
    const isIntlRefList = WEBSITE_LOCALE_KEYS.some((k) =>
      Array.isArray(obj[k]),
    );
    if (isIntlRefList) {
      return (Array.isArray(picked) ? picked : []) as T;
    }
    return (picked ?? obj.denmark) as T;
  }

  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(obj)) {
    // Keep GraphQL union `__typename`; we don't query `_type` on page blocks.
    if (key === "__typename") {
      out[key] = child;
      continue;
    }
    out[key] = deepPickIntl(child, locale);
  }
  return out as T;
}

export function resolveWebsiteLocale(): WebsiteLocaleKey {
  const raw = import.meta.env.PUBLIC_WEBSITE_LOCALE ?? "denmark";
  if (
    raw === "denmark" ||
    raw === "finland" ||
    raw === "germany" ||
    raw === "ireland" ||
    raw === "norway" ||
    raw === "sweden"
  ) {
    return raw;
  }
  return "denmark";
}

/**
 * Picks the casino array for one market from `IntlCasinoRefList` (`casinoListsByCountry`).
 * Accepts the raw intl object or an array already collapsed by `deepPickIntl`.
 */
export function pickIntlCasinoList(
  lists: unknown,
  locale: WebsiteLocaleKey,
): unknown[] {
  if (Array.isArray(lists)) {
    return lists.filter((item) => item != null);
  }
  if (!lists || typeof lists !== "object") return [];
  const obj = lists as Record<string, unknown>;
  const forLocale = obj[locale];
  return Array.isArray(forLocale)
    ? forLocale.filter((item) => item != null)
    : [];
}
