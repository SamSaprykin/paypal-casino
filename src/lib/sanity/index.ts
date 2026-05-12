// HTTP client + endpoint
export {
  SANITY_GRAPHQL_API_VERSION,
  sanityGraphqlEndpoint,
  sanityGraphqlFetch,
} from "./client";

// Intl helpers
export { deepPickIntl, resolveWebsiteLocale } from "./intl";
export { WEBSITE_LOCALE_KEYS, isWebsiteLocaleKey } from "./locales";
export type { WebsiteLocaleKey } from "./locales";

// Routing
export {
  HOME_CMS_SLUG,
  LOCALIZED_PAGE_LANG_CODES,
  LOCALE_PATH_PREFIX,
  NAV_LABELS,
  ROOT_WEBSITE_LOCALE,
  WEBSITE_LOCALE_LABELS,
  hrefFromCmsSlug,
  homeHrefForLocale,
  localizedHref,
  localizedStaticPageHref,
  websiteLocaleFromPageLang,
} from "./routing";
export type { LocalizedPageLangCode } from "./routing";

// Queries (raw GraphQL strings — usually consumed by the fetchers below)
export {
  ALL_BLOG_POSTS_QUERY,
  ALL_WEBSITE_PAGES_INTL_QUERY,
  BLOG_POSTS_BY_CATEGORY_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  buildWebsitePageBySlugQuery,
} from "./queries";

// Page model + adapter
export { adaptWebsitePage } from "./sections";
export type {
  BonusItem,
  BonusesListSection,
  CasinoListSection,
  ContentSection,
  FaqSection,
  HowToSection,
  PageSection,
  PageSeo,
  WebsitePage,
} from "./sections";

// Card adapters (only consumed by legacy card components)
export { adaptCasinoForCard } from "./cards";
export type { CasinoCardData } from "./cards";

// Page fetchers
export {
  getPageSeoData,
  getWebsitePageBySlug,
  getWebsitePageHrefByName,
  getWebsitePageStaticPaths,
  getWebsitePages,
  type WebsitePageListEntry,
} from "./websitePages";

// Blog fetchers
export {
  BLOG_CATEGORY_LABELS,
  getAllBlogPostsSanity,
  getBlogCategoriesSanity,
  getBlogCategoriesWithCountsSanity,
  getBlogPostBySlugSanity,
  getPostsByCategorySlugSanity,
  normalizeBlogPost,
  resolveBlogCategoryLabel,
} from "./blogPosts";
export type { SanityBlogArticle } from "./blogPosts";

// Misc
export { portableTextApproxMinutes, portableTextToPlainText } from "./portableTextPlain";
export { urlForSanityImage } from "./imageUrl";
