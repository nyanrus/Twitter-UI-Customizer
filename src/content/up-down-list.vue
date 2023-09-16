<template>
    <details class="TUICDetails">
        <summary
            class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title i18n"
            :i18n-id="title"
        >
            {{ title }}>
        </summary>
        <div class="TUIC_col_setting_container">
            <div style="display: flex" :TUICUDBox="id" TUICSelectedItem="">
                <div style="flex: 1 2; width: 50px">
                    <h2
                        style="font-size: 15px"
                        class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_text i18n"
                        i18n-id="settingUI-upDownList-visible"
                    >
                        settingUI-upDownList-visible
                    </h2>
                    <br />
                    <div
                        id="TUIC_visible"
                        class="TUIC_selectbox"
                        :style="{ '--contentCount': contentCount }"
                    >
                        {{ TUICVisibleButtons }}
                    </div>
                </div>
                <div style="text-align: center; width: 30px">
                    <br />
                    <br />
                    {{ upDownButtons }}
                </div>
                <div style="flex: 1 2; width: 50px">
                    <h2
                        style="font-size: 15px"
                        class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_text i18n"
                        i18n-id="settingUI-upDownList-invisible"
                    >
                        "settingUI-upDownList-invisible"
                    </h2>
                    <br />
                    <div
                        id="TUIC_invisible"
                        class="TUIC_selectbox"
                        :style="{ '--contentCount': contentCount }"
                    >
                        {{ TUICInvisibleButtons }}
                    </div>
                </div>
            </div>
            <br />
            {{ option }}
        </div>
        <br />
    </details>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {};
    },
    props: [
        "title",
        "TUICVisibleButtons",
        "contentCount",
        "TUICInvisibleButtons",
        "upDownButtons",
        "id",
        "option",
    ],
});
</script>

<style scoped></style>
