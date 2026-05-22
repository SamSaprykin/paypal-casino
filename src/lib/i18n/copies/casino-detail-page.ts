import type { LocaleId } from "../locales";

export interface CasinoDetailPageCopy {
  prosTitle: string;
  consTitle: string;
  playerReviewTitle: string;
  payoutLimits: string;
  payoutTimes: string;
  software: string;
  depositMethods: string;
  withdrawalMethods: string;
  license: string;
  userRecommendations: string;
}

export const CASINO_DETAIL_PAGE_COPY: Record<LocaleId, CasinoDetailPageCopy> = {
  "en-IE": {
    prosTitle: "Pros",
    consTitle: "Cons",
    playerReviewTitle: "Player review",
    payoutLimits: "Payout limits",
    payoutTimes: "Payout times",
    software: "Software providers",
    depositMethods: "Deposit methods",
    withdrawalMethods: "Withdrawal methods",
    license: "License",
    userRecommendations: "User recommendations",
  },
  "sv-SE": {
    prosTitle: "Fördelar",
    consTitle: "Nackdelar",
    playerReviewTitle: "Spelarrecension",
    payoutLimits: "Utbetalningsgränser",
    payoutTimes: "Utbetalningstider",
    software: "Mjukvaruleverantörer",
    depositMethods: "Insättningsmetoder",
    withdrawalMethods: "Uttagsmetoder",
    license: "Licens",
    userRecommendations: "Användarrekommendationer",
  },
  "da-DK": {
    prosTitle: "Fordele",
    consTitle: "Ulemper",
    playerReviewTitle: "Spilleranmeldelse",
    payoutLimits: "Udbetalingsgrænser",
    payoutTimes: "Udbetalingstider",
    software: "Softwareudbydere",
    depositMethods: "Indbetalingsmetoder",
    withdrawalMethods: "Udbetalingsmetoder",
    license: "Licens",
    userRecommendations: "Brugeranbefalinger",
  },
  "fi-FI": {
    prosTitle: "Plussat",
    consTitle: "Miinukset",
    playerReviewTitle: "Pelaajan arvio",
    payoutLimits: "Kotiutusrajat",
    payoutTimes: "Kotiutusajat",
    software: "Pelintarjoajat",
    depositMethods: "Talletustavat",
    withdrawalMethods: "Kotiutustavat",
    license: "Lisenssi",
    userRecommendations: "Käyttäjäsuositukset",
  },
  "de-DE": {
    prosTitle: "Vorteile",
    consTitle: "Nachteile",
    playerReviewTitle: "Spielerbewertung",
    payoutLimits: "Auszahlungslimits",
    payoutTimes: "Auszahlungszeiten",
    software: "Softwareanbieter",
    depositMethods: "Einzahlungsmethoden",
    withdrawalMethods: "Auszahlungsmethoden",
    license: "Lizenz",
    userRecommendations: "Nutzerempfehlungen",
  },
  "nb-NO": {
    prosTitle: "Fordeler",
    consTitle: "Ulemper",
    playerReviewTitle: "Spilleromtale",
    payoutLimits: "Utbetalingsgrenser",
    payoutTimes: "Utbetalingstider",
    software: "Programvareleverandører",
    depositMethods: "Innskuddsmetoder",
    withdrawalMethods: "Uttaksmetoder",
    license: "Lisens",
    userRecommendations: "Brukeranbefalinger",
  },
};
