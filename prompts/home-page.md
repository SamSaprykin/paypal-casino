# Home Page — structure, research, then implement

Two-phase workflow. **Do not write full locale copy until Phase A is filled.** Ireland (`ireland.mdx`) is the structural gold copy. DE/DK/FI/NO/SE homes were accidentally filled with PayPal-page IDs, so `mergePageSections` dropped the body (IDs must match `meta.json`).

**Files**

| Locale  | MDX                                            | URL    |
| ------- | ---------------------------------------------- | ------ |
| ireland | `src/data/content/pages/home-page/ireland.mdx` | `/`    |
| germany | `src/data/content/pages/home-page/germany.mdx` | `/de/` |
| denmark | `src/data/content/pages/home-page/denmark.mdx` | `/dk/` |
| finland | `src/data/content/pages/home-page/finland.mdx` | `/fi/` |
| norway  | `src/data/content/pages/home-page/norway.mdx`  | `/no/` |
| sweden  | `src/data/content/pages/home-page/sweden.mdx`  | `/se/` |

Casino cards come from `home-page/meta.json` → `casinoListIntl.markets` → `casinoListsByCountry`. Never invent ranking order.

PayPal long-form lives in `src/data/content/pages/paypal-casino/` — **do not paste it onto Home**.

Research output: `prompts/research/home-<locale>.md` (start from `prompts/research/home-template.md`).

---

## Why merge drops copy

`src/lib/content/store.ts` `mergePageSections` joins **by section `id`**. Meta order wins. Locale YAML only applies when `id` matches.

Required IDs (meta order — this is the render order):

| #   | kind                 | id                                     | Role                                                               |
| --- | -------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| 1   | `contentComponent`   | `cc19c2f3-0994-47bd-b143-61f880188e97` | Into HP — **one H1** + short intro                                 |
| 2   | `image`              | `hp-img-hero`                          | Hero. `src` is in meta; locale MDX supplies `alt` / `caption`      |
| 3   | `casinoList`         | `casinoListIntl.markets`               | Cards from meta                                                    |
| 4   | `contentComponent`   | `e6695325-bdb3-4018-a6bd-fd0729b66642` | HP Body — guide, tables, callouts, page teasers, related-pages hub |
| 5   | `image`              | `hp-img-cashier`                       | Cashier screenshot                                                 |
| 6   | `howTo`              | `hp-howto`                             | First-deposit steps (native component, not the HTML `.how-to`)     |
| 7   | `methodAvailability` | `hp-methods`                           | Payment matrix — renders only when `rowsByCountry` is filled       |
| 8   | `image`              | `hp-img-payout`                        | Withdrawal proof screenshot                                        |
| 9   | `contentComponent`   | `hp-verdict`                           | Verdict + RG line + `references-list` + `content-freshness`        |
| 10  | `faqComponent`       | `81648ffc-2ace-40ad-9c81-8b4d896c9bb4` | 4–5 FAQs                                                           |

Image and matrix sections render **nothing** while their asset/rows are missing, so all ten slots can ship at once. Drop `home-page-hero.de.webp` (etc.) into `src/images/content/` and the image appears with no code change.

`hp-methods` YAML (in the locale MDX) sets the columns; `rowsByCountry` goes in `meta.json`:

```yaml
- kind: methodAvailability
  id: hp-methods
  title: Zahlungsmethoden bei den gelisteten Casinos
  footnote: In der Live-Kasse am angegebenen Datum geprüft.
  columns: [paypal, card, local, crypto]
  columnLabels:
    paypal: PayPal
    card: Visa / Mastercard
    local: Trustly / Sofort
    crypto: Krypto
```

Cell values: `yes` | `no` | `partial` | `unknown`. `verifiedAt` must be the date the cashier was actually opened.

YAML frontmatter only (no MDX body after closing `---`). Use `bodyMarkdown` on content sections (Ireland shape). Headings after H1 start at `##`.

---

## Phase A — research (human fills; AI does not invent)

Copy `prompts/research/home-template.md` → `prompts/research/home-<locale>.md`.

Collect:

1. **Angle** (see geo pack below).
2. **Regulator + help URLs** (primary sources).
3. **Payment mix** with deposit/withdraw/fees/bonus eligibility; mark `confirmed | operator-stated | unknown`.
4. **Casino list audit** vs `casinoListsByCountry` — no new ranking.
5. **Screenshots** listed in § Assets.
6. **Internal hrefs** from the table below.
7. **FAQ questions** that match the body.

Forbidden in research and later copy: licence numbers, fines, scandals, “we tested on DATE” unless you attach evidence, copying another geo’s table.

### Geo pack

| Locale  | Angle                                      | Help (verify URL)               |
| ------- | ------------------------------------------ | ------------------------------- |
| ireland | Payment methods hub                        | gamblingcare.ie / BeGambleAware |
| germany | GGL vs MGA; PayPal often off GGL           | BZgA 0800 1 372 700             |
| denmark | Spillemyndigheden / ROFUS                  | stopspillet.dk                  |
| finland | International MGA vs FI context            | peluuri.fi                      |
| norway  | Bank blocks; no legal advice               | Hjelpelinjen                    |
| sweden  | Spelinspektionen / Spelpaus; Swish/Trustly | stodlinjen.se                   |

### What each page is for (Home is the hub)

Home **introduces** the market and **points** to specialist pages. Do not paste those pages onto Home. One or two sentences + a link is enough. Match the header mega-menu.

**Header — Casino types**

| Page            | What it is                                                                          | Home should say (then link)                                        |
| --------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **New casinos** | Brands launched or newly listed recently — freshness, first bonuses, who they suit. | Where to look if you want a new operator, not a payment deep-dive. |
| **Fast payout** | Withdrawal speed: e-wallets vs cards vs crypto; KYC delays.                         | How cashout speed differs; full comparison lives here.             |
| **Mobile**      | Play on phone/tablet: browser vs app, cashier on small screens.                     | Mobile-first play; not a payment-methods article.                  |
| **Min deposit** | Low first deposits (€1 / €5 / €10 tiers) and which methods allow them.              | Small bankroll / test deposit; details on that page.               |

**Header — Payments**

| Page        | What it is                                                                                                                                                                | Home should say (then link)                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **PayPal**  | Full PayPal cashier guide: deposits, withdrawals, fees, bonus exclusions, which brands list PayPal.                                                                       | Home may mention PayPal in a comparison table — **all operator PayPal reviews stay on this page**. |
| **Revolut** | Revolut as **card / Revolut Pay**, not a PayPal-style wallet. Gambling MCC blocks, FX, withdrawals usually not “to Revolut”.                                              | Card-fintech path vs e-wallet; do not treat Revolut as PayPal.                                     |
| **Crypto**  | BTC / ETH / stablecoins: speed, volatility, irreversible errors, KYC still applies. **No Norway URL in `_index.json`.** Germany: crypto typically **not** on GGL casinos. | Privacy/speed trade-offs; risks stay on the crypto page.                                           |

**Header — Offers**

| Page        | What it is                                                                      | Home should say (then link)                     |
| ----------- | ------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Bonuses** | Welcome/reload terms, wagering, method exclusions (PayPal/e-wallets often out). | Bonus hunters go here; Home does not dump T&Cs. |

**Not in the header (still link from Home)**

| Page                  | What it is                                                                                         |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| **Rating guidelines** | How we score casinos (static page, exists for every locale). Builds EEAT; link once.               |
| **Home**              | This page: market overview, ranked list, payment **orientation**, then links into the silos above. |

> **Do not link blocked casinos.** `pages/blocked-casinos/` is not in `_index.json` and has no route, so `/gesperrte-casinos/`, `/blokerede-kasinoer/`, `/estettyt-kasinot/`, `/blokkerte-kasinoer/`, `/blockerade-casinon/` and `/blocked-casinos/` all 404. Either build the page or leave the links out.

Related-pages hub must include **every header item that exists for that locale** (skip crypto on NO). Add rating guidelines as well.

### Internal links (`_index.json`)

Prefix `/de/`, `/dk/`, `/fi/`, `/no/`, `/se/` on paths that are **not** already prefixed.

| Page        | ireland                     | germany                              | denmark                             | finland                           | norway                           | sweden                            |
| ----------- | --------------------------- | ------------------------------------ | ----------------------------------- | --------------------------------- | -------------------------------- | --------------------------------- |
| Home        | `/`                         | `/de/`                               | `/dk/`                              | `/fi/`                            | `/no/`                           | `/se/`                            |
| PayPal      | `/paypal-casino-ireland/`   | `/casinos-mit-paypal/`               | `/paypal-casino-danmark/`           | `/paypal-kasinot/`                | `/paypal-kasinoer-norge/`        | `/paypal-casinon-sverige/`        |
| New         | `/new-casinos/`             | `/neue-casinos/`                     | `/nye-kasinoer/`                    | `/uudet-kasinot/`                 | `/nye-kasinoer/`                 | `/nya-casinon/`                   |
| Bonuses     | `/casino-bonuses/`          | `/casino-bonus/`                     | `/casino-bonusser/`                 | `/kasinobonukset/`                | `/casino-bonuser/`               | `/casinobonusar/`                 |
| Fast payout | `/fast-payout-casinos/`     | `/casinos-mit-schneller-auszahlung/` | `/kasinoer-med-hurtig-udbetaling/`  | `/nopeat-kotiutukset-kasinot/`    | `/kasinoer-med-rask-utbetaling/` | `/casinon-med-snabb-utbetalning/` |
| Mobile      | `/mobile-casinos/`          | `/handy-casinos/`                    | `/mobil-kasinoer/`                  | `/mobiilikasinot/`                | `/mobilkasinoer/`                | `/mobilcasinon/`                  |
| Min deposit | `/minimum-deposit-casinos/` | `/de/casinos-mit-mindesteinzahlung/` | `/dk/kasinoer-med-lav-indbetaling/` | `/fi/pienen-talletuksen-kasinot/` | `/no/kasinoer-med-lav-innskudd/` | `/se/casinon-med-lag-insattning/` |
| Revolut     | `/revolut-casinos/`         | `/de/revolut-casinos/`               | `/dk/revolut-kasinoer/`             | `/fi/revolut-kasinot/`            | `/no/revolut-kasinoer/`          | `/se/revolut-casinon/`            |
| Crypto      | `/crypto-casinos/`          | `/de/krypto-casinos/`                | `/dk/krypto-casinoer/`              | `/fi/krypto-kasinot/`             | _(no NO slug in `_index`)_       | `/se/krypto-casinon/`             |
| Rating      | `/rating-guidelines/`       | `/de/rating-guidelines/`             | `/dk/rating-guidelines/`            | `/fi/rating-guidelines/`          | `/no/rating-guidelines/`         | `/se/rating-guidelines/`          |

`localizedHref()` always adds the locale prefix for non-IE, so the published href is `/de/casinos-mit-paypal/` even though the `_index.json` slug is stored unprefixed. **Write the prefixed form in body copy.**

Every HP Body must include a `.related-pages` hub with **at least** PayPal, new, bonuses, fast payout, mobile, min deposit, Revolut, and rating guidelines (plus crypto/blocked when the locale has a URL).

### Task message — research

```
Fill prompts/research/home-<locale>.md from prompts/research/home-template.md.
Do not write MDX. Do not invent speeds, fees, licences, or “we tested” claims.
Cite primary URLs. Mark unknown where unverified.
```

---

## Phase B — implement + QA research (after Phase A)

### System prompt

You are a senior iGaming editor for **PpCasinos.co**. Implement **one** Home locale from a filled `prompts/research/home-<locale>.md`. Native language. Direct, player-first, no hype, no guaranteed wins. YAML-only MDX.

### Research QA (fail the run if any hit)

- Fact in copy not in the research file (except obvious UI chrome / RG boilerplate).
- Evidence `unknown` presented as confirmed.
- Payment table copied from another geo.
- Casino order changed vs meta.
- PayPal page operator reviews duplicated.
- Broken or English-only internal links on a non-IE page.
- `className=` in HTML (must be `class=`).
- Nested custom block divs.
- More than one H1.

### Markup catalog (HTML inside `bodyMarkdown`)

Do **not** nest these wrappers. Markdown tables (GFM pipes) are allowed as-is.

**Existing:** `info-card`, `tip-box`, `warning-box`, `editor-note`, `criteria-grid` + `data-lucide`, `how-to` (`step-card` or `step-item`), `content-freshness` / `last-updated`, `payment-speed-chart` (empty div — chart is React), `pros-cons` (either `.pros`/`.cons` items **or** two `<ul>` after headings).

**Home / CMS extras:**

```html
<div class="check-list">
  <h2>Key Details</h2>
  <ul>
    <li>Minimum deposit: €10</li>
  </ul>
</div>

<div class="references-list">
  <h2>Reference list</h2>
  <ul>
    <li><a href="https://example.com">Source name — document</a></li>
  </ul>
</div>

<div class="info-yellow-box">
  <p>
    <strong>Editor's note:</strong> Confirm bonus terms on the operator site.
  </p>
</div>

<div id="slider-component">
  <div id="slider-item">
    <span id="name">Safety</span><span id="value">85</span>
  </div>
  <div id="slider-item">
    <span id="name">Bonus</span><span id="value">90</span>
  </div>
  <div id="slider-item">
    <span id="name">Games</span><span id="value">90</span>
  </div>
  <div id="slider-item">
    <span id="name">License</span><span id="value">80</span>
  </div>
  <div id="slider-item">
    <span id="name">T&amp;C</span><span id="value">85</span>
  </div>
  <div id="slider-item">
    <span id="name">Customer Service</span><span id="value">85</span>
  </div>
</div>

<div class="related-pages">
  <a href="/paypal-casino-ireland/">PayPal casinos</a>
  <a href="/new-casinos/">New casinos</a>
</div>
```

Slider names (English or local label): Safety, Bonus, Games, License, T&C, Customer Service (also Sicherheit, Spiele, Lizenz, Geschäftsbedingungen, Kundendienst). Values 0–100. Icons are Lucide, not PNGs.

Full parser notes: `src/components/Pages/Content/components-mdx.md`.

### Assets to source (not implemented until files exist)

**SVGs** → `src/assets/svg/` or `src/components/Icons/` (brand marks only if licensed; otherwise Lucide):

- Payments: PayPal, Trustly, Revolut, Visa, Mastercard, Skrill, Neteller, Bitcoin, USDT, Swish, MobilePay, BankID.
- Trust: licence/shield, KYC, 18+, responsible gambling.
- Hub: fast payout, mobile, bonus, new casino (`payPalIcon`, `cryptoIcon`, `fastIcon`, `mobileIcon`, `bonusIcon`, `newIcon`, `revolutIcon` already exist).

**Screenshots** → `src/images/content/` (`home-hero.{locale}.webp`, `home-cashier-paypal`, `home-cashier-local`, `home-withdraw-status`, `home-bonus-tnc`, `home-licence-footer`, `home-kyc`, `home-rg-tools`). Prefer real cashier/licence shots. Uncomment `kind: image` in MDX only when the file exists.

### Task message — implement

```
Implement Home Page for locale: <locale> using prompts/research/home-<locale>.md.
Follow prompts/home-page.md Phase B.
Overwrite only src/data/content/pages/home-page/<locale>.mdx
Keep IDs: cc19c2f3-0994-47bd-b143-61f880188e97, casinoListIntl.markets,
e6695325-bdb3-4018-a6bd-fd0729b66642, 81648ffc-2ace-40ad-9c81-8b4d896c9bb4.
Do not change meta.json casino lists.
QA the research file first; reject unsourced claims.
Tease each header page in one or two sentences (see “What each page is for”) then link — do not copy PayPal/Revolut/bonus articles onto Home.
Include a related-pages hub covering every header item for that locale.
Return the full MDX only.
```

One locale per generation.

---

## Appendix — old enhancement QA (Ireland refresh)

Spell-check, English bleed, `class` not `className`, no `/denmark-guide/` URLs, `seoTitle` ≤65 / `seoDescription` 140–160, last-updated line, RG once. Do not use this appendix to rewrite non-IE stubs until Phase A exists.
