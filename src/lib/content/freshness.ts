export type ReviewCycle = "weekly" | "monthly" | "quarterly" | "yearly";

const CYCLE_DAYS: Record<ReviewCycle, number> = {
  weekly: 7,
  monthly: 30,
  quarterly: 90,
  yearly: 365,
};

/** Normalise ISO / YYYY-MM-DD / DD.MM.YYYY into a Date at UTC noon. */
export function parseFreshnessDate(
  input: string | undefined | null,
): Date | null {
  if (!input || typeof input !== "string") return null;
  const raw = input.trim();
  if (!raw) return null;

  // DD.MM.YYYY (common in Nordic editorial notes)
  const dmy = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(raw);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]);
    const year = Number(dmy[3]);
    const d = new Date(Date.UTC(year, month - 1, day, 12));
    return Number.isNaN(d.getTime()) ? null : d;
  }

  // YYYY-MM-DD or full ISO
  const isoDay = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
  if (isoDay) {
    const d = new Date(
      Date.UTC(Number(isoDay[1]), Number(isoDay[2]) - 1, Number(isoDay[3]), 12),
    );
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function isReviewCycle(value: unknown): value is ReviewCycle {
  return (
    value === "weekly" ||
    value === "monthly" ||
    value === "quarterly" ||
    value === "yearly"
  );
}

export function addReviewCycle(date: Date, cycle: ReviewCycle): Date {
  const next = new Date(date.getTime());
  switch (cycle) {
    case "weekly":
      next.setUTCDate(next.getUTCDate() + 7);
      break;
    case "monthly":
      next.setUTCMonth(next.getUTCMonth() + 1);
      break;
    case "quarterly":
      next.setUTCMonth(next.getUTCMonth() + 3);
      break;
    case "yearly":
      next.setUTCFullYear(next.getUTCFullYear() + 1);
      break;
    default:
      next.setUTCMonth(next.getUTCMonth() + 1);
  }
  return next;
}

export function toIsoDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatFreshnessDate(date: Date, localeTag = "en-GB"): string {
  return new Intl.DateTimeFormat(localeTag, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export interface ResolvedFreshness {
  date: Date;
  dateIso: string;
  dateDisplay: string;
  nextReview: Date;
  nextReviewIso: string;
  nextReviewDisplay: string;
  reviewCycle: ReviewCycle;
}

export function resolveFreshness(options: {
  date?: string | null;
  nextReview?: string | null;
  reviewCycle?: string | null;
  localeTag?: string;
}): ResolvedFreshness | null {
  const date = parseFreshnessDate(options.date);
  if (!date) return null;

  const cycle: ReviewCycle = isReviewCycle(options.reviewCycle)
    ? options.reviewCycle
    : "monthly";

  const next =
    parseFreshnessDate(options.nextReview) ?? addReviewCycle(date, cycle);
  const localeTag = options.localeTag || "en-GB";

  return {
    date,
    dateIso: toIsoDateOnly(date),
    dateDisplay: formatFreshnessDate(date, localeTag),
    nextReview: next,
    nextReviewIso: toIsoDateOnly(next),
    nextReviewDisplay: formatFreshnessDate(next, localeTag),
    reviewCycle: cycle,
  };
}

/** Approximate days in cycle — for badges / aria only. */
export function reviewCycleDays(cycle: ReviewCycle): number {
  return CYCLE_DAYS[cycle];
}
