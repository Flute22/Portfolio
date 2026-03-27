import path from 'path';
<<<<<<< HEAD
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
=======
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
>>>>>>> 77ac77f02cb747e938e2f94013a43a3cf71ebaf4
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
<<<<<<< HEAD
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
=======
      }
    },
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Use esbuild (built into Vite, no extra install)
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // Split vendor chunks for better caching
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'charts': ['recharts'],
            'icons': ['lucide-react'],
          },
        },
      },
>>>>>>> 77ac77f02cb747e938e2f94013a43a3cf71ebaf4
    },
  };
});
