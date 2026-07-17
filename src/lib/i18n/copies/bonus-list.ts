import type { LocaleId } from "../locales";

/** UI strings for the bonuses list section (`BonusesListSection.astro`). */
export interface BonusListCopy {
  /** Prefix before the bonus code, e.g. "Code:". */
  codeLabel: string;
  /** CTA button text. */
  claimBonus: string;
}

export const BONUS_LIST_COPY: Record<LocaleId, BonusListCopy> = {
  "en-IE": { codeLabel: "Code:", claimBonus: "Claim Bonus" },
  "sv-SE": { codeLabel: "Kod:", claimBonus: "Hämta bonus" },
  "da-DK": { codeLabel: "Kode:", claimBonus: "Hent bonus" },
  "fi-FI": { codeLabel: "Koodi:", claimBonus: "Lunasta bonus" },
  "de-DE": { codeLabel: "Code:", claimBonus: "Bonus sichern" },
  "nb-NO": { codeLabel: "Kode:", claimBonus: "Hent bonus" },
};
