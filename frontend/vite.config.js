import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './dist',
    // Set the base path here if necessary
    base: './', // Adjust based on your deployment scenario
  },
  plugins: [react()],
})
