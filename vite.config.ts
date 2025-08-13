import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const module = id?.split("node_modules/")?.pop()?.split("/")[0];
            return `vendor-${module}`;
          }
          return null;
        },
      },
    },
  },
});
