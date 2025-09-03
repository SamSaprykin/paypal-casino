import {
  SCHEMA_TYPES,
  createBaseSchema,
  formatSchemaDate,
  ensureAbsoluteUrl,
  cleanTextForSchema,
} from "./types.js";

// Organization schema for the Crypto Casino website
export function generateOrganizationSchema() {
  return createBaseSchema(SCHEMA_TYPES.ORGANIZATION, {
    name: "Casinos-BTC.com",
    alternateName: "Casinos-BTC.com",
    url: "https://casinos-btc.com",
    description:
      "Expert casino reviews and gambling guides for players. Find the best online casinos, bonuses, and gaming tips.",
    foundingDate: "2025",
    knowsAbout: [
      "Online Casino Reviews",
      "Casino Bonuses",
      "Gambling Guides",
      "Bitcoin Casinos",
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
  baseUrl = "https://casinos-btc.com",
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

  // Add keywords if available
  if (post.highlights && Array.isArray(post.highlights)) {
    schema.keywords = post.highlights.join(", ");
  }

  return schema;
}

// Review schema for casino reviews
export function generateCasinoReviewSchema(
  casino,
  baseUrl = "https://bitcoingambling.com",
) {
  if (!casino) return null;

  const schema = createBaseSchema(SCHEMA_TYPES.REVIEW, {
    itemReviewed: {
      "@type": SCHEMA_TYPES.CASINO,
      name: casino.casinoName,
      url: casino.website,
      description: cleanTextForSchema(casino.shortDescription),
      image: casino.logo?.fields?.file?.url
        ? ensureAbsoluteUrl(casino.logo.fields.file.url)
        : null,
    },
    reviewRating: {
      "@type": SCHEMA_TYPES.RATING,
      ratingValue:
        casino.casinoRatesCollection.items[0].fields.ratingNumber ?? 4.6,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      name: "Casinos-BTC Casino Reviews",
    },
    publisher: generateOrganizationSchema(),
    url: ensureAbsoluteUrl(`/casino-guide/${casino.slug}`, baseUrl),
    datePublished: formatSchemaDate(casino.sys?.createdAt),
    dateModified: formatSchemaDate(casino.sys?.updatedAt),
  });

  // Add aggregate rating if user recommendations are available
  if (
    casino.userRecommendationsTotalNumber &&
    casino.userRecommendationsRecommendedNumber
  ) {
    schema.itemReviewed.aggregateRating = {
      "@type": SCHEMA_TYPES.AGGREGATE_RATING,
      ratingValue:
        casino.casinoRatesCollection.items[0].fields.ratingNumber ?? 4.6,
      reviewCount: casino.userRecommendationsTotalNumber,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add review body from content
  if (casino.content) {
    schema.reviewBody = cleanTextForSchema(casino.content, 500);
  }

  // Add pros and cons if available
  if (casino.overviewsCollection?.items) {
    const prosAndCons = casino.overviewsCollection.items;
    const pros = prosAndCons
      .filter((item) => item.type === "pro")
      .map((item) => item.text);
    const cons = prosAndCons
      .filter((item) => item.type === "con")
      .map((item) => item.text);

    if (pros.length > 0 || cons.length > 0) {
      schema.positiveNotes = pros;
      schema.negativeNotes = cons;
    }
  }

  return schema;
}

// FAQ schema for FAQ sections
export function generateFAQSchema(faqComponent) {
  if (!faqComponent) return null;

  let faqItems = [];

  // Handle casino review format: faqComponent.faqItemsCollection.items
  if (faqComponent.faqItemsCollection?.items) {
    faqItems = faqComponent.faqItemsCollection.items.map((item) => ({
      "@type": "Question",
      name: cleanTextForSchema(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanTextForSchema(item.answer),
      },
    }));
  }
  // Handle regular page format: faqComponent.fields.faqItems
  else if (faqComponent.fields?.faqItems) {
    faqItems = faqComponent.fields.faqItems.map((item) => ({
      "@type": "Question",
      name: cleanTextForSchema(item.fields.faqQuestion),
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanTextForSchema(item.fields.faqAnswer),
      },
    }));
  }

  // Return null if no FAQ items found
  if (faqItems.length === 0) return null;

  return createBaseSchema(SCHEMA_TYPES.FAQ_PAGE, {
    mainEntity: faqItems,
  });
}

// WebPage schema for static pages
export function generateWebPageSchema(
  page,
  baseUrl = "https://casinos-btc.com",
) {
  if (!page) return null;

  // Handle homepage URL correctly
  const pageUrl =
    page.slug === "/" ? baseUrl : ensureAbsoluteUrl(`/${page.slug}`, baseUrl);

  return createBaseSchema(SCHEMA_TYPES.WEB_PAGE, {
    name: page.name || page.title,
    description: cleanTextForSchema(
      page.seoComponent?.seoDescription || page.description,
      160,
    ),
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Casinos-BTC.com",
      url: baseUrl,
    },
    about: {
      "@type": "Thing",
      name: page.name || page.title,
    },
    publisher: generateOrganizationSchema(),
    datePublished: formatSchemaDate(page.sys?.createdAt),
    dateModified: formatSchemaDate(page.sys?.updatedAt),
  });
}

// BreadcrumbList schema for navigation
export function generateBreadcrumbSchema(
  breadcrumbs,
  baseUrl = "https://casinos-btc.com",
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
  baseUrl = "https://casinos-btc.com",
) {
  const schema = createBaseSchema(SCHEMA_TYPES.COLLECTION_PAGE, {
    name: title,
    description: cleanTextForSchema(description, 160),
    url: ensureAbsoluteUrl(url, baseUrl),
    isPartOf: {
      "@type": "WebSite",
      name: "Casinos-BTC.com",
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

// Helper function to generate breadcrumbs for casino reviews
export function generateCasinoReviewBreadcrumbs(casinoName) {
  return [
    { name: "Home", url: "/" },
    { name: "Casino Reviews", url: "/casino-guide" },
    { name: `${casinoName} Review`, url: "#" }, // Current page
  ];
}

// Helper function to generate breadcrumbs for static pages
export function generateStaticPageBreadcrumbs(pageName) {
  return [
    { name: "Home", url: "/" },
    { name: pageName, url: "#" }, // Current page
  ];
}
