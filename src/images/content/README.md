# Content page images

Drop optimized images here (`.webp` preferred, also `.jpg/.png/.avif/.gif`).
They are rendered through `src/components/CustomImage.astro` and referenced by
**base file name** from page `image` sections (e.g. `new-casinos-hero.webp`).

## Locale-specific files (recommended for SEO)

Prefer a unique file per market:

| Market  | Suffix | Example                    |
| ------- | ------ | -------------------------- |
| Ireland | `ie`   | `new-casinos-hero.ie.webp` |
| Germany | `de`   | `new-casinos-hero.de.webp` |
| Denmark | `dk`   | `new-casinos-hero.dk.webp` |
| Finland | `fi`   | `new-casinos-hero.fi.webp` |
| Norway  | `no`   | `new-casinos-hero.no.webp` |
| Sweden  | `se`   | `new-casinos-hero.se.webp` |

Lookup order: locale file → shared `{name}.webp` → render nothing if both missing.
See root `customImages.md` for the full checklist.

Recommended size: ~1600×900 (16:9), under ~250 KB each. Alt/caption text is
localized in each page’s `<locale>.mdx`.
