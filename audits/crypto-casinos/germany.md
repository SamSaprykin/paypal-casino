# Audit — Krypto Casinos, Germany

- **File:** `src/data/content/pages/crypto-casinos/germany.mdx`
- **Slug:** `/de/krypto-casinos/`
- **SEO title:** Krypto Casinos Deutschland 2026 | Bitcoin, ETH & USDT
- **Measured:** 2026-08-24

## Snapshot

| Signal              | Value                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| Section IDs present | 7 of 8 — **`cc-voices` missing**                                          |
| Body words          | 1 264 (intro 135, guide 572, depth 480, verdict 77)                       |
| H2/H3 headings      | 10                                                                        |
| Tables              | 16 table rows across 2 comparison tables                                  |
| Custom blocks       | `pros-cons`, `payment-speed-chart`, `warning-box`, `info-card`, `tip-box` |
| Player quotes       | 0                                                                         |
| How-to groups       | 4                                                                         |
| Images              | 0                                                                         |
| Internal links      | 8, of which **1 is broken**                                               |
| Regulator mentions  | 15                                                                        |
| Tax mentions        | **0**                                                                     |
| Freshness block     | none                                                                      |

## Locale relevance: pass on copy, fail on substance

No foreign-market contamination. The page speaks about German players, and regulator
references appear 15 times, so the licence framing is there.

But the page is locale-relevant in _form_ only. The two subjects that actually define
crypto gambling for a German reader are both missing or thin:

1. **Tax appears zero times.** Not once. For Germany this is the single most searched
   aspect of crypto — the disposal of the coin and the winnings are separate questions,
   and readers expect the page to at least frame them.
2. **The GlüStV crypto exclusion is the whole story and it is not the headline.** German
   GGL-licensed operators cannot offer crypto at all, which means every crypto casino a
   German reader can use is by definition outside the German licence — with no OASIS. That
   is the most important sentence on the page and it is not positioned as such.

The embedded payment speed chart also renders a **Swish** row, which is meaningless in
Germany. See the silo README.

## What is wrong

**High — no tax section at all.** Add one. It does not need to give advice; it needs to
name the two questions and point at the official source. Anything less looks like the page
was translated from English without a German editor reading it.

**High — the OASIS consequence is buried.** State plainly: crypto is excluded under the
GlüStV for GGL-licensed operators, therefore any crypto casino accepting German players
operates under a foreign licence, therefore OASIS and the Sperrdatei do not apply. Three
clauses, high up the page.

**High — `cc-voices` is missing**, so Germany has no player quotes while Ireland has ten.

**Medium — one broken internal link:** line 187 points to `/de/gesperrte-casinos/`, which
does not exist. Replace with `/de/rating-guidelines/`.

**Medium — no images.**

**Medium — translated template.** The H2 sequence is identical to Ireland, Finland and
Sweden. The tax and OASIS additions above are the cheapest way to break that pattern,
because neither is translatable into the other locales.

**Low — `cc-list` has no `casinoSlugs`**, so the list is not crypto-filtered.

**Low — no freshness or references block.**

## What to add

### Images (3, in priority order)

1. **Cashier of an internationally licensed casino showing crypto next to the absence of
   PayPal** — this visually proves the licence trade-off the page describes. Blur PII.
   File: `src/images/content/crypto-casinos-cashier.de.webp`
2. **Wallet send screen with network fee**, TRC-20 versus ERC-20 for USDT. Blur addresses.
   File: `src/images/content/crypto-casinos-network-fee.de.webp`
3. **Completed crypto withdrawal with timestamps.** Blur balances.
   File: `src/images/content/crypto-casinos-payout-proof.de.webp`

### Tables / blocks

- **Licence comparison table** — GGL versus international, with rows for crypto allowed,
  OASIS, Einsatzlimit, Einzahlungslimit, Autoplay. Germany is the only locale where this
  table is genuinely different from every other locale, which makes it the best
  anti-duplication asset on the page.
- **Tax framing block** (`info-card`) — separate the disposal of the coin from the
  winnings, and link the official source. No figures until researched.
- **`check-list`** at the top of `cc-guide` with five German-specific takeaways.
- **`references-list`** in `cc-verdict`: GGL, BZgA, and the tax source.
- **`content-freshness`** in `cc-verdict`, `data-review-cycle="monthly"`.
- **Network-fee table** — coin, network, typical fee, typical confirmations.

### Research needed before publishing

- German tax treatment: the crypto disposal (private Veräußerungsgeschäft rules, holding
  period, allowance) versus the gambling winnings. Get the current position from the
  official source and write it as framing, not advice. Do not publish figures from memory.
- Confirm the GlüStV wording that excludes crypto for GGL licensees, so the claim can be
  stated precisely rather than paraphrased.
- Normalise the BZgA phone number: the site currently writes it three different ways
  (`0800 1 37 27 00`, `0800 1372700`, `0800 1 372 700`). Pick one for the whole site.
- Confirm which listed casinos actually accept crypto, then populate `cc-list.casinoSlugs`.

## Action checklist

- [ ] Add a tax section (framing + official source, no invented figures)
- [ ] Move the GlüStV/OASIS consequence into the first screen of `cc-guide`
- [ ] Add the GGL-versus-international licence table
- [ ] Add `cc-voices` with German quotes
- [ ] Fix `/de/gesperrte-casinos/` at line 187
- [ ] Add three `kind: image` slots and shoot the screenshots
- [ ] Add `check-list`, `references-list`, `content-freshness`
- [ ] Populate `cc-list.casinoSlugs`
- [ ] Re-run `npm run content:check-links`
