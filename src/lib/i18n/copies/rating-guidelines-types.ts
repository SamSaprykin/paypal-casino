export interface RatingProcessStep {
  title: string;
  body: string;
}

export interface RatingPillar {
  name: string;
  weight: string;
  summary: string;
  details: string[];
}

export interface RatingBand {
  range: string;
  label: string;
  body: string;
}

export interface RatingFaqItem {
  question: string;
  answer: string;
}

export interface RatingGuidelinesCopy {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  schemaName: string;
  schemaDescription: string;
  breadcrumbHome: string;
  h1: string;
  lead: string;
  snippetTitle: string;
  snippetBody: string;
  processTitle: string;
  processIntro: string;
  processSteps: RatingProcessStep[];
  pillarsTitle: string;
  pillarsIntro: string;
  pillarsToggle: string;
  pillars: RatingPillar[];
  scoresTitle: string;
  scoresIntro: string;
  bands: RatingBand[];
  updatesTitle: string;
  updatesBody: string;
  independenceTitle: string;
  independenceBody: string;
  faqTitle: string;
  faq: RatingFaqItem[];
  footerNote: string;
  ctaBlocked: string;
  ctaHome: string;
}
