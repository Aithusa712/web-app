import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // 0.0.0.0 in container
    port: 3000,
    strictPort: true,
    hmr: { clientPort: 3000 },
    watch: { usePolling: true },
    allowedHosts: ["frontend", "localhost", "127.0.0.1"]
  }
})
