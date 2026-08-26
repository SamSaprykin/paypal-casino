# Audit — Kryptocasinoer, Denmark

- **File:** `src/data/content/pages/crypto-casinos/denmark.mdx`
- **Slug:** `/dk/krypto-casinoer/`
- **SEO title:** Bitcoin Casino 2026 – Guide til Kryptocasinoer i Danmark
- **Measured:** 2026-08-24

## Snapshot

| Signal              | Value                                                                           |
| ------------------- | ------------------------------------------------------------------------------- |
| Section IDs present | 7 of 8 — **`cc-voices` missing**                                                |
| Body words          | 1 789 (intro 127, guide 1 053, depth 516, verdict 93) — the longest in the silo |
| H2/H3 headings      | 14 — the most in the silo                                                       |
| Tables              | **0**                                                                           |
| Custom blocks       | `info-card`, `warning-box`, `content-freshness`                                 |
| Player quotes       | 0                                                                               |
| How-to groups       | 4                                                                               |
| Images              | 0                                                                               |
| Internal links      | **3** — the fewest in the silo, all valid                                       |
| Tax mentions        | 23                                                                              |
| Freshness block     | yes (the only locale that has one)                                              |

## Locale relevance: pass, and the best in the silo

This is the only page in the crypto silo that was written rather than translated. Its H2
structure is unique — "Er det lovligt at spille på et kryptocasino fra Danmark?",
"Beskatning af gevinster fra kryptocasino", "Provably fair – sådan tjekker du fair spil" —
and none of those headings exist on the other four locales. Tax is covered 23 times, which
is the right emphasis for the Danish market. No foreign-market contamination.

It also avoids the Swish defect that affects Ireland, Germany and Finland, simply because
it does not embed the payment speed chart.

Treat this page as the model for the silo, not Ireland.

## What is wrong

**High — zero tables.** 1 789 words with no comparison table anywhere. The page describes
which coins are accepted, how fees work and how kryptocasino compares with a traditional
casino, all in prose. Those are three tables waiting to be written, and the absence is why
the page feels like a wall of text despite being the most substantial one in the silo.

**High — only 3 internal links.** Ireland, Germany, Finland and Sweden each have 8 or 9.
Denmark links to PayPal, new casinos and fast payout, and nothing else. Missing: bonuses,
mobile, low deposit, Revolut, rating guidelines. All of those pages exist in Danish.

**High — no images.**

**Medium — `cc-voices` is missing**, so no player quotes.

**Medium — no wallet names anywhere.** Ireland, Germany, Finland and Sweden all name five
wallets; Denmark names none. The "safe wallets" angle is entirely absent, which is a real
gap on a page that tells readers to self-custody.

**Medium — check the tax section against the auto-rendered market notice.**
`DenmarkMarketNotice.astro` renders on every `/dk/` page and already covers EU/EØS versus
Curaçao licensing, the crypto gains ruling and ROFUS. With 23 tax mentions in the body
there is a real risk the page says the same thing twice in slightly different words. Read
the rendered page and cut the overlap.

**Low — `cc-list` has no `casinoSlugs`.**

## What to add

### Images (3, in priority order)

1. **Wallet send screen with the network fee visible.** Denmark has no wallet content at
   all, so this image plus a short section is the largest single improvement available.
   File: `src/images/content/crypto-casinos-network-fee.dk.webp`
2. **Casino cashier crypto deposit screen** with address, QR and minimum. Blur the address.
   File: `src/images/content/crypto-casinos-cashier.dk.webp`
3. **Completed crypto withdrawal with timestamps.** Blur balances.
   File: `src/images/content/crypto-casinos-payout-proof.dk.webp`

### Tables (this is the priority for Denmark)

1. **Accepted coins** — coin, network, typical minimum, typical confirmation time. Replaces
   the prose under "Hvilke kryptovalutaer accepteres?".
2. **Fees** — who charges what: network fee, exchange spread, casino fee. Replaces the
   prose under "Gebyrer ved brug af kryptovaluta".
3. **Kryptocasino versus traditionelt casino** — rows for ROFUS, MitID, payout speed,
   tax treatment, reversibility, bonus eligibility. The prose section already exists; a
   table makes it scannable and gives the page a snippet target.

### Blocks

- **`check-list`** at the top of `cc-guide`: five one-line Danish takeaways.
- **`references-list`** in `cc-verdict`: Spillemyndigheden, ROFUS, StopSpillet, and the tax
  source actually used.
- Keep the existing **`content-freshness`** block and update its `data-date` when you edit.
- A short **wallet section** with the five wallet names the other locales use, adapted.

### Internal links to add

`/dk/casino-bonusser/`, `/dk/mobil-kasinoer/`, `/dk/kasinoer-med-lav-indbetaling/`,
`/dk/revolut-kasinoer/`, `/dk/rating-guidelines/`. Prefer a `related-pages` hub near the
end of `cc-depth` over scattering them in prose.

### Research needed before publishing

- Read the rendered `/dk/krypto-casinoer/` page and list which tax statements duplicate the
  auto-rendered Danish market notice. Cut the duplicates from the body.
- Confirm the current Danish tax position on crypto gains and on gambling winnings from
  EU/EØS versus non-EU licences, from the official source.
- Verify the fee and confirmation figures on the day you write the tables, and date the
  footnote.
- Normalise the StopSpillet number: the site uses both `70 222 825` and `70 22 28 25`.
- Confirm which listed casinos accept crypto, then populate `cc-list.casinoSlugs`.

## Action checklist

- [ ] Add the three tables (coins, fees, kryptocasino versus traditionelt)
- [ ] Add a wallet section with named wallets
- [ ] Add five internal links via a `related-pages` hub
- [ ] Add `cc-voices` with Danish quotes
- [ ] Add three `kind: image` slots and shoot the screenshots
- [ ] Add `check-list` and `references-list`; refresh `content-freshness` date
- [ ] Cut tax copy that duplicates the auto-rendered market notice
- [ ] Populate `cc-list.casinoSlugs`
