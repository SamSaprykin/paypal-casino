"use client";

import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export const Markdown = ({
  content,
}) => {
  return (
    <div
      className={`w-full max-w-6xl mx-auto flex flex-col gap-4 relative container mx-auto`}
    >

          <div>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>


  );
};