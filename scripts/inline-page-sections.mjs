/**
 * Inlines page section bodies from sections/{id}.{locale}.mdx back into
 * each locale file as bodyMarkdown (casino-style: one {locale}.mdx per page).
 *
 * Usage: node scripts/inline-page-sections.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LOCALES,
  parseLocaleFile,
  formatLocaleFile,
  readJson,
} from "./lib/content-format.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../src/data/content");

async function inlinePageDir(dir) {
  let changed = false;

  for (const locale of LOCALES) {
    const mdxPath = path.join(dir, `${locale}.mdx`);
    let source;
    try {
      source = await fs.readFile(mdxPath, "utf8");
    } catch {
      continue;
    }

    const { frontmatter, body } = parseLocaleFile(source);
    const sections = Array.isArray(frontmatter.sections)
      ? frontmatter.sections
      : [];
    let localeChanged = false;

    for (const section of sections) {
      if (section.kind !== "contentComponent") continue;
      if (
        typeof section.bodyMarkdown === "string" &&
        section.bodyMarkdown.trim()
      ) {
        delete section.mdx;
        continue;
      }

      const mdxRef = section.mdx;
      if (typeof mdxRef !== "string" || !mdxRef.trim()) continue;

      const sectionPath = path.join(dir, mdxRef);
      let sectionBody;
      try {
        sectionBody = (await fs.readFile(sectionPath, "utf8")).trim();
      } catch {
        console.warn(`Missing section file: ${sectionPath}`);
        continue;
      }

      section.bodyMarkdown = sectionBody;
      delete section.mdx;
      localeChanged = true;
    }

    if (localeChanged) {
      await fs.writeFile(
        mdxPath,
        formatLocaleFile(
          { slug: frontmatter.slug, seo: frontmatter.seo, sections },
          body,
        ),
        "utf8",
      );
      changed = true;
    }
  }

  const sectionsDir = path.join(dir, "sections");
  try {
    const entries = await fs.readdir(sectionsDir);
    if (entries.length === 0 || changed) {
      await fs.rm(sectionsDir, { recursive: true, force: true });
    }
  } catch {
    /* no sections dir */
  }

  return changed;
}

async function main() {
  const pageIndex = await readJson(path.join(CONTENT_DIR, "pages/_index.json"));
  let pageCount = 0;
  for (const entry of pageIndex) {
    if (await inlinePageDir(path.join(CONTENT_DIR, entry.dir))) pageCount++;
  }
  console.log(`Inlined sections for ${pageCount} pages`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
