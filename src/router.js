import Vue from "vue";
import Router from "vue-router";
import MainView from "./views/MainView";
import AddLogin from "./views/addLogin";
import About from "./views/About";
import Role from "./components/role";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "AddLogin",
      component: AddLogin
    },
    {
      path: "/MainView",
      component: MainView,
      redirect: "/MainView/role",
      children: [
        {
          path: "about",
          component: About
        },
        {
          path: "role",
          component: Role
        }
      ]
    }
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
