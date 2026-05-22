export {
  LOCALE_IDS,
  LOCALES,
  type LocaleId,
  type LocaleMeta,
} from "./locales";
export {
  WEBSITE_LOCALE_TO_LOCALE_ID,
  localeIdForWebsiteLocale,
} from "./websiteLocaleBridge";
export {
  FOOTER_COPY,
  type FooterCopy,
} from "./copies/footer";
export {
  STATIC_SITE_PAGES_COPY,
  staticSitePagesCopyFor,
} from "./copies/static-site-pages";
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
export {
  WEBSITE_PAGE_COPY,
  type WebsitePageCopy,
} from "./copies/website-page";
export {
  INTL_DEMO_PAGE_COPY,
  type IntlDemoPageCopy,
} from "./copies/page-intl-demo";
