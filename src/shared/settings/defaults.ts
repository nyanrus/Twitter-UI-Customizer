import { TSettings } from "./defines";

/**
 * Zodでデフォルト設定したら
 * .shapeを取得できなくなった
 */
const defaultSettings: TSettings = {
    version: [0, 1, 0],
    button: {
        color: {
            default: {},
            light: {},
            dark: {},
        },
    },
    visibleButtons: [
        "reply-button",
        "retweet-button",
        "like-button",
        "share-button",
        "tweet_analytics",
        "boolkmark",
        "url-copy",
    ],
    sidebarButtons: [
        "home",
        "explore",
        "communities",
        "notifications",
        "messages",
        "lists",
        "bookmarks",
        "twiter-blue",
        "profile",
        "moremenu",
    ],
    invisibleItems: {
        twitterProPromotionBtn: false,
        discoverMore: false,
        subscribeProfile: false,
        subscribeTweets: false,
        profileHighlights: false,
        hideBelowDM: false,
    },
    others: {
        bottomScroll: false,
        smallerSidebarContent: true,
        roundIcon: true,
        bottomSpace: false,
        RTNotQuote: false,
        sidebarNoneScrollbar: false,
        noModalbottomTweetButtons: false,
        faviconSet: false,
    },
    XToTwitter: {
        XToTwitter: false,
        PostToTweet: false,
    },
    clientInfo: {
        clientInfoVisible: false,
    },
    timeline: {
        osusumeUserTimeline: false,
        hideOtherRTTL: false,
        accountStart: false,
    },
    twitterIcon: "default",
    rightSidebar: {
        searchBox: false,
        verified: false,
        trend: false,
        osusumeUser: false,
        links: false,
        space: false,
        relevantPeople: false,
    },
    discoverMoreInTimeline: "default",
};

export { defaultSettings };
