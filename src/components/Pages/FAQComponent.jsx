import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";

import casinoGame from "../../assets/svg/casino-game.svg";

export function FaqSection({ faq }) {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`bg-blue-50/50 px-4  ${
        faq?.fields?.spaceTop !== undefined && faq?.fields?.spaceTop !== null
          ? `pt-${faq.fields.spaceTop}`
          : "pt-8 md:pt-16"
      } ${
        faq?.fields?.spaceBottom !== undefined &&
        faq?.fields?.spaceBottom !== null
          ? `pb-${faq.fields.spaceBottom}`
          : "pb-8 md:pb-16"
      }`}
    >
      <div className="container mx-auto md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 flex items-center justify-center gap-4">
          <div className="flex items-center justify-center min-w-12 min-h-12 w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-gray-200 rounded-full mb-4">
            <img src={casinoGame.src} className="min-w-8 min-h-8 w-8 h-8 md:w-10 md:h-10 text-white inline-block" />
          </div>

          {faq?.fields?.title}
        </h2>

        <div className="space-y-6 w-full max-w-3xl mx-auto">
          {faq?.fields?.faqItems?.map((faqItem, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faqItem.faqQuestion || faqItem.question || index}
                className="border border-blue-200 rounded-lg shadow-sm bg-white transition-all"
              >
                {/* Toggle Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full text-left flex items-center justify-between px-5 py-4 hover:bg-blue-50 transition-colors rounded-t-lg rounded-b-lg ${isOpen ? "bg-blue-50 rounded-b-none" : ""} hover:cursor-pointer`}
                >
                  <span className="text-blue-800 font-semibold text-base md:text-xl">
                    {faqItem.fields.faqQuestion}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-800 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Smooth Collapsible Answer */}
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                  }}
                >
                  <div className="px-5 py-4 text-base text-gray-700 leading-relaxed prose prose-lg [&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-4 [&>ol]:pl-4 [&>ol]:mt-2 [&>ul]:mt-2">
                    <ReactMarkdown>{faqItem.fields.faqAnswer}</ReactMarkdown>
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