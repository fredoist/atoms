import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets/index.ts'),
      '@components': resolve(__dirname, 'src/components/index.ts'),
      '@pages': resolve(__dirname, 'src/pages/index.ts'),
      '@hooks': resolve(__dirname, 'src/hooks/index.ts'),
      '@config': resolve(__dirname, 'src/config.ts'),
    },
  },
});
