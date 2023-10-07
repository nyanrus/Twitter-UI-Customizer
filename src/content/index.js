/**
 * Twitter UI Customizer
 * << Twitter を思いのままに。 >>
 */

import { TUICObserver } from "./observer.js";
import { TUICLibrary } from "./library.js";
import { TUICI18N } from "./i18n.js";
import { addCssElement } from "./applyCSS.js";
import { isSafemode, runSafemode } from "./safemode.js";
import { startTluiObserver } from "./tlui/observer.js";
// import { ButtonComponent, ContainerComponent, Dialog } from "./tlui/popup.js";

(async () => {
    await TUICI18N.fetch();

    // 旧バージョンからのアップデート
    await TUICLibrary.updatePref.update();

    await TUICLibrary.waitForElement("#react-root");

    String.prototype.escapeToUseHTML = function () {
        return TUICLibrary.escapeToUseHTML(this);
    };
    String.prototype.addClass = function () {
        return TUICLibrary.getClasses.getClass(this);
    };
    TUICObserver.titleObserverFunction();
    // await TUICLibrary.waitForElement("#layers");
    // const dialog = new Dialog("Hello!");
    // dialog.addComponents([
    //     "こんな感じで簡単にダイアログを出せるようになりました。",
    //     "いい感じのAPIにしたつもりなのですが、もしここが使いにくいとかあれば言ってくださいね。",
    //     new ButtonComponent("ふぁみちゃんだいすき", () => dialog.close()),
    //     new ButtonComponent("閉じる", () => dialog.close(), {
    //         invertColor: true
    //     }),
    //     new ContainerComponent([
    //         new ButtonComponent("第三の選択肢！", () => dialog.close(), {
    //             invertColor: true
    //         })
    //     ])
    // ]).open();

    console.log(
        `%cTwitter UI Customizer${isSafemode ? " (Safe Mode)" : ""}%cby kaonasi_biwa\n\nTwitter を思いのままに。⧸ Language: ${TUICI18N.get("@JapaneseLanguageName")}`,
        `font-family: system-ui, -apple-system, sans-serif, monospace; font-size: 1.2em; font-weight: bold; text-align: center; background: ${isSafemode ? "#5a9e1b" : "#1da1f2"}; color: #ffffff; padding: 0.5em 2em; margin-top: 0.5em; margin-left: 0.5em;`,
        `font-family: system-ui, -apple-system, sans-serif, monospace; margin: 0.5em; color: ${isSafemode ? "#5a9e1b" : "#1da1f2"};`,
    );

    TUICObserver.titleObserverFunction();
    startTluiObserver();

    if (document.querySelector("#twitter_ui_customizer_query") == null) {
        const queryElem = document.createElement("meta");
        queryElem.id = "twitter_ui_customizer_query";
        queryElem.setAttribute("query", "");
        document.querySelector("head").appendChild(queryElem);
    } else {
        const queryElem = document.querySelector("#twitter_ui_customizer_query");
        const query = queryElem.getAttribute("query") + "A";

        TUICLibrary.getClasses.query = query;
        queryElem.setAttribute("query", query);
    }

    for (const elem of document.querySelectorAll(".TUICOriginalContent")) {
        elem.remove();
    }

    addCssElement();
    if (document.querySelector(`#placeholder > svg`)) {
        TUICObserver.functions.twitterIcon(document.querySelector(`#placeholder > svg:not(.${"NOT_" + "TUIC_DISPNONE".addClass()}):not(.${"TUIC_DISPNONE".addClass()}`), document.querySelector(`#placeholder`));
    }

    chrome.runtime.sendMessage({
        type: "update",
        updateType: "openTwitter",
    });

    (TUICObserver.target = document.querySelector("body")), TUICObserver.observer.observe(TUICObserver.target, TUICObserver.config);
    TUICObserver.observerFunction();

    new MutationObserver(addCssElement).observe(document.querySelector("body"), {
        childList: false,
        subtree: false,
        attributes: true,
    });

    if (isSafemode) runSafemode();
})();
