import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("/three/")) {
            return "vendor-three-core";
          }

          if (id.includes("@react-three/fiber")) {
            return "vendor-r3f-core";
          }

          if (id.includes("@react-three/drei")) {
            return "vendor-r3f-drei";
          }

          if (id.includes("react-markdown") || id.includes("remark-math") || id.includes("rehype-katex") || id.includes("katex")) {
            return "vendor-markdown-math";
          }

          if (id.includes("@supabase") || id.includes("@trpc") || id.includes("zod") || id.includes("superjson") || id.includes("msgpackr")) {
            return "vendor-data";
          }

          if (id.includes("wouter") || id.includes("react") || id.includes("react-dom")) {
            return "vendor-react";
          }

          return;
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.API_PORT || 3001}`,
        changeOrigin: true,
      },
    },
  },
});
