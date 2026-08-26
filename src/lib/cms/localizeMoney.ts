import type { WebsiteLocaleKey } from "./locales";

/** Euro-using website markets. */
const EUR_LOCALES = new Set<WebsiteLocaleKey>([
  "ireland",
  "germany",
  "finland",
]);

/** Markets that show amounts in local kroner, not euro. */
const KR_LOCALES = new Set<WebsiteLocaleKey>(["sweden", "denmark", "norway"]);

const KR_NUMBER_LOCALE: Record<"sweden" | "denmark" | "norway", string> = {
  sweden: "sv-SE",
  denmark: "da-DK",
  norway: "nb-NO",
};

/** Amount that starts on a digit so leading spaces stay outside the match. */
const NUM = "\\d(?:[\\d\\u00a0\\s.,]*\\d)?";
const CAP = `(${NUM})`;

function parseMoneyAmount(raw: string): number | null {
  const normalized = raw
    .trim()
    .replace(/\u00a0/g, " ")
    .replace(/\s/g, "")
    .replace(/,(?=\d{3}(\D|$))/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

/**
 * Rewrites bonus/payout amounts to the market currency.
 * SE/DK/NO → kr; IE/DE/FI → €. Dual `€/$` and leftover £/$ never stay
 * on euro pages (except standalone £ on Ireland, where some UKGC offers
 * are genuinely quoted in pounds).
 */
export function localizeMoneyForLocale(
  text: string,
  locale: WebsiteLocaleKey | undefined,
): string {
  if (!locale || !text) return text;

  const toKr = KR_LOCALES.has(locale);
  const toEur = EUR_LOCALES.has(locale);
  if (!toKr && !toEur) return text;

  const convertPounds = toKr || locale !== "ireland";

  const formatKr = (raw: string): string | null => {
    const n = parseMoneyAmount(raw);
    if (n == null) return null;
    const numberLocale =
      KR_NUMBER_LOCALE[locale as keyof typeof KR_NUMBER_LOCALE];
    return `${new Intl.NumberFormat(numberLocale, {
      maximumFractionDigits: 0,
    }).format(n)} kr`;
  };

  const asEuro = (raw: string, style: "prefix" | "suffix"): string | null => {
    const trimmed = raw.trim();
    if (!trimmed || parseMoneyAmount(trimmed) == null) return null;
    return style === "prefix" ? `€${trimmed}` : `${trimmed} €`;
  };

  const convert = (
    raw: string,
    full: string,
    style: "prefix" | "suffix",
  ): string => {
    if (toKr) return formatKr(raw) ?? full;
    return asEuro(raw, style) ?? full;
  };

  let out = text;

  if (toEur) {
    // €4,500/$4,500 → keep the euro figure only.
    out = out.replace(
      new RegExp(`(€\\s*${NUM})\\s*/\\s*\\$\\s*${NUM}`, "g"),
      "$1",
    );
    if (convertPounds) {
      out = out.replace(/\s*\/\s*£\s*[\d\s.,]*\d(?:\s*\([^)]+\))?/g, "");
    }
  }

  // Dual prefix: ~€/$500 or €/$3,000
  out = out.replace(
    new RegExp(`(~?)€\\s*/\\s*\\$\\s*${CAP}`, "g"),
    (full, tilde: string, raw: string) => {
      const next = convert(raw, full, "prefix");
      return next === full ? full : `${tilde}${next}`;
    },
  );

  // Dual suffix: 2,000 €/$
  out = out.replace(
    new RegExp(`${CAP}\\s*€\\s*/\\s*\\$`, "g"),
    (full, raw: string) => convert(raw, full, "suffix"),
  );

  const foreignPrefix = toKr
    ? "(?:A\\$|C\\$|US\\$|USD|£|GBP|€|EUR|\\$)"
    : convertPounds
      ? "(?:A\\$|C\\$|US\\$|USD|SEK|DKK|NOK|£|GBP|\\$)"
      : "(?:A\\$|C\\$|US\\$|USD|SEK|DKK|NOK|\\$)";

  out = out.replace(
    new RegExp(`(?<!\\w)${foreignPrefix}\\s*${CAP}`, "g"),
    (full, raw: string) => convert(raw, full, "prefix"),
  );

  const foreignSuffix = toKr
    ? "(?:A\\$|C\\$|US\\$|USD|£|GBP|€|EUR|\\$)"
    : convertPounds
      ? "(?:A\\$|C\\$|US\\$|USD|SEK|DKK|NOK|£|GBP|\\$|kr)"
      : "(?:A\\$|C\\$|US\\$|USD|SEK|DKK|NOK|\\$|kr)";

  out = out.replace(
    new RegExp(`${CAP}\\s*${foreignSuffix}(?!\\w)`, "g"),
    (full, raw: string) => convert(raw, full, "suffix"),
  );

  return out;
}
