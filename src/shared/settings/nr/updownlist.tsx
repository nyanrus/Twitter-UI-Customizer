import { TUICPref } from "@content/modules";
import { TUICI18N } from "@content/modules/i18n";
import { batch, createEffect, createSignal, For } from "solid-js";
import { TransitionGroup } from "solid-transition-group";

import { DelegatedEvents } from "solid-js/web";

DelegatedEvents.clear();

export function foo(elem: Element, array: string[], id: string, type: "left" | "right") {
    const [items, setItems] = createSignal(array);

    createEffect(() => {
        console.log("items has changed!");
        console.log(items());
    });

    return (
        <div
            class="tuic-settings-itemlist"
            style={{
                border: "solid 1px #71767b",
                "border-radius": "6px",
                height: "100%",
            }}
        >
            <button
                onClick={() => {
                    setItems((arr) => {
                        return [...arr.slice(1)];
                    });
                }}
            >
                add
            </button>
            <For each={items()}>
                {(item) => (
                    <div
                        style={{
                            padding: "5px 10px",
                        }}
                        tabindex="0"
                        onFocus={(ev) => {
                            ev.target.className = "tuic-settings-itemlist-selected";
                        }}
                        onBlur={(ev) => {
                            ev.target.className = "";
                        }}
                        onKeyDown={(event) => {
                            console.log(event.key);
                            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                                event.preventDefault();
                                setItems((arr) => {
                                    const idx = arr.indexOf(item);

                                    const tmp = event.key === "ArrowDown" ? /*ArrowDown*/ 1 : /*ArrowUp*/ -1;

                                    //? out of index
                                    if (idx + tmp < 0 || idx + tmp >= arr.length) return arr;
                                    const next = arr[idx + tmp];
                                    arr[idx + tmp] = arr[idx];
                                    arr[idx] = next;
                                    return [...arr];
                                });
                                elem.querySelector<HTMLElement>(".tuic-settings-itemlist > .tuic-settings-itemlist-selected").focus();
                            }
                        }}
                    >
                        {TUICI18N.get(TUICPref.getSettingI18n(id, item))}
                    </div>
                )}
            </For>
        </div>
    );
}
