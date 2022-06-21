import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require';

export default defineConfig({
  envPrefix: 'TRBL_',
  plugins: [react(), vitePluginRequire()],
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  define: {
    'process.env': process.env,
  },
});
