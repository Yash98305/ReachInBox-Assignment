import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Group all node_modules imports into a separate 'vendor' chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the limit for chunk size warnings
  },
});
