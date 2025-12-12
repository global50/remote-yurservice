import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const isLibraryBuild = process.env.BUILD_MODE === 'library';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': '{}',
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared-src'),
    },
  },
  build: isLibraryBuild
    ? {
        outDir: 'dist',
        cssCodeSplit: false,
        cssMinify: true,
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'YurServiceMicrofrontend',
          formats: ['umd'],
          fileName: (format) => `yurservice-microfrontend.umd.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            inlineDynamicImports: true,
            format: 'umd',
            globals: {
              'react': 'React',
              'react-dom': 'ReactDOM',
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') {
                return 'yurservice-microfrontend.umd.css';
              }
              return assetInfo.name || 'asset';
            },
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
        rollupOptions: {
          output: {
            format: 'es',
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
      },
  server: {
    port: 3001,
    cors: true,
  },
});

