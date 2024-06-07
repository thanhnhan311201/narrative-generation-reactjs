import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: ["babel-plugin-macros"],
        },
      }),
    ],
    assetsInclude: ["**/*.md"],
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
        "@public": path.join(__dirname, "public"),
      },
    },
    server: {
      host: process.env.VITE_HOST,
      port: Number(process.env.VITE_PORT),
    },
    build: {
      outDir: "build",
    },
  });
};
