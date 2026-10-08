import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The remote API sends no CORS headers, so dev requests go through this proxy.
    proxy: {
      '/api': {
        target: 'https://app.econverse.com.br',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api/, '/teste-front-end/junior/tecnologia/lista-produtos'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Lets any *.module.scss do `@use 'variables' as *;`
        loadPaths: ['src/styles'],
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
