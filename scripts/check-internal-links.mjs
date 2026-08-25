#!/usr/bin/env node
/**
 * Internal link checker for MDX page content.
 *
 * Compares every internal href found in `src/data/content/**\/*.mdx` against the
 * routes that actually exist in `dist/` (so run `astro build` first).
 *
 * Usage:
 *   node scripts/check-internal-links.mjs            # human report, exits 1 when broken
 *   node scripts/check-internal-links.mjs --json     # machine readable
 */

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const CONTENT = path.join(ROOT, "src/data/content");
const asJson = process.argv.includes("--json");

async function walk(dir, onFile) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, onFile);
    else await onFile(full);
  }
}

async function collectRoutes() {
  const routes = new Set();
  await walk(DIST, async (file) => {
    if (path.basename(file) !== "index.html") return;
    const rel = path.relative(DIST, path.dirname(file)).replace(/\\/g, "/");
    routes.add(rel ? `/${rel}/` : "/");
  });
  return routes;
}

/** `href="/x/"` in raw HTML plus `[label](/x/)` in markdown. */
const HREF_RE = /href="([^"]+)"/g;
const MD_LINK_RE = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

function extractLinks(source) {
  const found = new Map();
  for (const re of [HREF_RE, MD_LINK_RE]) {
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(source))) {
      const raw = match[1];
      if (!raw.startsWith("/")) continue;
      if (raw.startsWith("//")) continue;
      const clean = raw.split("#")[0].split("?")[0];
      if (!clean) continue;
      const line = source.slice(0, match.index).split("\n").length;
      if (!found.has(clean)) found.set(clean, line);
    }
  }
  return found;
}

const routes = await collectRoutes();
if (routes.size === 0) {
  console.error("No routes found in dist/. Run `npx astro build` first.");
  process.exit(2);
}

const broken = [];
let linkCount = 0;

await walk(CONTENT, async (file) => {
  if (!file.endsWith(".mdx")) return;
  const source = await readFile(file, "utf8");
  for (const [link, line] of extractLinks(source)) {
    linkCount += 1;
    const normalized = link.endsWith("/") ? link : `${link}/`;
    if (routes.has(normalized) || routes.has(link)) continue;
    broken.push({ file: path.relative(ROOT, file), line, link });
  }
});

if (asJson) {
  console.log(JSON.stringify({ checked: linkCount, broken }, null, 2));
} else {
  console.log(`Checked ${linkCount} internal links in ${routes.size} routes.`);
  if (broken.length === 0) {
    console.log("No broken internal links.");
  } else {
    const byLink = new Map();
    for (const item of broken) {
      if (!byLink.has(item.link)) byLink.set(item.link, []);
      byLink.get(item.link).push(`${item.file}:${item.line}`);
    }
    console.log(`\n${broken.length} broken link(s), ${byLink.size} unique:\n`);
    for (const [link, places] of [...byLink].sort((a, b) =>
      a[0].localeCompare(b[0]),
    )) {
      console.log(`${link}  (${places.length})`);
      for (const place of places) console.log(`  - ${place}`);
    }
  }
}

process.exit(broken.length ? 1 : 0);
