import { zSettings, TSettings, defaultSettings } from "./settings/defines";

export class TUICPref {
    private static instance: TUICPref = new TUICPref();

    static getInstance() {
        return TUICPref.instance;
    }

    private constructor() {
        let result;

        if (typeof localStorage !== "undefined") {
            result = zSettings.safeParse(localStorage.getItem("TUIC"));
        } else {
            //ローカルデバッグ用
            result = zSettings.safeParse(defaultSettings);
        }

        if (result.success) {
            this.settingsMut = result.data;
        } else {
            this.settingsMut = defaultSettings;
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

    public settingsMut: TSettings;
    // できるだけこのgetterをお使いください
    get settings(): Readonly<TSettings> {
        return this.settingsMut;
    }
}

// return new Proxy(this, {
//     get(target, name: keyof TSettings, receiver) {
//         if (name in target.settings) {
//             return target.settings[name];
//         }
//     },
//     set(target, name: keyof TSettings, receiver) {
//         if (name in target.settings) {
//             target.settings[name] = receiver;
//             // target.changed = true;
//             return true;
//         } else {
//             return false;
//         }
//     },
// });

// export const TUICPrefa = {
//     config: null,
//     get: function (identifier) {
//         this.getConfig();
//         const { object, key } = getPointerFromKey(this.config, identifier);
//         return object[key];
//     },
//     set: function (identifier, value) {
//         this.getConfig();
//         if (identifier == "") {
//             this.config = value;
//         } else {
//             const { object, key } = getPointerFromKey(this.config, identifier);
//             object[key] = value;
//         }
//     },
//     delete: function (identifier) {
//         this.getConfig();
//         const { object, key } = getPointerFromKey(this.config, identifier);
//         delete object[key];
//     },
//     save: function () {
//         this.getConfig();
//         localStorage.setItem("TUIC", JSON.stringify(this.config));
//     },
//     import: function (object) {
//         if (typeof object === "string") {
//             this.config = JSON.parse(object);
//         } else {
//             this.config = object;
//         }
//     },
//     export: function () {
//         this.getConfig();
//         return JSON.stringify(this.config);
//     },
//     getConfig: function () {
//         if (this.config == null) {
//             this.config = JSON.parse(
//                 localStorage.getItem("TUIC") ?? JSON.stringify(TUICData.defaultPref),
//             );
//         }
//     },
// };
