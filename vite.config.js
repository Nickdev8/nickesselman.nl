import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/cv-download": {
        target: "https://ntfy.sh",
        changeOrigin: true,
        rewrite: () => "/nickesselman-nickcvdownload",
      },
    },
  },
});
