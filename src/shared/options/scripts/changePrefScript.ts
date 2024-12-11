import { isSafemode } from "@modules/settings/safemode/isSafemode";
import { getPref, setPref, savePref, mergePref } from "@modules/pref";
import { updateClasses } from "@modules/htmlClass/classManager";

export const XToTwitterRestoreIcon = () => {
    const importPref = {
        sidebarSetting: { buttonConfig: { birdGoBack: true } },
        twitterIcon: {
            options: {
                faviconSet: true,
            },
            icon: "twitter",
        },
    };
    setPref("", mergePref(getPref(""), importPref));
    savePref();
    updateClasses();
    if (!isSafemode) {
        document.querySelector("#TUIC_setting").remove();
    }
    if (!getPref("XToTwitter.XToTwitter") && document.title.endsWith(" / Twitter")) {
        document.title = document.title.replace(" / Twitter", " / X");
    }
};
