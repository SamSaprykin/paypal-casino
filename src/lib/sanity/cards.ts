/**
 * Adapters for card components (`CasinoListingCard`, `HeroCasinoCard`).
 *
 * These cards predate the Sanity migration and still read a `fields.X` tree
 * (legacy Contentful shape). Rather than refactor every card now, we adapt
 * Sanity payloads into that shape here. Section consumers and pages stay clean.
 */

// ---------- Casino card adapter ----------

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
    userRecommendationsRecommendedNumber?: number;
    userRecommendationsTotalNumber?: number;
    logo?: { fields: { file: { url?: string } } };
    casinoRates: Array<{ fields: { ratingNumber?: number } }>;
    bonuses: CasinoBonusCardData[];
  };
}

export function adaptCasinoForCard(
  raw: unknown,
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

  const ratingNumber =
    typeof c.rating === "number" ? c.rating : undefined;

  const bonuses: CasinoBonusCardData[] = Array.isArray(c.bonuses)
    ? (c.bonuses as Array<Record<string, unknown>>).map((b) => ({
        fields: {
          name: typeof b.name === "string" ? b.name : undefined,
          code: typeof b.code === "string" ? b.code : undefined,
          description: typeof b.description === "string" ? b.description : undefined,
          referralUrl: typeof b.referralUrl === "string" ? b.referralUrl : undefined,
        },
      }))
    : [];

  return {
    sys: { id: String(c._id ?? c.slug ?? "") },
    fields: {
      casinoName: typeof c.casinoName === "string" ? c.casinoName : undefined,
      slug: typeof c.slug === "string" ? c.slug : undefined,
      backgroundColor,
      shortDescription:
        typeof c.shortDescription === "string" ? c.shortDescription : undefined,
      referralUrl: typeof c.referralUrl === "string" ? c.referralUrl : undefined,
      payoutLimits: typeof c.payoutLimits === "string" ? c.payoutLimits : undefined,
      payoutTimes: Array.isArray(c.payoutTimes)
        ? (c.payoutTimes as unknown[]).filter((s): s is string => typeof s === "string")
        : undefined,
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
    },
  };
}

