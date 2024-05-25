<template>
    <div ref="el_box"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { CheckBox } from "./inputlist";

import { render } from "solid-js/web";

const props = defineProps<{ name: string; value: string }>();

const el_box = ref();
onMounted(() => {
    render(() => CheckBox(props.value, props.name), el_box.value);
});
</script>

<style scoped></style>
