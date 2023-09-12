// 多分フォーマットが違う（minor,patchの変更)などはそのままSettingsに入れてもOKかも
// 参照：Qiita 「TypeScriptのInterfaceとTypeの比較」@tkrkt
// https://uyamazak.hatenablog.com/entry/2020/11/06/111857

//https://zenn.dev/uttk/articles/bd264fa884e026
//https://typescriptbook.jp/reference/object-oriented/interface/instanceof-and-interfaces#%E8%A4%87%E9%9B%91%E3%81%AA%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%88%A4%E5%AE%9A%E3%81%AFzod%E3%81%8C%E4%BE%BF%E5%88%A9
import z from "zod";
import "./util";
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

type TZSettings = z.infer<typeof zSettings>;
type TTwitterIcon = z.infer<typeof zSettings.shape.twitterIcon>;
type TDiscoverMoreInTimeline = z.infer<typeof zSettings.shape.discoverMoreInTimeline>;

export { zSettings, TZSettings, TDiscoverMoreInTimeline, TTwitterIcon };
