import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";
import { createMissionRouter } from "./router";
const pinia = createPinia();
const router = createMissionRouter(pinia);
const app = createApp(App).use(pinia).use(router);
router.isReady().then(() => app.mount("#app"));
