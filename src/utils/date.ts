/**
 * Format a date string into a human-readable format
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Format a date string into a short format (e.g., "Jan 15, 2024")
 */
export function formatDateShort(dateString: string): string {
  return formatDate(dateString, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date string into a relative format (e.g., "2 days ago")
 */
export function formatDateRelative(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
}

/**
 * Get the reading time estimate for content
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return `${minutes} min read`;
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}

/**
 * Check if a date is today
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Format date for ISO string (useful for datetime attributes)
 */
export function formatDateISO(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString();
}

/**
 * Get the start of day for a given date
 */
export function getStartOfDay(dateString: string): Date {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Get the end of day for a given date
 */
export function getEndOfDay(dateString: string): Date {
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 999);
  return date;
}

