/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 14:14:00
 * @LastEditTime: 2019-09-05 10:54:12
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    buttonId: "",
    selectItem: [],
    dialogtype: "addOptions",
    tableObj: {},
    currentPageNum: "",
    tableCellNum: "",
    user_permission: [],
    // permissionIDs_actived: [],
    userID: sessionStorage.getItem("loginUserDataID")
      ? sessionStorage.getItem("loginUserDataID")
      : "",
    userAllRight: []
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
    },
    setCurrentPage(state, payload) {
      state.currentPageNum = payload;
    },
    setTableCellNum(state, payload) {
      state.tableCellNum = payload;
    },
    setUser_Permission(state, payload) {
      state.user_permission = payload;
    },
    pushUser_Permission(state, payload) {
      state.user_permission.push(payload);
    },
    // setPermissionIDs_actived(state, payload) {
    //   state.permissionIDs_actived = payload;
    // },
    setUserID(state, payload) {
      state.userID = payload;
    },
    setUserAllRight(state, payload) {
      state.userAllRight = payload;
    }
  },
  actions: {},
  getters: {
    // getPermissionIDs(state) {
    //   return state.permissionIDs_actived;
    // }
    getUserID(state) {
      return state.userID;
    },
    getUserAllRight(state) {
      return state.userAllRight;
    }
  }
});
