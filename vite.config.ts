import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'] as const;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: Object.fromEntries(
      layers.map((layer) => [
        layer,
        fileURLToPath(new URL(`./src/${layer}`, import.meta.url)),
      ]),
    ),
  },
});
