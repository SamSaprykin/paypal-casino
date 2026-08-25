# Audit — Kryptokasino, Norway

- **File:** does not exist
- **Slug:** not assigned
- **Measured:** 2026-08-24

## Finding

There is no Norwegian page in the crypto silo. `src/data/content/pages/crypto-casinos/`
contains `denmark.mdx`, `finland.mdx`, `germany.mdx`, `ireland.mdx` and `sweden.mdx`, and
`pages/_index.json` has no Norwegian slug for the crypto entry.

This is the most consequential gap in the silo, because **Norway is the market where crypto
matters most**. Norwegian bank cards are routinely declined for offshore gambling, which is
the single most common payment problem a Norwegian reader has. Crypto is the standard
workaround. Every other locale has a crypto page for a market where crypto is optional;
Norway does not have one for the market where it is the answer.

The new Norwegian home page therefore describes crypto without linking to a guide, which is
a dead end for exactly the reader most likely to need it.

## Build brief

Create `src/data/content/pages/crypto-casinos/norway.mdx` and add the slug to
`pages/_index.json`. Suggested slug: `/no/krypto-kasinoer/` (matches the pattern of
`/no/revolut-kasinoer/` and `/no/nye-kasinoer/`).

Use the same section IDs as the rest of the silo, taken from
`src/data/content/pages/crypto-casinos/meta.json`:

`cc-intro`, `cc-list`, `cc-guide`, `cc-voices`, `cc-howto`, `cc-depth`, `cc-faq`,
`cc-verdict`. A section whose `id` does not match `meta.json` is silently dropped at merge
time, so copy the IDs rather than inventing them.

### The angle: crypto as the answer to declined cards

Do not translate the Irish page. Build the page around the Norwegian payment problem:

1. **`cc-intro`** — lead with the declined card. That is the search intent.
2. **`cc-guide`** — why Norwegian card payments to offshore gambling get stopped, described
   as it works in practice rather than as a legal claim (see the research note). Then crypto
   as one of several workarounds, alongside e-wallets, and honestly compared with them.
3. **A comparison table** that does not exist on any other locale: crypto against Skrill,
   Neteller, MuchBetter and PayPal, on whether the payment goes through, withdrawal speed,
   reversibility, and what happens when the bank asks questions.
4. **`cc-depth`** — wallets, network fees, and the two Norwegian-specific risks: no Norsk
   Tipping self-exclusion on offshore sites, and the declaration question on winnings.
5. **`cc-verdict`** — per-reader-type guidance, matching the new Norwegian home page.

### Blocks to include

- `check-list` at the top of `cc-guide`, led by "krypto løser kortproblemet, men fjerner
  ikke KYC".
- `pros-cons` for crypto in a Norwegian context.
- `warning-box` on irreversible transfers and price movement between deposit and withdrawal.
- `info-card` stating that Norsk Tipping self-exclusion does not cover offshore operators.
- `references-list` with Hjelpelinjen and the tax source.
- `content-freshness` with `data-review-cycle="monthly"`.

### Images (3)

1. **A declined Norwegian card payment next to a successful crypto deposit.** This is the
   most valuable screenshot on the entire site for this market and no competitor has it.
   Blur all PII.
   File: `src/images/content/crypto-casinos-declined-card.no.webp`
2. **Wallet send screen with the network fee visible.** Blur addresses.
   File: `src/images/content/crypto-casinos-network-fee.no.webp`
3. **Completed crypto withdrawal with timestamps.** Blur balances.
   File: `src/images/content/crypto-casinos-payout-proof.no.webp`

### Internal links to include

`/no/paypal-kasinoer-norge/`, `/no/kasinoer-med-rask-utbetaling/`, `/no/casino-bonuser/`,
`/no/nye-kasinoer/`, `/no/mobilkasinoer/`, `/no/kasinoer-med-lav-innskudd/`,
`/no/revolut-kasinoer/`, `/no/rating-guidelines/`. Do **not** link
`/no/blokkerte-kasinoer/` — it does not exist and is already producing 404s from two other
Norwegian pages.

Once the page exists, add it to the `related-pages` hub on the Norwegian home page
(`src/data/content/pages/home-page/norway.mdx`) — the slot is marked with a comment there.

### Research needed before writing

- **The card-blocking mechanism must be described precisely or not at all.** No research
  round has yet cited the actual statute and supervisory practice. Get the primary sources,
  or keep the deliberately non-legal phrasing used on the new Norwegian home page. Never
  state it as a precise legal source you have not read.
- Norwegian tax: Norsk Tipping and Rikstoto winnings are tax-free, foreign winnings should
  in principle be declared, and the crypto disposal is a separate question. Verify with the
  tax authority and frame it without giving advice.
- Confirm the Hjelpelinjen number and URL.
- **Resolve a figure conflict while you are here:** Skrill and Neteller are listed at 24–48
  timer on the Norwegian PayPal page but 1–6 t on the Norwegian fast payout page.
- Identify which casinos in the Norwegian list actually accept crypto, then set
  `cc-list.casinoSlugs` to only those. Do not leave it empty like the other five locales.

## Action checklist

- [ ] Add the Norwegian crypto slug to `pages/_index.json`
- [ ] Create `crypto-casinos/norway.mdx` using the `cc-*` IDs from `meta.json`
- [ ] Write the declined-card angle rather than translating Ireland
- [ ] Add the crypto versus e-wallet comparison table
- [ ] Shoot the declined-card screenshot
- [ ] Add the crypto link to the Norwegian home page `related-pages` hub
- [ ] Run `npx astro build` and confirm `/no/krypto-kasinoer/` appears in `dist/`
- [ ] Re-run `npm run content:check-links`
