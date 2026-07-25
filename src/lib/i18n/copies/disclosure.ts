import type { LocaleId } from "../locales";

export type DisclosureType = "affiliate" | "legal" | "responsible-gambling";

export interface DisclosureHelpline {
  name: string;
  /** Display phone number when available. */
  phone?: string;
  url: string;
}

export interface DisclosureCopy {
  ageBadge: string;
  ageLabel: string;
  affiliateTitle: string;
  affiliateBody: string;
  legalTitle: string;
  legalBody: string;
  rgTitle: string;
  rgBody: string;
  helplinesHeading: string;
  helplines: DisclosureHelpline[];
}

export const DISCLOSURE_COPY: Record<LocaleId, DisclosureCopy> = {
  "en-IE": {
    ageBadge: "18+",
    ageLabel: "Adults only",
    affiliateTitle: "Affiliate disclosure",
    affiliateBody:
      "Some links on this page are affiliate links. We may earn a commission if you sign up or deposit through them. That never changes our ratings, editorial order, or recommendations.",
    legalTitle: "Editorial note",
    legalBody:
      "Bonuses, payment methods, licences, and terms change. Always verify details on the operator’s site before you register or deposit. We are not a gambling operator.",
    rgTitle: "Gamble responsibly",
    rgBody:
      "Online gambling is for adults aged 18+. Set deposit limits, take breaks, and stop if it stops being fun. Help is available if you or someone you know needs support.",
    helplinesHeading: "Support in Ireland",
    helplines: [
      {
        name: "GamblingCare.ie",
        phone: "1800 936 725",
        url: "https://www.gamblingcare.ie",
      },
      {
        name: "BeGambleAware",
        url: "https://www.begambleaware.org",
      },
      {
        name: "Gambling Therapy",
        url: "https://www.gamblingtherapy.org",
      },
    ],
  },
  "de-DE": {
    ageBadge: "18+",
    ageLabel: "Nur für Erwachsene",
    affiliateTitle: "Affiliate-Hinweis",
    affiliateBody:
      "Einige Links auf dieser Seite sind Affiliate-Links. Wir können eine Provision erhalten, wenn Sie sich darüber anmelden oder einzahlen. Das beeinflusst weder unsere Bewertungen noch die redaktionelle Reihenfolge.",
    legalTitle: "Redaktioneller Hinweis",
    legalBody:
      "Boni, Zahlungsmethoden, Lizenzen und Bedingungen ändern sich. Prüfen Sie Angaben stets auf der Website des Anbieters, bevor Sie sich registrieren oder einzahlen. Wir sind kein Glücksspielanbieter.",
    rgTitle: "Verantwortungsbewusst spielen",
    rgBody:
      "Online-Glücksspiel ist nur für Personen ab 18 Jahren. Setzen Sie Einzahlungslimits, machen Sie Pausen und hören Sie auf, wenn es keinen Spaß mehr macht. Bei Bedarf ist Hilfe verfügbar.",
    helplinesHeading: "Hilfe in Deutschland",
    helplines: [
      {
        name: "BZgA – Spielen mit Verantwortung",
        phone: "0800 1372700",
        url: "https://www.spielen-mit-verantwortung.de",
      },
      {
        name: "BeGambleAware",
        url: "https://www.begambleaware.org",
      },
      {
        name: "Gambling Therapy",
        url: "https://www.gamblingtherapy.org",
      },
    ],
  },
  "da-DK": {
    ageBadge: "18+",
    ageLabel: "Kun for voksne",
    affiliateTitle: "Affiliate-oplysning",
    affiliateBody:
      "Nogle links på denne side er affiliate-links. Vi kan tjene en kommission, hvis du tilmelder dig eller indbetaler via dem. Det ændrer aldrig vores bedømmelser eller redaktionelle rækkefølge.",
    legalTitle: "Redaktionel note",
    legalBody:
      "Bonusser, betalingsmetoder, licenser og vilkår ændrer sig. Tjek altid oplysningerne på operatørens site, før du opretter dig eller indbetaler. Vi er ikke en spiludbyder.",
    rgTitle: "Spil ansvarligt",
    rgBody:
      "Online gambling er kun for personer på 18+. Sæt indbetalingsgrænser, hold pauser, og stop hvis det ikke længere er sjovt. Der er hjælp at hente, hvis du eller nogen du kender har brug for støtte.",
    helplinesHeading: "Hjælp i Danmark",
    helplines: [
      {
        name: "Ludomanilinjen",
        phone: "70 22 28 25",
        url: "https://www.ludomani.dk",
      },
      {
        name: "Spillemyndigheden",
        url: "https://www.spillemyndigheden.dk",
      },
      {
        name: "Gambling Therapy",
        url: "https://www.gamblingtherapy.org",
      },
    ],
  },
  "fi-FI": {
    ageBadge: "18+",
    ageLabel: "Vain täysi-ikäisille",
    affiliateTitle: "Affiliate-ilmoitus",
    affiliateBody:
      "Osa tämän sivun linkeistä on affiliate-linkkejä. Voimme saada palkkion, jos rekisteröidyt tai talletat niiden kautta. Se ei vaikuta arvioihimme eikä toimitukselliseen järjestykseen.",
    legalTitle: "Toimituksellinen huomio",
    legalBody:
      "Bonukset, maksutavat, lisenssit ja ehdot muuttuvat. Vahvista tiedot aina operaattorin sivustolla ennen rekisteröitymistä tai talletusta. Emme ole rahapelitoimija.",
    rgTitle: "Pelaa vastuullisesti",
    rgBody:
      "Nettipelaaminen on vain 18 vuotta täyttäneille. Aseta talletusrajat, pidä taukoja ja lopeta, jos pelaaminen ei enää ole hauskaa. Apua on saatavilla, jos sinä tai läheisesi tarvitsette tukea.",
    helplinesHeading: "Tuki Suomessa",
    helplines: [
      {
        name: "Peluuri",
        phone: "0800 100 101",
        url: "https://www.peluuri.fi",
      },
      {
        name: "BeGambleAware",
        url: "https://www.begambleaware.org",
      },
      {
        name: "Gambling Therapy",
        url: "https://www.gamblingtherapy.org",
      },
    ],
  },
  "nb-NO": {
    ageBadge: "18+",
    ageLabel: "Kun for voksne",
    affiliateTitle: "Affiliate-opplysning",
    affiliateBody:
      "Noen lenker på denne siden er affiliate-lenker. Vi kan tjene provisjon hvis du registrerer deg eller setter inn via dem. Det endrer aldri vurderingene våre eller den redaksjonelle rekkefølgen.",
    legalTitle: "Redaksjonell merknad",
    legalBody:
      "Bonuser, betalingsmetoder, lisenser og vilkår endres. Bekreft alltid detaljene på operatørens nettsted før du registrerer deg eller setter inn. Vi er ikke en spilltilbyder.",
    rgTitle: "Spill ansvarlig",
    rgBody:
      "Nettgambling er kun for personer over 18 år. Sett innskuddsgrenser, ta pauser, og stopp hvis det ikke lenger er gøy. Hjelp er tilgjengelig hvis du eller noen du kjenner trenger støtte.",
    helplinesHeading: "Hjelp i Norge",
    helplines: [
      {
        name: "Hjelpelinjen",
        phone: "800 800 40",
        url: "https://www.hjelpelinjen.no",
      },
      {
        name: "BeGambleAware",
        url: "https://www.begambleaware.org",
      },
      {
        name: "Gambling Therapy",
        url: "https://www.gamblingtherapy.org",
      },
    ],
  },
  "sv-SE": {
    ageBadge: "18+",
    ageLabel: "Endast 18+",
    affiliateTitle: "Affiliate-information",
    affiliateBody:
      "Vissa länkar på den här sidan är affiliate-länkar. Vi kan få provision om du registrerar dig eller sätter in via dem. Det påverkar aldrig våra betyg eller den redaktionella ordningen.",
    legalTitle: "Redaktionell notis",
    legalBody:
      "Bonusar, betalningsmetoder, licenser och villkor ändras. Kontrollera alltid uppgifterna på operatörens webbplats innan du registrerar dig eller sätter in. Vi är inte en speloperatör.",
    rgTitle: "Spela ansvarsfullt",
    rgBody:
      "Nätspel är endast för personer över 18 år. Sätt insättningsgränser, ta pauser och sluta om det inte längre är roligt. Hjälp finns om du eller någon du känner behöver stöd.",
    helplinesHeading: "Stöd i Sverige",
    helplines: [
      {
        name: "Stödlinjen",
        phone: "020-81 91 00",
        url: "https://www.stodlinjen.se",
      },
      {
        name: "Spelberoendes Riksförbund",
        url: "https://www.spelberoende.se",
      },
      {
        name: "Gambling Therapy",
        url: "https://www.gamblingtherapy.org",
      },
    ],
  },
};

export const DEFAULT_DISCLOSURE_TYPES: DisclosureType[] = [
  "affiliate",
  "legal",
  "responsible-gambling",
];
