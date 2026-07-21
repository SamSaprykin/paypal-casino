# Shared scaffold: new website page types

Use this **before** any page-specific prompt when shipping a **new** page type from `ppcasinos-content-plan-2026.md`. Page-specific prompts in `prompts/` assume the scaffold already exists.

## Files to create / edit

1. **Folder:** `src/data/content/pages/<page-dir>/`
2. **`meta.json`** — page registry (sections, casino list, authors)
3. **6 locale MDX files:** `ireland.mdx`, `germany.mdx`, `denmark.mdx`, `finland.mdx`, `norway.mdx`, `sweden.mdx`
4. **Register in** `src/data/content/pages/_index.json` — add entry with `id`, `name`, `dir`, `slugs` for all 6 locales

## Standard section layout

Most commercial pages follow this pattern (adjust IDs per page — see page-specific prompt):

| Order | kind               | Typical id         | Notes                               |
| ----- | ------------------ | ------------------ | ----------------------------------- |
| 1     | `contentComponent` | `<prefix>-intro`   | H1 + short intro                    |
| 2     | `casinoList`       | `<prefix>-list`    | `casinoListsByCountry` in meta.json |
| 3     | `contentComponent` | `<prefix>-guide`   | Main body, tables, callouts         |
| 4     | `howTo`            | `<prefix>-howto`   | 4 steps with `iconName`             |
| 5     | `contentComponent` | `<prefix>-verdict` | Summary + RG note                   |
| 6     | `faqComponent`     | `<prefix>-faq`     | 4–5 Q&As                            |

**Authors (default):** `seamus-oconnor` (addedBy), `stoyan-makoski` (reviewedBy).

## `meta.json` template

```json
{
  "_id": "<generate-uuid>",
  "_createdAt": "2026-07-20T00:00:00Z",
  "_updatedAt": "2026-07-20T00:00:00Z",
  "name": "<Page Name>",
  "authors": {
    "addedBy": "seamus-oconnor",
    "reviewedBy": "stoyan-makoski"
  },
  "components": [
    {
      "kind": "contentComponent",
      "id": "<prefix>-intro",
      "name": "<Page> Intro"
    },
    {
      "kind": "casinoList",
      "id": "<prefix>-list",
      "casinoListsByCountry": {
        "ireland": ["yukon-gold", "flagman", "lucky-start", "spinbetter"],
        "germany": ["yukon-gold", "kukimuki", "bitstarz", "zodiac-casino"],
        "denmark": ["lets-lucky", "kukimuki", "spinbetter", "coolzino"],
        "finland": ["lets-lucky", "yukon-gold", "flagman", "spinbetter"],
        "norway": ["lets-lucky", "kukimuki", "flagman", "spinbetter"],
        "sweden": ["lets-lucky", "klirr-casino", "pop-casino", "spinbetter"]
      }
    },
    {
      "kind": "contentComponent",
      "id": "<prefix>-guide",
      "name": "<Page> Guide"
    },
    { "kind": "howTo", "id": "<prefix>-howto" },
    {
      "kind": "contentComponent",
      "id": "<prefix>-verdict",
      "name": "<Page> Verdict"
    },
    { "kind": "faqComponent", "id": "<prefix>-faq" }
  ]
}
```

Tailor casino slugs per page intent (e.g. crypto-friendly brands for crypto page). Start with 4–8 brands per market; expand later.

## `_index.json` entry template

```json
{
  "id": "<same-uuid-as-meta>",
  "name": "<Page Name>",
  "dir": "pages/<page-dir>",
  "slugs": {
    "ireland": "/<ie-slug>/",
    "germany": "/de/<de-slug>/",
    "denmark": "/dk/<dk-slug>/",
    "finland": "/fi/<fi-slug>/",
    "norway": "/no/<no-slug>/",
    "sweden": "/se/<se-slug>/"
  }
}
```

Non-IE slugs include the locale prefix in the URL path (`/de/…`, `/fi/…`). Ireland slugs are unprefixed.

## howTo `iconName` values

Supported in `ContentComponent.jsx`: `ShieldCheck`, `UserPlus`, `CreditCard`, `Gift`, `PlayCircle`, `Coin`, `trophy`, `DollarSign`, `Sparkles`, `user`, `gift`.

Also accepted in newer page prompts: `Shield`, `Wallet`, `Gamepad2`, `Bitcoin`, `PayPal` (fallback render if unmapped).

## Workflow

1. **Scaffold** — create folder, `meta.json`, `_index.json` entry, stub MDX for all 6 locales (Ireland English full copy first).
2. **Localise** — one locale per run using the page-specific prompt.
3. **Verify** — `npm run build` (or dev) and check all 6 URLs render.

## Internal linking

Always link to Home, PayPal, Bonuses, Blocked, Rating Guidelines using paths from `src/data/content/pages/_index.json` for that locale. See `prompts/home-page.md` link table.
