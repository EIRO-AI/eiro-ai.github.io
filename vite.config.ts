import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/eiro-ai.github.io/', // Replace 'eiro-website' with your actual GitHub repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
