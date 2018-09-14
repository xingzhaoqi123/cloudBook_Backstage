import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import('../views/login')
    },
    {
      path: "/layout",
      name: "layout",
      component: () => import("../views/layout/layout")
    }
  ]
});