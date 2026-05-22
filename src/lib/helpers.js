export const addHttps = (url) => {
  if (!url) return url;
  if (url.startsWith("//cdn.sanity.io")) return `https:${url}`;
  if (url.startsWith("//images.ctfassets.net")) return `https:${url}`;
  return url;
};

export const slugify = (text) => {
  return text?.toLowerCase().replace(/ /g, "-");
};
