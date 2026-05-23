/**
 * Site configuration and constants
 * Metadata, social links, and feature configurations
 */

export const SITE_TITLE = 'Jeremy Moore';
export const SITE_DESCRIPTION = 'Web Development & Linux Tips for Developers';
export const THRIFTBOOKS_URL = 'https://www.thriftbooks.com/share/?code=5NS%252bUfKz0EyShW6gzUWrEw%253d%253d'

export const SOCIAL_LINKS = {
  github: 'https://github.com/jeremymooredev',
  twitter: 'https://x.com/JeremyMooreDev',
  linkedin: 'https://www.linkedin.com/in/jeremymoore1/',
};

/** ThriftBooks ReadingRewards — update if your referral link changes */
export const THRIFTBOOKS_URL = 'https://www.thriftbooks.com/readingrewards/';

export const NEWSLETTER_CTA = {
  headline: 'Get web dev & Linux tips',
  description: 'New tips delivered to your inbox',
  placeholder: 'your@email.com',
  ctaText: 'Subscribe',
};

/** `data-uid` from Kit → Embed → JavaScript */
export const KIT_FORM_UID = import.meta.env.PUBLIC_KIT_FORM_UID ?? '8562c4c14d';
/** Host from the embed script src (e.g. jeremy-moore-dev.kit.com) */
export const KIT_EMBED_HOST =
  import.meta.env.PUBLIC_KIT_EMBED_HOST ?? 'jeremy-moore-dev.kit.com';

export const kitFormUrl = `https://${KIT_EMBED_HOST}/${KIT_FORM_UID}`;
export const kitEmbedSrc = `${kitFormUrl}/index.js`;

export const CATEGORIES = [
  'Terminal',
  'Web Dev',
  'Linux',
  'DevOps',
  'Frontend',
  'Backend',
  'Tools',
] as const;

export type Category = typeof CATEGORIES[number];
