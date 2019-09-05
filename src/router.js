/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 14:14:00
 * @LastEditTime: 2019-09-05 14:30:39
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
// import MainView from "./views/MainView";
import usercj from "./components/usercj";
Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home
    // },
    // {
    //   path: "/",
    //   name: "mainview",
    //   component: MainView
    // }
    {
      path: "/",
      name: "user",
      component: usercj
    }
    // ,
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
