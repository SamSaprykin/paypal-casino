/** Aligns with `scripts/remove-thin-casino-reviews.mjs`. */
export const MIN_INDEXABLE_REVIEW_WORDS = 400;

export function markdownWordCount(markdown: string | undefined): number {
  const text = (markdown ?? "").trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export function isThinCasinoReview(markdown: string | undefined): boolean {
  return markdownWordCount(markdown) < MIN_INDEXABLE_REVIEW_WORDS;
}
