import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/ - Cleaned Config
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/node_modules\/(react|react-dom|react-router-dom|scheduler)\//.test(id)) {
            return "vendor-react";
          }
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) {
            return "vendor-motion";
          }
          if (id.includes("/node_modules/@supabase/")) return "vendor-supabase";
          if (id.includes("/node_modules/@radix-ui/")) return "vendor-radix";
        },
      },
    },
  },
}));
