<template>
    <div
        id="TUIC_setting"
        class="css-1dbjc4n r-1wtj0ep r-ymttw5 r-1f1sjgu r-1e081e0 TUICOriginalContent"
    >
        <div
            class="css-901oao css-cens5h r-jwli3a r-1tl8opc r-adyw6z r-1vr29t4 r-135wba7 r-bcqeeo r-qvutc0"
        >
            <h2 aria-level="2" role="heading" class="css-4rbku5 css-1dbjc4n r-18u37iz">
                <span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0 TUIC_setting_text">
                    <!-- {{ TUICI18N.get("brandingName") }} -->
                </span>
            </h2>
        </div>

        <div>
            <br /><br />
            <h2
                class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_title"
                style="font-size: 18px; margin-bottom: 1px"
            >
                {{ TUICI18N.get("settingUI-easySetting") }}
            </h2>
            <br />
            <h2
                class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_title"
                style="font-size: 14px"
            >
                {{ TUICI18N.get("settingUI-easySetting-detail") }}
            </h2>
            <br />
            <div class="TUICEasySetting" style="margin-top: 15px">
                <button
                    class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                    style="margin-top: 10px; margin-bottom: 10px"
                    id="restoreIcon"
                >
                    {{ TUICI18N.get("easySetting-restoreIcon") }}
                </button>
                <button
                    class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                    style="margin-top: 10px; margin-bottom: 10px"
                    id="deleteVerified"
                >
                    {{ TUICI18N.get("easySetting-deleteVerified") }}
                </button>
                <button
                    class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                    style="margin-top: 10px; margin-bottom: 10px"
                    id="discoverMoreDelete"
                >
                    {{ TUICI18N.get("easySetting-discoverMoreDelete") }}
                </button>
                <button
                    class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                    style="margin-top: 10px; margin-bottom: 10px"
                    id="defaultTwitterColor"
                >
                    {{ TUICI18N.get("easySetting-defaultTwitterColor") }}
                </button>
                <button
                    class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width default_set"
                    style="margin-top: 10px; margin-bottom: 10px"
                >
                    {{ TUICI18N.get("settingUI-restoreDefaultAll") }}
                </button>
            </div>
            <br />
            <h2
                class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_title"
                style="font-size: 18px"
            >
                {{ TUICI18N.get("settingUI-everythingSetting") }}
            </h2>
            <br /><br />
            <details class="TUICDetails">
                <summary class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title">
                    {{ TUICI18N.get("settingColors-settingTitle") }}
                </summary>
                <div id="colorSettingList" class="TUIC_col_setting_container">
                    <div style="display: flex">
                        <input
                            type="radio"
                            name="TUICColorType"
                            value="buttonColor"
                            id="TUICColorType-Base"
                            class="TUICColorSettingRadio"
                            checked
                        />
                        <label
                            class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton"
                            for="TUICColorType-Base"
                            style="
                                background: linear-gradient(
                                    125deg,
                                    #ffffff 0%,
                                    #ffffff 42.5%,
                                    #000000 42.5%,
                                    #000000 100%
                                );
                            "
                            ><span
                                ><span>{{ TUICI18N.get("settingColors-select-base") }}</span></span
                            ></label
                        >
                        <input
                            type="radio"
                            name="TUICColorType"
                            value="buttonColorLight"
                            id="TUICColorType-Light"
                            class="TUICColorSettingRadio"
                        />
                        <label
                            class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton"
                            for="TUICColorType-Light"
                            style="background-color: rgb(255, 255, 255)"
                            ><span
                                ><span>{{ TUICI18N.get("settingColors-select-light") }}</span></span
                            ></label
                        >
                        <input
                            type="radio"
                            name="TUICColorType"
                            value="buttonColorDark"
                            id="TUICColorType-Dark"
                            class="TUICColorSettingRadio"
                        />
                        <label
                            class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton"
                            for="TUICColorType-Dark"
                            style="background-color: rgb(0, 0, 0)"
                            ><span>
                                <span>{{ TUICI18N.get("settingColors-select-dark") }} </span>
                            </span>
                        </label>
                    </div>
                    <div style="margin-left: 10px; margin-right: 10px">
                        <span
                            class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_text"
                            style="font-size: 12px"
                            >{{ TUICI18N.get("settingColors-select-explain") }}
                        </span>
                    </div>
                    <br />
                    <ColorsList />
                </div>
            </details>

            <UpDownList id="visibleButtons" title="buttomTweetButtons-settingTitle">
                <Checkbox
                    id="buttomScroll"
                    :value="settings.others.bottomScroll"
                    type="bottomTweetButtons-setting-visibleScrollBar"
                    name="otherBoolSetting"
                />
                <Checkbox
                    id="bottomSpace"
                    :value="settings.others.bottomSpace"
                    type="bottomTweetButtons-setting-removeSpaceBottomTweet-v2"
                    name="otherBoolSetting"
                />
                <Checkbox
                    id="RTNotQuote"
                    :value="settings.others.RTNotQuote"
                    type="bottomTweetButtons-setting-RTNotQuote"
                    name="otherBoolSetting"
                />
                <Checkbox
                    id="noModalbottomTweetButtons"
                    :value="settings.others.noModalbottomTweetButtons"
                    type="bottomTweetButtons-setting-noModal"
                    name="otherBoolSetting"
                />
                <Checkbox
                    id="noNumberBottomTweetButtons"
                    :value="settings.others.noNumberBottomTweetButtons"
                    type="bottomTweetButtons-setting-noNumber"
                    name="otherBoolSetting"
                />
            </UpDownList>
            <UpDownList id="fixEngagements" title="fixEngagements-settingTitle">
                <Checkbox
                    id="placeEngagementsLink"
                    :value="settings.others.placeEngagementsLink"
                    type="bottomTweetButtons-setting-placeEngagementsLink"
                    name="otherBoolSetting"
                />
                <Checkbox
                    id="placeEngagementsLinkShort"
                    :value="settings.others.placeEngagementsLinkShort"
                    type="fixEngagements-shortName"
                    name="otherBoolSetting"
                />
            </UpDownList>
            <UpDownList id="sidebarButtons" title="sidebarButton-settingTitle">
                <Checkbox
                    id="smallerSidebarContent"
                    :value="settings.others.smallerSidebarContent ?? true"
                    type="sidebarButton-setting-narrowBetweenButtons"
                    name="otherBoolSetting"
                />
                <Checkbox
                    id="sidebarNoneScrollbar"
                    :value="settings.others.sidebarNoneScrollbar ?? false"
                    type="sidebarButton-setting-sidebarNoneScrollbar"
                    name="otherBoolSetting"
                />
            </UpDownList>
            <RadioButtonList id="twitterIcon" title="twitterIcon-settingTitle" type="TUICRadio">
                <br />
                <Checkbox
                    id="faviconSet"
                    :value="settings.others.faviconSet ?? true"
                    type="twitterIcon-favicon"
                    name="otherBoolSetting"
                />
                <Checkbox
                    id="roundIcon"
                    :value="settings.others.roundIcon ?? true"
                    type="twitterIcon-roundIcon"
                    name="otherBoolSetting"
                />
                <UploadImageFile title="twitterIcon-usedIcon" id="IconImg" />
            </RadioButtonList>
            <CheckboxList
                id="invisibleItems"
                title="invisibleItems-settingTitle"
                type="TUICInvisibleItems"
            />
            <CheckboxList id="timeline" title="timeline-settingTitle" type="timelineSetting">
                <RadioButtonListSub
                    id="timeline-discoverMore"
                    title="timeline-discoverMore"
                    type="TUICRadio"
                />
            </CheckboxList>
            <CheckboxList id="XToTwitter" title="XToTwitter-settingTitle" type="TUICXToTwitter">
                <button
                    class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                    style="margin-bottom: 10px"
                    id="XToTwitterRestoreIcon"
                >
                    {{ TUICI18N.get("XtoTwitter-twitterIcon") }}
                </button>
            </CheckboxList>
            <CheckboxList id="rightSidebar" title="rightSidebar-settingTitle" type="rightSidebar" />
            <br />
            <button
                class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width default_set"
            >
                {{ TUICI18N.get("settingUI-restoreDefaultAll") }}
            </button>
            <br /><br />

            <details class="TUICDetails">
                <summary class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title">
                    {{ TUICI18N.get("customCSS-settingTitle") }}
                </summary>
                <div class="TUIC_col_setting_container">
                    <form>
                        <textarea id="css_textarea"></textarea>
                    </form>
                    <button
                        class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                        id="save"
                    >
                        {{ TUICI18N.get("customCSS-save") }}
                    </button>
                </div>
            </details>

            <details class="TUICDetails">
                <summary class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title">
                    {{ TUICI18N.get("export-settingTitle") }}
                </summary>
                <div class="TUIC_col_setting_container">
                    <input class="TUICTextInput" type="text" id="TUICExportBox" readonly />
                    <button
                        class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                        id="TUICExport"
                    >
                        {{ TUICI18N.get("export-exportButton") }}
                    </button>
                    <button
                        class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                        id="TUICExportCopy"
                    >
                        {{ TUICI18N.get("export-exportButtonCopy") }}
                    </button>
                </div>
            </details>

            <details class="TUICDetails">
                <summary class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo TUIC_setting_title">
                    {{ TUICI18N.get("import-settingTitle") }}
                </summary>
                <div class="TUIC_col_setting_container">
                    <input class="TUICTextInput" type="text" id="TUICImportBox" />
                    <button
                        class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                        id="TUICImportWrite"
                    >
                        {{ TUICI18N.get("import-importAppend") }}
                    </button>
                    <button
                        class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width"
                        id="TUICImportReplace"
                    >
                        {{ TUICI18N.get("import-importReplace") }}
                    </button>
                    <div style="margin-left: 10px; margin-right: 10px">
                        <span
                            class="r-jwli3a r-1tl8opc r-qvutc0 r-bcqeeo css-901oao TUIC_setting_text"
                            style="font-size: 12px"
                        >
                            {{ TUICI18N.get("import-select-explain") }}
                        </span>
                    </div>
                </div>
            </details>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { TUICI18N } from "../../content/i18n";
import { TUICPref } from "../settings";

import UpDownList from "./components/UpDownList.vue";
import Checkbox from "./components/Checkbox.vue";
import RadioButtonList from "./components/RadioButtonList.vue";
import UploadImageFile from "./components/UploadImageFile.vue";
import CheckboxList from "./components/CheckboxList.vue";
import RadioButtonListSub from "./components/RadioButtonListSub.vue";
import ColorsList from "./components/ColorsList.vue";

const Pref = TUICPref.getInstance();
const settings = Pref.settings;
export default defineComponent({
    setup() {
        return { TUICI18N, settings };
    },
    components: {
        UpDownList,
        Checkbox,
        RadioButtonList,
        UploadImageFile,
        CheckboxList,
        RadioButtonListSub,
        ColorsList,
    },
});
</script>

<style scoped></style>
