# Audit — Crypto casinos, Ireland

- **File:** `src/data/content/pages/crypto-casinos/ireland.mdx`
- **Slug:** `/crypto-casinos/`
- **SEO title:** Best Crypto Casinos Ireland 2026 | Bitcoin & USDT Casinos
- **Measured:** 2026-08-24

## Snapshot

| Signal | Value |
|---|---|
| Section IDs present | 8 of 8 (`cc-intro`, `cc-list`, `cc-guide`, `cc-voices`, `cc-howto`, `cc-depth`, `cc-faq`, `cc-verdict`) |
| Body words | 1 314 across four content blocks (intro 101, guide 613, depth 511, verdict 89) |
| H2/H3 headings | 10 |
| Tables | 13 table rows across 2 comparison tables |
| Custom blocks | `pros-cons`, `payment-speed-chart`, `warning-box`, `info-card`, `tip-box` |
| Player quotes | 10 (the only locale that has them) |
| How-to groups | 4 |
| Images | 0 |
| Internal links | 9, of which **2 are broken** |
| Freshness block | none |
| References block | none |

## Locale relevance: pass, with one defect

The copy talks about Irish players throughout. No Danish, Finnish, German, Norwegian or
Swedish market references leak in — I checked for regulator names, helplines, currencies
and country adjectives and found none. Tax is discussed in an Irish frame.

The one defect is not in the copy: the embedded payment speed chart renders a **Swish**
row, which has no meaning for an Irish reader. Swish is Swedish. See the silo README.

## What is wrong

**High — two broken internal links.** Both point at pages that do not exist anywhere in
the build:

| Line | Link | Status |
|---|---|---|
| 251 | `/blocked-casinos/` | 404 — no blocked-casinos page exists in any locale |
| 257 | `/gambling-regulation-ireland/` | 404 — the regulation page was never built |

Replace the first with `/rating-guidelines/` and the second with
`/paypal-casino-ireland/` or drop the sentence. This is the same pair I removed from the
Ireland home page.

**High — no images.** The page describes wallets, seed phrases, network fees and
confirmation times, and shows none of it. This is the biggest ranking-relevant gap.

**Medium — this page is the template the other three locales copied.** That is not
Ireland's fault, but it means anything you add here to make it unique should be
Ireland-specific rather than translatable, or you widen the duplication problem.

**Medium — the casino list is not crypto-filtered.** `cc-list` ships with
`casinoSlugs: []`, so the reader gets the generic default set with no indication of which
brands take BTC.

**Low — no freshness or references block.** Denmark has `content-freshness`; Ireland does
not. For a page that quotes fee ranges and confirmation times, a visible review date and
a short source list are cheap credibility.

## What to add

### Images (3, in priority order)

1. **Wallet send screen with the network fee visible** — e.g. USDT on TRC-20 next to
   USDT on ERC-20, so the fee difference is visible rather than asserted. Blur addresses.
   Insert after the "Popular crypto payment methods for Irish players" H2.
   File: `src/images/content/crypto-casinos-network-fee.ie.webp`
2. **Casino cashier crypto deposit screen** showing the generated deposit address, QR code
   and minimum. Blur the address. Insert before `cc-howto`.
   File: `src/images/content/crypto-casinos-cashier.ie.webp`
3. **Completed crypto withdrawal with a timestamp** from the casino's transaction history.
   Blur balances. Insert before `cc-verdict`.
   File: `src/images/content/crypto-casinos-payout-proof.ie.webp`

`kind: image` sections render only once the file exists, so you can add the section IDs
to `meta.json` now and drop the files in later.

### Tables / blocks

- **`check-list`** at the top of `cc-guide`: five one-line takeaways (KYC still applies,
  irreversible transfers, price movement between deposit and withdrawal, network fee is
  yours not the casino's, bonus eligibility often differs for crypto).
- **`references-list`** in `cc-verdict`: link the Irish regulator and Gambling Care /
  Problem Gambling Ireland, plus one neutral source for confirmation times.
- **`content-freshness`** in `cc-verdict` with `data-date` and `data-review-cycle="monthly"`,
  matching what Denmark already does.
- **A network-fee table** — coin, network, typical fee, typical confirmation time. This is
  the one table that is genuinely useful and that no competitor localises properly.

### Research needed before publishing

- Confirm the Irish tax treatment of crypto casino winnings and of the crypto disposal
  itself. These are two different questions and the page currently blurs them. Revenue
  guidance, not a forum.
- Confirm the fee and confirmation figures you put in the network-fee table on the day you
  write it, and state the date in the footnote.
- Confirm which of the listed casinos actually accept crypto, then populate
  `cc-list.casinoSlugs` with only those.

## Action checklist

- [ ] Replace `/blocked-casinos/` (line 251) and `/gambling-regulation-ireland/` (line 257)
- [ ] Add three `kind: image` slots to `crypto-casinos/meta.json` and shoot the screenshots
- [ ] Add `check-list`, `references-list` and `content-freshness` blocks
- [ ] Add the network-fee table with a dated footnote
- [ ] Populate `cc-list.casinoSlugs` with crypto-accepting brands only
- [ ] Re-run `npm run content:check-links`
