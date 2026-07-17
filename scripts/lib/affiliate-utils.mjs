/**
 * Shared affiliate / blocked-casino helpers for scripts.
 */

import fs from "node:fs/promises";
import path from "node:path";

export const LOCALES = [
  "denmark",
  "finland",
  "germany",
  "ireland",
  "norway",
  "sweden",
];

export function loadGotoPaths(vercelJson) {
  const redirects = Array.isArray(vercelJson.redirects)
    ? vercelJson.redirects
    : [];
  return new Set(
    redirects
      .map((r) => r?.source)
      .filter((s) => typeof s === "string" && s.startsWith("/goto/")),
  );
}

export function hasAffiliateLink(referralUrl, gotoPaths) {
  return (
    typeof referralUrl === "string" &&
    referralUrl.trim() !== "" &&
    gotoPaths.has(referralUrl)
  );
}

export function pickStringArray(v) {
  if (!Array.isArray(v)) return [];
  return v.filter((s) => typeof s === "string" && s.trim() !== "");
}

export function asNumber(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : 0;
}

export function normalizeSlug(slug) {
  return String(slug ?? "").replace(/^\/+|\/+$/g, "");
}

/** Stable pseudo-random shuffle for reproducible alternative picks. */
export function seededShuffle(array, seed) {
  const arr = [...array];
  let s = seed >>> 0;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function hashSeed(...parts) {
  let h = 2166136261;
  for (const part of parts) {
    const str = String(part);
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
  }
  return h >>> 0;
}

export async function loadCasinoBundles(contentDir) {
  const indexPath = path.join(contentDir, "casinos/_index.json");
  const index = JSON.parse(await fs.readFile(indexPath, "utf8"));
  const bundles = [];

  for (const entry of index) {
    const dir = path.join(contentDir, entry.dir);
    const metaPath = path.join(dir, "meta.json");
    let meta;
    try {
      meta = JSON.parse(await fs.readFile(metaPath, "utf8"));
    } catch {
      continue;
    }

    const locales = {};
    for (const locale of LOCALES) {
      try {
        await fs.access(path.join(dir, `${locale}.mdx`));
        locales[locale] = true;
      } catch {
        /* no locale file */
      }
    }

    bundles.push({
      slug: normalizeSlug(entry.slug ?? meta.slug),
      dir,
      meta,
      locales,
    });
  }

  return bundles;
}

export function pickAlternatives(
  bundles,
  { locale, blockedSlug, paypalOnly, gotoPaths },
) {
  const eligible = bundles
    .filter((b) => {
      const slug = normalizeSlug(b.meta.slug);
      if (!slug || slug === blockedSlug) return false;
      if (!b.locales[locale]) return false;
      if (!hasAffiliateLink(b.meta.referralUrl, gotoPaths)) return false;
      if (paypalOnly) {
        const methods = pickStringArray(b.meta.depositMethods);
        if (!methods.some((m) => /paypal/i.test(m))) return false;
      }
      return true;
    })
    .sort((a, b) => asNumber(b.meta.rating) - asNumber(a.meta.rating));

  const shuffled = seededShuffle(
    eligible,
    hashSeed(blockedSlug, locale, paypalOnly ? "paypal" : "home"),
  );
  return shuffled.slice(0, 3).map((b) => normalizeSlug(b.meta.slug));
}

export function buildAlternativesMap(bundles, blockedSlug, gotoPaths) {
  const alternativesByCountry = {};
  const alternativesPaypalByCountry = {};

  for (const locale of LOCALES) {
    alternativesByCountry[locale] = pickAlternatives(bundles, {
      locale,
      blockedSlug,
      paypalOnly: false,
      gotoPaths,
    });
    alternativesPaypalByCountry[locale] = pickAlternatives(bundles, {
      locale,
      blockedSlug,
      paypalOnly: true,
      gotoPaths,
    });
  }

  return { alternativesByCountry, alternativesPaypalByCountry };
}
