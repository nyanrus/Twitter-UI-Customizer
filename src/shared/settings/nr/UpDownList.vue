<template>
    <div ref="el_list" class="tuic-settings-itemlist"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import ARROW_LEFT from "@content/icons/arrow_cutter/arrow_toleft.svg?component";
import ARROW_RIGHT from "@content/icons/arrow_cutter/arrow_toright.svg?component";
import ARROW_UP from "@content/icons/arrow_cutter/arrow_up.svg?component";
import ARROW_DOWN from "@content/icons/arrow_cutter/arrow_down.svg?component";
import RESET from "@content/icons/common/reset.svg?component";

import { TUICPref } from "@content/modules";

import { updateClasses } from "@modules/htmlClass/classManager";
import { render } from "solid-js/web";
import { foo } from "./updownlist";

const props = defineProps<{ id: string }>();

const list = ref(TUICPref.getPref(props.id));

const el_list = ref();
onMounted(() => {
    render(() => foo(el_list.value, list.value, props.id), el_list.value);
});

console.log(list.value);
const selectedElem = ref("");

const apply2Settings = () => {
    const id = props.id;
    TUICPref.setPref(id, list.value);
    TUICPref.save();
    updateClasses();
};

const toDefault = () => {
    const settingId = props.id;
    list.value = structuredClone(TUICPref.getDefaultPref(settingId).data);
    selectedElem.value = "";
    apply2Settings();
};

// const UpdownButtonFuncs = [
//     {
//         iconSrc: ARROW_LEFT,
//         btnAction: "TUIC_up_down_list_to_left",
//         func: toLeft,
//         tooltiptag: "settingUI-upDownList-toLeft",
//         nextHr: false,
//     },
//     {
//         iconSrc: ARROW_RIGHT,
//         btnAction: "TUIC_up_down_list_to_right",
//         func: toRight,
//         tooltiptag: "settingUI-upDownList-toRight",
//         nextHr: true,
//     },
//     {
//         iconSrc: ARROW_UP,
//         btnAction: "TUIC_up_down_list_to_up",
//         func: toUp,
//         tooltiptag: "settingUI-upDownList-toUp",
//         nextHr: false,
//     },
//     {
//         iconSrc: ARROW_DOWN,
//         btnAction: "TUIC_up_down_list_to_down",
//         func: toDown,
//         tooltiptag: "settingUI-upDownList-toDown",
//         nextHr: true,
//     },
//     {
//         iconSrc: RESET,
//         btnAction: "TUIC_up_down_list_to_default",
//         func: toDefault,
//         tooltiptag: "settingUI-upDownList-restoreDefault",
//         nextHr: false,
//     },
// ];
// const UDALL = TUICPref.getSettingIDs(props.id);
// let _contentCount = 5;
// if (UDALL.length > 5) {
//     _contentCount = UDALL.length;
// }
</script>

<style scoped></style>
