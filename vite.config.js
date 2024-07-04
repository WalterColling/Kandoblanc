import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        object: resolve(__dirname, "object.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 5173, // Specify the port number
  },
});
