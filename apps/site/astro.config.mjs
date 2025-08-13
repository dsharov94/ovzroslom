import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ovzroslom.ru',
  integrations: [tailwind(), mdx()],
  server: { port: 4321, host: true }
});
