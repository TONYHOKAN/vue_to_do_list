import { createStore } from "vuex";
import { CalculatorStore } from "./calculatorStore";

// what type of store we need?
// 1. plain respone from 1 API, e.g restful GET repsone ... etc, most likely for form update
// 2. aggregation result data from more API, some display or control config need base on muti API result,
// 3. user frontend app display and operation only store, e.g UI default setting, env, config ... etc, hardcode thing when app build

// concept from backend, Store = Entity, i.e UserStore = UserEntity,
// UserStore have many attribute like UserStore.getName() = UserEntity.setName()
// but UserStore also domain object, as it have mutation/ action concept, which mean every method in action is domain operation
export const mainStore = createStore({
  modules: {
    calculatorStore: CalculatorStore,
  },
});

export const CalculatorStoreModel = {
  getInputHistoryDisplay() {
    return mainStore.state.calculatorStore.inputHistoryDisplay;
  },
  setInputHistoryDisplay(value) {
    return mainStore.commit("calculatorStore/inputHistoryDisplay", value);
  },
};
