import type { LocaleId } from "../locales";

export interface WebsitePageCopy {
  created: string;
  updated: string;
}

export const WEBSITE_PAGE_COPY: Record<LocaleId, WebsitePageCopy> = {
  "en-IE": {
    created: "Created",
    updated: "Updated",
  },
  "sv-SE": {
    created: "Skapad",
    updated: "Uppdaterad",
  },
  "da-DK": {
    created: "Oprettet",
    updated: "Opdateret",
  },
  "fi-FI": {
    created: "Luotu",
    updated: "Päivitetty",
  },
  "de-DE": {
    created: "Erstellt",
    updated: "Aktualisiert",
  },
  "nb-NO": {
    created: "Opprettet",
    updated: "Oppdatert",
  },
};
