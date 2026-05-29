import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  css: {
    postcss: {},
  },
  // 🎯 Solisyon Pwòp: Nou pèmèt tout host nèt pou evite bl blockage
  preview: {
    allowedHosts: true
  }
});