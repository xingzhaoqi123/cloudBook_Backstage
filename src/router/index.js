import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const components = {
  login: () => import("../views/login"),
  users: () => import("../views/users"),
  adduser: () => import("../views/users/adduser.vue"),
  changeuser: () => import("../views/users/changeuser"),
  detailInfo: () => import("../views/users/detailInfo"),
  swiperList:()=>import('../views/swiper/list'),
  detail_swiper:()=>import('../views/swiper/detail_swiper')
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
      redirect: "/layout/admin",
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
          path: "adduser",
          title: "添加管理员",
          component: components.adduser
        },
        {
          path: "changeuser",
          meta: {
            title: "修改个人信息"
          },
          component: components.changeuser
        },
        {
          path: "detailInfo",
          meta: {
            title: "详情页"
          },
          component: components.detailInfo
        },
        {
          path: "swiperList",
          name: "轮播图列表",
          meta:{
            title:'轮播图列表'
          },
          component: components.swiperList
        },
        {
          path: "detail_swiper",
          meta: {
            title: "轮播图详情页"
          },
          component: components.detail_swiper
        }
      ]
    }
  ]
});
