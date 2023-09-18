import { TUICData } from "./data.ts";
import { DOG, TWITTER, X } from "./data/icons.ts";
import { TUICLibrary } from "./library.ts";
import { isSafemode } from "./safemode.ts";
import { TUICPref } from "../shared/settings.ts";
import { BtnColors, zBtnColors } from "../shared/data/type.ts";
import postcss from "postcss";

import global from "./global.pcss?raw";

const Pref = TUICPref.getInstance();
const settings = Pref.settings;

export function addCssElement() {
    document.querySelector("#twitter_ui_customizer_css")?.remove();
    document.querySelector("#twitter_ui_customizer")?.remove();

    const twitterHead = document.querySelector("head");

    const systemCssElement = document.createElement("style");
    systemCssElement.id = "twitter_ui_customizer";
    twitterHead?.appendChild(systemCssElement);
    applySystemCss();

    if (!isSafemode) {
        const customCssElement = document.createElement("style");
        customCssElement.id = "twitter_ui_customizer_css";
        twitterHead?.appendChild(customCssElement);
        applyCustomCss();
    }
}

export function applySystemCss() {
    const backgroundColor = TUICLibrary.backgroundColorCheck();

    let prefColors = "";
    for (const elem in TUICData.colors) {
        const result = zBtnColors.safeParse(elem);
        if (result.success) {
            const arrEl: Array<keyof BtnColors> = ["background", "border", "color"];
            arrEl.forEach((el) => {
                prefColors += `--twitter-${elem}-${el}:${TUICLibrary.color.getColorFromPref(
                    elem,
                    el,
                )};`;
            });
        }
    }
    const QTuic = document.querySelector("#twitter_ui_customizer");

    /* eslint-disable indent */
    (QTuic as HTMLElement).textContent = `
:root{
    ${prefColors}

    --twitter-TUIC-color: ${TUICData.styleColor[backgroundColor].textColor};

    --TUIC-container-background: ${TUICData.styleColor[backgroundColor].containerBackground};
    --TUIC-container-background2: ${TUICData.styleColor[backgroundColor].containerBackground2};
    --TUIC-color-hover-efect: ${TUICData.styleColor[backgroundColor].colorHover};

    --TUIC-sidebar-hover-color: ${
        TUICLibrary.backgroundColorCheck() == "light"
            ? "rgba(15,20,25,0.1)"
            : "rgba(247,249,249,0.1)"
    };
    --TUIC-sidebar-active-color: ${
        TUICLibrary.backgroundColorCheck() == "light"
            ? "rgba(15,20,25,0.2)"
            : "rgba(247,249,249,0.2)"
    };
    --TUIC-sidebar-focus-color: ${
        TUICLibrary.backgroundColorCheck() == "light" ? "rgb(135,138,140)" : "rgb(251,252,252)"
    };

    --TUIC-detail-border:${TUICData.styleColor[backgroundColor].detailBorder};
}


.${TUICLibrary.getClasses.getClass("TUIC_ISNOTDEFAULT")}:not(:last-of-type){
    margin-bottom:calc(12px + 1em);
}
.TUIC_none_scroll::-webkit-scrollbar{display:none}
.${TUICLibrary.getClasses.getClass("TUIC_DISPNONE")}{
    display: none !important;
}


.${TUICLibrary.getClasses.getClass("TUICScrollBottom")}{
padding-right:8px;
margin-right:-8px;
padding-left:8px;
margin-left:-8px;
padding-bottom:16px;
margin-bottom:-16px;
}
.${TUICLibrary.getClasses.getClass("TUICScrollBottom")},
.${TUICLibrary.getClasses.getClass("TUICItIsBigArticlePhoto")} .${TUICLibrary.getClasses.getClass(
        "TUICScrollBottom",
    )} > div {
    overflow-x:auto;
    scrollbar-width:thin;

}
:is(.${TUICLibrary.getClasses.getClass(
        "TUICItIsBigArticlePhoto",
    )} .${TUICLibrary.getClasses.getClass("TUICScrollBottom")} > div,
.${TUICLibrary.getClasses.getClass("TUICScrollBottom")})::-webkit-scrollbar {
height:8px
}

:is(.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Twitter")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Dog")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_IconImg")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_X")},
.TUICUploadedImg):not([role="alertdialog"] [data-testid="confirmationSheetDialog"] *){
    margin: 8px;
    background-size: cover;
}

#placeholder > :is(.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Twitter")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Dog")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_IconImg")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_X")}){
    position: absolute;
    margin: auto;
}
:is(.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Twitter")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Dog")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_IconImg")},
.${TUICLibrary.getClasses.getClass(
        "TUICTwitterIcon_X",
    )}):not([role="alertdialog"] [data-testid="confirmationSheetDialog"] *){
    height:inherit !important;
}

[role="alertdialog"] [data-testid="confirmationSheetDialog"] .${TUICLibrary.getClasses.getClass(
        "TUICTwitterIcon_IconImg",
    )}{
    height:40px;
    width:40px;
    margin-left:auto;
    margin-right:auto;
}

[role="alertdialog"] [data-testid="confirmationSheetDialog"] :is(.${TUICLibrary.getClasses.getClass(
        "TUICTwitterIcon_Twitter",
    )},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Dog")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_IconImg")},
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_X")}){
    mask-size:contain !important;
    mask-repeat:no-repeat;
    mask-position:center;
    -webkit-mask-size:contain !important;
    -webkit-mask-repeat:no-repeat;
    -webkit-mask-position:center;
    background-size:contain !important;
    background-repeat:no-repeat;
    background-position:center;
}
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Dog")}{
    background-image:url('${DOG}');
}

:is(.${TUICLibrary.getClasses.getClass(
        "TUICTwitterIcon_Twitter",
    )},.${TUICLibrary.getClasses.getClass(
        "TUICTwitterIcon_X",
    )}):not([role="alertdialog"] [data-testid="confirmationSheetDialog"] *){
    mask-size: cover !important;
    -webkit-mask-size: cover !important;
}

.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_Twitter")}{
    background-color:var(--twitter-twitterIcon-color);
    --TUIC-twitter-icon:url('${TWITTER}') !important;
    -webkit-mask-image:var(--TUIC-twitter-icon) !important;
    mask-image:var(--TUIC-twitter-icon) !important;
}
.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_X")}{
    background-color:var(--twitter-twitterIcon-color);
    --TUIC-twitter-icon:url('${X}') !important;
    -webkit-mask-image:var(--TUIC-twitter-icon) !important;
    mask-image:var(--TUIC-twitter-icon) !important;
}

.${TUICLibrary.getClasses.getClass("TUICTwitterIcon_IconImg")},
#TUICIcon_IconImg{
    background-image:url('${localStorage.getItem("TUIC_IconImg") ?? ""}');
    ${
        settings.others.roundIcon ?? TUICData.defaultPref.otherBoolSetting.roundIcon
            ? `
    border-radius:9999px !important;
    `
            : ""
    }
}

#layers [data-testid="TopNavBar"] div+.${TUICLibrary.getClasses.getClass(
        "TUICTwitterIcon_IconImg",
    )}{
    background-size:contain !important;
    background-repeat:no-repeat !important;
    background-position:center;
    width:auto !important;
}

.${TUICLibrary.getClasses.getClass("TUIC_SVGDISPNONE")} > *{
display:none !important;
}


.${TUICLibrary.getClasses.getClass("TUIC_DISCOVERMORE")}{
    display:var(--TUIC-DISCOVERMORE,block) !important;
    }
${
    settings.others.smallerSidebarContent ??
    TUICData.defaultPref.otherBoolSetting.smallerSidebarContent
        ? `
[role="navigation"] .${"NOT_" + TUICLibrary.getClasses.getClass("TUIC_DISPNONE")}{
    padding-bottom:0px !important;
    padding-top:0px !important;
}
`
        : ""
}

${
    settings.invisibleItems.subscribeProfile ??
    TUICData.defaultPref.otherBoolSetting["subscribe-profile"]
        ? `[data-testid="userActions"]+[style*="border-color"][style*="rgb(201, 54, 204)"]{
    display:none !important;
    }`
        : ""
}
${settings.invisibleItems.hideBelowDM ? `[data-testid="DMDrawer"]{display:none !important;}` : ""}

${
    settings.others.bottomScroll ?? TUICData.defaultPref.otherBoolSetting.bottomSpace
        ? `
.${TUICLibrary.getClasses.getClass("TUIC_NONE_SPACE_BOTTOM_TWEET")}{margin-top:0px !important;}
`
        : ""
}
${
    settings.others.sidebarNoneScrollbar ??
    TUICData.defaultPref.otherBoolSetting.sidebarNoneScrollbar
        ? `
header > div > div > div > div.r-1rnoaur{overflow:clip;}
`
        : ""
}

${
    settings.others.noNumberBottomTweetButtons ??
    TUICData.defaultPref.otherBoolSetting.noNumberBottomTweetButtons
        ? `
.${TUICLibrary.getClasses.getClass(
              "TUICItIsBigArticle",
          )} [data-testid="app-text-transition-container"]{
    display:none !important;
}
`
        : ""
}
${postcss.parse(global)}
`;
    /* eslint-enable */
}

export function applyCustomCss() {
    document.querySelector("#twitter_ui_customizer_css").textContent =
        localStorage.getItem("TUIC_CSS");
}
