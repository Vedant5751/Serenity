import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      'aws-sdk': resolve(__dirname, 'node_modules/aws-sdk/dist/aws-sdk.min.js'),
    },
  },
  build: {
    rollupOptions: {
      external: ['aws-sdk'],
    },
  },
});
