import type { LocaleId } from "../locales";
import type { ReviewCycle } from "../../content/freshness";

export interface ContentFreshnessCopy {
  lastVerified: string;
  nextReview: string;
  reviewCycleLabel: string;
  cycles: Record<ReviewCycle, string>;
  localeTag: string;
}

export const CONTENT_FRESHNESS_COPY: Record<LocaleId, ContentFreshnessCopy> = {
  "en-IE": {
    lastVerified: "Last verified",
    nextReview: "Next review",
    reviewCycleLabel: "Review cycle",
    cycles: {
      weekly: "Weekly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      yearly: "Yearly",
    },
    localeTag: "en-IE",
  },
  "de-DE": {
    lastVerified: "Zuletzt geprüft",
    nextReview: "Nächste Prüfung",
    reviewCycleLabel: "Prüfzyklus",
    cycles: {
      weekly: "Wöchentlich",
      monthly: "Monatlich",
      quarterly: "Vierteljährlich",
      yearly: "Jährlich",
    },
    localeTag: "de-DE",
  },
  "da-DK": {
    lastVerified: "Senest verificeret",
    nextReview: "Næste gennemgang",
    reviewCycleLabel: "Gennemgangscyklus",
    cycles: {
      weekly: "Ugentlig",
      monthly: "Månedlig",
      quarterly: "Kvartalsvis",
      yearly: "Årlig",
    },
    localeTag: "da-DK",
  },
  "fi-FI": {
    lastVerified: "Viimeksi vahvistettu",
    nextReview: "Seuraava tarkistus",
    reviewCycleLabel: "Tarkistussykli",
    cycles: {
      weekly: "Viikoittain",
      monthly: "Kuukausittain",
      quarterly: "Neljännesvuosittain",
      yearly: "Vuosittain",
    },
    localeTag: "fi-FI",
  },
  "nb-NO": {
    lastVerified: "Sist verifisert",
    nextReview: "Neste gjennomgang",
    reviewCycleLabel: "Gjennomgangssyklus",
    cycles: {
      weekly: "Ukentlig",
      monthly: "Månedlig",
      quarterly: "Kvartalsvis",
      yearly: "Årlig",
    },
    localeTag: "nb-NO",
  },
  "sv-SE": {
    lastVerified: "Senast verifierad",
    nextReview: "Nästa granskning",
    reviewCycleLabel: "Granskningscykel",
    cycles: {
      weekly: "Veckovis",
      monthly: "Månadsvis",
      quarterly: "Kvartalsvis",
      yearly: "Årligen",
    },
    localeTag: "sv-SE",
  },
};
