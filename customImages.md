# CustomImages to add

Drop files into `src/images/content/`.

**Naming (locale-specific for SEO):**

- Shared fallback: `{name}.webp` (used if a locale file is missing)
- Per market: `{name}.{suffix}.webp`

| Market  | Suffix |
| ------- | ------ |
| Ireland | `ie`   |
| Germany | `de`   |
| Denmark | `dk`   |
| Finland | `fi`   |
| Norway  | `no`   |
| Sweden  | `se`   |

Example: `new-casinos-hero.de.webp` for Germany; falls back to `new-casinos-hero.webp` if missing.

Preferred: `.webp`, ~1600×900 (16:9), under ~250 KB. Bake market language/currency into the art where it helps SEO uniqueness. Alt/caption stay localized in each page MDX.

Until a file exists, `<CustomImage>` renders nothing — the build stays green.

Each image has a human-readable **imageName** (what the asset depicts), a **src** file name, and an **imageType** (`stock`, `ai-generated`, or `screenshot`). Names live in `meta.json` (`name` field), MDX comments (`# imageName:`), and the registry below.

### Master image registry

| ID | imageName | src | imageType |
| --- | --- | --- | --- |
| `hp-img-hero` | Home Page Payment Methods Hero | `home-page-hero.webp` | ai-generated |
| `hp-img-comparison` | Payment Speed Comparison Chart | `home-page-payment-comparison.webp` | stock |
| `hp-img-trust` | PayPal Cashier Deposit Screen | `home-page-paypal-deposit.webp` | screenshot |
| `pp-img-hero` | PayPal Casino Hero | `paypal-casino-hero.webp` | ai-generated |
| `pp-img-cashier` | PayPal Cashier Deposit And Withdrawal Screen | `paypal-casino-cashier.webp` | screenshot |
| `pp-img-security` | PayPal Trust And Licence Badges | `paypal-casino-security.webp` | stock |
| `bc-img-hero` | Blocked Casino Paused Promotion Hero | `blocked-casinos-hero.webp` | stock |
| `bc-img-warning` | Blocked Casino Reasons Checklist | `blocked-casinos-warning.webp` | stock |
| `bc-img-alternatives` | Choosing Licensed Alternative Casino | `blocked-casinos-alternatives.webp` | ai-generated |
| `fp-img-hero` | Fast Payout Hero | `fast-payout-hero.webp` | ai-generated |
| `fp-img-payments` | Withdrawal Speed By Payment Method | `fast-payout-payments.webp` | stock |
| `fp-img-cashier` | Casino Withdrawal Cashier Screen | `fast-payout-cashier.webp` | screenshot |
| `mc-img-hero` | Mobile Casino Phone Hero | `mobile-casinos-hero.webp` | ai-generated |
| `mc-img-mobile-play` | Player On Smartphone Playing Slots | `mobile-casinos-mobile-play.webp` | stock |
| `mc-img-cashier` | Mobile PayPal Cashier Screen | `mobile-casinos-cashier.webp` | screenshot |
| `nc-img-hero` | New Casinos Launch Hero | `new-casinos-hero.webp` | ai-generated |
| `nc-img-review` | New Casino Review Checklist | `new-casinos-how-we-review.webp` | stock |
| `nc-img-safety` | Safety And Licensing Checklist | `new-casinos-safety-checklist.webp` | stock |
| `nc-img-bonus` | Welcome Bonus Offer Visual | `new-casinos-welcome-bonus.webp` | ai-generated |
| `nc-img-mobile` | Mobile Play At New Casino | `new-casinos-mobile-play.webp` | stock |
| `bn-img-hero` | Casino Bonuses Guide Hero | `casino-bonuses-hero.webp` | ai-generated |
| `bn-img-welcome` | Welcome Deposit Match Offer | `casino-bonuses-welcome-offer.webp` | ai-generated |
| `bn-img-wagering` | Wagering Requirements Explainer | `casino-bonuses-wagering.webp` | stock |
| `bn-img-freespins` | Free Spins Slot Reels Burst | `casino-bonuses-free-spins.webp` | ai-generated |
| `bn-img-cashback` | Cashback And VIP Loyalty Tiers | `casino-bonuses-cashback-vip.webp` | stock |

Source of truth script: `scripts/add-image-names.mjs` (also updates meta + MDX).

---

## New Casinos (`pages/new-casinos/`)

### new-casinos-hero — Hero collage of freshly launched casino logos / 2026 theme

{new-casinos-hero.ie.webp}, Ireland — English hero, EUR cues
{new-casinos-hero.de.webp}, Germany — German market hero, EUR
{new-casinos-hero.dk.webp}, Denmark — Danish market hero, DKK/EUR
{new-casinos-hero.fi.webp}, Finland — Finnish market hero, EUR
{new-casinos-hero.no.webp}, Norway — Norwegian market hero, NOK/EUR
{new-casinos-hero.se.webp}, Sweden — Swedish market hero, SEK/EUR
{new-casinos-hero.webp}, Shared fallback (optional if all 6 locale files exist)

### new-casinos-how-we-review — Reviewer comparing casinos on laptop + checklist

{new-casinos-how-we-review.ie.webp}, Ireland — English review/checklist scene
{new-casinos-how-we-review.de.webp}, Germany — German review/checklist scene
{new-casinos-how-we-review.dk.webp}, Denmark — Danish review/checklist scene
{new-casinos-how-we-review.fi.webp}, Finland — Finnish review/checklist scene
{new-casinos-how-we-review.no.webp}, Norway — Norwegian review/checklist scene
{new-casinos-how-we-review.se.webp}, Sweden — Swedish review/checklist scene
{new-casinos-how-we-review.webp}, Shared fallback

### new-casinos-safety-checklist — License badges / padlock / safety checklist

{new-casinos-safety-checklist.ie.webp}, Ireland — safety & licensing (EN)
{new-casinos-safety-checklist.de.webp}, Germany — Sicherheit & Lizenz (DE)
{new-casinos-safety-checklist.dk.webp}, Denmark — sikkerhed & licens (DA)
{new-casinos-safety-checklist.fi.webp}, Finland — turvallisuus & lisenssi (FI)
{new-casinos-safety-checklist.no.webp}, Norway — sikkerhet & lisens (NO)
{new-casinos-safety-checklist.se.webp}, Sweden — säkerhet & licens (SV)
{new-casinos-safety-checklist.webp}, Shared fallback

### new-casinos-welcome-bonus — Welcome bonus / gift + coins

{new-casinos-welcome-bonus.ie.webp}, Ireland — welcome bonus visual (EN/EUR)
{new-casinos-welcome-bonus.de.webp}, Germany — Willkommensbonus (DE/EUR)
{new-casinos-welcome-bonus.dk.webp}, Denmark — velkomstbonus (DA)
{new-casinos-welcome-bonus.fi.webp}, Finland — tervetuliaisbonus (FI)
{new-casinos-welcome-bonus.no.webp}, Norway — velkomstbonus (NO)
{new-casinos-welcome-bonus.se.webp}, Sweden — välkomstbonus (SV)
{new-casinos-welcome-bonus.webp}, Shared fallback

### new-casinos-mobile-play — Player on smartphone at a new casino

{new-casinos-mobile-play.ie.webp}, Ireland — mobile play (EN)
{new-casinos-mobile-play.de.webp}, Germany — mobiles Spielen (DE)
{new-casinos-mobile-play.dk.webp}, Denmark — mobilspil (DA)
{new-casinos-mobile-play.fi.webp}, Finland — mobiilipelaaminen (FI)
{new-casinos-mobile-play.no.webp}, Norway — mobilspill (NO)
{new-casinos-mobile-play.se.webp}, Sweden — mobilspel (SV)
{new-casinos-mobile-play.webp}, Shared fallback

---

## Bonuses (`pages/casino-bonuses/`)

### casino-bonuses-hero — Bonus / gift boxes / coins hero

{casino-bonuses-hero.ie.webp}, Ireland — bonuses guide hero (EN)
{casino-bonuses-hero.de.webp}, Germany — Bonus-Guide Hero (DE)
{casino-bonuses-hero.dk.webp}, Denmark — bonusser hero (DA)
{casino-bonuses-hero.fi.webp}, Finland — bonukset hero (FI)
{casino-bonuses-hero.no.webp}, Norway — bonuser hero (NO)
{casino-bonuses-hero.se.webp}, Sweden — bonusar hero (SV)
{casino-bonuses-hero.webp}, Shared fallback

### casino-bonuses-welcome-offer — Welcome / deposit-match offer

{casino-bonuses-welcome-offer.ie.webp}, Ireland — welcome offer (EN/EUR)
{casino-bonuses-welcome-offer.de.webp}, Germany — Willkommensangebot (DE/EUR)
{casino-bonuses-welcome-offer.dk.webp}, Denmark — velkomsttilbud (DA)
{casino-bonuses-welcome-offer.fi.webp}, Finland — tervetuliaistarjous (FI)
{casino-bonuses-welcome-offer.no.webp}, Norway — velkomsttilbud (NO)
{casino-bonuses-welcome-offer.se.webp}, Sweden — välkomsterbjudande (SV)
{casino-bonuses-welcome-offer.webp}, Shared fallback

### casino-bonuses-wagering — Wagering / playthrough illustration

{casino-bonuses-wagering.ie.webp}, Ireland — wagering requirements (EN)
{casino-bonuses-wagering.de.webp}, Germany — Umsatzanforderungen (DE)
{casino-bonuses-wagering.dk.webp}, Denmark — omsætningskrav (DA)
{casino-bonuses-wagering.fi.webp}, Finland — kierrätysvaatimukset (FI)
{casino-bonuses-wagering.no.webp}, Norway — omsetningskrav (NO)
{casino-bonuses-wagering.se.webp}, Sweden — omsättningskrav (SV)
{casino-bonuses-wagering.webp}, Shared fallback

### casino-bonuses-free-spins — Slot reels / free spins burst

{casino-bonuses-free-spins.ie.webp}, Ireland — free spins (EN)
{casino-bonuses-free-spins.de.webp}, Germany — Freispiele (DE)
{casino-bonuses-free-spins.dk.webp}, Denmark — gratis spins (DA)
{casino-bonuses-free-spins.fi.webp}, Finland — ilmaiskierrokset (FI)
{casino-bonuses-free-spins.no.webp}, Norway — gratisspinn (NO)
{casino-bonuses-free-spins.se.webp}, Sweden — gratissnurr (SV)
{casino-bonuses-free-spins.webp}, Shared fallback

### casino-bonuses-cashback-vip — Cashback / VIP loyalty tiers

{casino-bonuses-cashback-vip.ie.webp}, Ireland — cashback & VIP (EN)
{casino-bonuses-cashback-vip.de.webp}, Germany — Cashback & VIP (DE)
{casino-bonuses-cashback-vip.dk.webp}, Denmark — cashback & VIP (DA)
{casino-bonuses-cashback-vip.fi.webp}, Finland — cashback & VIP (FI)
{casino-bonuses-cashback-vip.no.webp}, Norway — cashback & VIP (NO)
{casino-bonuses-cashback-vip.se.webp}, Sweden — cashback & VIP (SV)
{casino-bonuses-cashback-vip.webp}, Shared fallback

---

## Fast Payout Casinos (`pages/fast-payout-casinos/`)

Image slots are wired in `meta.json` (no `src` yet). Localized alt/caption live as **commented** `kind: image` blocks in each locale MDX — uncomment the block and set `src` in meta when the file is ready.

| ID | imageName | Suggested file | imageType | Placement |
| --- | --- | --- | --- | --- |
| `fp-img-hero` | Fast Payout Hero | `fast-payout-hero.webp` | ai-generated | After intro — hero collage (PayPal/e-wallet speed theme) |
| `fp-img-payments` | Withdrawal Speed By Payment Method | `fast-payout-payments.webp` | stock | After guide — payment-method speed comparison visual |
| `fp-img-cashier` | Casino Withdrawal Cashier Screen | `fast-payout-cashier.webp` | screenshot | After how-to — casino cashier withdrawal screen (blur PII) |

### fast-payout-hero — Hero: fast withdrawals / PayPal & e-wallets

{fast-payout-hero.ie.webp}, Ireland — EN hero, PayPal/Revolut cues
{fast-payout-hero.de.webp}, Germany — DE hero, PayPal/Trustly cues
{fast-payout-hero.dk.webp}, Denmark — DA hero, PayPal/Trustly/MobilePay
{fast-payout-hero.fi.webp}, Finland — FI hero, PayPal/Trustly
{fast-payout-hero.no.webp}, Norway — NO hero, Skrill/e-wallet
{fast-payout-hero.se.webp}, Sweden — SV hero, Swish/PayPal
{fast-payout-hero.webp}, Shared fallback

### fast-payout-payments — Stock: payment methods ranked by speed

{fast-payout-payments.ie.webp}, Ireland — EN payment-speed graphic
{fast-payout-payments.de.webp}, Germany — DE payment-speed graphic
{fast-payout-payments.dk.webp}, Denmark — DA payment-speed graphic
{fast-payout-payments.fi.webp}, Finland — FI payment-speed graphic
{fast-payout-payments.no.webp}, Norway — NO payment-speed graphic
{fast-payout-payments.se.webp}, Sweden — SV payment-speed graphic
{fast-payout-payments.webp}, Shared fallback

### fast-payout-cashier — Screenshot: mobile/desktop withdrawal cashier

{fast-payout-cashier.ie.webp}, Ireland — EN cashier screenshot (anonymised)
{fast-payout-cashier.de.webp}, Germany — DE cashier screenshot
{fast-payout-cashier.dk.webp}, Denmark — DA cashier screenshot
{fast-payout-cashier.fi.webp}, Finland — FI cashier screenshot
{fast-payout-cashier.no.webp}, Norway — NO cashier screenshot
{fast-payout-cashier.se.webp}, Sweden — SV cashier screenshot
{fast-payout-cashier.webp}, Shared fallback

---

## Mobile Casinos (`pages/mobile-casinos/`)

Same enable flow as fast payout: uncomment MDX block + add `"src": "…"` to the matching `meta.json` image entry.

| ID | imageName | Suggested file | imageType | Placement |
| --- | --- | --- | --- | --- |
| `mc-img-hero` | Mobile Casino Phone Hero | `mobile-casinos-hero.webp` | ai-generated | After intro — phone/tablet casino hero |
| `mc-img-mobile-play` | Player On Smartphone Playing Slots | `mobile-casinos-mobile-play.webp` | stock | After guide — player on phone (portrait slots/live) |
| `mc-img-cashier` | Mobile PayPal Cashier Screen | `mobile-casinos-cashier.webp` | screenshot | After how-to — mobile PayPal cashier (blur PII) |

### mobile-casinos-hero — Hero: mobile casino on phone/tablet

{mobile-casinos-hero.ie.webp}, Ireland — EN mobile hero
{mobile-casinos-hero.de.webp}, Germany — DE mobile hero
{mobile-casinos-hero.dk.webp}, Denmark — DA mobile hero
{mobile-casinos-hero.fi.webp}, Finland — FI mobile hero
{mobile-casinos-hero.no.webp}, Norway — NO mobile hero
{mobile-casinos-hero.se.webp}, Sweden — SV mobile hero
{mobile-casinos-hero.webp}, Shared fallback

### mobile-casinos-mobile-play — Stock: player using casino on smartphone

{mobile-casinos-mobile-play.ie.webp}, Ireland — EN mobile play scene
{mobile-casinos-mobile-play.de.webp}, Germany — DE mobile play scene
{mobile-casinos-mobile-play.dk.webp}, Denmark — DA mobile play scene
{mobile-casinos-mobile-play.fi.webp}, Finland — FI mobile play scene
{mobile-casinos-mobile-play.no.webp}, Norway — NO mobile play scene
{mobile-casinos-mobile-play.se.webp}, Sweden — SV mobile play scene
{mobile-casinos-mobile-play.webp}, Shared fallback

### mobile-casinos-cashier — Screenshot: mobile casino cashier / PayPal

{mobile-casinos-cashier.ie.webp}, Ireland — EN mobile cashier screenshot
{mobile-casinos-cashier.de.webp}, Germany — DE mobile cashier screenshot
{mobile-casinos-cashier.dk.webp}, Denmark — DA mobile cashier screenshot
{mobile-casinos-cashier.fi.webp}, Finland — FI mobile cashier screenshot
{mobile-casinos-cashier.no.webp}, Norway — NO mobile cashier screenshot
{mobile-casinos-cashier.se.webp}, Sweden — SV mobile cashier screenshot
{mobile-casinos-cashier.webp}, Shared fallback

---

## Home Page (`pages/home-page/`)

Commented placeholders in each locale MDX. Image slots in `meta.json` (no `src` yet).

| ID | imageName | Suggested file | imageType | Placement |
| --- | --- | --- | --- | --- |
| `hp-img-hero` | Home Page Payment Methods Hero | `home-page-hero.webp` | ai-generated | After intro — payment methods hero |
| `hp-img-comparison` | Payment Speed Comparison Chart | `home-page-payment-comparison.webp` | stock | After casino list — speed/fees comparison visual |
| `hp-img-trust` | PayPal Cashier Deposit Screen | `home-page-paypal-deposit.webp` | screenshot | After body — PayPal in casino cashier (blur PII) |

Per-locale files: `{name}.{ie\|de\|dk\|fi\|no\|se}.webp` + shared `{name}.webp` fallback.

---

## PayPal Casino (`pages/paypal-casino/`)

| ID | imageName | Suggested file | imageType | Placement |
| --- | --- | --- | --- | --- |
| `pp-img-hero` | PayPal Casino Hero | `paypal-casino-hero.webp` | ai-generated | After intro — PayPal casino hero |
| `pp-img-cashier` | PayPal Cashier Deposit And Withdrawal Screen | `paypal-casino-cashier.webp` | screenshot | After casino list — mobile/desktop cashier with PayPal |
| `pp-img-security` | PayPal Trust And Licence Badges | `paypal-casino-security.webp` | stock | After body — licence badges + PayPal trust cues |

---

## Blocked Casinos (`pages/blocked-casinos/`)

| ID | imageName | Suggested file | imageType | Placement |
| --- | --- | --- | --- | --- |
| `bc-img-hero` | Blocked Casino Paused Promotion Hero | `blocked-casinos-hero.webp` | stock | After intro — paused promotion concept |
| `bc-img-warning` | Blocked Casino Reasons Checklist | `blocked-casinos-warning.webp` | stock | After why section — reasons checklist |
| `bc-img-alternatives` | Choosing Licensed Alternative Casino | `blocked-casinos-alternatives.webp` | ai-generated | After how-to — picking a licensed alternative |

---

## New Casinos & Bonuses (already active)

`new-casinos` and `casino-bonuses` already have live `kind: image` sections with `src` in meta. Each locale MDX now includes an `# imageType:` comment above every image block. See sections above for file names.

---

## Totals

- **60 locale files** — new-casinos + casino-bonuses (10 subjects × 6 markets)
- **+18 locale files** — home-page, paypal-casino, blocked-casinos (3 subjects × 6 markets)
- **+18 locale files** — fast-payout + mobile (3 subjects × 6 markets)
- **+10+ shared fallbacks** (optional) while generating per-locale art
