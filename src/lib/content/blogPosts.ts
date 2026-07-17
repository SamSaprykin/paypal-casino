import { slugify } from "../helpers.js";
import { adaptCasinoForCard, type CasinoCardData } from "../cms/cards";
import { ROOT_WEBSITE_LOCALE } from "../cms/routing";
import { getCasinoReviewBodyMap } from "./casinos";
import { readAllBlogPostsRaw, readBlogPostRaw } from "./store";

export interface BlogArticle {
  sys: { id: string };
  title: string;
  slug: string;
  category: string;
  cardDescription?: string | null;
  created: string;
  description?: string | null;
  body: unknown[];
  highlights?: unknown[];
  relatedCasinosTitle?: string | null;
  relatedCasinosList: CasinoCardData[];
  author: {
    fields: {
      name: string;
      bio: string;
      expertise: string[];
    };
  };
  featuredImage?: { fields: { file: { url?: string } } };
  seoComponent?: {
    fields: {
      seoTitle?: string;
      seoDescription?: string;
      seoSlug?: string;
      openGraphTitle?: string;
      openGraphDescription?: string;
      openGraphImage?: { fields?: { file?: { url?: string } } };
      noIndex?: boolean;
      noFollow?: boolean;
      keywords?: string[];
    };
  };
}

export const BLOG_CATEGORY_LABELS = [
  "Casino Reviews",
  "Bonuses",
  "Game Guides",
  "Payment Methods",
  "News",
  "Tips And Strategies",
] as const;

export function resolveBlogCategoryLabel(
  slugParam: string | undefined,
): string | undefined {
  if (!slugParam) return undefined;
  const norm = slugParam.toLowerCase();
  return BLOG_CATEGORY_LABELS.find((label) => slugify(label) === norm);
}

function normalizeAuthor(author: unknown): BlogArticle["author"] {
  if (!author || typeof author !== "object") {
    return { fields: { name: "Editorial Team", bio: "", expertise: [] } };
  }
  const a = author as Record<string, unknown>;
  const expertiseRaw = a.expertise;
  const expertise = Array.isArray(expertiseRaw)
    ? expertiseRaw.filter((x): x is string => typeof x === "string")
    : [];
  const bio = typeof a.bio === "string" ? a.bio : "";
  return {
    fields: {
      name: typeof a.name === "string" ? a.name : "Editorial Team",
      bio,
      expertise,
    },
  };
}

function normalizeSeo(seo: unknown): BlogArticle["seoComponent"] {
  if (!seo || typeof seo !== "object") return undefined;
  const s = seo as Record<string, unknown>;
  const seoTitle = typeof s.seoTitle === "string" ? s.seoTitle : undefined;
  const seoDescription =
    typeof s.seoDescription === "string" ? s.seoDescription : undefined;
  const seoSlug = typeof s.seoSlug === "string" ? s.seoSlug : undefined;
  return {
    fields: {
      seoTitle,
      seoDescription,
      seoSlug,
      openGraphTitle: seoTitle,
      openGraphDescription: seoDescription,
      openGraphImage: undefined,
      noIndex: false,
      noFollow: false,
      keywords: [],
    },
  };
}

/** MDX body is stored as markdown string — wrap for legacy BlogPortableBody consumers. */
function markdownBodyToBlocks(markdown: string): unknown[] {
  if (!markdown.trim()) return [];
  return [
    {
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text: markdown }],
    },
  ];
}

export function normalizeBlogPost(
  frontmatter: Record<string, unknown>,
  body: string,
  reviewBodyMap?: Map<string, boolean>,
  relatedCasinosRaw?: unknown[],
): BlogArticle {
  const featuredUrl =
    typeof frontmatter.featuredImage === "string"
      ? frontmatter.featuredImage
      : undefined;

  const relatedRaw = relatedCasinosRaw ?? [];
  const relatedCasinosList = (
    Array.isArray(relatedRaw)
      ? relatedRaw
          .map((c) => adaptCasinoForCard(c, ROOT_WEBSITE_LOCALE, reviewBodyMap))
          .filter(Boolean)
      : []
  ) as CasinoCardData[];

  const highlights =
    typeof frontmatter.highlights === "string" ? frontmatter.highlights : "";

  return {
    sys: { id: String(frontmatter.id ?? "") },
    title: String(frontmatter.title ?? ""),
    slug: String(frontmatter.slug ?? ""),
    category: String(frontmatter.category ?? ""),
    cardDescription: frontmatter.cardDescription as string | null | undefined,
    created: String(frontmatter.created ?? ""),
    description: frontmatter.description as string | null | undefined,
    body: markdownBodyToBlocks(body),
    highlights: highlights ? markdownBodyToBlocks(highlights) : undefined,
    relatedCasinosTitle: frontmatter.relatedCasinosTitle as
      string | null | undefined,
    relatedCasinosList,
    author: normalizeAuthor(frontmatter.author),
    seoComponent: normalizeSeo(frontmatter.seo),
    featuredImage: featuredUrl
      ? { fields: { file: { url: featuredUrl } } }
      : undefined,
  };
}

export async function getAllBlogPosts(): Promise<BlogArticle[]> {
  const [posts, reviewBodyMap] = await Promise.all([
    readAllBlogPostsRaw(),
    getCasinoReviewBodyMap(),
  ]);

  return posts.map((p) =>
    normalizeBlogPost(p.frontmatter, p.body, reviewBodyMap),
  );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  const [raw, reviewBodyMap] = await Promise.all([
    readBlogPostRaw(slug),
    getCasinoReviewBodyMap(),
  ]);
  if (!raw) return null;
  return normalizeBlogPost(raw.frontmatter, raw.body, reviewBodyMap);
}

export async function getPostsByCategorySlug(
  categorySlug: string,
): Promise<BlogArticle[]> {
  const label = resolveBlogCategoryLabel(categorySlug);
  if (!label) return [];

  const posts = await getAllBlogPosts();
  return posts.filter((p) => p.category === label);
}

export async function getBlogCategoriesWithCounts(): Promise<
  { name: string; count: number }[]
> {
  const posts = await getAllBlogPosts();
  const counts: Record<string, number> = {};
  for (const p of posts) {
    const cat = p.category;
    if (cat) counts[cat] = (counts[cat] ?? 0) + 1;
  }
  const ordered = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [{ name: "All", count: posts.length }, ...ordered];
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b),
  );
}
