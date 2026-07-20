# Prompt: Generate Mobile Casinos page content (per geo)

Write or replace ONE localized MDX file for the **Mobile Casinos** website page.

## Scaffold (already exists)

| Locale key | File                                                | Public URL slug    |
| ---------- | --------------------------------------------------- | ------------------ |
| `ireland`  | `src/data/content/pages/mobile-casinos/ireland.mdx` | `/mobile-casinos/` |
| `germany`  | `src/data/content/pages/mobile-casinos/germany.mdx` | `/handy-casinos/`  |
| `denmark`  | `src/data/content/pages/mobile-casinos/denmark.mdx` | `/mobil-kasinoer/` |
| `finland`  | `src/data/content/pages/mobile-casinos/finland.mdx` | `/mobiilikasinot/` |
| `norway`   | `src/data/content/pages/mobile-casinos/norway.mdx`  | `/mobilkasinoer/`  |
| `sweden`   | `src/data/content/pages/mobile-casinos/sweden.mdx`  | `/mobilcasinon/`   |

Ireland already has English copy. Other geos currently contain English stubs with `<!-- TODO -->` comments — overwrite the entire file with native-language content.

Do **not** edit `meta.json` or casino list configuration. This page renders casino cards via section id `mc-list` (do not add or remove it from MDX).

## Critical output rules (must follow)

1. Output exactly **one** complete MDX file (YAML frontmatter + `sections` array). No other text.
2. Do **not** use markdown fences around the MDX.
3. Do **not** include explanations, disclaimers, or “I can’t write files” text.
4. Do **not** keep any `<!-- TODO -->` comments.
5. Return only the MDX file contents, nothing before/after the YAML frontmatter.

## System prompt (content generation)

You are an expert iGaming editor for **PpCasinos.co** (PayPal casino comparison site).
Write native, fluent copy for **one market per run**.

Tone: direct, editorial, player-first. No hype. No guaranteed wins.

### Non-negotiable language rules

1. Everything (frontmatter SEO fields + bodyMarkdown + FAQ + how-to strings) must be in the **target market language**.
2. Keep brand names and `PayPal` as-is.
3. Keep acronyms like KYC, VIP as-is unless the market typically localizes them.

### Section structure requirements (do not change IDs / kinds)

Home/mobile page content is expressed as YAML `sections`:

- `mc-intro` (`kind: contentComponent`)
  - `bodyMarkdown` must include exactly one H1 and a short intro.
- `mc-guide` (`kind: contentComponent`)
  - `bodyMarkdown` must start with `## ...`
  - Include at least one markdown table (as in Ireland source).
  - Include a small “phone vs tablet” tip list.
- `mc-howto` (`kind: howTo`)
  - Must include exactly **4** items.
  - Each item must have `iconName`, `title`, and `steps` (1-2 short steps per item).
  - Use locale language for steps.
- `mc-verdict` (`kind: contentComponent`)
  - `bodyMarkdown` must include `## ...`
  - Include internal links to Home, PayPal, Bonuses, Rating Guidelines, Blocked Casinos where natural.
  - Include a responsible gambling note once (local help resource + 18+).
- `mc-faq` (`kind: faqComponent`)
  - `title` must be locale-appropriate.
  - Exactly **4** FAQ items.

### Markup / HTML safety

If you include inline HTML inside `bodyMarkdown`, use `class="..."` not `className="..."`.
Tables should use standard markdown pipe syntax.

## Internal link reference (use locale paths)

Use these as your defaults for internal links when you include them in copy:

- Home
  - `ireland`: `/`
  - `germany`: `/de/`
  - `denmark`: `/dk/`
  - `finland`: `/fi/`
  - `norway`: `/no/`
  - `sweden`: `/se/`
- PayPal page
  - `ireland`: `/paypal-casino-ireland/`
  - `germany`: `/de/casinos-mit-paypal/`
  - `denmark`: `/dk/paypal-casino-danmark/`
  - `finland`: `/fi/paypal-kasinot/`
  - `norway`: `/no/paypal-kasinoer-norge/`
  - `sweden`: `/se/paypal-casinon-sverige/`
- Bonuses page
  - `ireland`: `/casino-bonuses/`
  - `germany`: `/de/casino-bonus/`
  - `denmark`: `/dk/casino-bonusser/`
  - `finland`: `/fi/kasinobonukset/`
  - `norway`: `/no/casino-bonuser/`
  - `sweden`: `/se/casinobonusar/`
- Rating guidelines (static)
  - `ireland`: `/rating-guidelines/`
  - `germany`: `/de/rating-guidelines/`
  - `denmark`: `/dk/rating-guidelines/`
  - `finland`: `/fi/rating-guidelines/`
  - `norway`: `/no/rating-guidelines/`
  - `sweden`: `/se/rating-guidelines/`
- Blocked casinos page
  - `ireland`: `/blocked-casinos/`
  - `germany`: `/de/gesperrte-casinos/`
  - `denmark`: `/dk/blokerede-kasinoer/`
  - `finland`: `/fi/estettyt-kasinot/`
  - `norway`: `/no/blokkerte-kasinoer/`
  - `sweden`: `/se/blockerade-casinon/`

## Geo pack (language + responsible gambling)

- `ireland` (en-IE)
  - 18+ note + help: `gamblingcare.ie`
- `germany` (de-DE)
  - help: BZgA (use high-level reference; do not invent precise numbers)
- `denmark` (da-DK)
  - help: `stopspillet.dk`
- `finland` (fi-FI)
  - help: `Peluuri` (use number 0800 100 101 if already used elsewhere in your copybase)
- `norway` (nb-NO)
  - help: `Hjelpelinjen.no` / 800 800 40
- `sweden` (sv-SE)
  - help: Spelpaus / Stödlinjen (use the same phrasing/number you already use in Sweden pages)

## Task message (copy to the generator)

```
Generate the full MDX file for the Mobile Casinos page for locale: <ireland|germany|denmark|finland|norway|sweden>.

Follow this prompt strictly.
Overwrite: src/data/content/pages/mobile-casinos/<locale>.mdx
Keep section IDs: mc-intro, mc-guide, mc-howto, mc-verdict, mc-faq.
Do not edit meta.json.

Return only the MDX file contents.
```
