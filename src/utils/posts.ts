import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../config';

type BlogEntry = CollectionEntry<'blog'>;

/** Drafts are visible in dev; excluded from production builds and listings. */
export function isPublished(entry: BlogEntry): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}

export async function getPublishedPosts(): Promise<BlogEntry[]> {
  return getCollection('blog', isPublished);
}

/** Categories that appear on at least one post, in config order. */
export function getActiveCategories(posts: BlogEntry[]): string[] {
  const used = new Set(posts.map((post) => post.data.category));
  return CATEGORIES.filter((category) => used.has(category));
}

/** Tags that appear on at least one post, alphabetically. */
export function getActiveTags(posts: BlogEntry[]): string[] {
  const used = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      used.add(tag);
    }
  }
  return [...used].sort((a, b) => a.localeCompare(b));
}

export function getPostSlug(post: BlogEntry): string {
  return post.id.replace(/\.\w+$/, '');
}
