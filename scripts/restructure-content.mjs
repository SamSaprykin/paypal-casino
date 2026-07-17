/**
 * Converts legacy casino.json/page.json + scattered .md refs
 * into meta.json + {locale}.md per entity.
 *
 * Usage: node scripts/restructure-content.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LOCALES,
  readJson,
  writeCasinoBundle,
  writePageBundle,
  writeJson,
} from "./lib/content-format.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "src/data/content");

function isFileRef(value) {
  return value && typeof value === "object" && typeof value._file === "string";
}

function isIntlFileRefObject(obj) {
  return (
    obj && typeof obj === "object" && LOCALES.some((l) => isFileRef(obj[l]))
  );
}

async function resolveFileRefs(value, baseDir) {
  if (value == null) return value;
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => resolveFileRefs(item, baseDir)));
  }
  if (typeof value !== "object") return value;

  if (isIntlFileRefObject(value)) {
    const resolved = {};
    for (const locale of LOCALES) {
      const ref = value[locale];
      if (isFileRef(ref)) {
        try {
          resolved[locale] = await fs.readFile(
            path.join(baseDir, ref._file),
            "utf8",
          );
        } catch {
          resolved[locale] = "";
        }
      } else {
        resolved[locale] = ref ?? "";
      }
    }
    return resolved;
  }

  const out = {};
  for (const [key, child] of Object.entries(value)) {
    out[key] = await resolveFileRefs(child, baseDir);
  }
  return out;
}

async function loadLegacyDoc(dir, jsonName) {
  const jsonPath = path.join(dir, jsonName);
  try {
    const raw = await readJson(jsonPath);
    return resolveFileRefs(raw, dir);
  } catch {
    return null;
  }
}

async function isNewFormat(dir) {
  try {
    await fs.access(path.join(dir, "meta.json"));
    return true;
  } catch {
    return false;
  }
}

async function restructureCasinos() {
  const indexPath = path.join(CONTENT_DIR, "casinos/_index.json");
  const index = await readJson(indexPath);
  let count = 0;

  for (const entry of index) {
    const dir = path.join(CONTENT_DIR, entry.dir);
    if (await isNewFormat(dir)) {
      count++;
      continue;
    }

    const doc = await loadLegacyDoc(dir, "casino.json");
    if (!doc) continue;

    const files = await fs.readdir(dir);
    for (const file of files) {
      if (file === "meta.json" || LOCALES.some((l) => file === `${l}.md`)) {
        continue;
      }
      await fs.rm(path.join(dir, file), { force: true });
    }

    await writeCasinoBundle(dir, doc);
    count++;
  }

  return count;
}

async function restructurePages() {
  const indexPath = path.join(CONTENT_DIR, "pages/_index.json");
  const index = await readJson(indexPath);
  const updatedIndex = [];

  for (const entry of index) {
    const dir = path.join(CONTENT_DIR, entry.dir);
    if (await isNewFormat(dir)) {
      updatedIndex.push(entry);
      continue;
    }

    const doc = await loadLegacyDoc(dir, "page.json");
    if (!doc) continue;

    const files = await fs.readdir(dir);
    for (const file of files) {
      if (file === "meta.json" || LOCALES.some((l) => file === `${l}.md`)) {
        continue;
      }
      await fs.rm(path.join(dir, file), { force: true });
    }

    await writePageBundle(dir, doc);

    const slugs = {};
    for (const locale of LOCALES) {
      try {
        const md = await fs.readFile(path.join(dir, `${locale}.md`), "utf8");
        const slugMatch = md.match(/^slug:\s*(.+)$/m);
        if (slugMatch) {
          slugs[locale] = slugMatch[1].replace(/^["']|["']$/g, "").trim();
        }
      } catch {
        /* locale file may not exist */
      }
    }

    updatedIndex.push({ ...entry, slugs: { ...entry.slugs, ...slugs } });
  }

  await writeJson(indexPath, updatedIndex);
  return updatedIndex.length;
}

async function main() {
  console.log("Restructuring content to meta.json + {locale}.md…");
  const casinos = await restructureCasinos();
  const pages = await restructurePages();
  console.log(`Done: ${casinos} casinos, ${pages} pages`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
