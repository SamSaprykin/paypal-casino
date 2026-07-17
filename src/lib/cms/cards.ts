/**
 * Adapters for card components (`CasinoListingCard`, `HeroCasinoCard`).
 *
 * These cards predate the Sanity migration and still read a `fields.X` tree
 * (legacy Contentful shape). Rather than refactor every card now, we adapt
 * Sanity payloads into that shape here. Section consumers and pages stay clean.
 */

import type { WebsiteLocaleKey } from "./locales";
import { localizedCasinoDetailHref } from "./routing";
import {
  isCasinoBlocked,
  resolveBlockedAlternatives,
  type BlockedCasinoAlternative,
} from "../affiliates/blocked";

export interface CasinoBonusCardData {
  fields: {
    name?: string;
    code?: string;
    description?: string;
    referralUrl?: string;
  };
}

export interface CasinoCardData {
  sys: { id: string };
  fields: {
    casinoName?: string;
    slug?: string;
    backgroundColor?: string;
    shortDescription?: string;
    referralUrl?: string;
    payoutLimits?: string;
    payoutTimes?: string[];
    license?: string;
    userRecommendationsRecommendedNumber?: number;
    userRecommendationsTotalNumber?: number;
    logo?: { fields: { file: { url?: string } } };
    casinoRates: Array<{ fields: { ratingNumber?: number } }>;
    bonuses: CasinoBonusCardData[];
    /** Set when any locale has review body markdown — links to the casino detail page. */
    reviewHref?: string;
    blocked?: boolean;
    blockedAlternatives?: BlockedCasinoAlternative[];
  };
}

export interface AdaptCasinoForCardOptions {
  paypalContext?: boolean;
  casinoMetaBySlug?: Map<string, Record<string, unknown>>;
}

const asString = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() !== "" ? v : undefined;

/**
 * Picks a localized string from an `xIntl` map (keyed by WebsiteLocaleKey),
 * falling back to the provided default when no translation exists.
 */
export function pickLocalizedString(
  intl: unknown,
  locale: WebsiteLocaleKey | undefined,
  fallback?: string,
): string | undefined {
  if (locale && intl && typeof intl === "object") {
    const v = (intl as Record<string, unknown>)[locale];
    if (typeof v === "string" && v.trim() !== "") return v;
  }
  return fallback;
}

export function adaptCasinoForCard(
  raw: unknown,
  locale?: WebsiteLocaleKey,
  reviewBodyMap?: Map<string, boolean>,
  options?: AdaptCasinoForCardOptions,
): CasinoCardData | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;

  const backgroundColor =
    c.backgroundColor && typeof c.backgroundColor === "object"
      ? (c.backgroundColor as { hex?: string }).hex
      : (c.backgroundColor as string | undefined);

  const logoUrl =
    c.logo && typeof c.logo === "object"
      ? (c.logo as { asset?: { url?: string } }).asset?.url
      : undefined;

  const ratingNumber = typeof c.rating === "number" ? c.rating : undefined;

  const bonuses: CasinoBonusCardData[] = Array.isArray(c.bonuses)
    ? (c.bonuses as Array<Record<string, unknown>>).map((b) => ({
        fields: {
          name: pickLocalizedString(
            b.nameIntl,
            locale,
            typeof b.name === "string" ? b.name : undefined,
          ),
          code: pickLocalizedString(
            b.codeIntl,
            locale,
            typeof b.code === "string" ? b.code : undefined,
          ),
          description: pickLocalizedString(
            b.descriptionIntl,
            locale,
            typeof b.description === "string" ? b.description : undefined,
          ),
          referralUrl:
            typeof b.referralUrl === "string" ? b.referralUrl : undefined,
        },
      }))
    : [];

  const id = String(c._id ?? c.slug ?? "");
  const slug = asString(c.slug);
  const hasReview = Boolean(id && reviewBodyMap?.get(id));
  const reviewHref =
    hasReview && slug && locale
      ? localizedCasinoDetailHref(locale, slug)
      : undefined;

  const blocked = isCasinoBlocked(c);
  const blockedAlternatives =
    blocked && locale && options?.casinoMetaBySlug
      ? resolveBlockedAlternatives(
          c,
          locale,
          Boolean(options.paypalContext),
          options.casinoMetaBySlug,
        )
      : [];

  return {
    sys: { id },
    fields: {
      casinoName: typeof c.casinoName === "string" ? c.casinoName : undefined,
      slug,
      backgroundColor,
      shortDescription:
        typeof c.shortDescription === "string" ? c.shortDescription : undefined,
      referralUrl:
        typeof c.referralUrl === "string" ? c.referralUrl : undefined,
      payoutLimits:
        typeof c.payoutLimits === "string" ? c.payoutLimits : undefined,
      payoutTimes: Array.isArray(c.payoutTimes)
        ? (c.payoutTimes as unknown[]).filter(
            (s): s is string => typeof s === "string",
          )
        : undefined,
      license: asString(c.license),
      userRecommendationsRecommendedNumber:
        typeof c.userRecommendationsRecommendedNumber === "number"
          ? c.userRecommendationsRecommendedNumber
          : undefined,
      userRecommendationsTotalNumber:
        typeof c.userRecommendationsTotalNumber === "number"
          ? c.userRecommendationsTotalNumber
          : undefined,
      logo: logoUrl ? { fields: { file: { url: logoUrl } } } : undefined,
      casinoRates:
        ratingNumber !== undefined
          ? [{ fields: { ratingNumber } }]
          : [{ fields: {} }],
      bonuses,
      reviewHref,
      blocked: blocked || undefined,
      blockedAlternatives: blockedAlternatives.length
        ? blockedAlternatives
        : undefined,
    },
  };
}
