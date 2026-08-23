# Kimi: PayPal payments shortlist — write + QA

Repo: `paypal-casino`. Source of truth for methods/countries/licences/bonuses: `casinos-final-with-confirmed-bonuses.json`.
CMS slugs and `/goto/*.php` must exist under `src/data/content/casinos/<slug>/meta.json`.
Copy lives in `src/lib/i18n/copies/paypal-payments.ts` (one object per locale: `en-IE`, `da-DK`, `fi-FI`, `sv-SE`, `nb-NO`, `de-DE`).
UI: `src/components/Pages/sections/IrelandPaymentsEditorial.astro` (renders on every Paypal Casino locale via `WebsitePageSections.astro`).
Do not invent deposit clocks, “funds arrived at 08:47”, or “we sent €25 on Tuesday” unless the user supplies a real test log.

---

## Prompt 1 — Write `body` and `frictionBody` (first-hand texture)

You are filling `casinos[].body` and `casinos[].frictionBody` in `paypal-payments.ts`.

Rules:
- Keep `name`, `rating`, `methods`, `ctaSlug`, `reviewSlug`, `logoBgColor` unless JSON/CMS disagree.
- `body`: 90–140 words, locale language of that object (Irish English, Danish, Finnish, Swedish, Norwegian Bokmål, German). Cover: licence (name + number if in JSON), PayPal deposit vs withdrawal (JSON uses `depositMethods` and sometimes `paymentMethods`; withdrawals may omit PayPal), market country code, one bonus card for that country if `countryRelated` exists, one concrete downside.
- `frictionBody`: 1–2 sentences. Prefer JSON notes (`_confidence`, wagering, same-day withdrawal fee, Skrill/Neteller bonus exclusion, Anjouan vs Spelinspektionen, slug mismatch). No fake KYC anecdotes.
- If JSON and CMS conflict (e.g. `rollingslots` vs `rolling-slots-casino`, MGA vs Curaçao), say the conflict; do not pick a side without a live cashier check.
- Germany: only CMS+JSON overlap today is PlayOJO. Do not add Ahti Games, RedKings, SlotsMagic, DrückGlück, BacanaPlay, TurboNino until each has a CMS `meta.json` + logo + `referralUrl`.
- Ireland: do not put Dream Vegas IE bonus figures live without a cashier check (JSON marks IE as inferred from FI, medium confidence).
- Sweden: do not put Pop Casino on this PayPal list (no PayPal). Contrast belongs in page MDX only.
- After edits, every `reviewSlug` must match a folder in `src/data/content/casinos/` and `ctaSlug` must match that folder’s `referralUrl`.

Current slugs per locale (do not swap without re-checking JSON `supportedCountries` + PayPal):
- en-IE: playojo, casimba, theonlinecasino, vegasmobilecasino
- da-DK: video-slots, luna-casino, swiftcasino
- fi-FI: playojo, casimba, dream-vegas, vegasmobilecasino
- sv-SE: video-slots, spinlander-casino, rollingslots
- nb-NO: need-for-spin-casino, spinlander-casino, rollingslots
- de-DE: playojo

---

## Prompt 2 — QA all created payments copy

Audit `src/lib/i18n/copies/paypal-payments.ts` and `paypal-payments-types.ts`.

For each locale object:
1. Language: strings are in the market language (not leftover English except brand names, PayPal, licence codes).
2. Count: 3–4 casinos except DE (1 is correct until GGL brands are in CMS) and DK/SE/NO if JSON+CMS truly has fewer than 4 PayPal hits.
3. PayPal: in JSON, `depositMethods` or `paymentMethods` has PayPal/Paypal for that slug.
4. Country: `supportedCountries` contains IE / DK / FI / SE / NO / DE as appropriate. Flag `rollingslots` if only the JSON sister slug has the country.
5. CMS: `reviewSlug` exists; `ctaSlug` equals `referralUrl`; logo file in `public/` via CMS `logo.asset.url`.
6. No Monster Casino, Winshark, Yukon Gold, Flagman, LuckyDreams, Just Casino, Legzo, Let's Lucky, Pop Casino on PayPal lists.
7. No fabricated timestamps or euro deposit diaries.
8. Methodology stats match the number of `casinos` in that locale.
9. `ireland-payments.ts` only re-exports; no second source of casino cards.
10. `WebsitePageSections.astro` shows the editorial for every `pageName === "Paypal Casino"` locale, not Ireland only.

Return a table: locale, slug, PayPal in JSON (Y/N), country in JSON (Y/N), CMS (Y/N), body invents tests (Y/N), notes.
