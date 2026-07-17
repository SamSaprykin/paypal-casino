import type { LocaleId } from "../locales";

export interface BlockedCasinoModalCopy {
  /** {{name}} = blocked casino name */
  title: string;
  body: string;
  eyebrow: string;
  alternativesHeading: string;
  playNow: string;
  close: string;
  ratingLabel: string;
}

export const BLOCKED_CASINO_MODAL_COPY: Record<
  LocaleId,
  BlockedCasinoModalCopy
> = {
  "en-IE": {
    eyebrow: "Editor's note",
    title: "We can no longer recommend {{name}}",
    body: "This casino is no longer on our recommended list. Please explore the trusted alternatives below — each one has been reviewed and verified by our editorial team.",
    alternativesHeading: "Our top alternatives",
    playNow: "Play Now",
    close: "Close",
    ratingLabel: "Editor rating",
  },
  "sv-SE": {
    eyebrow: "Redaktionellt meddelande",
    title: "Vi kan inte längre rekommendera {{name}}",
    body: "Det här casinot finns inte längre på vår rekommenderade lista. Utforska gärna de pålitliga alternativen nedan — varje alternativ är granskat och verifierat av vårt redaktionella team.",
    alternativesHeading: "Våra bästa alternativ",
    playNow: "Spela nu",
    close: "Stäng",
    ratingLabel: "Redaktionsbetyg",
  },
  "da-DK": {
    eyebrow: "Redaktionel note",
    title: "Vi kan ikke længere anbefale {{name}}",
    body: "Dette casino er ikke længere på vores anbefalede liste. Se venligst de pålidelige alternativer nedenfor — hvert alternativ er gennemgået og verificeret af vores redaktionelle team.",
    alternativesHeading: "Vores bedste alternativer",
    playNow: "Spil nu",
    close: "Luk",
    ratingLabel: "Redaktionel score",
  },
  "fi-FI": {
    eyebrow: "Toimituksen huomautus",
    title: "Emme enää suosittele {{name}}-kasinoa",
    body: "Tämä kasino ei ole enää suositeltujen listallamme. Tutustu luotettaviin vaihtoehtoihin alta — jokainen on toimittajatiimimme tarkistama.",
    alternativesHeading: "Parhaat vaihtoehtomme",
    playNow: "Pelaa nyt",
    close: "Sulje",
    ratingLabel: "Toimituksen arvio",
  },
  "de-DE": {
    eyebrow: "Hinweis der Redaktion",
    title: "Wir können {{name}} nicht mehr empfehlen",
    body: "Dieses Casino steht nicht mehr auf unserer Empfehlungsliste. Schauen Sie sich bitte die vertrauenswürdigen Alternativen unten an — jede wurde von unserem Redaktionsteam geprüft.",
    alternativesHeading: "Unsere Top-Alternativen",
    playNow: "Jetzt spielen",
    close: "Schließen",
    ratingLabel: "Redaktionsbewertung",
  },
  "nb-NO": {
    eyebrow: "Redaksjonell merknad",
    title: "Vi kan ikke lenger anbefale {{name}}",
    body: "Dette kasinoet står ikke lenger på vår anbefalte liste. Ta gjerne en titt på de pålitelige alternativene nedenfor — hvert alternativ er gjennomgått og verifisert av redaksjonen vår.",
    alternativesHeading: "Våre beste alternativer",
    playNow: "Spill nå",
    close: "Lukk",
    ratingLabel: "Redaksjonell score",
  },
};

export function formatBlockedCasinoModalCopy(
  copy: BlockedCasinoModalCopy,
  casinoName: string,
): BlockedCasinoModalCopy {
  return {
    ...copy,
    title: copy.title.replace(/\{\{name\}\}/g, casinoName),
  };
}
