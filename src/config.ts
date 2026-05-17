/**
 * Site configuration and constants
 * Metadata, social links, and feature configurations
 */

export const SITE_TITLE = 'Jeremy Moore';
export const SITE_DESCRIPTION = 'Web Development & Linux Tips for Developers';

export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
};

export const NEWSLETTER_CTA = {
  headline: 'Get web dev & Linux tips',
  description: 'New tips delivered to your inbox every week',
  placeholder: 'your@email.com',
  ctaText: 'Subscribe',
};

export const CATEGORIES = [
  'Web Dev',
  'Linux',
  'DevOps',
  'Frontend',
  'Backend',
  'Tools',
] as const;

export type Category = typeof CATEGORIES[number];
