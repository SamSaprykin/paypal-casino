import { track } from "@vercel/analytics";

/** Fire when a user clicks a casino referral / affiliate CTA. */
export function trackReferralClick(casinoName: string | undefined | null) {
  const casino = casinoName?.trim() || "unknown";
  track("Referral Click", { casino });
}
