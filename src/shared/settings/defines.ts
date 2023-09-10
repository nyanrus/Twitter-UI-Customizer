// 多分フォーマットが違う（minor,patchの変更)などはそのままSettingsに入れてもOKかも
// 参照：Qiita 「TypeScriptのInterfaceとTypeの比較」@tkrkt
// https://uyamazak.hatenablog.com/entry/2020/11/06/111857

//https://zenn.dev/uttk/articles/bd264fa884e026
//https://typescriptbook.jp/reference/object-oriented/interface/instanceof-and-interfaces#%E8%A4%87%E9%9B%91%E3%81%AA%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%88%A4%E5%AE%9A%E3%81%AFzod%E3%81%8C%E4%BE%BF%E5%88%A9
import z from "zod";
const zSettings = z.object({
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
    //XToTwitter
    X2Twitter: z.object({
        X2Twitter: z.boolean(),
        Post2Tweet: z.boolean(),
    }),
    clientInfo: z.object({
        clientInfoVisible: z.boolean(),
    }),
    timeline: z.object({
        osusumeUserTimeline: z.boolean(),
        //hideOhterRTTL
        hideOtherRTTL: z.boolean(),
        accountStart: z.boolean(),
    }),
    twitterIcon: z.enum(["default", "invisible", "twitter", "dog", "custom", "twitterIconX"]),
    rightSideBar: z.object({
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

interface Settings {
    version: [number, number, number];
    button: {
        color: {
            //buttonColor
            default: {};
            //butttonColorLight
            light: {};
            //buttonColorDark
            dark: {};
        };
    };
    invisibleItems: {
        osusumeUserTimeline: boolean;
        twitterProPromotionBtn: boolean;
        discoverMore: boolean;
        subscribeProfile: boolean;
        subscribeTweets: boolean;
        profileHighlights: boolean;
        hideBelowDM: boolean;
    };
    // otherBoolSettings
    others: {
        bottomScroll: boolean;
        smallerSidebarContent: boolean;
        roundIcon: boolean;
        bottomSpace: boolean;
        RTNotQuote: boolean;
        sidebarNoneScrollbar: boolean;
        noModalbottomTweetButtons: boolean;
        faviconSet: boolean;
    };
    //XToTwitter
    X2Twitter: {
        X2Twitter: boolean;
        Post2Tweet: boolean;
    };
    clientInfo: {
        clientInfoVisible: boolean;
    };
    timeline: {
        osusumeUserTimeline: boolean;
        //hideOhterRTTL
        hideOtherRTTL: boolean;
        accountStart: boolean;
    };
    twitterIcon: TwitterIconType;
    rightSideBar: {
        searchBox: boolean;
        verified: boolean;
        trend: boolean;
        osusumeUser: boolean;
        links: boolean;
        space: boolean;
        relevantPeople: boolean;
    };
    discoverMoreInTimeline: DiscoverMoreType;
}

// Original UnVersioned Settings Differs from Settings
interface UnVersioned {
    buttonColor: {};
    buttonColorLight: {};
    buttonColorDark: {};
    visibleButtons: string[];
    sidebarButtons: string[];
    invisibleItems: {
        "osusume-user-timeline": false;
        "twitter-pro-promotion-btn": false;
        "subscribe-profile": false;
        "subscribe-tweets": false;
    };
    otherBoolSetting: {
        bottomScroll: false;
        smallerSidebarContent: true;
        roundIcon: true;
        bottomSpace: false;
        RTNotQuote: false;
        sidebarNoneScrollbar: false;
        noModalbottomTweetButtons: false;
        faviconSet: false;
    };
    XToTwitter: { XToTwitter: false; PostToTweet: false };
    timeline: {
        "osusume-user-timeline": false;
        hideOhterRTTL: false;
    };
    twitterIcon: "nomal";
    "timeline-discoverMore": "discoverMore_nomal";
}

enum TwitterIconType {
    default,
    invisible,
    twitter,
    dog,
    custom,
    twitterIconX,
}

enum DiscoverMoreType {
    default,
    invisible,
    detailOpen,
    detailClose,
}

export { Settings, TwitterIconType, DiscoverMoreType, UnVersioned };
