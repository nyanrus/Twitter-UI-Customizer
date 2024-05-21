import { createApp } from "vue";
import safemodeVue from "./SafeMode.ce.vue";
import { createPinia } from "pinia";

export const injectSafeMode = () => {
    // styles, not style
    if (safemodeVue.styles !== undefined) {
        const style = document.createElement("style");
        style.textContent = safemodeVue.styles;
        document.head.appendChild(style);
    }

    const app = createApp(safemodeVue);
    app.use(createPinia());
    app.mount("#TUICOptionSafemodeEntry");
    console.log("injectSafemode End");
};