import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
//export default defineConfig({
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // server: { port: 3001 },
    root,
    plugins: [react()],
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(root, "index.html"),
          // signup: resolve(root, "signup", "index.html"),
          // artists: resolve(root, "artists", "index.html"),
          // privacypolicy: resolve(root, "privacypolicy", "index.html"),
        },
      },
    },
  };
});
