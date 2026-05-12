"use client";

import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import {
  ArrowRight,
  Crown,
  Info,
  ShieldCheck,
  UserPlus,
  CreditCard,
  Gift,
  Joystick,
  Coins,
  Lightbulb,
  Trophy,
  DollarSign,
} from "lucide-react";
import { addHttps } from "../../lib/helpers";
import { cn, slugify as slugifyHeading } from "../../lib/utils";
import remarkGfm from "remark-gfm";
import {
  ArticleMarkdownArticleWrapper,
  ArticleMarkdownCriteriaGrid,
  ArticleMarkdownEditorNote,
  ArticleMarkdownHowToStepCards,
  ArticleMarkdownProsCons,
  parseCriteriaGridFromHast,
  parseEditorNoteParagraphs,
  parseHowToStepCardsFromHast,
  parseProsConsFromHast,
} from "./Content/articleMarkdownBlocks.jsx";

const linkClassMd =
  "text-green-700 underline hover:text-green-900 transition-colors duration-200 font-medium dark:text-green-400 dark:hover:text-green-200";

function getBonusFields(firstBonus) {
  if (!firstBonus) return null;
  return firstBonus.fields ?? firstBonus;
}

const ctaLinkClass =
  "inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-800 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-green-700 hover:to-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900";

/** How-to step descriptions come from HAST (rehype), not mdast. */
function HastStepDescription({ hastChildren }) {
  if (!hastChildren?.length) return null;

  const renderNode = (node, i) => {
    if (!node) return null;
    if (node.type === "text") {
      return node.value;
    }
    if (node.type !== "element" || !node.tagName) {
      return null;
    }
    const tag = node.tagName;
    const kids = node.children?.map((c, j) => renderNode(c, j));
    switch (tag) {
      case "p":
        return (
          <p
            key={i}
            className="text-center text-[15px] text-green-900 leading-relaxed dark:text-green-100"
          >
            {kids}
          </p>
        );
      case "strong":
        return (
          <strong key={i} className="font-bold text-green-950 dark:text-white">
            {kids}
          </strong>
        );
      case "em":
        return <em key={i}>{kids}</em>;
      case "a":
        return (
          <a
            key={i}
            href={node.properties?.href}
            className={linkClassMd}
            {...(node.properties?.title
              ? { title: String(node.properties.title) }
              : {})}
          >
            {kids}
          </a>
        );
      case "code":
        return (
          <code
            key={i}
            className="rounded bg-green-900/10 px-1 py-0.5 text-sm dark:bg-green-100/10"
          >
            {kids}
          </code>
        );
      case "br":
        return <br key={i} />;
      default:
        return <span key={i}>{kids}</span>;
    }
  };

  return (
    <div className="mt-auto space-y-2 text-center text-[15px] text-green-900 leading-relaxed dark:text-green-100">
      {hastChildren.map((c, i) => renderNode(c, i))}
    </div>
  );
}

function textFromHastTree(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (node.type === "element" && node.children?.length) {
    return node.children.map(textFromHastTree).join("");
  }
  return "";
}

function hastClassIncludes(properties, needle) {
  const c = properties?.className;
  const s = Array.isArray(c) ? c.join(" ") : String(c ?? "");
  return s.includes(needle);
}

function hastId(properties) {
  const id = properties?.id;
  if (Array.isArray(id)) return id[0];
  return id;
}

// Improve: Modern circular step number badge, lines, clear icons, bigger step, hover effect,
// cleaner card, subtle interactivity, shadow/lift, visually distinct cards.
const IconSwitch = ({ iconName }) => {
  const iconProps =
    "w-9 h-9 text-green-600 flex-shrink-0 dark:text-green-300";
  const icons = {
    ShieldCheck: <ShieldCheck className={iconProps} />,
    UserPlus: <UserPlus className={iconProps} />,
    CreditCard: <CreditCard className={iconProps} />,
    Gift: <Gift className={iconProps} />,
    PlayCircle: <Joystick className={iconProps} />,
    Coin: <Coins className={iconProps} />,
    Trophy: <Trophy className={iconProps} />,
    DollarSign: <DollarSign className={iconProps} />,
  };
  return icons[iconName] || (
    <span className="inline-block w-9 h-9 bg-gray-200 dark:bg-zinc-800 rounded-full" />
  );
};

const HowToComponent = ({ steps }) => {
  // Restored "Step" label above number, visible step numbers and titles.
  return (
    <div className="relative w-full my-12">
      {/* Connecting horizontal line for desktop */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 z-0 pointer-events-none">
        <div className="mx-12 h-2 rounded-full bg-gradient-to-r from-green-200 via-orange-100 to-yellow-100 dark:from-green-950 dark:via-zinc-900 dark:to-yellow-900 opacity-70 shadow-lg" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 z-10 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col relative items-center text-center px-5 py-7 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-md border-2 border-transparent transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 bg-slate-50",
              "hover:border-green-500 hover:ring-2 hover:ring-green-300 hover:ring-offset-2 dark:hover:ring-offset-zinc-900"
            )}
            style={{
              zIndex: 1,
            }}
          >
            {/* "Step" word above step number, visible always */}
            <div className="mb-1 text-sm font-bold text-green-700 tracking-wide uppercase dark:text-green-300">
              Step
            </div>
            {/* Circular step number badge with animated shadow */}
            <div className="mb-4 relative">
              <div className={cn(
                "w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-tr from-green-500/90 to-yellow-300 font-roboto text-xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-zinc-900 transition-transform transform-gpu",
                "group-hover:scale-105 group-hover:ring-green-700"
              )}>
                {index + 1}
              </div>
              {/* Draw connecting lines for mobile below badge */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden absolute left-1/2 top-full mt-1 w-0.5 h-8 bg-gradient-to-b from-green-300/60 via-gray-200 to-yellow-100 rounded-full -translate-x-1/2" />
              )}
            </div>
            {/* Icon for the step */}
            <div className="mb-2">
              <IconSwitch iconName={step.icon} />
            </div>
            {/* Step Title */}
            <h3 className="font-roboto text-lg font-semibold text-green-900 sm:text-xl dark:text-green-200 mb-2 leading-tight h-[56px]">
              {/* If the step title is empty, fallback to 'Step X' */}
              {step.title?.trim()
                ? step.title
                : `Step ${index + 1}`}
            </h3>
            {/* Description, aligns bottom if space */}
            <div className="flex flex-col w-full">
              <HastStepDescription
                hastChildren={
                  step.descriptionChildren?.length ? step.descriptionChildren : null
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoCard = ({ children }) => {
  return (
    <div className="my-8 border-l-4 border-blue-400 bg-blue-50/60 px-4 lg:px-8 py-2 lg:py-6 rounded-xl shadow info-card dark:border-blue-700 dark:bg-blue-900/60">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <Info className="w-7 h-7 text-blue-500 mt-1 flex-shrink-0 dark:text-blue-300" />
        <div className="min-w-0 flex-1 text-blue-900 leading-relaxed text-base dark:text-blue-100">
          {children}
        </div>
      </div>
    </div>
  );
};

const TipBox = ({ children }) => {
  return (
    <div className="my-6 border-l-4 border-yellow-400 bg-yellow-50/80 px-4 py-4 sm:px-8 sm:py-6 rounded-xl shadow flex flex-col sm:flex-row items-start gap-3 sm:gap-4 dark:bg-yellow-900/40 dark:border-yellow-700">
      <Lightbulb className="w-7 h-7 text-yellow-500 mt-1 flex-shrink-0 mb-2 sm:mb-0 dark:text-yellow-300" />
      <div className="min-w-0 flex-1 text-yellow-900 leading-relaxed text-sm sm:text-base dark:text-yellow-100">
        {children}
      </div>
    </div>
  );
};

const CtaBoxWithImage = ({ src, alt, className, firstBonus }) => {
  const b = getBonusFields(firstBonus);
  const href = b?.referralUrl;
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-4xl my-12 border-2 border-green-500 rounded-2xl p-6 overflow-hidden mx-auto bg-gradient-to-tr from-green-200 via-gray-50 to-orange-100 shadow-md relative dark:bg-gradient-to-tr dark:from-green-900 dark:via-zinc-800 dark:to-yellow-950 dark:border-green-700">
      <div className="flex flex-col flex-1 gap-4">
        <h3 className="font-roboto text-2xl font-bold mb-2 text-green-900 leading-snug dark:text-green-200">
          {b?.name}
        </h3>
        <p className="text-base text-gray-600 mb-4 dark:text-gray-300">
          {b?.description}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          See the operator&apos;s promotional terms and{" "}
          <a href="/terms-and-conditions/" className="underline font-medium">
            our editorial Terms &amp; Conditions
          </a>
          .
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaLinkClass} group max-w-xs mt-2`}
          >
            <span>Get Bonus</span>
            <ArrowRight className="w-4 h-4 transform transition-all duration-300 group-hover:ml-1 group-hover:text-gray-100 rounded-full" />
          </a>
        ) : null}
      </div>
      <div className="relative flex-shrink-0 max-w-xs w-full">
        <img
          src={addHttps(src)}
          alt={alt}
          width={350}
          height={240}
          sizes="(max-width: 768px) 100vw, 350px"
          className={`border-4 border-green-200 object-contain rounded-xl shadow-lg mx-auto dark:border-green-800 ${className || ""}`}
        />
      </div>
    </div>
  );
};

const HighlightBox = ({ firstBonus, children }) => {
  const b = getBonusFields(firstBonus);
  const href = b?.referralUrl;
  return (
    <div className="my-10 border-2 border-green-500 bg-gradient-to-br from-green-200 via-white to-orange-100 px-10 py-6 rounded-2xl flex flex-col md:flex-row items-center gap-8 w-full shadow-md dark:border-green-700 dark:bg-gradient-to-br dark:from-green-900 dark:via-zinc-800 dark:to-yellow-950">
      <Crown className="w-16 h-16 text-yellow-500 mb-2 md:mb-0 dark:text-yellow-300" />
      <div className="text-green-900 flex-1 text-lg dark:text-green-200">
        {children}
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs mt-4 md:mt-0">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaLinkClass} group py-4 text-base`}
          >
            <span>Play Now</span>
            <ArrowRight className="w-4 h-4 transform transition-all duration-300 group-hover:ml-1" />
          </a>
        ) : null}
        <a
          href="/terms-and-conditions/"
          className="text-center text-xs text-green-800 dark:text-green-300 underline font-medium hover:no-underline"
        >
          Terms &amp; Conditions
        </a>
      </div>
    </div>
  );
};

const GridTwoColumns = ({ children }) => {
  return (
    <div className="text-gray-900 grid grid-cols-1 md:grid-cols-2 gap-8 my-6 dark:text-gray-100">
      {children}
    </div>
  );
};

const InlineBonusCard = ({ bonusName, bonusInfo, bonusLink }) => (
  <a
    id="inline-bonus"
    href={bonusLink}
    target="_blank"
    rel="noopener noreferrer"
    className="max-w-md mx-auto my-6 p-5 rounded-2xl bg-gradient-to-b from-amber-50 via-yellow-100 to-orange-100 shadow-lg border-2 border-yellow-400 flex flex-col text-center items-center space-y-2 relative overflow-hidden dark:from-yellow-900/50 dark:via-yellow-900/70 dark:to-orange-900/60 dark:border-yellow-600
      transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl active:scale-95 cursor-pointer group"
    style={{
      willChange: "transform",
    }}
  >
    <span
      id="bonus-name"
      className="text-lg md:text-xl font-bold text-yellow-700 uppercase tracking-wide mb-1 dark:text-yellow-200
        transition-transform duration-300 group-hover:-translate-y-1"
    >
      {bonusName}
    </span>
    <span
      id="bonus-info"
      className="text-2xl md:text-3xl font-extrabold text-orange-700 py-1 px-2 select-text dark:text-yellow-200
        transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
    >
      {bonusInfo}
    </span>
    <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 dark:text-amber-100">
      Featured offer — check T&amp;Cs on the casino site
    </span>
    <div
      className="absolute top-2 right-3 z-0 opacity-10 pointer-events-none text-yellow-300 dark:text-yellow-200
      transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-2"
    >
      <Gift className="w-16 h-16" />
    </div>
  </a>
);

const paddingBottomMap = {
  0: "pb-0",
  4: "pb-4",
  6: "pb-6",
  8: "pb-8",
  12: "pb-12",
  16: "pb-16",
};

const marginTopMap = {
  0: "mt-0",
  4: "mt-4",
  6: "mt-6",
  8: "mt-8",
  12: "mt-12",
  16: "mt-16",
};

export const ContentComponent = ({
  content,
  firstBonus,
  spaceBottom = 0,
  spaceTop = 0,
}) => {
  const pbClass = paddingBottomMap[spaceBottom] ?? paddingBottomMap[0];
  const mtClass = marginTopMap[spaceTop] ?? marginTopMap[0];
  if (typeof content !== "string" || !content.trim()) return null;
  return (
    <div
      className={cn(
        "content-component font-roboto relative flex w-full flex-col gap-0",
        pbClass,
        mtClass,
      )}
    >
      <div className="h-auto w-full">
        <div className="max-w-none pt-1 sm:pt-2">
          <article
            className={cn(
              "max-w-none bg-transparent",
              "selection:bg-emerald-200/40 dark:selection:bg-emerald-900/40",
            )}
          >
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                div: ({ node, ...props }) => {
                  const className = props.className || "";
                  const classes = String(className).split(/\s+/).filter(Boolean);

                  if (className.includes("criteria-grid")) {
                    const items = parseCriteriaGridFromHast(node);
                    if (items.length > 0) {
                      return <ArticleMarkdownCriteriaGrid items={items} />;
                    }
                  }

                  if (className.includes("editor-note")) {
                    const paragraphs = parseEditorNoteParagraphs(node);
                    if (paragraphs.length > 0) {
                      return (
                        <ArticleMarkdownEditorNote>
                          {paragraphs.map((text, i) => (
                            <p
                              key={i}
                              className="mb-2 last:mb-0 not-italic leading-relaxed"
                            >
                              {text}
                            </p>
                          ))}
                        </ArticleMarkdownEditorNote>
                      );
                    }
                  }

                  if (className.includes("pros-cons")) {
                    const pc = parseProsConsFromHast(node);
                    if (pc.pros.length || pc.cons.length) {
                      return (
                        <ArticleMarkdownProsCons
                          prosTitle={pc.prosTitle}
                          consTitle={pc.consTitle}
                          pros={pc.pros}
                          cons={pc.cons}
                        />
                      );
                    }
                  }

                  if (
                    classes.includes("article") &&
                    !className.includes("article-markdown")
                  ) {
                    return (
                      <ArticleMarkdownArticleWrapper>
                        {props.children}
                      </ArticleMarkdownArticleWrapper>
                    );
                  }

                  if (className.includes("highlight-box")) {
                    return (
                      <HighlightBox firstBonus={firstBonus}>
                        {props.children}
                      </HighlightBox>
                    );
                  }
                  if (className.includes("info-card")) {
                    return <InfoCard>{props.children}</InfoCard>;
                  }
                  if (className.includes("tip-box")) {
                    return <TipBox>{props.children}</TipBox>;
                  }
                  if (className.includes("grid-two-columns")) {
                    return (
                      <GridTwoColumns>{props.children}</GridTwoColumns>
                    );
                  }
                  if (className.includes("how-to")) {
                    const hasStepCard = (node.children || []).some(
                      (child) =>
                        child.type === "element" &&
                        hastClassIncludes(child.properties, "step-card"),
                    );
                    if (hasStepCard) {
                      const cardSteps = parseHowToStepCardsFromHast(node);
                      if (cardSteps.length > 0) {
                        return (
                          <ArticleMarkdownHowToStepCards steps={cardSteps} />
                        );
                      }
                    }
                    // Defensive: ensure find always works even if children is missing
                    const steps = (node.children || [])
                      .filter(
                        (child) =>
                          child.type === "element" &&
                          hastClassIncludes(child.properties, "step-item"),
                      )
                      .map((stepNode) => {
                        const titleNode = (stepNode.children || []).find(
                          (n) =>
                            n.type === "element" &&
                            n.tagName === "h5" &&
                            hastClassIncludes(n.properties, "step-title"),
                        );
                        const iconNode = (stepNode.children || []).find(
                          (n) =>
                            n.type === "element" &&
                            n.tagName === "span" &&
                            hastClassIncludes(n.properties, "icon"),
                        );
                        const descNode = (stepNode.children || []).find(
                          (n) =>
                            n.type === "element" &&
                            n.tagName === "p" &&
                            hastClassIncludes(
                              n.properties,
                              "step-description",
                            ),
                        );

                        return {
                          title: titleNode ? textFromHastTree(titleNode) : "",
                          icon: iconNode ? textFromHastTree(iconNode) : "",
                          descriptionChildren: descNode?.children ?? null,
                        };
                      });

                    return <HowToComponent steps={steps} />;
                  }
                  if (
                    props.id === "inline-bonus" ||
                    className.includes("inline-bonus")
                  ) {
                    let bonusName = "";
                    let bonusInfo = "";
                    let bonusLink = props.href;
                    if (node && node.children) {
                      node.children.forEach((child) => {
                        if (
                          child.type === "element" &&
                          child.tagName === "span" &&
                          hastId(child.properties) === "bonus-name"
                        ) {
                          bonusName = textFromHastTree(child);
                        }
                        if (
                          child.type === "element" &&
                          child.tagName === "span" &&
                          hastId(child.properties) === "bonus-info"
                        ) {
                          bonusInfo = textFromHastTree(child);
                        }
                        if (
                          child.type === "element" &&
                          child.tagName === "span" &&
                          hastId(child.properties) === "bonus-link"
                        ) {
                          bonusLink = textFromHastTree(child);
                        }
                      });
                    }
                    return (
                      <InlineBonusCard
                        bonusName={bonusName}
                        bonusInfo={bonusInfo}
                        bonusLink={bonusLink}
                      />
                    );
                  }
                  return <div {...props} />;
                },
                h1: ({ node, className, ...props }) => {
                  const text = textFromHastTree(node);
                  const id = text ? slugifyHeading(text) : undefined;
                  return (
                    <h1
                      className={cn(
                        "scroll-mt-28 text-center text-balance text-[2.35rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#1a1a1a] first:mt-0 mt-5 mb-3 dark:text-neutral-100 md:mt-6 md:mb-3.5 md:text-[2.5rem]",
                        className,
                      )}
                      id={id}
                      {...props}
                    />
                  );
                },
                h2: ({ node, className, ...props }) => {
                  const text = textFromHastTree(node);
                  const id = text ? slugifyHeading(text) : undefined;
                  return (
                    <h2
                      className={cn(
                        "anchor scroll-mt-28 text-center text-balance text-[1.875rem] font-bold leading-snug tracking-[-0.018em] text-[#222] mt-5 mb-2.5 dark:text-neutral-100",
                        className,
                      )}
                      id={id}
                      {...props}
                    />
                  );
                },
                h3: ({ node, className, ...props }) => (
                  <h3
                    className={cn(
                      "scroll-mt-28 text-center text-balance text-2xl font-semibold leading-snug tracking-[-0.016em] text-[#262626] mt-4 mb-2 dark:text-neutral-100",
                      className,
                    )}
                    {...props}
                  />
                ),
                h4: ({ node, className, ...props }) => (
                  <h4
                    className={cn(
                      "scroll-mt-28 text-xl font-semibold leading-snug tracking-[-0.015em] text-[#333] mt-7 mb-3 dark:text-neutral-200",
                      className,
                    )}
                    {...props}
                  />
                ),
                h5: ({ node, className, ...props }) => (
                  <h5
                    className={cn(
                      "scroll-mt-28 text-lg font-semibold leading-snug tracking-[-0.015em] text-[#333] mt-6 mb-2 dark:text-neutral-200",
                      className,
                    )}
                    {...props}
                  />
                ),
                h6: ({ node, className, ...props }) => (
                  <h6
                    className={cn(
                      "scroll-mt-28 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-[#333] mt-5 mb-2 dark:text-neutral-300",
                      className,
                    )}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="mb-4 mt-5 text-[16px] leading-[1.476] tracking-[-0.015em] text-[#333333] first:mt-0 dark:text-neutral-200"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="font-bold text-[#333333] dark:text-neutral-100"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="my-5 list-inside list-disc space-y-1 pl-0 text-[16px] leading-[1.476] tracking-[-0.015em] text-[#333333] marker:text-slate-400 dark:text-neutral-200 dark:marker:text-slate-500"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="my-5 list-inside list-decimal space-y-1 pl-0 text-[16px] leading-[1.476] tracking-[-0.015em] text-[#333333] marker:text-slate-500 dark:text-neutral-200 dark:marker:text-slate-400"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="mb-1.5 text-[16px] leading-[1.476] tracking-[-0.015em] text-[#333333] dark:text-neutral-200"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-blue-300 bg-blue-50/50 pl-2 lg:pl-6 lg:pr-4 pr-2 py-2 italic py-4 lg:my-7 rounded-lg text-blue-800 shadow-sm dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                    {...props}
                  />
                ),
     
                a: ({ node, ...props }) => (
                  <a className={linkClassMd} {...props} />
                ),
                hr: () => (
                  <hr className="my-10 border-0 border-t border-slate-200 dark:border-zinc-600" />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 px-2 md:px-0">
                    <table
                      className="table-auto w-full border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-sm min-w-[600px] dark:bg-zinc-900 dark:border-neutral-700"
                      {...props}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-2 lg:px-6 py-2 lg:py-4 bg-gray-100 text-left text-base font-semibold text-gray-800 uppercase tracking-wider border-b dark:bg-zinc-800 dark:text-gray-300 dark:border-neutral-700"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="px-2 lg:px-6 py-2 lg:py-4 text-sm text-gray-800 border-b dark:text-gray-200 dark:border-neutral-700"
                    {...props}
                  />
                ),
                tr: ({ node, ...props }) => (
                  <tr
                    className="hover:bg-gray-50 transition-colors duration-200 dark:hover:bg-zinc-800"
                    {...props}
                  />
                ),
                tbody: ({ node, ...props }) => <tbody {...props} />,
                thead: ({ node, ...props }) => (
                  <thead className="bg-gray-200 dark:bg-zinc-900" {...props} />
                ),
                tfoot: ({ node, ...props }) => (
                  <tfoot className="bg-gray-100 dark:bg-zinc-800" {...props} />
                ),
                caption: ({ node, ...props }) => (
                  <caption
                    className="text-base font-bold my-4 text-center text-gray-800 dark:text-gray-100"
                    {...props}
                  />
                ),
                img: ({ node, ...props }) => {
                  const className = props.className || "";
                  if (className.includes("cta-box-with-image")) {
                    return (
                      <CtaBoxWithImage {...props} firstBonus={firstBonus} />
                    );
                  }
                  return (
                    <img
                      src={addHttps(props.src)}
                      alt={props.alt}
                      width={560}
                      height={350}
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-contain mx-auto my-8 max-h-[360px] rounded-xl overflow-hidden dark:bg-zinc-900"
                    />
                  );
                },
                iframe: ({ node, className, ...props }) => (
                  <div className="my-3 flex w-full justify-center">
                    <iframe
                      className={cn("max-w-full rounded-xl", className)}
                      {...props}
                    />
                  </div>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};
