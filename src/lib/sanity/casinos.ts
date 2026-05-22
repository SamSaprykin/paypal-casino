import { adaptCasinoForCard, type CasinoCardData } from "./cards";
import { sanityGraphqlFetch } from "./client";
import { deepPickIntl } from "./intl";
import { hasCasinoReviewBody, pickIntlMarkdown } from "./intlMarkdown";
import type { WebsiteLocaleKey } from "./locales";
import { WEBSITE_LOCALE_KEYS } from "./locales";
import {
  ALL_CASINOS_QUERY,
  buildCasinoBySlugQuery,
} from "./queries";
import {
  CASINO_URL_SEGMENT,
  LOCALE_PATH_PREFIX,
  ROOT_WEBSITE_LOCALE,
  localizedCasinoDetailHref,
} from "./routing";
import type { BonusItem } from "./sections";

export interface CasinoPlayerReview {
  description: string;
  personName: string;
  country?: string;
  rating: number;
  date: string;
}

export interface CasinoFaq {
  title?: string;
  spaceTop?: number;
  items: { question: string; answer: string }[];
}

export interface CasinoPage {
  id: string;
  casinoName: string;
  slug: string;
  shortDescription?: string;
  bodyMarkdown?: string;
  referralUrl: string;
  rating?: number;
  backgroundColor?: string;
  logoUrl?: string;
  logoAlt?: string;
  payoutLimits?: string;
  payoutTimes?: string[];
  software?: string[];
  depositMethods?: string[];
  withdrawalMethods?: string[];
  license?: string;
  pros?: string[];
  cons?: string[];
  playerReview?: CasinoPlayerReview;
  faq?: CasinoFaq;
  bonuses: BonusItem[];
  userRecommendationsRecommendedNumber?: number;
  userRecommendationsTotalNumber?: number;
  createdAt?: string;
  updatedAt?: string;
  /** Legacy card shape for existing hero/listing components. */
  card: CasinoCardData;
  /** Per-locale detail URLs for the country selector (only locales where the casino is available). */
  countrySelectorHrefs?: Partial<Record<WebsiteLocaleKey, string>>;
}

type CasinoRow = Record<string, unknown>;
type AllCasinosResult = { allCasino: CasinoRow[] };
type CasinoBySlugResult = { allCasino: CasinoRow[] };

const asString = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() !== "" ? v : undefined;

const asNumber = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

function pickStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((s): s is string => typeof s === "string" && s.trim() !== "");
}

function normalizeCasinoSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "");
}

function adaptBonus(raw: unknown): BonusItem | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  const logo = b.bonusLogo as { asset?: { url?: string; altText?: string } } | undefined;
  return {
    id: String(b._id ?? b.code ?? b.name ?? ""),
    name: asString(b.name),
    code: asString(b.code),
    description: asString(b.description),
    referralUrl: asString(b.referralUrl),
    bonusBackgroundColor: asString(b.bonusBackgroundColor),
    bonusLogo: logo?.asset?.url
      ? { url: logo.asset.url, altText: logo.asset.altText }
      : undefined,
  };
}

function adaptFaq(raw: unknown, locale: WebsiteLocaleKey): CasinoFaq | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const f = raw as Record<string, unknown>;
  const items = Array.isArray(f.faqItems)
    ? (f.faqItems as Record<string, unknown>[])
        .flatMap((item) => {
          const question = pickIntlMarkdown(item.faqQuestion, locale);
          const answer = pickIntlMarkdown(item.faqAnswer, locale);
          if (!question.trim() || !answer.trim()) return [];
          return [{ question, answer }];
        })
    : [];
  const title = pickIntlMarkdown(f.title, locale);
  if (!items.length && !title.trim()) return undefined;
  return {
    title: title.trim() ? title : undefined,
    spaceTop: asNumber(f.spaceTop),
    items,
  };
}

function adaptPlayerReview(raw: unknown): CasinoPlayerReview | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const description = asString(r.description);
  const personName = asString(r.personName);
  const date = asString(r.date);
  const rating = asNumber(r.rating);
  if (!description || !personName || !date || rating === undefined) return undefined;
  return {
    description,
    personName,
    country: asString(r.country),
    rating,
    date,
  };
}

export function adaptCasinoPage(
  raw: Record<string, unknown>,
  locale: WebsiteLocaleKey,
  reviewBodyMap?: Map<string, boolean>,
): CasinoPage | null {
  const slug = asString(raw.slug);
  const casinoName = asString(raw.casinoName);
  const referralUrl = asString(raw.referralUrl);
  if (!slug || !casinoName || !referralUrl) return null;

  const backgroundColor =
    raw.backgroundColor && typeof raw.backgroundColor === "object"
      ? asString((raw.backgroundColor as { hex?: string }).hex)
      : asString(raw.backgroundColor);

  const logoAsset =
    raw.logo && typeof raw.logo === "object"
      ? (raw.logo as { asset?: { url?: string; altText?: string } }).asset
      : undefined;

  const card = adaptCasinoForCard(raw, locale, reviewBodyMap);
  if (!card) return null;

  const bodyMarkdown = pickIntlMarkdown(raw.body, locale);

  return {
    id: String(raw._id ?? slug),
    casinoName,
    slug: normalizeCasinoSlug(slug),
    shortDescription: asString(raw.shortDescription),
    bodyMarkdown: bodyMarkdown.trim() ? bodyMarkdown : undefined,
    referralUrl,
    rating: asNumber(raw.rating),
    backgroundColor,
    logoUrl: logoAsset?.url,
    logoAlt: logoAsset?.altText ?? `${casinoName} logo`,
    payoutLimits: asString(raw.payoutLimits),
    payoutTimes: pickStringArray(raw.payoutTimes),
    software: pickStringArray(raw.software),
    depositMethods: pickStringArray(raw.depositMethods),
    withdrawalMethods: pickStringArray(raw.withdrawalMethod),
    license: asString(raw.license),
    pros: pickStringArray(raw.prosIntl),
    cons: pickStringArray(raw.consIntl),
    playerReview: adaptPlayerReview(raw.reviewsIntl),
    faq: adaptFaq(raw.faq, locale),
    bonuses: Array.isArray(raw.bonuses)
      ? (raw.bonuses as unknown[]).map(adaptBonus).filter(Boolean)
      : [],
    userRecommendationsRecommendedNumber: asNumber(
      raw.userRecommendationsRecommendedNumber,
    ),
    userRecommendationsTotalNumber: asNumber(raw.userRecommendationsTotalNumber),
    createdAt: asString(raw._createdAt),
    updatedAt: asString(raw._updatedAt),
    card,
  };
}

export function isCasinoAvailableInLocale(
  raw: Record<string, unknown>,
  locale: WebsiteLocaleKey,
): boolean {
  const flags = raw.availableInCountries;
  if (!flags || typeof flags !== "object") return true;
  const allowed = (flags as Record<string, unknown>)[locale];
  return allowed === true;
}

/** Country-selector links for a casino detail page, limited to locales where it is available. */
export function getCasinoCountrySelectorHrefs(
  casinoSlug: string,
  raw: Record<string, unknown>,
): Partial<Record<WebsiteLocaleKey, string>> {
  const normalized = normalizeCasinoSlug(casinoSlug);
  const hrefs: Partial<Record<WebsiteLocaleKey, string>> = {};

  for (const locale of WEBSITE_LOCALE_KEYS) {
    if (!isCasinoAvailableInLocale(raw, locale)) continue;
    hrefs[locale] = localizedCasinoDetailHref(locale, normalized);
  }

  return hrefs;
}

export async function getAllCasinosSanity(): Promise<CasinoRow[]> {
  const data = await sanityGraphqlFetch<AllCasinosResult>(ALL_CASINOS_QUERY);
  return data.allCasino ?? [];
}

let casinoReviewBodyMapCache: Promise<Map<string, boolean>> | null = null;

/** Cached map of casino id → has review body in any locale (GraphQL `allCasino`). */
export async function getCasinoReviewBodyMap(): Promise<Map<string, boolean>> {
  if (!casinoReviewBodyMapCache) {
    casinoReviewBodyMapCache = (async () => {
      const rows = await getAllCasinosSanity();
      const map = new Map<string, boolean>();
      for (const row of rows) {
        const id = String(row._id ?? "");
        if (id && hasCasinoReviewBody(row.body)) {
          map.set(id, true);
        }
      }
      return map;
    })();
  }
  return casinoReviewBodyMapCache;
}

export async function getCasinoBySlugSanity(
  slug: string,
  locale: WebsiteLocaleKey,
): Promise<CasinoPage | null> {
  const normalized = normalizeCasinoSlug(slug);
  const [data, reviewBodyMap] = await Promise.all([
    sanityGraphqlFetch<CasinoBySlugResult>(buildCasinoBySlugQuery(locale), {
      slug: normalized,
    }),
    getCasinoReviewBodyMap(),
  ]);
  const raw = data.allCasino[0];
  if (!raw) return null;
  if (!isCasinoAvailableInLocale(raw, locale)) return null;

  const picked = deepPickIntl(raw, locale) as Record<string, unknown>;
  const page = adaptCasinoPage(picked, locale, reviewBodyMap);
  if (!page) return null;

  return {
    ...page,
    countrySelectorHrefs: getCasinoCountrySelectorHrefs(normalized, raw),
  };
}

export type RootCasinoDetailPath = {
  params: { casinoSegment: string; slug: string };
  props: { locale: WebsiteLocaleKey; slug: string };
};

export type LocalizedCasinoDetailPath = {
  params: { lang: string; casinoSegment: string; slug: string };
  props: { locale: WebsiteLocaleKey; slug: string };
};

export async function getRootCasinoDetailStaticPaths(): Promise<RootCasinoDetailPath[]> {
  const [casinos, reviewBodyMap] = await Promise.all([
    getAllCasinosSanity(),
    getCasinoReviewBodyMap(),
  ]);
  const locale = ROOT_WEBSITE_LOCALE;
  const segment = CASINO_URL_SEGMENT[locale];

  return casinos.flatMap((raw) => {
    const id = String(raw._id ?? "");
    if (!isCasinoAvailableInLocale(raw, locale)) return [];
    if (!id || !reviewBodyMap.get(id)) return [];
    const slug = asString(raw.slug);
    if (!slug) return [];
    return [
      {
        params: { casinoSegment: segment, slug: normalizeCasinoSlug(slug) },
        props: { locale, slug: normalizeCasinoSlug(slug) },
      },
    ];
  });
}

export async function getLocalizedCasinoDetailStaticPaths(): Promise<
  LocalizedCasinoDetailPath[]
> {
  const [casinos, reviewBodyMap] = await Promise.all([
    getAllCasinosSanity(),
    getCasinoReviewBodyMap(),
  ]);
  const paths: LocalizedCasinoDetailPath[] = [];

  for (const locale of WEBSITE_LOCALE_KEYS) {
    if (locale === ROOT_WEBSITE_LOCALE) continue;
    const lang = LOCALE_PATH_PREFIX[locale];
    const segment = CASINO_URL_SEGMENT[locale];

    for (const raw of casinos) {
      const id = String(raw._id ?? "");
      if (!isCasinoAvailableInLocale(raw, locale)) continue;
      if (!id || !reviewBodyMap.get(id)) continue;
      const slug = asString(raw.slug);
      if (!slug) continue;
      paths.push({
        params: {
          lang,
          casinoSegment: segment,
          slug: normalizeCasinoSlug(slug),
        },
        props: { locale, slug: normalizeCasinoSlug(slug) },
      });
    }
  }

  return paths;
}

export type CasinoListEntry = {
  id: string;
  casinoName?: string;
  slug: string;
  locale: WebsiteLocaleKey;
  href: string;
};

/** For sitemap / future listing page. */
export async function getCasinoDetailEntries(
  locale?: WebsiteLocaleKey,
): Promise<CasinoListEntry[]> {
  const [casinos, reviewBodyMap] = await Promise.all([
    getAllCasinosSanity(),
    getCasinoReviewBodyMap(),
  ]);
  const locales = locale ? [locale] : WEBSITE_LOCALE_KEYS;

  return casinos.flatMap((raw) => {
    const slug = asString(raw.slug);
    const id = String(raw._id ?? "");
    if (!slug || !id || !reviewBodyMap.get(id)) return [];
    const normalized = normalizeCasinoSlug(slug);
    return locales.flatMap((loc) => {
      if (!isCasinoAvailableInLocale(raw, loc)) return [];
      return [
        {
          id: `${id}-${loc}`,
          casinoName: asString(raw.casinoName),
          slug: normalized,
          locale: loc,
          href: localizedCasinoDetailHref(loc, normalized),
        },
      ];
    });
  });
}
