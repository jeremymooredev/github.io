/** Prefix an internal path with the site base (for GitHub Pages project sites). */
export function withBase(path: string): string {
  if (path === '/' || path === '') {
    return import.meta.env.BASE_URL;
  }
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
