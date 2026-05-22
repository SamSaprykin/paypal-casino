/**
 * GraphQL queries for the Sanity Content Lake.
 * Schema source of truth: `src/lib/sanity/generated/schema.graphql`
 * (regenerate with `pnpm sanity:graphql:codegen`).
 */

import type { WebsiteLocaleKey } from "./locales";
import { WEBSITE_LOCALE_KEYS } from "./locales";

// ---------- Shared fragments (string-built; Sanity GraphQL doesn't require .gql files) ----------

/** All locale columns for `IntlText`/`IntlMarkdown`/`IntlDescription`/`IntlBlockContent`. */
const INTL = "denmark finland germany ireland norway sweden";

const INTL_STRING_ARRAY = `
  denmark
  finland
  germany
  ireland
  norway
  sweden
`;

const CASINO_FIELDS = `
  _id
  casinoName
  slug
  rating
  shortDescription
  referralUrl
  payoutLimits
  payoutTimes
  userRecommendationsRecommendedNumber
  userRecommendationsTotalNumber
  availableInCountries { denmark finland germany ireland norway sweden }
  backgroundColor { hex }
  logo { asset { url altText } }
  bonuses {
    _id
    name
    code
    description
    referralUrl
    bonusBackgroundColor
    bonusLogo { asset { url altText } }
  }
`;

const CASINO_LISTS_BY_COUNTRY = `
  casinoListsByCountry {
    denmark { ${CASINO_FIELDS} }
    finland { ${CASINO_FIELDS} }
    germany { ${CASINO_FIELDS} }
    ireland { ${CASINO_FIELDS} }
    norway { ${CASINO_FIELDS} }
    sweden { ${CASINO_FIELDS} }
  }
`;

const PAGE_COMPONENTS = (locale: WebsiteLocaleKey) => `
  components {
    __typename
    ... on CasinoListIntl {
      _id
      anchorTitle { ${INTL} }
      copyBefore { ${INTL} }
      copyAfter { ${INTL} }
      ${CASINO_LISTS_BY_COUNTRY}
    }
    ... on FaqComponentIntl {
      _id
      title { ${INTL} }
      spaceTop
      faqItems {
        _id
        faqQuestion { ${INTL} }
        faqAnswer { ${locale} }
      }
    }
    ... on BonusesListIntl {
      _id
      title { ${INTL} }
      bonuses {
        _id
        name
        code
        description
        referralUrl
        bonusBackgroundColor
        bonusLogo { asset { url altText } }
      }
    }
    ... on ContentComponentIntl {
      _id
      name
      bodyMarkdown { ${INTL} }
    }
    ... on SeoComponentIntl {
      _id
      seoTitle { ${INTL} }
      seoDescription { ${INTL} }
    }
  }
`;

// ---------- Website pages ----------

function assertLocale(locale: WebsiteLocaleKey) {
  if (!(WEBSITE_LOCALE_KEYS as readonly string[]).includes(locale)) {
    throw new Error(`Invalid website locale for GraphQL filter: ${locale}`);
  }
}

/** Page lookup by the locale's slug column on `WebsitePageIntl`. */
export function buildWebsitePageBySlugQuery(locale: WebsiteLocaleKey): string {
  assertLocale(locale);
  return `
query GetPageBySlug($slug: String!) {
  allWebsitePageIntl(where: { slug: { ${locale}: { eq: $slug } } }, limit: 1) {
    _id
    _createdAt
    _updatedAt
    name
    slug { ${INTL} }
    seoComponent {
      seoTitle { ${INTL} }
      seoDescription { ${INTL} }
      seoSlug { ${INTL} }
    }
    ${PAGE_COMPONENTS(locale)}
  }
}
`;
}

/** Sitemap / static-paths source — all locale slugs without the heavy components selection. */
export const ALL_WEBSITE_PAGES_INTL_QUERY = `
query AllWebsitePagesIntl {
  allWebsitePageIntl {
    _id
    name
    slug { ${INTL} }
  }
}
`;

// ---------- Blog ----------

export const ALL_BLOG_POSTS_QUERY = `
query GetAllBlogPosts {
  allBlogPost(sort: [{ created: DESC }]) {
    _id
    title
    slug
    category
    cardDescription
    description
    created
    author { name bio expertise }
    featuredImage { asset { url altText } }
    seoComponent { seoTitle seoDescription seoSlug }
  }
}
`;

export const BLOG_POST_BY_SLUG_QUERY = `
query GetBlogPostBySlug($slug: String!) {
  allBlogPost(where: { slug: { eq: $slug } }, limit: 1) {
    _id
    title
    slug
    category
    cardDescription
    description
    bodyRaw
    highlightsRaw
    created
    author { name bio expertise }
    featuredImage {
      asset {
        url
        altText
        metadata { dimensions { width height } }
      }
    }
    relatedCasinosTitle
    relatedCasinosList {
      _id
      casinoName
      slug
      rating
      referralUrl
      shortDescription
      backgroundColor { hex }
      logo { asset { url altText } }
      bonuses { _id name code description referralUrl }
    }
    seoComponent { seoTitle seoDescription seoSlug }
  }
}
`;

export const BLOG_POSTS_BY_CATEGORY_QUERY = `
query GetBlogPostsByCategory($category: String!) {
  allBlogPost(
    where: { category: { eq: $category } }
    sort: [{ created: DESC }]
  ) {
    _id
    title
    slug
    category
    cardDescription
    created
    author { name }
    featuredImage { asset { url } }
  }
}
`;

// ---------- Casino detail pages ----------

const CASINO_DETAIL_FIELDS = `
  _id
  _createdAt
  _updatedAt
  casinoName
  slug
  rating
  shortDescription
  referralUrl
  payoutLimits
  payoutTimes
  software
  depositMethods
  withdrawalMethod
  license
  userRecommendationsRecommendedNumber
  userRecommendationsTotalNumber
  availableInCountries { denmark finland germany ireland norway sweden }
  backgroundColor { hex }
  logo { asset { url altText } }
  prosIntl { ${INTL_STRING_ARRAY} }
  consIntl { ${INTL_STRING_ARRAY} }
  reviewsIntl {
    denmark { description personName country rating date }
    finland { description personName country rating date }
    germany { description personName country rating date }
    ireland { description personName country rating date }
    norway { description personName country rating date }
    sweden { description personName country rating date }
  }
  bonuses {
    _id
    name
    code
    description
    referralUrl
    bonusBackgroundColor
    bonusLogo { asset { url altText } }
  }
`;

function casinoDetailFields(locale: WebsiteLocaleKey): string {
  return `
  ${CASINO_DETAIL_FIELDS}
  body { ${locale} }
  faq {
    _id
    spaceTop
    title { ${INTL} }
    faqItems {
      _id
      faqQuestion { ${INTL} }
      faqAnswer { ${locale} }
    }
  }
`;
}

export const ALL_CASINOS_QUERY = `
query AllCasinos {
  allCasino {
    _id
    slug
    casinoName
    body { ${INTL} }
    availableInCountries { denmark finland germany ireland norway sweden }
  }
}
`;

/** Casino detail lookup — body and FAQ answers are scoped to the active locale column only. */
export function buildCasinoBySlugQuery(locale: WebsiteLocaleKey): string {
  assertLocale(locale);
  return `
query CasinoBySlug($slug: String!) {
  allCasino(where: { slug: { eq: $slug } }, limit: 1) {
    ${casinoDetailFields(locale)}
  }
}
`;
}
