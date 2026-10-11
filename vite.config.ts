import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Plain client-side SPA: `vite build` emits static files to dist/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Resolves the "@/*" alias from tsconfig.json.
    tsconfigPaths: true,
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
  },
});
