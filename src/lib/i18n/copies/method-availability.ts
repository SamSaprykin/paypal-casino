import type { LocaleId } from "../locales";

export type MethodAvailabilityStatus = "yes" | "no" | "partial" | "unknown";

export interface MethodAvailabilityCopy {
  title: string;
  footnote: string;
  casino: string;
  cardDeposit: string;
  revolutPay: string;
  withdraw: string;
  bonusOk: string;
  verified: string;
  unverified: string;
  status: Record<MethodAvailabilityStatus, string>;
  statusShort: Record<MethodAvailabilityStatus, string>;
}

export const METHOD_AVAILABILITY_COPY: Record<
  LocaleId,
  MethodAvailabilityCopy
> = {
  "en-IE": {
    title: "Revolut availability at listed casinos",
    footnote:
      "Card deposit means Visa/Mastercard at the cashier (typical Revolut path). Confirm in the live cashier before you deposit — banking options change.",
    casino: "Casino",
    cardDeposit: "Card deposit",
    revolutPay: "Revolut Pay",
    withdraw: "Withdraw to Revolut",
    bonusOk: "Bonus OK",
    verified: "Verified",
    unverified: "Needs check",
    status: {
      yes: "Yes",
      no: "No",
      partial: "Partial",
      unknown: "Unconfirmed",
    },
    statusShort: {
      yes: "Yes",
      no: "No",
      partial: "Partial",
      unknown: "?",
    },
  },
  "de-DE": {
    title: "Revolut-Verfügbarkeit bei gelisteten Casinos",
    footnote:
      "Karteneinzahlung meint Visa/Mastercard an der Kasse (typischer Revolut-Weg). Vor der Einzahlung in der Live-Kasse prüfen — Banking-Optionen ändern sich.",
    casino: "Casino",
    cardDeposit: "Karteneinzahlung",
    revolutPay: "Revolut Pay",
    withdraw: "Auszahlung auf Revolut",
    bonusOk: "Bonus OK",
    verified: "Geprüft",
    unverified: "Zu prüfen",
    status: {
      yes: "Ja",
      no: "Nein",
      partial: "Teilweise",
      unknown: "Unbestätigt",
    },
    statusShort: {
      yes: "Ja",
      no: "Nein",
      partial: "Teilw.",
      unknown: "?",
    },
  },
  "da-DK": {
    title: "Revolut-tilgængelighed på listede casinoer",
    footnote:
      "Kortindbetaling betyder Visa/Mastercard i kassen (typisk Revolut-vej). Bekræft i den live kasse før indbetaling — betalingsmuligheder ændrer sig.",
    casino: "Casino",
    cardDeposit: "Kortindbetaling",
    revolutPay: "Revolut Pay",
    withdraw: "Udbetaling til Revolut",
    bonusOk: "Bonus OK",
    verified: "Bekræftet",
    unverified: "Skal tjekkes",
    status: {
      yes: "Ja",
      no: "Nej",
      partial: "Delvis",
      unknown: "Ubekræftet",
    },
    statusShort: {
      yes: "Ja",
      no: "Nej",
      partial: "Delvis",
      unknown: "?",
    },
  },
  "fi-FI": {
    title: "Revolutin saatavuus listatuilla kasinoilla",
    footnote:
      "Korttitalletus tarkoittaa Visaa/Mastercardia kassalla (tyypillinen Revolut-polku). Vahvista live-kassalla ennen talletusta — maksutavat muuttuvat.",
    casino: "Kasino",
    cardDeposit: "Korttitalletus",
    revolutPay: "Revolut Pay",
    withdraw: "Nosto Revolutille",
    bonusOk: "Bonus OK",
    verified: "Vahvistettu",
    unverified: "Tarkistettava",
    status: {
      yes: "Kyllä",
      no: "Ei",
      partial: "Osittain",
      unknown: "Vahvistamaton",
    },
    statusShort: {
      yes: "Kyllä",
      no: "Ei",
      partial: "Ositt.",
      unknown: "?",
    },
  },
  "nb-NO": {
    title: "Revolut-tilgjengelighet på listede casinoer",
    footnote:
      "Kortinnskudd betyr Visa/Mastercard i kassen (typisk Revolut-vei). Bekreft i live-kassen før innskudd — betalingsalternativer endres.",
    casino: "Casino",
    cardDeposit: "Kortinnskudd",
    revolutPay: "Revolut Pay",
    withdraw: "Uttak til Revolut",
    bonusOk: "Bonus OK",
    verified: "Bekreftet",
    unverified: "Må sjekkes",
    status: {
      yes: "Ja",
      no: "Nei",
      partial: "Delvis",
      unknown: "Ubekreftet",
    },
    statusShort: {
      yes: "Ja",
      no: "Nei",
      partial: "Delvis",
      unknown: "?",
    },
  },
  "sv-SE": {
    title: "Revolut-tillgänglighet på listade casinon",
    footnote:
      "Kortinsättning betyder Visa/Mastercard i kassan (typisk Revolut-väg). Bekräfta i live-kassan innan du sätter in — betalningsalternativ ändras.",
    casino: "Casino",
    cardDeposit: "Kortinsättning",
    revolutPay: "Revolut Pay",
    withdraw: "Uttag till Revolut",
    bonusOk: "Bonus OK",
    verified: "Verifierad",
    unverified: "Behöver koll",
    status: {
      yes: "Ja",
      no: "Nej",
      partial: "Delvis",
      unknown: "Obekräftad",
    },
    statusShort: {
      yes: "Ja",
      no: "Nej",
      partial: "Delvis",
      unknown: "?",
    },
  },
};
