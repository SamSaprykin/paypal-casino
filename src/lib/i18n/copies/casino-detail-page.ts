import type { LocaleId } from "../locales";

export interface CasinoDetailPageCopy {
  breadcrumbHome: string;
  reviewTitleTemplate: string;
  editorialReview: string;
  ratingOverall: string;
  ratingDisclaimer: string;
  wouldYouRecommend: string;
  usersRecommendTemplate: string;
  usersRecommendShort: string;
  licensedBanner: string;
  visitCasino: string;
  providersCount: string;
  paymentMethodsCount: string;
  paypalAccepted: string;
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
    breadcrumbHome: "Home",
    reviewTitleTemplate: "{{name}} Review {{year}}",
    editorialReview: "Verified review",
    ratingOverall: "Overall",
    ratingDisclaimer:
      "Our editorial score is {{rating}}, based on bonuses, payments, game selection, and user feedback.",
    wouldYouRecommend: "Would you recommend {{name}}?",
    usersRecommendTemplate: "{{rec}} of {{tot}} users recommend {{name}}.",
    usersRecommendShort: "{{pct}}% recommend it",
    licensedBanner:
      '<strong>{{name}}</strong> operates under the <strong>{{license}}</strong> licence with an editorial score of <strong>{{rating}}</strong>.',
    visitCasino: "Visit",
    providersCount: "{{count}} providers",
    paymentMethodsCount: "{{count}} methods",
    paypalAccepted: "PayPal ✓",
    prosTitle: "Pros",
    consTitle: "Cons",
    playerReviewTitle: "Player review",
    payoutLimits: "Payout limits",
    payoutTimes: "Payout times",
    software: "Software",
    depositMethods: "Deposits",
    withdrawalMethods: "Withdrawal methods",
    license: "License",
    userRecommendations: "User rec.",
  },
  "sv-SE": {
    breadcrumbHome: "Hem",
    reviewTitleTemplate: "{{name}} Recension {{year}}",
    editorialReview: "Verifierad recension",
    ratingOverall: "Totalt",
    ratingDisclaimer:
      "Vår redaktionella poäng är {{rating}}, baserad på bonusar, betalningar, spelutbud och användarfeedback.",
    wouldYouRecommend: "Skulle du rekommendera {{name}}?",
    usersRecommendTemplate: "{{rec}} av {{tot}} användare rekommenderar {{name}}.",
    usersRecommendShort: "{{pct}}% rekommenderar",
    licensedBanner:
      "<strong>{{name}}</strong> verkar under <strong>{{license}}</strong>-licensen med en redaktionell poäng på <strong>{{rating}}</strong>.",
    visitCasino: "Besök",
    providersCount: "{{count}} leverantörer",
    paymentMethodsCount: "{{count}} metoder",
    paypalAccepted: "PayPal ✓",
    prosTitle: "Fördelar",
    consTitle: "Nackdelar",
    playerReviewTitle: "Spelarrecension",
    payoutLimits: "Uttagsgränser",
    payoutTimes: "Utbetalningstider",
    software: "Mjukvara",
    depositMethods: "Insättningar",
    withdrawalMethods: "Uttagsmetoder",
    license: "Licens",
    userRecommendations: "Anv. rec.",
  },
  "da-DK": {
    breadcrumbHome: "Hjem",
    reviewTitleTemplate: "{{name}} Anmeldelse {{year}}",
    editorialReview: "Verificeret anmeldelse",
    ratingOverall: "Samlet",
    ratingDisclaimer:
      "Vores redaktionelle score er {{rating}}, baseret på bonusser, betalinger, spiludvalg og brugerfeedback.",
    wouldYouRecommend: "Vil du anbefale {{name}}?",
    usersRecommendTemplate: "{{rec}} af {{tot}} brugere anbefaler {{name}}.",
    usersRecommendShort: "{{pct}}% anbefaler",
    licensedBanner:
      "<strong>{{name}}</strong> opererer under <strong>{{license}}</strong>-licensen med en redaktionel score på <strong>{{rating}}</strong>.",
    visitCasino: "Besøg",
    providersCount: "{{count}} udbydere",
    paymentMethodsCount: "{{count}} metoder",
    paypalAccepted: "PayPal ✓",
    prosTitle: "Fordele",
    consTitle: "Ulemper",
    playerReviewTitle: "Spilleranmeldelse",
    payoutLimits: "Udbetalingsgrænser",
    payoutTimes: "Udbetalingstider",
    software: "Software",
    depositMethods: "Indbetalinger",
    withdrawalMethods: "Udbetalingsmetoder",
    license: "Licens",
    userRecommendations: "Bruger rec.",
  },
  "fi-FI": {
    breadcrumbHome: "Etusivu",
    reviewTitleTemplate: "{{name}} Arvostelu {{year}}",
    editorialReview: "Vahvistettu arvostelu",
    ratingOverall: "Kokonais",
    ratingDisclaimer:
      "Toimituksellinen pistemäärämme on {{rating}}, perustuen bonuksiin, maksuihin, pelivalikoimaan ja käyttäjäpalautteeseen.",
    wouldYouRecommend: "Suosittelisitko {{name}}?",
    usersRecommendTemplate: "{{rec}} / {{tot}} käyttäjää suosittelee {{name}}.",
    usersRecommendShort: "{{pct}}% suosittelee",
    licensedBanner:
      "<strong>{{name}}</strong> toimii <strong>{{license}}</strong>-lisenssillä toimituksellisella pistemäärällä <strong>{{rating}}</strong>.",
    visitCasino: "Vieraile",
    providersCount: "{{count}} tarjoajaa",
    paymentMethodsCount: "{{count}} tapaa",
    paypalAccepted: "PayPal ✓",
    prosTitle: "Plussat",
    consTitle: "Miinukset",
    playerReviewTitle: "Pelaajan arvio",
    payoutLimits: "Kotiutusrajat",
    payoutTimes: "Kotiutusajat",
    software: "Ohjelmistot",
    depositMethods: "Talletukset",
    withdrawalMethods: "Kotiutustavat",
    license: "Lisenssi",
    userRecommendations: "Käytt. suos.",
  },
  "de-DE": {
    breadcrumbHome: "Startseite",
    reviewTitleTemplate: "{{name}} Test {{year}}",
    editorialReview: "Verifizierter Test",
    ratingOverall: "Gesamt",
    ratingDisclaimer:
      "Unsere Redaktionsbewertung ist {{rating}}, basierend auf Boni, Zahlungen, Spielauswahl und Nutzerfeedback.",
    wouldYouRecommend: "Würden Sie {{name}} empfehlen?",
    usersRecommendTemplate: "{{rec}} von {{tot}} Nutzern empfehlen {{name}}.",
    usersRecommendShort: "{{pct}}% empfehlen",
    licensedBanner:
      "<strong>{{name}}</strong> operiert unter der <strong>{{license}}</strong>-Lizenz mit einer Redaktionsbewertung von <strong>{{rating}}</strong>.",
    visitCasino: "Besuchen",
    providersCount: "{{count}} Anbieter",
    paymentMethodsCount: "{{count}} Methoden",
    paypalAccepted: "PayPal ✓",
    prosTitle: "Vorteile",
    consTitle: "Nachteile",
    playerReviewTitle: "Spielerbewertung",
    payoutLimits: "Auszahlungslimits",
    payoutTimes: "Auszahlungszeiten",
    software: "Software",
    depositMethods: "Einzahlungen",
    withdrawalMethods: "Auszahlungsmethoden",
    license: "Lizenz",
    userRecommendations: "Nutzer emp.",
  },
  "nb-NO": {
    breadcrumbHome: "Hjem",
    reviewTitleTemplate: "{{name}} Anmeldelse {{year}}",
    editorialReview: "Verifisert anmeldelse",
    ratingOverall: "Totalt",
    ratingDisclaimer:
      "Vår redaksjonelle score er {{rating}}, basert på bonuser, betalinger, spillutvalg og brukerfeedback.",
    wouldYouRecommend: "Vil du anbefale {{name}}?",
    usersRecommendTemplate: "{{rec}} av {{tot}} brukere anbefaler {{name}}.",
    usersRecommendShort: "{{pct}}% anbefaler",
    licensedBanner:
      "<strong>{{name}}</strong> opererer under <strong>{{license}}</strong>-lisensen med en redaksjonell score på <strong>{{rating}}</strong>.",
    visitCasino: "Besøk",
    providersCount: "{{count}} leverandører",
    paymentMethodsCount: "{{count}} metoder",
    paypalAccepted: "PayPal ✓",
    prosTitle: "Fordeler",
    consTitle: "Ulemper",
    playerReviewTitle: "Spilleromtale",
    payoutLimits: "Utbetalingsgrenser",
    payoutTimes: "Utbetalingstider",
    software: "Programvare",
    depositMethods: "Innskudd",
    withdrawalMethods: "Uttaksmetoder",
    license: "Lisens",
    userRecommendations: "Bruker rec.",
  },
};
