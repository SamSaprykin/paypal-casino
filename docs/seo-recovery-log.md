# SEO recovery log

Algorithmic recovery only — no manual action / reconsideration path. Date changes here, then wait for the next confirmed Google spam or core update.

| Date | Change |
|---|---|
| 2026-08 (approx.) | 410’d programmatic hubs: new casinos, bonuses, fast payout, mobile, min deposit, Revolut, classic games, blocked-casinos, Tetris. Thin casino review MDX removed (`scripts/remove-thin-casino-reviews.mjs`). Header nav cut to Home + PayPal + Crypto. |
| 2026-09-04 | Confirmed repo has **no** IP / user-agent / Googlebot content swapping. Site is static Astro; markets are distinct URLs (`/`, `/se/`, `/de/`, …). Blocked-casino gate is client-side JS (same HTML for bots and users). |
| 2026-09-04 | Added `hreflang` + `x-default` on locale hubs, casino reviews, and English-only utility pages. |
| 2026-09-04 | `/blog/` and `/blog/*` changed from 301→homepage to **410**. Sitemap HTML no longer links to `/blog/`. |
| 2026-09-04 | `robots.txt`: stopped Disallowing 410 URLs (so Googlebot can recrawl and see Gone). Disallow `/intl-demo` and `/goto/`. |
| 2026-09-04 | Casino review `noindex` aligned to **&lt; 400 words** (same bar as the thin-review purge). Remaining 35 reviews are all above that. |
| 2026-09-04 | Added `node scripts/compare-crawler-html.mjs` for browser vs Googlebot-UA diffs. |
| 2026-09-04 | 410’d Klirr and Pop review URLs (`/se/casino/klirr-casino/`, `/se/casino/pop-casino/`). Sweden toplist cards remain (affiliate only, no review link). |

## Kept (not 410’d)

Indexable on purpose — locale-specific copy, not leftover “best casino in X” templates:

- Home: `/`, `/se/`, `/de/`, `/dk/`, `/fi/`, `/no/`
- PayPal hubs (6 locales)
- Crypto hubs (5 locales; no Norway)
- 33 casino review URLs with ≥400 words (Klirr and Pop reviews removed)
- English-only: contact, privacy, terms, rating guidelines, HTML sitemap

Orphan MDX still in `src/data/content/pages/` for 410’d hubs is **not** in `_index.json`, so it is not built. `vercel.json` still returns 410 for those old URLs.

## Still to do (not in this repo)

1. Search Console → URL Inspection → **Live Test** on 10–15 key URLs. Save rendered HTML / screenshot.
2. Fetch the same URLs from a few real geo-IPs (VPN). Compare redirects, canonical, robots, body.
3. Export Ahrefs referring domains → flag PBN / paid / exchange links → conservative Search Console disavow.
4. After the next confirmed Google update, note ranking/index movement against the dates above.
