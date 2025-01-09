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



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import jsconfigPaths from "vite-jsconfig-paths";

// export default defineConfig({
//   plugins: [react(), jsconfigPaths()],
//   resolve: {
//     alias: [
//       { find: "@", replacement: path.resolve(__dirname, "./src") },
//     ],
//   },
//   optimizeDeps: {
//     // PropTypes ve diğer potansiyel sorunlu bağımlılıkları buraya ekleyin
//     include: ["prop-types"],
//   },
//   server: {
//     port: 5173, // Varsayılan portu belirtebilirsiniz
//     open: true, // Sunucu başladığında otomatik olarak tarayıcıyı açar
//   },
//   build: {
//     sourcemap: true, // Hata ayıklama için kaynak haritalarını etkinleştirin
//   },
// });



