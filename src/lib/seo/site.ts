/** Production origin used for canonical + hreflang absolute URLs. */
export const SITE_ORIGIN = "https://ppcasinos.co";

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = SITE_ORIGIN.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}
