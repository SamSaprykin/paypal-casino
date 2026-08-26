# Home page research pack — locale: `<ireland|germany|denmark|finland|norway|sweden>`

Copy this file to `prompts/research/home-<locale>.md` and fill every field. The implementer **must not invent** missing facts. Use `unknown` when not verified.

**Verified at:** YYYY-MM-DD  
**Researcher:**  
**Primary sources used:** (operator cashier, licence register, regulator, help org — URLs)

---

## 1. Market angle (one sentence)

- Ireland: payment-methods comparison hub (PayPal, crypto, Neteller, cards).
- Germany: GGL-licensed vs MGA/international; PayPal & Trustly.
- Denmark: Spillemyndigheden / ROFUS; MobilePay vs PayPal vs Trustly.
- Finland: international MGA vs domestic context; Trustly / MobilePay vs PayPal.
- Norway: bank blocks / offshore — **no legal advice**; PayPal as intermediary.
- Sweden: Spelinspektionen / Spelpaus vs Swish/Trustly; PayPal rare on licensed SE.

**This locale angle:**

## 2. Regulator and player help (primary URLs only)

| Item                   | Name       | URL | Notes |
| ---------------------- | ---------- | --- | ----- |
| Regulator              |            |     |       |
| Self-exclusion / block |            |     |       |
| Help / RG org          |            |     |       |
| Age                    | 18+ or 19+ |     |       |

Do not invent licence numbers or fine amounts.

## 3. Payment mix

For each method that matters locally, fill. Evidence: `confirmed` (cashier/screenshot) | `operator-stated` | `unknown`.

| Method                        | Deposit speed | Withdraw speed | Fees | Bonus eligible | Evidence | Source URL / screenshot file |
| ----------------------------- | ------------- | -------------- | ---- | -------------- | -------- | ---------------------------- |
| PayPal                        |               |                |      |                |          |                              |
| Trustly                       |               |                |      |                |          |                              |
| Revolut (card vs Revolut Pay) |               |                |      |                |          |                              |
| Visa/Mastercard debit         |               |                |      |                |          |                              |
| Crypto / stablecoin           |               |                |      |                |          |                              |
| Skrill / Neteller             |               |                |      |                |          |                              |
| Swish (SE)                    |               |                |      |                |          |                              |
| MobilePay (DK/FI)             |               |                |      |                |          |                              |
| BankID (SE/NO/FI)             |               |                |      |                |          |                              |
| Bank transfer                 |               |                |      |                |          |                              |

## 4. Casino list check

Compare `src/data/content/pages/home-page/meta.json` → `casinoListsByCountry.<locale>`.

| Slug | Still valid for this market? | PayPal in cashier? | Notes |
| ---- | ---------------------------- | ------------------ | ----- |
|      | yes / no / unknown           |                    |       |

Do **not** invent a new ranking order. Flag removals only.

## 5. Claims that need screenshots (EEAT)

Tick when the file exists under `src/images/content/` with locale suffix (`.ie` `.de` `.dk` `.fi` `.no` `.se`).

- [ ] `home-hero.{locale}.webp`
- [ ] `home-cashier-paypal.{locale}.webp`
- [ ] `home-cashier-local.{locale}.webp` (Trustly / Swish / MobilePay)
- [ ] `home-withdraw-status.{locale}.webp`
- [ ] `home-bonus-tnc.{locale}.webp` (e-wallet bonus exclusion)
- [ ] `home-licence-footer.{locale}.webp`
- [ ] `home-kyc.{locale}.webp`
- [ ] `home-rg-tools.{locale}.webp`

## 6. Internal links + one-line teaser per page

Home is the hub. For each destination, write **one sentence** the implementer can use (native language later) and the exact href from `src/data/content/pages/_index.json` / `prompts/home-page.md`. Skip any page with no slug for this locale (crypto has no Norway entry).

**Header — Casino types**

| Page        | Href | One-line teaser (what the page does)         |
| ----------- | ---- | -------------------------------------------- |
| New casinos |      | Recently listed brands — not a payment guide |
| Fast payout |      | Withdrawal speed and KYC delays              |
| Mobile      |      | Phone/tablet cashier and play                |
| Min deposit |      | €1 / €5 / €10 first deposits                 |

**Header — Payments**

| Page    | Href | One-line teaser                              |
| ------- | ---- | -------------------------------------------- |
| PayPal  |      | Full PayPal cashier + which brands accept it |
| Revolut |      | Card / Revolut Pay — not a PayPal wallet     |
| Crypto  |      | BTC/ETH/stablecoins — skip if no locale URL  |

**Header — Offers**

| Page    | Href | One-line teaser                |
| ------- | ---- | ------------------------------ |
| Bonuses |      | Wagering and method exclusions |

**Also link**

| Page              | Href | One-line teaser            |
| ----------------- | ---- | -------------------------- |
| Blocked casinos   |      | Brands we paused promoting |
| Rating guidelines |      | How we score casinos       |

## 7. FAQ seeds (questions only; answers from this pack)

1.
2.
3.
4.

## 8. Forbidden unless evidenced

- “We tested on DATE” timestamps
- Licence numbers, fines, scandals
- Copying another geo’s payment table
- Duplicating the PayPal page operator reviews onto Home
