import { zSettings, TSettings, defaultSettings } from "./settings/defines";
import { legacy } from "./settings/legacy";
import { convertS0_0_02S0_1_0, zS0_0_0 } from "./settings/versions/0-0-0";
import z from "zod";

export class TUICPref {
    private static instance: TUICPref = new TUICPref();

    static getInstance() {
        return TUICPref.instance;
    }
    public settingsMut: TSettings;

    private constructor() {
        let result;

        if (typeof localStorage === "undefined") {
            //ローカルデバッグ用
            result = zSettings.safeParse(defaultSettings);
        } else {
            const withVersion = z
                .object({
                    version: z.string().optional(),
                })
                .passthrough()
                .optional()
                .parse(localStorage.getItem("TUIC") ?? undefined);

            if (withVersion === undefined) {
                result = { success: true, data: defaultSettings };
            } else if (withVersion.version === undefined) {
                // versionが存在しない設定は 0.0.0設定ファイルと仮定します。
                const result000 = zS0_0_0.safeParse(settings);
                if (result000.success) {
                    if (localStorage.getItem("unsent-tweet-background")) {
                        legacy.localStorageToSettings(result000.data);
                    }

                    const dat = convertS0_0_02S0_1_0.parse(result000.data);

                    result = { success: true, data: dat };
                } else {
                    result = result000;
                }
            } else if (withVersion.version === "0.1.0") {
                result = zSettings.safeParse(settings);
            } else {
                throw Error("idk how this error happened2");
            }
        }

        if (result.success) {
            this.settingsMut = result.data;
        } else {
            console.error(`
設定ファイルを正常にパースできませんでした。
下記のログと共にバグ報告をお願いします。
LOCALSTORAGE_TUIC
${localStorage.getItem("TUIC")}
RESULT_ERROR
${result.error}
`);

            throw Error("idk how this error happened3");
            //this.settingsMut = defaultSettings;
        }
    }
    public save() {
        localStorage.setItem("TUIC", JSON.stringify(this.settings));
    }

    public import(object: string) {
        const result = zSettings.safeParse(object);
        if (result.success) {
            this.settingsMut = result.data;
            return null;
        } else {
            return result.error;
        }
    }

    //* できるだけこのgetterをお使いください
    get settings(): Readonly<TSettings> {
        return this.settingsMut;
    }
}
