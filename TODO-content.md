# Content TODO — home pages + crypto silo

Written 2026-08-24. Everything here is either a research task only you can do, a screenshot
only you can take, or a code fix I flagged but did not make.

---

## 0. Read this first: the home pages were 404ing

The reason the non-Ireland home pages "had almost no content" is worse than thin content —
**four of the five did not exist at all.** `dist/de/`, `dist/dk/`, `dist/fi/`, `dist/no/`
and `dist/se/` had no `index.html`.

The cause is a silent failure in the content loader. `readLocaleFileByStem()` wrapped both
the file read _and_ the YAML parse in one `try/catch`. A file with a YAML syntax error was
therefore indistinguishable from a missing file, so the locale was treated as "not
translated", `assemblePageDoc()` returned `null`, and the route threw during build — while
`astro build` still exited 0.

Two things changed:

- The loader now only swallows "file not found". A malformed frontmatter file throws
  `Invalid frontmatter in <path>: <reason>` and fails the build loudly.
- All five locale home pages are written and building. Verified: `dist/{de,dk,fi,no,se}/index.html`
  now exist at 350–363 KB each, with the check-list, criteria grid, related-pages hub,
  FAQ and freshness blocks all rendering.

**The YAML trap that caused it:** a plain (unquoted) YAML scalar cannot contain `": "`.
This breaks silently:

```yaml
answer: Open the cashier: only there will you see which method is active.
```

Either reword to avoid the colon, or wrap the value in double quotes. Worth remembering
every time you edit an `answer:`, `title:` or `caption:` value.

I re-validated all 88 content MDX files after the fix — zero frontmatter errors.

---

## 1. Home pages — what exists now

`src/data/content/pages/home-page/{ireland,germany,denmark,finland,norway,sweden}.mdx`

All six use the same section IDs from `home-page/meta.json`. Each non-Ireland page has a
market-specific angle rather than a translation of Ireland:

| Locale  | Angle the page is built on                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Germany | GGL licence versus MGA/Curaçao: 1 € per spin, no autoplay, 1 000 €/month, OASIS — versus none of it     |
| Denmark | Spillemyndigheden versus offshore, and that ROFUS only covers Danish licences                           |
| Finland | The licence reform timeline, and that Trustly/Zimpler/Brite beat PayPal locally                         |
| Norway  | The monopoly, declined bank cards, and that Norsk Tipping self-exclusion doesn't reach offshore         |
| Sweden  | Swedish licence versus offshore, and that the one-bonus-per-player rule explains missing welcome offers |

Research notes are embedded as English `# RESEARCH (...)` YAML comments directly above the
section they affect, and image briefs as `# IMAGE (...)` comments above each image slot. You
do not need to hunt for them — open the file and they are inline.

Every internal link on all six home pages resolves. The link checker reports 38 broken links
site-wide and **none of them are on a home page**.

---

## 2. Research you must do before these pages are safe to leave up

Ordered by risk. The first three are claims that could be wrong today.

### 2.1 Finland — is the reform actually enacted? (highest risk)

The Finnish home page and the Finnish crypto page both state that the new gambling act
applies mainly from 1 January 2027 with some provisions from 1 January 2026, and that
supervision moves to a new authority. Our own PayPal page already flags that **whether the
bill was finally approved as of August 2026 is an open question.**

Verify on the parliament's own site. If it is still open, one hedging sentence is enough —
but it has to be there.

### 2.2 Norway — the card-blocking mechanism

No research round has cited the actual statute and supervisory practice behind Norwegian
banks declining gambling payments. The home page therefore describes it as it works in
practice and explicitly says it is not legal advice. **Do not upgrade that wording to a
legal claim until you have read the primary sources.** If you get them, cite them precisely.

### 2.3 Tax, in three markets

None of these has been verified from the tax authority directly in any research round:

- **Sweden** — the claim that winnings on a Swedish or EU/EEA licence are tax-free and
  winnings from outside the EEA are taxable.
- **Norway** — that foreign winnings should be declared while Norsk Tipping and Rikstoto
  winnings are tax-free.
- **Germany** — currently the German crypto page says nothing about tax at all, which is a
  gap rather than an error. Two separate questions: the coin disposal and the winnings.

Finland's home page deliberately contains no tax claims for this reason. Keep it that way
until verified.

### 2.4 Germany — GGL player protection values

Confirm for 2026: 1 € per spin, no autoplay, 1 000 € monthly deposit limit across
operators. If any changed, the licence comparison table needs updating.

### 2.5 Denmark — check for duplication before adding anything

`DenmarkMarketNotice.astro` renders automatically on every `/dk/` page and already covers
the EU/EØS versus Curaçao tax split, ROFUS and AML. The Danish home page keeps its tax
copy deliberately short for that reason. Read the rendered page before adding more.

### 2.6 Phone numbers to normalise

- **BZgA** is written three ways across the site: `0800 1 37 27 00`, `0800 1372700`,
  `0800 1 372 700`. Pick one.
- **StopSpillet** is written two ways: `70 222 825` and `70 22 28 25`. Pick one.

### 2.7 Four payment-figure conflicts between our own pages

Each of these is a number we publish twice, differently. One of each pair is wrong.

| Method                  | Page A                              | Page B                        |
| ----------------------- | ----------------------------------- | ----------------------------- |
| PayPal, Finland         | fast payout page: 1–12 h            | shared speed chart: 12–48 t   |
| Skrill/Neteller, Norway | PayPal page: 24–48 timer            | fast payout page: 1–6 t       |
| Swish, Sweden           | shared speed chart: under 1 tim     | fast payout page: 1–24 timmar |
| PayPal, Sweden          | minimum 100–150 kr — never verified | —                             |

The shared chart lives in `src/lib/i18n/copies/payment-speed-chart.ts`.

---

## 3. Screenshots to take

Naming convention is in `src/images/content/README.md`: `{base}.{suffix}.webp`, suffixes
`ie`, `de`, `dk`, `fi`, `no`, `se`. Roughly 1600×900, under ~250 KB. **Image sections render
nothing until the file exists**, so all slots are already wired and nothing is broken while
you shoot them.

Blur account numbers, names, balances and wallet addresses in every shot.

### Home pages — 3 per locale, 18 total

| File                                              | What to capture                                                                                                                                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `home-page-hero.{ie,de,dk,fi,no,se}.webp`         | Payment collage in the local language with local currency cues. `home-page-hero.se.webp` already exists — rename to `.se` suffix pattern if you want consistency. |
| `home-page-cashier.{ie,de,dk,fi,no,se}.webp`      | A real cashier at a casino open to that market, local UI, showing which methods are actually listed                                                               |
| `home-page-payout-proof.{ie,de,dk,fi,no,se}.webp` | Withdrawal history with visible timestamps                                                                                                                        |

The payout-proof shot is the highest-value image on the site. It is the one thing a
competitor cannot copy, and it is what "we actually tested this" looks like.

Two locale-specific upgrades worth doing:

- **Norway:** a declined Norwegian card payment next to a successful e-wallet payment. This
  is the most useful single screenshot available for that market.
- **Sweden:** two cashiers side by side — a Swedish-licensed site with Swish and no PayPal,
  and an offshore site with the reverse. It proves the licence split visually.

### Crypto silo — 3 per locale, 18 total

| File                                        | What to capture                                                                         |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `crypto-casinos-network-fee.{locale}.webp`  | Wallet send screen with the network fee visible — USDT on TRC-20 next to USDT on ERC-20 |
| `crypto-casinos-cashier.{locale}.webp`      | Casino crypto deposit screen with generated address, QR and minimum                     |
| `crypto-casinos-payout-proof.{locale}.webp` | Completed crypto withdrawal with timestamps                                             |
| `crypto-casinos-declined-card.no.webp`      | Norway only: declined card next to successful crypto deposit                            |

---

## 4. Code fixes I flagged but did not make

### 4.1 The payment speed chart shows Swish to every locale

`src/lib/i18n/copies/payment-speed-chart.ts` gives all six locales the same six method rows,
including `swish`. Swish is a Swedish rail. Ireland, Germany, Finland and Norway currently
render an irrelevant row wherever that chart appears — including the crypto pages.

This is a genuine locale-relevance defect and it is visible to a reader. Fix by filtering
the method list per locale. I avoided the chart on the German, Danish, Finnish and Norwegian
home pages and used a hand-written table instead, so the new pages are unaffected — but the
existing pages are not.

### 4.2 The payment availability matrix is wired but empty

`meta.json` for the home page has a `methodAvailability` slot (`hp-methods`) and the
component now accepts custom `columnLabels`. Each locale MDX has the block commented out
with the right columns for that market.

To activate: add `rowsByCountry.{locale}` to `home-page/meta.json` with one row per casino
slug in that locale's list, then uncomment the block. This requires opening each cashier and
recording what is actually there, with the date. It is the highest-value unique asset
available on the home pages, because nobody can copy it.

### 4.3 38 broken internal links, in four clusters

Run `npm run content:check-links` (requires a build first). None are on home pages.

| Cluster                                    | Count | Fix                                                                                                                                                                                                        |
| ------------------------------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blocked-casinos` in all 6 locales         | 11    | The page does not exist in any locale. Either build it or replace the links with `rating-guidelines`.                                                                                                      |
| `minimum-deposit-casinos/*` wrong slugs    | ~18   | This one file per locale uses slugs that don't match `_index.json` — e.g. `/de/boni/` instead of `/de/casino-bonus/`, `/se/snabba-uttag/` instead of `/se/casinon-med-snabb-utbetalning/`. Mechanical fix. |
| `/gambling-regulation-ireland/`            | 1     | Page was never built. Replace or drop.                                                                                                                                                                     |
| Assorted localised rating-guidelines slugs | ~8    | e.g. `/dk/bedømmelsesretningslinjer/` — the real slug is `/dk/rating-guidelines/` in every locale.                                                                                                         |

---

## 5. Crypto silo audit

Six files in `audits/crypto-casinos/` — one per locale plus a README with the five
cross-cutting findings. Short version:

- **Norway has no crypto page at all**, in the one market where crypto is the answer to a
  real problem. `audits/crypto-casinos/norway.md` is a build brief, not an audit.
- **Ireland, Germany, Finland and Sweden are the same page four times** — identical H2
  sequence, identical tables, identical wallet list. Denmark is the only one that was
  written rather than translated, and it is the model to follow.
- **No page in the silo has a single image.** Zero.
- **`cc-voices` renders only on Ireland**, so four locales have no player quotes.
- **`cc-list` has an empty `casinoSlugs` array everywhere**, so no locale's list is actually
  crypto-filtered.
- No cross-locale contamination was found. I checked every page for foreign regulator names,
  helplines, currencies and country adjectives — the Finnish page does not discuss Ireland,
  and so on. The locale-relevance problem in this silo is templated structure, not leaked
  content.

Each locale file has its own findings with line numbers, a prioritised image list, the
tables to add, and the research needed.

---

## 6. Suggested order

1. Fix the 38 broken links (mechanical, half an hour, immediate SEO value).
2. Filter Swish out of the non-Swedish payment speed charts (small code change, visible).
3. Verify the Finland reform status and the Norway card-blocking wording — the two claims
   most likely to be wrong right now.
4. Shoot the six payout-proof screenshots. Highest E-E-A-T return per hour of work.
5. Build the Norwegian crypto page from `audits/crypto-casinos/norway.md`.
6. Populate `methodAvailability` for one locale as a pilot — Sweden is the best candidate,
   because the licence split shows up directly in the cashier.
7. Work through the remaining crypto audits, Denmark last (it is already the strongest).
