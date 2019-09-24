/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 14:14:00
 * @LastEditTime: 2019-09-07 14:03:24
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
import MainView from "./views/MainView";
import RightView from "./views/RightView";
import AddLogin from "./views/addLogin";
import Role from "./components/role";
import usercj from "./components/usercj";
import MainList from "./views/MainList";
// import about from "./views/about";
import service from "./service/index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "AddLogin",
      component: AddLogin
    }
  ]
});
//进行ajax

service
  .getAllRight()
  .then(res => {
    console.log("获取所有的权限并把激活的权限整理出来,动态生成meta的权限id");
    console.log("ssss", res.data);
    let temperPermissionID = [];
    res.data.forEach(item => {
      if (item.status == 0) {
        temperPermissionID.push(item);
      }
    });
    console.log(
      "aaaa",
      temperPermissionID.find(
        item => item.type == "route" && item.url == "right"
      )
    );
    router.addRoutes([
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
        meta: {
          perID: 10000
        },
        children: [
          {
            path: "/right",
            name: "rightview",
            component: RightView,
            meta: {
              perID: temperPermissionID.find(
                item => item.type == "route" && item.url == "right"
              )
                ? temperPermissionID.find(
                    item => item.type == "route" && item.url == "right"
                  ).id
                : 10000
            }
          },
          {
            path: "/user",
            name: "usercj",
            component: usercj,
            meta: {
              perID: temperPermissionID.find(
                item => item.type == "route" && item.url == "user"
              )
                ? temperPermissionID.find(
                    item => item.type == "route" && item.url == "user"
                  ).id
                : 10000
            }
          },
          {
            path: "/role",
            name: "Role",
            component: Role,
            meta: {
              perID: temperPermissionID.find(
                item => item.type == "route" && item.url == "role"
              )
                ? temperPermissionID.find(
                    item => item.type == "route" && item.url == "role"
                  ).id
                : 10000
            }
          },
          {
            path: "/mainlist",
            name: "mainlist",
            component: MainList,
            meta: {
              perID: 10000
            }
          }
        ]
      }
      // {
      //   path: "/",
      //   name: "AddLogin",
      //   component: AddLogin
      // }
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
    ]);
  })
  .catch(err => {
    console.log(err);
    console.log("网络请求出错");
  });

export default router;
