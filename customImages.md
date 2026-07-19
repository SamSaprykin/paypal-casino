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

## Totals

- **60 locale files** (10 subjects × 6 markets) — preferred for unique SEO URLs
- **+10 shared fallbacks** (optional) if you want a safety net while generating per-locale art

Meta `src` stays as the base name (e.g. `new-casinos-hero.webp`); `CustomImage` picks `{name}.{suffix}.webp` when present.
