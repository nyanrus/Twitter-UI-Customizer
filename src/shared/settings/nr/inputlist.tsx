import { TUICPref } from "@content/modules";
import { updateClasses } from "@content/modules/htmlClass/classManager";
import { TUICI18N } from "@content/modules/i18n";
import { TUICObserver } from "@content/modules/observer";
import { titleObserverFunction } from "@content/modules/observer/titleObserver";
import { For, Match, Show, Switch } from "solid-js";

const changePrefCheckBox = (path: string, event: any) => {
    TUICPref.setPref(path, event.target.checked);
    TUICPref.save();
    updateClasses();
    titleObserverFunction();
};

const changePrefRadio = (path, valueName) => {
    TUICPref.setPref(path, valueName);
    TUICPref.save();
    updateClasses();
    TUICObserver.callback();
};

export function CheckBox(value: string, name: string) {
    return (
        <>
            <label class="TUIC_setting_text" for={value.replace(/\./g, "-_-")}>
                {TUICI18N.get(name)}
            </label>
            <input type="checkbox" id={value.replace(/\./g, "-_-")} checked={TUICPref.getPref(value)} onChange={(ev) => changePrefCheckBox(value, ev)} />;
        </>
    );
}

export function InputList(id: string, type: "checkbox" | "radio") {
    return (
        <For each={TUICPref.getSettingData(id)}>
            {(i) => {
                const value = `${id}.${i.id}`;
                const valueName = i.id;
                const name = i.i18n;
                return (
                    <div class="TUICCheckBoxParent">
                        <label class="TUIC_setting_text" for={value.replace(/\./g, "-_-")}>
                            {TUICI18N.get(name)}
                        </label>
                        <Switch>
                            <Match when={type === "checkbox"}>
                                <input type="checkbox" id={value.replace(/\./g, "-_-")} checked={TUICPref.getPref(value)} onChange={(ev) => changePrefCheckBox(value, ev)} />
                            </Match>
                            <Match when={type === "radio"}>
                                <input style="margin: 0" type="radio" id={`${id.replace(/\./g, "-_-")}-_-${valueName}`} name={id.replace(/\./g, "-_-")} value={valueName} checked={TUICPref.getPref(id) == valueName} onChange={() => changePrefRadio(id, valueName)} />
                            </Match>
                        </Switch>
                    </div>
                );
            }}
        </For>
    );
}
