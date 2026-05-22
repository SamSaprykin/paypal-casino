import type { WebsiteLocaleKey } from "./locales";
import { WEBSITE_LOCALE_KEYS } from "./locales";
import { portableTextToPlainText } from "./portableTextPlain";

/** True when a single locale value is non-empty markdown or legacy portable text. */
export function intlMarkdownHasContent(value: unknown): boolean {
  return pickIntlMarkdown(value).trim() !== "";
}

/**
 * Resolves one locale column from an intl markdown object (or a pre-picked string).
 * Legacy CMS rows may store portable text blocks instead of markdown strings.
 */
export function pickIntlMarkdown(value: unknown, locale?: WebsiteLocaleKey): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return portableTextToPlainText(value);

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (locale && Object.prototype.hasOwnProperty.call(obj, locale)) {
      return coerceMarkdownValue(obj[locale]);
    }
    if (WEBSITE_LOCALE_KEYS.some((key) => Object.prototype.hasOwnProperty.call(obj, key))) {
      for (const key of WEBSITE_LOCALE_KEYS) {
        const resolved = coerceMarkdownValue(obj[key]);
        if (resolved.trim() !== "") return resolved;
      }
      return "";
    }
  }

  return "";
}

function coerceMarkdownValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return portableTextToPlainText(value);
  return "";
}

/** True when any market language has review body content (markdown or legacy blocks). */
export function hasCasinoReviewBody(body: unknown): boolean {
  if (typeof body === "string") return body.trim() !== "";
  if (Array.isArray(body)) return portableTextToPlainText(body).trim() !== "";
  if (!body || typeof body !== "object") return false;

  const obj = body as Record<string, unknown>;
  if (WEBSITE_LOCALE_KEYS.some((key) => Object.prototype.hasOwnProperty.call(obj, key))) {
    return WEBSITE_LOCALE_KEYS.some((key) => intlMarkdownHasContent(obj[key]));
  }

  return false;
}
