// Contentful REST API Types

export interface ContentfulSys {
  id: string;
  type: string;
  contentType: {
    sys: {
      id: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  revision?: number;
}

export interface ContentfulAsset {
  sys: ContentfulSys;
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulRichText {
  nodeType: string;
  data: any;
  content: Array<{
    nodeType: string;
    value?: string;
    content?: any[];
    data?: any;
  }>;
}

// Casino Types
export interface CasinoEntry {
  sys: ContentfulSys;
  fields: {
    slug: string;
    casinoName: string;
    casinoRates?: number;
    logo?: ContentfulAsset;
    seoComponent?: SeoEntry;
    bonuses?: BonusEntry[];
    reviews?: ReviewEntry[];
    faqComponent?: FaqComponentEntry;
    gameOfTheMonth?: GameOfTheMonthEntry;
    overviewCasino?: OverviewCasinoEntry;
    casinoRating?: CasinoRatingEntry;
    // Add other casino fields as needed
  };
}

export interface SeoEntry {
  sys: ContentfulSys;
  fields: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: ContentfulAsset;
    noIndex?: boolean;
    noFollow?: boolean;
  };
}

export interface BonusEntry {
  sys: ContentfulSys;
  fields: {
    bonusTitle?: string;
    bonusDescription?: ContentfulRichText;
    bonusAmount?: string;
    bonusType?: string;
    termsAndConditions?: ContentfulRichText;
  };
}

export interface ReviewEntry {
  sys: ContentfulSys;
  fields: {
    reviewTitle?: string;
    reviewContent?: ContentfulRichText;
    rating?: number;
    author?: string;
    reviewDate?: string;
  };
}

export interface FaqItemEntry {
  sys: ContentfulSys;
  fields: {
    question?: string;
    answer?: ContentfulRichText;
  };
}

export interface FaqComponentEntry {
  sys: ContentfulSys;
  fields: {
    title?: string;
    faqItems?: FaqItemEntry[];
  };
}

export interface GameOfTheMonthEntry {
  sys: ContentfulSys;
  fields: {
    gameTitle?: string;
    gameDescription?: ContentfulRichText;
    gameImage?: ContentfulAsset;
    gameUrl?: string;
  };
}

export interface OverviewCasinoEntry {
  sys: ContentfulSys;
  fields: {
    overviewTitle?: string;
    overviewContent?: ContentfulRichText;
  };
}

export interface CasinoRatingEntry {
  sys: ContentfulSys;
  fields: {
    overallRating?: number;
    gameVariety?: number;
    bonuses?: number;
    customerSupport?: number;
    paymentMethods?: number;
  };
}

// Website Page Types
export interface WebsitePageEntry {
  sys: ContentfulSys;
  fields: {
    name: string;
    slug: string;
    seoComponent?: SeoEntry;
    pageContent?: any[]; // This would be the page components
  };
}

// Blog Post Types
export interface BlogPostEntry {
  sys: ContentfulSys;
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content?: ContentfulRichText;
    featuredImage?: ContentfulAsset;
    author?: string;
    publishDate?: string;
    tags?: string[];
    seoComponent?: SeoEntry;
  };
}

// CTA Button Types
export interface CtaButtonEntry {
  sys: ContentfulSys;
  fields: {
    buttonText?: string;
    buttonUrl?: string;
    buttonStyle?: string;
    openInNewTab?: boolean;
  };
}

// Casino List Types
export interface CasinoListEntry {
  sys: ContentfulSys;
  fields: {
    title?: string;
    casinos?: CasinoEntry[];
    displayLimit?: number;
  };
}

// Featured Articles Types
export interface FeaturedArticlesEntry {
  sys: ContentfulSys;
  fields: {
    title?: string;
    articles?: BlogPostEntry[];
    displayLimit?: number;
  };
}

// Hero Components Types
export interface HeroDefaultWithCasinoCardsEntry {
  sys: ContentfulSys;
  fields: {
    title?: string;
    subtitle?: string;
    backgroundImage?: ContentfulAsset;
    casinos?: CasinoEntry[];
    ctaButton?: CtaButtonEntry;
  };
}

export interface HeroTextEntry {
  sys: ContentfulSys;
  fields: {
    title?: string;
    subtitle?: string;
    content?: ContentfulRichText;
    backgroundImage?: ContentfulAsset;
    ctaButton?: CtaButtonEntry;
  };
}

// Utility type for resolved entries (with links resolved)
export type ResolvedEntry<T extends { fields: Record<string, any> }> = T & {
  fields: {
    [K in keyof T["fields"]]: T["fields"][K] extends ContentfulAsset
      ? ContentfulAsset
      : T["fields"][K] extends ContentfulAsset[]
        ? ContentfulAsset[]
        : T["fields"][K] extends any[]
          ? ResolvedEntry<T["fields"][K][0]>[]
          : T["fields"][K];
  };
};
