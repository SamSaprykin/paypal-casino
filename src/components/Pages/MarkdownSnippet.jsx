import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Lightweight markdown island for Astro pages (intl markdown / HTML snippets from Sanity). */
export function MarkdownSnippet({ markdown }) {
  if (!markdown || typeof markdown !== "string" || !markdown.trim()) return null;
  return (
    <div className="prose prose-neutral max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
