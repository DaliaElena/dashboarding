import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dashboarding/', // Asegúrate de usar la base correcta para GitHub Pages
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
    },
  },
});
