import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5134',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        // configure: (proxy) => {
        //   proxy.on('error', (err) => {
        //     // c oxy error:', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq) => {
        //     // console.log('Proxy request to:', proxyReq.path);
        //   });
        // }
      }
    }
  }
});