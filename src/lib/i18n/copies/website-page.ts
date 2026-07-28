import type { LocaleId } from "../locales";

export interface WebsitePageCopy {
  created: string;
  /** Shown as “Last reviewed” for E-E-A-T freshness. */
  updated: string;
  addedBy: string;
  reviewedBy: string;
  /** Fixed right-rail table of contents heading. */
  onThisPage: string;
}

export const WEBSITE_PAGE_COPY: Record<LocaleId, WebsitePageCopy> = {
  "en-IE": {
    created: "Published",
    updated: "Last reviewed",
    addedBy: "Written by",
    reviewedBy: "Reviewed by",
    onThisPage: "On this page",
  },
  "sv-SE": {
    created: "Publicerad",
    updated: "Senast granskad",
    addedBy: "Skriven av",
    reviewedBy: "Granskad av",
    onThisPage: "På den här sidan",
  },
  "da-DK": {
    created: "Publiceret",
    updated: "Senest gennemgået",
    addedBy: "Skrevet af",
    reviewedBy: "Gennemgået af",
    onThisPage: "På denne side",
  },
  "fi-FI": {
    created: "Julkaistu",
    updated: "Viimeksi tarkistattu",
    addedBy: "Kirjoittanut",
    reviewedBy: "Tarkistanut",
    onThisPage: "Tällä sivulla",
  },
  "de-DE": {
    created: "Veröffentlicht",
    updated: "Zuletzt geprüft",
    addedBy: "Geschrieben von",
    reviewedBy: "Geprüft von",
    onThisPage: "Auf dieser Seite",
  },
  "nb-NO": {
    created: "Publisert",
    updated: "Sist vurdert",
    addedBy: "Skrevet av",
    reviewedBy: "Vurdert av",
    onThisPage: "På denne siden",
  },
};
