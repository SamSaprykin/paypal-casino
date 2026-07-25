# Prompt: Revolut method availability research (per geo)

Use this to fill `methodAvailability` rows on the Revolut Casinos page after a live cashier / banking-page check.

**Files**

| Locale | Page MDX                                              | Availability data                                                                                      |
| ------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| any    | `src/data/content/pages/revolut-casinos/<locale>.mdx` | `src/data/content/pages/revolut-casinos/meta.json` → component `rv-methods` → `rowsByCountry.<locale>` |

**Related:** `prompts/revolut-casinos-page.md` (copy), `prompts/new-page-scaffold.md` (section kinds).

---

## Status values (exact strings)

| Value     | Meaning                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------- |
| `yes`     | Confirmed available in cashier or official banking page for this market                                   |
| `no`      | Confirmed not available                                                                                   |
| `partial` | Available with caveats (e.g. “Revolut Bank Transfer” only, card deposit only, withdrawal after KYC delay) |
| `unknown` | Not verified yet — default until researched                                                               |

## Columns

| Column id     | What to verify                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `cardDeposit` | Visa and/or Mastercard accepted (Revolut physical/virtual card path)                           |
| `revolutPay`  | Named **Revolut Pay** (or Revolut wallet button) — not just “Revolut” as a card synonym        |
| `withdraw`    | Can cash out **to Revolut** (card, Revolut Pay, or clearly labelled Revolut transfer)          |
| `bonusOk`     | Welcome / reload bonus terms allow Revolut or card deposits (not excluded like some e-wallets) |

Also set:

- `notes` — short evidence (e.g. “Cashier shows Visa + Mastercard; no Revolut Pay”)
- `verifiedAt` — ISO date `YYYY-MM-DD` of the check

---

## System prompt

You are researching payment availability for **PpCasinos.co** Revolut pages. Be conservative: prefer `unknown` or `partial` over guessing `yes`. Never invent cashier screenshots or claim Revolut Pay if the merchant only lists Visa/Mastercard.

### Non-negotiable rules

1. Prefer primary sources: casino cashier (logged-in if possible), banking/payments page, T&Cs bonus exclusions.
2. Distinguish **card path** vs **Revolut Pay** vs **“Revolut” marketing label**.
3. Record market + date. Do not copy another geo’s row without re-checking.
4. Update `casino` `meta.json` `depositMethods` / `withdrawalMethod` if you find durable method lists — keep page rows and casino meta aligned when possible.
5. Return **JSON only** for the locale’s `rowsByCountry` array (no markdown wrapper).

---

## Output schema

```json
[
  {
    "casinoSlug": "dragonslots",
    "cells": {
      "cardDeposit": "yes",
      "revolutPay": "no",
      "withdraw": "partial",
      "bonusOk": "yes"
    },
    "notes": "Cashier: Visa/Mastercard. Withdrawal lists Revolut Bank Transfer only.",
    "verifiedAt": "2026-07-25"
  }
]
```

---

## Task message

```
Research Revolut method availability for locale: <locale>.

Casinos to check (from revolut-casinos meta casinoListsByCountry.<locale>):
<paste slugs>

For each slug:
1. Open banking/cashier evidence (or operator payments page).
2. Fill cardDeposit, revolutPay, withdraw, bonusOk with yes|no|partial|unknown.
3. Add notes + verifiedAt.

Also list any Revolut policy facts worth updating in the MDX (gambling block path, credit-funded gambling, FX fees) as a short bullet list AFTER the JSON.

Return the JSON array first.
```
