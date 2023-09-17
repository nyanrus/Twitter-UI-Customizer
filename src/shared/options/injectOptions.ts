import { createApp } from "vue";
import index from "./index.vue";

export default () => {
    const app = createApp(index);
    app.mount("#TUICOptionMain");
};
