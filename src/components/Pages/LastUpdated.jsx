import { CalendarDays } from "lucide-react";
import { resolveFreshness } from "../../lib/content/freshness";

/**
 * Structured content freshness strip.
 *
 * @example
 * <LastUpdated date="2026-07-25" reviewCycle="monthly" nextReview="2026-08-25" />
 */
export function LastUpdated({
  date,
  reviewCycle = "monthly",
  nextReview,
  localeTag = "en-GB",
  labels,
  children = null,
  className = "",
}) {
  const resolved = resolveFreshness({
    date,
    nextReview,
    reviewCycle,
    localeTag,
  });

  if (!resolved && !children) return null;

  const lastVerified = labels?.lastVerified || "Last verified";
  const nextReviewLabel = labels?.nextReview || "Next review";
  const cycleLabel = labels?.reviewCycleLabel || "Review cycle";
  const cycleName =
    labels?.cycles?.[resolved?.reviewCycle || reviewCycle] ||
    resolved?.reviewCycle ||
    reviewCycle;

  return (
    <div
      className={`content-freshness last-updated mt-4 rounded-xl border-l-2 border-emerald-400 bg-emerald-50/70 px-3 py-3 shadow-sm sm:px-6 sm:py-4 ${className}`}
      data-freshness-date={resolved?.dateIso}
      data-freshness-next={resolved?.nextReviewIso}
      data-freshness-cycle={resolved?.reviewCycle || reviewCycle}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex items-start">
          <CalendarDays
            className="h-5 w-5 shrink-0 text-emerald-600 sm:h-6 sm:w-6"
            aria-hidden
          />
        </div>
        <div className="min-w-0 flex-1 text-emerald-950">
          {resolved ? (
            <div className="flex flex-col flex-wrap gap-1 text-[10px] font-semibold leading-snug sm:flex-row sm:items-center sm:gap-x-2 sm:text-base">
              {/* On mobile use text-xs, on sm+ use text-base */}
              <span className="break-words">
                {lastVerified}:{" "}
                <time dateTime={resolved.dateIso}>{resolved.dateDisplay}</time>
              </span>
              <span
                className="hidden text-emerald-700/50 sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="break-words">
                {nextReviewLabel}:{" "}
                <time dateTime={resolved.nextReviewIso}>
                  {resolved.nextReviewDisplay}
                </time>
              </span>
            </div>
          ) : null}
          {resolved ? (
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-emerald-800/70 sm:text-xs">
              {cycleLabel}: {cycleName}
            </p>
          ) : null}
          {children ? (
            <div className="mt-2 text-xs leading-relaxed text-emerald-900/90 sm:text-sm [&_p]:mb-2 [&_p]:last:mb-0 [&_strong]:font-semibold">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LastUpdated;
