import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import agentReady from './scripts/vite-plugin-agent-ready.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    agentReady(),
    tailwindcss(),
    react(),
  ],
})
