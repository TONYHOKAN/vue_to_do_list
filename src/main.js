import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import { mainStore } from "./store/mainStore";

createApp(App).use(mainStore).use(router).use(Antd).mount("#app");
