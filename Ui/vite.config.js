import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite Configuration
export default defineConfig({
  server: {
    proxy: {
      '/api/v1/users': 'http://localhost:8002', // Backend API URL
      '/api/v1/workers': 'http://localhost:8002', // Backend API URL
      '/api/v1/details': 'http://localhost:8002',
    },
  },
  plugins: [react()],
});
