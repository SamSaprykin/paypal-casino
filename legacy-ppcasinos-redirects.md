# Legacy ppcasinos.co URL audit (May 2026)

Maps URLs from the **old** WordPress/Astro sitemap to the **new** locale-aware Astro + Sanity site.

Redirects are implemented in `vercel.json` (301).

## Country & home

| Old URL | New URL | Notes |
|--------|---------|--------|
| `/` | `/` | Ireland home (Sanity slug `/`) — **no redirect** |
| `/ireland-guide/` | `/` | Ireland hub becomes root |
| `/paypal-casinos/` | `/paypal-casino-ireland/` | Ireland PayPal listing (CMS) |
| `/denmark-guide/` | `/dk/` | Denmark home |
| `/suomi-guide/` | `/fi/` | Finland home |
| `/norway-guide/` | `/no/` | Norway home |
| `/sweden-guide/` | `/se/` | Sweden home |
| `/ie/…` | `/…` | Ireland has no `/ie/` prefix |

## Casino reviews

| Old URL | New URL |
|--------|---------|
| `/casino-guide/{slug}/` | `/casino/{slug}/` |
| `/casino-guide/` | `/paypal-casino-ireland/` | No `/casino/` hub page yet |

All 33 casino slugs from the old sitemap exist in Sanity with the same slug.

Localized casino URLs: `/dk/kasino/{slug}/`, `/fi/kasino/{slug}/`, etc. (no legacy paths to redirect).

## Unchanged (same path on new site)

- `/blog/` and all blog post URLs
- `/classic-games/` and game subpaths
- `/contact-us/`, `/privacy-policy/`, `/terms-and-conditions/`, `/sitemap/`

## Still needs pages (not redirects)

These URLs are in the old sitemap and footer but **have no route** in the new codebase yet:

- `/frequently-asked-questions/`
- `/rating-guidelines/`

Build static pages (like `contact-us.astro`) or add Sanity website pages before launch.

## Affiliate `/goto/*.php`

Unchanged — still in `vercel.json`.
