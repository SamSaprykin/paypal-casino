import type { WebsiteLocaleKey } from "../cms/locales";
import { WEBSITE_LOCALE_KEYS } from "../cms/locales";
import {
  flattenWebsitePagesLocalePaths,
  localizedHref,
  normalizeCmsSlug,
  ROOT_WEBSITE_LOCALE,
} from "../cms/routing";
import { adaptWebsitePage, type WebsitePage } from "../cms/sections";
import { getCasinoReviewBodyMap } from "./casinos";
import {
  findPageEntryBySlug,
  getAllPageEntries,
  getCasinoMetaBySlugMap,
} from "./store";

type WebsitePageListEntry = {
  sys: { id: string };
  fields: {
    name?: string | null;
    slug: string;
    locale: WebsiteLocaleKey;
    href: string;
  };
};

function extractLocalizedSlugs(
  slugIntl: unknown,
): Partial<Record<WebsiteLocaleKey, string>> {
  if (!slugIntl || typeof slugIntl !== "object") return {};
  const map = slugIntl as Record<string, unknown>;
  const out: Partial<Record<WebsiteLocaleKey, string>> = {};
  for (const loc of WEBSITE_LOCALE_KEYS) {
    const v = map[loc];
    if (typeof v === "string" && v.trim() !== "") out[loc] = v;
  }
  return out;
}

export async function getWebsitePageBySlug(
  slug: string,
  locale: WebsiteLocaleKey,
): Promise<WebsitePage | null> {
  const cmsSlug = normalizeCmsSlug(slug);
  const match = await findPageEntryBySlug(cmsSlug, locale);
  if (!match) return null;

  const localizedSlugs = extractLocalizedSlugs(match.entry.slugs);
  const [reviewBodyMap, casinoMetaBySlug] = await Promise.all([
    getCasinoReviewBodyMap(),
    getCasinoMetaBySlugMap(),
  ]);
  const page = adaptWebsitePage(
    match.doc,
    locale,
    reviewBodyMap,
    casinoMetaBySlug,
  );
  page.localizedSlugs = localizedSlugs;
  return page;
}

export async function getWebsitePageStaticPaths(): Promise<
  Array<{
    params: { slug: string };
    props: { locale: WebsiteLocaleKey; cmsSlug: string };
  }>
> {
  const entries = await getAllPageEntries();

  return flattenWebsitePagesLocalePaths(
    entries.map((e) => ({ slug: e.slugs })),
  ).map(({ restPath, locale, cmsSlug }) => ({
    params: { slug: restPath },
    props: { locale, cmsSlug },
  }));
}

export async function getWebsitePages(
  locale?: WebsiteLocaleKey,
): Promise<WebsitePageListEntry[]> {
  const entries = await getAllPageEntries();

  const toEntry = (
    entry: (typeof entries)[number],
    loc: WebsiteLocaleKey,
  ): WebsitePageListEntry | null => {
    const raw = entry.slugs?.[loc];
    if (raw == null || String(raw).trim() === "") return null;
    const cmsSlug = normalizeCmsSlug(String(raw));
    return {
      sys: { id: locale ? entry.id : `${entry.id}-${loc}` },
      fields: {
        name: entry.name,
        slug: cmsSlug,
        locale: loc,
        href: localizedHref(loc, cmsSlug),
      },
    };
  };

  if (locale !== undefined) {
    return entries.flatMap((entry) => {
      const row = toEntry(entry, locale);
      return row ? [row] : [];
    });
  }

  return entries.flatMap((entry) =>
    WEBSITE_LOCALE_KEYS.flatMap((loc) => {
      const row = toEntry(entry, loc);
      return row ? [row] : [];
    }),
  );
}

export async function getPageSeoData(
  slug: string,
  locale: WebsiteLocaleKey = ROOT_WEBSITE_LOCALE,
): Promise<{ seo?: WebsitePage["seo"] } | null> {
  const page = await getWebsitePageBySlug(slug, locale);
  if (!page) return null;
  return { seo: page.seo };
}

export async function getWebsitePageHrefByName(
  name: string,
  locale: WebsiteLocaleKey,
): Promise<string | null> {
  const entries = await getAllPageEntries();
  const entry = entries.find((e) => e.name === name);
  if (!entry?.slugs) return null;

  const raw = entry.slugs[locale] ?? entry.slugs[ROOT_WEBSITE_LOCALE];
  if (raw == null || String(raw).trim() === "") return null;

  return localizedHref(locale, normalizeCmsSlug(String(raw)));
}

export type { WebsitePageListEntry };
