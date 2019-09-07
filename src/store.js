import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    buttonId: "",
    selectItem: [],
    dialogtype: "addOptions",
    tableObj: {}
  },
  mutations: {
    treeClick(state, payload) {
      state.buttonId = payload;
    },
    selectOptionNum(state, payload) {
      state.selectItem = payload;
    },
    setDialogType(state, payload) {
      state.dialogtype = payload;
    },
    getTableObj(state, payload) {
      state.tableObj = payload;
    }
  },
  actions: {}
});
