/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      dark: '#0f0f0f',
      'dark-lighter': '#1a1a1a',
      'dark-border': '#333333',
      'light-text': '#e0e0e0',
      'accent-orange': '#ff9500',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
    },
    fontSize: {
      sm: '0.875rem',
      base: '18px',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    lineHeight: {
      normal: '1.7',
      tight: '1.2',
      relaxed: '1.8',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}
