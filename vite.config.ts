import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          lottie: ["react-lottie-player"],
          pageflip: ["react-pageflip"],
          three: ["three"],
          drei: ["@react-three/drei"],
          fiber: ["@react-three/fiber"],
          rapier: ["@react-three/rapier"],
        },
      },
    },
  },

  server: {
    host: true,
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
