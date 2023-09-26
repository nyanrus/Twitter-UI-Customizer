import { resolve } from "path";
import { UserConfig, defineConfig } from "vite";
import vitePluginWebExt from "./npm-scripts/vite-plugin/vite-plugin-web-ext.mts";
import path from "path";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import fg from "fast-glob";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

const r = (to: string) => {
    return path.resolve(__dirname, to);
};

export default defineConfig(({ command, mode, ssrBuild }) => {
    let json: UserConfig = {};
    json = {
        root,
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
                    //inject: resolve(__dirname, "src/inject.js"),
                    //twitterOption: resolve(__dirname, "src/shared/options/injectOptions.ts"),
                },
                output: {
                    assetFileNames(chunkInfo) {
                        const extType = chunkInfo.name?.split(".").at(1);
                        if (chunkInfo.name?.includes("inject.js")) {
                            return "inject.js";
                        }
                        return `assets/${extType}/[name]-[hash][extname]`;
                    },
                    format: "es",
                    entryFileNames: "[name].js",
                },
                plugins: [
                    {
                        name: "locale watch",
                        buildStart(options) {
                            fg.globSync(r("_locales/**/*")).forEach((v) => {
                                this.addWatchFile(v);
                            });
                        },
                    },
                ],
            },
            minify: false,
        },

        plugins: [
            {
                name: "copy-inject.js",
                enforce: "post",
                options(options) {
                    // this.addWatch;
                    // console.log("watch");
                    // console.log(options.watch);
                    // if (options.watch) {
                    //     options.watch.include = r("_locales/**");
                    // }
                    // console.log(options.watch);
                },
                buildStart(options) {
                    fs.copyFileSync(r("src/inject.js"), r("dist/inject.js"));
                    fs.cpSync("./_locales", "./dist/_locales", { recursive: true });
                },
            },
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
