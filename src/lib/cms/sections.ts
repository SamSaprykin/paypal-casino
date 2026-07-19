/**
 * Maps a localized website page document into a typed section model for Astro pages.
 */

import type { CasinoCardData, AdaptCasinoForCardOptions } from "./cards";
import { adaptCasinoForCard } from "./cards";
import type { WebsiteLocaleKey } from "./locales";
import { pickIntlCasinoList } from "./intl";
import { pickIntlMarkdown } from "./intlMarkdown";
import type { PageAuthorRef } from "../data/authors";
import { resolvePageAuthors } from "../data/authors";

export type PageSection =
  | CasinoListSection
  | FaqSection
  | ContentSection
  | HowToSection
  | BonusesListSection
  | ImageSection;

export interface BaseSection {
  id: string;
}

export interface CasinoListSection extends BaseSection {
  kind: "casinoList";
  anchorTitle?: string;
  copyBefore?: string;
  copyAfter?: string;
  casinos: CasinoCardData[];
}

export interface FaqSection extends BaseSection {
  kind: "faqComponent";
  title?: string;
  spaceTop?: number;
  items: { question: string; answer: string }[];
}

export interface ContentSection extends BaseSection {
  kind: "contentComponent";
  name?: string;
  /** @deprecated Prefer `mdxPath` — rendered via Astro MDX. */
  bodyMarkdown?: string;
  mdxPath?: string;
}

export interface HowToSection extends BaseSection {
  kind: "howTo";
  title?: string;
  items: { iconName?: string; title?: string; steps: string[] }[];
}

export interface BonusItem {
  id: string;
  name?: string;
  code?: string;
  description?: string;
  referralUrl?: string;
  bonusBackgroundColor?: string;
  bonusLogo?: { url?: string; altText?: string };
}

export interface BonusesListSection extends BaseSection {
  kind: "bonusesList";
  title?: string;
  bonuses: BonusItem[];
}

export interface ImageSection extends BaseSection {
  kind: "image";
  /** File name inside src/images/content/, e.g. "new-casinos-hero.webp". */
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

/** Page-level SEO after locale picking. */
export interface PageSeo {
  seoTitle?: string;
  seoDescription?: string;
  seoSlug?: string;
}

export interface WebsitePage {
  id: string;
  name?: string;
  slug?: string;
  /** ISO timestamps (document level). */
  createdAt?: string;
  updatedAt?: string;
  /** Per-locale CMS slugs for the current document (missing locales mean the page is not localized). */
  localizedSlugs?: Partial<Record<WebsiteLocaleKey, string>>;
  seo?: PageSeo;
  sections: PageSection[];
  addedBy?: PageAuthorRef;
  reviewedBy?: PageAuthorRef;
}

// ---------- Helpers ----------

const asString = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() !== "" ? v : undefined;

const asNumber = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

function pickArray<T = unknown>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function adaptBonus(raw: unknown): BonusItem | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  const logo = b.bonusLogo as
    { asset?: { url?: string; altText?: string } } | undefined;
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

function adaptSection(
  raw: unknown,
  locale: WebsiteLocaleKey,
  reviewBodyMap?: Map<string, boolean>,
  cardOptions?: AdaptCasinoForCardOptions,
): PageSection | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  const typename = asString(b.__typename);
  if (!typename) return null;
  const id = String(b._id ?? "");

  switch (typename) {
    case "CasinoListIntl": {
      const casinoRawList = pickIntlCasinoList(
        b.casinoListsByCountry ?? b.casinoList,
        locale,
      );
      return {
        kind: "casinoList",
        id,
        anchorTitle: asString(b.anchorTitle),
        copyBefore: asString(b.copyBefore),
        copyAfter: asString(b.copyAfter),
        casinos: casinoRawList
          .map((c) => adaptCasinoForCard(c, locale, reviewBodyMap, cardOptions))
          .filter(Boolean) as CasinoCardData[],
      };
    }

    case "FaqComponentIntl": {
      const items = pickArray<Record<string, unknown>>(b.faqItems).flatMap(
        (item) => {
          const question = pickIntlMarkdown(item.faqQuestion, locale);
          const answer = pickIntlMarkdown(item.faqAnswer, locale);
          if (!question.trim() || !answer.trim()) return [];
          return [{ question, answer }];
        },
      );
      return {
        kind: "faqComponent",
        id,
        title: pickIntlMarkdown(b.title, locale) || undefined,
        spaceTop: asNumber(b.spaceTop),
        items,
      };
    }

    case "ContentComponentIntl":
      return {
        kind: "contentComponent",
        id,
        name: asString(b.name),
        bodyMarkdown: pickIntlMarkdown(b.bodyMarkdown, locale) || undefined,
        mdxPath: asString(b.mdxPath),
      };

    case "HowToIntl": {
      const items = pickArray<Record<string, unknown>>(b.howToItems).map(
        (it) => ({
          iconName: asString(it.iconName),
          title: asString(it.title),
          steps: pickArray<string>(it.steps).filter(
            (s) => typeof s === "string" && s.trim() !== "",
          ),
        }),
      );
      return {
        kind: "howTo",
        id,
        title: asString(b.title),
        items,
      };
    }

    case "BonusesListIntl":
      return {
        kind: "bonusesList",
        id,
        title: asString(b.title),
        bonuses: pickArray(b.bonuses)
          .map(adaptBonus)
          .filter(Boolean) as BonusItem[],
      };

    case "ImageIntl":
      return {
        kind: "image",
        id,
        src: asString(b.src),
        alt: asString(b.alt),
        caption: asString(b.caption),
        width: asNumber(b.width),
        height: asNumber(b.height),
      };

    case "SeoComponentIntl":
      // SEO blocks live on the page, not in the body — skip if they show up here.
      return null;

    default:
      return null;
  }
}

/** Transforms a locale-picked WebsitePageIntl into the typed page model. */
export function adaptWebsitePage(
  raw: Record<string, unknown>,
  locale: WebsiteLocaleKey,
  reviewBodyMap?: Map<string, boolean>,
  casinoMetaBySlug?: Map<string, Record<string, unknown>>,
): WebsitePage {
  const pageName = asString(raw.name) ?? "";
  const cardOptions: AdaptCasinoForCardOptions = {
    paypalContext: pageName === "Paypal Casino",
    casinoMetaBySlug,
  };

  const seoRaw = raw.seoComponent as Record<string, unknown> | undefined;
  const seo: PageSeo | undefined = seoRaw
    ? {
        seoTitle: asString(seoRaw.seoTitle),
        seoDescription: asString(seoRaw.seoDescription),
        seoSlug: asString(seoRaw.seoSlug),
      }
    : undefined;

  const sections = pickArray(raw.components)
    .map((section) => adaptSection(section, locale, reviewBodyMap, cardOptions))
    .filter(Boolean) as PageSection[];

  const authorsMeta =
    raw.authors && typeof raw.authors === "object"
      ? (raw.authors as { addedBy?: string; reviewedBy?: string })
      : undefined;
  const { addedBy, reviewedBy } = resolvePageAuthors(authorsMeta, locale);

  return {
    id: String(raw._id ?? ""),
    name: asString(raw.name),
    slug: asString(raw.slug),
    createdAt: asString(raw._createdAt),
    updatedAt: asString(raw._updatedAt),
    seo,
    sections,
    addedBy,
    reviewedBy,
  };
}
