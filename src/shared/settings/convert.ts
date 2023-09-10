import { Settings, UnVersioned } from "./defines";
import { defaultSettings } from "./default";

export default {
    fromUnVersioned: (json: Settings | UnVersioned): Settings => {
        let unversioned: UnVersioned = json;
        let settings: Settings = { ...defaultSettings, ...json };
        settings.buttonColor;
        return;
    },
};
