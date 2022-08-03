import { resolve as pathResolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const FOUNDRY_CONFIG = {
  dataPath: "C:\\Users\\michael.schilling\\AppData\\Local\\FoundryVTT",
  appPath: "C:\\Program Files\\Foundry Virtual Tabletop",
  routePrefix: "",
  openBrowser: true, // Open a web browser when running `npm run build:serve`; defaults to false
};

const config = defineConfig(({ command, mode }) => {
  return {
    root: ".",
    publicDir: resolve("public"),
    server: {
      port: 30001,
    },
    build: {
      outDir: resolve("dist"),
      sourcemap: true,
      minify: false,
      lib: {
        name: "donjon-dungeon-generator",
        entry: resolve("src/module.ts"),
        formats: ["es"],
        fileName: () => "donjon-dungeon-generator.js",
      },
    },
    plugins: [command === "serve" ? vue() : null],
  };
});

export default config;

function resolve(path: string): string {
  return pathResolve(__dirname, path);
}
