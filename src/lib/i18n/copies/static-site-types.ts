export interface ContactPageCopy {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbHome: string;
  h1: string;
  greeting: string;
  body: string;
  disclaimer: string;
}

export interface PrivacySection {
  title: string;
  body: string;
}

export interface PrivacyPageCopy {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbHome: string;
  h1: string;
  intro: string;
  sections: PrivacySection[];
  dpoTitle: string;
  dpoBodyPrefix: string;
}

export interface TermsPageCopy {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbHome: string;
  h1: string;
  intro: string;
  sections: PrivacySection[];
  closing: string;
}

export interface NotFoundCopy {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  body: string;
  ctaHome: string;
}

export interface SitemapLabels {
  home: string;
  blog: string;
  contact: string;
  privacy: string;
  terms: string;
  ratingGuidelines: string;
  classicGames: string;
  tetris: string;
  tetris50: string;
  sudoku: string;
  solitaire: string;
  yukon: string;
  russian: string;
}

export interface SitemapPageCopy {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  sectionMainPages: string;
  sectionBlogCategories: string;
  sectionWebsitePages: string;
  sectionAllBlogPosts: string;
  labels: SitemapLabels;
}

export interface GameCardCopy {
  tagline: string;
  description: string;
  cta: string;
}

export interface ClassicGamesHubGamesCopy {
  tetris: GameCardCopy;
  tetris50: GameCardCopy;
  sudoku: GameCardCopy;
  solitaire: GameCardCopy;
  yukon: GameCardCopy;
  russian: GameCardCopy;
}

export interface ClassicGamesHubCopy {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbHome: string;
  h1: string;
  intro: string;
  pickGame: string;
  games: ClassicGamesHubGamesCopy;
  footerComparison: {
    beforeTetris: string;
    tetrisLabel: string;
    between: string;
    tetris50Label: string;
    after: string;
  };
}

export interface StaticSitePagesCopy {
  contact: ContactPageCopy;
  privacy: PrivacyPageCopy;
  terms: TermsPageCopy;
  notFound: NotFoundCopy;
  sitemap: SitemapPageCopy;
  classicGamesHub: ClassicGamesHubCopy;
}
