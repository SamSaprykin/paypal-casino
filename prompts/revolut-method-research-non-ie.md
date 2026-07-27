# Prompt: Revolut method table — non-IE casinos

Research Revolut deposit/withdraw availability for casinos listed on DE/DK/FI/NO/SE Revolut pages that are **not** on the Ireland list.

**Apply results to:** `src/data/content/pages/revolut-casinos/meta.json` → `rv-methods` → `rowsByCountry.<locale>`  
(order rows like `casinoListsByCountry.<locale>`).

---

## Skip (already researched on IE)

`dragonslots`, `dream-vegas`, `granawin`, `wildtokyo`, `coolzino`, `crashino`, `swiftcasino`

If a local list includes one of these, copy IE cells and only translate notes — do not re-research.

---

## Research these slugs

| Locale  | Slugs                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------- |
| germany | `yukon-gold`, `kukimuki`, `villento`, `bitstarz`, `zodiac-casino`, `lollybet`                      |
| denmark | `kukimuki`, `spinbetter`, `lucky-ones`, `lets-lucky`, `cosmicslot`, `just-casino`                    |
| finland | `20bet`, `playkasino`, `fezbet`, `spinbetter`                                                        |
| norway  | `kukimuki`, `flagman`, `spinbetter`, `lucky-ones`, `slotbox`                                       |
| sweden  | `klirr-casino`, `pop-casino`, `lucky-ones`, `cosmicslot`, `lets-lucky`, `spinbetter`, `jubla-casino` |

Deduplicate shared brands across markets when the banking stack is the same; otherwise note the market in `notes`.

---

## Status values

| Value     | Meaning                                                                      |
| --------- | ---------------------------------------------------------------------------- |
| `yes`     | Confirmed available                                                          |
| `no`      | Confirmed not available                                                      |
| `partial` | Available with caveats (e.g. bank transfer to Revolut, Visa Fast Funds only) |
| `unknown` | Not verified — prefer over guessing                                          |

## Columns

| id            | Verify                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| `cardDeposit` | Visa/Mastercard (Revolut card path)                                     |
| `revolutPay`  | Named Revolut Pay / wallet button (not card synonym)                    |
| `withdraw`    | Cash out to Revolut (card, Revolut Pay, bank transfer, Visa Fast Funds) |
| `bonusOk`     | Bonus terms allow card/Revolut deposits                                 |

Also: English `notes`, `verifiedAt` (`YYYY-MM-DD`), `markets` (which geos use the slug).

---

## System prompt

You research Revolut payment availability for PpCasinos.co. Prefer `unknown`/`partial` over inventing `yes`. Never claim Revolut Pay unless the cashier or payments page names it. Prefer primary sources (cashier, banking page, bonus T&Cs). Return JSON only first.

---

## Output schema

```json
[
  {
    "casinoSlug": "spinbetter",
    "markets": ["denmark", "finland", "norway", "sweden"],
    "cells": {
      "cardDeposit": "yes",
      "revolutPay": "no",
      "withdraw": "partial",
      "bonusOk": "yes"
    },
    "notes": "Cashier: Visa/Mastercard. Withdrawal via bank transfer; no Revolut Pay.",
    "verifiedAt": "2026-07-25"
  }
]
```

---

## Task message

```
Research Revolut method availability for NON-Ireland casinos on PpCasinos.co.

Skip (already done): dragonslots, dream-vegas, granawin, wildtokyo, coolzino, crashino, swiftcasino.

Research:

GERMANY: yukon-gold, kukimuki, villento, bitstarz, zodiac-casino, lollybet
DENMARK: kukimuki, spinbetter, lucky-ones, lets-lucky, cosmicslot, just-casino
FINLAND: 20bet, playkasino, fezbet, spinbetter
NORWAY: kukimuki, flagman, spinbetter, lucky-ones, slotbox
SWEDEN: klirr-casino, pop-casino, lucky-ones, cosmicslot, lets-lucky, spinbetter, jubla-casino

For each unique slug: fill cardDeposit, revolutPay, withdraw, bonusOk (yes|no|partial|unknown), English notes, verifiedAt, markets[]. Prefer unknown over guessing. Never invent Revolut Pay.

Return JSON array first, then a short evidence bullet list.
```
