import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'assets/index.ts'),
      '@components': resolve(__dirname, 'components/index.ts'),
      '@pages': resolve(__dirname, 'pages/index.ts'),
      '@hooks': resolve(__dirname, 'hooks/index.ts'),
    }
  }
})
