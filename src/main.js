import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import { createStore } from "vuex";
import MUTATION_TYPE from "./constant/systemConstant";

// concept from backend, Store = Entity, i.e UserStore = UserEntity,
// UserStore have many attribute like UserStore.getName() = UserEntity.setName()
// but UserStore also domain object, as it have mutation/ action concept, which mean every method in action is domain operation
const store = createStore({
  state() {
    return {
      inputHistoryDisplay: MUTATION_TYPE.inputHistoryDisplay,
    };
  },
  // not allow mutations have business and compute logic, only allow update value. All other logic must locate in component or serivce
  mutations: {
    [MUTATION_TYPE.inputHistoryDisplay](state, value) {
      state.inputHistoryDisplay = value;
    },
  },
});
createApp(App).use(router).use(Antd).use(store).mount("#app");
