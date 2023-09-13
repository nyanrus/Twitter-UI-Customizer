import z from "zod";

const zS0_1_0 = z.object({
    /**
     * major.minor.patch形式
     * major : 互換性がなくなり変換をしないといけない場合
     * minor: 前の設定とある程度互換性がある場合、新しい設定が追加されたなど
     * patch: 名前変更等実際の設定には影響がない場合
     * たぶん主にminorをいじると思う
     * */
    version: z.array(z.number().int().nonnegative()).length(3),
    button: z.object({
        color: z.object({
            default: z.object({}),
            light: z.object({}),
            dark: z.object({}),
        }),
    }),
    visibleButtons: z.array(z.string()),
    sidebarButtons: z.array(z.string()),
    invisibleItems: z.object({
        osusumeUserTimeline: z.boolean(),
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

type TS0_1_0 = z.infer<typeof zS0_1_0>;
type TTwitterIcon = z.infer<typeof zS0_1_0.shape.twitterIcon>;
type TDiscoverMoreInTimeline = z.infer<typeof zS0_1_0.shape.discoverMoreInTimeline>;

export { zS0_1_0, TS0_1_0, TTwitterIcon, TDiscoverMoreInTimeline };
