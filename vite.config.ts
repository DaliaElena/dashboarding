import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dashboarding/', 
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        fallback: '404.html', 
      },
    },
  },
});
