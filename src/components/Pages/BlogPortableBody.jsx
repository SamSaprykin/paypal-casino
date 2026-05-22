"use client";

import { Fragment } from "react";
import { urlForSanityImage } from "../../lib/sanity/imageUrl";

function MarkedText({ child, markDefs }) {
  let node = child.text ?? "";
  const marks = [...(child.marks ?? [])].reverse();
  for (const mark of marks) {
    if (mark === "strong") node = <strong>{node}</strong>;
    else if (mark === "em") node = <em>{node}</em>;
    else if (mark === "code") {
      node = (
        <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{node}</code>
      );
    } else {
      const def = markDefs?.find((d) => d._key === mark);
      if (def?._type === "link" && def.href) {
        node = (
          <a href={def.href} className="text-blue-700 underline hover:text-blue-900">
            {node}
          </a>
        );
      }
    }
  }
  return <Fragment>{node}</Fragment>;
}

function BlockText({ block }) {
  const markDefs = block.markDefs ?? [];
  return (
    <>
      {block.children?.map((child, i) => (
        <MarkedText key={child._key || `span-${i}`} child={child} markDefs={markDefs} />
      ))}
    </>
  );
}

/**
 * Renders Sanity Portable Text JSON for blog bodies / highlights.
 * @param {{ value?: unknown[] | null; wrapperClassName?: string }} props
 */
export default function BlogPortableBody({ value, wrapperClassName }) {
  if (!value?.length) return null;

  const nodes = [];
  let listBuffer = [];

  const flushList = () => {
    if (!listBuffer.length) return;
    const ordered = listBuffer[0]?.listItem === "number";
    const Tag = ordered ? "ol" : "ul";
    const listClass = ordered ? "list-decimal" : "list-disc";
    nodes.push(
      <Tag
        key={`list-${nodes.length}`}
        className={`my-4 ml-6 ${listClass} space-y-2`}
      >
        {listBuffer.map((b, i) => (
          <li key={b._key || `li-${i}`}>
            <BlockText block={b} />
          </li>
        ))}
      </Tag>,
    );
    listBuffer = [];
  };

  for (const block of value) {
    if (!block || typeof block !== "object") continue;
    const b = block;

    if (b._type === "image") {
      flushList();
      const src = urlForSanityImage(b);
      if (src) {
        nodes.push(
          <figure key={b._key || nodes.length} className="my-8">
            <img src={src} alt="" className="w-full rounded-lg shadow-md" loading="lazy" />
          </figure>,
        );
      }
      continue;
    }

    if (b._type === "block" && b.listItem) {
      listBuffer.push(block);
      continue;
    }

    flushList();

    if (b._type !== "block") continue;

    const style = b.style || "normal";
    const inner = <BlockText block={b} />;
    const key = b._key || `blk-${nodes.length}`;

    if (style === "h1") {
      nodes.push(
        <h1 key={key} className="mb-4 mt-10 scroll-mt-24 text-4xl font-bold text-gray-900">
          {inner}
        </h1>,
      );
    } else if (style === "h2") {
      nodes.push(
        <h2 key={key} className="mb-3 mt-10 scroll-mt-24 text-3xl font-bold text-gray-900">
          {inner}
        </h2>,
      );
    } else if (style === "h3") {
      nodes.push(
        <h3 key={key} className="mb-3 mt-8 scroll-mt-24 text-2xl font-semibold text-gray-900">
          {inner}
        </h3>,
      );
    } else if (style === "h4") {
      nodes.push(
        <h4 key={key} className="mb-2 mt-6 text-xl font-semibold text-gray-900">
          {inner}
        </h4>,
      );
    } else if (style === "blockquote") {
      nodes.push(
        <blockquote
          key={key}
          className="my-6 border-l-4 border-blue-400 bg-blue-50/50 py-2 pl-4 italic text-gray-800"
        >
          {inner}
        </blockquote>,
      );
    } else {
      nodes.push(
        <p key={key} className="mb-4 leading-relaxed text-gray-800">
          {inner}
        </p>,
      );
    }
  }

  flushList();

  return (
    <div
      className={
        wrapperClassName ??
        "prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-700"
      }
    >
      {nodes}
    </div>
  );
}
