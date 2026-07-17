import {
  SCHEMA_TYPES,
  createBaseSchema,
  formatSchemaDate,
  ensureAbsoluteUrl,
  cleanTextForSchema,
} from "./types.js";
import { portableTextToPlainText } from "../cms/portableTextPlain.ts";

// Organization schema for the PayPal Casino website
export function generateOrganizationSchema() {
  return createBaseSchema(SCHEMA_TYPES.ORGANIZATION, {
    name: "PayPal Casino Reviews",
    alternateName: "PP Casinos Info",
    url: "https://ppcasinos.co",
    description:
      "Expert reviews of the best PayPal casinos online. Find trusted casinos that accept PayPal deposits and withdrawals with exclusive bonuses.",
    foundingDate: "2025",
    knowsAbout: [
      "PayPal Casino Reviews",
      "Online Casino Bonuses",
      "PayPal Gambling Guides",
      "PayPal Casinos",
      "Responsible Gambling",
    ],
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
  });
}

// Article schema for blog posts
export function generateArticleSchema(
  post,
  author,
  baseUrl = "https://ppcasinos.co",
) {
  if (!post) return null;

  const schema = createBaseSchema(SCHEMA_TYPES.ARTICLE, {
    headline: cleanTextForSchema(post.title, 110),
    description: cleanTextForSchema(
      post.cardDescription || post.description,
      160,
    ),
    url: ensureAbsoluteUrl(
      `/blog/${post.category?.toLowerCase().replace(/\s+/g, "-")}/${post.slug}`,
      baseUrl,
    ),
    datePublished: formatSchemaDate(post.created),
    dateModified: formatSchemaDate(post.sys?.updatedAt || post.created),
    author: {
      "@type": SCHEMA_TYPES.PERSON,
      name:
        author?.name || author?.fields?.name || "Casinos-BTC Editorial Team",
      description: author?.bio || author?.fields?.bio,
      knowsAbout: author?.expertise || author?.fields?.expertise || [],
    },
    publisher: generateOrganizationSchema(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": ensureAbsoluteUrl(
        `/blog/${post.category?.toLowerCase().replace(/\s+/g, "-")}/${post.slug}`,
        baseUrl,
      ),
    },
  });

  // Add featured image if available
  if (post.featuredImage?.fields?.file?.url || post.featuredImage?.url) {
    const imageUrl =
      post.featuredImage?.fields?.file?.url || post.featuredImage?.url;
    schema.image = {
      "@type": "ImageObject",
      url: ensureAbsoluteUrl(imageUrl),
      width: post.featuredImage?.fields?.file?.details?.image?.width || 1200,
      height: post.featuredImage?.fields?.file?.details?.image?.height || 630,
    };
  }

  // Add article section/category
  if (post.category) {
    schema.articleSection = post.category;
    schema.about = {
      "@type": "Thing",
      name: post.category,
    };
  }

  // Add keywords if available (Portable Text highlights from Sanity)
  if (post.highlights && Array.isArray(post.highlights)) {
    const kw = portableTextToPlainText(post.highlights);
    if (kw) schema.keywords = kw.slice(0, 280);
  }

  return schema;
}

// FAQ schema for FAQ sections.
// Accepts the typed `FaqSection` shape ({ items: [{ question, answer }] }) and
// also tolerates legacy/Contentful shapes for embedded review FAQs.
export function generateFAQSchema(faqComponent) {
  if (!faqComponent) return null;

  const sources = [
    faqComponent.items,
    faqComponent.faqItemsCollection?.items,
    faqComponent.fields?.faqItems,
  ];

  let faqItems = [];
  for (const list of sources) {
    if (!Array.isArray(list) || list.length === 0) continue;
    faqItems = list
      .map((item) => {
        const question =
          item.question ?? item.fields?.faqQuestion ?? item.faqQuestion;
        const answer = item.answer ?? item.fields?.faqAnswer ?? item.faqAnswer;
        const name = cleanTextForSchema(question);
        const text = cleanTextForSchema(answer);
        if (!name || !text) return null;
        return {
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        };
      })
      .filter(Boolean);
    if (faqItems.length) break;
  }

  if (faqItems.length === 0) return null;
  return createBaseSchema(SCHEMA_TYPES.FAQ_PAGE, { mainEntity: faqItems });
}

// WebPage schema for static pages
export function generateWebPageSchema(page, baseUrl = "https://ppcasinos.co") {
  if (!page) return null;

  const slugPath =
    !page.slug || page.slug === "/"
      ? "/"
      : `/${String(page.slug)
          .replace(/^\/+|\/+$/g, "")
          .split("/")
          .filter(Boolean)
          .join("/")}/`;

  const pageUrl =
    slugPath === "/" ? baseUrl : ensureAbsoluteUrl(slugPath, baseUrl);

  const seoFields = page.seo ?? page.seoComponent?.fields ?? page.seoComponent;

  return createBaseSchema(SCHEMA_TYPES.WEB_PAGE, {
    name: page.name || page.title,
    description: cleanTextForSchema(
      seoFields?.seoDescription ?? page.description,
      160,
    ),
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "PayPal Casino Reviews",
      url: baseUrl,
    },
    about: {
      "@type": "Thing",
      name: page.name || page.title,
    },
    publisher: generateOrganizationSchema(),
    datePublished: formatSchemaDate(page.createdAt ?? page.sys?.createdAt),
    dateModified: formatSchemaDate(
      page.updatedAt ??
        page.sys?.updatedAt ??
        page.createdAt ??
        page.sys?.createdAt,
    ),
  });
}

// BreadcrumbList schema for navigation
export function generateBreadcrumbSchema(
  breadcrumbs,
  baseUrl = "https://ppcasinos.co",
) {
  if (!breadcrumbs || !Array.isArray(breadcrumbs)) return null;

  const listItems = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: ensureAbsoluteUrl(crumb.url, baseUrl),
  }));

  return createBaseSchema(SCHEMA_TYPES.BREADCRUMB_LIST, {
    itemListElement: listItems,
  });
}

// CollectionPage schema for blog listing pages
export function generateCollectionPageSchema(
  title,
  description,
  url,
  items = [],
  baseUrl = "https://ppcasinos.co",
) {
  const schema = createBaseSchema(SCHEMA_TYPES.COLLECTION_PAGE, {
    name: title,
    description: cleanTextForSchema(description, 160),
    url: ensureAbsoluteUrl(url, baseUrl),
    isPartOf: {
      "@type": "WebSite",
      name: "PayPal Casino Info",
      url: baseUrl,
    },
    publisher: generateOrganizationSchema(),
  });

  // Add main entity as ItemList if items are provided
  if (items.length > 0) {
    schema.mainEntity = {
      "@type": SCHEMA_TYPES.ITEM_LIST,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: ensureAbsoluteUrl(item.url, baseUrl),
        name: item.title || item.name,
      })),
    };
  }

  return schema;
}

// Helper function to generate breadcrumbs for blog posts
export function generateBlogPostBreadcrumbs(category, postTitle) {
  return [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    {
      name: category,
      url: `/blog/${category.toLowerCase().replace(/\s+/g, "-")}`,
    },
    { name: postTitle, url: "#" }, // Current page
  ];
}

// Helper function to generate breadcrumbs for static pages
export function generateStaticPageBreadcrumbs(pageName, options) {
  const homeName = options?.homeName ?? "Home";
  const homeUrl = options?.homeUrl ?? "/";
  return [
    { name: homeName, url: homeUrl },
    { name: pageName, url: "#" }, // Current page
  ];
}

/** Breadcrumbs for games under /classic-games/:name/ */
export function generateClassicGameBreadcrumbs(gamePageName, options) {
  const homeName = options?.homeName ?? "Home";
  const homeUrl = options?.homeUrl ?? "/";
  const hubName = options?.classicGamesName ?? "Classic games";
  const hubUrl = options?.classicGamesUrl ?? "/classic-games/";
  return [
    { name: homeName, url: homeUrl },
    { name: hubName, url: hubUrl },
    { name: gamePageName, url: "#" },
  ];
}
