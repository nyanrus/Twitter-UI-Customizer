import z from "zod";
import { TDiscoverMoreInTimeline, TTwitterIcon, TZSettings, zSettings } from "../defines";

const zS0_0_0 = z.object({
    //versionは存在しないのだ
    // version: z.array(z.number().int().nonnegative()).length(3),
    buttonColor: z.any(),
    buttonColorLight: z.any(),
    buttonColorDark: z.any(),
    //
    visibleButtons: z.array(z.string()),
    sidebarButtons: z.array(z.string()),
    //
    invisibleItems: z.object({
        "osusume-user-timeline": z.boolean(),
        "twitter-pro-promotion-btn": z.boolean(),
        discoverMore: z.boolean(),
        "subscribe-profile": z.boolean(),
        "subscribe-tweets": z.boolean(),
        profileHighlights: z.boolean(),
        hideBelowDM: z.boolean(),
    }),
    otherBoolSetting: z.object({
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
        "osusume-user-timeline": z.boolean(),
        hideOhterRTTL: z.boolean(),
        accountStart: z.boolean(),
    }),
    twitterIcon: z.string(),
    rightSidebar: z.object({
        searchBox: z.boolean(),
        verified: z.boolean(),
        trend: z.boolean(),
        osusumeUser: z.boolean(),
        links: z.boolean(),
        space: z.boolean(),
        relevantPeople: z.boolean(),
    }),
    "timeline-discoverMore": z.string(),
});

type TS0_0_0 = z.infer<typeof zS0_0_0>;

const isTS0_0_0 = (arg: unknown): arg is TS0_0_0 =>
    typeof arg === "object" && zS0_0_0.safeParse(arg).success;

const S0_0_02S0_1_0 = z.preprocess((arg) => {
    if (isTS0_0_0(arg)) {
        const discoverMoreInTimeline = () => {
            const ret = {
                discoverMore_detailOpen: "detailOpen",
                discoverMore_detailClose: "detailClose",
                discoverMore_invisible: "invisible",
            }[arg["timeline-discoverMore"]] as TDiscoverMoreInTimeline;
            return ret ? ret : "default";
        };
        const twitterIcon = () => {
            const ret = {
                invisible: "invisible",
                twitter: "twitter",
                dog: "dog",
                custom: "custom",
                "twitterIcon-X": "twitterIconX",
            }[arg.twitterIcon] as TTwitterIcon;
            return ret ? ret : "default";
        };
        const obj: TZSettings = {
            ...arg,
            version: [0, 1, 0],
            button: {
                color: {
                    default: arg.buttonColor,
                    light: arg.buttonColorLight,
                    dark: arg.buttonColorDark,
                },
            },
            others: arg.otherBoolSetting,
            discoverMoreInTimeline: discoverMoreInTimeline(),
            invisibleItems: {
                ...arg.invisibleItems,
                osusumeUserTimeline: arg.invisibleItems["osusume-user-timeline"],
                twitterProPromotionBtn: arg.invisibleItems["twitter-pro-promotion-btn"],
                subscribeProfile: arg.invisibleItems["subscribe-profile"],
                subscribeTweets: arg.invisibleItems["subscribe-tweets"],
            },
            timeline: {
                ...arg.timeline,
                osusumeUserTimeline: arg.timeline["osusume-user-timeline"],
                hideOtherRTTL: arg.timeline.hideOhterRTTL,
            },
            twitterIcon: twitterIcon(),
        };
        zSettings.parse(obj);
        console.log(zSettings.parse(obj));
        return zSettings.parse(obj);
    } else {
        return undefined;
    }
}, zSettings);

export { S0_0_02S0_1_0, zS0_0_0 };
