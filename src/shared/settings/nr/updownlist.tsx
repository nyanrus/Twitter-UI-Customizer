import { TUICPref } from "@content/modules";
import { TUICI18N } from "@content/modules/i18n";
import { createSignal, For, onMount } from "solid-js";
import Sortable from "sortablejs";

export function foo(elem: Element, array: string[], id: string, type: "left" | "right") {
    const [getItems, setItems] = createSignal(
        array.map((v, idx) => {
            return { id: type + idx, title: v };
        }),
    );
    let sortable: Sortable | null;
    onMount(() => {
        sortable = Sortable.create(elem.querySelector(".tuic-settings-itemlist"), {
            animation: 150,
            group: id,
            store: {
                get: (sortable) => {
                    return Object.values(items).map((v) => v.id);
                },
                set: (sortable) => {
                    const tmp = [];
                    for (const idx of sortable.toArray()) {
                        const result = items.find((v) => v.id === type + idx);
                        if (result) tmp.push(result);
                    }
                    setItems(tmp);
                },
            },
            ghostClass: "tuic-settings-itemlist-selected",
        });
    });

    //? remove reactivity for SortableJS
    const items = getItems();

    return (
        <div
            class="tuic-settings-itemlist"
            style={{
                border: "solid 1px #71767b",
                "border-radius": "6px",
                height: "100%",
            }}
        >
            <For each={items}>
                {(item) => (
                    <div
                        data-id={item.id}
                        style={{
                            padding: "5px 10px",
                        }}
                        tabindex="0"
                        onFocus={(ev) => (ev.target.className = "tuic-settings-itemlist-selected")}
                        onBlur={(ev) => (ev.target.className = "")}
                        onKeyDown={(ev) => {
                            console.log(ev.key);
                            if (ev.key.startsWith("Arrow")) {
                                switch (ev.key) {
                                    case "ArrowDown": {
                                        ev.preventDefault();
                                        const arr = sortable.toArray();

                                        const idx = arr.indexOf(item.id);
                                        const elem_0 = arr[idx];
                                        const elem_1 = arr[idx + 1];

                                        arr.splice(idx, 1, elem_1);
                                        arr.splice(idx + 1, 1, elem_0);
                                        sortable.sort(arr, true);
                                        Sortable.utils.elem.querySelector<HTMLElement>(`[data-id="${item.id}"]`).focus();
                                        break;
                                    }
                                    case "ArrowUp": {
                                        ev.preventDefault();
                                        const arr = sortable.toArray();

                                        const idx = arr.indexOf(item.id);
                                        if (idx === 0) return;
                                        const elem_0 = arr[idx];
                                        const elem_1 = arr[idx - 1];

                                        arr.splice(idx, 1, elem_1);
                                        arr.splice(idx - 1, 1, elem_0);
                                        sortable.sort(arr, true);

                                        elem.querySelector<HTMLElement>(`[data-id="${item.id}"]`).focus();
                                        break;
                                    }
                                    case "ArrowLeft": {
                                        ev.preventDefault();
                                        if (type === "left") {
                                            break;
                                        }
                                        const arr = sortable.toArray();
                                        const opponentInstance = Sortable.get(ev.target.closest(`[tuicudbox=${id}]`).querySelector(".tuic-settings-itemlist-left > .tuic-settings-itemlist"));
                                        const arrOp = opponentInstance.toArray();
                                        arrOp.splice(arr.indexOf(item.id), 0, item.id);
                                        opponentInstance.sort(arrOp, true);
                                        opponentInstance.options.store.set();
                                        console.log(arrOp);
                                        console.log(opponentInstance.toArray());
                                        break;
                                    }
                                }
                            }
                        }}
                    >
                        {TUICI18N.get(TUICPref.getSettingI18n(id, item.title))}
                    </div>
                )}
            </For>
        </div>
    );
}
