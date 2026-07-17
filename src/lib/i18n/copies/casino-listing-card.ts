import type { LocaleId } from "../locales";

/**
 * UI strings for the casino listing card (`CasinoListingCard.astro`).
 * Placeholders: userRecommendTemplate uses {{rec}} and {{tot}}; positiveReviewsTemplate uses {{pct}}.
 */
export interface CasinoListingCardCopy {
  welcomeBonusFallback: string;
  defaultBonusDescription: string;
  defaultShortDescription: string;
  /** 5.0 */
  ratingExceptional: string;
  /** 4.8 – &lt; 5 */
  ratingPerfect: string;
  /** 4.5 – 4.79 */
  ratingReallyGood: string;
  /** 4.0 – 4.49 */
  ratingGood: string;
  /** 3.5 – 3.99 */
  ratingSolid: string;
  /** 3.0 – 3.49 */
  ratingFair: string;
  /** &lt; 3.0 */
  ratingModest: string;
  ratingNotRated: string;
  playNow: string;
  readReview: string;
  showMore: string;
  availableIn: string;
  payoutLimits: string;
  payoutTimes: string;
  license: string;
  userReviews: string;
  userRecommendTemplate: string;
  positiveReviewsTemplate: string;
}

export function getRatingGradationLabel(
  rating: number | string | null | undefined,
  copy: CasinoListingCardCopy,
): string {
  if (rating == null || rating === "") return copy.ratingNotRated;
  const r = Number(rating);
  if (!Number.isFinite(r)) return copy.ratingNotRated;
  const x = Math.min(5, Math.max(0, r));
  if (x >= 5) return copy.ratingExceptional;
  if (x >= 4.8) return copy.ratingPerfect;
  if (x >= 4.5) return copy.ratingReallyGood;
  if (x >= 4.0) return copy.ratingGood;
  if (x >= 3.5) return copy.ratingSolid;
  if (x >= 3.0) return copy.ratingFair;
  return copy.ratingModest;
}

/** Visible score like `4.8/5`, or `—/5` when missing. */
export function formatRatingOutOfFive(
  rating: number | string | null | undefined,
): string {
  if (rating == null || rating === "") return "—/5";
  const n = Number(rating);
  if (!Number.isFinite(n)) return "—/5";
  const x = Math.min(5, Math.max(0, n));
  const rounded = Math.round(x * 10) / 10;
  const str =
    rounded % 1 === 0 ? String(Math.trunc(rounded)) : rounded.toFixed(1);
  return `${str}/5`;
}

export const CASINO_LISTING_CARD_COPY: Record<LocaleId, CasinoListingCardCopy> =
  {
    "en-IE": {
      welcomeBonusFallback: "Welcome Bonus",
      defaultBonusDescription: "Up to €1,000 + 100 Free Spins",
      defaultShortDescription:
        "Premium slots, live dealers, and fast payouts. Join thousands of happy players today.",
      ratingExceptional: "Exceptional",
      ratingPerfect: "Perfect",
      ratingReallyGood: "Really good",
      ratingGood: "Good",
      ratingSolid: "Solid",
      ratingFair: "Fair",
      ratingModest: "Modest",
      ratingNotRated: "Not rated",
      playNow: "Play Now",
      readReview: "Read Review",
      showMore: "Show More",
      availableIn: "Available in:",
      payoutLimits: "Payout limits",
      payoutTimes: "Payout times",
      license: "License",
      userReviews: "User reviews",
      userRecommendTemplate: "{{rec}} of {{tot}} recommend",
      positiveReviewsTemplate: "{{pct}}% positive reviews from our users",
    },
    "sv-SE": {
      welcomeBonusFallback: "Välkomstbonus",
      defaultBonusDescription: "Upp till 1 000 € + 100 gratissnurr",
      defaultShortDescription:
        "Premiumspel, live dealers och snabba uttag. Gör som tusentals nöjda spelare.",
      ratingExceptional: "Exceptionell",
      ratingPerfect: "Perfekt",
      ratingReallyGood: "Mycket bra",
      ratingGood: "Bra",
      ratingSolid: "Stabil",
      ratingFair: "Godkänd",
      ratingModest: "Blygsam",
      ratingNotRated: "Ej betygsatt",
      playNow: "Spela nu",
      readReview: "Läs recension",
      showMore: "Visa mer",
      availableIn: "Tillgänglig i:",
      payoutLimits: "Uttagsgränser",
      payoutTimes: "Utbetalningstider",
      license: "Licens",
      userReviews: "Användarrecensioner",
      userRecommendTemplate: "{{rec}} av {{tot}} rekommenderar",
      positiveReviewsTemplate: "{{pct}}% positiva omdömen från våra användare",
    },
    "da-DK": {
      welcomeBonusFallback: "Velkomstbonus",
      defaultBonusDescription: "Op til 1.000 € + 100 gratis spins",
      defaultShortDescription:
        "Premium spil, live dealers og hurtige udbetalinger. Slut dig til tusindvis af tilfredse spillere.",
      ratingExceptional: "Enestående",
      ratingPerfect: "Perfekt",
      ratingReallyGood: "Rigtig god",
      ratingGood: "God",
      ratingSolid: "Solid",
      ratingFair: "Acceptabel",
      ratingModest: "Beskeden",
      ratingNotRated: "Ikke vurderet",
      playNow: "Spil nu",
      readReview: "Læs anmeldelse",
      showMore: "Vis mere",
      availableIn: "Tilgængelig i:",
      payoutLimits: "Udbetalingsgrænser",
      payoutTimes: "Udbetalingstider",
      license: "Licens",
      userReviews: "Brugeranmeldelser",
      userRecommendTemplate: "{{rec}} af {{tot}} anbefaler",
      positiveReviewsTemplate:
        "{{pct}}% positive anmeldelser fra vores brugere",
    },
    "fi-FI": {
      welcomeBonusFallback: "Tervetuliaisbonus",
      defaultBonusDescription: "Jopa 1 000 € + 100 ilmaiskierrosta",
      defaultShortDescription:
        "Huippuluokan kolikkopelit, live-jakajat ja nopeat kotiutukset. Liity tuhansien tyytyväisten pelaajien joukkoon.",
      ratingExceptional: "Poikkeuksellinen",
      ratingPerfect: "Täydellinen",
      ratingReallyGood: "Todella hyvä",
      ratingGood: "Hyvä",
      ratingSolid: "Vankka",
      ratingFair: "Kohtalainen",
      ratingModest: "Vaatimaton",
      ratingNotRated: "Ei arvosteltu",
      playNow: "Pelaa nyt",
      readReview: "Lue arvostelu",
      showMore: "Näytä lisää",
      availableIn: "Saatavilla:",
      payoutLimits: "Nostorajat",
      payoutTimes: "Maksuajat",
      license: "Lisenssi",
      userReviews: "Käyttäjäarvostelut",
      userRecommendTemplate: "{{rec}} / {{tot}} suosittelee",
      positiveReviewsTemplate:
        "{{pct}}% positiivisia arvosteluja käyttäjiltämme",
    },
    "de-DE": {
      welcomeBonusFallback: "Willkommensbonus",
      defaultBonusDescription: "Bis zu 1.000 € + 100 Freispiele",
      defaultShortDescription:
        "Top-Slots, Live-Casino und schnelle Auszahlungen. Schließen Sie sich zufriedenen Spielern an.",
      ratingExceptional: "Herausragend",
      ratingPerfect: "Perfekt",
      ratingReallyGood: "Sehr gut",
      ratingGood: "Gut",
      ratingSolid: "Solide",
      ratingFair: "Ausreichend",
      ratingModest: "Bescheiden",
      ratingNotRated: "Nicht bewertet",
      playNow: "Jetzt spielen",
      readReview: "Testbericht lesen",
      showMore: "Mehr anzeigen",
      availableIn: "Verfügbar in:",
      payoutLimits: "Auszahlungslimits",
      payoutTimes: "Auszahlungszeiten",
      license: "Lizenz",
      userReviews: "Nutzerbewertungen",
      userRecommendTemplate: "{{rec}} von {{tot}} empfehlen",
      positiveReviewsTemplate:
        "{{pct}}% positive Bewertungen von unseren Nutzern",
    },
    "nb-NO": {
      welcomeBonusFallback: "Velkomstbonus",
      defaultBonusDescription: "Opptil 1 000 € + 100 gratisspinn",
      defaultShortDescription:
        "Premium automater, live dealere og raske utbetalinger. Bli med tusenvis av fornøyde spillere.",
      ratingExceptional: "Eksepsjonell",
      ratingPerfect: "Perfekt",
      ratingReallyGood: "Veldig bra",
      ratingGood: "God",
      ratingSolid: "Solid",
      ratingFair: "Grei",
      ratingModest: "Beskjeden",
      ratingNotRated: "Ikke vurdert",
      playNow: "Spill nå",
      readReview: "Les omtale",
      showMore: "Vis mer",
      availableIn: "Tilgjengelig i:",
      payoutLimits: "Utbetalingsgrenser",
      payoutTimes: "Utbetalingstider",
      license: "Lisens",
      userReviews: "Brukeranmeldelser",
      userRecommendTemplate: "{{rec}} av {{tot}} anbefaler",
      positiveReviewsTemplate: "{{pct}}% positive anmeldelser fra våre brukere",
    },
  };
