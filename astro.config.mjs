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
      filter: (page) => {
        const gone = [
          "/intl-demo",
          "/404",
          "/classic-games",
          "/blocked-casinos",
          "/gesperrte-casinos",
          "/blokerede-kasinoer",
          "/estettyt-kasinot",
          "/blokkerte-kasinoer",
          "/blockerade-casinon",
          "/new-casinos",
          "/neue-casinos",
          "/nye-kasinoer",
          "/uudet-kasinot",
          "/nya-casinon",
          "/casino-bonuses",
          "/casino-bonus",
          "/casino-bonusser",
          "/kasinobonukset",
          "/casino-bonuser",
          "/casinobonusar",
          "/fast-payout-casinos",
          "/casinos-mit-schneller-auszahlung",
          "/kasinoer-med-hurtig-udbetaling",
          "/nopeat-kotiutukset-kasinot",
          "/kasinoer-med-rask-utbetaling",
          "/casinon-med-snabb-utbetalning",
          "/mobile-casinos",
          "/handy-casinos",
          "/mobil-kasinoer",
          "/mobiilikasinot",
          "/mobilkasinoer",
          "/mobilcasinon",
          "/minimum-deposit-casinos",
          "/casinos-mit-mindesteinzahlung",
          "/kasinoer-med-lav-indbetaling",
          "/pienen-talletuksen-kasinot",
          "/kasinoer-med-lav-innskudd",
          "/casinon-med-lag-insattning",
          "/revolut-casinos",
          "/revolut-kasinoer",
          "/revolut-kasinot",
          "/revolut-casinon",
          "/blog",
        ];
        return !gone.some((path) => page.includes(path));
      },
    }),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/intl-demo", "/goto"],
        },
      ],
    }),
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
