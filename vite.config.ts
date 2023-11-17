import { resolve } from "path";
import { UserConfig, defineConfig, PluginOption } from "vite";

import path from "path";
import fs from "fs";

import tailwindcss from "tailwindcss";

// Vite Plugins
import { viteVueCESubStyle } from "@unplugin-vue-ce/sub-style";
import svgLoader from "vite-svg-loader";
import vitePluginWebExt from "./npm-scripts/vite-plugin/vite-plugin-web-ext";
//

import vue from "@vitejs/plugin-vue";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

const r = (str) => {
    return resolve(__dirname, str);
};

export default defineConfig(({ command, mode, ssrBuild }) => {
    let json: UserConfig = {};
    json = {
        root,
        // base: "/",
        build: {
            outDir,
            emptyOutDir: false,
            sourcemap: true,
            // outDir,
            target: "es2020",

            rollupOptions: {
                // watch: {
                //     // chokidar: {
                //     //     cwd: __dirname,
                //     // },
                //     exclude: ["dist/*"],
                //     // include: ["vite.config.ts", "package.json", "_locales", "i18n", "icon", "npm-scripts", "manifestChange.mjs", "manifestConfigs.json", "src"].map((value) => {
                //     //     return resolve(__dirname, value);
                //     // }),
                // },
                input: {
                    "ent-options_html": resolve(__dirname, "src/options/options.html"),
                    "ent-popup_html": resolve(__dirname, "src/popup/popup.html"),
                    index: resolve(__dirname, "src/content/index.js"),
                    background: resolve(__dirname, "./src/background.ts"),
                    //safemode: resolve(__dirname, "src/shared/options/injectSafeMode.ts"),
                },
                output: {
                    dynamicImportInCjs: true,
                    format: "es",
                    entryFileNames: "[name].js",
                },
                plugins: [],
            },
            minify: false,
        },
        // resolve: {
        //     alias: {
        //         "@content": "/",
        //     },
        // },
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
                    console.log("copy-injectjs");
                    fs.copyFileSync(r("src/inject.js"), r("dist/inject.js"));
                    fs.copyFileSync(r("src/safemode.html"), r("dist/safemode.html"));
                },
            },
            vitePluginWebExt(__dirname, path.resolve(__dirname, "dist"), path.resolve(__dirname, "dist"), mode),
            // Vue Plugins
            vue(),
            svgLoader(),
            viteVueCESubStyle() as PluginOption,
        ],
        // };
        // break;
        // case "content":
        //     json = {
        //         root,
        //         build: {
        //             sourcemap: true,
        //             outDir,
        //             lib: {
        //                 entry: [resolve(__dirname, "src/content/index.js")],
        //                 name: "bundle",
        //                 fileName: (format, entryName) => {
        //                     return "index.js";
        //                 },
        //                 formats: ["iife"],
        //             },
        //             minify: false,
        //         },
        //         //plugins: [myPlugin()],
        //     };
        //     break;
    };

    // console.log(json);
    return json;
});
