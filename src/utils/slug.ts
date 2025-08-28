/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove special characters except hyphens
    .replace(/[^\w\-]+/g, '')
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Validate if a string is a valid slug
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Generate a unique slug by appending a number if needed
 */
export function generateUniqueSlug(text: string, existingSlugs: string[]): string {
  let baseSlug = generateSlug(text);
  let uniqueSlug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

/**
 * Convert a slug back to a readable title
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract slug from a URL path
 */
export function extractSlugFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}

/**
 * Generate a slug with a maximum length
 */
export function generateSlugWithLimit(text: string, maxLength: number = 50): string {
  const slug = generateSlug(text);
  
  if (slug.length <= maxLength) {
    return slug;
  }
  
  // Truncate at word boundary
  const truncated = slug.substring(0, maxLength);
  const lastHyphen = truncated.lastIndexOf('-');
  
  return lastHyphen > 0 ? truncated.substring(0, lastHyphen) : truncated;
}

/**
 * Generate a slug from multiple parts
 */
export function generateSlugFromParts(...parts: string[]): string {
  return parts
    .filter(Boolean)
    .map(part => generateSlug(part))
    .join('-');
}

/**
 * Clean and normalize a slug
 */
export function normalizeSlug(slug: string): string {
  return generateSlug(slug);
}

