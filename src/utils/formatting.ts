/**
 * Text formatting and content utilities
 * Date formatting, reading time calculation, slug generation, and excerpt extraction
 */

/**
 * Formats a date to "Month Day, Year" format
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., "January 15, 2025")
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Calculates estimated reading time for content
 * Based on 200 words per minute average reading speed
 * @param content - Text content to analyze
 * @returns Reading time in minutes
 */
export function getReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

/**
 * Converts text to URL-safe slug format
 * Converts to lowercase, removes special characters, replaces spaces with hyphens
 * @param text - Text to slugify
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Extracts an excerpt from content
 * Returns the first N characters, breaking at word boundaries if possible
 * @param content - Full content text
 * @param length - Maximum length of excerpt (default: 160)
 * @returns Excerpt with ellipsis if truncated
 */
export function extractExcerpt(content: string, length: number = 160): string {
  const trimmed = content.trim();

  if (trimmed.length <= length) {
    return trimmed;
  }

  // Find the last space within the length limit to break at word boundary
  const truncated = trimmed.substring(0, length);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  const endIndex = lastSpaceIndex > 0 ? lastSpaceIndex : length;
  return trimmed.substring(0, endIndex) + '...';
}
