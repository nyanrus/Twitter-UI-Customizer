import { applySystemCss } from "./applyCSS.js";
import { TUICData } from "./data.js";
import { TUICObserver } from "./observer.js";
import { TUICPref } from "../shared/settings.js";

const Pref = TUICPref.getInstance();
const settings = Pref.settings;

export const TUICLibrary = {
    color: {
        rgb2hex: function (rgb) {
            return `#${rgb
                .map(function (value) {
                    return ("0" + value.toString(16)).slice(-2);
                })
                .join("")}`;
        },
        hex2rgb: function (hex) {
            if (hex.slice(0, 1) == "#") hex = hex.slice(1);
            return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (str) {
                return parseInt(str, 16);
            });
        },
        // old to new
        getColorFromPref: function (name: string, type: string, mode_: string = "unknwon") {
            let mode = "";
            if (mode_ == "unknwon") {
                mode = TUICLibrary.backgroundColorCheck() == "light" ? "light" : "dark";
            } else {
                mode = mode_;
            }
            return (
                settings.button.color[mode][name][type] ??
                TUICData?.["colors-" + mode]?.[name]?.[type] ??
                settings.button.color.default[name][type] ??
                TUICData.colors[name][type]
            ).escapeToUseHTML();
        },
    },
    getClasses: {
        getClass: function (id) {
            return id + this.query;
        },
        update: function () {
            this.query += "_";
            document
                .querySelector("#twitter_ui_customizer_query")
                .setAttribute("query", this.query);
            applySystemCss();
            TUICObserver.observerFunction();
        },
        query: "",
    },
    backgroundColorCheck: () => {
        const bodyStyle = document.body.style.backgroundColor.toString();
        if (bodyStyle == "rgb(0, 0, 0)") {
            return "dark";
        } else if (bodyStyle == "rgb(21, 32, 43)") {
            return "blue";
        } else {
            return "light";
        }
    },
    backgroundColorClass: function (dark, blue, white) {
        const backgroundType = this.backgroundColorCheck();
        if (backgroundType == "dark") {
            return dark;
        } else if (backgroundType == "blue") {
            return blue;
        } else {
            return white;
        }
    },
    fontSizeClass: function (x1, x2, x3, x4, x5) {
        const fontSize = document.querySelector("html")?.style.fontSize.toString();
        if (fontSize == "17px") {
            return x4;
        } else if (fontSize == "18px") {
            return x5;
        } else if (fontSize == "15px") {
            return x3;
        } else if (fontSize == "14px") {
            return document
                .querySelector(`h1[role="heading"] > a[href="/home"]`)
                ?.className.includes("r-116um31")
                ? x1
                : x2;
        }
    },
    HTMLParse: (elem: string) => {
        return new DOMParser().parseFromString(elem, "text/html").body.children;
    },
    escapeToUseHTML: (text: string) => {
        return text
            .replace(/[&'`"<>=;]/g, (match) => {
                return {
                    "&": "&amp;",
                    "'": "&#x27;",
                    "`": "&#x60;",
                    '"': "&quot;",
                    "<": "&lt;",
                    ">": "&gt;",
                    "=": "&equals;",
                    ";": "&semi;",
                }[match] as string;
            })
            .replaceAll("\\r", "\r");
    },
    waitForElement: async (selector) => {
        if (document.querySelectorAll(selector).length !== 0) {
            return Array.from(document.querySelectorAll(selector));
        } else {
            return new Promise((resolve) => {
                const observer = new MutationObserver((mutations) => {
                    const addedNodes = mutations
                        .flatMap((m) => Array.from(m.addedNodes))
                        .filter((n) => n instanceof HTMLElement);
                    const matchedAddedNodes = addedNodes.filter((e) => e.matches(selector));
                    if (matchedAddedNodes.length !== 0) {
                        observer.disconnect();
                        resolve(matchedAddedNodes);
                    }
                });
                observer.observe(document, { subtree: true, childList: true });
            });
        }
    },
};
