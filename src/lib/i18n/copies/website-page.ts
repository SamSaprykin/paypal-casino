import type { LocaleId } from "../locales";

export interface WebsitePageCopy {
  created: string;
  updated: string;
  addedBy: string;
  reviewedBy: string;
}

export const WEBSITE_PAGE_COPY: Record<LocaleId, WebsitePageCopy> = {
  "en-IE": {
    created: "Created",
    updated: "Updated",
    addedBy: "Added by",
    reviewedBy: "Reviewed by",
  },
  "sv-SE": {
    created: "Skapad",
    updated: "Uppdaterad",
    addedBy: "Tillagd av",
    reviewedBy: "Granskad av",
  },
  "da-DK": {
    created: "Oprettet",
    updated: "Opdateret",
    addedBy: "Tilføjet af",
    reviewedBy: "Gennemgået af",
  },
  "fi-FI": {
    created: "Luotu",
    updated: "Päivitetty",
    addedBy: "Lisännyt",
    reviewedBy: "Tarkistanut",
  },
  "de-DE": {
    created: "Erstellt",
    updated: "Aktualisiert",
    addedBy: "Hinzugefügt von",
    reviewedBy: "Geprüft von",
  },
  "nb-NO": {
    created: "Opprettet",
    updated: "Oppdatert",
    addedBy: "Lagt til av",
    reviewedBy: "Vurdert av",
  },
};
