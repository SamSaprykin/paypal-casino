import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  site: 'https://your-site.com', // Replace with your actual site URL
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      include: ['contentful'],
    },
  },
});

