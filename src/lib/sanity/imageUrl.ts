import imageUrlBuilder from "@sanity/image-url";

function getBuilder() {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  const dataset = import.meta.env.SANITY_DATASET;
  if (!projectId || !dataset) {
    return null;
  }
  return imageUrlBuilder({ projectId, dataset });
}

/** Resolve a Sanity image field or portable-text image block for `<img src>`. */
export function urlForSanityImage(source: unknown): string | undefined {
  if (!source || typeof source !== "object") return undefined;
  const b = getBuilder();
  if (!b) return undefined;
  try {
    return b.image(source as never).url();
  } catch {
    const asset = (source as { asset?: { url?: string } }).asset?.url;
    return asset;
  }
}
