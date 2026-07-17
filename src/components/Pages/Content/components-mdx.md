# LLM authoring guide — PayPal Casino articles (`ContentComponent`)

You generate **long-form articles** that render inside **`ContentComponent`** (React + `react-markdown` + `rehype-raw` + GitHub-flavored Markdown). Output must be valid **Markdown mixed with raw HTML** unless the product owner asks for **`.mdx`** (then use React components — see section D).

---

## A. Your job

1. Write normal **Markdown** for headings (`#`, `##`, …), paragraphs, lists, links.
2. Insert **HTML blocks** only where a **custom visual component** is required (callouts, grids, how-to, pros/cons, etc.).
3. Never invent unsupported class hooks or removed blocks (see **Forbidden**).
4. Icons are **Lucide (React)** only:
   - **CMS HTML:** empty placeholder `<span data-lucide="IconName"></span>` using an allowed name (see **C**).
   - **Legacy how-to:** plain text inside `<span class="icon">…</span>` using **IconSwitch** keys (see **B2**).

Tone, language, and SEO fields outside the body are out of scope unless specified.

---

## B. How `ContentComponent` maps HTML → React (reference pseudocode)

This mirrors the real `div` handler in `ContentComponent.jsx`. Use it so your HTML lines up with what the parser expects.

Assume helpers `hastClassIncludes(properties, needle)` and `textFromTree(node)` match production (`ContentComponent.jsx` / `articleMarkdownBlocks.jsx`).

```tsx
const className = props.className || "";

if (className.includes("criteria-grid")) {
  const items = parseCriteriaGridFromHast(node);
  return <ArticleMarkdownCriteriaGrid items={items} />;
}

if (className.includes("editor-note")) {
  const paragraphs = parseEditorNoteParagraphs(node); // all <p> inside the block
  return <ArticleMarkdownEditorNote>{paragraphs as <p>…}</ArticleMarkdownEditorNote>;
}

if (className.includes("pros-cons")) {
  const pc = parseProsConsFromHast(node);
  return (
    <ArticleMarkdownProsCons
      prosTitle={pc.prosTitle}
      consTitle={pc.consTitle}
      pros={pc.pros}
      cons={pc.cons}
    />
  );
}

if (
    String(className).split(/\s+/).filter(Boolean).includes("article") &&
    !className.includes("article-markdown")
  ) {
  return <ArticleMarkdownArticleWrapper>{children}</ArticleMarkdownArticleWrapper>;
}

if (className.includes("highlight-box")) {
  return <HighlightBox firstBonus={firstBonus}>{children}</HighlightBox>;
}

if (className.includes("info-card")) {
  return <InfoCard>{children}</InfoCard>;
}

if (className.includes("tip-box")) {
  return <TipBox>{children}</TipBox>;
}

if (className.includes("grid-two-columns")) {
  return <GridTwoColumns>{children}</GridTwoColumns>;
}

if (className.includes("how-to")) {
  const hasStepCard = node.children.some(
    (child) =>
      child.type === "element" &&
      hastClassIncludes(child.properties, "step-card"),
  );

  if (hasStepCard) {
    const steps = parseHowToStepCardsFromHast(node);
    return <ArticleMarkdownHowToStepCards steps={steps} />;
  }

  const steps = node.children
    .filter(
      (child) =>
        child.type === "element" &&
        hastClassIncludes(child.properties, "step-item"),
    )
    .map((stepNode) => {
      const titleNode = stepNode.children.find(
        (n) =>
          n.tagName === "h5" &&
          hastClassIncludes(n.properties, "step-title"),
      );
      const iconNode = stepNode.children.find(
        (n) =>
          n.tagName === "span" &&
          hastClassIncludes(n.properties, "icon"),
      );
      const descNode = stepNode.children.find(
        (n) =>
          n.tagName === "p" &&
          hastClassIncludes(n.properties, "step-description"),
      );

      return {
        title: textFromTree(titleNode),
        icon: iconNode ? textFromTree(iconNode).trim() : "", // IconSwitch key
        descriptionChildren: descNode?.children ?? null,
      };
    });

  return <HowToComponent steps={steps} />;
}

return <div {...props} />;
```

### B1. HTML templates you should emit (CMS)

**Article wrapper (optional)**

```html
<div class="article">…markdown + blocks…</div>
```

**Info card** (`InfoCard` — built-in Lucide `Info`)

```html
<div class="info-card">
  <div>
    <strong>Title line</strong>
    <p>Body copy.</p>
  </div>
</div>
```

**Tip box** (`TipBox` — Lucide `Lightbulb`)

```html
<div class="tip-box">
  <p><strong>Tip:</strong> …</p>
</div>
```

**Criteria grid** — each row is `.criteria-item`; icon = first element with `data-lucide`:

```html
<div class="criteria-grid">
  <div class="criteria-item">
    <span data-lucide="Shield" aria-hidden="true"></span>
    <div>
      <div class="criteria-title">…</div>
      <div class="criteria-desc">…</div>
    </div>
  </div>
</div>
```

**Editor note** — one or more `<p>` only (icons are added by React):

```html
<div class="editor-note">
  <p>Quoted or editorial text.</p>
</div>
```

**Pros / cons**

```html
<div class="pros-cons">
  <div class="pros">
    <div class="pros-label">Fordele</div>
    <div class="pro-item"><span>Line of text</span></div>
  </div>
  <div class="cons">
    <div class="cons-label">Ulemper</div>
    <div class="con-item"><span>Line of text</span></div>
  </div>
</div>
```

### B2. How-to — choose exactly one shape inside `.how-to`

**Option 1 — Legacy `step-item` (4-column card UI, `IconSwitch`)**

Inside each `step-item`:

- `h5.step-title` — title
- `span.icon` — **plain text** Lucide key for `IconSwitch`
- `p.step-description` — body (HTML allowed inside per `HastStepDescription`)

Allowed **`IconSwitch`** icon strings (exact, case-sensitive):

`ShieldCheck`, `UserPlus`, `CreditCard`, `Gift`, `PlayCircle`, `Coin`, `Trophy`, `DollarSign`

Example:

```html
<div class="how-to">
  <div class="step-item">
    <span class="icon">UserPlus</span>
    <h5 class="step-title">Opret konto</h5>
    <p class="step-description">Brødtekst …</p>
  </div>
</div>
```

**Option 2 — `step-card` grid (icons via `data-lucide`)**

```html
<div class="how-to">
  <div class="step-card">
    <div class="step-icon">
      <span data-lucide="UserPlus" aria-hidden="true"></span>
    </div>
    <div class="step-num">Trin 1</div>
    <div class="step-title">…</div>
    <div class="step-desc">…</div>
  </div>
</div>
```

If **both** `step-card` and `step-item` appear under the same `.how-to`, **`step-card` wins** (legacy parser is skipped).

---

## C. `data-lucide` names allowed in CMS HTML

Parsed in `articleMarkdownBlocks.jsx` (`LUCIDE_ICONS`). Names must match **`lucide-react` exports** exactly.

Typical sets:

- Criteria-style: `Shield`, `CreditCard`, `Eye`, `Smartphone`, `Headphones`, `LayoutDashboard`
- Steps (step-card): `UserPlus`, `Landmark`, `ClipboardList`, `CreditCard`, `Gamepad2`, `Banknote`
- Also registered for reuse: `Quote`, `ThumbsUp`, `ThumbsDown`, `Check`, `X`, `Lightbulb`, `Info`

If you need a new glyph, add it to **`LUCIDE_ICONS`** and `import` it there — do not emit random names.

---

## D. Optional: `.mdx` with React building blocks

React equivalents live in **`ContentArticleComponents.jsx`** (same visuals as the old `.astro` wrappers).

```tsx
import {
  ArticleShell,
  InfoArticle,
  TipArticle,
  CriteriaGrid,
  CriteriaItem,
  EditorNote,
  ProsConsArticle,
  HowToArticle,
  StepCard,
} from "../../components/Pages/Content/ContentArticleComponents.jsx";
```

- **`CriteriaItem` `icon` prop:** `Shield` | `CreditCard` | `Eye` | `Smartphone` | `Headphones` | `LayoutDashboard`
- **`StepCard` `icon` prop:** `UserPlus` | `Landmark` | `ClipboardList` | `CreditCard` | `Gamepad2` | `Banknote`
- **`ProsConsArticle`:** same props as `ArticleMarkdownProsCons` — `prosTitle`, `consTitle`, `pros[]`, `cons[]`

---

## E. Forbidden (parser no longer supports these)

Do **not** emit: `seo-meta`, `divider`, `badge`, `faq` / `faq-item`, Tabler `ti ti-*` icon fonts, or raw SVG icon fonts for these blocks.

---

## F. Human QA checklist

- [ ] All custom blocks use class names exactly as in **B1 / B2**
- [ ] `data-lucide` values exist in **`LUCIDE_ICONS`**
- [ ] Legacy how-to icons are exactly **`IconSwitch`** keys
- [ ] `pros-cons` rows use inner `<span>` for line text
- [ ] Full reference article: repo root **`example.md`**
