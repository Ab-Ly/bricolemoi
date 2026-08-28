import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash]-v3.js',
        chunkFileNames: 'assets/[name]-[hash]-v3.js',
        assetFileNames: 'assets/[name]-[hash]-v3.[ext]',
        manualChunks: {
          'maplibre-vendor': ['maplibre-gl'],
          'firebase-vendor': ['firebase/app', 'firebase/auth'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['@phosphor-icons/react', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1200
  }
});
