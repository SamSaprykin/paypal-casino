export { LOCALE_IDS, LOCALES, type LocaleId, type LocaleMeta } from "./locales";
export {
  WEBSITE_LOCALE_TO_LOCALE_ID,
  localeIdForWebsiteLocale,
} from "./websiteLocaleBridge";
export { FOOTER_COPY, type FooterCopy } from "./copies/footer";
export {
  STATIC_SITE_PAGES_COPY,
  staticSitePagesCopyFor,
} from "./copies/static-site-pages";
export {
  ratingGuidelinesCopyFor,
  RATING_GUIDELINES_COPY,
} from "./copies/rating-guidelines";
export type { RatingGuidelinesCopy } from "./copies/rating-guidelines-types";
export type {
  StaticSitePagesCopy,
  ContactPageCopy,
  PrivacyPageCopy,
  TermsPageCopy,
  NotFoundCopy,
  SitemapPageCopy,
} from "./copies/static-site-types";
export {
  CASINO_LISTING_CARD_COPY,
  formatRatingOutOfFive,
  getRatingGradationLabel,
  type CasinoListingCardCopy,
} from "./copies/casino-listing-card";
export {
  CASINO_HERO_CARD_COPY,
  type CasinoHeroCardCopy,
} from "./copies/casino-hero-card";
export {
  CASINO_DETAIL_PAGE_COPY,
  type CasinoDetailPageCopy,
} from "./copies/casino-detail-page";
export { WEBSITE_PAGE_COPY, type WebsitePageCopy } from "./copies/website-page";
export {
  METHOD_AVAILABILITY_COPY,
  type MethodAvailabilityCopy,
  type MethodAvailabilityStatus,
} from "./copies/method-availability";
export {
  DEFAULT_DISCLOSURE_TYPES,
  DISCLOSURE_COPY,
  type DisclosureCopy,
  type DisclosureHelpline,
  type DisclosureType,
} from "./copies/disclosure";
export {
  HOW_TO_UI_COPY,
  formatHowToStepOf,
  type HowToUiCopy,
} from "./copies/how-to-ui";
export {
  BONUS_CALCULATOR_COPY,
  type BonusCalculatorCopy,
} from "./copies/bonus-calculator";
export {
  CONTENT_FRESHNESS_COPY,
  type ContentFreshnessCopy,
} from "./copies/content-freshness";
export {
  BLOCKED_CASINO_MODAL_COPY,
  formatBlockedCasinoModalCopy,
  type BlockedCasinoModalCopy,
} from "./copies/blocked-casino-modal";
export {
  INTL_DEMO_PAGE_COPY,
  type IntlDemoPageCopy,
} from "./copies/page-intl-demo";
export { BONUS_LIST_COPY, type BonusListCopy } from "./copies/bonus-list";
