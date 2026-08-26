# PayPal Casino Articles — Research Checklist

Purpose: these articles currently read as thin because most of the "authority" content (specific numbers, legal claims, license status) is either unverified, outdated, or borrowed from general knowledge instead of confirmed against a primary source. This is a working list of what to actually go and check before the next content pass. Nothing here should be filled in with best-guess or invented data — leave a TODO in the article rather than a plausible-sounding number.

---

## 0. Fix before anything else (blocking issues)

- [ ] **Reconcile the Germany casino list.** Article: Yukon Gold, BitStarz, Stake, Kukimuki. Copy component (`paypal-payments-copy.ts`): PlayOJO only. Decide which set was actually tested/verified and delete the other.
- [ ] **Reconcile the Sweden casino list.** Article: Video Slots, Spinlander, Pop Casino. Copy component: Video Slots, Spinlander, Rolling Slots. Same call needed.
- [ ] **Decide whether any of this content was genuinely hands-on tested.** If not, every "we deposited / we withdrew / it took X hours" sentence across all locales (article + copy file) needs to be rewritten as sourced/documented language instead of first-person testing claims. This affects trust and, for gambling-payment content specifically, real financial decisions readers make.

---

## 1. Cross-locale research (do once, reuse everywhere)

### Licensing — verify each operator against the primary register, not third-party aggregators

- [ ] MGA license lookup: https://www.mga.org.mt/support/online-gaming-licence-verification/ — confirm license number, status (active/suspended), and legal entity name for every casino mentioned in any locale.
- [ ] UKGC public register: https://www.gamblingcommission.gov.uk/public-register — same check.
- [ ] Curaçao license verification (note: Curaçao moved to a new licensing framework in 2024 under the Curaçao Gaming Authority — confirm which regime each "Curaçao" casino actually falls under, since older GBL Solutions-style master license numbers may no longer be current).
- [ ] Anjouan Gaming Authority — confirm this body still issues/recognizes the license numbers cited (Anjouan licensing has been unstable/controversial; verify the license is still considered valid, not just historically issued).
- [ ] For every operator, confirm current company/brand ownership. Igaming brands change hands or get folded into other operator groups; a license check from a few months ago can be stale.

### PayPal itself

- [ ] Pull PayPal's own current fee schedule for each currency corridor (EUR, DKK, SEK, NOK) from PayPal's official fee pages, rather than the generic "2.5–4%" figure reused across all five articles. PayPal publishes exact currency conversion spreads by country — use the real number.
- [ ] Confirm PayPal's current merchant-category policy on gambling. PayPal periodically changes which gambling operators/regions it will process for; this affects which "PayPal casinos" claims are even still current.
- [ ] Confirm minimum/maximum transaction limits PayPal itself imposes, separate from casino-imposed limits (articles currently blend the two).

### Comparative payment-method data

- [ ] Find a real source (e.g., a national payments association report, Statista, or the relevant gambling regulator's annual report) for e-wallet vs. bank-transfer vs. card usage share among online gamblers in each market. Right now "moderat," "høy," "vanligt" etc. are unsourced editorial impressions.

---

## 2. Denmark (da-DK)

- [ ] Confirm Spillemyndigheden license numbers currently listed (18-0650512 for Video Slots) against the official register: https://www.spillemyndigheden.dk
- [ ] Verify Luna Casino's and Swiftcasino's actual DK market status — article says Luna has "no confirmed DKK welcome bonus" and Swiftcasino's Danish licensing is unconfirmed. Either confirm it or drop the casino if it can't be substantiated.
- [ ] Get current ROFUS scope details directly from rofus.nu — confirm the claim that ROFUS only covers Spillemyndigheden-licensed operators is still accurate and hasn't been expanded.
- [ ] Verify MobilePay's actual availability (or lack of it) on real casino cashiers — the article asserts it's "sjælden" on international casino sites; confirm this rather than assume.
- [ ] Check whether Denmark has updated gambling tax rules for operators in 2025–2026 that might affect what bonuses can legally look like (Denmark taxes operators, not players, but bonus structure rules do change).

## 3. Finland (fi-FI)

- [ ] Get a current status update on Finland's gambling monopoly reform (Veikkauksen monopoli päättymässä) — confirm the actual target date/status for the new licensing model as of August 2026; this is a live, moving political process and the article treats it vaguely.
- [ ] Confirm Peluuri's actual scope of self-exclusion — verify directly with peluuri.fi whether their national exclusion register (if any exists in this form) covers only Veikkaus or has broader reach, since this claim needs a primary-source check.
- [ ] Confirm current MGA/UKGC license validity for Dream Vegas, PlayOJO, Vegas Mobile Casino, and Casimba (all White Hat Gaming / Skill On Net / Progress Play brands — check for any brand consolidation).
- [ ] Verify the Finnish tax treatment claims (EU/EEA-licensed winnings tax-free, Curaçao-licensed technically taxable) against current Vero.fi guidance — tax authority guidance is the only acceptable source for this, not general knowledge.
- [ ] Check whether Trustly's real average payout time in Finland is actually "0–5 tuntia" — this looks unsourced.

## 4. Germany (de-DE)

- [ ] This is the highest-priority locale to fix: verify current GlüStV 2021 limits directly against GGL (Gemeinsame Glücksspielbehörde der Länder) official guidance — the 1 €/spin limit, autoplay ban, and 1.000 €/month deposit limit are all real GlüStV features in general, but confirm current figures/exceptions (e.g., whether the deposit limit is per-operator or cross-operator via LUGAS, and current LUGAS enrollment status for the market).
- [ ] Confirm OASIS's actual current scope and whether cross-operator deposit limit tracking (LUGAS) has any bearing on non-GGL-licensed operators — the article's claim that OASIS "doesn't apply" to MGA/Curaçao operators needs a citation from gluecksspiel-behoerde.de.
- [ ] Verify current license status and any regulatory actions against Yukon Gold, BitStarz, Stake, and Kukimuki (or whichever casino list is retained after the reconciliation above) — Stake in particular has faced regulatory scrutiny in multiple jurisdictions and this should be checked, not assumed clean.
- [ ] Confirm PayPal's actual current stance on facilitating deposits to non-GGL-licensed gambling sites for German users — this is a compliance-sensitive claim that shouldn't be stated without a current source.
- [ ] Double check EU/EEA tax-free winnings claim against current German tax code (Einkommensteuergesetz) guidance — "in der Regel steuerfrei" is asserted without a source.

## 5. Norway (nb-NO)

- [ ] Verify the "banks block gambling transactions" claim against the current Norwegian betalingsformidlingsloven / Lotteritilsynet guidance — confirm this is still active policy in 2026 and get the correct legal citation instead of the informal description currently in the article.
- [ ] Confirm Need for Spin's and Spinlander's current license status (Curaçao Gaming Control Board / Anjouan) and NO market inclusion — these change more often than the article implies.
- [ ] Get current data on how effective the bank-blocking actually is in practice (Lotteritilsynet or Finanstilsynet may publish enforcement/effectiveness figures) — right now the article presents PayPal as a reliable workaround without evidence of how consistently that holds.
- [ ] Confirm Norwegian tax authority (Skatteetaten) guidance on foreign gambling winnings is accurately summarized — cite the actual Skatteetaten page rather than paraphrasing from memory.

## 6. Sweden (sv-SE)

- [ ] Confirm Video Slots' dual SE/DK license numbers (18Li7373 / 18-0650512) against Spelinspektionen's public register: https://www.spelinspektionen.se
- [ ] Verify Pop Casino's current status as a Pay N Play, Spelinspektionen-licensed operator with no PayPal — or, if the article keeps Rolling Slots instead per the reconciliation decision, verify Rolling Slots' license claims (the source article already flags these as contradictory between Curaçao and MGA — this needs to be resolved with a primary source, not left as "vi hittade motstridiga uppgifter").
- [ ] Confirm Spinlander's Anjouan license is still active and get the current registration status.
- [ ] Confirm Spelpaus's actual scope directly from spelinspektionen.se/spelpaus — the "licensed operators only" claim is almost certainly correct but should be sourced.
- [ ] Verify Swedish tax-free winnings claim (EU/EEA-licensed) against Skatteverket guidance directly.

---

## 7. Structural upgrades worth doing once research above is done

- [ ] Replace the commented-out image blocks with actual screenshots: cashier screens showing PayPal listed under both deposit and withdrawal, and license badge screenshots from the operator's own footer.
- [ ] Add outbound citation links next to every regulatory or legal claim (license registers, tax authority pages, self-exclusion scheme homepages) rather than stating them as unsourced fact.
- [ ] Add a visible "last verified" date per claim category (licensing, bonus terms, fees) instead of one single freshness date for the whole article — license status and bonus T&Cs go stale at different rates.
- [ ] Once the casino-list reconciliation is done, make sure the article and the `paypal-payments-copy.ts` component pull from a single source of truth rather than being maintained as two separate hand-written lists that can drift apart again.
