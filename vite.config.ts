import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      '@components': new URL('src/components', import.meta.url).pathname,
      '@pages': new URL('src/pages', import.meta.url).pathname,
    },
  },
});
