import { waitForElement } from "@modules/utils/controlElements";
import { displaySetting } from "@modules/settings/display";
import { render } from "solid-js/web";
import { MessagePreview } from "./MessagePreview";

let DisplaySettingObserver: MutationObserver = null;

let target = document.querySelector("body") ?? undefined;
const config = {
    childList: true,
    subtree: true,
};

export function placeSettingObserver() {
    if (DisplaySettingObserver) DisplaySettingObserver.disconnect();
    else DisplaySettingObserver = new MutationObserver(placeSettingObserver);

    placeSettingPage();

    if (!target) target = document.querySelector("body");

    DisplaySettingObserver.observe(target, config);
}

export function placeSettingPage() {
    switch (window.location.pathname) {
        case "/tuic/safemode":
            break;
        case "/settings/display": {
            waitForElement(`main div[role="slider"]`).then((elems) => {
                const _large = elems[0].closest<HTMLElement>(`section[aria-labelledby="detail-header"] > div.r-qocrb3`);
                const _small = elems[0].closest<HTMLElement>(`main > div > div > div > div`);
                //console.warn(`_large : ${_large}\n_small : ${_small}`);
                displaySetting(_large ? _large : _small);
            });
            rewriteTweet();
            break;
        }
        case "/i/display": {
            //* /settings/displayでダイアログ（/i/display）を開けると、ダイアログ側にTUICの設定が表示されない。

            waitForElement(`div[role="slider"]`).then((elems) => {
                const _dialog = elems[0].closest<HTMLElement>(`div[aria-labelledby="modal-header"] > div > div > div > div:nth-child(2)`);
                const _fullscreen = elems[0].closest<HTMLElement>(`main > div > div > div > div`);
                //console.warn(`_large : ${_large}\n_small : ${_small}`);
                displaySetting(_dialog ? _dialog : _fullscreen);
            });
            rewriteTweet();
        }
    }
}

function rewriteTweet() {
    if (document.querySelector("#TUIC_setting") == null && document.querySelector('[role="slider"]:not(article *)') != null) {
        if (document.querySelector("main > div > div > div > section:nth-child(2)")) {
            const displayRootElement = document.querySelector("main > div > div > div > section:nth-child(2) > div:nth-child(2) > div:nth-child(2)");
            const color = document.querySelector<HTMLElement>(`[role=slider] > *`).style.backgroundColor;
            const grayTextColor = document.querySelector<HTMLElement>("main > div > div > div > section:nth-child(2) > div").style.color;

            displayRootElement.textContent = "";

            render(() => MessagePreview(color, grayTextColor), displayRootElement);
        } else {
            const displayRootElement = document.querySelector("main > div > div > div > div:nth-child(2) > div:nth-child(2)");
            const color = document.querySelector<HTMLElement>(`[role=slider] > *`).style.backgroundColor;
            const grayTextColor = document.querySelector<HTMLElement>("main > div > div > div > div").style.color;

            displayRootElement.textContent = "";

            render(() => MessagePreview(color, grayTextColor), displayRootElement);
        }
    }
}
