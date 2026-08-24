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
  FileText,
  Scale,
  Headphones as Headset,
  Gift,
  ListChecks,
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
  FileText,
  Scale,
  Headset,
  Gift,
  ListChecks,
};

function hastId(properties) {
  const id = properties?.id;
  if (Array.isArray(id)) return id[0];
  return typeof id === "string" ? id : "";
}

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
            className="criteria-item flex gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <Icon
              className="mt-0.5 h-6 w-6 shrink-0 text-blue-600"
              aria-hidden
            />
            <div className="min-w-0">
              <div className="criteria-title font-heading text-sm font-semibold text-neutral-900">
                {item.title}
              </div>
              <div className="criteria-desc mt-1 text-sm leading-relaxed text-neutral-600">
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
  const items = childrenElements(node).filter((c) =>
    hastClassIncludes(c.properties, "criteria-item"),
  );
  return items.map((itemEl) => {
    const iconEl = findDescendant(
      itemEl,
      (n) => n.type === "element" && !!dataLucideFromProperties(n.properties),
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
    <aside className="editor-note my-8 flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-5 italic shadow-sm md:px-6">
      <Quote className="mt-1 h-6 w-6 shrink-0 text-neutral-400" aria-hidden />
      <div className="min-w-0 text-neutral-800 [&_p]:mb-0 [&_p]:leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

export function ArticleMarkdownProsCons({
  prosTitle = "Fordele",
  consTitle = "Ulemper",
  pros,
  cons,
}) {
  return (
    <div className="pros-cons my-8 grid gap-6 lg:grid-cols-2">
      <div className="pros rounded-xl border border-blue-200 bg-blue-50/60 p-5">
        <div className="pros-label mb-4 flex items-center gap-2 font-heading text-lg font-bold text-neutral-900">
          <ThumbsUp className="h-5 w-5 text-blue-600" aria-hidden />
          {prosTitle}
        </div>
        <div className="space-y-3">
          {pros.map((line, i) => (
            <div
              key={i}
              className="pro-item flex gap-2 text-sm leading-relaxed text-neutral-800"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                aria-hidden
              />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="cons rounded-xl border border-neutral-200 bg-neutral-50 p-5">
        <div className="cons-label mb-4 flex items-center gap-2 font-heading text-lg font-bold text-neutral-900">
          <ThumbsDown className="h-5 w-5 text-neutral-500" aria-hidden />
          {consTitle}
        </div>
        <div className="space-y-3">
          {cons.map((line, i) => (
            <div
              key={i}
              className="con-item flex gap-2 text-sm leading-relaxed text-neutral-700"
            >
              <X
                className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                aria-hidden
              />
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
        const t = span
          ? textFromHastTree(span).trim()
          : textFromHastTree(row).trim();
        return t.replace(/^[✓✔]\s*/, "").trim();
      })
      .filter(Boolean);
  };

  let pros = extractLines(prosContainer, "pro-item");
  let cons = extractLines(consContainer, "con-item");

  let prosTitle = prosLabelEl
    ? textFromHastTree(stripIconPlaceholdersFromTree(prosLabelEl)).trim() ||
      "Fordele"
    : "Fordele";
  let consTitle = consLabelEl
    ? textFromHastTree(stripIconPlaceholdersFromTree(consLabelEl)).trim() ||
      "Ulemper"
    : "Ulemper";

  const lists = childrenElements(node).filter((c) => c.tagName === "ul");
  if ((!pros.length && !cons.length) && lists.length >= 2) {
    const headings = childrenElements(node).filter((c) =>
      /^h[1-6]$/.test(c.tagName || ""),
    );
    if (headings[0]) prosTitle = textFromHastTree(headings[0]).trim() || prosTitle;
    if (headings[1]) consTitle = textFromHastTree(headings[1]).trim() || consTitle;
    const listLines = (ul) =>
      childrenElements(ul)
        .filter((li) => li.tagName === "li")
        .map((li) => textFromHastTree(li).trim())
        .filter(Boolean);
    pros = listLines(lists[0]);
    cons = listLines(lists[1]);
  }

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
            className="step-card flex flex-col rounded-xl border border-neutral-200 bg-white p-5 text-center shadow-sm"
          >
            <div className="step-icon mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <div className="step-num text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {step.stepNum}
            </div>
            <div className="step-title font-heading mt-2 text-lg font-semibold text-neutral-900">
              {step.title}
            </div>
            <div className="step-desc mt-2 text-sm leading-relaxed text-neutral-600">
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
    const iconWrap = findDescendant(card, (n) =>
      hastClassIncludes(n.properties, "step-icon"),
    );
    const iconEl = iconWrap
      ? findDescendant(
          iconWrap,
          (n) =>
            n.type === "element" && !!dataLucideFromProperties(n.properties),
        )
      : null;
    const Icon = iconFromHastElement(iconEl) || UserPlus;
    const numEl = findDescendant(card, (n) =>
      hastClassIncludes(n.properties, "step-num"),
    );
    const titleEl = findDescendant(card, (n) =>
      hastClassIncludes(n.properties, "step-title"),
    );
    const descEl = findDescendant(card, (n) =>
      hastClassIncludes(n.properties, "step-desc"),
    );
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

export function parseCheckListFromHast(node) {
  const heading = childrenElements(node).find((c) =>
    /^h[1-6]$/.test(c.tagName || ""),
  );
  const ul = childrenElements(node).find((c) => c.tagName === "ul");
  const items = ul
    ? childrenElements(ul)
        .filter((li) => li.tagName === "li")
        .map((li) => textFromHastTree(li).trim())
        .filter(Boolean)
    : [];
  return {
    title: heading ? textFromHastTree(heading).trim() : "Key Details",
    items,
  };
}

export function ArticleMarkdownCheckList({ title = "Key Details", items }) {
  return (
    <div className="check-list my-8 overflow-hidden rounded-xl border border-blue-100 shadow-sm">
      <div className="flex items-center gap-2 bg-blue-700 px-4 py-2.5 font-heading text-sm font-semibold text-white">
        <ListChecks className="h-4 w-4 shrink-0" aria-hidden />
        {title}
      </div>
      <ul className="m-0 list-none space-y-0 bg-white p-0">
        {(items || []).map((line, i) => (
          <li
            key={i}
            className="flex gap-2 border-t border-blue-50 px-4 py-2.5 text-sm leading-relaxed text-neutral-800 first:border-t-0"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function parseAnchorFromHast(li) {
  const a = findDescendant(li, (n) => n.type === "element" && n.tagName === "a");
  const href = a?.properties?.href ? String(a.properties.href) : "";
  const text = textFromHastTree(li).trim();
  return { href, text };
}

export function parseReferencesListFromHast(node) {
  const heading = childrenElements(node).find((c) =>
    /^h[1-6]$/.test(c.tagName || ""),
  );
  const ul = childrenElements(node).find((c) => c.tagName === "ul");
  const items = ul
    ? childrenElements(ul)
        .filter((li) => li.tagName === "li")
        .map(parseAnchorFromHast)
        .filter((it) => it.text)
    : [];
  return {
    title: heading ? textFromHastTree(heading).trim() : "Reference list",
    items,
  };
}

export function ArticleMarkdownReferencesList({
  title = "Reference list",
  items,
}) {
  return (
    <div className="references-list my-8 overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
      <div className="bg-neutral-800 px-4 py-2.5 font-heading text-sm font-semibold text-white">
        {title}
      </div>
      <ol className="m-0 list-none p-0">
        {(items || []).map((item, i) => (
          <li
            key={i}
            className={`flex gap-3 px-4 py-2.5 text-sm ${
              i % 2 === 0 ? "bg-white" : "bg-red-50/70"
            }`}
          >
            <span className="w-6 shrink-0 font-semibold text-neutral-500">
              {i + 1}.
            </span>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline hover:text-blue-900"
              >
                {item.text}
              </a>
            ) : (
              <span>{item.text}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ArticleMarkdownInfoYellowBox({ children }) {
  return (
    <aside className="info-yellow-box my-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-relaxed text-neutral-800 shadow-sm [&_p]:mb-0">
      {children}
    </aside>
  );
}

const SLIDER_ICON_BY_NAME = {
  safety: Shield,
  sicherheit: Shield,
  bonus: Gift,
  games: Gamepad2,
  spiele: Gamepad2,
  license: Scale,
  licence: Scale,
  lizenz: Scale,
  "t&c": FileText,
  tc: FileText,
  geschaftsbedingungen: FileText,
  geschäftsbedingungen: FileText,
  "customer service": Headset,
  kundendienst: Headset,
};

function sliderIconForName(name) {
  const key = String(name || "")
    .trim()
    .toLowerCase();
  return SLIDER_ICON_BY_NAME[key] || Shield;
}

export function parseSliderFromHast(node) {
  const items = childrenElements(node).filter((c) => {
    if (c.tagName !== "div") return false;
    if (hastId(c.properties) === "slider-item") return true;
    return hastClassIncludes(c.properties, "slider-item");
  });
  return items
    .map((el) => {
      const nameEl = findDescendant(
        el,
        (n) =>
          n.type === "element" &&
          (hastId(n.properties) === "name" ||
            hastClassIncludes(n.properties, "name")),
      );
      const valueEl = findDescendant(
        el,
        (n) =>
          n.type === "element" &&
          (hastId(n.properties) === "value" ||
            hastClassIncludes(n.properties, "value")),
      );
      const name = textFromHastTree(nameEl).trim();
      const raw = parseInt(textFromHastTree(valueEl).trim(), 10);
      const value = Number.isFinite(raw) ? Math.min(100, Math.max(0, raw)) : 0;
      return { name, value, Icon: sliderIconForName(name) };
    })
    .filter((it) => it.name);
}

export function ArticleMarkdownSlider({ items }) {
  return (
    <div className="slider-component my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(items || []).map((item, i) => {
        const Icon = item.Icon || Shield;
        return (
          <div
            key={i}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-5 w-5 text-blue-700" aria-hidden />
              <span className="font-heading text-sm font-semibold text-neutral-900">
                {item.name}
              </span>
              <span className="ml-auto text-sm font-bold text-blue-800">
                {item.value}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function parseRelatedPagesFromHast(node) {
  return childrenElements(node)
    .filter((c) => c.tagName === "a")
    .map((a) => ({
      href: a.properties?.href ? String(a.properties.href) : "",
      text: textFromHastTree(a).trim(),
    }))
    .filter((it) => it.href && it.text);
}

export function ArticleMarkdownRelatedPages({ items }) {
  return (
    <nav
      className="related-pages my-8 grid gap-3 sm:grid-cols-2"
      aria-label="Related guides"
    >
      {(items || []).map((item, i) => (
        <a
          key={i}
          href={item.href}
          className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm font-semibold text-blue-800 no-underline shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
