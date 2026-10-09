import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Fullstack Cloudflare Pages & SSR configuration
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  server: {
    port: 4321,
    host: true
  }
});
