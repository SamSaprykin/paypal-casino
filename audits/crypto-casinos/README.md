# Crypto-casinos silo audit (2026-08-24)

One file per locale page. Each audit was produced by measuring the actual MDX
(`src/data/content/pages/crypto-casinos/*.mdx`) against `meta.json`, not by reading
the rendered page, so section IDs and word counts are exact.

| Locale | File | Slug | Body words | Sections present | Verdict |
|---|---|---|---|---|---|
| Ireland | `ireland.md` | `/crypto-casinos/` | 1 314 | 8 of 8 | Strongest page. Template source. Needs images + link fixes. |
| Germany | `germany.md` | `/de/krypto-casinos/` | 1 264 | 7 of 8 | Translated template. Missing the entire German tax + GlüStV angle. |
| Denmark | `denmark.md` | `/dk/krypto-casinoer/` | 1 789 | 7 of 8 | Most original copy, but zero tables and only 3 internal links. |
| Finland | `finland.md` | `/fi/krypto-kasinot/` | 1 124 | 7 of 8 | Thinnest page. Law reform angle almost absent. |
| Sweden | `sweden.md` | `/se/krypto-casinon/` | 1 337 | 7 of 8 | Translated template. Missing the licence/Spelpaus contrast that matters most in SE. |
| Norway | — | — | — | **page does not exist** | See `norway.md` for the build brief. |

## The five findings that apply to every locale

These are the cross-cutting problems. Each locale file repeats only the part that
affects it, with line numbers.

1. **Ireland, Germany, Finland and Sweden are the same page four times.** They share an
   identical H2 sequence (What is a crypto casino → speed compared → benefits → popular
   coins → crypto vs PayPal vs Revolut, then wallets → tips → games → bonuses → legal),
   the same 9-row and 7-row tables, the same four how-to groups and the same five wallet
   names. Denmark is the only locale that was written rather than translated. Templated
   translation at this scale is exactly the pattern that gets a whole silo devalued.
2. **`cc-voices` (What People Say) renders only on Ireland**, with 10 quotes. The other
   four locales omit the section ID entirely, so they lose both the unique text and the
   social proof.
3. **No page in the silo has a single image.** Zero `kind: image` sections across all five
   locales. For a payments topic where readers want to see a real wallet and a real
   withdrawal confirmation, that is the largest single E-E-A-T gap.
4. **`cc-list` has an empty `casinoSlugs` array on all five locales**, so the list falls
   back to the auto-derived default set. Nothing about it is crypto-specific — a reader
   cannot tell which of the listed brands actually accept BTC.
5. **The shared payment speed chart shows Swish to every locale.** In
   `src/lib/i18n/copies/payment-speed-chart.ts` all six locales get the same six method
   rows, including `swish`. Swish is a Swedish rail only, so Ireland, Germany and Finland
   currently render an irrelevant row. Denmark avoids it only because the Danish page
   doesn't use the chart at all.

Fixing 5 is a code change (filter methods per locale) and is listed in
`TODO-content.md` at the repo root rather than in the per-locale files.
