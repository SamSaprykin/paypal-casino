/**
 * File-based content layer (MDX + JSON).
 */

export { pickIntlCasinoList } from "../cms/intl";
export { WEBSITE_LOCALE_KEYS, isWebsiteLocaleKey } from "../cms/locales";
export type { WebsiteLocaleKey } from "../cms/locales";

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
  localizedCasinoDetailHref,
  localizedCasinoListingHref,
  casinoUrlSegmentForLocale,
  CASINO_URL_SEGMENT,
  websiteLocaleFromPageLang,
  normalizeCmsSlug,
} from "../cms/routing";
export type { LocalizedPageLangCode } from "../cms/routing";

export { adaptWebsitePage } from "../cms/sections";
export type {
  BonusCalculatorSection,
  BonusItem,
  BonusesListSection,
  CasinoListSection,
  ContentSection,
  FaqSection,
  HowToCopyItem,
  HowToSection,
  HowToStepItem,
  ImageSection,
  MethodAvailabilityCell,
  MethodAvailabilityRow,
  MethodAvailabilitySection,
  PageSection,
  PageSeo,
  WebsitePage,
} from "../cms/sections";

export { hasCasinoReviewBody } from "../cms/intlMarkdown";
export { adaptCasinoForCard } from "../cms/cards";
export type { CasinoCardData } from "../cms/cards";

export {
  addReviewCycle,
  formatFreshnessDate,
  isReviewCycle,
  parseFreshnessDate,
  resolveFreshness,
  toIsoDateOnly,
} from "./freshness";
export type { ResolvedFreshness, ReviewCycle } from "./freshness";

export {
  getPageSeoData,
  getWebsitePageBySlug,
  getWebsitePageHrefByName,
  getWebsitePageStaticPaths,
  getWebsitePages,
  type WebsitePageListEntry,
} from "./websitePages";

export {
  BLOG_CATEGORY_LABELS,
  getAllBlogPosts,
  getBlogCategories,
  getBlogCategoriesWithCounts,
  getBlogPostBySlug,
  getPostsByCategorySlug,
  normalizeBlogPost,
  resolveBlogCategoryLabel,
} from "./blogPosts";
export type { BlogArticle } from "./blogPosts";

export {
  adaptCasinoPage,
  getAllCasinos,
  getCasinoBySlug,
  getCasinoDetailEntries,
  getCasinoReviewBodyMap,
  getLocalizedCasinoDetailStaticPaths,
  getRootCasinoDetailStaticPaths,
  isCasinoReviewPublishedInLocale,
  getCasinoCountrySelectorHrefs,
} from "./casinos";
export type {
  CasinoFaq,
  CasinoListEntry,
  CasinoPage,
  CasinoPlayerReview,
  LocalizedCasinoDetailPath,
  RootCasinoDetailPath,
} from "./casinos";

export {
  portableTextApproxMinutes,
  portableTextToPlainText,
} from "../cms/portableTextPlain";
export { readContentBody, isComponentMdx } from "./mdx";

export { resolveHeaderNav } from "./headerNav";
export type {
  HeaderCategory,
  HeaderNavIconKey,
  HeaderNavLink,
} from "./headerNav";

export { extractWebsitePageToc } from "./websitePageToc";
export type { WebsitePageTocItem } from "./websitePageToc";
