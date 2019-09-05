/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 10:38:24
 * @LastEditTime: 2019-09-05 10:49:55
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/iview.js";
import "./plugins/element.js";
import "element-ui/lib/theme-chalk/index.css";
import "./static/elementview.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
