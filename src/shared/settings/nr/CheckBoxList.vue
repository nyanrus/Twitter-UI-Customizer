<template>
    <div ref="el_list"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { InputList } from "./inputlist";

import { render } from "solid-js/web";

const props = defineProps<{ id: string }>();

const el_list = ref();
onMounted(() => {
    render(() => InputList(props.id, "checkbox"), el_list.value);
});
</script>

<style scoped></style>
./inputlist
