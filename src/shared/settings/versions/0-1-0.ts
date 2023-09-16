import z from "zod";

/**
 * https://zod.dev/?id=default
 * zObject.parse(undefined)の時、default値が返還されます。
 */
const zS0_1_0 = z.object({
    /**
     * major.minor.patch形式
     * major : 互換性がなくなり変換をしないといけない場合
     * minor: 前の設定とある程度互換性がある場合、新しい設定が追加されたなど
     * patch: 名前変更等実際の設定には影響がない場合
     * たぶん主にminorをいじると思う
     *
     * stringにしといたほうがBeta版とかにいいかも？
     * */
    version: z.string(),
    button: z.object({
        color: z.object({
            default: z.any(),
            light: z.any(),
            dark: z.any(),
        }),
    }),
    visibleButtons: z.array(z.string()),
    sidebarButtons: z
        .array(z.string())
        .default([
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
        ]),
    invisibleItems: z.object({
        twitterProPromotionBtn: z.boolean(),
        discoverMore: z.boolean(),
        subscribeProfile: z.boolean(),
        subscribeTweets: z.boolean(),
        profileHighlights: z.boolean(),
        hideBelowDM: z.boolean(),
    }),
    others: z.object({
        bottomScroll: z.boolean(),
        smallerSidebarContent: z.boolean(),
        roundIcon: z.boolean(),
        bottomSpace: z.boolean(),
        RTNotQuote: z.boolean(),
        sidebarNoneScrollbar: z.boolean(),
        noModalbottomTweetButtons: z.boolean(),
        faviconSet: z.boolean(),
        noNumberBottomTweetButtons: z.boolean(),
        placeEngagementsLink: z.boolean(),
    }),
    XToTwitter: z.object({
        XToTwitter: z.boolean(),
        PostToTweet: z.boolean(),
    }),
    clientInfo: z.object({
        clientInfoVisible: z.boolean(),
    }),
    timeline: z.object({
        osusumeUserTimeline: z.boolean(),
        hideOtherRTTL: z.boolean(),
        accountStart: z.boolean(),
    }),
    twitterIcon: z.enum(["default", "invisible", "twitter", "dog", "custom", "twitterIconX"]),
    rightSidebar: z.object({
        searchBox: z.boolean(),
        verified: z.boolean(),
        trend: z.boolean(),
        osusumeUser: z.boolean(),
        links: z.boolean(),
        space: z.boolean(),
        relevantPeople: z.boolean(),
    }),
    discoverMoreInTimeline: z.enum(["default", "invisible", "detailOpen", "detailClose"]),
});

const zDefaultS0_1_0 = zS0_1_0.default({
    version: "0.1.0",
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
        noNumberBottomTweetButtons: false,
        placeEngagementsLink: false,
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
});

type TS0_1_0 = z.infer<typeof zS0_1_0>;
type TTwitterIcon = z.infer<typeof zS0_1_0.shape.twitterIcon>;
type TDiscoverMoreInTimeline = z.infer<typeof zS0_1_0.shape.discoverMoreInTimeline>;

export { zS0_1_0, TS0_1_0, TTwitterIcon, TDiscoverMoreInTimeline, zDefaultS0_1_0 };
