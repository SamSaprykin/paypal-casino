import type { PageSection } from "../cms/sections";
import type { WebsiteLocaleKey } from "../cms/locales";
import { ROOT_WEBSITE_LOCALE } from "../cms/routing";
import { slugify } from "../utils";
import { resolveCopyPlaceholders } from "./copyPlaceholders";

export type WebsitePageTocItem = {
  level: 1 | 2;
  text: string;
  id: string;
};

/** Strip inline markdown so TOC text matches ContentComponent's plain heading text. */
function plainHeadingText(raw: string): string {
  return raw
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]+/g, "")
    .trim();
}

function pushUnique(
  items: WebsitePageTocItem[],
  seen: Set<string>,
  item: WebsitePageTocItem,
) {
  if (!item.id || seen.has(item.id)) return;
  seen.add(item.id);
  items.push(item);
}

/**
 * Collect TOC entries in document order:
 * - h1/h2 from contentComponent markdown (IDs match ContentComponent slugify)
 * - FAQ section title → fixed `faq-heading` id used by FaqList
 */
export function extractWebsitePageToc(
  sections: PageSection[],
  locale: WebsiteLocaleKey = ROOT_WEBSITE_LOCALE,
): WebsitePageTocItem[] {
  const items: WebsitePageTocItem[] = [];
  const seen = new Set<string>();

  for (const section of sections) {
    if (section.kind === "contentComponent" && section.bodyMarkdown) {
      let inFence = false;
      for (const line of section.bodyMarkdown.split("\n")) {
        const trimmed = line.trimStart();
        if (trimmed.startsWith("```")) {
          inFence = !inFence;
          continue;
        }
        if (inFence) continue;

        const match = /^(#{1,2})\s+(.+)$/.exec(line);
        if (!match) continue;

        const level = match[1].length as 1 | 2;
        const text = plainHeadingText(match[2]);
        if (!text) continue;

        pushUnique(items, seen, {
          level,
          text,
          id: slugify(text),
        });
      }
      continue;
    }

    if (section.kind === "faqComponent" && section.items.length > 0) {
      pushUnique(items, seen, {
        level: 2,
        text: section.title?.trim() || "FAQ",
        id: "faq-heading",
      });
      continue;
    }

    if (section.kind === "casinoList" && section.copyBefore?.trim()) {
      const resolved = resolveCopyPlaceholders(section.copyBefore, locale);
      const text = plainHeadingText(resolved ?? section.copyBefore);
      pushUnique(items, seen, {
        level: 2,
        text,
        id: section.anchorTitle?.trim() || slugify(text),
      });
    }
  }

  return items;
}
