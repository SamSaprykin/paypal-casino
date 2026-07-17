/**
 * Shared content layout:
 *   casinos/{slug}/meta.json + {locale}.mdx
 *   pages/{name}/meta.json + {locale}.mdx
 */

import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";

export const LOCALES = [
  "denmark",
  "finland",
  "germany",
  "ireland",
  "norway",
  "sweden",
];

export function slugifyDir(value) {
  return (
    String(value ?? "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "untitled"
  );
}

export function pickLocaleString(intlObj, locale) {
  if (!intlObj) return "";
  if (typeof intlObj === "string") return intlObj;
  if (Array.isArray(intlObj)) return portableTextToPlain(intlObj);
  const v = intlObj[locale];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return portableTextToPlain(v);
  return "";
}

function portableTextToPlain(value) {
  if (!Array.isArray(value)) return "";
  const parts = [];
  for (const block of value) {
    if (!block?.children) continue;
    for (const ch of block.children) {
      if (ch?.text) parts.push(String(ch.text));
    }
    parts.push("\n");
  }
  return parts.join("").trim();
}

export function pickLocaleArray(intlObj, locale) {
  if (!intlObj) return [];
  if (Array.isArray(intlObj)) return intlObj.filter(Boolean);
  const v = intlObj[locale];
  return Array.isArray(v) ? v.filter(Boolean) : [];
}

export function pickLocaleReview(intlObj, locale) {
  if (!intlObj || typeof intlObj !== "object") return undefined;
  const v = intlObj[locale];
  if (!v || typeof v !== "object") return undefined;
  const r = v;
  if (!r.description || !r.personName || r.rating == null || !r.date)
    return undefined;
  return r;
}

export function pickLocaleFaq(faqRaw, locale) {
  if (!faqRaw || typeof faqRaw !== "object") return undefined;
  const title = pickLocaleString(faqRaw.title, locale);
  const items = Array.isArray(faqRaw.faqItems)
    ? faqRaw.faqItems.flatMap((item) => {
        const question = pickLocaleString(item.faqQuestion, locale);
        const answer = pickLocaleString(item.faqAnswer, locale);
        if (!question.trim() || !answer.trim()) return [];
        return [{ question, answer }];
      })
    : [];
  if (!title.trim() && !items.length) return undefined;
  return {
    title: title.trim() || undefined,
    spaceTop: faqRaw.spaceTop ?? undefined,
    items,
  };
}

export function pickLocaleSeo(seoRaw, locale) {
  if (!seoRaw || typeof seoRaw !== "object") return undefined;
  const seoTitle = pickLocaleString(seoRaw.seoTitle, locale);
  const seoDescription = pickLocaleString(seoRaw.seoDescription, locale);
  const seoSlug = pickLocaleString(seoRaw.seoSlug, locale);
  if (!seoTitle && !seoDescription && !seoSlug) return undefined;
  return {
    seoTitle: seoTitle || undefined,
    seoDescription: seoDescription || undefined,
    seoSlug: seoSlug || undefined,
  };
}

/** Write YAML frontmatter + optional markdown body. */
export function formatLocaleFile(frontmatter, body = "") {
  const fm = yaml.stringify(frontmatter, { lineWidth: 0 }).trim();
  const trimmedBody = body.trim();
  return trimmedBody
    ? `---\n${fm}\n---\n\n${trimmedBody}\n`
    : `---\n${fm}\n---\n`;
}

export function parseLocaleFile(source) {
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
  const frontmatter = yaml.parse(fmBlock) ?? {};
  return { frontmatter, body };
}

export async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function writeLocaleFile(filePath, frontmatter, body = "") {
  await fs.writeFile(filePath, formatLocaleFile(frontmatter, body), "utf8");
}

const CASINO_META_KEYS = [
  "_id",
  "_createdAt",
  "_updatedAt",
  "casinoName",
  "slug",
  "rating",
  "shortDescription",
  "referralUrl",
  "payoutLimits",
  "payoutTimes",
  "software",
  "depositMethods",
  "withdrawalMethod",
  "license",
  "blocked",
  "alternativesByCountry",
  "alternativesPaypalByCountry",
  "userRecommendationsRecommendedNumber",
  "userRecommendationsTotalNumber",
  "availableInCountries",
  "backgroundColor",
  "logo",
  "bonuses",
];

export function splitCasinoDoc(doc) {
  const meta = {};
  for (const key of CASINO_META_KEYS) {
    if (doc[key] !== undefined) meta[key] = doc[key];
  }

  const localeFiles = {};
  for (const locale of LOCALES) {
    const body = pickLocaleString(doc.body, locale);
    const seo = pickLocaleSeo(doc.seoComponent, locale);
    const faq = pickLocaleFaq(doc.faq, locale);
    const pros = pickLocaleArray(doc.prosIntl, locale);
    const cons = pickLocaleArray(doc.consIntl, locale);
    const playerReview = pickLocaleReview(doc.reviewsIntl, locale);

    const hasContent =
      body.trim() || seo || faq || pros.length || cons.length || playerReview;

    if (!hasContent) continue;

    const frontmatter = {};
    if (seo) frontmatter.seo = seo;
    if (faq) frontmatter.faq = faq;
    if (pros.length) frontmatter.pros = pros;
    if (cons.length) frontmatter.cons = cons;
    if (playerReview) frontmatter.playerReview = playerReview;

    localeFiles[locale] = { frontmatter, body };
  }

  return { meta, localeFiles };
}

function mapSectionKind(typename) {
  switch (typename) {
    case "ContentComponentIntl":
      return "contentComponent";
    case "CasinoListIntl":
      return "casinoList";
    case "FaqComponentIntl":
      return "faqComponent";
    case "BonusesListIntl":
      return "bonusesList";
    case "HowToIntl":
      return "howTo";
    default:
      return null;
  }
}

function extractCasinoSlugs(casinoList) {
  if (!Array.isArray(casinoList)) return [];
  return casinoList
    .map((c) => (typeof c === "object" && c ? c.slug : null))
    .filter(Boolean);
}

export function splitPageDoc(doc) {
  const meta = {
    _id: doc._id,
    _createdAt: doc._createdAt,
    _updatedAt: doc._updatedAt,
    name: doc.name,
    components: [],
  };

  const components = Array.isArray(doc.components) ? doc.components : [];
  for (const comp of components) {
    const kind = mapSectionKind(comp.__typename);
    if (!kind) continue;

    const entry = { kind, id: comp._id };

    if (kind === "contentComponent") {
      entry.name = comp.name ?? undefined;
    } else if (kind === "casinoList") {
      entry.casinoListsByCountry = {};
      const lists = comp.casinoListsByCountry ?? {};
      for (const locale of LOCALES) {
        entry.casinoListsByCountry[locale] = extractCasinoSlugs(lists[locale]);
      }
    } else if (kind === "bonusesList") {
      entry.bonuses = comp.bonuses ?? [];
    } else if (kind === "howTo") {
      entry.howToItems = comp.howToItems ?? [];
    } else if (kind === "faqComponent") {
      entry.spaceTop = comp.spaceTop ?? undefined;
      entry.faqItemIds = Array.isArray(comp.faqItems)
        ? comp.faqItems.map((i) => i._id)
        : [];
    }

    meta.components.push(entry);
  }

  const localeFiles = {};
  for (const locale of LOCALES) {
    const slug = pickLocaleString(doc.slug, locale);
    const seo = pickLocaleSeo(doc.seoComponent, locale);

    const sections = components.flatMap((comp) => {
      const kind = mapSectionKind(comp.__typename);
      if (!kind) return [];

      if (kind === "contentComponent") {
        const bodyMarkdown = pickLocaleString(comp.bodyMarkdown, locale);
        if (!bodyMarkdown.trim()) return [];
        return [
          {
            kind,
            id: comp._id,
            name: comp.name ?? undefined,
            bodyMarkdown,
          },
        ];
      }

      if (kind === "casinoList") {
        const lists = comp.casinoListsByCountry ?? {};
        const casinoSlugs = extractCasinoSlugs(lists[locale]);
        const anchorTitle = pickLocaleString(comp.anchorTitle, locale);
        const copyBefore = pickLocaleString(comp.copyBefore, locale);
        const copyAfter = pickLocaleString(comp.copyAfter, locale);
        if (!casinoSlugs.length && !anchorTitle && !copyBefore && !copyAfter) {
          return [];
        }
        return [
          {
            kind,
            id: comp._id,
            anchorTitle: anchorTitle || undefined,
            copyBefore: copyBefore || undefined,
            copyAfter: copyAfter || undefined,
            casinoSlugs,
          },
        ];
      }

      if (kind === "faqComponent") {
        const faq = pickLocaleFaq(comp, locale);
        if (!faq) return [];
        return [
          {
            kind,
            id: comp._id,
            title: faq.title,
            spaceTop: faq.spaceTop,
            items: faq.items,
          },
        ];
      }

      if (kind === "bonusesList") {
        const title =
          typeof comp.title === "string"
            ? comp.title
            : pickLocaleString(comp.title, locale);
        if (!title && !Array.isArray(comp.bonuses)?.length) return [];
        return [
          {
            kind,
            id: comp._id,
            title: title || undefined,
            bonuses: comp.bonuses ?? [],
          },
        ];
      }

      if (kind === "howTo") {
        const title = pickLocaleString(comp.title, locale) || comp.title;
        const items = Array.isArray(comp.howToItems) ? comp.howToItems : [];
        if (!title && !items.length) return [];
        return [{ kind, id: comp._id, title: title || undefined, items }];
      }

      return [];
    });

    if (!slug.trim() && !seo && !sections.length) continue;

    localeFiles[locale] = {
      frontmatter: {
        slug: slug || undefined,
        seo,
        sections,
      },
      body: "",
    };
  }

  return { meta, localeFiles };
}

async function writePageLocaleBundle(pageDir, locale, frontmatter, body) {
  await writeLocaleFile(
    path.join(pageDir, `${locale}.mdx`),
    {
      slug: frontmatter.slug,
      seo: frontmatter.seo,
      sections: frontmatter.sections,
    },
    body,
  );
}

export async function writeCasinoBundle(dir, doc) {
  const { meta, localeFiles } = splitCasinoDoc(doc);
  await fs.mkdir(dir, { recursive: true });
  await writeJson(path.join(dir, "meta.json"), meta);
  for (const [locale, { frontmatter, body }] of Object.entries(localeFiles)) {
    await writeLocaleFile(path.join(dir, `${locale}.mdx`), frontmatter, body);
  }
}

export async function writePageBundle(dir, doc) {
  const { meta, localeFiles } = splitPageDoc(doc);
  await fs.mkdir(dir, { recursive: true });
  await writeJson(path.join(dir, "meta.json"), meta);
  for (const [locale, { frontmatter, body }] of Object.entries(localeFiles)) {
    await writePageLocaleBundle(dir, locale, frontmatter, body);
  }
}
