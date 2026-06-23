import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps all asset URLs relative, so the site works no matter which
// repo / sub-path it is served from on GitHub Pages (repo-name-agnostic).
export default defineConfig({
  base: './',
  plugins: [react()],
})
