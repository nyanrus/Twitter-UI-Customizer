<template>
    <details class="TUICDetails">
        <summary class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title">
            {{ TUICI18N.get(title) }}
        </summary>
        <div class="TUIC_col_setting_container">
            <checkbox
                v-for="i in TUICData[id].all"
                :id="i"
                :value="settings[id][i]"
                :name="TUICData[id].i18n[i]"
                :type="type"
            />
        </div>
        <br />
        {{ otherSetting ?? "" }}
    </details>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import checkbox from "./checkbox.vue";

import { TUICI18N } from "../../content/i18n";
import { TUICData } from "../../content/data";

export default defineComponent({
    setup() {
        return { TUICI18N, TUICData };
    },
    // //チェックボックスリスト(id:ID title:Stringでタイトル)
    props: ["title", "otherSetting", "id", "settings", "type"],
    components: { checkbox },
});
</script>

<style scoped></style>
