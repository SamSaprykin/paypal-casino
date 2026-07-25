import type { LocaleId } from "../locales";

export interface HowToUiCopy {
  /** e.g. "Step {current} of {total}" — placeholders required. */
  stepOf: string;
  copy: string;
  copied: string;
  screenshotPlaceholder: string;
  screenshotMissing: string;
}

export const HOW_TO_UI_COPY: Record<LocaleId, HowToUiCopy> = {
  "en-IE": {
    stepOf: "Step {current} of {total}",
    copy: "Copy",
    copied: "Copied",
    screenshotPlaceholder: "App screenshot",
    screenshotMissing: "Screenshot placeholder — add image when ready",
  },
  "de-DE": {
    stepOf: "Schritt {current} von {total}",
    copy: "Kopieren",
    copied: "Kopiert",
    screenshotPlaceholder: "App-Screenshot",
    screenshotMissing: "Screenshot-Platzhalter — Bild später hinzufügen",
  },
  "da-DK": {
    stepOf: "Trin {current} af {total}",
    copy: "Kopiér",
    copied: "Kopieret",
    screenshotPlaceholder: "App-screenshot",
    screenshotMissing: "Screenshot-pladsholder — tilføj billede senere",
  },
  "fi-FI": {
    stepOf: "Vaihe {current} / {total}",
    copy: "Kopioi",
    copied: "Kopioitu",
    screenshotPlaceholder: "Sovelluskuva",
    screenshotMissing: "Kuvapaikkamerkki — lisää kuva myöhemmin",
  },
  "nb-NO": {
    stepOf: "Steg {current} av {total}",
    copy: "Kopier",
    copied: "Kopiert",
    screenshotPlaceholder: "App-skjermbilde",
    screenshotMissing: "Skjermbilde-plassholder — legg til bilde senere",
  },
  "sv-SE": {
    stepOf: "Steg {current} av {total}",
    copy: "Kopiera",
    copied: "Kopierat",
    screenshotPlaceholder: "App-skärmdump",
    screenshotMissing: "Skärmdumpsplatshållare — lägg till bild senare",
  },
};

export function formatHowToStepOf(
  template: string,
  current: number,
  total: number,
): string {
  return template
    .replace("{current}", String(current))
    .replace("{total}", String(total));
}
