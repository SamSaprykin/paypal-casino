"use client";

import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import { ArrowRight, Crown } from "lucide-react";
import { addHttps } from "../../lib/helpers";
import remarkGfm from "remark-gfm";

const baseStyles =
  "h-12 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer text-sm md:text-base bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl focus:ring-blue-600";

const CtaBoxWithImage = ({ src, alt, className, firstBonus }) => {
  console.log(firstBonus);
  return (
    <div className="flex flex-col gap-4 w-2/3 my-8 border-2 border-blue-500 rounded-xl p-4 relative overflow-hidden mx-auto bg-gradient-to-br from-blue-200 via-gray-100 to-blue-100">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-1/3">
          <h3 className="text-3xl font-bold mb-2">{firstBonus.fields.name}</h3>
          <p className="text-lg text-gray-700 font-semibold">{firstBonus.fields.description}</p>
        </div>
        <button
          className={`w-full group lg:max-w-60 mt-4 lg:mt-0 ${baseStyles}`}         
          onClick={() => {
            window.open(firstBonus.fields.referralUrl, "_blank");
          }}
        >
          <span>Get Bonus</span>
          <ArrowRight className="w-4 h-4 ml-2 transform transition-all duration-300 group-hover:ml-4 group-hover:text-gray-600 rounded-full group-hover:bg-blue-100" />
        </button>
      </div>
      <img
        src={addHttps(src)}
        alt={alt}
        width={400}
        height={300}
        sizes="(max-width: 768px) 100vw, 800px"
        className={` border-4 border-blue-200 object-contain rounded-xl mx-auto my-4 float-right ml-8 ${className} absolute top-2  -right-4`}
      />
    </div>
  );
};

const HighlightBox = ({ firstBonus, ...props }) => {
  console.log(firstBonus);
  return (
    <div className="my-6 border-2 border-blue-500 bg-gradient-to-br from-blue-200 via-gray-100 to-blue-100 px-12 py-4 rounded-lg flex gap-3 flex items-center justify-between gap-12 w-full max-w-4xl mx-auto">
      <Crown className="w-20 h-20 text-blue-500" />
      <div className="text-blue-900">{props.children}</div>
      <button
        variant="primary"
        size="lg"
        className={`w-full group lg:max-w-60 mt-4 lg:mt-0 ${baseStyles}`}
        onClick={() => {
          window.open(firstBonus.referralUrl, "_blank");
        }}
      >
        <span>Play Now</span>
        <ArrowRight className="w-4 h-4 ml-2 transform transition-all duration-300 group-hover:ml-4 group-hover:text-gray-600 rounded-full group-hover:bg-blue-100" />
      </button>
    </div>
  );
};

export const ContentComponent = ({
  content,
  firstBonus,
  spaceTop,
  spaceBottom,
}) => {
  return (
    <div
      className={`w-full max-w-6xl mx-auto flex flex-col gap-4 relative container mx-auto ${spaceBottom ? `pb-${spaceBottom}` : "lg:pb-16 pb-8"} ${spaceTop ? `mt-${spaceTop}` : ""}`}
    >
      <div className={`mt-8 h-auto`}>
        <div className="pt-4 px-4 lg:px-0 lg:pt-8 max-w-none">
          <div className="mb-8">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                div: ({ node, ...props }) => {
                  const className = props.className || "";
                  if (className.includes("highlight-box")) {
                    return <HighlightBox firstBonus={firstBonus} {...props} />;
                  }

                  return <div {...props} />;
                },
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl md:text-4xl lg:text-5xl font-extrabold lg:my-10 my-6 text-primary"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold lg:my-8 my-6 text-secondary"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold lg:my-6 my-4 text-accent"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside my-4 pl-8 text-foreground"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside my-4 pl-8 text-foreground"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-2 text-muted-foreground" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-muted pl-6 italic my-6 text-muted-foreground"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-600 hover:text-blue-700 underline hover:text-secondary transition-colors duration-200"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-lg leading-relaxed my-4 text-foreground"
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto">
                    <table
                      className="table-auto w-full border-collapse"
                      {...props}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    {...props}
                  />
                ),
                tr: ({ node, ...props }) => (
                  <tr
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                    {...props}
                  />
                ),
                tbody: ({ node, ...props }) => <tbody {...props} />,
                thead: ({ node, ...props }) => (
                  <thead className="bg-gray-200" {...props} />
                ),
                tfoot: ({ node, ...props }) => (
                  <tfoot className="bg-gray-100" {...props} />
                ),
                caption: ({ node, ...props }) => (
                  <caption
                    className="text-lg font-bold my-4 text-center text-gray-800"
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
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain rounded-xl mx-auto my-4 float-right ml-8"
                    />
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};