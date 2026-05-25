import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(dirname, './src/pages'),
      '@': path.resolve(dirname, './src'),
      '@login': path.resolve(dirname, './src/pages/Login.jsx'),
    },
  },
  server: {
    open: true, // Isso fará o navegador abrir automaticamente na rota raiz (/)
  },
});