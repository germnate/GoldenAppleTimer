import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import md from 'vite-plugin-markdown'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), md.plugin({ mode: md.Mode.HTML })],
  base: '/GoldenAppleTimer/',
  build: {
    outDir: 'build',
  }
})
