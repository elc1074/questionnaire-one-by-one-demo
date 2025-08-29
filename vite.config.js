import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/questionnaire-one-by-one-demo/',
  build: {
    outDir: 'dist', // Make sure the build output is directed to 'dist' folder
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
