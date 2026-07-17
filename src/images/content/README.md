# Content page images

Drop optimized images here (`.webp` preferred, also `.jpg/.png/.avif/.gif`).
They are rendered through `src/components/CustomImage.astro` and referenced by
**file name** from the page MDX `image` sections. If a file is missing the
`<CustomImage>` simply renders nothing, so the build never breaks while artwork
is still being produced.

The same file is reused across all 6 markets; only the `alt`/`caption` text is
localized (in each `<locale>.mdx`). Recommended size: ~1600×900 (16:9),
under ~250 KB each.

## New Casinos page — `pages/new-casinos/`

| File name                           | Suggested subject                                                | English alt (reference)                        |
| ----------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| `new-casinos-hero.webp`             | Hero collage of freshly launched casino brand logos / 2026 theme | New online casinos launching in 2026           |
| `new-casinos-how-we-review.webp`    | Reviewer at a desk comparing casinos on laptop + checklist       | How we test and rate new casinos               |
| `new-casinos-safety-checklist.webp` | License badges / padlock / safety checklist illustration         | Safety and licensing checklist for new casinos |
| `new-casinos-welcome-bonus.webp`    | Welcome bonus / gift + coins illustration                        | Welcome bonuses at new casinos                 |
| `new-casinos-mobile-play.webp`      | Player using a new casino on a smartphone                        | Playing at a new casino on mobile              |

## Bonuses page — `pages/casino-bonuses/`

| File name                           | Suggested subject                                     | English alt (reference)             |
| ----------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `casino-bonuses-hero.webp`          | Hero with bonus/gift boxes, coins, "BONUS" theme      | Casino bonuses guide 2026           |
| `casino-bonuses-welcome-offer.webp` | Welcome/deposit-match offer illustration              | Casino welcome bonus offer          |
| `casino-bonuses-wagering.webp`      | Wagering requirements / calculator / x40 illustration | Understanding wagering requirements |
| `casino-bonuses-free-spins.webp`    | Slot reels with free spins burst                      | Free spins bonuses                  |
| `casino-bonuses-cashback-vip.webp`  | VIP tiers / cashback / loyalty rewards illustration   | Cashback and VIP loyalty rewards    |

> To change which image a section uses, edit the `src:` value of the matching
> `image` section in the page's `<locale>.mdx` files (keep it identical across
> locales unless you want market-specific artwork).
