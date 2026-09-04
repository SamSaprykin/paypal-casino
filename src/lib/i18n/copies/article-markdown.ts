import type { LocaleId } from "../locales";

export interface ArticleMarkdownCopy {
  /** Fallback heading when a `.check-list` block has no title in the markup. */
  checkListTitle: string;
}

export const ARTICLE_MARKDOWN_COPY: Record<LocaleId, ArticleMarkdownCopy> = {
  "en-IE": { checkListTitle: "Key Details" },
  "sv-SE": { checkListTitle: "Viktiga detaljer" },
  "da-DK": { checkListTitle: "Vigtige detaljer" },
  "fi-FI": { checkListTitle: "Tärkeimmät tiedot" },
  "de-DE": { checkListTitle: "Wichtige Details" },
  "nb-NO": { checkListTitle: "Viktige detaljer" },
};
