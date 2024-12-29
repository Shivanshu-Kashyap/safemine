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
  build: {
    // Increase the chunk size warning limit if needed
    chunkSizeWarningLimit: 1000, // (default is 500 KB)

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Manually split large node_modules packages into separate chunks
          if (id.includes('node_modules')) {
            // Example: Split libraries like react, lodash, etc., into separate chunks
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            return 'vendor'; // Catch-all for other dependencies
          }
        },
      },
    },
  },
});
