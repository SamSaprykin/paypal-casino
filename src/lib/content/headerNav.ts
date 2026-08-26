import {
  NAV_LABELS,
  ROOT_WEBSITE_LOCALE,
  homeHrefForLocale,
} from "../cms/routing";
import type { WebsiteLocaleKey } from "../cms/locales";
import { getWebsitePageHrefByName } from "./websitePages";

export type HeaderNavIconKey =
  | "new"
  | "fast"
  | "mobile"
  | "minDeposit"
  | "paypal"
  | "revolut"
  | "crypto"
  | "bonus";

export type HeaderNavLink = {
  href: string;
  label: string;
  short: string;
  icon: HeaderNavIconKey;
};

export type HeaderCategory = {
  title: string;
  items: HeaderNavLink[];
};

/**
 * Header for every locale: Online Casino (home) + Payments (PayPal, Crypto) only.
 * Casino types, Revolut, bonuses, etc. are retired (410).
 */
export async function resolveHeaderNav(
  locale: WebsiteLocaleKey = ROOT_WEBSITE_LOCALE,
) {
  const labels = NAV_LABELS[locale];
  const homeHref = homeHrefForLocale(locale);

  const [paypalCasinoHref, cryptoCasinosHref] = await Promise.all([
    getWebsitePageHrefByName("Paypal Casino", locale),
    getWebsitePageHrefByName("Crypto Casinos", locale),
  ]);

  const link = (
    href: string | null,
    label: string,
    short: string,
    icon: HeaderNavIconKey,
  ): HeaderNavLink | null => (href ? { href, label, short, icon } : null);

  const categories: HeaderCategory[] = [
    {
      title: labels.categories.payments,
      items: [
        link(
          paypalCasinoHref,
          labels.paypalCasino,
          labels.short.paypalCasino,
          "paypal",
        ),
        link(
          cryptoCasinosHref,
          labels.cryptoCasinos,
          labels.short.cryptoCasinos,
          "crypto",
        ),
      ].filter((item): item is HeaderNavLink => item != null),
    },
  ].filter((cat) => cat.items.length > 0);

  return {
    labels,
    homeHref,
    categories,
  };
}
