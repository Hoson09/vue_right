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

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
  // render: h => h(addLogin)
}).$mount("#app");
