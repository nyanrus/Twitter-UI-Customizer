<template>
    <div ref="el_list" class="tuic-settings-itemlist"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { TUICPref } from "@content/modules";

import { render } from "solid-js/web";
import { foo } from "./updownlist";

const props = defineProps<{ id: string }>();

const list = ref(TUICPref.getPref(props.id));

const el_list = ref();
onMounted(() => {
    render(() => foo(el_list.value, list.value, props.id), el_list.value);
});
</script>

<style scoped></style>
