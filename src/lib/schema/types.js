// Schema type constants and validation helpers
export const SCHEMA_TYPES = {
  ORGANIZATION: "Organization",
  ARTICLE: "Article",
  REVIEW: "Review",
  FAQ_PAGE: "FAQPage",
  WEB_PAGE: "WebPage",
  BREADCRUMB_LIST: "BreadcrumbList",
  COLLECTION_PAGE: "CollectionPage",
  ITEM_LIST: "ItemList",
  CASINO: "LocalBusiness", // Casinos are a type of local business
  PERSON: "Person",
  RATING: "Rating",
  AGGREGATE_RATING: "AggregateRating",
};

export const SCHEMA_CONTEXT = "https://schema.org";

// Helper function to create base schema object
export function createBaseSchema(type, additionalProperties = {}) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": type,
    ...additionalProperties,
  };
}

// Helper function to format dates for schema
export function formatSchemaDate(date) {
  if (!date) return null;
  return new Date(date).toISOString();
}

// Helper function to ensure URLs have proper protocol
export function ensureAbsoluteUrl(url, baseUrl = "https://ppcasinos.co") {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  if (url.startsWith("/")) {
    return `${baseUrl}${url}`;
  }
  return `${baseUrl}/${url}`;
}

// Helper function to clean and truncate text for schema
export function cleanTextForSchema(text, maxLength = null) {
  if (!text) return null;

  // Remove HTML tags and markdown formatting, then clean whitespace
  const cleaned = text
    // Remove HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove markdown bold/italic (**text**, __text__, *text*, _text_)
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Remove markdown links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove markdown headers (# ## ###)
    .replace(/^#{1,6}\s+/gm, "")
    // Remove markdown code blocks (```code```)
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code (`code`)
    .replace(/`([^`]+)`/g, "$1")
    // Convert markdown lists to comma-separated text
    .replace(/\s*-\s+/g, ", ")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    // Clean up multiple commas and spaces
    .replace(/,\s*,+/g, ",")
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    // Remove extra whitespace and normalize
    .replace(/\s+/g, " ")
    .trim();

  if (maxLength && cleaned.length > maxLength) {
    return cleaned.substring(0, maxLength - 3) + "...";
  }

  return cleaned;
}
