/**
 * Remove auto-generated stub casino reviews that are too thin for a detail page.
 * Keeps reviews with >= 400 words, or >= 250 words when frontmatter includes SEO.
 *
 * Usage: node scripts/remove-thin-casino-reviews.mjs [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CASINOS_DIR = path.join(ROOT, "src/data/content/casinos");
const dryRun = process.argv.includes("--dry-run");

function parseMdx(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const match = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    const body = src.trim();
    return {
      body,
      words: body.split(/\s+/).filter(Boolean).length,
      hasSeo: false,
    };
  }

  const [, frontmatter, bodyRaw] = match;
  const body = bodyRaw.trim();
  return {
    body,
    words: body.split(/\s+/).filter(Boolean).length,
    hasSeo: /^seo:\s/m.test(frontmatter) || /\nseo:\s/m.test(frontmatter),
  };
}

function isSubstantialReview({ words, hasSeo }) {
  return words >= 400 || (words >= 250 && hasSeo);
}

const removed = [];
const kept = [];

for (const slug of fs.readdirSync(CASINOS_DIR)) {
  const dir = path.join(CASINOS_DIR, slug);
  if (!fs.statSync(dir).isDirectory()) continue;

  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
    const filePath = path.join(dir, file);
    const info = parseMdx(filePath);
    if (isSubstantialReview(info)) {
      kept.push({ slug, locale: file.replace(".mdx", ""), words: info.words });
      continue;
    }

    removed.push({ slug, locale: file.replace(".mdx", ""), words: info.words });
    if (!dryRun) fs.unlinkSync(filePath);
  }
}

console.log(
  dryRun ? "[dry-run] Would remove" : "Removed",
  removed.length,
  "thin review files",
);
console.log("Kept", kept.length, "substantial reviews");

if (removed.length) {
  console.log("\nRemoved:");
  for (const row of removed.sort((a, b) =>
    a.slug === b.slug ? a.locale.localeCompare(b.locale) : a.slug.localeCompare(b.slug),
  )) {
    console.log(`  ${row.slug}/${row.locale}.mdx (${row.words} words)`);
  }
}
