/**
 * Client-side search and filtering utilities
 * Provides search and category filtering functionality for posts
 */

import type { Category } from '../config';

/**
 * Search result interface
 * Represents a post that matches search criteria
 */
export interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Category;
}

/**
 * Post interface for search operations
 * Supports posts with title, excerpt, tags, and category
 */
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Category;
  tags?: string[];
}

/**
 * Searches posts by title, excerpt, and tags
 * Case-insensitive search across all text fields
 * @param posts - Array of posts to search
 * @param query - Search query string
 * @returns Array of matching posts
 */
export function searchPosts(posts: Post[], query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase();

  return posts.filter((post) => {
    const searchableText = [
      post.title,
      post.excerpt,
      ...(post.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Filters posts by category
 * @param posts - Array of posts to filter
 * @param category - Category to filter by
 * @returns Array of posts in the specified category
 */
export function filterByCategory(
  posts: Post[],
  category: Category
): SearchResult[] {
  return posts.filter((post) => post.category === category);
}

/**
 * Combines search and category filtering
 * Searches posts and then filters by category
 * @param posts - Array of posts
 * @param query - Search query
 * @param category - Optional category to filter by
 * @returns Array of posts matching both criteria
 */
export function searchAndFilter(
  posts: Post[],
  query: string,
  category?: Category
): SearchResult[] {
  let results: SearchResult[] = posts as SearchResult[];

  if (query.trim()) {
    results = searchPosts(results, query);
  }

  if (category) {
    results = filterByCategory(results, category);
  }

  return results;
}
