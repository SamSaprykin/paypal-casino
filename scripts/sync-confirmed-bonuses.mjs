/**
 * Sync welcome-bonus headlines on casino meta.json files from
 * casinos-final-with-confirmed-bonuses.json.
 *
 * Usage:
 *   node scripts/sync-confirmed-bonuses.mjs           # write updates
 *   node scripts/sync-confirmed-bonuses.mjs --dry-run # report only
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");

const COUNTRY_TO_LOCALE = {
  IE: "ireland",
  DE: "germany",
  DK: "denmark",
  FI: "finland",
  NO: "norway",
  SE: "sweden",
};

const LOCALES = Object.values(COUNTRY_TO_LOCALE);

const HEADLINE_TYPES = new Set(["welcome", "no_deposit", "welcome_package"]);

function normalizeSlug(slug) {
  return String(slug || "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/^\/+|\/+$/g, "");
}

function slugKeys(slug) {
  const s = normalizeSlug(slug);
  const stripped = s.replace(/-casino$/, "");
  return new Set([s, stripped, `${stripped}-casino`]);
}

function slugsOverlap(a, b) {
  const ka = slugKeys(a);
  for (const key of slugKeys(b)) {
    if (ka.has(key)) return true;
  }
  return false;
}

function isAvailableOffer(entry) {
  return entry && entry.isAvailable !== false && (entry.title || entry.amount);
}

function headlineScore(bonus) {
  const type = String(bonus.bonusType || "").toLowerCase();
  if (type === "welcome" || type === "welcome_package") return 3;
  if (type === "no_deposit") return 2;
  if (HEADLINE_TYPES.has(type)) return 1;
  return 0;
}

/** Compact offer string suitable for a casino card, not a marketing name. */
function isUsefulHeadline(text) {
  if (!text) return false;
  const value = String(text).trim();
  if (value.length < 10) return false;
  if (/^\d+%\s*$/.test(value)) return false;
  if (
    /(arvioitu|estimated|unconfirmed|not confirmed|vahvistamaton|ei vahvistettu|não confirmado|nao confirmado)/i.test(
      value,
    )
  ) {
    return false;
  }
  return /[€$£]|kr\b|FS\b|NOK|DKK|SEK|BTC|USDT|free spin|gratisspinn|ilmaiskierros|freispiele|gratis spins|gratissnurr/i.test(
    value,
  );
}

function looksEnglishHeadline(text) {
  return /\b(up to|free spins|welcome package|welcome bonus|match)\b/i.test(
    text || "",
  );
}

function displayHeadline(entry, locale) {
  if (!entry) return null;
  const amount = String(entry.amount || "").trim();
  const title = String(entry.title || "").trim();
  const amountOk = isUsefulHeadline(amount);
  const titleOk = isUsefulHeadline(title);

  let headline = null;
  if (
    locale &&
    locale !== "ireland" &&
    titleOk &&
    amountOk &&
    looksEnglishHeadline(amount) &&
    !looksEnglishHeadline(title)
  ) {
    headline = title.length <= 110 ? title : amount;
  } else if (amountOk && amount.length <= 90) {
    headline = amount;
  } else if (titleOk && title.length <= 90) {
    headline = title;
  } else if (amountOk) {
    headline = amount;
  } else if (titleOk) {
    headline = title;
  }

  return headline ? normalizeHeadlineCurrency(headline, locale) : null;
}

/** Keep stored EUR-market headlines in euro, not dual €/$ or leftover £. */
function normalizeHeadlineCurrency(headline, locale) {
  if (!headline) return headline;
  const eurLocales = new Set(["ireland", "germany", "finland"]);
  if (!eurLocales.has(locale)) return headline;

  let out = headline;
  const num = "\\d(?:[\\d\\u00a0\\s.,]*\\d)?";
  out = out.replace(new RegExp(`(€\\s*${num})\\s*/\\s*\\$\\s*${num}`, "g"), "$1");
  if (locale !== "ireland") {
    out = out.replace(/\s*\/\s*£\s*[\d\s.,]*\d(?:\s*\([^)]+\))?/g, "");
    out = out.replace(new RegExp(`£\\s*(${num})`, "g"), "€$1");
    out = out.replace(new RegExp(`(${num})\\s*£`, "g"), "$1 €");
  }
  out = out.replace(new RegExp(`€\\s*/\\s*\\$\\s*(${num})`, "g"), "€$1");
  out = out.replace(new RegExp(`(${num})\\s*€\\s*/\\s*\\$`, "g"), "$1 €");
  out = out.replace(new RegExp(`(?<![A-Za-z])\\$(?!\\/)(${num})`, "g"), "€$1");
  return out;
}

function countryEntry(bonus, countryCode) {
  return (bonus?.countryRelated || []).find(
    (row) => row.countryCode === countryCode && isAvailableOffer(row),
  );
}

function pickPrimaryBonus(bonuses) {
  if (!Array.isArray(bonuses) || bonuses.length === 0) return null;
  const ranked = bonuses.filter((bonus) => headlineScore(bonus) > 0);
  const pool = ranked.length ? ranked : bonuses;
  const marketOrder = ["IE", "DE", "DK", "FI", "NO", "SE"];
  for (const countryCode of marketOrder) {
    const hit = pool.find((bonus) =>
      displayHeadline(countryEntry(bonus, countryCode), COUNTRY_TO_LOCALE[countryCode]),
    );
    if (hit) return hit;
  }
  return pool.find((bonus) =>
    (bonus.countryRelated || []).some((row) => displayHeadline(row)),
  ) ?? pool[0] ?? null;
}

function titlesByLocale(casino) {
  const bonus = pickPrimaryBonus(casino.bonuses || []);
  if (!bonus) return {};
  const titles = {};
  for (const [countryCode, locale] of Object.entries(COUNTRY_TO_LOCALE)) {
    const headline = displayHeadline(countryEntry(bonus, countryCode), locale);
    if (!headline) continue;
    // Don't put Scandinavian-currency scrapes on the Irish card.
    if (
      locale === "ireland" &&
      /DKK|SEK\b|NOK\b/.test(headline) &&
      !/€/.test(headline)
    ) {
      continue;
    }
    titles[locale] = headline;
  }
  return titles;
}

function hasMoneyFigure(text) {
  return /[€$£]|NOK|DKK|SEK|\d[\d\s.,]*\s*kr\b/i.test(text || "");
}

function isWeakerHeadline(next, current) {
  if (!current || !next) return false;
  if (hasMoneyFigure(current) && !hasMoneyFigure(next)) return true;
  return false;
}

function localCurrencyConflict(locale, next, current) {
  if (!current || !next) return false;
  const localKr = /(?:^|[\s\d])kr\b|SEK|DKK|NOK/i.test(current);
  const nextEuroOnly = /€/.test(next) && !/(?:^|[\s\d])kr\b|SEK|DKK|NOK/i.test(next);
  if (
    (locale === "sweden" || locale === "denmark" || locale === "norway") &&
    localKr &&
    nextEuroOnly
  ) {
    return true;
  }
  return false;
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[–—]/g, "-")
    .trim();
}

function textsDiffer(a, b) {
  return normalizeText(a) !== normalizeText(b);
}

async function loadJsonCasinos() {
  const raw = JSON.parse(
    await fs.readFile(
      path.join(ROOT, "casinos-final-with-confirmed-bonuses.json"),
      "utf8",
    ),
  );
  return raw;
}

async function loadLocalCasinos() {
  const index = JSON.parse(
    await fs.readFile(
      path.join(ROOT, "src/data/content/casinos/_index.json"),
      "utf8",
    ),
  );
  const casinos = [];
  for (const entry of index) {
    const metaPath = path.join(ROOT, "src/data/content", entry.dir, "meta.json");
    const meta = JSON.parse(await fs.readFile(metaPath, "utf8"));
    casinos.push({ metaPath, meta, slug: meta.slug || entry.slug });
  }
  return casinos;
}

function matchJsonCasino(localSlug, jsonCasinos) {
  const normalized = normalizeSlug(localSlug);
  const exact = jsonCasinos.find(
    (casino) => normalizeSlug(casino.slug) === normalized,
  );
  if (exact) return exact;
  return jsonCasinos.find((casino) => slugsOverlap(localSlug, casino.slug));
}

function currentWelcomeBonus(meta) {
  const bonuses = Array.isArray(meta.bonuses) ? meta.bonuses : [];
  return bonuses[0] ?? null;
}

function applyTitles(bonus, titles, { pruneStale = false, allTitles = {} } = {}) {
  const next = { ...bonus };
  const intl = {
    ...(bonus.descriptionIntl && typeof bonus.descriptionIntl === "object"
      ? bonus.descriptionIntl
      : {}),
  };

  if (titles.ireland) {
    next.description = titles.ireland;
    intl.ireland = titles.ireland;
  }

  for (const locale of LOCALES) {
    if (locale === "ireland") continue;
    if (titles[locale]) intl[locale] = titles[locale];
  }

  if (pruneStale && allTitles.ireland) {
    for (const locale of LOCALES) {
      if (locale === "ireland") continue;
      if (!allTitles[locale]) delete intl[locale];
    }
  }

  // Drop the legacy "ie" key now that ireland is the locale id.
  if (intl.ie && intl.ireland) delete intl.ie;

  next.descriptionIntl = intl;
  return next;
}

async function main() {
  const [jsonCasinos, localCasinos] = await Promise.all([
    loadJsonCasinos(),
    loadLocalCasinos(),
  ]);

  const unmatched = [];
  const unchanged = [];
  const updates = [];

  for (const local of localCasinos) {
    const jsonCasino = matchJsonCasino(local.slug, jsonCasinos);
    if (!jsonCasino) {
      unmatched.push(local.slug);
      continue;
    }
    if (!Array.isArray(jsonCasino.bonuses) || jsonCasino.bonuses.length === 0) {
      unmatched.push(`${local.slug} (no bonuses in JSON)`);
      continue;
    }

    const titles = titlesByLocale(jsonCasino);
    const bonus = currentWelcomeBonus(local.meta);
    if (!bonus) {
      if (!titles.ireland) {
        unmatched.push(`${local.slug} (no usable IE headline)`);
        continue;
      }
      updates.push({
        slug: local.slug,
        metaPath: local.metaPath,
        meta: local.meta,
        changes: [{ field: "bonuses", from: "(none)", to: titles.ireland }],
        titles,
      });
      continue;
    }

    const changes = [];
    const applied = {};
    if (
      titles.ireland &&
      textsDiffer(bonus.description, titles.ireland) &&
      !isWeakerHeadline(titles.ireland, bonus.description)
    ) {
      applied.ireland = titles.ireland;
      changes.push({
        field: "description",
        from: bonus.description,
        to: titles.ireland,
      });
    }

    const intl =
      bonus.descriptionIntl && typeof bonus.descriptionIntl === "object"
        ? bonus.descriptionIntl
        : {};

    for (const locale of LOCALES) {
      if (!titles[locale]) continue;
      const current =
        locale === "ireland"
          ? intl.ireland || intl.ie || bonus.description
          : intl[locale];
      if (!textsDiffer(current, titles[locale])) continue;
      if (current && isWeakerHeadline(titles[locale], current)) continue;
      if (current && localCurrencyConflict(locale, titles[locale], current)) {
        continue;
      }
      applied[locale] = titles[locale];
      if (locale === "ireland" && applied.ireland) {
        // already recorded as description
        if (!changes.some((c) => c.field === `descriptionIntl.${locale}`)) {
          changes.push({
            field: `descriptionIntl.${locale}`,
            from: current || "(missing)",
            to: titles[locale],
          });
        }
        continue;
      }
      if (locale === "ireland") continue;
      changes.push({
        field: `descriptionIntl.${locale}`,
        from: current || "(missing)",
        to: titles[locale],
      });
    }

    const irelandConfirmed =
      Boolean(titles.ireland) &&
      !isWeakerHeadline(titles.ireland, bonus.description);
    if (irelandConfirmed) {
      for (const locale of LOCALES) {
        if (locale === "ireland") continue;
        if (titles[locale]) continue;
        if (intl[locale]) {
          changes.push({
            field: `descriptionIntl.${locale}`,
            from: intl[locale],
            to: "(removed — no confirmed translation)",
          });
        }
      }
    }

    if (!changes.length) {
      unchanged.push(local.slug);
      continue;
    }

    updates.push({
      slug: local.slug,
      metaPath: local.metaPath,
      meta: local.meta,
      bonus,
      titles: applied,
      allTitles: titles,
      pruneStale: irelandConfirmed,
      changes,
    });
  }

  console.log(`JSON casinos: ${jsonCasinos.length}`);
  console.log(`Local casinos: ${localCasinos.length}`);
  console.log(`Matched, already current: ${unchanged.length}`);
  console.log(`To update: ${updates.length}`);
  console.log(`Unmatched / no JSON bonuses: ${unmatched.length}`);
  if (unmatched.length) {
    console.log(`  ${unmatched.join(", ")}`);
  }
  console.log("");

  for (const update of updates) {
    console.log(`• ${update.slug}`);
    for (const change of update.changes) {
      console.log(`    ${change.field}`);
      console.log(`      - ${change.from}`);
      console.log(`      + ${change.to}`);
    }
  }

  if (DRY_RUN) {
    console.log("\nDry run — no files written.");
    return;
  }

  for (const update of updates) {
    const meta = structuredClone(update.meta);
    if (!Array.isArray(meta.bonuses) || meta.bonuses.length === 0) {
      meta.bonuses = [
        {
          _id: `${update.slug}-welcome`,
          name: "Welcome Bonus",
          code: null,
          codeIntl: null,
          description: update.titles.ireland || "",
          descriptionIntl: Object.fromEntries(
            Object.entries(update.titles).filter(([key]) => key !== "ireland"),
          ),
          referralUrl: meta.referralUrl,
          bonusBackgroundColor: null,
          bonusLogo: null,
        },
      ];
      if (update.titles.ireland) {
        meta.bonuses[0].descriptionIntl.ireland = update.titles.ireland;
      }
    } else {
      meta.bonuses[0] = applyTitles(meta.bonuses[0], update.titles, {
        pruneStale: update.pruneStale,
        allTitles: update.allTitles,
      });
    }
    meta._updatedAt = new Date().toISOString();
    await fs.writeFile(
      update.metaPath,
      `${JSON.stringify(meta, null, 2)}\n`,
      "utf8",
    );
  }

  console.log(`\nWrote ${updates.length} meta.json files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
