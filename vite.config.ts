import { resolve } from "path";
import { UserConfig, defineConfig } from "vite";
import vitePluginWebExt from "./npm-scripts/vite-plugin/vite-plugin-web-ext.mts";
import path from "path";
import vue from "@vitejs/plugin-vue";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig(({ command, mode, ssrBuild }) => {
    let json: UserConfig = {};
    json = {
        //root,
        build: {
            outDir,
            emptyOutDir: false,
            sourcemap: true,

            rollupOptions: {
                input: {
                    "ent-options_html": resolve(__dirname, "src/options/options.html"),
                    "ent-popup_html": resolve(__dirname, "src/popup/popup.html"),
                    index: resolve(__dirname, "src/content/index.ts"),
                    background: resolve(__dirname, "./src/background.ts"),
                    inject: resolve(__dirname, "src/inject.js"),
                },
                output: {
                    format: "es",
                    entryFileNames: "[name].js",
                },
                plugins: [],
            },
            minify: false,
        },
        plugins: [
            vue(),
            vitePluginWebExt(
                __dirname,
                path.resolve(__dirname, "dist"),
                path.resolve(__dirname, "dist"),
                mode,
            ),
        ],
    };
    return json;
});
