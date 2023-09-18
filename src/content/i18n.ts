import browser from "webextension-polyfill";

/* eslint-disable no-unsafe-optional-chaining */
let i18nData = {};

export const TUICI18N = {
    fetch: async function () {
        await new Promise((resolve) => {
            chrome.runtime.sendMessage({ type: "getI18n" }, (response) => {
                console.log(response);
                i18nData = response;
                console.log(i18nData);
                resolve(i18nData);
            });
        });
        return true;
    },
    get: function (key: string) {
        const lang = document.querySelector("html")?.getAttribute("lang");

        if (lang in i18nData && key in i18nData[lang]) {
            return i18nData[lang][key];
        } else if (key in i18nData.en) {
            return i18nData.en[key];
        } else if (key in i18nData.ja) {
            return i18nData.ja[key];
        } else {
            return "404";
        }
    },
};
