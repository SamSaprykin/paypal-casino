import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import casinoGame from "../../assets/svg/casino-game.svg";

const paddingTopMap = {
  0: "pt-0",
  4: "pt-4",
  6: "pt-6",
  8: "pt-8",
  12: "pt-12",
  16: "pt-16",
};

/**
 * Renders FAQs from the typed `FaqSection` model.
 *
 * Props:
 *   - title?: string
 *   - items: { question: string; answer: string }[]
 *   - spaceTop?: number
 */
export function FaqAccordion({ title, items = [], spaceTop }) {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const ptClass =
    spaceTop !== undefined && spaceTop !== null
      ? paddingTopMap[spaceTop] ?? "pt-8 md:pt-16"
      : "pt-8 md:pt-16";

  if (!items.length) return null;

  return (
    <div className={`bg-blue-50/50 px-4 pb-8 md:pb-16 ${ptClass}`}>
      <div className="container mx-auto md:py-12">
        {title ? (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 flex items-center justify-center gap-4">
            <div className="flex items-center justify-center min-w-12 min-h-12 w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-gray-200 rounded-full mb-4">
              <img
                src={casinoGame.src}
                className="min-w-8 min-h-8 w-8 h-8 md:w-10 md:h-10 inline-block"
                alt=""
              />
            </div>
            {title}
          </h2>
        ) : null}

        <div className="space-y-6 w-full max-w-3xl mx-auto">
          {items.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`${question}-${index}`}
                className="border border-blue-200 rounded-lg shadow-sm bg-white transition-all"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                  className={`w-full text-left flex items-center justify-between px-5 py-4 hover:bg-blue-50 transition-colors rounded-t-lg rounded-b-lg ${
                    isOpen ? "bg-blue-50 rounded-b-none" : ""
                  } hover:cursor-pointer`}
                >
                  <span className="text-blue-800 font-semibold text-base md:text-xl">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-800 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                  }}
                >
                  <div className="px-5 py-4 text-base text-gray-700 leading-relaxed prose prose-lg max-w-none [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-4 [&>ol]:pl-4 [&>ol]:mt-2 [&>ul]:mt-2">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
