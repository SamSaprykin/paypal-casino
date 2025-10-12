import { fetchContentfulEntries, resolveLinks } from "./client";

export async function getCasinoBySlug(slug) {
  try {
    const response = await fetchContentfulEntries("casino", {
      "fields.slug": slug,
      limit: 1,
    });

    const casino = response.items?.[0];
    if (!casino) {
      return null;
    }

    // Resolve linked entries and assets
    const resolvedCasino = resolveLinks(casino, response.includes);

    // Transform the data to match the expected GraphQL format for backward compatibility
    return {
      sys: resolvedCasino.sys,
      slug: resolvedCasino.fields.slug,
      casinoName: resolvedCasino.fields.casinoName,
      logo: resolvedCasino.fields.logo,
      website: resolvedCasino.fields.website,
      backgroundColor: resolvedCasino?.fields?.backgroundColor,
      payoutLimits: resolvedCasino?.fields?.payoutLimits,
      payoutTimes: resolvedCasino.fields.payoutTimes,
      depositMethods: resolvedCasino.fields.depositMethods,
      withdrawalMethod: resolvedCasino.fields.withdrawalMethod,
      withdrawalTimes: resolvedCasino.fields.withdrawalTimes,
      withdrawalLimits: resolvedCasino.fields.withdrawalLimits,
      software: resolvedCasino.fields.software,
      referralUrl: resolvedCasino.fields.referralUrl,
      bonusesTitle: resolvedCasino.fields.bonusesTitle,
      shortDescription: resolvedCasino.fields.shortDescription,
      content: resolvedCasino.fields.content,
      welcomeBonus: resolvedCasino.fields.welcomeBonus,
      trustScore: resolvedCasino.fields.trustScore,
      userRecommendationsRecommendedNumber:
        resolvedCasino.fields.userRecommendationsRecommendedNumber,
      userRecommendationsTotalNumber:
        resolvedCasino.fields.userRecommendationsTotalNumber,
      seoComponent: resolvedCasino.fields.seoComponent,
      faqComponent: resolvedCasino.fields.faqComponent
        ? {
            ...resolvedCasino.fields.faqComponent,
            faqItemsCollection: {
              items: Array.isArray(resolvedCasino.fields.faqComponent.faqItems)
                ? resolvedCasino.fields.faqComponent.faqItems
                : [],
            },
          }
        : null,
      // Transform arrays to match GraphQL collection format
      bonusesCollection: {
        items: Array.isArray(resolvedCasino.fields.bonuses)
          ? resolvedCasino.fields.bonuses
          : [],
      },
      reviewsCollection: {
        items: Array.isArray(resolvedCasino.fields.reviews)
          ? resolvedCasino.fields.reviews
          : [],
      },
      casinoRatesCollection: {
        items: Array.isArray(resolvedCasino.fields.casinoRates)
          ? resolvedCasino.fields.casinoRates
          : [],
      },
      overviewsCollection: {
        items: Array.isArray(resolvedCasino.fields.overviews)
          ? resolvedCasino.fields.overviews
          : [],
      },
      ...resolvedCasino.fields, // Include any other fields
    };
  } catch (error) {
    console.error("Error fetching casino by slug:", error);
    return null;
  }
}

export async function getAllCasinos() {
  try {
    const response = await fetchContentfulEntries("casino", {
      limit: 100,
    });

    if (!response.items) {
      return [];
    }

    return response.items;
  } catch (error) {
    console.error("Error fetching all casinos:", error);
    return [];
  }
}

export async function getCasinoSeoData(slug) {
  try {
    const response = await fetchContentfulEntries("casino", {
      "fields.slug": slug,
      limit: 1,
      select: "sys.id,fields.slug,fields.casinoName,fields.seoComponent",
    });

    const casino = response.items?.[0];
    if (!casino) {
      return null;
    }

    // Resolve linked entries and assets
    const resolvedCasino = resolveLinks(casino, response.includes);

    return {
      sys: resolvedCasino.sys,
      slug: resolvedCasino.fields.slug,
      casinoName: resolvedCasino.fields.casinoName,
      seoComponent: resolvedCasino.fields.seoComponent,
    };
  } catch (error) {
    console.error("Error fetching casino SEO data:", error);
    return null;
  }
}

export async function getWebsitePageBySlug(slug) {
  try {
    const response = await fetchContentfulEntries("websitePage", {
      "fields.slug": slug,
      limit: 1,
    });

    const websitePage = response.items?.[0];
    if (!websitePage) {
      return null;
    }

    // Resolve linked entries and assets
    const resolvedPage = resolveLinks(websitePage, response.includes);

    return {
      sys: resolvedPage.sys,
      name: resolvedPage.fields.name,
      slug: resolvedPage.fields.slug,
      seoComponent: resolvedPage.fields.seoComponent,
      ...resolvedPage.fields, // Include any other fields
    };
  } catch (error) {
    console.error("Error fetching website page by slug:", error);
    return null;
  }
}

export async function getPageSeoData(slug) {
  try {
    const response = await fetchContentfulEntries("websitePage", {
      "fields.slug": slug || "/",
      limit: 1,
    });

    const websitePage = response.items?.[0];
    if (!websitePage) {
      return null;
    }

    // Resolve linked entries and assets
    const resolvedPage = resolveLinks(websitePage, response.includes);

    return {
      seoComponent: resolvedPage.fields.seoComponent,
    };
  } catch (error) {
    console.error("Error fetching page SEO data:", error);
    return null;
  }
}

export async function getWebsitePages() {
  try {
    const response = await fetchContentfulEntries("websitePage", {
      limit: 100,
    });

    if (!response.items) {
      return [];
    }

    return response.items;
  } catch (error) {
    console.error("Error fetching website pages:", error);
    return [];
  }
}

// Blog Post Functions
export async function getAllPosts() {
  try {
    const response = await fetchContentfulEntries("blogPost", {
      order: "-fields.created",
    });

    if (!response.items) {
      return [];
    }

    // Resolve linked entries and assets for all posts
    const resolvedPosts = response.items.map((post) => {
      const resolvedPost = resolveLinks(post, response.includes);
      return {
        sys: resolvedPost.sys,
        title: resolvedPost.fields.title,
        cardDescription: resolvedPost.fields.cardDescription,
        category: resolvedPost.fields.category,
        created: resolvedPost.fields.created,
        slug: resolvedPost.fields.slug,
        featuredImage: resolvedPost.fields.featuredImage,
        description: resolvedPost.fields.description,
        body: resolvedPost.fields.body,
        relatedCasinosList: resolvedPost.fields.relatedCasinosList || [],
        highlights: resolvedPost.fields.highlights,
        ...resolvedPost.fields, // Include any other fields
      };
    });

    return resolvedPosts;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

export async function getPostsByCategory(category) {
  try {
    const response = await fetchContentfulEntries("blogPost", {
      "fields.category": category,
      order: "-fields.created",
    });

    if (!response.items) {
      return [];
    }

    // Resolve linked entries and assets for all posts
    const resolvedPosts = response.items.map((post) => {
      const resolvedPost = resolveLinks(post, response.includes);
      return {
        sys: resolvedPost.sys,
        title: resolvedPost.fields.title,
        cardDescription: resolvedPost.fields.cardDescription,
        category: resolvedPost.fields.category,
        created: resolvedPost.fields.created,
        slug: resolvedPost.fields.slug,
        featuredImage: resolvedPost.fields.featuredImage,
        description: resolvedPost.fields.description,
        body: resolvedPost.fields.body,
        relatedCasinosList: resolvedPost.fields.relatedCasinosList || [],
        highlights: resolvedPost.fields.highlights,
        ...resolvedPost.fields, // Include any other fields
      };
    });

    return resolvedPosts;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const response = await fetchContentfulEntries("blogPost", {
      "fields.slug": slug,
      limit: 1,
    });

    const post = response.items?.[0];
    if (!post) {
      return null;
    }

    // Resolve linked entries and assets
    const resolvedPost = resolveLinks(post, response.includes);

    return {
      sys: resolvedPost.sys,
      title: resolvedPost.fields.title,
      cardDescription: resolvedPost.fields.cardDescription,
      category: resolvedPost.fields.category,
      created: resolvedPost.fields.created,
      slug: resolvedPost.fields.slug,
      featuredImage: resolvedPost.fields.featuredImage,
      description: resolvedPost.fields.description,
      body: resolvedPost.fields.body,
      relatedCasinosList: resolvedPost.fields.relatedCasinosList || [],
      highlights: resolvedPost.fields.highlights,
      ...resolvedPost.fields, // Include any other fields
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}


// Helper function to get all unique categories from blog posts
export async function getBlogCategories() {
  try {
    const response = await fetchContentfulEntries("blogPost", {
      select: "fields.category",
    });

    if (!response.items) {
      return [];
    }

    const categories = response.items
      .map((post) => post.fields.category)
      .filter((category) => category) // Remove null/undefined categories
      .filter((category, index, array) => array.indexOf(category) === index); // Remove duplicates

    return categories;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

// Helper function to get categories with post counts
export async function getBlogCategoriesWithCounts() {
  try {
    const response = await fetchContentfulEntries("blogPost", {
      select: "fields.category",
    });

    if (!response.items) {
      return [];
    }

    // Count posts per category
    const categoryCount = {};
    response.items.forEach((post) => {
      const category = post.fields.category;
      if (category) {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }
    });

    // Get total count for "All" category
    const totalCount = response.items.length;

    // Create categories array with counts
    const categories = [
      { name: "All", count: totalCount },
      ...Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count,
      })),
    ];

    return categories;
  } catch (error) {
    console.error("Error fetching blog categories with counts:", error);
    return [];
  }
}

// Helper function to transform Contentful rich text to plain text if needed
export function richTextToPlainText(richText) {
  if (!richText || !richText.content) {
    return "";
  }

  return richText.content
    .map((node) => {
      if (node.nodeType === "paragraph" && node.content) {
        return node.content.map((textNode) => textNode.value || "").join("");
      }
      return "";
    })
    .join(" ");
}
