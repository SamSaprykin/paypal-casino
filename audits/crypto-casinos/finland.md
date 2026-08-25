# Audit — Krypto kasinot, Finland

- **File:** `src/data/content/pages/crypto-casinos/finland.mdx`
- **Slug:** `/fi/krypto-kasinot/`
- **SEO title:** Krypto Kasinot Suomi 2026 | Bitcoin, ETH ja USDT kasinot
- **Measured:** 2026-08-24

## Snapshot

| Signal | Value |
|---|---|
| Section IDs present | 7 of 8 — **`cc-voices` missing** |
| Body words | 1 124 (intro 74, guide 515, depth 480, verdict 55) — **thinnest in the silo** |
| H2/H3 headings | 10 |
| Tables | 16 table rows across 2 comparison tables |
| Custom blocks | `pros-cons`, `payment-speed-chart`, `warning-box`, `info-card`, `tip-box` |
| Player quotes | 0 |
| How-to groups | 4 |
| Images | 0 |
| Internal links | 8, of which **1 is broken** |
| Tax mentions | 9 |
| Freshness block | none |

## Locale relevance: pass on copy, thin on the one thing that matters

No foreign-market contamination — no Irish, Danish, German, Norwegian or Swedish
references. Regulator names appear 6 times and tax 9 times, so the page is nominally
Finnish.

The problem is proportion. Finland is the one market in this set where the legal framework
is actively changing: the new gambling act is to apply mainly from 1 January 2027 with some
provisions from 1 January 2026, and licensing moves to a new authority. For a Finnish
reader in 2026, "what happens to offshore crypto casinos under the new licence regime" is
the question. The page does not lead with it.

The embedded payment speed chart also renders a **Swish** row, which is meaningless in
Finland. See the silo README.

## What is wrong

**High — thinnest page in the silo.** The intro is 74 words and the verdict is 55. Ireland's
equivalents are 101 and 89, Denmark's 127 and 93. Both blocks read as placeholders.

**High — the licence reform is not the frame.** Add a dedicated section: what changes, when,
and what it plausibly means for a player using an internationally licensed crypto casino
during the transition. Hedge the timing explicitly — see the research note below.

**High — `cc-voices` is missing**, so no player quotes.

**Medium — one broken internal link:** line 183 points to `/fi/estettyt-kasinot/`, which
does not exist. Replace with `/fi/rating-guidelines/`.

**Medium — no images.**

**Medium — translated template.** Identical H2 sequence to Ireland, Germany and Sweden. The
reform section above is the cheapest way to break the pattern, because it cannot be
translated into any other locale.

**Low — `cc-list` has no `casinoSlugs`.**

**Low — no freshness or references block.** For a page whose central fact is a law with
dates attached, a visible review date matters more here than anywhere else in the silo.

## What to add

### Images (3, in priority order)

1. **Wallet send screen with network fee**, USDT on TRC-20 versus ERC-20. Blur addresses.
   File: `src/images/content/crypto-casinos-network-fee.fi.webp`
2. **Casino cashier crypto deposit screen** with address, QR and minimum. Blur the address.
   File: `src/images/content/crypto-casinos-cashier.fi.webp`
3. **Completed crypto withdrawal with timestamps.** Blur balances.
   File: `src/images/content/crypto-casinos-payout-proof.fi.webp`

### Tables / blocks

- **Reform timeline table** — date, what changes, who supervises. Two or three rows is
  enough, and it is the single most useful Finnish-specific asset on the page.
- **Crypto versus Finnish instant rails table** — crypto against Trustly, Zimpler and Brite
  on deposit speed, withdrawal speed, reversibility and bonus eligibility. Finnish readers
  already have very fast bank rails, so "crypto is fast" is a weak argument here and the
  table is the honest way to show it.
- **`check-list`** at the top of `cc-guide`: five Finnish-specific takeaways.
- **`references-list`** in `cc-verdict`: Peluuri plus the parliamentary source for the
  reform dates.
- **`content-freshness`** in `cc-verdict`, `data-review-cycle="monthly"`.
- **Network-fee table** — coin, network, typical fee, typical confirmations.

### Rewrites

- Expand `cc-intro` from 74 to roughly 120–150 words, leading with the transition period.
- Expand `cc-verdict` from 55 words into per-reader-type guidance, matching the structure
  used on the new Finnish home page (speed / protection / bonus hunter / small stakes).

### Research needed before publishing

- **The reform status is the biggest factual risk on this page.** Our own PayPal page flags
  that whether the bill has been finally approved as of August 2026 is an open question.
  Verify on the parliament's own site, then state the dates and the supervising authority
  precisely. If it is still open, say so in one sentence rather than implying certainty.
- Verify the Finnish tax treatment of crypto casino winnings and of the coin disposal from
  the tax authority directly. Neither has been verified in any research round so far.
- Confirm Peluuri's number and coverage from `peluuri.fi`.
- **Resolve a figure conflict elsewhere in the site while you are here:** the Finnish fast
  payout page states PayPal at 1–12 h while the shared payment speed chart states 12–48 t.
  One is wrong.
- Confirm which listed casinos accept crypto, then populate `cc-list.casinoSlugs`.

## Action checklist

- [ ] Add the reform timeline section and table, with hedged, verified dates
- [ ] Expand `cc-intro` and rewrite `cc-verdict` into per-reader-type guidance
- [ ] Add the crypto versus Trustly/Zimpler/Brite comparison table
- [ ] Add `cc-voices` with Finnish quotes
- [ ] Fix `/fi/estettyt-kasinot/` at line 183
- [ ] Add three `kind: image` slots and shoot the screenshots
- [ ] Add `check-list`, `references-list`, `content-freshness`
- [ ] Populate `cc-list.casinoSlugs`
- [ ] Re-run `npm run content:check-links`
