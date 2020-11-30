/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2020-11-30 17:47:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\router\index.ts
 */

import Vue from "vue";
import VueRouter, { RawLocation, RouteConfig } from "vue-router";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("@/views/Login.vue")
  },
  {
    path: "/pAuthorize",
    name: "pAuthorize",
    component: () => import("@/views/PAuthorize.vue")
  }
];
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () =>
  new VueRouter({
    mode: "history",
    routes: routes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher;
}
export default router;