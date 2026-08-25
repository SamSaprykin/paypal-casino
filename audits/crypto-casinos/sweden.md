# Audit — Krypto casinon, Sweden

- **File:** `src/data/content/pages/crypto-casinos/sweden.mdx`
- **Slug:** `/se/krypto-casinon/`
- **SEO title:** Krypto Casinon Sverige 2026 | Bitcoin, ETH & USDT
- **Measured:** 2026-08-24

## Snapshot

| Signal | Value |
|---|---|
| Section IDs present | 7 of 8 — **`cc-voices` missing** |
| Body words | 1 337 (intro 152, guide 561, depth 543, verdict 81) |
| H2/H3 headings | 10 |
| Tables | 16 table rows across 2 comparison tables |
| Custom blocks | `pros-cons`, `payment-speed-chart`, `warning-box`, `info-card`, `tip-box` |
| Player quotes | 0 |
| How-to groups | 4 |
| Images | 0 |
| Internal links | 8, of which **1 is broken** |
| Tax mentions | 6 |
| Freshness block | none |

## Locale relevance: pass on copy, misses the Swedish angle

No foreign-market contamination. Regulator references appear 9 times, and this is the one
locale where the payment speed chart's Swish row is actually correct.

What the page misses is the thing that makes Sweden different from every other market in
this silo: **no Swedish-licensed operator offers crypto**, so every crypto casino a Swedish
reader can use is outside the Swedish licence, which means no Spelpaus, no BankID, and a
tax position that depends on where the licence sits. The page mentions tax 6 times but never
turns the licence split into the organising idea.

That framing is also the most valuable anti-duplication asset available, because it is not
translatable — Germany's equivalent is OASIS, Denmark's is ROFUS, and Finland has no
domestic licence at all.

## What is wrong

**High — the licence split is not the frame.** State it plainly and early: crypto is not
available under a Swedish licence, therefore crypto play means an offshore operator,
therefore Spelpaus does not apply and the bonus rules you are used to do not apply either.

**High — Spelpaus is under-covered relative to its importance.** A Swedish reader who has
used Spelpaus needs to know it will not block an offshore crypto casino. That is a player
protection point, not a marketing point, and it belongs above the fold of `cc-guide`.

**High — `cc-voices` is missing**, so no player quotes.

**Medium — one broken internal link:** line 187 points to `/se/blockerade-casinon/`, which
does not exist. Replace with `/se/rating-guidelines/`.

**Medium — no images.**

**Medium — translated template.** Identical H2 sequence to Ireland, Germany and Finland. The
licence-split framing above is the fix.

**Medium — the "crypto is fast" argument is weak in Sweden and the page does not acknowledge
it.** Swedish readers have Swish and Trustly Pay N Play. Crypto's speed advantage over those
is small, and pretending otherwise costs credibility. Address it directly.

**Low — `cc-list` has no `casinoSlugs`.**

**Low — no freshness or references block.**

## What to add

### Images (3, in priority order)

1. **Two cashiers side by side** — a Swedish-licensed site showing Swish and no crypto,
   and an offshore site showing crypto and no Swish. This single image proves the licence
   split better than any paragraph. Blur PII.
   File: `src/images/content/crypto-casinos-cashier.se.webp`
2. **Wallet send screen with network fee**, USDT on TRC-20 versus ERC-20. Blur addresses.
   File: `src/images/content/crypto-casinos-network-fee.se.webp`
3. **Completed crypto withdrawal with timestamps.** Blur balances.
   File: `src/images/content/crypto-casinos-payout-proof.se.webp`

### Tables / blocks

- **Licence comparison table** — Swedish licence versus offshore, with rows for crypto
  available, Spelpaus, BankID, bonus rules (one per player), tax treatment and supervision.
  This is the anchor asset for the page.
- **Crypto versus Swish and Trustly table** — deposit speed, withdrawal speed,
  reversibility, bonus eligibility, cost. Honest treatment of the weak speed argument.
- **`check-list`** at the top of `cc-guide`: five Swedish-specific takeaways, led by "no
  Swedish licence offers crypto".
- **`references-list`** in `cc-verdict`: Spelinspektionen, Spelpaus, Stödlinjen, and the tax
  source actually used.
- **`content-freshness`** in `cc-verdict`, `data-review-cycle="monthly"`.
- **Network-fee table** — coin, network, typical fee, typical confirmations.

### Research needed before publishing

- Confirm the Swedish tax position: winnings on a Swedish or EU/EEA licence versus a licence
  outside the EEA, and separately the disposal of the coin. Our Swedish pages assert the
  EEA split but the tax authority has never been checked directly in any research round.
  Verify or remove.
- Confirm the "one bonus per player" rule wording from the regulator, since the licence
  table depends on it.
- Verify that no Swedish-licensed operator currently offers crypto before stating it
  absolutely. If you find an exception, soften to "we have not found one".
- **Resolve a figure conflict elsewhere while you are here:** Swish withdrawal is "under 1
  tim" in the shared payment speed chart but "1–24 timmar" on the Swedish fast payout page.
- Confirm which listed casinos accept crypto, then populate `cc-list.casinoSlugs`.

## Action checklist

- [ ] Reframe `cc-guide` around the Swedish-licence-versus-offshore split
- [ ] Add the licence comparison table and the crypto versus Swish/Trustly table
- [ ] Move Spelpaus coverage up and state that it does not cover offshore sites
- [ ] Add `cc-voices` with Swedish quotes
- [ ] Fix `/se/blockerade-casinon/` at line 187
- [ ] Add three `kind: image` slots and shoot the screenshots
- [ ] Add `check-list`, `references-list`, `content-freshness`
- [ ] Populate `cc-list.casinoSlugs`
- [ ] Re-run `npm run content:check-links`
