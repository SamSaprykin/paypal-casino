# Content locale audit (2026-08-03)

Review of `src/data/content/` casino reviews and guide pages across `denmark`, `finland`, `germany`, `norway`, and `sweden`.

## Meta title / description (fixed)

**Root cause:** `CasinoDetailPage.astro` falls back to English when MDX has no `seo` block:

- Title: `{CasinoName} Review - PayPal Casino Reviews`
- Description: `Read our {CasinoName} review — …` (if shortDescription is also missing)

That produced English meta on localized reviews (e.g. Denmark Trickz/Tsars).

### Fixed — added localized `seo.seoTitle` / `seo.seoDescription`

| File | Locale |
|------|--------|
| `casinos/trickz/denmark.mdx` | da |
| `casinos/trickz/norway.mdx` | nb |
| `casinos/tsars/denmark.mdx` | da |
| `casinos/tsars/norway.mdx` | nb |
| `casinos/rollingslots/finland.mdx` | fi |
| `casinos/rollingslots/germany.mdx` | de |
| `casinos/rollingslots/norway.mdx` | nb |
| `casinos/rollingslots/sweden.mdx` | sv |
| `casinos/klirr-casino/sweden.mdx` | sv |
| `casinos/pop-casino/sweden.mdx` | sv |

### Guide pages

All non-Ireland page MDX files already have localized `seoTitle` / `seoDescription`. None matched Ireland English SEO.

### Still missing SEO (Ireland only — English fallback is OK)

- `casinos/trickz/ireland.mdx`
- `casinos/tsars/ireland.mdx`
- `casinos/rollingslots/ireland.mdx`

---

## Content issues to fix later (body / bonuses / meta)

Not changed in this pass — documented for follow-up.

### 1. Body vs `meta.json` bonus mismatch

Review body amounts disagree with card/bonus `descriptionIntl` (and sometimes with FAQ in the same MDX).

| Casino | Locales | Meta bonus | Body claims |
|--------|---------|------------|-------------|
| **rollingslots** | fi, de, no, se | ~500 + 200 FS | **300% up to €3,500 + 550 FS** |
| **trickz** | dk, no | ~500 + 200 FS | Pros: **10.000 kr + 200 FS**; FAQ often different again |
| **tsars** | dk, no | ~2.000 + 200 FS | Facts table: **15.000 kr + 200 FS** |
| **vegas-hero** | fi, no | ~100 + 50 FS | Body: **€500 + 200 FS** |
| **vincispin** | fi, no | ~500 + 100 FS | Body/H1: **€3 000 + 350 FS** |
| **wonderluck** | fi, no | ~500 + 200 FS | Intro package totals much higher than table row |
| **50-crowns** | de | 100% up to 5.000 NOK + 100 FS | Body: **€500 + 100 FS** (currency/market mismatch) |
| **villento** | de | $125 free bonus | Body: **up to €1,000** package |

**Action:** Align body, FAQ, SEO, and `bonuses[].descriptionIntl` to one source of truth per casino/locale.

### 2. English fragments inside localized review bodies

| File | Issue |
|------|--------|
| `rollingslots/sweden.mdx` | Pros/bonus line still says **“550 free spins”** (English) |
| Several reviews | Brand strings like “Welcome Shark”, “Vinyl Shop”, “Pay N Play” (OK as product names) mixed with otherwise local copy |

### 3. Bonuses missing on cards

These casinos have `bonuses: null` in `meta.json` (no listing/card bonus; some still have reviews):

`boho-casino`, `coolzino`, `corgibet`, `frank-fred`, `greatwin`, `jubla-casino`, `just-casino`, `klirr-casino`, `kukimuki`, `lets-lucky`, `luckydreams`, `pop-casino`, `slotbox`, `slots-gallery`, `stake`

Klirr / Pop reviews correctly say there is **no welcome bonus** (Swedish licence) — keep cards empty or add an explicit “no bonus” label if product wants it.

### 4. Bonus `name` always English in raw meta

All ~86 bonus entries use English `name` (e.g. `"Welcome Bonus"`) with **no `nameIntl`**. Runtime falls back via `BONUS_CATEGORY_LABELS` for common categories — verify edge names (`Level Up Rewards`, `Midweek Reload`, `Cashback`) render correctly in every market.

### 5. Shared English-only meta fields (show on all locales)

Often still English in `meta.json`:

- `payoutLimits` (e.g. `Up to €30,000/month`)
- `payoutTimes` (e.g. `PayPal/E-wallets: Minutes-24h`)
- `license` long English strings

These appear on casino detail/cards unless UI hides them. Prefer `*Intl` maps or locale-aware formatting.

### 6. Copy typos in localized `shortDescriptionIntl`

| Casino | Locale | Issue |
|--------|--------|--------|
| `trickz` | sweden | `utan kr ångel` → should be `utan krångel` |
| `tsars` | denmark | `pakke på2.000 kr` → missing space (`på 2.000`) |
| `tsars` | sweden | same missing-space pattern (`på2 000`) |

### 7. FAQ accuracy / licensing claims in bodies

Some localized FAQs claim national licensing that may not match `meta.json` licence (e.g. Trickz/Tsars FAQ wording vs Anjouan/MGA). Worth a legal/editorial pass separate from SEO.

### 8. Coverage gaps (not wrong language — missing pages)

- ~81 casinos are `meta.json` only (listing cards, no review MDX).
- Denmark casino **reviews** exist only for: `trickz`, `tsars`, `winshark`.
- Norway missing guide: `pages/crypto-casinos/norway.mdx`.

---

## Checklist for next content pass

1. Reconcile bonus figures (body ↔ FAQ ↔ `descriptionIntl` ↔ SEO).
2. Translate leftover English body phrases (e.g. Rolling Slots SE “free spins”).
3. Fix `shortDescriptionIntl` typos (Trickz SE, Tsars DK/SE).
4. Decide Intl strategy for `payoutLimits` / `payoutTimes` / bonus `name`.
5. Optional: add Ireland `seo` blocks for Trickz, Tsars, Rollingslots (quality, not locale bug).
6. Optional: harden `CasinoDetailPage.astro` fallbacks to use `CASINO_DETAIL_PAGE_COPY[locale]` so missing SEO never emits English on non-EN markets.
