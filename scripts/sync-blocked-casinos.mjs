/**
 * Marks casinos without a matching /goto/ redirect in vercel.json as blocked
 * and assigns 3 locale-specific alternative slugs per list type.
 *
 * Usage: node scripts/sync-blocked-casinos.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildAlternativesMap,
  hasAffiliateLink,
  loadCasinoBundles,
  loadGotoPaths,
  normalizeSlug,
} from "./lib/affiliate-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "src/data/content");

async function main() {
  const vercelJson = JSON.parse(
    await fs.readFile(path.join(ROOT, "vercel.json"), "utf8"),
  );
  const gotoPaths = loadGotoPaths(vercelJson);
  const bundles = await loadCasinoBundles(CONTENT_DIR);

  let blockedCount = 0;
  let activeCount = 0;

  for (const bundle of bundles) {
    const slug = normalizeSlug(bundle.meta.slug);
    const referralUrl = bundle.meta.referralUrl;
    const blocked = !hasAffiliateLink(referralUrl, gotoPaths);
    const metaPath = path.join(bundle.dir, "meta.json");
    const meta = { ...bundle.meta };

    if (blocked) {
      blockedCount++;
      meta.blocked = true;
      const { alternativesByCountry, alternativesPaypalByCountry } =
        buildAlternativesMap(bundles, slug, gotoPaths);
      meta.alternativesByCountry = alternativesByCountry;
      meta.alternativesPaypalByCountry = alternativesPaypalByCountry;
      console.log(`blocked  ${slug} (${referralUrl ?? "no referralUrl"})`);
    } else {
      activeCount++;
      meta.blocked = false;
      delete meta.alternativesByCountry;
      delete meta.alternativesPaypalByCountry;
    }

    await fs.writeFile(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");
  }

  console.log(
    `\nSynced ${bundles.length} casinos: ${activeCount} active, ${blockedCount} blocked`,
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
