#!/usr/bin/env node
/**
 * Fetch key URLs as a normal browser vs Googlebot UA and diff status,
 * redirect chain, canonical, robots, title, and HTML size.
 *
 * This is NOT Search Console URL Inspection and does not rotate geo-IPs.
 * Google's live test can still differ if a CDN/WAF treats real Googlebot specially.
 *
 * Usage:
 *   node scripts/compare-crawler-html.mjs
 *   node scripts/compare-crawler-html.mjs --base https://ppcasinos.co
 */

const BASE = (
  process.argv.includes("--base")
    ? process.argv[process.argv.indexOf("--base") + 1]
    : process.env.SEO_COMPARE_BASE || "https://ppcasinos.co"
).replace(/\/$/, "");

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const PATHS = [
  "/",
  "/se/",
  "/de/",
  "/dk/",
  "/fi/",
  "/no/",
  "/paypal-casino-ireland/",
  "/paypal-casinon-sverige/",
  "/crypto-casinos/",
  "/se/krypto-casinon/",
  "/casino/50-crowns/",
  "/se/casino/klirr-casino/",
  "/contact-us/",
  "/new-casinos/",
  "/blog/",
  "/intl-demo/",
];

function meta(html, name) {
  const re = new RegExp(
    `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const m = html.match(re);
  return m?.[1] ?? "";
}

function canonical(html) {
  const m = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  );
  return m?.[1] ?? "";
}

function title(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return (m?.[1] ?? "").trim();
}

function hreflangCount(html) {
  return (html.match(/rel=["']alternate["'][^>]*hreflang=/gi) || []).length;
}

async function redirectChain(url, userAgent) {
  const chain = [];
  let current = url;
  for (let i = 0; i < 8; i++) {
    const res = await fetch(current, {
      method: "GET",
      redirect: "manual",
      headers: { "user-agent": userAgent, accept: "text/html" },
    });
    const location = res.headers.get("location");
    chain.push({
      url: current,
      status: res.status,
      location: location || undefined,
    });
    if (!location || res.status < 300 || res.status >= 400) {
      let html = "";
      if ((res.headers.get("content-type") || "").includes("html")) {
        html = await res.text();
      }
      return {
        chain,
        finalUrl: current,
        status: res.status,
        html,
        robotsHeader: res.headers.get("x-robots-tag") || "",
      };
    }
    current = new URL(location, current).href;
  }
  return { chain, finalUrl: current, status: 0, html: "", robotsHeader: "" };
}

function summarize(label, result) {
  const { html, status, finalUrl, robotsHeader } = result;
  return {
    label,
    status,
    finalUrl,
    robotsHeader,
    canonical: canonical(html),
    robotsMeta: meta(html, "robots"),
    title: title(html),
    hreflang: hreflangCount(html),
    bytes: html.length,
  };
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const rows = [];
for (const path of PATHS) {
  const url = `${BASE}${path}`;
  process.stderr.write(`Fetching ${path}\n`);
  const browser = await redirectChain(url, BROWSER_UA);
  const bot = await redirectChain(url, GOOGLEBOT_UA);
  const b = summarize("browser", browser);
  const g = summarize("googlebot", bot);
  const { label: _b, ...browserFields } = b;
  const { label: _g, ...botFields } = g;
  const diverge =
    !same(browserFields, botFields) ||
    JSON.stringify(browser.chain.map((c) => [c.status, c.location])) !==
      JSON.stringify(bot.chain.map((c) => [c.status, c.location]));
  rows.push({
    path,
    diverge,
    browser: { ...browserFields, chain: browser.chain },
    googlebot: { ...botFields, chain: bot.chain },
  });
}

const diverged = rows.filter((r) => r.diverge);
console.log(
  JSON.stringify(
    {
      base: BASE,
      fetchedAt: new Date().toISOString(),
      note: "UA-only comparison. Confirm with Search Console Live Test + geo-IP fetches.",
      divergeCount: diverged.length,
      diverged: diverged.map((r) => r.path),
      rows,
    },
    null,
    2,
  ),
);

if (diverged.length) process.exitCode = 1;
