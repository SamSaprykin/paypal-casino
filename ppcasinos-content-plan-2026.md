# PPCasinos.co — Content Plan 2026

> **Site:** ppcasinos.co · **Niche:** PayPal casino affiliate  
> **Source of truth:** local files under `src/data/content/` (MDX + `meta.json`) — **not** an external CMS  
> **Markets:** Ireland (root), Germany (`/de/`), Finland (`/fi/`), Norway (`/no/`), Sweden (`/se/`), Denmark (`/dk/`)

---

## Table of Contents

1. [How content actually works](#1-how-content-actually-works)
2. [Site audit (July 2026)](#2-site-audit-july-2026)
3. [Gaps vs opportunities](#3-gaps-vs-opportunities)
4. [Website page roadmap](#4-website-page-roadmap)
5. [Casino review coverage](#5-casino-review-coverage)
6. [Blog (greenfield)](#6-blog-greenfield)
7. [Country / locale priorities](#7-country--locale-priorities)
8. [Outdated assumptions (do not use)](#8-outdated-assumptions-do-not-use)

---

## 1. How content actually works

There is **no Sanity / Contentful / headless CMS**. Folders named `cms` in code (`src/lib/cms/`) are **legacy adapters** that read local files.

| Layer              | Path                                           | What it is                                                        |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------------- |
| Website pages      | `src/data/content/pages/<page>/`               | `meta.json` (lists, section IDs, authors) + `{locale}.mdx` (copy) |
| Page registry      | `src/data/content/pages/_index.json`           | IDs, dirs, per-locale URL slugs                                   |
| Casino reviews     | `src/data/content/casinos/<slug>/`             | `meta.json` + optional `{locale}.mdx`                             |
| Casino registry    | `src/data/content/casinos/_index.json`         | 93 brands                                                         |
| Market shortlists  | `src/data/content/market-casino-lists.json`    | Ordered slugs per locale for rankings                             |
| Blog               | `src/data/content/blog/_index.json`            | Currently `[]` — no posts                                         |
| Authors            | `src/lib/data/authors/`                        | Seamus / Stoyan; used by PageByline                               |
| Trust / legal copy | `src/lib/i18n/copies/`                         | Contact, privacy, terms, rating guidelines, sitemap               |
| Logos / avatars    | `public/casino-logos/`, `public/author-image/` | Static assets                                                     |

**URL pattern (not country-guide hubs):**

- Ireland = unprefixed root (`/`, `/paypal-casino-ireland/`, …)
- Other markets = `/de/…`, `/fi/…`, `/no/…`, `/se/…`, `/dk/…` + localized slug
- Casino detail = `/casino/{slug}/` (IE/DE/SE) or `/…/kasino/{slug}/` (DK/FI/NO)

Old `/ireland-guide/`, `/suomi-guide/`, `/germany-guide/`, `/casino-guide/` URLs are **redirects only** (`vercel.json`), not content trees.

---

## 2. Site audit (July 2026)

### What you have ✓

| Asset                         | Count / status                                                            |
| ----------------------------- | ------------------------------------------------------------------------- |
| Casino brands (`meta.json`)   | **93**                                                                    |
| Casino review MDX (by locale) | IE **66** · FI **54** · NO **38** · SE **20** · DK **17** · DE **12**     |
| Website page types            | **7** (home, PayPal, new, bonuses, blocked, fast payout, mobile)          |
| Locales per website page      | **6** registered in `_index.json`                                         |
| Fully written website MDX     | Home, PayPal, New, Bonuses, Blocked — **all 6 locales**                   |
| Stub website MDX              | Fast payout + Mobile — **IE full**; DE/DK/FI/NO/SE = English stubs        |
| Germany market                | **Live** — `/de/`, German home + PayPal + rankings, 12 DE casino reviews  |
| Blog posts                    | **0**                                                                     |
| Authors / E-E-A-T byline      | Seamus (added) + Stoyan (reviewed) on website pages                       |
| Trust pages                   | Rating guidelines, contact, privacy, terms, sitemap (Astro + i18n copies) |
| Classic games                 | Free games hub under `src/pages/classic-games/`                           |

**Strengths:**

- Six-market i18n is already shipping for core commercial pages (not English-only).
- Germany exists as a first-class locale with native DE copy on core pages.
- Large casino inventory (93) with Ireland-heavy review depth.
- Local file workflow: edit MDX → build; no CMS publish step.
- Ranking lists + blocked-casino silo + author byline/schema already in place.

---

## 3. Gaps vs opportunities

| Gap                                     | Why it matters                                          | File-level fix                                                |
| --------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| Blog is empty                           | No topical / comparison authority                       | Add posts under `src/data/content/blog/` + `_index.json`      |
| Fast payout & mobile stubs (×5 locales) | Thin / English pages on DE/FI/NO/SE/DK                  | Replace stubs using `prompts/*-page.md`                       |
| Germany casino MDX thin (12/93)         | DE rankings weak vs IE                                  | Add `germany.mdx` for DE list brands first                    |
| Uneven casino MDX (SE/DK low)           | Market pages link to thin reviews                       | Prioritize brands in `market-casino-lists.json`               |
| No comparison / payment silo pages yet  | High-intent queries (Skrill, Trustly, Revolut, crypto…) | New folders under `pages/` + `_index.json` entries            |
| Plan’s `/[country]-guide/` hub model    | Doesn’t match routing                                   | Ship **flat localized slugs** (same pattern as New / Bonuses) |
| Leftover “Bitcoin casino players” copy  | Blog UI scaffold still says Bitcoin                     | Fix `BlogNav.astro` when blog launches                        |
| Stale `manifest.json`                   | Says pages: 2, casinos: 55                              | Ignore or regenerate from current tree                        |

---

## 4. Website page roadmap

Ship **2–3 new page types per week**, each as:

`src/data/content/pages/<slug>/meta.json` + **6** `{locale}.mdx` + register in `pages/_index.json`  
Default authors: `seamus-oconnor` / `stoyan-makoski`.

### Already shipped

| Page            | Ireland                   | Germany                                                   |
| --------------- | ------------------------- | --------------------------------------------------------- |
| Home            | `/`                       | `/de/`                                                    |
| PayPal casinos  | `/paypal-casino-ireland/` | `/casinos-mit-paypal/`                                    |
| New casinos     | `/new-casinos/`           | `/neue-casinos/`                                          |
| Bonuses         | `/casino-bonuses/`        | `/casino-bonus/`                                          |
| Blocked casinos | `/blocked-casinos/`       | `/gesperrte-casinos/`                                     |
| Fast payout     | `/fast-payout-casinos/`   | `/casinos-mit-schneller-auszahlung/` _(stubs outside IE)_ |
| Mobile          | `/mobile-casinos/`        | `/handy-casinos/` _(stubs outside IE)_                    |

### Near-term slate (backlink / intent pages)

| Week    | New page types                                             | Notes                           |
| ------- | ---------------------------------------------------------- | ------------------------------- |
| **Now** | Localise Fast payout + Mobile (DE first, then FI/SE/NO/DK) | Finish stubs before adding more |
| **2**   | Minimum deposit · Live casino + PayPal                     | Complements PayPal silo         |
| **3**   | Trustly / bank transfer · Revolut                          | Strong for Nordics + DE banking |
| **4**   | Skrill / Neteller · Crypto deposits                        | Classic payment magnets         |
| **5**   | No-deposit / free spins hub · Wagering guide               | Offer-education (not blog)      |
| **6**   | Interlink + refresh week                                   | Measure which URLs earn links   |

Optional later (only if SEO needs a hub): regulations / responsible gambling as **standalone localized pages**, not `/ireland-guide/…` nests.

---

## 5. Casino review coverage

**Rule:** write `{locale}.mdx` first for brands that appear in that locale’s `market-casino-lists.json`.

| Locale  | List size (approx.) | Review MDX | Priority                                                                                                       |
| ------- | ------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| Ireland | ~42                 | 66         | Maintain / refresh                                                                                             |
| Finland | ~41                 | 54         | Fill gaps on list brands                                                                                       |
| Norway  | ~21                 | 38         | Maintain                                                                                                       |
| Sweden  | ~12                 | 20         | Grow with list                                                                                                 |
| Denmark | ~11                 | 17         | Grow with list                                                                                                 |
| Germany | ~8                  | **12**     | **Highest gap vs opportunity** — deepen DE reviews + expand DE list carefully (GGL / compliance angle in copy) |

Germany-specific copy notes (for DE MDX, not a separate guide tree): GGL, GlüStV, OASIS, €1/spin & 5s rules where relevant, Sofort/Giropay vs PayPal.

---

## 6. Blog (greenfield)

**Current:** `src/data/content/blog/_index.json` = `[]`. UI scaffolding exists; **no posts**.

Treat 2026 blog as a **new channel**, not “expand from 10 posts.”

**Suggested cadence (once process exists):** 4 posts/month in English first (Ireland), then selectively localise high performers to FI/SV/DE.

**Categories (when you start):** Comparisons · Payment methods · Bonuses · Game guides · Tips & strategies

**First 8 post ideas (file-based, IE English):**

1. PayPal vs Skrill for casino players
2. Fastest PayPal withdrawals 2026
3. PayPal deposit & withdrawal limits
4. PayPal vs Neteller
5. Low deposit PayPal casinos (from €5/€10)
6. Live dealer casinos with PayPal
7. PayPal casinos in Germany — player checklist (links to `/de/`)
8. Trustly vs PayPal (Nordics)

Do **not** block website-page shipping on blog. Commercial MDX pages remain the priority.

---

## 7. Country / locale priorities

| Locale     | Status                                | Next action                                                          |
| ---------- | ------------------------------------- | -------------------------------------------------------------------- |
| 🇮🇪 Ireland | Root market, deepest content          | Keep as English source for new page types                            |
| 🇩🇪 Germany | **Live** core pages + thin casino MDX | Localise Fast/Mobile stubs → deepen DE casino MDX → DE payment pages |
| 🇫🇮 Finland | Strong pages + many reviews           | Localise stubs; keep FI copy quality high                            |
| 🇸🇪 Sweden  | Core pages live; fewer reviews        | Localise stubs; grow SE casino MDX with list                         |
| 🇳🇴 Norway  | Core pages live                       | Localise stubs; careful compliance tone                              |
| 🇩🇰 Denmark | Core pages live; fewest reviews       | Localise stubs; grow DK reviews                                      |

**i18n reality:** already on for all six markets for core pages. Remaining work is **depth and stubs**, not “decide whether to add `/fi/`.”

---

## 8. Outdated assumptions (do not use)

Earlier drafts of this plan were wrong relative to `src/data`:

| Old claim                           | Reality                                              |
| ----------------------------------- | ---------------------------------------------------- |
| 10 blog posts                       | **0** posts                                          |
| ~30 casinos                         | **93** brands                                        |
| No localized content / English only | **6 locales** with native MDX on core pages          |
| Missing Germany                     | Germany **shipped** (`/de/`, DE slugs, DE home copy) |
| Country hubs like `/ireland-guide/` | **Redirects**; content is flat localized page types  |
| “Create New Casinos” as a quick win | **Already exists**                                   |
| External CMS publishing             | **Local MDX + meta.json only**                       |

---

### Target URL shape (aligned with repo)

```
ppcasinos.co/
├── /                              ← IE home
├── /paypal-casino-ireland/
├── /new-casinos/
├── /casino-bonuses/
├── /blocked-casinos/
├── /fast-payout-casinos/
├── /mobile-casinos/
├── /casino/{slug}/
├── /rating-guidelines/ …
│
├── /de/                           ← DE home
├── /de/casinos-mit-paypal/
├── /de/neue-casinos/
├── /de/casino-bonus/
├── … (+ same page types for /fi /no /se /dk)
│
└── /blog/                         ← empty today; add when ready
```

---

_Last updated: July 2026 · grounded in `src/data/content/` file tree_
