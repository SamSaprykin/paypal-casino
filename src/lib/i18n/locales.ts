/**
 * Supported markets / locales for hardcoded UI copy.
 * CMS entries may attach their own locale; these ids align with BCP 47 where applicable.
 */
export const LOCALE_IDS = [
  "en-IE",
  "sv-SE",
  "da-DK",
  "fi-FI",
  "de-DE",
  "nb-NO",
] as const;

export type LocaleId = (typeof LOCALE_IDS)[number];

export interface LocaleMeta {
  id: LocaleId;
  /** Human label for admin / demo */
  label: string;
  /** HTML lang attribute */
  htmlLang: string;
}

export const LOCALES: Record<LocaleId, LocaleMeta> = {
  "en-IE": { id: "en-IE", label: "English (Ireland)", htmlLang: "en-IE" },
  "sv-SE": { id: "sv-SE", label: "Sweden", htmlLang: "sv" },
  "da-DK": { id: "da-DK", label: "Denmark", htmlLang: "da" },
  "fi-FI": { id: "fi-FI", label: "Finland", htmlLang: "fi" },
  "de-DE": { id: "de-DE", label: "Germany", htmlLang: "de" },
  "nb-NO": { id: "nb-NO", label: "Norway", htmlLang: "nb" },
};
