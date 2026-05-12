import { sanityGraphqlFetch } from "./client";
import { deepPickIntl } from "./intl";
import type { WebsiteLocaleKey } from "./locales";
import { WEBSITE_LOCALE_KEYS } from "./locales";
import {
  ALL_WEBSITE_PAGES_INTL_QUERY,
  buildWebsitePageBySlugQuery,
} from "./queries";
import {
  flattenWebsitePagesLocalePaths,
  localizedHref,
  normalizeCmsSlug,
  ROOT_WEBSITE_LOCALE,
} from "./routing";
import { adaptWebsitePage, type WebsitePage } from "./sections";

type WebsitePageIntlRow = Record<string, unknown>;
type WebsitePageSlugQueryResult = { allWebsitePageIntl: WebsitePageIntlRow[] };
type AllWebsitePagesQueryResult = {
  allWebsitePageIntl: Array<{
    _id: string;
    name?: string | null;
    slug?: Partial<Record<WebsiteLocaleKey, string | null>> | null;
  }>;
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

/** Fetches one page document and returns it localized + adapted. */
export async function getWebsitePageBySlug(
  slug: string,
  locale: WebsiteLocaleKey,
): Promise<WebsitePage | null> {
  const cmsSlug = normalizeCmsSlug(slug);
  const query = buildWebsitePageBySlugQuery(locale);
  const data = await sanityGraphqlFetch<WebsitePageSlugQueryResult>(query, {
    slug: cmsSlug,
  });
  const raw = data.allWebsitePageIntl[0];
  if (!raw) return null;

  const localizedSlugs = extractLocalizedSlugs(raw.slug);
  const picked = deepPickIntl(raw, locale) as Record<string, unknown>;
  const page = adaptWebsitePage(picked);
  page.localizedSlugs = localizedSlugs;
  return page;
}

export async function getWebsitePageStaticPaths(): Promise<
  Array<{
    params: { slug: string };
    props: { locale: WebsiteLocaleKey; cmsSlug: string };
  }>
> {
  const data = await sanityGraphqlFetch<AllWebsitePagesQueryResult>(
    ALL_WEBSITE_PAGES_INTL_QUERY,
  );
  return flattenWebsitePagesLocalePaths(data.allWebsitePageIntl).map(
    ({ restPath, locale, cmsSlug }) => ({
      params: { slug: restPath },
      props: { locale, cmsSlug },
    }),
  );
}

export type WebsitePageListEntry = {
  sys: { id: string };
  fields: {
    name?: string | null;
    slug: string;
    locale: WebsiteLocaleKey;
    href: string;
  };
};

/**
 * Lists website pages for sitemap / navigation.
 * Without `locale`, returns every locale row (same document once per locale that has a slug).
 */
export async function getWebsitePages(
  locale?: WebsiteLocaleKey,
): Promise<WebsitePageListEntry[]> {
  const data = await sanityGraphqlFetch<AllWebsitePagesQueryResult>(
    ALL_WEBSITE_PAGES_INTL_QUERY,
  );

  const toEntry = (
    doc: AllWebsitePagesQueryResult["allWebsitePageIntl"][number],
    loc: WebsiteLocaleKey,
  ): WebsitePageListEntry | null => {
    const raw = doc.slug?.[loc];
    if (raw == null || String(raw).trim() === "") return null;
    const cmsSlug = normalizeCmsSlug(String(raw));
    return {
      sys: { id: locale ? doc._id : `${doc._id}-${loc}` },
      fields: {
        name: doc.name,
        slug: cmsSlug,
        locale: loc,
        href: localizedHref(loc, cmsSlug),
      },
    };
  };

  if (locale !== undefined) {
    return data.allWebsitePageIntl.flatMap((doc) => {
      const entry = toEntry(doc, locale);
      return entry ? [entry] : [];
    });
  }

  return data.allWebsitePageIntl.flatMap((doc) =>
    WEBSITE_LOCALE_KEYS.flatMap((loc) => {
      const entry = toEntry(doc, loc);
      return entry ? [entry] : [];
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

/**
 * Looks up a `WebsitePageIntl` document by its CMS `name` and returns the public href
 * for the given locale. If the locale has no slug, falls back to ROOT_WEBSITE_LOCALE's
 * slug (still rendered under the requested locale's URL prefix); returns `null` only
 * when neither locale has a slug for that document.
 */
export async function getWebsitePageHrefByName(
  name: string,
  locale: WebsiteLocaleKey,
): Promise<string | null> {
  const data = await sanityGraphqlFetch<AllWebsitePagesQueryResult>(
    ALL_WEBSITE_PAGES_INTL_QUERY,
  );
  const doc = data.allWebsitePageIntl.find((d) => d.name === name);
  if (!doc?.slug) return null;

  const raw = doc.slug[locale] ?? doc.slug[ROOT_WEBSITE_LOCALE];
  if (raw == null || String(raw).trim() === "") return null;

  return localizedHref(locale, normalizeCmsSlug(String(raw)));
}
