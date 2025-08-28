import type { ContentfulAsset } from '../types/contentful';

/**
 * Generate optimized image URL from Contentful asset
 */
export function getOptimizedImageUrl(
  asset: ContentfulAsset,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp' | 'avif';
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
    focus?: 'center' | 'top' | 'right' | 'left' | 'bottom' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'face' | 'faces';
  } = {}
): string {
  const baseUrl = asset.fields.file.url;
  const params = new URLSearchParams();

  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('fm', options.format);
  if (options.fit) params.set('fit', options.fit);
  if (options.focus) params.set('f', options.focus);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Generate responsive image srcset from Contentful asset
 */
export function getResponsiveImageSrcSet(
  asset: ContentfulAsset,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  options: {
    quality?: number;
    format?: 'jpg' | 'png' | 'webp' | 'avif';
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
    focus?: 'center' | 'top' | 'right' | 'left' | 'bottom' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'face' | 'faces';
  } = {}
): string {
  return widths
    .map(width => {
      const url = getOptimizedImageUrl(asset, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate image sizes attribute for responsive images
 */
export function getImageSizes(breakpoints: { [key: string]: string } = {}): string {
  const defaultBreakpoints = {
    '(max-width: 640px)': '100vw',
    '(max-width: 768px)': '100vw',
    '(max-width: 1024px)': '50vw',
    ...breakpoints,
  };

  const sizes = Object.entries(defaultBreakpoints)
    .map(([query, size]) => `${query} ${size}`)
    .join(', ');

  return `${sizes}, 33vw`;
}

/**
 * Get image dimensions from Contentful asset
 */
export function getImageDimensions(asset: ContentfulAsset): { width: number; height: number } | null {
  const details = asset.fields.file.details;
  if (details.image) {
    return {
      width: details.image.width,
      height: details.image.height,
    };
  }
  return null;
}

/**
 * Calculate aspect ratio from image dimensions
 */
export function getImageAspectRatio(asset: ContentfulAsset): number | null {
  const dimensions = getImageDimensions(asset);
  if (dimensions) {
    return dimensions.width / dimensions.height;
  }
  return null;
}

/**
 * Check if asset is an image
 */
export function isImage(asset: ContentfulAsset): boolean {
  return asset.fields.file.contentType.startsWith('image/');
}

/**
 * Get image alt text with fallback
 */
export function getImageAlt(asset: ContentfulAsset, fallback: string = ''): string {
  return asset.fields.title || asset.fields.description || fallback;
}

/**
 * Generate blur placeholder data URL for images
 */
export function getBlurDataURL(asset: ContentfulAsset): string {
  const blurUrl = getOptimizedImageUrl(asset, {
    width: 10,
    height: 10,
    quality: 10,
    format: 'jpg',
  });
  
  // Return a simple blur data URL - in a real implementation,
  // you might want to generate this server-side or use a service
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="#f3f4f6"/>
    </svg>
  `)}`;
}

/**
 * Generate optimized image props for common use cases
 */
export function getImageProps(
  asset: ContentfulAsset,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp' | 'avif';
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
    focus?: 'center' | 'top' | 'right' | 'left' | 'bottom' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'face' | 'faces';
    responsive?: boolean;
    lazy?: boolean;
  } = {}
) {
  const {
    width = 800,
    height,
    quality = 80,
    format = 'webp',
    fit = 'fill',
    focus = 'center',
    responsive = true,
    lazy = true,
  } = options;

  const src = getOptimizedImageUrl(asset, {
    width,
    height,
    quality,
    format,
    fit,
    focus,
  });

  const alt = getImageAlt(asset);
  
  const props: Record<string, any> = {
    src,
    alt,
    loading: lazy ? 'lazy' : 'eager',
  };

  if (responsive) {
    props.srcset = getResponsiveImageSrcSet(asset, undefined, {
      quality,
      format,
      fit,
      focus,
    });
    props.sizes = getImageSizes();
  }

  const dimensions = getImageDimensions(asset);
  if (dimensions) {
    props.width = width;
    props.height = height || Math.round((width * dimensions.height) / dimensions.width);
  }

  return props;
}

