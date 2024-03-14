import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import EnvironmentPlugin from 'vite-plugin-environment'



dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.VITE_APP_PORT
  },
  plugins: [react(),EnvironmentPlugin('all', { prefix: 'VITE_' })],
  build:{
    rollupOptions: {
      external: []
    },
  },
})
