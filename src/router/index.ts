
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
];
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return originalPush.call(this, location).catch(err => err)
}


// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

// export default router;
const createRouter = () =>
  new VueRouter({
    mode: "history",
    routes: routes
  });

const router = createRouter();

export function resetRouter() {
  console.log("重置路由")
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher;
}
export default router;