import type { LocaleId } from "../locales";

export type PaymentSpeedMethodId =
  | "paypal"
  | "trustly"
  | "revolut"
  | "swish"
  | "bank"
  | "crypto";

export interface PaymentSpeedMethodCopy {
  id: PaymentSpeedMethodId;
  name: string;
  nameDetail?: string;
  depositLabel: string;
  withdrawLabel: string;
  /** Relative bar length 0–100 (visual only; labels carry the real times). */
  depositWidth: number;
  withdrawWidth: number;
}

export interface PaymentSpeedChartCopy {
  title: string;
  subtitle: string;
  deposit: string;
  withdraw: string;
  footnote: string;
  methods: PaymentSpeedMethodCopy[];
}

/** Shared relative widths — same across locales. */
const WIDTHS: Record<
  PaymentSpeedMethodId,
  { depositWidth: number; withdrawWidth: number }
> = {
  paypal: { depositWidth: 8, withdrawWidth: 72 },
  trustly: { depositWidth: 8, withdrawWidth: 32 },
  revolut: { depositWidth: 8, withdrawWidth: 32 },
  swish: { depositWidth: 8, withdrawWidth: 12 },
  bank: { depositWidth: 92, withdrawWidth: 92 },
  crypto: { depositWidth: 16, withdrawWidth: 12 },
};

function methods(
  rows: Array<
    Omit<PaymentSpeedMethodCopy, "depositWidth" | "withdrawWidth"> & {
      id: PaymentSpeedMethodId;
    }
  >,
): PaymentSpeedMethodCopy[] {
  return rows.map((row) => ({
    ...row,
    ...WIDTHS[row.id],
  }));
}

export const PAYMENT_SPEED_CHART_COPY: Record<LocaleId, PaymentSpeedChartCopy> =
  {
    "en-IE": {
      title: "Deposit and withdrawal speed at casinos",
      subtitle: "Typical processing times compared",
      deposit: "Deposit",
      withdraw: "Withdrawal",
      footnote:
        "* Based on typical stated processing times. Verify against current documentation before relying on them.",
      methods: methods([
        {
          id: "paypal",
          name: "PayPal",
          depositLabel: "<1 min",
          withdrawLabel: "12–48 h",
        },
        {
          id: "trustly",
          name: "Trustly",
          nameDetail: "Pay N Play",
          depositLabel: "<1 min",
          withdrawLabel: "<5 h",
        },
        {
          id: "revolut",
          name: "Revolut",
          depositLabel: "<1 min",
          withdrawLabel: "<5 h",
        },
        {
          id: "swish",
          name: "Swish",
          depositLabel: "<1 min",
          withdrawLabel: "<1 h",
        },
        {
          id: "bank",
          name: "Bank transfer",
          depositLabel: "1–5 bank days",
          withdrawLabel: "1–5 bank days",
        },
        {
          id: "crypto",
          name: "Cryptocurrency",
          depositLabel: "<10 min",
          withdrawLabel: "<1 h",
        },
      ]),
    },
    "de-DE": {
      title: "Ein- und Auszahlungsgeschwindigkeit in Casinos",
      subtitle: "Vergleich typischer Bearbeitungszeiten",
      deposit: "Einzahlung",
      withdraw: "Auszahlung",
      footnote:
        "* Basierend auf typisch angegebenen Bearbeitungszeiten. Vor der Veröffentlichung anhand aktueller Dokumentation prüfen.",
      methods: methods([
        {
          id: "paypal",
          name: "PayPal",
          depositLabel: "<1 Min.",
          withdrawLabel: "12–48 Std.",
        },
        {
          id: "trustly",
          name: "Trustly",
          nameDetail: "Pay N Play",
          depositLabel: "<1 Min.",
          withdrawLabel: "<5 Std.",
        },
        {
          id: "revolut",
          name: "Revolut",
          depositLabel: "<1 Min.",
          withdrawLabel: "<5 Std.",
        },
        {
          id: "swish",
          name: "Swish",
          depositLabel: "<1 Min.",
          withdrawLabel: "<1 Std.",
        },
        {
          id: "bank",
          name: "Banküberweisung",
          depositLabel: "1–5 Banktage",
          withdrawLabel: "1–5 Banktage",
        },
        {
          id: "crypto",
          name: "Kryptowährung",
          depositLabel: "<10 Min.",
          withdrawLabel: "<1 Std.",
        },
      ]),
    },
    "da-DK": {
      title: "Ind- og udbetalingshastighed på casinoer",
      subtitle: "Sammenligning af typiske behandlingstider",
      deposit: "Indbetaling",
      withdraw: "Udbetaling",
      footnote:
        "* Baseret på typisk angivne behandlingstider. Verificér mod aktuel dokumentation før brug.",
      methods: methods([
        {
          id: "paypal",
          name: "PayPal",
          depositLabel: "<1 min",
          withdrawLabel: "12–48 t",
        },
        {
          id: "trustly",
          name: "Trustly",
          nameDetail: "Pay N Play",
          depositLabel: "<1 min",
          withdrawLabel: "<5 t",
        },
        {
          id: "revolut",
          name: "Revolut",
          depositLabel: "<1 min",
          withdrawLabel: "<5 t",
        },
        {
          id: "swish",
          name: "Swish",
          depositLabel: "<1 min",
          withdrawLabel: "<1 t",
        },
        {
          id: "bank",
          name: "Bankoverførsel",
          depositLabel: "1–5 bankdage",
          withdrawLabel: "1–5 bankdage",
        },
        {
          id: "crypto",
          name: "Kryptovaluta",
          depositLabel: "<10 min",
          withdrawLabel: "<1 t",
        },
      ]),
    },
    "fi-FI": {
      title: "Talletus- ja kotiutusnopeus kasinoilla",
      subtitle: "Tyypillisten käsittelyaikojen vertailu",
      deposit: "Talletus",
      withdraw: "Kotiutus",
      footnote:
        "* Perustuu tyypillisesti ilmoitettuihin käsittelyaikoihin. Vahvista ajantasaisesta dokumentaatiosta ennen julkaisua.",
      methods: methods([
        {
          id: "paypal",
          name: "PayPal",
          depositLabel: "<1 min",
          withdrawLabel: "12–48 t",
        },
        {
          id: "trustly",
          name: "Trustly",
          nameDetail: "Pay N Play",
          depositLabel: "<1 min",
          withdrawLabel: "<5 t",
        },
        {
          id: "revolut",
          name: "Revolut",
          depositLabel: "<1 min",
          withdrawLabel: "<5 t",
        },
        {
          id: "swish",
          name: "Swish",
          depositLabel: "<1 min",
          withdrawLabel: "<1 t",
        },
        {
          id: "bank",
          name: "Pankkisiirto",
          depositLabel: "1–5 pankkipäivää",
          withdrawLabel: "1–5 pankkipäivää",
        },
        {
          id: "crypto",
          name: "Kryptovaluutta",
          depositLabel: "<10 min",
          withdrawLabel: "<1 t",
        },
      ]),
    },
    "nb-NO": {
      title: "Innskudds- og uttakshastighet på kasinoer",
      subtitle: "Sammenligning av typiske behandlingstider",
      deposit: "Innskudd",
      withdraw: "Uttak",
      footnote:
        "* Basert på typisk oppgitte behandlingstider. Verifiser mot gjeldende dokumentasjon før bruk.",
      methods: methods([
        {
          id: "paypal",
          name: "PayPal",
          depositLabel: "<1 min",
          withdrawLabel: "12–48 t",
        },
        {
          id: "trustly",
          name: "Trustly",
          nameDetail: "Pay N Play",
          depositLabel: "<1 min",
          withdrawLabel: "<5 t",
        },
        {
          id: "revolut",
          name: "Revolut",
          depositLabel: "<1 min",
          withdrawLabel: "<5 t",
        },
        {
          id: "swish",
          name: "Swish",
          depositLabel: "<1 min",
          withdrawLabel: "<1 t",
        },
        {
          id: "bank",
          name: "Bankoverføring",
          depositLabel: "1–5 bankdager",
          withdrawLabel: "1–5 bankdager",
        },
        {
          id: "crypto",
          name: "Kryptovaluta",
          depositLabel: "<10 min",
          withdrawLabel: "<1 t",
        },
      ]),
    },
    "sv-SE": {
      title: "Insättnings- och uttagshastighet på casinon",
      subtitle: "Jämförelse av typiska behandlingstider",
      deposit: "Insättning",
      withdraw: "Uttag",
      footnote:
        "* Baserat på typiska angivna behandlingstider. Verifiera mot aktuell dokumentation innan publicering.",
      methods: methods([
        {
          id: "paypal",
          name: "PayPal",
          depositLabel: "<1 min",
          withdrawLabel: "12–48 tim",
        },
        {
          id: "trustly",
          name: "Trustly",
          nameDetail: "Pay N Play",
          depositLabel: "<1 min",
          withdrawLabel: "<5 tim",
        },
        {
          id: "revolut",
          name: "Revolut",
          depositLabel: "<1 min",
          withdrawLabel: "<5 tim",
        },
        {
          id: "swish",
          name: "Swish",
          depositLabel: "<1 min",
          withdrawLabel: "<1 tim",
        },
        {
          id: "bank",
          name: "Banköverföring",
          depositLabel: "1–5 bankdagar",
          withdrawLabel: "1–5 bankdagar",
        },
        {
          id: "crypto",
          name: "Kryptovaluta",
          depositLabel: "<10 min",
          withdrawLabel: "<1 tim",
        },
      ]),
    },
  };
