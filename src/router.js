/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 14:14:00
 * @LastEditTime: 2019-09-04 19:48:26
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
<<<<<<< HEAD
// import Home from "./views/Home.vue";
=======
import MainView from "./views/MainView";
>>>>>>> a96ebf0a51a2796d6ad048421d2ee7f7a9e3f111

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home
    // },
    {
      path: "/",
<<<<<<< HEAD
      name: "user",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/usercj.vue")
=======
      name: "mainview",
      component: MainView
>>>>>>> a96ebf0a51a2796d6ad048421d2ee7f7a9e3f111
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
