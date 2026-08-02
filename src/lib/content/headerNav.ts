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

export async function resolveHeaderNav(
  locale: WebsiteLocaleKey = ROOT_WEBSITE_LOCALE,
) {
  const labels = NAV_LABELS[locale];
  const homeHref = homeHrefForLocale(locale);

  const [
    paypalCasinoHref,
    revolutCasinosHref,
    cryptoCasinosHref,
    newCasinosHref,
    bonusesHref,
    fastPayoutHref,
    mobileCasinosHref,
    minimumDepositHref,
  ] = await Promise.all([
    getWebsitePageHrefByName("Paypal Casino", locale),
    getWebsitePageHrefByName("Revolut Casinos", locale),
    getWebsitePageHrefByName("Crypto Casinos", locale),
    getWebsitePageHrefByName("New Casinos", locale),
    getWebsitePageHrefByName("Bonuses", locale),
    getWebsitePageHrefByName("Fast Payout Casinos", locale),
    getWebsitePageHrefByName("Mobile Casinos", locale),
    getWebsitePageHrefByName("Minimum Deposit Casinos", locale),
  ]);

  const link = (
    href: string | null,
    label: string,
    short: string,
    icon: HeaderNavIconKey,
  ): HeaderNavLink | null => (href ? { href, label, short, icon } : null);

  const categories: HeaderCategory[] = [
    {
      title: labels.categories.casinoTypes,
      items: [
        link(newCasinosHref, labels.newCasinos, labels.short.newCasinos, "new"),
        link(
          fastPayoutHref,
          labels.fastPayoutCasinos,
          labels.short.fastPayoutCasinos,
          "fast",
        ),
        link(
          mobileCasinosHref,
          labels.mobileCasinos,
          labels.short.mobileCasinos,
          "mobile",
        ),
        link(
          minimumDepositHref,
          labels.minimumDepositCasinos,
          labels.short.minimumDepositCasinos,
          "minDeposit",
        ),
      ].filter((item): item is HeaderNavLink => item != null),
    },
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
          revolutCasinosHref,
          labels.revolutCasinos,
          labels.short.revolutCasinos,
          "revolut",
        ),
        link(
          cryptoCasinosHref,
          labels.cryptoCasinos,
          labels.short.cryptoCasinos,
          "crypto",
        ),
      ].filter((item): item is HeaderNavLink => item != null),
    },
    {
      title: labels.categories.offers,
      items: [
        link(bonusesHref, labels.bonuses, labels.short.bonuses, "bonus"),
      ].filter((item): item is HeaderNavLink => item != null),
    },
  ].filter((cat) => cat.items.length > 0);

  return {
    labels,
    homeHref,
    categories,
  };
}
