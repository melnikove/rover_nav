import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/socket.io/': {
        target: 'http://localhost:3006',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    }
  },
  plugins: [react()],
})
