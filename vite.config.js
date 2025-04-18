import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  css: {
    postcss: "./postcss.config.js", // Explicitly point to your PostCSS config
  },
  optimizeDeps: {
    include: ["@fontsource-variable/montserrat"], // Optional: for font optimization
  },
});
