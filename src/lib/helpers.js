export const addHttps = (url) => {
  return url?.startsWith("//images.ctfassets.net") ? `https:${url}` : url;
};

export const slugify = (text) => {
  return text?.toLowerCase().replace(/ /g, "-");
};
