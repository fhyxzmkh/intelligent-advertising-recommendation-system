import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/news-platform/",
  plugins: [react()],
  server: {
    port: 6010,
  },
});
