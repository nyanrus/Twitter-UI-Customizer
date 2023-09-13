import { convertS0_0_02S0_1_0, zS0_0_0 } from "./versions/0_0_0";

//https://stackoverflow.com/questions/75945904/zod-typeerror-cannot-read-properties-of-undefined-reading-parse
//元々これをdefines.tsにおいてたんだけど
//cyclic dependencyはだめらしい

const def = {
    buttonColor: {},
    buttonColorLight: {},
    buttonColorDark: {},
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
        "osusume-user-timeline": false,
        "twitter-pro-promotion-btn": false,
        discoverMore: false,
        "subscribe-profile": false,
        "subscribe-tweets": false,
        profileHighlights: false,
        hideBelowDM: false,
    },
    otherBoolSetting: {
        bottomScroll: false,
        smallerSidebarContent: true,
        roundIcon: true,
        bottomSpace: false,
        RTNotQuote: false,
        sidebarNoneScrollbar: false,
        noModalbottomTweetButtons: false,
        faviconSet: false,
    },
    XToTwitter: { XToTwitter: false, PostToTweet: false },
    clientInfo: {
        clientInfoVisible: false,
    },
    timeline: {
        "osusume-user-timeline": false,
        hideOhterRTTL: false,
        accountStart: false,
    },
    twitterIcon: "nomal",
    rightSidebar: {
        searchBox: false,
        verified: false,
        trend: false,
        osusumeUser: false,
        links: false,
        space: false,
        relevantPeople: false,
    },
    "timeline-discoverMore": "discoverMore_nomal",
};
console.log(convertS0_0_02S0_1_0.parse(zS0_0_0.parse(def)));
