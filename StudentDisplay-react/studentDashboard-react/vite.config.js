import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/projects/student-dashboard/',
  plugins: [react()],
})