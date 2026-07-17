/**
 * Migrates locale files from .md to .mdx.
 * Page section bodies stay inline as bodyMarkdown in each {locale}.mdx.
 *
 * Usage: node scripts/migrate-to-mdx.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";
import {
  LOCALES,
  parseLocaleFile,
  formatLocaleFile,
  writeJson,
  readJson,
} from "./lib/content-format.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../src/data/content");

async function migrateCasinoDir(dir) {
  let changed = false;
  for (const locale of LOCALES) {
    const mdPath = path.join(dir, `${locale}.md`);
    const mdxPath = path.join(dir, `${locale}.mdx`);
    try {
      await fs.access(mdPath);
      const source = await fs.readFile(mdPath, "utf8");
      await fs.writeFile(mdxPath, source, "utf8");
      await fs.rm(mdPath);
      changed = true;
    } catch {
      /* no .md for locale */
    }
  }
  return changed;
}

async function migratePageDir(dir) {
  let changed = false;

  for (const locale of LOCALES) {
    const mdPath = path.join(dir, `${locale}.md`);
    const mdxPath = path.join(dir, `${locale}.mdx`);

    let source;
    try {
      source = await fs.readFile(mdPath, "utf8");
    } catch {
      continue;
    }

    const { frontmatter, body } = parseLocaleFile(source);
    await fs.writeFile(
      mdxPath,
      formatLocaleFile(
        {
          slug: frontmatter.slug,
          seo: frontmatter.seo,
          sections: frontmatter.sections,
        },
        body,
      ),
      "utf8",
    );
    await fs.rm(mdPath);
    changed = true;
  }

  return changed;
}

async function main() {
  const casinoIndex = await readJson(
    path.join(CONTENT_DIR, "casinos/_index.json"),
  );
  let casinoCount = 0;
  for (const entry of casinoIndex) {
    if (await migrateCasinoDir(path.join(CONTENT_DIR, entry.dir)))
      casinoCount++;
  }

  const pageIndex = await readJson(path.join(CONTENT_DIR, "pages/_index.json"));
  let pageCount = 0;
  for (const entry of pageIndex) {
    if (await migratePageDir(path.join(CONTENT_DIR, entry.dir))) pageCount++;
  }

  console.log(`Migrated ${casinoCount} casinos and ${pageCount} pages to .mdx`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
