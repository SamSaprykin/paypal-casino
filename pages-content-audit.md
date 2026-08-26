# Website Pages Content Audit (2026-08-09)

Scope: `src/data/content/pages/` — the 10 evergreen guide pages (Home, PayPal Casino, New Casinos, Casino Bonuses, Blocked Casinos, Fast Payout Casinos, Mobile Casinos, Minimum Deposit Casinos, Revolut Casinos, Crypto Casinos), each in up to 6 locales (Ireland/en, Denmark/da, Finland/fi, Germany/de, Norway/nb, Sweden/sv) — **70 files** in total (10 `meta.json` + 60 `*.mdx`).

Method: parsed every `meta.json`/`.mdx` (frontmatter + body), diffed sections/word-counts/FAQ counts across locales, ran an automated English spellcheck (with a domain allow-list for brands/fintech jargon) against the six `ireland.mdx` files, grepped for placeholder/draft markers, checked every image asset referenced in content against `src/images/content/`, and verified every responsible‑gambling helpline number/link quoted in the content against the operator's own website. This is a companion to `content-locale-audit.md` (which covered `data/content/casinos/`).

---

## 0. TL;DR — fix these first

1. ~~**A literal AI-drafting note and bracketed placeholders are live on the PayPal Casino Ireland page.**~~ **FIXED (2026-08-09).** Both leftover editorial notes were removed from `paypal-casino/ireland.mdx`, and the `*[...to be confirmed]*` placeholders were replaced with four real, cross-checked recommendations (Need for Spin Casino, PlayOJO, The Online Casino, Vegas Mobile Casino) sourced from `casinos-final-with-confirmed-bonuses.json`, filtered to casinos confirmed to (a) support Ireland, (b) accept PayPal, and (c) already appear in this page's own Ireland casino list. → §1.1
2. ~~**Norway's problem-gambling helpline number is wrong in two files.**~~ **FIXED (2026-08-09).** `new-casinos/norway.mdx`, `casino-bonuses/norway.mdx` (was 915 00 800), and `minimum-deposit-casinos/norway.mdx` (was 800 800 099) now all correctly print **800 800 40**, matching Hjelpelinjen's own site and the other six Norwegian pages. → §1.2
3. **`crypto-casinos/norway.mdx` doesn't exist.** The page 404s (or silently falls back to English) for Norwegian visitors even though `_index.json`/`meta.json` don't list a Norway slug for Crypto Casinos at all — it's simply missing from the product, not just untranslated. → §1.3
4. **Almost every hero/section image referenced in the content is missing from the repo.** ~20 distinct `.webp` filenames are referenced across Home, PayPal Casino, New Casinos, Casino Bonuses, Blocked Casinos, Fast Payout, and Mobile Casinos pages, but none of the files exist in `src/images/content/`. These pages currently render as 100% text. → §2

---

## 1. Critical content bugs (fix before anything else)

### 1.1 ✅ FIXED — Unedited draft copy shipped live — `pages/paypal-casino/ireland.mdx`

**Status: resolved on 2026-08-09.** The page previously had two AI-authoring notes addressed to a human editor (not reader-facing copy) plus three bracketed `[...to be confirmed]` placeholders standing in for actual casino recommendations:

```43:43:src/data/content/pages/paypal-casino/ireland.mdx
      *Editorial note: This draft references a number of specific casino brands (e.g. Tonybet, Spinbetter, Skycrown, Evospin, Starda, Crownslots, Cosmicslot, Rollingslots, Legzo, Crownplay, Glitchspin, Vincispin, Wonderluck). I have no way to verify their current licensing status, accuracy of the claims attached to them, or whether they're still operating as described, so please confirm each one before publishing rather than treating the mentions below as fact-checked. A few internal links (e.g. to companion guides on free spins, live roulette, or "the latest PayPal casino bonuses") are also referenced without a live URL – I've left those as plain text rather than inventing links.*
```

```298:302:src/data/content/pages/paypal-casino/ireland.mdx
      *Editorial note: the categories below mirror the original draft's structure, but I've left the brand names out rather than repeat unverified picks – please slot in your own checked recommendations under each heading.*

      - **For experienced players** looking for a premium experience with a full game library, generous VIP programme, and fast PayPal withdrawals: *[established platforms to be confirmed]*
      - **For new players or those on a tighter budget**, platforms with low minimum deposits and strong welcome bonus structures: *[platforms to be confirmed]*
      - **For slots enthusiasts**, look for platforms with 3,000+ game libraries and strong representation from providers like Pragmatic Play and Play'n GO: *[platforms to be confirmed]*
```

**What was done:**

- Cross-referenced the brands named in the first note (Tonybet, Spinbetter, Skycrown, Evospin, Starda, Crownslots, Cosmicslot, Rollingslots, Legzo, Crownplay, Glitchspin, Vincispin, Wonderluck) against the confirmed dataset (`casinos-final-with-confirmed-bonuses.json`, added 2026-08-09). None of them are actually named anywhere else in the page body (they only appeared inside the note itself), and none have PayPal confirmed as a deposit method in the dataset — so the note was simply removed rather than "resolved" with those brands.
- Queried the confirmed dataset for casinos that are simultaneously (a) supported in Ireland (`supportedCountries` includes `IE`), (b) confirmed to accept PayPal as a deposit method, and (c) already present in this page's own Ireland `casinoList` (`meta.json` → `casinoListsByCountry.ireland`), to guarantee the recommendations are consistent with what's actually promoted on the page. That produced exactly four matches: **PlayOJO**, **The Online Casino**, **Vegas Mobile Casino**, and **Need for Spin Casino**.
- Replaced the three placeholders and added a fourth (previously-unfilled) recommendation with these four, matched to the category they best fit on confirmed features/data:
  - _Experienced players / VIP / fast withdrawals_ → **Need for Spin Casino** (8,000+ games, 50-level VIP club with an invite-only dedicated-manager tier, PayPal instant).
  - _New/budget players_ → **PlayOJO** (PayPal from €10, brand-wide no-wagering-requirements policy).
  - _Slots enthusiasts_ → **The Online Casino** (2,000–3,000 games incl. Pragmatic Play and Play'n GO, as the original copy specifically asked for).
  - _Sports bettors who also play casino_ → **Vegas Mobile Casino** (integrated sportsbook + Evolution live tables + PayPal from €20).
  - Added a short disclaimer line reminding readers to confirm the live offer/PayPal availability before depositing, since the dataset itself flags some bonus figures (especially exact wagering multipliers) as still having minor source conflicts — see the `_research_confidence` notes per casino in `casinos-final-with-confirmed-bonuses.json` if those need tightening further.
- Removed both editorial notes from the published `bodyMarkdown`.
- Swept the rest of the corpus for the same "please confirm/slot in" pattern (`rg "please confirm each one before publishing|please slot in|to be confirmed\]"`) — no other occurrences found across `data/content/pages/`. Worth re-running that grep as a pre-publish check on any newly added page.

### 1.2 ✅ FIXED — Wrong responsible-gambling helpline number (Norway)

**Status: resolved on 2026-08-09.** Verified against `hjelpelinjen.no` / Blå Kors / Lotteritilsynet — **the only correct number is 800 800 40** (free, Blå Kors/Lotteritilsynet, weekdays 09:00–18:00). Two other, fabricated numbers were quoted in three files and have now been corrected to `800 800 40`:

| File                                       | Line | Number printed (before) | Now               |
| ------------------------------------------ | ---- | ----------------------- | ----------------- |
| `pages/new-casinos/norway.mdx`             | 148  | 915 00 800              | **800 800 40** ✅ |
| `pages/casino-bonuses/norway.mdx`          | 153  | 915 00 800              | **800 800 40** ✅ |
| `pages/minimum-deposit-casinos/norway.mdx` | 76   | 800 800 099             | **800 800 40** ✅ |

These already had it right and were used as the reference copy: `paypal-casino/norway.mdx`, `revolut-casinos/norway.mdx`, `mobile-casinos/norway.mdx`, `home-page/norway.mdx`, `blocked-casinos/norway.mdx`, `fast-payout-casinos/norway.mdx`.

**What to research:** while fixing this, also re-verify the other five markets' helpline numbers periodically (they were correct as of this audit, cross-checked against the operators' own sites):

| Market  | Service                         | Number confirmed correct                                          |
| ------- | ------------------------------- | ----------------------------------------------------------------- |
| Ireland | GamblingCare.ie (Dunlewey)      | 1800 936 725                                                      |
| Denmark | StopSpillet (Spillemyndigheden) | 70 22 28 25 (written as "70 222 825" in-repo — same digits, fine) |
| Finland | Peluuri                         | 0800 100 101                                                      |
| Germany | BZgA / check-dein-spiel.de      | 0800 1 37 27 00                                                   |
| Sweden  | Stödlinjen                      | 020‑81 91 00                                                      |
| Norway  | Hjelpelinjen                    | **800 800 40**                                                    |

### 1.3 Missing locale page — Crypto Casinos / Norway

`pages/crypto-casinos/` has `denmark.mdx`, `finland.mdx`, `germany.mdx`, `ireland.mdx`, `sweden.mdx` — **no `norway.mdx`**, and `_index.json` / `meta.json` for this page type don't even define a Norway slug (the other 9 page types all have 6 locale slugs). This isn't a translation gap, it's a missing product surface — Norwegian players currently have no Crypto Casinos guide at all. (Same gap was flagged for the casino-review corpus in `content-locale-audit.md`; this is the pages-side counterpart.)

**What to research:** confirm whether this is intentional (e.g. legal/compliance reason not to promote crypto casinos to Norwegian players under Lotteritilsynet rules) before building the page — if there's no compliance reason, this is a straightforward content gap to fill using the Danish/Swedish version as a base.

---

## 2. Missing visual assets — pages are shipping as text-only

Every `kind: image` section and every commented-out `# CustomImage …` placeholder was checked against `src/images/content/` (which currently contains only `home-page-hero.se.webp`, unused, plus a README). Result: **every other referenced filename is missing.** Some sections are "live" (`kind: image` uncommented, e.g. New Casinos, Casino Bonuses) and will simply render nothing (the `CustomImage` component fails silently — confirmed in code, so no broken build, just an invisible gap); most are still commented out in the MDX pending an asset.

| Page                | Missing filenames referenced                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home Page           | `home-page-hero.webp`, `home-page-payment-comparison.webp`, `home-page-paypal-deposit.webp`                                                                           |
| PayPal Casino       | `paypal-casino-hero.webp`, `paypal-casino-cashier.webp`, `paypal-casino-security.webp`                                                                                |
| New Casinos         | `new-casinos-hero.webp`, `new-casinos-how-we-review.webp`, `new-casinos-safety-checklist.webp`, `new-casinos-welcome-bonus.webp`, `new-casinos-mobile-play.webp`      |
| Casino Bonuses      | `casino-bonuses-hero.webp`, `casino-bonuses-welcome-offer.webp`, `casino-bonuses-wagering.webp`, `casino-bonuses-free-spins.webp`, `casino-bonuses-cashback-vip.webp` |
| Blocked Casinos     | `blocked-casinos-hero.webp`, `blocked-casinos-warning.webp`, `blocked-casinos-alternatives.webp`                                                                      |
| Fast Payout Casinos | `fast-payout-hero.webp`, `fast-payout-payments.webp`, `fast-payout-cashier.webp`                                                                                      |
| Mobile Casinos      | `mobile-casinos-hero.webp`, `mobile-casinos-mobile-play.webp`, `mobile-casinos-cashier.webp`                                                                          |

The one page type that got this right end-to-end is **Revolut Casinos** — its `howTo` steps reference `public/assets/revolut-howto-01…04` and those files genuinely exist. Use that page as the production template.

**What to research/produce:**

- For each filename above: decide `ai-generated` vs `stock` vs `screenshot` (the MDX comments already specify which — e.g. hero images are tagged `ai-generated`, cashier/UI shots are tagged `screenshot`, trust/badge imagery is tagged `stock`).
- Screenshots (`*-cashier.webp`, `*-deposit.webp`) need an actual casino cashier UI captured — these can't be stock or AI-generated without looking fake; budget real QA time to capture them per the alt text already written (e.g. "PayPal selected as deposit method in a casino cashier on mobile").
- `CustomImage.astro` supports per-locale variants (`name.se.webp`, `name.de.webp`, etc. via the same `LOCALE_IMAGE_SUFFIX` map) — decide whether images should be genuinely localized (e.g. a cashier screenshot in the local currency/language) or shared across all six locales with one file. The one existing asset, `home-page-hero.se.webp`, suggests locale-specific images were planned but the pipeline was never finished (the Swedish home page itself doesn't even reference this filename — it's an orphaned asset).
- Once assets land, uncomment the corresponding `kind: image` blocks and add `src:` in `meta.json`.

---

## 3. Spelling / language QA

**Ireland (English) copy is clean.** An automated spellcheck (pyspellchecker + a domain allow-list for brand names/fintech jargon) against all six `ireland.mdx` files found no genuine misspellings — the flagged terms were all YAML keys, brand names, or correct British/Irish spellings (`recognised`, `programme`, `favour`, `prioritise`, `optimise`, `centralised`, `realise`) that are appropriate for an Irish audience and should **not** be "corrected" to American spelling. The copy reads as professionally edited.

No English-language leakage was found inside the five other locales' body copy this time (a spot-check for stray English sentences/phrases turned up nothing beyond intentional loanwords like "free spins", "cashback", "e-wallet" that are commonly used unchanged in Nordic/German gambling copy). This is an improvement versus the casino-review corpus, where `content-locale-audit.md` had previously found and fixed real English leakage (e.g. "550 free spins" in a Swedish review body) — worth re-running a similar spot-check after every new page is added, since that's exactly how mistakes like §1.1 slip through.

**What to research:** if you want higher confidence on the five non-English locales specifically, a native-speaker/editor pass (or a proper `da`/`fi`/`de`/`nb`/`sv` spellchecker/LLM QA pass) is still the more reliable check than an English-tool heuristic — automated tooling for this repo could only reliably validate English.

---

## 4. Content depth & parity across locales

Word counts for the `contentComponent` body text (excludes FAQ/how-to/table markup) show large, likely-unintentional depth gaps between locales of the _same_ page — several pages read as clearly "finished" in one language and "rushed" in another:

| Page                    | Ireland |   Denmark | Finland | Germany |            Norway | Sweden |
| ----------------------- | ------: | --------: | ------: | ------: | ----------------: | -----: |
| Home Page               |   4,119 |     2,855 | **726** |   3,379 |             3,843 |  3,454 |
| PayPal Casino           |   3,929 | **1,246** |   2,540 |   2,251 |             2,152 |  2,137 |
| Crypto Casinos          |   1,298 |     1,700 |   1,111 |   1,274 | _(missing, §1.3)_ |  1,318 |
| New Casinos             |   1,012 |       943 |     745 |     903 |               916 |    919 |
| Casino Bonuses          |   1,006 |       932 |     721 |     876 |               919 |    921 |
| Minimum Deposit Casinos |     909 |       899 |     693 |     903 |               873 |    859 |
| Fast Payout Casinos     |     590 |       512 |     428 |     519 |               525 |    502 |
| Revolut Casinos         |     696 |       598 |     488 |     587 |               577 |    583 |
| Blocked Casinos         |     417 |       356 |     289 |     366 |               361 |    350 |
| Mobile Casinos          |     256 |       264 |     208 |     279 |               257 |    254 |

**What this means / what to research:**

- **Home Page / Finland (726 words)** is a stub next to the other five (2,855–4,119 words) — it's missing the entire "Comparing the Top Casino Payment Methods", method-by-method deep dives, and the 2026-trends section that Ireland/Germany/Norway/Sweden all have. It does have a nice touch none of the others have (a dated "content freshness" note, see §6) but structurally it's the thinnest page on the site by a wide margin.
- **PayPal Casino / Denmark (1,246 words)** is roughly a third the length of Ireland's version and skips sections the other locales cover (e.g. no "Why PayPal Works as a Trust Signal", no game-provider breakdown, no small-deposit strategy section).
- Every page type is consistently 1.5–2× longer in Ireland than in the thinnest locale — decide whether that's an acceptable "EN is the flagship, others are summaries" strategy, or whether it should be closer to parity for SEO/topical-authority reasons in each local market.
- Mobile Casinos and Blocked Casinos are thin (250–420 words) across _all_ locales, not just one — these read more like stubs site-wide and are candidates for a genuine content expansion pass (more FAQ depth, more brand-specific mobile UX detail, etc.) rather than a translation fix.

---

## 5. Structural / section-parity gaps

Cross-referencing each page type's `meta.json` component list against what's actually live in every locale's `.mdx` surfaced a few inconsistencies:

- **`whatPeopleSay` (the "forum quotes" section) exists only on Crypto Casinos / Ireland.** `meta.json` lists it as part of the page's component schema, and Ireland has a fully built-out forum-quote section (8 quotes, sourced from `thebitcoin.pub`), but Denmark, Finland, Germany, and Sweden versions of the same page **don't include it at all** — not even a locale-appropriate replacement. That's a good, differentiated content format (adds authenticity/E-E-A-T) sitting unused everywhere except one locale of one page.
- **`methodAvailability` (the per-casino comparison-grid table) is used only on Revolut Casinos**, across all six locales. It would be equally useful on Crypto Casinos (which coin/network per casino) and PayPal Casino (deposit-only vs deposit+withdraw per casino) — right now those pages rely on prose instead of the structured table component that already exists and is proven to work.
- **`bonusCalculator` (interactive wagering calculator) is used only on Casino Bonuses.** Minimum Deposit Casinos and New Casinos both talk about wagering requirements in prose and would benefit from the same interactive component.
- **FAQ item counts vary locale-to-locale on the same page**, e.g. Crypto Casinos: Ireland 7, Denmark 6, Finland 7, Germany 7, Sweden 7 (one question dropped in Danish); Home Page: Ireland 4, Denmark 7, Finland 5, Germany 6, Norway 5, Sweden 4. Since every FAQ item also feeds the `FAQPage` JSON-LD schema (`generateFAQSchema` in `src/lib/schema.ts`), this is a direct, per-locale SEO/rich-snippet inconsistency, not just a copy nit.
- **The "content freshness" callout (`<div class="content-freshness">…</div>`, a dated note describing what was just updated) appears on only 6 of the 60 files** (Home Page: Denmark, Finland, Germany, Norway, Sweden; Crypto Casinos: Denmark). It's a nice, concrete E-E-A-T signal ("we last touched this on 20.07.2026, here's exactly what changed") that isn't rolled out consistently — worth turning into a standard block on every page rather than an incidental one.

**What to research:** decide a per-page-type "target section set" (which of `howTo` / `methodAvailability` / `bonusCalculator` / `whatPeopleSay` / `image` each page type _should_ carry) and audit against that checklist going forward, rather than letting `meta.json`'s component list silently drift ahead of what's actually written per locale.

---

## 6. E-E-A-T / author trust signals

- **All 70 pages share the exact same two authors**: `addedBy: seamus-oconnor` (every single page, no exceptions) and `reviewedBy: stoyan-makoski` (every single page, no exceptions) — confirmed across all ten `meta.json` files. A single-author-for-everything byline pattern across an entire multi-topic site is a weak trust signal for Google's E-E-A-T guidance, especially since the same two names also appear as "addedBy/reviewedBy" on the casino review corpus. **What to research:** whether the business wants to introduce additional named contributors/reviewers (even 2–3 more) to make the byline pattern look like a real editorial team rather than one pair of names repeated everywhere.
- **Seamus O'Connor's author bio only has two real translations** (English and Finnish) in `src/lib/data/authors/seamus-oconnor.ts` — Germany, Denmark, Norway, and Sweden all fall back to the **English** `role`/`bio`/`about` object. Because `PageByline.astro` renders `author.role` directly with no locale copy fallback, a German/Danish/Norwegian/Swedish visitor sees "Senior Casino Analyst" / the English bio text on their own-language page. Stoyan Makoski has the same gap (only `en` + `fi` profiles). This is the same class of bug `content-locale-audit.md` already found and partly fixed for `seo.seoTitle`/`seoDescription` — it needs the same treatment applied to author profiles.
- Minor editorial inconsistency worth a look: Seamus's bio headline is "Senior Casino Analyst… 8 years in the Irish gambling industry / bonus analysis and player protection," but the `about` paragraphs describe him purely as a blockchain/DeFi/crypto-casino specialist with a software-engineering background — two slightly different personas bolted together. Worth a light rewrite so the byline and the "About" copy tell one consistent story.

---

## 7. Fact-check / research backlog (things stated as fact that should be re-verified periodically)

These are claims embedded in the copy that are either time-sensitive, jurisdiction-specific, or otherwise worth a periodic legal/compliance re-check rather than a one-off fix:

- **Ireland — Gambling Regulatory Authority of Ireland (GRAI).** Multiple pages describe GRAI licensing, a "National Gambling Exclusion Register," and note "GamStop only covers UK-licensed sites." Confirm current GRAI licensing rollout status/timeline before every content refresh — this is a genuinely new regulator and its scope is still evolving through 2026.
- **Germany — GGL / BZgA / OASIS.** Pages reference the GGL as licensing body and OASIS as the national self-exclusion system; numbers/URLs checked out, but licensing thresholds and the list of GGL-approved operators change often enough to warrant a recurring check.
- **Curaçao licensing overhaul.** `new-casinos/ireland.mdx` and `paypal-casino/ireland.mdx` both describe the 2024–2025 shift from the old Curaçao "master licence" (Curaçao eGaming) model to direct licensing via the Curaçao Gaming Authority (CGA), and instruct readers to treat old-style sub-licences as a red flag. This is accurate but worth re-checking against the CGA's current status page each quarter since enforcement of the transition is still ongoing industry-wide.
- **Norway — legal framing.** Some Norwegian pages describe Norsk Tipping/Norsk Rikstoto's state monopoly and note that enforcement against individual players using foreign MGA-licensed sites is "in practice limited" (`home-page/norway.mdx` FAQ). This is a legally sensitive statement to be making on a commercial site — worth a compliance/legal review, not just a copy review.
- **Bonus figures, min/max deposit numbers, and wagering percentages quoted in body copy** (e.g. "100%-match up to €200, up to 200%/€1,000", "25x–50x wagering", "€10–€20 withdrawal minimum") should be reconciled against the live `bonuses[]` data used elsewhere on the site — `content-locale-audit.md` already found body-vs-`meta.json` bonus mismatches on the casino-review side; the same discipline should be applied to these guide pages' generic bonus-range claims.
- **Payment-method coverage claims** ("PayPal is widely accepted... Neteller charges 1.45%... Revolut's in-app gambling block...") are stated confidently and read well, but should be spot-verified against a handful of the actually-listed casinos' live cashiers每 few months, since payment processor policies change faster than review cycles.

---

## 8. Minor / cosmetic

- `home-page-hero.se.webp` in `src/images/content/` is an orphaned asset — no `.mdx` file currently references this exact filename (the Swedish home page's own hero comment references `home-page-hero.webp`, no locale suffix). Either wire it up or remove it.
- Currency/number formatting is inconsistent within a single market: Norway pages mix `100 kr`, `1,45 %` and similar — fine locale-wise (Norwegian uses comma decimals and space thousands separators), but double-check thousands separators are consistent (`50 000 kr` vs `50.000 kr`) within the same page.
- A few `<div class="how-to">…</div>` blocks are written as one long unbroken line of HTML inside the MDX (e.g. `paypal-casino/denmark.mdx` line 145) rather than the multi-line, readable format used elsewhere — purely a maintainability nit, doesn't affect rendering.

---

## 9. Prioritized punch list

1. ✅ **Done.** Fixed or removed the two "to be confirmed" placeholders + both AI editorial notes in `paypal-casino/ireland.mdx` (§1.1).
2. ✅ **Done.** Corrected the Norwegian helpline number in `new-casinos/norway.mdx`, `casino-bonuses/norway.mdx`, and `minimum-deposit-casinos/norway.mdx` to **800 800 40** (§1.2).
3. Decide on and build (or intentionally document the absence of) `crypto-casinos/norway.mdx` (§1.3).
4. Commission/produce the ~20 missing hero/section images so Home, PayPal Casino, New Casinos, Casino Bonuses, Blocked Casinos, Fast Payout, and Mobile Casinos stop rendering as text-only pages (§2).
5. Bring Home/Finland and PayPal Casino/Denmark up to content parity with their Ireland counterparts, or make a deliberate call on a shorter "local summary" format (§4).
6. Localize the two authors' `role`/`bio`/`about` fields for Denmark, Germany, Norway, and Sweden instead of falling back to English (§6).
7. Roll out `whatPeopleSay`, `methodAvailability`, and `bonusCalculator` to more page types/locales where they'd add real value, and true up FAQ item counts across locales of the same page (§5).
8. Schedule a recurring (quarterly) fact-check pass on the regulatory/licensing claims in §7, since GRAI (Ireland), CGA (Curaçao), and GGL (Germany) are all still mid-transition regulatory regimes in 2026.
