import {
  Banknote,
  Check,
  ClipboardList,
  CreditCard,
  Eye,
  Gamepad2,
  Headphones,
  Info,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  Quote,
  Shield,
  Smartphone,
  ThumbsDown,
  ThumbsUp,
  UserPlus,
  X,
} from "lucide-react";

import { ArticleMarkdownProsCons } from "./articleMarkdownBlocks.jsx";

const CRITERIA_ICONS = {
  Shield,
  CreditCard,
  Eye,
  Smartphone,
  Headphones,
  LayoutDashboard,
};

const STEP_ICONS = {
  UserPlus,
  Landmark,
  ClipboardList,
  CreditCard,
  Gamepad2,
  Banknote,
};

/** Root wrapper for layout composition (MDX or previews). */
export function ArticleShell({ children }) {
  return (
    <div className="article-markdown flex w-full flex-col">{children}</div>
  );
}

/** Info callout — mirrors CMS `div.info-card` styling. */
export function InfoArticle({ children }) {
  return (
    <div className="info-card my-8 flex flex-col gap-4 rounded-xl border-l-4 border-blue-400 bg-blue-50/60 px-4 py-4 shadow md:flex-row md:px-8 md:py-6 dark:border-blue-700 dark:bg-blue-900/60">
      <Info className="h-7 w-7 shrink-0 text-blue-500 dark:text-blue-300" aria-hidden />
      <div className="min-w-0 flex-1 text-base leading-relaxed text-blue-900 dark:text-blue-100">
        {children}
      </div>
    </div>
  );
}

/** Tip strip — mirrors CMS `div.tip-box`. */
export function TipArticle({ children }) {
  return (
    <div className="tip-box my-6 flex flex-col gap-3 rounded-xl border-l-4 border-yellow-400 bg-yellow-50/80 px-4 py-4 shadow-sm sm:flex-row sm:gap-4 sm:px-8 sm:py-6 dark:border-yellow-700 dark:bg-yellow-900/40">
      <Lightbulb className="h-7 w-7 shrink-0 text-yellow-500 dark:text-yellow-300" aria-hidden />
      <div className="min-w-0 flex-1 text-sm leading-relaxed text-yellow-900 sm:text-base dark:text-yellow-100">
        {children}
      </div>
    </div>
  );
}

export function CriteriaGrid({ children }) {
  return (
    <div className="criteria-grid my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

/**
 * @param {{ icon?: keyof typeof CRITERIA_ICONS, title: string, description: string }} props
 */
export function CriteriaItem({ icon = "Shield", title, description }) {
  const Icon = CRITERIA_ICONS[icon] ?? Shield;
  return (
    <div className="criteria-item flex gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-zinc-900/80">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-green-600 dark:text-green-400" aria-hidden />
      <div className="min-w-0">
        <div className="criteria-title font-heading text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </div>
        <div className="criteria-desc mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </div>
      </div>
    </div>
  );
}

export function EditorNote({ children }) {
  return (
    <aside className="editor-note my-8 flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-5 italic shadow-sm dark:border-neutral-700 dark:bg-zinc-900/60 md:px-6">
      <Quote className="mt-1 h-6 w-6 shrink-0 text-neutral-400 dark:text-neutral-500" aria-hidden />
      <div className="min-w-0 text-neutral-800 not-italic dark:text-neutral-200 [&_p]:mb-2 [&_p]:last:mb-0 [&_p]:leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

/** Pros/cons grid — same layout as `ArticleMarkdownProsCons` / CMS `pros-cons`. */
export function ProsConsArticle(props) {
  return <ArticleMarkdownProsCons {...props} />;
}

export function HowToArticle({ children }) {
  return (
    <div className="how-to my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

/**
 * @param {{ icon?: keyof typeof STEP_ICONS, stepNum: string, title: string, description: string }} props
 */
export function StepCard({ icon = "UserPlus", stepNum, title, description }) {
  const Icon = STEP_ICONS[icon] ?? UserPlus;
  return (
    <div className="step-card flex flex-col rounded-xl border border-neutral-200 bg-white p-5 text-center shadow-sm dark:border-neutral-700 dark:bg-zinc-900/80">
      <div className="step-icon mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <div className="step-num text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {stepNum}
      </div>
      <div className="step-title font-heading mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </div>
      <div className="step-desc mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {description}
      </div>
    </div>
  );
}
