import { slugify } from "../helpers.js";
import { adaptCasinoForCard, type CasinoCardData } from "./cards";
import { sanityGraphqlFetch } from "./client";
import { portableTextToPlainText } from "./portableTextPlain";
import {
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POSTS_BY_CATEGORY_QUERY,
} from "./queries";

/** Shape consumed by Astro pages (blog detail, listing, schema helpers). */
export interface SanityBlogArticle {
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

/** Canonical category labels from Sanity Studio (`blogPost.category`). */
export const BLOG_CATEGORY_LABELS = [
  "Casino Reviews",
  "Bonuses",
  "Game Guides",
  "Payment Methods",
  "News",
  "Tips And Strategies",
] as const;

export function resolveBlogCategoryLabel(slugParam: string | undefined): string | undefined {
  if (!slugParam) return undefined;
  const norm = slugParam.toLowerCase();
  return BLOG_CATEGORY_LABELS.find((label) => slugify(label) === norm);
}

function featuredAssetUrl(raw: Record<string, unknown>): string | undefined {
  const fi = raw.featuredImage;
  if (fi && typeof fi === "object") {
    return (fi as { asset?: { url?: string } }).asset?.url;
  }
  return undefined;
}

function normalizeAuthor(author: unknown): SanityBlogArticle["author"] {
  if (!author || typeof author !== "object") {
    return { fields: { name: "Editorial Team", bio: "", expertise: [] } };
  }
  const a = author as Record<string, unknown>;
  const expertiseRaw = a.expertise;
  const expertise = Array.isArray(expertiseRaw)
    ? expertiseRaw.filter((x): x is string => typeof x === "string")
    : [];
  const bio =
    typeof a.bio === "string" ? a.bio : portableTextToPlainText(a.bio);
  return {
    fields: {
      name: typeof a.name === "string" ? a.name : "Editorial Team",
      bio,
      expertise,
    },
  };
}

function normalizeSeo(seo: unknown): SanityBlogArticle["seoComponent"] {
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

export function normalizeBlogPost(raw: Record<string, unknown>): SanityBlogArticle {
  const url = featuredAssetUrl(raw);
  const relatedRaw = raw.relatedCasinosList;
  const relatedCasinosList = (
    Array.isArray(relatedRaw)
      ? relatedRaw.map(adaptCasinoForCard).filter(Boolean)
      : []
  ) as CasinoCardData[];

  return {
    sys: { id: String(raw._id ?? "") },
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    category: String(raw.category ?? ""),
    cardDescription: raw.cardDescription as string | null | undefined,
    created: String(raw.created ?? ""),
    description: raw.description as string | null | undefined,
    body: Array.isArray(raw.bodyRaw ?? raw.body)
      ? ((raw.bodyRaw ?? raw.body) as unknown[])
      : [],
    highlights: Array.isArray(raw.highlightsRaw ?? raw.highlights)
      ? ((raw.highlightsRaw ?? raw.highlights) as unknown[])
      : undefined,
    relatedCasinosTitle: raw.relatedCasinosTitle as string | null | undefined,
    relatedCasinosList,
    author: normalizeAuthor(raw.author),
    seoComponent: normalizeSeo(raw.seoComponent),
    featuredImage: url ? { fields: { file: { url } } } : undefined,
  };
}

type BlogPostRow = Record<string, unknown>;
type AllBlogPostsResult = { allBlogPost: BlogPostRow[] };

export async function getAllBlogPostsSanity(): Promise<SanityBlogArticle[]> {
  const data = await sanityGraphqlFetch<AllBlogPostsResult>(ALL_BLOG_POSTS_QUERY);
  return data.allBlogPost.map((row) => normalizeBlogPost(row));
}

export async function getBlogPostBySlugSanity(slug: string): Promise<SanityBlogArticle | null> {
  const data = await sanityGraphqlFetch<AllBlogPostsResult>(BLOG_POST_BY_SLUG_QUERY, {
    slug,
  });
  const raw = data.allBlogPost[0];
  return raw ? normalizeBlogPost(raw) : null;
}

export async function getPostsByCategorySlugSanity(
  categorySlug: string,
): Promise<SanityBlogArticle[]> {
  const label = resolveBlogCategoryLabel(categorySlug);
  if (!label) return [];

  const data = await sanityGraphqlFetch<AllBlogPostsResult>(
    BLOG_POSTS_BY_CATEGORY_QUERY,
    { category: label },
  );
  return data.allBlogPost.map((row) => normalizeBlogPost(row));
}

export async function getBlogCategoriesWithCountsSanity(): Promise<
  { name: string; count: number }[]
> {
  const posts = await getAllBlogPostsSanity();
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

export async function getBlogCategoriesSanity(): Promise<string[]> {
  const posts = await getAllBlogPostsSanity();
  return Array.from(new Set(posts.map((p) => p.category).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b),
  );
}
