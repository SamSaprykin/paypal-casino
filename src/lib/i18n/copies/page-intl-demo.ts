import type { LocaleId } from "../locales";

/** Hardcoded marketing copy for the intl demo page (layout only). */
export interface IntlDemoPageCopy {
  pageTitle: string;
  pageDescription: string;
  sectionHeading: string;
  sectionIntro: string;
}

export const INTL_DEMO_PAGE_COPY: Record<LocaleId, IntlDemoPageCopy> = {
  "en-IE": {
    pageTitle: "Internationalisation demo",
    pageDescription:
      "Preview listing cards with translated UI copy for each market we support.",
    sectionHeading: "Casino listing card by locale",
    sectionIntro:
      "Same mock casino; labels and fallbacks come from locale config files.",
  },
  "sv-SE": {
    pageTitle: "Demo internationalisering",
    pageDescription: "Förhandsvisning av listkort med översatt gränssnitt för varje marknad.",
    sectionHeading: "Casino-listkort per språk",
    sectionIntro: "Samma demo-casino; texter hämtas från språkfiler.",
  },
  "da-DK": {
    pageTitle: "Demo internationalisering",
    pageDescription: "Forhåndsvisning af listekort med oversat brugergrænseflade for hvert marked.",
    sectionHeading: "Casino-listekort pr. sprog",
    sectionIntro: "Samme demo-casino; tekster kommer fra sprogfiler.",
  },
  "fi-FI": {
    pageTitle: "Kieliversioiden demo",
    pageDescription: "Listakortin esikatselu käännettyillä käyttöliittymäteksteillä jokaiselle markkinalle.",
    sectionHeading: "Casino-listakortti kielittäin",
    sectionIntro: "Sama demo-kasino; tekstit tulevat kielitiedostoista.",
  },
  "de-DE": {
    pageTitle: "Demo Internationalisierung",
    pageDescription:
      "Vorschau der Listenkarten mit übersetzter Oberfläche für jeden Markt.",
    sectionHeading: "Casino-Listenkarte pro Sprache",
    sectionIntro: "Gleiches Demo-Casino; Texte stammen aus Sprachdateien.",
  },
  "nb-NO": {
    pageTitle: "Demo internationalisering",
    pageDescription: "Forhåndsvisning av listekort med oversatt grensesnitt for hvert marked.",
    sectionHeading: "Casino-listekort per språk",
    sectionIntro: "Samme demo-casino; tekster hentes fra språkfiler.",
  },
};
