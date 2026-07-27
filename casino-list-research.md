# Prompt: Research a new casino for list cards (no review page)

Use this when adding a **new brand to casino lists** on PpCasinos.co. Output is **card/list metadata only** — not a full review guide (`{locale}.mdx`).

**Apply results to:**

| Step | File |
| ---- | ---- |
| 1 | `src/data/content/casinos/<slug>/meta.json` (create) |
| 2 | `src/data/content/casinos/_index.json` (register slug) |
| 3 | `src/data/content/market-casino-lists.json` (add slug per market) |
| 4 | Optional: page `meta.json` → `casinoListsByCountry` (home, PayPal, Revolut, etc.) |

**Markets:** `ireland` (root `/`), `germany` (`/de/`), `denmark` (`/dk/`), `finland` (`/fi/`), `norway` (`/no/`), `sweden` (`/se/`).

---

## What to research

| Field | Source / rule |
| ----- | ------------- |
| **Brand name & slug** | Official site; slug = lowercase kebab-case (`dream-vegas`) |
| **Markets** | Only list geos where the operator clearly accepts players (T&Cs, geo block, licence scope) |
| **Licence** | Regulator name + number if published; say “unverified” if unclear |
| **Payments** | Deposit + withdrawal methods from banking/payments page or cashier |
| **Payout speed** | Stated processing times per method; use ranges, not marketing superlatives |
| **Welcome bonus** | Headline offer for new players; include promo code only if public |
| **Software** | 3–6 named providers if listed publicly |
| **Rating** | Editorial 4.0–4.9 for cards; base on licence, payments, reputation — not invented user scores |
| **Short description** | 1–2 sentences for listing cards (EN + localized variants for active markets) |
| **List fit** | Which site pages the brand suits (PayPal, Revolut/card, fast payout, mobile, min deposit, crypto, new casinos) |

**Do not produce:** review body copy, FAQ, pros/cons, how-to steps, or SEO long-form.

---

## System prompt

You research online casinos for **PpCasinos.co** list cards. Be conservative: prefer omitting a market over listing one you cannot verify. Never invent licence numbers, payment methods, or bonus terms. If evidence is thin, use `null`, empty arrays, or explicit “unverified” in `researchNotes`.

Distinguish:

- **Card/list metadata** (this prompt) — enough to render `CasinoListingCard` / `HeroCasinoCard`
- **Full review** (separate task) — long MDX guide; not requested here

Return **JSON only** first (schema below). After the JSON, a short bullet list of source URLs is allowed.

---

## Output schema

Return one object:

```json
{
  "casinoName": "Dream Vegas Casino",
  "slug": "dream-vegas",
  "rating": 4.5,
  "referralUrl": "/goto/dream-vegas.php",
  "shortDescription": "MGA-licensed casino with 2,000+ slots and live games; Irish players can use EUR banking, PayPal, and card deposits.",
  "shortDescriptionIntl": {
    "germany": "MGA-lizenziertes Casino mit über 2.000 Slots und Live-Spielen; Kartenzahlung und gängige E-Wallets.",
    "denmark": "MGA-licenseret casino med 2.000+ spil; kort og e-wallets til indbetaling.",
    "finland": "MGA-lisensoitu kasino, yli 2 000 peliä; kortti- ja e-lompakkotalletukset.",
    "norway": "MGA-lisensiert casino med 2 000+ spill; kort og e-lommebøker for innskudd.",
    "sweden": "MGA-licensierat casino med 2 000+ spel; kort och e-plånböcker för insättning."
  },
  "license": "UK Gambling Commission (52894); MGA B2C/370/2017 — verify current status before publish",
  "depositMethods": ["Visa", "Mastercard", "PayPal", "Skrill", "Neteller", "Bank transfer"],
  "withdrawalMethod": ["Visa", "Mastercard", "PayPal", "Skrill", "Neteller", "Bank transfer"],
  "payoutLimits": null,
  "payoutTimes": [
    "E-wallets: within 24 hours",
    "Cards: 2-4 business days",
    "Bank transfer: 3-5 business days"
  ],
  "software": ["NetEnt", "Microgaming", "Evolution", "Pragmatic Play", "Play'n GO"],
  "availableInCountries": {
    "ireland": "",
    "germany": "",
    "finland": ""
  },
  "backgroundColor": {
    "hex": "#040274"
  },
  "logo": {
    "asset": {
      "url": "/casino-logos/dream-vegas-logo.png",
      "altText": "Dream Vegas Casino"
    }
  },
  "bonuses": [
    {
      "name": "Welcome Bonus",
      "code": null,
      "description": "100% match + free spins on first deposit",
      "referralUrl": "/goto/dream-vegas.php"
    }
  ],
  "blocked": false,
  "listPlacement": {
    "marketCasinoLists": ["ireland", "finland"],
    "suggestedPages": ["home-page", "paypal-casino", "fast-payout-casinos"],
    "avoidPages": ["minimum-deposit-casinos"],
    "reason": "Strong PayPal + card stack; min deposit above €10 threshold."
  },
  "researchNotes": [
    "Payments page checked 2026-07-27; PayPal visible for IE.",
    "No Swedish licence — do not add to sweden market list."
  ],
  "verifiedAt": "2026-07-27"
}
```

### Field rules

| Field | Rule |
| ----- | ---- |
| `slug` | Lowercase, hyphens, unique on site; must match folder name |
| `referralUrl` | `/goto/<slug-no-hyphens-or-with-hyphens>.php` — match existing `/goto/` pattern in repo |
| `availableInCountries` | Include only verified markets; value is `""` (presence = listed) |
| `shortDescriptionIntl` | Only keys for markets in `availableInCountries` |
| `rating` | Number 1.0–5.0; one decimal |
| `depositMethods` / `withdrawalMethod` | Title case strings; use `PayPal`, `Visa`, `Mastercard`, `Bank transfer`, `Trustly`, `Revolut Pay`, crypto tickers if named |
| `bonuses[0]` | Primary welcome offer; `code` null if none public |
| `logo.asset.url` | Placeholder path `/casino-logos/<slug>-logo.png` — asset added separately |
| `blocked` | `true` only if brand must not be promoted (regulatory / affiliate block) |
| `listPlacement.marketCasinoLists` | Subset of `ireland`, `germany`, `denmark`, `finland`, `norway`, `sweden` |
| `listPlacement.suggestedPages` | Page dir names under `src/data/content/pages/` |

---

## `meta.json` template (for editor)

After research, create `src/data/content/casinos/<slug>/meta.json`:

```json
{
  "_id": "<generate-uuid>",
  "_createdAt": "<ISO-8601>",
  "_updatedAt": "<ISO-8601>",
  "casinoName": "<from research>",
  "slug": "<from research>",
  "rating": 4.5,
  "shortDescription": "<from research>",
  "shortDescriptionIntl": { },
  "referralUrl": "/goto/<slug>.php",
  "payoutLimits": null,
  "payoutTimes": [],
  "software": [],
  "depositMethods": [],
  "withdrawalMethod": [],
  "license": "<from research>",
  "userRecommendationsRecommendedNumber": null,
  "userRecommendationsTotalNumber": null,
  "availableInCountries": { },
  "backgroundColor": { "hex": "#1a1a1a" },
  "logo": {
    "asset": {
      "url": "/casino-logos/<slug>-logo.png",
      "altText": "<casinoName>"
    }
  },
  "bonuses": [
    {
      "_id": "<generate-uuid>",
      "name": "Welcome Bonus",
      "code": null,
      "codeIntl": null,
      "description": "<from research>",
      "descriptionIntl": null,
      "referralUrl": "/goto/<slug>.php",
      "bonusBackgroundColor": null,
      "bonusLogo": null
    }
  ],
  "blocked": false
}
```

Register in `_index.json`:

```json
{
  "id": "<same-uuid-as-_id>",
  "slug": "<slug>",
  "dir": "casinos/<slug>"
}
```

---

## Task message

```
Research casino list-card data for PpCasinos.co (NO full review page).

Casino to research: <brand name or URL>
Target markets (if known): <ireland | germany | denmark | finland | norway | sweden | all>
List context (if known): <e.g. PayPal casinos IE, Revolut FI, fast payout>

Tasks:
1. Confirm which of our 6 markets may legally/realistically play here.
2. Fill payment methods, licence, payout times, welcome bonus, software, short descriptions.
3. Suggest marketCasinoLists + suggestedPages (home-page, paypal-casino, revolut-casinos, fast-payout-casinos, mobile-casinos, minimum-deposit-casinos, new-casinos).
4. Flag anything that should block publish (no licence evidence, geo-restricted, bonus unverifiable).

Return JSON matching the schema in casino-list-research.md first, then source URLs.
```

### Batch variant

```
Research list-card data for these casinos (no review pages):

1. <brand A> — markets: <...>
2. <brand B> — markets: <...>

Return a JSON array of objects (same schema). One object per casino.
```
