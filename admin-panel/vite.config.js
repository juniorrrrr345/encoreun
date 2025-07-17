import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour Panel Admin CBD Shop
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // Panel Admin sur port 3001
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // API Backend
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    port: 3001
  }
})