import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeRaw],
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes("/intl-demo") && !page.includes("/404"),
    }),
    robotsTxt(),
  ],
  trailingSlash: "always",
  output: "static",
  site: "https://ppcasinos.co/", // Replace with your actual site URL
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
