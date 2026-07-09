import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/admitere-liceu-2026/',
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
})