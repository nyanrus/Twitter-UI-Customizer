<template>
    <div :TUICUDBox="id">
        <div class="TUIC_setting_UpdownList_listContainer">
            <h2 style="font-size: 15px" class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_text TUICUpDownTitle">
                {{ TUICI18N.get("settingUI-upDownList-visible") }}
            </h2>
            <div style="height: 100%" ref="el_list_left" class="tuic-settings-itemlist-left"></div>
        </div>
        <div class="UpDownButtons" style="text-align: center">
            <!--Spacer-->
            <div style="height: 32px"></div>
            <template v-for="item in UpdownButtonFuncs" :key="item.btnAction">
                <button @click="item.func" :class="['TUIC_icon_button_con', item.btnAction]" :title="TUICI18N.get(item.tooltiptag)">
                    <component :is="item.iconSrc" />
                </button>
                <hr v-if="item.nextHr" class="TUIC_setting_UpdownListBtnDivider" />
            </template>
        </div>
        <div class="TUIC_setting_UpdownList_listContainer">
            <h2 style="font-size: 15px" class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_text TUICUpDownTitle">
                {{ TUICI18N.get("settingUI-upDownList-invisible") }}
            </h2>

            <div style="height: 100%" ref="el_list_right" class="tuic-settings-itemlist-right"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import ARROW_LEFT from "@content/icons/arrow_cutter/arrow_toleft.svg?component";
import ARROW_RIGHT from "@content/icons/arrow_cutter/arrow_toright.svg?component";
import ARROW_UP from "@content/icons/arrow_cutter/arrow_up.svg?component";
import ARROW_DOWN from "@content/icons/arrow_cutter/arrow_down.svg?component";
import RESET from "@content/icons/common/reset.svg?component";

import { TUICI18N } from "@modules/i18n";
import { TUICPref } from "@content/modules";

import { updateClasses } from "@modules/htmlClass/classManager";
import { render } from "solid-js/web";
import { foo } from "./updownlist";

const drag = ref(false);

const props = defineProps<{ id: string }>();

const list = ref(TUICPref.getPref(props.id));

const el_list_left = ref();
onMounted(() => {
    render(() => foo(el_list_left.value, list.value, props.id, "left"), el_list_left.value);
});

const el_list_right = ref();
onMounted(() => {
    render(
        () =>
            foo(
                el_list_right.value,
                TUICPref.getSettingIDs(props.id).filter((value: string) => !list.value.includes(value)),
                props.id,
                "right",
            ),
        el_list_right.value,
    );
});

console.log(list.value);
const selectedElem = ref("");

const clickEv = (selectItem) => {
    selectedElem.value = selectItem;
};

const apply2Settings = () => {
    const id = props.id;
    TUICPref.setPref(id, list.value);
    TUICPref.save();
    updateClasses();
};

const toLeft = () => {
    if (selectedElem.value && !list.value.includes(selectedElem.value)) {
        list.value.push(selectedElem.value);
        apply2Settings();
    }
};

const toRight = () => {
    if (selectedElem.value && list.value.includes(selectedElem.value)) {
        list.value = list.value.filter((v) => v !== selectedElem.value);
        apply2Settings();
    }
};

const toUp = () => {
    const selectedItem = selectedElem.value;
    if (selectedItem && list.value.includes(selectedItem)) {
        const idx = list.value.findIndex((v) => v === selectedItem);
        if (idx > 0) {
            [list.value[idx - 1], list.value[idx]] = [list.value[idx], list.value[idx - 1]];
        }
        apply2Settings();
    }
};

const toDown = () => {
    const selectedItem = selectedElem.value;
    if (selectedItem && list.value.includes(selectedItem)) {
        const idx = list.value.findIndex((v) => v === selectedItem);
        if (idx < list.value.length - 1) {
            [list.value[idx + 1], list.value[idx]] = [list.value[idx], list.value[idx + 1]];
        }
        apply2Settings();
    }
};

const toDefault = () => {
    const settingId = props.id;
    list.value = structuredClone(TUICPref.getDefaultPref(settingId).data);
    selectedElem.value = "";
    apply2Settings();
};

const UpdownButtonFuncs = [
    {
        iconSrc: ARROW_LEFT,
        btnAction: "TUIC_up_down_list_to_left",
        func: toLeft,
        tooltiptag: "settingUI-upDownList-toLeft",
        nextHr: false,
    },
    {
        iconSrc: ARROW_RIGHT,
        btnAction: "TUIC_up_down_list_to_right",
        func: toRight,
        tooltiptag: "settingUI-upDownList-toRight",
        nextHr: true,
    },
    {
        iconSrc: ARROW_UP,
        btnAction: "TUIC_up_down_list_to_up",
        func: toUp,
        tooltiptag: "settingUI-upDownList-toUp",
        nextHr: false,
    },
    {
        iconSrc: ARROW_DOWN,
        btnAction: "TUIC_up_down_list_to_down",
        func: toDown,
        tooltiptag: "settingUI-upDownList-toDown",
        nextHr: true,
    },
    {
        iconSrc: RESET,
        btnAction: "TUIC_up_down_list_to_default",
        func: toDefault,
        tooltiptag: "settingUI-upDownList-restoreDefault",
        nextHr: false,
    },
];
const UDALL = TUICPref.getSettingIDs(props.id);
let _contentCount = 5;
if (UDALL.length > 5) {
    _contentCount = UDALL.length;
}
</script>

<style scoped></style>
