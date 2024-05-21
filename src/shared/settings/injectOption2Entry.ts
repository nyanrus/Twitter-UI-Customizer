import { createApp } from "vue";
import settingsMain from "./SettingsMain.ce.vue";
import { createPinia } from "pinia";

export const injectOptionMain = () => {
    if (settingsMain.styles !== undefined) {
        const style = document.createElement("style");
        style.textContent = settingsMain.styles;
        document.head.appendChild(style);
    }

    const app = createApp(settingsMain);
    app.use(createPinia());
    app.mount("#TUICOptionEntry");
};
