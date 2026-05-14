// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://timraysby.com',

  // Astro 6 default: static + on-demand. Pages prerender by default; routes
  // that `export const prerender = false` become Worker functions. Used by
  // /api/consulting-waitlist.

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});
