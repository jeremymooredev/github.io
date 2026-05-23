import { defineCollection } from 'astro/content/config';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Jeremy Moore'),
    category: z.enum([
      'Terminal',
      'Web Dev',
      'Linux',
      'DevOps',
      'Frontend',
      'Backend',
      'Tools',
    ]),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: file('./src/content/resources/index.json'),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    url: z.string().url(),
    notes: z.string().optional(),
  }),
});

const reading = defineCollection({
  loader: file('./src/content/reading/index.json'),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished']),
    rating: z.number().min(0).max(5).optional(),
    notes: z.string().optional(),
    year: z.number(),
    cover: z.string().optional(),
    link: z.string().url().optional(),
  }),
});

export const collections = {
  blog,
  resources,
  reading,
};
