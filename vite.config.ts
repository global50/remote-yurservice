import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const isLibraryBuild = process.env.BUILD_MODE === 'library';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared-src'),
    },
  },
  build: isLibraryBuild
    ? {
        outDir: 'dist',
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'YurServiceMicrofrontend',
          formats: ['es'],
          fileName: 'yurservice-microfrontend',
        },
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
          },
        },
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: false,
            drop_debugger: true,
          },
        },
      }
    : {
        outDir: 'dist',
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: false,
            drop_debugger: true,
          },
        },
      },
  server: {
    port: 3001,
    cors: true,
  },
});

