import { TUICLibrary, TUICPref } from "./library.js";
import { EMPTY, TWITTER, DOG, X } from "./data/icons.js";

const twitterIcon = function (elem: HTMLElement, base) {
    let elem_class_add: string[] = [];
    let favicon = document.querySelector(`link[rel="shortcut icon"]`) as HTMLLinkElement;
    let apply_favicon = TUICPref.get("otherBoolSetting.faviconSet");
    const getClass = TUICLibrary.getClasses.getClass;

    const svgDisplayNone = () => {
        elem_class_add.push(getClass("TUIC_SVGDISPNONE"));
    };
    switch (TUICPref.get("twitterIcon")) {
        case "invisible":
            // favicon
            if (apply_favicon) favicon.href = EMPTY;

            svgDisplayNone();
            elem_class_add.push(getClass("TUIC_DISPNONE"));
            break;
        case "twitter":
            if (apply_favicon) favicon.href = TWITTER.replace(`xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"`, `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"%20fill="${TUICLibrary.color.getColorFromPref("twitterIconFavicon", "color")}"`);
            svgDisplayNone();
            elem_class_add.push(getClass("TUICTwitterIcon_Twitter"));
            break;
        case "dog":
            if (apply_favicon) favicon.href = DOG;

            svgDisplayNone();
            elem_class_add.push(getClass("TUICTwitterIcon_Dog"));
            break;
        case "custom":
            if (apply_favicon) {
                const imageURL = localStorage.getItem(TUICPref.get("otherBoolSetting.roundIcon") ? "TUIC_IconImg_Favicon" : "TUIC_IconImg");
                favicon.href = imageURL ?? EMPTY;
            }
            svgDisplayNone();
            elem_class_add.push(getClass("TUICTwitterIcon_IconImg"));
            break;
        case "twitterIcon-X":
            if (apply_favicon) favicon.href = X.replace(`xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"`, `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"%20fill="${TUICLibrary.color.getColorFromPref("twitterIconFavicon", "color")}"`);
            svgDisplayNone();
            elem_class_add.push(getClass("TUICTwitterIcon_X"));
            break;
        default:
            favicon.href = "//abs.twimg.com/favicons/twitter.3.ico";
            break;
    }
    elem.classList.add(...elem_class_add);
};
