// import { mainStore } from "./mainStore";

// what type of store we need?
// 1. plain response from 1 API, e.g restful GET response ... etc, most likely for form update
// 2. aggregation result data from more API, some display or control config need base on muti API result,
// 3. user frontend app display and operation only store, e.g UI default setting, env, config ... etc, hardcode thing when app build

// concept from backend, Store = Entity, i.e UserStore = UserEntity,
// UserStore have many attribute like UserStore.getName() = UserEntity.setName()
// but UserStore also domain object, as it have mutation/ action concept, which mean every method in action is domain operation
export const CalculatorStore = {
  namespaced: true,
  state() {
    return {
      inputHistoryDisplay: "study vuex",
    };
  },
  // not allow mutations have business and compute logic, only allow update value. All other logic must locate in component or serivce
  mutations: {
    inputHistoryDisplay(state, value) {
      state.inputHistoryDisplay = value;
    },
  },
  getters: {
    inputHistoryDisplay(state) {
      return state.inputHistoryDisplay;
    },
    abc() {
      return "";
    },
  },
};

// export const CalculatorStoreModel = {
//   getInputHistoryDisplay() {
//     return CalculatorStore.state.inputHistoryDisplay;
//   },
//   setInputHistoryDisplay(value) {
//     return CalculatorStore.commit("calculatorStore/inputHistoryDisplay", value);
//   },
// };
