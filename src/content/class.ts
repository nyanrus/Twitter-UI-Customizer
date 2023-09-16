import { TUICLibrary } from "./library.ts";
import { EMPTY, TWITTER, DOG, X } from "./data/icons.ts";
import { zS0_1_0 } from "../shared/settings/versions/0-1-0.ts";

const twitterIcon = function (elem: HTMLElement, base) {
    const elem_class_add: string[] = [];
    const favicon = document.querySelector(`link[rel="shortcut icon"]`) as HTMLLinkElement;
    const apply_favicon = TUICPref.get("otherBoolSetting.faviconSet");
    const getClass = TUICLibrary.getClasses.getClass;

    const svgDisplayNone = () => {
        elem_class_add.push(getClass("TUIC_SVGDISPNONE"));
    };
    const twitterIcon = zS0_1_0.shape.twitterIcon.parse(TUICPref.get("twitterIcon"));

    switch (twitterIcon) {
        case "invisible":
            // favicon
            if (apply_favicon) favicon.href = EMPTY;

            svgDisplayNone();
            elem_class_add.push(getClass("TUIC_DISPNONE"));
            break;
        case "twitter":
            if (apply_favicon)
                favicon.href = TWITTER.replace(
                    `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"`,
                    `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"%20fill="${TUICLibrary.color.getColorFromPref(
                        "twitterIconFavicon",
                        "color",
                    )}"`,
                );
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
                const imageURL = localStorage.getItem(
                    TUICPref.get("otherBoolSetting.roundIcon")
                        ? "TUIC_IconImg_Favicon"
                        : "TUIC_IconImg",
                );
                favicon.href = imageURL ?? EMPTY;
            }
            svgDisplayNone();
            elem_class_add.push(getClass("TUICTwitterIcon_IconImg"));
            break;
        case "twitterIconX":
            if (apply_favicon)
                favicon.href = X.replace(
                    `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"`,
                    `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"%20fill="${TUICLibrary.color.getColorFromPref(
                        "twitterIconFavicon",
                        "color",
                    )}"`,
                );
            svgDisplayNone();
            elem_class_add.push(getClass("TUICTwitterIcon_X"));
            break;
        case "default":
            favicon.href = "//abs.twimg.com/favicons/twitter.3.ico";
            break;
    }
    elem.classList.add(...elem_class_add);
};
