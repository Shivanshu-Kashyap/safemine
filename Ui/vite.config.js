import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite Configuration
export default defineConfig({
  server: {
    proxy: {
      '/api/v1/users': process.env.NODE_ENV === 'development' ? 'http://localhost:8002' : 'https://safemine.onrender.com', // Backend API URL
      '/api/v1/workers': process.env.NODE_ENV === 'development' ? 'http://localhost:8002' : 'https://safemine.onrender.com',
      '/api/v1/details': process.env.NODE_ENV === 'development' ? 'http://localhost:8002' : 'https://safemine.onrender.com',
    },
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
