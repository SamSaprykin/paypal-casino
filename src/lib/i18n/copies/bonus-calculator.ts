import type { LocaleId } from "../locales";

export interface BonusCalculatorCopy {
  title: string;
  subtitle: string;
  depositLabel: string;
  matchLabel: string;
  maxBonusLabel: string;
  wageringLabel: string;
  yourDeposit: string;
  bonusAmount: string;
  totalBalance: string;
  playthrough: string;
  playthroughHint: string;
  playthroughWithDepositHint: string;
  footnote: string;
  currency: string;
  localeTag: string;
}

export const BONUS_CALCULATOR_COPY: Record<LocaleId, BonusCalculatorCopy> = {
  "en-IE": {
    title: "Bonus calculator",
    subtitle:
      "Slide your deposit to see the matched bonus and how much you must wager before cashing out.",
    depositLabel: "Your deposit",
    matchLabel: "Match",
    maxBonusLabel: "Max bonus",
    wageringLabel: "Wagering",
    yourDeposit: "Deposit",
    bonusAmount: "Bonus",
    totalBalance: "Playable total",
    playthrough: "Wagering requirement",
    playthroughHint: "Bonus × wagering multiple (deposit not included).",
    playthroughWithDepositHint:
      "Deposit + bonus × wagering multiple (stricter “bonus + deposit” terms).",
    footnote:
      "Illustrative only — always check the operator’s current terms. Game weighting and max-bet rules can change the real playthrough.",
    currency: "EUR",
    localeTag: "en-IE",
  },
  "de-DE": {
    title: "Bonus-Rechner",
    subtitle:
      "Stellen Sie die Einzahlung ein und sehen Sie den Match-Bonus sowie den Umsatz, bevor Sie auszahlen können.",
    depositLabel: "Ihre Einzahlung",
    matchLabel: "Match",
    maxBonusLabel: "Max. Bonus",
    wageringLabel: "Umsatzbedingung",
    yourDeposit: "Einzahlung",
    bonusAmount: "Bonus",
    totalBalance: "Spielbares Guthaben",
    playthrough: "Umsatzanforderung",
    playthroughHint: "Bonus × Umsatzmultiplikator (ohne Einzahlung).",
    playthroughWithDepositHint:
      "Einzahlung + Bonus × Umsatzmultiplikator (strengere „Bonus + Einzahlung“-Bedingungen).",
    footnote:
      "Nur zur Veranschaulichung — prüfen Sie stets die aktuellen Anbieterbedingungen. Spielgewichtung und Maximaleinsätze ändern den realen Umsatz.",
    currency: "EUR",
    localeTag: "de-DE",
  },
  "da-DK": {
    title: "Bonusberegner",
    subtitle:
      "Juster indbetalingen og se match-bonus samt hvor meget du skal omsætte, før du kan hæve.",
    depositLabel: "Din indbetaling",
    matchLabel: "Match",
    maxBonusLabel: "Maks. bonus",
    wageringLabel: "Omsætningskrav",
    yourDeposit: "Indbetaling",
    bonusAmount: "Bonus",
    totalBalance: "Spilbar total",
    playthrough: "Omsætningskrav",
    playthroughHint: "Bonus × omsætningsmultiplikator (uden indbetaling).",
    playthroughWithDepositHint:
      "Indbetaling + bonus × omsætningsmultiplikator (strengere “bonus + indbetaling”-vilkår).",
    footnote:
      "Kun illustrativt — tjek altid operatørens aktuelle vilkår. Spilvægtning og maks. indsats kan ændre den reelle omsætning.",
    currency: "DKK",
    localeTag: "da-DK",
  },
  "fi-FI": {
    title: "Bonuslaskuri",
    subtitle:
      "Säädä talletusta ja näe matching-bonus sekä kuinka paljon sinun pitää kierrättää ennen kotiutusta.",
    depositLabel: "Talletuksesi",
    matchLabel: "Match",
    maxBonusLabel: "Enimmäisbonus",
    wageringLabel: "Kierrätys",
    yourDeposit: "Talletus",
    bonusAmount: "Bonus",
    totalBalance: "Pelattava yhteensä",
    playthrough: "Kierrätysvaatimus",
    playthroughHint: "Bonus × kierrätyskerroin (talletusta ei lasketa).",
    playthroughWithDepositHint:
      "Talletus + bonus × kierrätyskerroin (tiukempi “bonus + talletus” -ehto).",
    footnote:
      "Vain havainnollistava — tarkista aina operaattorin ajantasaiset ehdot. Pelipainotukset ja maksimipanokset vaikuttavat todelliseen kierrätykseen.",
    currency: "EUR",
    localeTag: "fi-FI",
  },
  "nb-NO": {
    title: "Bonuskalkulator",
    subtitle:
      "Juster innskuddet og se match-bonusen samt hvor mye du må omsette før uttak.",
    depositLabel: "Ditt innskudd",
    matchLabel: "Match",
    maxBonusLabel: "Maks bonus",
    wageringLabel: "Omsetningskrav",
    yourDeposit: "Innskudd",
    bonusAmount: "Bonus",
    totalBalance: "Spillbar total",
    playthrough: "Omsetningskrav",
    playthroughHint: "Bonus × omsetningsmultiplikator (uten innskudd).",
    playthroughWithDepositHint:
      "Innskudd + bonus × omsetningsmultiplikator (strengere “bonus + innskudd”-vilkår).",
    footnote:
      "Kun illustrativt — sjekk alltid operatørens gjeldende vilkår. Spillvekting og maksinnsats kan endre reell omsetning.",
    currency: "NOK",
    localeTag: "nb-NO",
  },
  "sv-SE": {
    title: "Bonuskalkylator",
    subtitle:
      "Justera insättningen och se matchningsbonusen samt hur mycket du måste omsätta innan uttag.",
    depositLabel: "Din insättning",
    matchLabel: "Matchning",
    maxBonusLabel: "Maxbonus",
    wageringLabel: "Omsättningskrav",
    yourDeposit: "Insättning",
    bonusAmount: "Bonus",
    totalBalance: "Spelbar total",
    playthrough: "Omsättningskrav",
    playthroughHint: "Bonus × omsättningsmultipel (utan insättning).",
    playthroughWithDepositHint:
      "Insättning + bonus × omsättningsmultipel (strängare “bonus + insättning”-villkor).",
    footnote:
      "Endast illustrativt — kontrollera alltid operatörens aktuella villkor. Spelviktning och maxinsats kan ändra den verkliga omsättningen.",
    currency: "SEK",
    localeTag: "sv-SE",
  },
};
