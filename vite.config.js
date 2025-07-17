import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour Boutique Frontend CBD Shop
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Boutique Frontend sur port 3000
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
    port: 3000
  }
})