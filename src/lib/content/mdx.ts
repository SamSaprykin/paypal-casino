import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_ROOT = path.join(process.cwd(), "src/data/content");

function stripFrontmatter(source: string): string {
  if (!source.startsWith("---")) return source.trim();
  const end = source.indexOf("\n---", 3);
  if (end === -1) return source.trim();
  return source
    .slice(end + 4)
    .replace(/^\n/, "")
    .trim();
}

/** Read markdown/MDX body from `src/data/content/{relativePath}`. */
export async function readContentBody(relativePath: string): Promise<string> {
  const normalized = relativePath.replace(/^\/+/, "").replace(/\\/g, "/");
  const filePath = path.join(CONTENT_ROOT, normalized);
  const source = await fs.readFile(filePath, "utf8");
  return stripFrontmatter(source);
}

/** True when the file uses MDX component imports (safe for Astro MDX compile). */
export function isComponentMdx(source: string): boolean {
  const body = stripFrontmatter(source);
  return /^import\s+/m.test(body);
}
