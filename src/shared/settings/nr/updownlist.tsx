import { TUICPref } from "@content/modules";
import { TUICI18N } from "@content/modules/i18n";
import { batch, createEffect, createSignal, For } from "solid-js";
import { TransitionGroup } from "solid-transition-group";

import { DelegatedEvents } from "solid-js/web";
import { updateClasses } from "@content/modules/htmlClass/classManager";

import ARROW_LEFT from "@content/icons/arrow_cutter/arrow_toleft.svg?url";
import ARROW_RIGHT from "@content/icons/arrow_cutter/arrow_toright.svg?url";
import ARROW_UP from "@content/icons/arrow_cutter/arrow_up.svg?url";
import ARROW_DOWN from "@content/icons/arrow_cutter/arrow_down.svg?url";
import RESET from "@content/icons/common/reset.svg?url";

import browser from "webextension-polyfill";

const styleItemList = {
    border: "solid 1px #71767b",
    "border-radius": "6px",
    height: "100%",
};

DelegatedEvents.clear();

function moveH(arr: Readonly<string[]>, id: string, direction: "up" | "down"): string[] {
    //? solid-js seems do not reflect if do not deepcopy array
    const _arr = [...arr];
    const _direction = direction === "down" ? 1 : -1;
    const idx = _arr.indexOf(id);
    //? range out
    if (idx + _direction < 0 || idx + _direction >= arr.length) return _arr;
    const next = _arr[idx + _direction];
    _arr[idx + _direction] = _arr[idx];
    _arr[idx] = next;

    return _arr;
}

function moveV(leftArr: Readonly<string[]>, rightArr: Readonly<string[]>, id: string, direction: "left" | "right"): [string[], string[]] {
    const _leftArr = [...leftArr];
    const _rightArr = [...rightArr];
    if (direction === "right") {
        const idx = leftArr.indexOf(id);
        _leftArr.splice(idx, 1);
        _rightArr.splice(idx, 0, id);
    } else if (direction === "left") {
        const idx = rightArr.indexOf(id);
        _rightArr.splice(idx, 1);
        _leftArr.splice(idx, 0, id);
    }
    return [_leftArr, _rightArr];
}

console.log(ARROW_LEFT);
console.log(browser.runtime.getURL(ARROW_LEFT));

export function foo(parent: Element, array: string[], id: string) {
    const [leftItems, setLeftItems] = createSignal(array);
    const [rightItems, setRightItems] = createSignal<string[]>(TUICPref.getSettingIDs(id as any).filter((value: string) => !array.includes(value)));
    const [selected, setSelected] = createSignal({ position: "", id: "" });

    createEffect(() => {
        parent.querySelectorAll(".tuic-settings-itemlist-selected").forEach((v) => (v.className = ""));
        if (selected().id !== "") parent.querySelector(`[data-id=${selected().id}]`).className = "tuic-settings-itemlist-selected";
    });

    createEffect(() => {
        TUICPref.setPref(id, leftItems());
        TUICPref.save();
        updateClasses();
    });

    function reset(settingsId: string) {
        setLeftItems(structuredClone(TUICPref.getDefaultPref(settingsId).data));
        setRightItems(TUICPref.getSettingIDs(id as any).filter((value: string) => !array.includes(value)));
    }

    return (
        <div
            onKeyDown={(event) => {
                console.log(event.key);
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    const sel = selected();

                    //? in right, up down should not used
                    if (sel.position === "right") return;
                    if (sel.position === "left") {
                        setLeftItems((arr) => moveH(arr, sel.id, event.key === "ArrowDown" ? "down" : "up"));
                    } else if (sel.position === "right") {
                        setRightItems((arr) => moveH(arr, sel.id, event.key === "ArrowDown" ? "down" : "up"));
                    }

                    parent.querySelector<HTMLElement>(".tuic-settings-itemlist > .tuic-settings-itemlist-selected").focus();
                }

                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    const sel = selected();
                    const direction = event.key === "ArrowRight" ? "right" : "left";
                    if (direction === sel.position) return;
                    const [_left, _right] = moveV(leftItems(), rightItems(), sel.id, direction);
                    setLeftItems(() => _left);
                    setRightItems(() => _right);
                    parent.querySelector<HTMLElement>(`[data-id=${sel.id}]`).focus();
                }
            }}
            style={{ display: "flex", "align-items": "stretch" }}
        >
            <div style={{ flex: "1", "align-items": "stretch", display: "flex", "flex-direction": "column" }}>
                <h3>{TUICI18N.get("settingUI-upDownList-visible")}</h3>
                <div class="tuic-settings-itemlist tuic-settings-itemlist-left" style={styleItemList}>
                    <For each={leftItems()}>
                        {(item) => (
                            <div
                                data-id={item}
                                style={{
                                    padding: "5px 10px",
                                    height: "1.5em",
                                }}
                                tabindex="0"
                                onFocus={() => setSelected({ position: "left", id: item })}
                                // onBlur={() => setSelected({ position: "", id: "" })}
                            >
                                {TUICI18N.get(TUICPref.getSettingI18n(id, item))}
                            </div>
                        )}
                    </For>
                </div>
            </div>

            <div style={{ display: "flex", "flex-direction": "column", "padding-top": "3.5em" }}>
                <button
                    class="TUIC_icon_button_con"
                    onClick={(ev) => {
                        ev.preventDefault();
                        const sel = selected();
                        const [_left, _right] = moveV(leftItems(), rightItems(), sel.id, "left");
                        setLeftItems(() => _left);
                        setRightItems(() => _right);
                        parent.querySelector<HTMLElement>(`[data-id=${sel.id}]`).focus();
                    }}
                >
                    <div style={{ "mask-image": `url(${browser.runtime.getURL(ARROW_LEFT)})` }}></div>
                </button>
                <button
                    class="TUIC_icon_button_con"
                    onClick={() => {
                        const sel = selected();
                        const [_left, _right] = moveV(leftItems(), rightItems(), sel.id, "right");
                        setLeftItems(() => _left);
                        setRightItems(() => _right);
                        parent.querySelector<HTMLElement>(`[data-id=${sel.id}]`).focus();
                    }}
                >
                    <div style={{ "mask-image": `url(${browser.runtime.getURL(ARROW_RIGHT)})` }}></div>
                </button>
                <hr class="TUIC_setting_UpdownListBtnDivider" />
                <button
                    class="TUIC_icon_button_con"
                    onClick={() => {
                        const sel = selected();
                        if (sel.position === "left") {
                            setLeftItems((arr) => moveH(arr, sel.id, "up"));
                        } else if (sel.position === "right") {
                            setRightItems((arr) => moveH(arr, sel.id, "up"));
                        }

                        parent.querySelector<HTMLElement>(".tuic-settings-itemlist > .tuic-settings-itemlist-selected").focus();
                    }}
                >
                    <div style={{ "mask-image": `url(${browser.runtime.getURL(ARROW_UP)})` }}></div>
                </button>
                <button
                    class="TUIC_icon_button_con"
                    onClick={() => {
                        const sel = selected();
                        if (sel.position === "left") {
                            setLeftItems((arr) => moveH(arr, sel.id, "down"));
                        } else if (sel.position === "right") {
                            setRightItems((arr) => moveH(arr, sel.id, "down"));
                        }

                        parent.querySelector<HTMLElement>(".tuic-settings-itemlist > .tuic-settings-itemlist-selected").focus();
                    }}
                >
                    <div style={{ "mask-image": `url(${browser.runtime.getURL(ARROW_DOWN)})` }}></div>
                </button>
                <hr class="TUIC_setting_UpdownListBtnDivider" />
                <button
                    class="TUIC_icon_button_con"
                    onClick={() => {
                        reset(id);
                    }}
                >
                    <div style={{ "mask-image": `url(${browser.runtime.getURL(RESET)})` }}></div>
                </button>
            </div>

            <div style={{ flex: "1", "align-items": "stretch", display: "flex", "flex-direction": "column" }}>
                <h3>{TUICI18N.get("settingUI-upDownList-invisible")}</h3>
                <div class="tuic-settings-itemlist tuic-settings-itemlist-right" style={styleItemList}>
                    <For each={rightItems()}>
                        {(item) => (
                            <div
                                data-id={item}
                                style={{
                                    padding: "5px 10px",
                                    height: "1.5em",
                                }}
                                tabindex="0"
                                onFocus={() => setSelected({ position: "right", id: item })}
                                // onBlur={() => setSelected({ position: "", id: "" })}
                            >
                                {TUICI18N.get(TUICPref.getSettingI18n(id, item))}
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
}
