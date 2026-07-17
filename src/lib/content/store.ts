/**
 * Loads structured content: meta.json + {locale}.mdx per entity.
 */

import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";
import { readContentBody } from "./mdx";

const CONTENT_ROOT = path.join(process.cwd(), "src/data/content");

export const LOCALES = [
  "denmark",
  "finland",
  "germany",
  "ireland",
  "norway",
  "sweden",
] as const;

export type LocaleKey = (typeof LOCALES)[number];

type PageIndexEntry = {
  id: string;
  name: string | null;
  dir: string;
  slugs: Partial<Record<LocaleKey, string | null>>;
};

type CasinoIndexEntry = {
  id: string;
  slug: string;
  dir: string;
};

type BlogIndexEntry = {
  slug: string;
  file: string;
};

type LocaleFile = {
  frontmatter: Record<string, unknown>;
  body: string;
  mdxPath: string;
};

type CasinoBundle = {
  meta: Record<string, unknown>;
  locales: Partial<Record<LocaleKey, LocaleFile>>;
};

type PageBundle = {
  meta: Record<string, unknown>;
  locales: Partial<Record<LocaleKey, LocaleFile>>;
  pageDir: string;
};

let pagesCache: Promise<PageIndexEntry[]> | null = null;
let pageBundlesCache: Map<string, PageBundle> | null = null;
let casinosCache: Promise<CasinoIndexEntry[]> | null = null;
let casinoBundlesCache: Map<string, CasinoBundle> | null = null;
let blogCache: Promise<BlogIndexEntry[]> | null = null;

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

export function parseLocaleFile(source: string): Omit<LocaleFile, "mdxPath"> {
  if (!source.startsWith("---")) {
    return { frontmatter: {}, body: source.trim() };
  }
  const end = source.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: {}, body: source.trim() };
  const fmBlock = source.slice(3, end).trim();
  const body = source
    .slice(end + 4)
    .replace(/^\n/, "")
    .trim();
  const frontmatter = (yaml.parse(fmBlock) as Record<string, unknown>) ?? {};
  return { frontmatter, body };
}

async function readLocaleFile(
  filePath: string,
  mdxPath: string,
): Promise<LocaleFile> {
  const source = await fs.readFile(filePath, "utf8");
  const parsed = parseLocaleFile(source);
  return { ...parsed, mdxPath };
}

async function readLocaleFileByStem(
  dir: string,
  locale: LocaleKey,
): Promise<LocaleFile | undefined> {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(dir, `${locale}${ext}`);
    try {
      const relative = path
        .relative(CONTENT_ROOT, filePath)
        .replace(/\\/g, "/");
      return await readLocaleFile(filePath, relative);
    } catch {
      /* try next extension */
    }
  }
  return undefined;
}

async function loadCasinoBundle(dir: string): Promise<CasinoBundle> {
  const meta = await readJson<Record<string, unknown>>(
    path.join(dir, "meta.json"),
  );
  const locales: Partial<Record<LocaleKey, LocaleFile>> = {};

  for (const locale of LOCALES) {
    const localeFile = await readLocaleFileByStem(dir, locale);
    if (localeFile) locales[locale] = localeFile;
  }

  return { meta, locales };
}

async function loadPageBundle(dir: string): Promise<PageBundle> {
  const meta = await readJson<Record<string, unknown>>(
    path.join(dir, "meta.json"),
  );
  const locales: Partial<Record<LocaleKey, LocaleFile>> = {};

  for (const locale of LOCALES) {
    const localeFile = await readLocaleFileByStem(dir, locale);
    if (localeFile) locales[locale] = localeFile;
  }

  return { meta, locales, pageDir: dir };
}

function assembleCasinoDoc(
  bundle: CasinoBundle,
  locale: LocaleKey,
): Record<string, unknown> | null {
  const localeFile = bundle.locales[locale];
  if (!localeFile) return null;

  const fm = localeFile.frontmatter;
  const faqRaw = fm.faq as
    | {
        title?: string;
        spaceTop?: number;
        items?: { question: string; answer: string }[];
      }
    | undefined;

  return {
    ...bundle.meta,
    body: localeFile.body,
    mdxPath: localeFile.mdxPath,
    prosIntl: fm.pros ?? [],
    consIntl: fm.cons ?? [],
    reviewsIntl: fm.playerReview,
    seoComponent: fm.seo,
    faq: faqRaw
      ? {
          _id: "faq",
          spaceTop: faqRaw.spaceTop,
          title: faqRaw.title,
          faqItems: (faqRaw.items ?? []).map((item, i) => ({
            _id: `faq-item-${i}`,
            faqQuestion: item.question,
            faqAnswer: item.answer,
          })),
        }
      : undefined,
  };
}

async function getCasinoMetaBySlug(
  slug: string,
): Promise<Record<string, unknown> | null> {
  const bundles = await loadCasinoBundles();
  const bundle = bundles.get(slug);
  return bundle?.meta ?? null;
}

/**
 * Returns the casino meta with locale-aware overrides applied.
 *
 * The card's `shortDescription` is localized when a translation exists. Lookup
 * order (first hit wins): the casino's locale `.mdx` frontmatter
 * (`shortDescription`), then `meta.shortDescriptionIntl[locale]`, then the
 * default English `meta.shortDescription`.
 */
function localizeCasinoMeta(
  bundle: CasinoBundle,
  locale?: LocaleKey,
): Record<string, unknown> {
  if (!locale) return bundle.meta;

  const fmShort = bundle.locales[locale]?.frontmatter?.shortDescription;
  const intl = bundle.meta.shortDescriptionIntl as
    Record<string, unknown> | undefined;
  const intlShort = intl && typeof intl === "object" ? intl[locale] : undefined;

  const localized =
    (typeof fmShort === "string" && fmShort.trim() && fmShort.trim()) ||
    (typeof intlShort === "string" && intlShort.trim() && intlShort.trim()) ||
    undefined;

  return localized
    ? { ...bundle.meta, shortDescription: localized }
    : bundle.meta;
}

async function resolveCasinoList(
  slugs: unknown,
  locale?: LocaleKey,
): Promise<unknown[]> {
  if (!Array.isArray(slugs)) return [];
  const bundles = await loadCasinoBundles();
  return slugs.flatMap((slug) => {
    if (typeof slug !== "string") return [];
    const bundle = bundles.get(slug.replace(/^\/+|\/+$/g, ""));
    return bundle ? [localizeCasinoMeta(bundle, locale)] : [];
  });
}

const asNumber = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

function pickStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((s): s is string => typeof s === "string" && s.trim() !== "");
}

/** When CMS export left lists empty, derive market casinos (PayPal page → PayPal only). */
async function getDefaultCasinoSlugsForPage(
  locale: LocaleKey,
  pageName: string,
): Promise<string[]> {
  const bundles = await loadCasinoBundles();
  const paypalOnly = pageName === "Paypal Casino";

  return uniqueCasinoBundles(bundles)
    .filter((bundle) => {
      const slug = bundle.meta.slug;
      if (typeof slug !== "string" || !slug.trim()) return false;
      if (!bundle.locales[locale]) return false;
      if (paypalOnly) {
        const methods = pickStringArray(bundle.meta.depositMethods);
        if (!methods.some((m) => /paypal/i.test(m))) return false;
      }
      return true;
    })
    .sort(
      (a, b) => (asNumber(b.meta.rating) ?? 0) - (asNumber(a.meta.rating) ?? 0),
    )
    .map((bundle) => String(bundle.meta.slug).replace(/^\/+|\/+$/g, ""));
}

/** Normalise a free-text bonus name into a broad (English) category label. */
function bonusCategoryLabel(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("no deposit")) return "No Deposit Bonus";
  if (n.includes("free spin")) return "Free Spins";
  if (n.includes("cashback")) return "Cashback";
  if (/reload|weekend|weekly|midweek|daily/.test(n)) return "Reload Bonus";
  if (/vip|loyalty|level up|reward/.test(n)) return "VIP & Loyalty Rewards";
  if (n.includes("welcome")) return "Welcome Bonus";
  return name.trim();
}

/** Localized labels for the canonical bonus categories. */
const BONUS_CATEGORY_LABELS: Record<string, Record<LocaleKey, string>> = {
  "Welcome Bonus": {
    ireland: "Welcome Bonus",
    germany: "Willkommensbonus",
    denmark: "Velkomstbonus",
    finland: "Tervetuliaisbonus",
    norway: "Velkomstbonus",
    sweden: "Välkomstbonus",
  },
  "No Deposit Bonus": {
    ireland: "No Deposit Bonus",
    germany: "Bonus ohne Einzahlung",
    denmark: "Bonus uden indbetaling",
    finland: "Talletukseton bonus",
    norway: "Bonus uten innskudd",
    sweden: "Insättningsfri bonus",
  },
  "Free Spins": {
    ireland: "Free Spins",
    germany: "Freispiele",
    denmark: "Gratis spins",
    finland: "Ilmaiskierrokset",
    norway: "Gratisspinn",
    sweden: "Gratissnurr",
  },
  "Reload Bonus": {
    ireland: "Reload Bonus",
    germany: "Reload-Bonus",
    denmark: "Reload-bonus",
    finland: "Reload-bonus",
    norway: "Reload-bonus",
    sweden: "Reload-bonus",
  },
  Cashback: {
    ireland: "Cashback",
    germany: "Cashback",
    denmark: "Cashback",
    finland: "Cashback",
    norway: "Cashback",
    sweden: "Cashback",
  },
  "VIP & Loyalty Rewards": {
    ireland: "VIP & Loyalty Rewards",
    germany: "VIP- & Treueprämien",
    denmark: "VIP- & loyalitetsbelønninger",
    finland: "VIP- ja uskollisuuspalkinnot",
    norway: "VIP- og lojalitetsbelønninger",
    sweden: "VIP- och lojalitetsbelöningar",
  },
};

/** Picks a localized string from an `xIntl`-style map, else the fallback. */
function pickIntlString(
  intl: unknown,
  locale: LocaleKey,
  fallback?: string,
): string | undefined {
  if (intl && typeof intl === "object") {
    const v = (intl as Record<string, unknown>)[locale];
    if (typeof v === "string" && v.trim() !== "") return v;
  }
  return fallback;
}

/** Per-market casino allowlists (from correct-casino-list HTML dumps). */
async function loadMarketCasinoLists(): Promise<
  Partial<Record<LocaleKey, string[]>>
> {
  try {
    return await readJson(path.join(CONTENT_ROOT, "market-casino-lists.json"));
  } catch {
    return {};
  }
}

/**
 * When a bonuses list is left empty on the Bonuses page, render one bonus
 * card per casino from the market casino list — same order as the home page.
 * Uses each casino's first (primary) bonus offer.
 */
async function getDefaultBonusesForPage(
  locale: LocaleKey,
  pageName: string,
): Promise<Record<string, unknown>[]> {
  if (pageName !== "Bonuses") return [];
  const [bundles, marketLists] = await Promise.all([
    loadCasinoBundles(),
    loadMarketCasinoLists(),
  ]);

  const orderedSlugs = (marketLists[locale] ?? []).map((s) =>
    s.replace(/^\/+|\/+$/g, ""),
  );
  if (!orderedSlugs.length) return [];

  const result: Record<string, unknown>[] = [];

  for (const slug of orderedSlugs) {
    const bundle = bundles.get(slug);
    if (!bundle) continue;
    const bonuses = Array.isArray(bundle.meta.bonuses)
      ? (bundle.meta.bonuses as Record<string, unknown>[])
      : [];
    if (!bonuses.length) continue;

    const rawBonus = bonuses[0];
    const casinoName = String(bundle.meta.casinoName ?? slug);
    const casinoLogo = bundle.meta.logo;
    const casinoRef = bundle.meta.referralUrl;
    const casinoBg = (
      bundle.meta.backgroundColor as { hex?: string } | undefined
    )?.hex;

    const name = String(rawBonus.name ?? "").trim() || "Welcome Bonus";
    const category = bonusCategoryLabel(name);
    const localizedBonusLabel =
      pickIntlString(rawBonus.nameIntl, locale) ??
      BONUS_CATEGORY_LABELS[category]?.[locale] ??
      name;
    const localizedShort =
      pickIntlString(bundle.meta.shortDescriptionIntl, locale) ??
      (typeof bundle.meta.shortDescription === "string"
        ? bundle.meta.shortDescription
        : name);

    result.push({
      _id: rawBonus._id ?? `${slug}-bonus`,
      // Title with casino name so cards are distinguishable in the list.
      name: `${casinoName} — ${localizedBonusLabel}`,
      code:
        pickIntlString(rawBonus.codeIntl, locale) ??
        rawBonus.code ??
        localizedBonusLabel,
      description:
        pickIntlString(rawBonus.descriptionIntl, locale) ??
        rawBonus.description ??
        localizedShort,
      referralUrl: rawBonus.referralUrl ?? casinoRef,
      bonusBackgroundColor: rawBonus.bonusBackgroundColor ?? casinoBg,
      bonusLogo: rawBonus.bonusLogo ?? casinoLogo,
    });
  }

  return result;
}

function resolveCasinoListSlugs(
  section: Record<string, unknown>,
  locale: LocaleKey,
  fallbackSlugs: string[],
): string[] {
  if (Array.isArray(section.casinoSlugs) && section.casinoSlugs.length) {
    return section.casinoSlugs.filter(
      (s): s is string => typeof s === "string" && s.trim() !== "",
    );
  }
  const byCountry = section.casinoListsByCountry;
  if (byCountry && typeof byCountry === "object") {
    const forLocale = (byCountry as Record<string, unknown>)[locale];
    if (Array.isArray(forLocale) && forLocale.length) {
      return forLocale.filter(
        (s): s is string => typeof s === "string" && s.trim() !== "",
      );
    }
  }
  return fallbackSlugs;
}

/** Merge meta.json component order with locale-specific section data from MDX frontmatter. */
function mergePageSections(
  metaComponents: unknown[],
  localeSections: unknown[],
): Record<string, unknown>[] {
  const localeList = localeSections.filter(
    (s): s is Record<string, unknown> => typeof s === "object" && s !== null,
  );
  const metaList = metaComponents.filter(
    (s): s is Record<string, unknown> => typeof s === "object" && s !== null,
  );

  if (!metaList.length) return localeList;

  const localeById = new Map(localeList.map((s) => [String(s.id ?? ""), s]));

  return metaList.flatMap((metaComp) => {
    const id = String(metaComp.id ?? "");
    const localeComp = localeById.get(id);
    if (localeComp) {
      return [
        { ...metaComp, ...localeComp, kind: metaComp.kind ?? localeComp.kind },
      ];
    }
    return metaComp.kind ? [metaComp] : [];
  });
}

function mapPageSection(
  section: Record<string, unknown>,
  pageDir: string,
  casinoResolver: (slugs: unknown) => Promise<unknown[]>,
): Promise<Record<string, unknown> | null> {
  const kind = section.kind;
  const id = section.id;
  const pageRelative = path.relative(CONTENT_ROOT, pageDir).replace(/\\/g, "/");

  switch (kind) {
    case "contentComponent":
      return Promise.resolve({
        __typename: "ContentComponentIntl",
        _id: id,
        name: section.name,
        bodyMarkdown: section.bodyMarkdown,
        mdxPath:
          typeof section.mdx === "string" && section.mdx.trim()
            ? `${pageRelative}/${section.mdx}`.replace(/\/+/g, "/")
            : undefined,
      });

    case "casinoList":
      return casinoResolver(section.casinoSlugs).then((casinos) => ({
        __typename: "CasinoListIntl",
        _id: id,
        anchorTitle: section.anchorTitle,
        copyBefore: section.copyBefore,
        copyAfter: section.copyAfter,
        casinoList: casinos,
      }));

    case "faqComponent":
      return Promise.resolve({
        __typename: "FaqComponentIntl",
        _id: id,
        title: section.title,
        spaceTop: section.spaceTop,
        faqItems: Array.isArray(section.items)
          ? (section.items as { question: string; answer: string }[]).map(
              (item, i) => ({
                _id: `faq-${i}`,
                faqQuestion: item.question,
                faqAnswer: item.answer,
              }),
            )
          : [],
      });

    case "bonusesList":
      return Promise.resolve({
        __typename: "BonusesListIntl",
        _id: id,
        title: section.title,
        bonuses: section.bonuses ?? [],
      });

    case "howTo":
      return Promise.resolve({
        __typename: "HowToIntl",
        _id: id,
        title: section.title,
        howToItems: section.items ?? [],
      });

    case "image":
      return Promise.resolve({
        __typename: "ImageIntl",
        _id: id,
        src: section.src,
        alt: section.alt,
        caption: section.caption,
        width: section.width,
        height: section.height,
      });

    default:
      return Promise.resolve(null);
  }
}

async function assemblePageDoc(
  bundle: PageBundle,
  locale: LocaleKey,
  pageDir: string,
): Promise<Record<string, unknown> | null> {
  const localeFile = bundle.locales[locale];
  if (!localeFile) return null;

  const fm = localeFile.frontmatter;
  const pageName = String(bundle.meta.name ?? "");
  const metaComponents = Array.isArray(bundle.meta.components)
    ? bundle.meta.components
    : [];
  const localeSections = Array.isArray(fm.sections) ? fm.sections : [];
  const mergedSections = mergePageSections(metaComponents, localeSections);
  const defaultCasinoSlugs = mergedSections.some(
    (s) =>
      s.kind === "casinoList" && !resolveCasinoListSlugs(s, locale, []).length,
  )
    ? await getDefaultCasinoSlugsForPage(locale, pageName)
    : [];

  const defaultBonuses = mergedSections.some(
    (s) =>
      s.kind === "bonusesList" &&
      !(Array.isArray(s.bonuses) && s.bonuses.length),
  )
    ? await getDefaultBonusesForPage(locale, pageName)
    : [];

  const components = (
    await Promise.all(
      mergedSections.map(async (s) => {
        const section = { ...s };
        if (section.kind === "casinoList") {
          section.casinoSlugs = resolveCasinoListSlugs(
            section,
            locale,
            defaultCasinoSlugs,
          );
        }
        if (
          section.kind === "bonusesList" &&
          !(Array.isArray(section.bonuses) && section.bonuses.length)
        ) {
          section.bonuses = defaultBonuses;
        }

        const mapped = await mapPageSection(section, pageDir, (slugs) =>
          resolveCasinoList(slugs, locale),
        );
        if (
          mapped &&
          mapped.__typename === "ContentComponentIntl" &&
          typeof mapped.mdxPath === "string" &&
          mapped.mdxPath &&
          !mapped.bodyMarkdown
        ) {
          mapped.bodyMarkdown = await readContentBody(mapped.mdxPath);
        }
        return mapped;
      }),
    )
  ).filter(Boolean);

  return {
    _id: bundle.meta._id,
    _createdAt: bundle.meta._createdAt,
    _updatedAt: bundle.meta._updatedAt,
    name: bundle.meta.name,
    slug: fm.slug,
    seoComponent: fm.seo,
    components,
  };
}

async function loadPageIndex(): Promise<PageIndexEntry[]> {
  if (!pagesCache) {
    pagesCache = readJson<PageIndexEntry[]>(
      path.join(CONTENT_ROOT, "pages/_index.json"),
    );
  }
  return pagesCache;
}

async function loadPageBundles(): Promise<Map<string, PageBundle>> {
  if (!pageBundlesCache) {
    const index = await loadPageIndex();
    const map = new Map<string, PageBundle>();

    for (const entry of index) {
      const pageDir = path.join(CONTENT_ROOT, entry.dir);
      const bundle = await loadPageBundle(pageDir);
      map.set(entry.id, bundle);
    }

    pageBundlesCache = map;
  }
  return pageBundlesCache;
}

export async function getAllPageEntries(): Promise<PageIndexEntry[]> {
  return loadPageIndex();
}

export async function getPageDocumentById(
  id: string,
  locale: LocaleKey,
): Promise<Record<string, unknown> | null> {
  const bundles = await loadPageBundles();
  const bundle = bundles.get(id);
  if (!bundle) return null;
  return assemblePageDoc(bundle, locale, bundle.pageDir);
}

function normalizeSlugForCompare(slug: string): string {
  const t = slug.trim();
  if (!t || t === "/") return "/";
  const noEdge = t.replace(/^\/+|\/+$/g, "");
  return `/${noEdge.split("/").filter(Boolean).join("/")}/`;
}

export async function findPageEntryBySlug(
  slug: string,
  locale: LocaleKey,
): Promise<{ entry: PageIndexEntry; doc: Record<string, unknown> } | null> {
  const normalized = normalizeSlugForCompare(slug);
  const index = await loadPageIndex();
  const bundles = await loadPageBundles();

  for (const entry of index) {
    const entrySlug = entry.slugs?.[locale];
    if (entrySlug == null) continue;
    if (normalizeSlugForCompare(String(entrySlug)) === normalized) {
      const bundle = bundles.get(entry.id);
      if (!bundle) continue;
      const doc = await assemblePageDoc(bundle, locale, bundle.pageDir);
      if (doc) return { entry, doc };
    }
  }
  return null;
}

async function loadCasinoIndex(): Promise<CasinoIndexEntry[]> {
  if (!casinosCache) {
    casinosCache = readJson<CasinoIndexEntry[]>(
      path.join(CONTENT_ROOT, "casinos/_index.json"),
    );
  }
  return casinosCache;
}

async function loadCasinoBundles(): Promise<Map<string, CasinoBundle>> {
  if (!casinoBundlesCache) {
    const index = await loadCasinoIndex();
    const map = new Map<string, CasinoBundle>();

    for (const entry of index) {
      const casinoDir = path.join(CONTENT_ROOT, entry.dir);
      const bundle = await loadCasinoBundle(casinoDir);
      const slug = String(bundle.meta.slug ?? entry.slug).replace(
        /^\/+|\/+$/g,
        "",
      );
      map.set(slug, bundle);
      map.set(String(bundle.meta._id ?? entry.id), bundle);
    }

    casinoBundlesCache = map;
  }
  return casinoBundlesCache;
}

/** Map is keyed by slug and _id — return each casino bundle once. */
function uniqueCasinoBundles(map: Map<string, CasinoBundle>): CasinoBundle[] {
  const seen = new Set<string>();
  const out: CasinoBundle[] = [];
  for (const bundle of map.values()) {
    const key = String(bundle.meta._id ?? bundle.meta.slug ?? "");
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(bundle);
  }
  return out;
}

export async function getAllCasinoEntries(): Promise<CasinoIndexEntry[]> {
  return loadCasinoIndex();
}

export async function getCasinoDocumentBySlug(
  slug: string,
  locale?: LocaleKey,
): Promise<Record<string, unknown> | null> {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  const bundles = await loadCasinoBundles();
  const bundle = bundles.get(normalized);
  if (!bundle) return null;

  if (locale) {
    return assembleCasinoDoc(bundle, locale);
  }

  return bundle.meta;
}

export async function getAllCasinoDocuments(): Promise<
  Record<string, unknown>[]
> {
  const index = await loadCasinoIndex();
  const bundles = await loadCasinoBundles();
  return index
    .map((e) => {
      const slug = e.slug.replace(/^\/+|\/+$/g, "");
      return bundles.get(slug)?.meta;
    })
    .filter(Boolean) as Record<string, unknown>[];
}

/** Raw casino docs with body intl object for hasCasinoReviewBody checks. */
export async function getAllCasinoDocumentsWithBodies(): Promise<
  Record<string, unknown>[]
> {
  const bundles = await loadCasinoBundles();
  return uniqueCasinoBundles(bundles)
    .filter((b) => b.meta.slug)
    .map((bundle) => {
      const body: Record<string, string> = {};
      for (const locale of LOCALES) {
        const file = bundle.locales[locale];
        if (file?.body?.trim()) body[locale] = file.body;
      }
      return { ...bundle.meta, body };
    });
}

async function loadBlogIndex(): Promise<BlogIndexEntry[]> {
  if (!blogCache) {
    blogCache = readJson<BlogIndexEntry[]>(
      path.join(CONTENT_ROOT, "blog/_index.json"),
    ).catch(() => []);
  }
  return blogCache;
}

export async function getAllBlogFiles(): Promise<BlogIndexEntry[]> {
  return loadBlogIndex();
}

export async function getCasinoMetaBySlugMap(): Promise<
  Map<string, Record<string, unknown>>
> {
  const bundles = await loadCasinoBundles();
  const map = new Map<string, Record<string, unknown>>();
  for (const [slug, bundle] of bundles) {
    map.set(slug.replace(/^\/+|\/+$/g, ""), bundle.meta);
  }
  return map;
}

export function contentRoot(): string {
  return CONTENT_ROOT;
}

export function parseMdxFrontmatter(source: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  return parseLocaleFile(source);
}

export async function readBlogPostRaw(
  slug: string,
): Promise<LocaleFile | null> {
  const index = await loadBlogIndex();
  const entry = index.find((e) => e.slug === slug);
  if (!entry) return null;

  const filePath = path.join(CONTENT_ROOT, "blog", entry.file);
  const relative = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, "/");
  return readLocaleFile(filePath, relative);
}

export async function readAllBlogPostsRaw(): Promise<
  Array<LocaleFile & { slug: string }>
> {
  const index = await loadBlogIndex();
  const posts = [];

  for (const entry of index) {
    const filePath = path.join(CONTENT_ROOT, "blog", entry.file);
    const relative = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, "/");
    const parsed = await readLocaleFile(filePath, relative);
    posts.push({
      ...parsed,
      slug: String(parsed.frontmatter.slug ?? entry.slug),
    });
  }

  return posts;
}

export { getCasinoMetaBySlug };
