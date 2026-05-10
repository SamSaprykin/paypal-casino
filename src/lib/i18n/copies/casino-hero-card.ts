import type { LocaleId } from "../locales";

export interface CasinoHeroCardCopy {
  playNow: string;
  readReview: string;
}

/** Strings for `HeroCasinoCard.astro` (wire when hero is localized). */
export const CASINO_HERO_CARD_COPY: Record<LocaleId, CasinoHeroCardCopy> = {
  "en-IE": { playNow: "Play Now", readReview: "Read Review" },
  "sv-SE": { playNow: "Spela nu", readReview: "Läs recension" },
  "da-DK": { playNow: "Spil nu", readReview: "Læs anmeldelse" },
  "fi-FI": { playNow: "Pelaa nyt", readReview: "Lue arvostelu" },
  "de-DE": { playNow: "Jetzt spielen", readReview: "Testbericht lesen" },
  "nb-NO": { playNow: "Spill nå", readReview: "Les omtale" },
};
