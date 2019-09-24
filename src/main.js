/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 16:47:23
 * @LastEditTime: 2019-09-05 16:50:04
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import App from "./App.vue";
// import addLogin from "./views/addLogin";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/iview.js";
import "./static/elementview.scss";

import "./plugins/element.js";
import "./static/index.scss";
import service from "./service/index";

Vue.config.productionTip = false;
Vue.use(ElementUI);
import { Message } from "element-ui";

router.beforeEach((to, from, next) => {
  if (to.path != "/") {
    console.log("对用户进行处理，如果没登录,就返回登录页面");
    if (store.getters.getUserID) {
      console.log("登录成功");
      console.log("在路由进入之前进行进行权限处理");
      console.log(
        "to",
        to.meta.perID,
        "userId:",
        store.getters.getUserID,
        "url",
        to
      );
      if (to.meta.perID == 10000 || to.meta.perID == undefined) {
        next();
      } else {
        service
          .getUserPer(store.getters.getUserID)
          .then(res => {
            console.log("获取用户所有的权限", res.data);
            // store.commit("setUserAllRight", res.data);
            let index = res.data.findIndex(item => item.id == to.meta.perID);
            if (index < 0) {
              Message({
                showClose: true,
                message: "你无此权限",
                type: "warning"
              });
              next(false);
            } else {
              next();
            }
          })
          .catch(() => {
            console.log("网络错误");
          });
      }
    } else {
      next("/");
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
  // render: h => h(addLogin)
}).$mount("#app");
