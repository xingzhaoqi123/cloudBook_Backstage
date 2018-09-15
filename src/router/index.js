import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const components = {
  login: () => import("../views/login"),
  users: () => import("../views/users"),
  adduser:()=>import("../views/users/adduser.vue")
};
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: components.login
    },
    {
      path: "/layout",
      title: "后台管理",
      component: () => import("../views/layout/layout"),
      redirect:'/layout/admin',
      children: [
        {
          path: "admin",
          title: "首页",
          component: () => import("../views/home")
        },
        {
          path: "users",
          title: "用户信息",
          component: components.users
        },
        {
          path:'adduser',
          title:'添加管理员',
          component:components.adduser
        }
      ]
    }
  ]
});
