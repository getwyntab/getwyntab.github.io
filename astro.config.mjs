import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://getwyntab.github.io',
  output: 'static',
  outDir: 'dist',
  vite: {
    plugins: [tailwindcss()],
  },
});
