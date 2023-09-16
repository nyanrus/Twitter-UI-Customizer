<template>
    <details class="TUICDetails">
        <summary class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title">
            {{ TUICI18N.get(title) }}
        </summary>
        <div class="TUIC_col_setting_container">{{ TUICInvisibleCheckBox }}</div>
        <br />
        {{ otherSetting ?? "" }}
    </details>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { TUICI18N } from "../../content/i18n";

// //チェックボックスリスト(id:ID title:Stringでタイトル)
// checkboxList: function (id, title, type, otherSetting) {
//         let TUICInvisibleCheckBox = "";
//         for (const i of TUICData[id].all) {
//             TUICInvisibleCheckBox += this.checkbox(i, settings[id][i], TUICData[id].i18n[i], type);
//         }
// return `
// <details class="TUICDetails">
//     <summary class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title">${TUICI18N.get(
//         title,
//     )}</summary>
//   <div class="TUIC_col_setting_container">
//       ${TUICInvisibleCheckBox}
//   </div>
//   <br>
//   ${otherSetting ?? ""}
// </details>
//           `;
//     },
export default defineComponent({
    setup() {
        return { TUICI18N };
    },
    props: ["title", "otherSetting"],
});
</script>

<style scoped></style>
