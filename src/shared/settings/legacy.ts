import { TUICData } from "../../content/data";
import { zSettings } from "./defines";
import { TS0_0_0 } from "./versions/0-0-0";

export const legacy = {
    //from parallelToSerial
    localStorageToSettings: (settings: TS0_0_0) => {
        const lCSS = localStorage.getItem("CSS");
        if (lCSS !== null) {
            settings.CSS = lCSS;
            localStorage.removeItem("CSS");
        }
        if (settings.CSS !== null) localStorage.setItem("TUIC_CSS", settings.CSS);

        settings.timeline["osusume-user-timeline"] =
            (localStorage.getItem("osusume-user-timeline") ?? "0") === "1";

        const result = zSettings.shape.visibleButtons.safeParse(
            JSON.parse(localStorage.getItem("visible-button") ?? ""),
        );
        if (result.success) {
            settings.visibleButtons = result.data;
        }

        for (const i of TUICData.settings.colors.id) {
            const a = localStorage.getItem(`${i}-background`) ?? "unknown";
            if (a !== "unknown") {
                settings.buttonColor[i] = {
                    background: a,
                    border: localStorage.getItem(`${i}-border`),
                    color: localStorage.getItem(`${i}-color`),
                };
            }
        }

        localStorage.removeItem("unsent-tweet-background");
        localStorage.removeItem("unsent-tweet-border");
        localStorage.removeItem("unsent-tweet-color");
        localStorage.removeItem("not-following-background");
        localStorage.removeItem("not-following-border");
        localStorage.removeItem("not-following-color");
        localStorage.removeItem("following-background");
        localStorage.removeItem("following-border");
        localStorage.removeItem("following-color");
        localStorage.removeItem("un-following-background");
        localStorage.removeItem("un-following-border");
        localStorage.removeItem("un-following-color");
        localStorage.removeItem("profile-background");
        localStorage.removeItem("profile-border");
        localStorage.removeItem("profile-color");
        localStorage.removeItem("profile-save-background");
        localStorage.removeItem("profile-save-border");
        localStorage.removeItem("profile-save-color");
        localStorage.removeItem("birthday-background");
        localStorage.removeItem("birthday-border");
        localStorage.removeItem("birthday-color");
        localStorage.removeItem("profile-link-background");
        localStorage.removeItem("profile-link-border");
        localStorage.removeItem("profile-link-color");

        localStorage.removeItem("reply-button");
        localStorage.removeItem("retweet-button");
        localStorage.removeItem("like-button");
        localStorage.removeItem("downvote-button");
        localStorage.removeItem("share-button");
        localStorage.removeItem("tweet_analytics");
        localStorage.removeItem("visible-button");
        localStorage.removeItem("osusume-user-timeline");
        localStorage.removeItem("CSS");
    },
};
