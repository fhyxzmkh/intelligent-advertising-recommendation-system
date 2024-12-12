import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/advertise-platform",
  plugins: [react()],
  server: {
    port: 6011,
  },
});
