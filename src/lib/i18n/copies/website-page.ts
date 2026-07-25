import type { LocaleId } from "../locales";

export interface WebsitePageCopy {
  created: string;
  /** Shown as “Last reviewed” for E-E-A-T freshness. */
  updated: string;
  addedBy: string;
  reviewedBy: string;
}

export const WEBSITE_PAGE_COPY: Record<LocaleId, WebsitePageCopy> = {
  "en-IE": {
    created: "Published",
    updated: "Last reviewed",
    addedBy: "Written by",
    reviewedBy: "Reviewed by",
  },
  "sv-SE": {
    created: "Publicerad",
    updated: "Senast granskad",
    addedBy: "Skriven av",
    reviewedBy: "Granskad av",
  },
  "da-DK": {
    created: "Publiceret",
    updated: "Senest gennemgået",
    addedBy: "Skrevet af",
    reviewedBy: "Gennemgået af",
  },
  "fi-FI": {
    created: "Julkaistu",
    updated: "Viimeksi tarkistettu",
    addedBy: "Kirjoittanut",
    reviewedBy: "Tarkistanut",
  },
  "de-DE": {
    created: "Veröffentlicht",
    updated: "Zuletzt geprüft",
    addedBy: "Geschrieben von",
    reviewedBy: "Geprüft von",
  },
  "nb-NO": {
    created: "Publisert",
    updated: "Sist vurdert",
    addedBy: "Skrevet av",
    reviewedBy: "Vurdert av",
  },
};
