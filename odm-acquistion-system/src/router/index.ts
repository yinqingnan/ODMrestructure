/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-03-22 11:10:28
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\router\index.ts
 */

import Vue from "vue";
import VueRouter, { RawLocation, RouteConfig } from "vue-router";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      key: "0001",
      title: "登录",
      icon: ";",
      keepAlive: false,
      permission: null,
    },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/audio",
    component: () => import("@/views/Testviews/Testviews.vue"),
  },
];
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return originalPush.call(this, location).catch(err => err)
}
const createRouter = () =>
  new VueRouter({
    mode: "hash",
    routes: routes
  });
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher;
}
export default router;