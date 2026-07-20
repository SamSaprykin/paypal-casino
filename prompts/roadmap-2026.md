# Content prompts roadmap — aligned with `ppcasinos-content-plan-2026.md`

Quick index of agent prompts under `prompts/`. Run **one locale per generation** unless the task says otherwise.

## Priority order (from content plan)

| Phase        | Task                                                 | Prompt file                                             |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------- |
| **Now**      | Finish Fast payout + Mobile stubs (DE → FI/SE/NO/DK) | `fast-payout-casinos-page.md`, `mobile-casinos-page.md` |
| **QA**       | Enhance + spell-check Home Page (all 6 locales)      | `home-page.md`                                          |
| **Week 2**   | Minimum deposit casinos                              | `minimum-deposit-casinos-page.md`                       |
| **Week 2**   | Live casino + PayPal                                 | `live-casino-paypal-page.md`                            |
| **Week 3**   | Trustly & bank transfer                              | `trustly-casinos-page.md`                               |
| **Week 3**   | Revolut casinos                                      | `revolut-casinos-page.md`                               |
| **Week 4**   | Skrill & Neteller                                    | `skrill-neteller-casinos-page.md`                       |
| **Week 4**   | Crypto deposits                                      | `crypto-casinos-page.md`                                |
| **Week 5**   | No deposit / free spins hub                          | `no-deposit-bonus-page.md`                              |
| **Week 5**   | Wagering requirements guide                          | `wagering-requirements-page.md`                         |
| **Existing** | Blocked casinos localisation                         | `blocked-casinos-page.md`                               |

## New page workflow

1. Read `new-page-scaffold.md` — create folder, `meta.json`, `_index.json` entry, Ireland stub.
2. Run the page-specific prompt for Ireland (full English).
3. Localise DE, then DK/FI/NO/SE one at a time.

## Home page workflow

1. Run `home-page.md` per locale (suggested: DK → FI → NO → SE → DE → IE).
2. Focus: native spell-check, remove English bleed, fix links, keep legacy section UUIDs.

## MDX components note

- **Home page:** Content lives in YAML `bodyMarkdown` — use HTML callouts (`div.info-card`, etc.) unless refactoring to `mdxPath`.
- **New commercial pages:** Same frontmatter pattern as `mobile-casinos/ireland.mdx`.
- **Optional:** React components in `src/mdx-components.ts` (`InfoArticle`, `StepCard`, …) only when content is true MDX body, not YAML strings.
