import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import jsconfigPaths from 'vite-jsconfig-paths'

export default defineConfig({
  plugins: [react(),jsconfigPaths()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
});



