/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 14:14:00
 * @LastEditTime: 2019-09-05 16:49:54
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
import MainView from "./views/MainView";
import RightView from "./views/RightView";
import AddLogin from "./views/addLogin";
// import about from "./views/about";

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
      path: "/main",
      name: "mainview",
      component: MainView,
      children: [
        {
          path: "/right",
          name: "rightview",
          component: RightView
        }
      ]
    },
    {
      path: "/",
      name: "AddLogin",
      component: AddLogin
    }
    // {
    //   path: "/",
    //   name: "loginview",
    //   component: LoginView
    // }
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
