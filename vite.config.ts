import { resolve as pathResolve } from "path";
import { defineConfig } from "vite";

const FOUNDRY_CONFIG = {
  dataPath: "C:\\Users\\michael.schilling\\AppData\\Local\\FoundryVTT",
  appPath: "C:\\Program Files\\Foundry Virtual Tabletop",
  routePrefix: "",
  openBrowser: true, // Open a web browser when running `npm run build:serve`; defaults to false
};

function resolveUrl(relativePath, absolute = true) {
  const routeStart = absolute ? "/" : "";
  const routePrefix = FOUNDRY_CONFIG.routePrefix
    ? `${FOUNDRY_CONFIG.routePrefix}/`
    : "";
  return `${routeStart}${routePrefix}${relativePath}`;
}

const config = defineConfig(({ command, mode }) => {
  return {
    root: ".",
    publicDir: resolve("public"),
    server: {
      port: 30001,
      //   open: FOUNDRY_CONFIG.openBrowser ?? false,
      //   proxy: {
      //     [`^(?!${resolveUrl("modules/donjon-dungeon-generator")})`]:
      //       "http://localhost:30000/",
      //     [resolveUrl("socket.io/")]: {
      //       target: "ws://localhost:30000",
      //       ws: true,
      //     },
      //   },
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
  };
});

export default config;
function resolve(path: string): string {
  return pathResolve(__dirname, path);
}
