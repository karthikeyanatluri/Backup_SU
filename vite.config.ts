import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // run on 5174 so it doesn't conflict with 5173 if running locally
    host: true,
  },
});
