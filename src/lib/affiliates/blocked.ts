import vercelConfig from "../../../vercel.json";
import type { WebsiteLocaleKey } from "../cms/locales";

export const GOTO_AFFILIATE_PATHS = new Set(
  (vercelConfig.redirects ?? [])
    .map((r) => r.source)
    .filter(
      (s): s is string => typeof s === "string" && s.startsWith("/goto/"),
    ),
);

export function hasAffiliateLink(referralUrl: string | undefined): boolean {
  return Boolean(referralUrl?.trim() && GOTO_AFFILIATE_PATHS.has(referralUrl));
}

export interface BlockedCasinoAlternative {
  casinoName: string;
  slug: string;
  referralUrl: string;
  logoUrl?: string;
  backgroundColor?: string;
  rating?: number;
  bonusDescription?: string;
}

const asString = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() !== "" ? v : undefined;

const asNumber = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

export function pickAlternativeSlugs(
  raw: Record<string, unknown>,
  locale: WebsiteLocaleKey,
  paypalContext: boolean,
): string[] {
  const key = paypalContext
    ? "alternativesPaypalByCountry"
    : "alternativesByCountry";
  const map = raw[key];
  if (!map || typeof map !== "object") return [];
  const slugs = (map as Record<string, unknown>)[locale];
  if (!Array.isArray(slugs)) return [];
  return slugs.filter(
    (s): s is string => typeof s === "string" && s.trim() !== "",
  );
}

export function adaptBlockedAlternative(
  raw: Record<string, unknown>,
): BlockedCasinoAlternative | null {
  const slug = asString(raw.slug);
  const casinoName = asString(raw.casinoName);
  const referralUrl = asString(raw.referralUrl);
  if (!slug || !casinoName || !referralUrl) return null;

  const backgroundColor =
    raw.backgroundColor && typeof raw.backgroundColor === "object"
      ? asString((raw.backgroundColor as { hex?: string }).hex)
      : asString(raw.backgroundColor);

  const logoUrl =
    raw.logo && typeof raw.logo === "object"
      ? asString((raw.logo as { asset?: { url?: string } }).asset?.url)
      : undefined;

  const firstBonus = Array.isArray(raw.bonuses)
    ? (raw.bonuses as Record<string, unknown>[])[0]
    : undefined;

  return {
    casinoName,
    slug: slug.replace(/^\/+|\/+$/g, ""),
    referralUrl,
    logoUrl,
    backgroundColor,
    rating: asNumber(raw.rating),
    bonusDescription: firstBonus ? asString(firstBonus.description) : undefined,
  };
}

export function resolveBlockedAlternatives(
  raw: Record<string, unknown>,
  locale: WebsiteLocaleKey,
  paypalContext: boolean,
  casinoMetaBySlug: Map<string, Record<string, unknown>>,
): BlockedCasinoAlternative[] {
  return pickAlternativeSlugs(raw, locale, paypalContext).flatMap((slug) => {
    const altRaw = casinoMetaBySlug.get(slug.replace(/^\/+|\/+$/g, ""));
    if (!altRaw) return [];
    const alt = adaptBlockedAlternative(altRaw);
    return alt ? [alt] : [];
  });
}

export function isCasinoBlocked(raw: Record<string, unknown>): boolean {
  if (raw.blocked === true) return true;
  const referralUrl = asString(raw.referralUrl);
  return Boolean(referralUrl && !hasAffiliateLink(referralUrl));
}
