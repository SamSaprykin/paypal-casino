import type { LocaleId } from "../locales";
import type { WebsiteLocaleKey } from "../../sanity/locales";
import type { ClassicGamesHubCopy, StaticSitePagesCopy } from "./static-site-types";
import { localeIdForWebsiteLocale } from "../websiteLocaleBridge";
import {
  privacySectionsEn,
  termsSectionsEn,
} from "./static-site-english-legal";
import { STATIC_SITE_TRANSLATIONS } from "./static-site-translations";

export type {
  ContactPageCopy,
  ClassicGamesHubCopy,
  ClassicGamesHubGamesCopy,
  GameCardCopy,
  NotFoundCopy,
  PrivacyPageCopy,
  PrivacySection,
  SitemapLabels,
  SitemapPageCopy,
  StaticSitePagesCopy,
  TermsPageCopy,
} from "./static-site-types";

const classicGamesEn: ClassicGamesHubCopy = {
  metaTitle: "Classic Games | Browser Mini-Games (Tetris, Sudoku, Solitaire)",
  metaDescription:
    "Play Tetris, Sudoku, Solitaire, and more in your browser — free, no download, for fun only.",
  ogTitle: "Classic Games | Paypalcasinoguides",
  ogDescription:
    "Free browser games: Tetris, Tetris 50, Sudoku, Klondike solitaire. Not real-money play.",
  keywords: [
    "classic games",
    "tetris",
    "sudoku",
    "solitaire",
    "browser games",
    "free games",
  ],
  schemaName: "Classic games",
  schemaDescription:
    "Free browser mini-games: Tetris, Tetris 50, Sudoku, and Klondike solitaire. Entertainment only.",
  breadcrumbHome: "Home",
  h1: "Classic games",
  intro:
    "We host small, free games you can play right in the browser — no account, no download. Not real-money gambling; they are here for a quick break and fun only.",
  pickGame: "Pick a game",
  games: {
    tetris: {
      tagline: "Endless / high score",
      description:
        "Keep clearing lines and climbing levels until the stack reaches the top. Chasing a personal best score? Start here.",
      cta: "Play Tetris →",
    },
    tetris50: {
      tagline: "50-line sprint",
      description:
        "Your goal is to clear 50 lines in total, then the round is won. You can still top out if you are not careful.",
      cta: "Play Tetris 50 →",
    },
    sudoku: {
      tagline: "9×9 number puzzle",
      description:
        "Place digits 1–9 with no repeats in a row, column, or 3×3 box. Givens are locked; conflicts show in red.",
      cta: "Play Sudoku →",
    },
    solitaire: {
      tagline: "Klondike",
      description:
        "Use the stock and waste, build foundations A→K by suit, and run columns down in alternating colors.",
      cta: "Play Solitaire →",
    },
    yukon: {
      tagline: "No stock pile",
      description:
        "All cards are dealt face up in the tableau. Move stacked groups when the lead card is legal, and play foundations A→K by suit (with optional backtrack).",
      cta: "Play Yukon →",
    },
    russian: {
      tagline: "Same-suit build",
      description:
        "No stock; columns build down in the same suit; hidden cards turn over as you free them — harder than Yukon, no foundation take-backs in this build.",
      cta: "Play Russian →",
    },
  },
  footerComparison: {
    beforeTetris: "Not sure which to try? The full",
    tetrisLabel: "Tetris",
    between: "vs",
    tetris50Label: "Tetris 50",
    after: "comparison (same table) is on the Tetris and Tetris 50 game pages, below the play area.",
  },
};

export const STATIC_SITE_PAGES_COPY: Record<LocaleId, StaticSitePagesCopy> = {
  "en-IE": {
    contact: {
      metaTitle: "Contact Us | PayPal Casino Reviews",
      metaDescription:
        "Get in touch with the PayPal Casino Reviews team for questions, feedback, or suggestions about online casinos and payment methods.",
      ogTitle: "Contact Us | PayPal Casino Reviews",
      ogDescription:
        "Connect with our team about casino reviews, payment guides, and site feedback.",
      keywords: [
        "contact",
        "paypal casinos",
        "casino reviews",
        "payment methods",
        "feedback",
      ],
      schemaName: "Contact Us",
      schemaDescription:
        "Contact the PayPal Casino Reviews team for feedback and questions.",
      breadcrumbHome: "Home",
      h1: "Contact Us",
      greeting: "Greetings,",
      body: "We’d love to hear from you. Our mission is to deliver up-to-date, accurate, and relevant information about online casinos and their payment methods. We appreciate your feedback and suggestions. Is there something you feel is missing from our site? Do you want to know more about a particular payment option or casino brand? Send us a message at",
      disclaimer:
        "Please note: We are not a gambling operator and do not provide gambling services. We are an independent review site focused on researching and publishing information about online casinos and payment options. We are not affiliated with or endorsed by PayPal or any other payment provider mentioned on this site.",
    },
    privacy: {
      metaTitle: "Privacy Policy | PpCasinos.co",
      metaDescription:
        "Privacy Policy for PpCasinos.co - Understand how we handle your personal information in compliance with GDPR.",
      ogTitle: "Privacy Policy | PpCasinos.co",
      ogDescription:
        "Learn how we process personal data, newsletter sign-ups, and your GDPR rights.",
      keywords: ["privacy policy", "GDPR", "data protection", "PpCasinos"],
      schemaName: "Privacy Policy",
      schemaDescription:
        "Privacy Policy for PpCasinos.co - GDPR and data protection.",
      breadcrumbHome: "Home",
      h1: "Privacy Policy",
      intro:
        'This Privacy Policy explains how PpCasinos.co ("we", "us", or "our") complies with GDPR requirements for data processing and protects your information.',
      sections: privacySectionsEn,
      dpoTitle: "Data Protection Officer (DPO)",
      dpoBodyPrefix: "For any queries, please contact us at:",
    },
    terms: {
      metaTitle: "Terms and Conditions | PpCasinos.co",
      metaDescription:
        "Terms governing your use of PpCasinos.co, our informational content, affiliate links, and liability limits.",
      ogTitle: "Terms and Conditions | PpCasinos.co",
      ogDescription:
        "Read the site terms, age requirements, and disclaimers for PpCasinos.co.",
      keywords: ["terms", "conditions", "disclaimer", "PpCasinos", "affiliate"],
      schemaName: "Terms and Conditions",
      schemaDescription: "Terms and conditions for using PpCasinos.co.",
      breadcrumbHome: "Home",
      h1: "Terms and Conditions",
      intro:
        "These Terms and Conditions govern access to and use of PpCasinos.co. By using the site, you confirm that you meet the age requirements and agree to the rules below.",
      sections: termsSectionsEn,
      closing:
        "Questions about these Terms? Email info@ppcasinos.co and we will respond as soon as we can.",
    },
    notFound: {
      metaTitle: "404 - Page Not Found",
      metaDescription: "The page you are looking for could not be found.",
      heading: "Oops! Page Not Found",
      subheading: "404",
      body: "The page you're looking for doesn't exist or has been moved.",
      ctaHome: "Go Home",
    },
    sitemap: {
      metaTitle: "Sitemap | PayPal Casinos",
      metaDescription:
        "Complete sitemap of pages on PpCasinos.co including blog posts and guides.",
      ogTitle: "Sitemap | PayPal Casinos",
      ogDescription:
        "Browse every section: main pages, blog categories, CMS pages, and articles.",
      keywords: ["sitemap", "paypal casinos", "navigation"],
      h1: "Sitemap",
      intro: "Navigate through all our pages and content.",
      sectionMainPages: "Main Pages",
      sectionBlogCategories: "Blog Categories",
      sectionWebsitePages: "Website pages",
      sectionAllBlogPosts: "All Blog Posts",
      labels: {
        home: "Home",
        blog: "Blog",
        contact: "Contact Us",
        privacy: "Privacy Policy",
        terms: "Terms and Conditions",
        classicGames: "Classic games",
        tetris: "Tetris",
        tetris50: "Tetris 50",
        sudoku: "Sudoku",
        solitaire: "Solitaire",
        yukon: "Yukon Solitaire",
        russian: "Russian Solitaire",
      },
    },
    classicGamesHub: classicGamesEn,
  },
  ...STATIC_SITE_TRANSLATIONS,
};

export function staticSitePagesCopyFor(
  locale: WebsiteLocaleKey,
): StaticSitePagesCopy {
  return STATIC_SITE_PAGES_COPY[localeIdForWebsiteLocale(locale)];
}
