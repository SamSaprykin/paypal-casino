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
            className="text-center text-sm text-green-900 leading-relaxed dark:text-green-100"
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
    <div className="mt-auto space-y-2">
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

const IconSwitch = ({ iconName }) => {
  const iconProps =
    "w-10 h-10 text-green-800 mt-1 flex-shrink-0 dark:text-green-300";
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
  return icons[iconName] || null;
};

const HowToComponent = ({ steps }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex flex-col p-4 border border-orange-200 bg-gradient-to-bl from-yellow-50 via-white to-green-100 rounded-2xl shadow-md transition-transform hover:scale-105 dark:bg-gradient-to-br dark:from-green-900 dark:via-zinc-800 dark:to-yellow-950 dark:border-orange-700"
        >
          <div className="flex flex-col items-center gap-4 mb-3">
            <span className="font-heading text-sm font-semibold text-orange-800 dark:text-orange-300">
              Step {index + 1}
            </span>
            <IconSwitch iconName={step.icon} />
            <h3 className="font-heading text-xl font-semibold text-green-800 text-center leading-snug dark:text-green-300">
              {step.title}
            </h3>
          </div>
          <HastStepDescription
            hastChildren={
              step.descriptionChildren?.length ? step.descriptionChildren : null
            }
          />
        </div>
      ))}
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
        <h3 className="font-heading text-2xl font-bold mb-2 text-green-900 leading-snug dark:text-green-200">
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
  spaceTop,
  spaceBottom,
}) => {
  const pbClass =
    spaceBottom !== undefined && spaceBottom !== null
      ? paddingBottomMap[spaceBottom] ?? "pb-12"
      : "lg:pb-12 pb-6";

  const mtClass =
    spaceTop !== undefined && spaceTop !== null
      ? marginTopMap[spaceTop] ?? "mt-6"
      : "mt-6 lg:mt-12";

  return (
    <div
      className={cn(
        "flex flex-col gap-0 relative container mx-auto px-6 md:px-0",
        pbClass,
        mtClass,
      )}
    >
      <div className="h-auto">
        <div className="pt-2 max-w-none">
          <article className="font-sans prose prose-lg sm:prose-xl prose-neutral max-w-none mx-auto bg-transparent px-0 rounded-lg tracking-normal dark:prose-invert prose-pre:bg-[#10194a]/80 prose-headings:!font-heading prose-headings:!font-semibold prose-h2:!font-bold [&_h1]:!font-heading [&_h2]:!font-heading [&_h3]:!font-heading [&_h4]:!font-heading [&_h5]:!font-heading [&_h6]:!font-heading [&_p]:leading-[1.75] [&_li]:leading-[1.65]">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                div: ({ node, ...props }) => {
                  const className = props.className || "";
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
                    const steps = (node.children || [])
                      .filter(
                        (child) =>
                          child.type === "element" &&
                          hastClassIncludes(child.properties, "step-item"),
                      )
                      .map((stepNode) => {
                        const titleNode = stepNode.children.find(
                          (n) =>
                            n.type === "element" &&
                            n.tagName === "h5" &&
                            hastClassIncludes(n.properties, "step-title"),
                        );
                        const iconNode = stepNode.children.find(
                          (n) =>
                            n.type === "element" &&
                            n.tagName === "span" &&
                            hastClassIncludes(n.properties, "icon"),
                        );
                        const descNode = stepNode.children.find(
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
                        "font-heading text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-[1.12] md:leading-[1.1] tracking-tight dark:text-gray-100",
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
                        "font-heading text-2xl md:text-3xl font-bold mt-10 mb-6 text-gray-800 leading-snug tracking-tight anchor dark:text-gray-200",
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
                      "font-heading text-xl md:text-2xl font-semibold mt-8 mb-5 text-gray-700 leading-snug tracking-tight dark:text-gray-300",
                      className,
                    )}
                    {...props}
                  />
                ),
                h4: ({ node, className, ...props }) => (
                  <h4
                    className={cn(
                      "font-heading text-lg md:text-xl font-semibold mt-6 mb-3 text-gray-700 leading-snug tracking-tight dark:text-gray-300",
                      className,
                    )}
                    {...props}
                  />
                ),
                h5: ({ node, className, ...props }) => (
                  <h5
                    className={cn(
                      "font-heading text-base md:text-lg font-semibold mt-5 mb-2 text-gray-700 leading-snug tracking-tight dark:text-gray-300",
                      className,
                    )}
                    {...props}
                  />
                ),
                h6: ({ node, className, ...props }) => (
                  <h6
                    className={cn(
                      "font-heading text-base font-semibold mt-4 mb-2 text-gray-600 leading-snug tracking-tight dark:text-gray-400",
                      className,
                    )}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-lg leading-[1.75] mb-4 text-gray-950 dark:text-neutral-100"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="leading-relaxed mb-4 text-slate-700 font-bold dark:text-slate-100"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside my-5 pl-0 text-slate-900 marker:text-slate-500 dark:text-slate-100 dark:marker:text-slate-300"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside my-5 pl-0 text-slate-900 marker:text-slate-500 dark:text-slate-100 dark:marker:text-slate-300"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="mb-2 text-base leading-[1.65] text-slate-700 dark:text-slate-200"
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
