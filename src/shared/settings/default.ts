import { DiscoverMoreType, Settings, TwitterIconType } from "./defines";
const defaultSettings: Settings = {
    version: [0, 1, 0],
    button: {
        color: {
            default: {},
            light: {},
            dark: {},
        },
        visibleButtons: ["reply-button", "retweet-button", "like-button", "share-button", "tweet_analytics", "boolkmark", "url-copy"],
        sidebarButtons: ["home", "explore", "communities", "notifications", "messages", "lists", "bookmarks", "twiter-blue", "profile", "moremenu"],
    },
    invisibleItems: {
        osusumeUserTimeline: false,
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
    X2Twitter: {
        X2Twitter: false,
        Post2Tweet: false,
    },
    clientInfo: {
        clientInfoVisible: false,
    },
    timeline: {
        osusumeUserTimeline: false,
        hideOtherRTTL: false,
        accountStart: false,
    },
    twitterIcon: TwitterIconType.default,
    rightSideBar: {
        searchBox: false,
        verified: false,
        trend: false,
        osusumeUser: false,
        links: false,
        space: false,
        relevantPeople: false,
    },
    discoverMoreInTimeline: DiscoverMoreType.default,
};

export { defaultSettings };

// defaultPref: {
//     buttonColor: {},
//     buttonColorLight: {},
//     buttonColorDark: {},
//     visibleButtons: ["reply-button", "retweet-button", "like-button", "share-button", "tweet_analytics", "boolkmark", "url-copy"],
//     sidebarButtons: ["home", "explore", "communities", "notifications", "messages", "lists", "bookmarks", "twiter-blue", "profile", "moremenu"],
//     invisibleItems: {
//         "osusume-user-timeline": false,
//         "twitter-pro-promotion-btn": false,
//         discoverMore: false,
//         "subscribe-profile": false,
//         "subscribe-tweets": false,
//         profileHighlights: false,
//         hideBelowDM: false,
//     },
//     otherBoolSetting: {
//         bottomScroll: false,
//         smallerSidebarContent: true,
//         roundIcon: true,
//         bottomSpace: false,
//         RTNotQuote: false,
//         sidebarNoneScrollbar: false,
//         noModalbottomTweetButtons: false,
//         faviconSet: false,
//     },
//     XToTwitter: { XToTwitter: false, PostToTweet: false },
//     clientInfo: {
//         clientInfoVisible: false,
//     },
//     timeline: {
//         "osusume-user-timeline": false,
//         hideOhterRTTL: false,
//         accountStart: false,
//     },
//     twitterIcon: "nomal",
//     rightSidebar: {
//         searchBox: false,
//         verified: false,
//         trend: false,
//         osusumeUser: false,
//         links: false,
//         space: false,
//         relevantPeople: false,
//     },
//     "timeline-discoverMore": "discoverMore_nomal",
// },
