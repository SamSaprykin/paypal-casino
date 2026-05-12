import {
  Shield,
  CreditCard,
  Eye,
  Smartphone,
  Headphones,
  LayoutDashboard,
  Quote,
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  Lightbulb,
  UserPlus,
  Landmark,
  ClipboardList,
  Gamepad2,
  Banknote,
  Info,
} from "lucide-react";

const LUCIDE_ICONS = {
  Shield,
  CreditCard,
  Eye,
  Smartphone,
  Headphones,
  LayoutDashboard,
  Quote,
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  Lightbulb,
  UserPlus,
  Landmark,
  ClipboardList,
  Gamepad2,
  Banknote,
  Info,
};

function hastClassList(properties) {
  const c = properties?.className;
  if (!c) return [];
  return Array.isArray(c) ? c : String(c).split(/\s+/).filter(Boolean);
}

function hastClassIncludes(properties, needle) {
  return hastClassList(properties).includes(needle);
}

/** Reads Lucide React export name from `data-lucide="Shield"` (handles hast camelCase / hyphen keys). */
export function dataLucideFromProperties(properties) {
  if (!properties || typeof properties !== "object") return "";
  for (const key of Object.keys(properties)) {
    const norm = String(key).replace(/[-:]/g, "").toLowerCase();
    if (norm === "datalucide") {
      const v = properties[key];
      const s = Array.isArray(v) ? v[0] : v;
      if (typeof s === "string" && s.trim()) return s.trim();
    }
  }
  return "";
}

export function lucideIconByName(name) {
  if (!name || typeof name !== "string") return null;
  const Icon = LUCIDE_ICONS[name.trim()];
  return Icon ?? null;
}

export function iconFromHastElement(el) {
  if (!el || el.type !== "element") return null;
  const name = dataLucideFromProperties(el.properties);
  return lucideIconByName(name);
}

function textFromHastTree(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (node.type === "element" && node.children?.length) {
    return node.children.map(textFromHastTree).join("");
  }
  return "";
}

function findDescendant(root, predicate) {
  if (!root) return null;
  if (predicate(root)) return root;
  if (root.children?.length) {
    for (const ch of root.children) {
      const hit = findDescendant(ch, predicate);
      if (hit) return hit;
    }
  }
  return null;
}

function childrenElements(node) {
  return (node?.children || []).filter((c) => c.type === "element");
}

export function ArticleMarkdownCriteriaGrid({ items }) {
  return (
    <div className="criteria-grid my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = item.Icon || Shield;
        return (
          <div
            key={i}
            className="criteria-item flex gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-zinc-900/80"
          >
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-green-600 dark:text-green-400" aria-hidden />
            <div className="min-w-0">
              <div className="criteria-title font-heading text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {item.title}
              </div>
              <div className="criteria-desc mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function parseCriteriaGridFromHast(node) {
  const items = childrenElements(node).filter(
    (c) => hastClassIncludes(c.properties, "criteria-item"),
  );
  return items.map((itemEl) => {
    const iconEl = findDescendant(
      itemEl,
      (n) =>
        n.type === "element" && !!dataLucideFromProperties(n.properties),
    );
    const Icon = iconFromHastElement(iconEl) || Shield;
    const titleEl = findDescendant(itemEl, (n) =>
      hastClassIncludes(n.properties, "criteria-title"),
    );
    const descEl = findDescendant(itemEl, (n) =>
      hastClassIncludes(n.properties, "criteria-desc"),
    );
    return {
      Icon,
      title: textFromHastTree(titleEl).trim(),
      description: textFromHastTree(descEl).trim(),
    };
  });
}

export function ArticleMarkdownEditorNote({ children }) {
  return (
    <aside className="editor-note my-8 flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-5 italic shadow-sm dark:border-neutral-700 dark:bg-zinc-900/60 md:px-6">
      <Quote className="mt-1 h-6 w-6 shrink-0 text-neutral-400 dark:text-neutral-500" aria-hidden />
      <div className="min-w-0 text-neutral-800 dark:text-neutral-200 [&_p]:mb-0 [&_p]:leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

export function ArticleMarkdownProsCons({ prosTitle = "Fordele", consTitle = "Ulemper", pros, cons }) {
  return (
    <div className="pros-cons my-8 grid gap-6 lg:grid-cols-2">
      <div className="pros rounded-xl border border-green-200 bg-green-50/60 p-5 dark:border-green-900 dark:bg-green-950/30">
        <div className="pros-label mb-4 flex items-center gap-2 font-heading text-lg font-bold text-green-900 dark:text-green-100">
          <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" aria-hidden />
          {prosTitle}
        </div>
        <div className="space-y-3">
          {pros.map((line, i) => (
            <div key={i} className="pro-item flex gap-2 text-sm leading-relaxed text-green-900 dark:text-green-100">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" aria-hidden />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="cons rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-zinc-900/40">
        <div className="cons-label mb-4 flex items-center gap-2 font-heading text-lg font-bold text-neutral-900 dark:text-neutral-100">
          <ThumbsDown className="h-5 w-5 text-neutral-500 dark:text-neutral-400" aria-hidden />
          {consTitle}
        </div>
        <div className="space-y-3">
          {cons.map((line, i) => (
            <div key={i} className="con-item flex gap-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400" aria-hidden />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function stripIconPlaceholdersFromTree(root) {
  if (!root) return root;
  const clone = JSON.parse(JSON.stringify(root));
  const strip = (n) => {
    if (!n?.children) return;
    n.children = n.children.filter((ch) => {
      if (ch.type !== "element") return true;
      if (ch.tagName === "i") return false;
      if (dataLucideFromProperties(ch.properties)) return false;
      strip(ch);
      return true;
    });
  };
  strip(clone);
  return clone;
}

export function parseProsConsFromHast(node) {
  const prosContainer = childrenElements(node).find((c) =>
    hastClassIncludes(c.properties, "pros"),
  );
  const consContainer = childrenElements(node).find((c) =>
    hastClassIncludes(c.properties, "cons"),
  );

  const prosLabelEl = prosContainer
    ? childrenElements(prosContainer).find((c) =>
        hastClassIncludes(c.properties, "pros-label"),
      )
    : null;
  const consLabelEl = consContainer
    ? childrenElements(consContainer).find((c) =>
        hastClassIncludes(c.properties, "cons-label"),
      )
    : null;

  const extractLines = (container, itemClass) => {
    if (!container) return [];
    return childrenElements(container)
      .filter((c) => hastClassIncludes(c.properties, itemClass))
      .map((row) => {
        const span = findDescendant(row, (n) => n.tagName === "span");
        const t = span ? textFromHastTree(span).trim() : textFromHastTree(row).trim();
        return t.replace(/^[✓✔]\s*/, "").trim();
      })
      .filter(Boolean);
  };

  const pros = extractLines(prosContainer, "pro-item");
  const cons = extractLines(consContainer, "con-item");

  const prosTitle = prosLabelEl
    ? textFromHastTree(stripIconPlaceholdersFromTree(prosLabelEl)).trim() || "Fordele"
    : "Fordele";
  const consTitle = consLabelEl
    ? textFromHastTree(stripIconPlaceholdersFromTree(consLabelEl)).trim() || "Ulemper"
    : "Ulemper";

  return { prosTitle, consTitle, pros, cons };
}

export function ArticleMarkdownHowToStepCards({ steps }) {
  return (
    <div className="how-to my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.Icon || UserPlus;
        return (
          <div
            key={index}
            className="step-card flex flex-col rounded-xl border border-neutral-200 bg-white p-5 text-center shadow-sm dark:border-neutral-700 dark:bg-zinc-900/80"
          >
            <div className="step-icon mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <div className="step-num text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {step.stepNum}
            </div>
            <div className="step-title font-heading mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {step.title}
            </div>
            <div className="step-desc mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {step.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function parseHowToStepCardsFromHast(node) {
  const cards = childrenElements(node).filter((c) =>
    hastClassIncludes(c.properties, "step-card"),
  );
  return cards.map((card) => {
    const iconWrap = findDescendant(card, (n) => hastClassIncludes(n.properties, "step-icon"));
    const iconEl = iconWrap
      ? findDescendant(
          iconWrap,
          (n) => n.type === "element" && !!dataLucideFromProperties(n.properties),
        )
      : null;
    const Icon = iconFromHastElement(iconEl) || UserPlus;
    const numEl = findDescendant(card, (n) => hastClassIncludes(n.properties, "step-num"));
    const titleEl = findDescendant(card, (n) => hastClassIncludes(n.properties, "step-title"));
    const descEl = findDescendant(card, (n) => hastClassIncludes(n.properties, "step-desc"));
    return {
      Icon,
      stepNum: textFromHastTree(numEl).trim(),
      title: textFromHastTree(titleEl).trim(),
      description: textFromHastTree(descEl).trim(),
    };
  });
}

export function parseEditorNoteParagraphs(node) {
  const ps = [];
  const walk = (n) => {
    if (!n) return;
    if (n.type === "element" && n.tagName === "p") ps.push(n);
    n.children?.forEach(walk);
  };
  walk(node);
  return ps.map((p) => textFromHastTree(p).trim()).filter(Boolean);
}

export function ArticleMarkdownArticleWrapper({ children }) {
  return (
    <div className="article-markdown flex w-full flex-col">{children}</div>
  );
}
